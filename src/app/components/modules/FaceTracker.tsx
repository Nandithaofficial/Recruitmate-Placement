import { useEffect, useRef, useState } from "react";
import * as faceDetection from "@tensorflow-models/face-detection";
import "@tensorflow/tfjs";

export default function FaceTracker({ onPostureChange, onMalpractice }: any) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null); // ← dedicated stream ref
  const intervalRef = useRef<any>(null);
  const lastPosition = useRef({ x: 0, y: 0 });
  const lastMalpracticeTime = useRef<Record<string, number>>({});
  const COOLDOWN_MS = 4000;

  const [changes, setChanges] = useState(0);
  const [warning, setWarning] = useState("");
  const [faceStatus, setFaceStatus] = useState<"ok" | "missing" | "multiple" | "moving">("ok");

  useEffect(() => {
    startCamera();
    // Cleanup fires on unmount (route change, module switch, component hide)
    return () => stopCamera();
  }, []);

  const fireMalpractice = (type: string, message: string) => {
    const now = Date.now();
    const last = lastMalpracticeTime.current[type] ?? 0;
    if (now - last > COOLDOWN_MS) {
      lastMalpracticeTime.current[type] = now;
      onMalpractice(message);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream; // save independently of the video element
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      detectFace();
    } catch (err) {
      console.error("Camera error:", err);
    }
  };

  const stopCamera = () => {
    // 1. Kill the detection loop
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    // 2. Stop every track → turns off the camera LED
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    // 3. Detach from the video element
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const detectFace = async () => {
    const model = await faceDetection.createDetector(
      faceDetection.SupportedModels.MediaPipeFaceDetector,
      { runtime: "tfjs", maxFaces: 3 }
    );

    intervalRef.current = setInterval(async () => {
      if (!videoRef.current || !streamRef.current) return;

      const faces = await model.estimateFaces(videoRef.current);

      if (faces.length === 0) {
        setWarning("⚠️ Face not detected — look at the camera");
        setFaceStatus("missing");
        fireMalpractice("no-face", "Face disappeared");
        return;
      }

      if (faces.length >= 2) {
        setWarning("🚫 Multiple faces detected");
        setFaceStatus("multiple");
        fireMalpractice("multi-face", "Multiple persons detected");
        return;
      }

      const box = faces[0].box;
      const diffX = Math.abs(box.xMin - lastPosition.current.x);
      const diffY = Math.abs(box.yMin - lastPosition.current.y);

      if (diffX > 60 || diffY > 60) {
        setFaceStatus("moving");
        setWarning("⚠️ Too much movement");
        setChanges((prev) => {
          const next = prev + 1;
          onPostureChange(next);
          return next;
        });
        fireMalpractice("movement", "Too much movement");
      } else {
        setWarning("");
        setFaceStatus("ok");
      }

      lastPosition.current = { x: box.xMin, y: box.yMin };
    }, 1500);
  };

  const borderColor = { ok: "border-green-500", missing: "border-red-500", multiple: "border-yellow-500", moving: "border-orange-400" }[faceStatus];
  const statusDot = { ok: "bg-green-400", missing: "bg-red-500 animate-pulse", multiple: "bg-yellow-400 animate-pulse", moving: "bg-orange-400 animate-pulse" }[faceStatus];
  const statusLabel = { ok: "Camera Active", missing: "Face Not Detected", multiple: "Multiple Faces", moving: "Excessive Movement" }[faceStatus];

  return (
    <div className="mt-4 flex flex-col items-center gap-3">
      <div
        className={`relative rounded-xl overflow-hidden border-4 ${borderColor} transition-colors duration-300 shadow-lg`}
        style={{ width: 320, height: 240 }}
      >
        <video ref={videoRef} autoPlay muted className="w-full h-full object-cover" />

        <div className="absolute top-2 left-2 flex items-center gap-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
          <span className={`w-2 h-2 rounded-full ${statusDot}`} />
          {statusLabel}
        </div>

        {warning && (
          <div className="absolute bottom-0 left-0 right-0 bg-red-600/80 text-white text-xs text-center py-1 backdrop-blur-sm">
            {warning}
          </div>
        )}
      </div>

      <div className="text-sm text-gray-400">
        🔄 Posture changes:{" "}
        <span className={changes > 3 ? "text-red-400 font-bold" : "text-white"}>{changes}</span>
      </div>
    </div>
  );
}