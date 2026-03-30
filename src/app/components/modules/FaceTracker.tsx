import { useEffect, useRef, useState } from "react";
import * as faceDetection from "@tensorflow-models/face-detection";
import "@tensorflow/tfjs";

export default function FaceTracker({ onPostureChange, onMalpractice }: any) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<any>(null);

  const lastPosition = useRef({ x: 0, y: 0 });
  const lastMalpractice = useRef("");

  const [changes, setChanges] = useState(0);
  const [warning, setWarning] = useState("");

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      detectFace();
    } catch (err) {
      console.log("Camera error", err);
    }
  };

  const stopCamera = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    const stream = videoRef.current?.srcObject as MediaStream;
    stream?.getTracks().forEach(track => track.stop());
  };

  const detectFace = async () => {
    const model = await faceDetection.createDetector(
      faceDetection.SupportedModels.MediaPipeFaceDetector,
      {
        runtime: "tfjs",
        maxFaces: 3   // 👈 enables multiple face detection
      }
    );

    intervalRef.current = setInterval(async () => {
      if (!videoRef.current) return;

      const faces = await model.estimateFaces(videoRef.current);

      // ❌ No face
      if (faces.length === 0) {
        setWarning("⚠️ Face not detected");

        if (lastMalpractice.current !== "no-face") {
          onMalpractice("Face disappeared");
          lastMalpractice.current = "no-face";
        }
        return;
      }

      // ❌ Multiple faces
      if (faces.length >= 2) {
        setWarning("⚠️ Multiple faces detected");

        if (lastMalpractice.current !== "multi-face") {
          onMalpractice("Multiple persons detected");
          lastMalpractice.current = "multi-face";
        }
        return;
      }

      // ✅ Normal
      setWarning("");
      lastMalpractice.current = "";

      const box = faces[0].box;

      const diffX = Math.abs(box.xMin - lastPosition.current.x);
      const diffY = Math.abs(box.yMin - lastPosition.current.y);

      // 🚶 Movement detection
      if (diffX > 60 || diffY > 60) {
        setChanges(prev => {
          const newCount = prev + 1;
          onPostureChange(newCount);
          return newCount;
        });

        if (lastMalpractice.current !== "movement") {
          onMalpractice("Too much movement");
          lastMalpractice.current = "movement";
        }
      }

      lastPosition.current = {
        x: box.xMin,
        y: box.yMin
      };

    }, 1500);
  };

  return (
    <div className="mt-4">
      <video
        ref={videoRef}
        autoPlay
        muted
        className="w-64 rounded-lg border"
      />

      <p className="text-sm mt-2">
        Posture changes: {changes}
      </p>

      {warning && (
        <p className="text-red-400 text-sm mt-1">
          {warning}
        </p>
      )}
    </div>
  );
}