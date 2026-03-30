import { Upload, Trash2, Download, Eye, FileText } from "lucide-react";
import { useState, useEffect } from "react";

interface Resume {
  id: string;
  name: string;
  uploadDate: string;
  size: string;
  filePath: string;
}

export default function ResumeManager() {
  const [resumes, setResumes] = useState<Resume[]>([]);

  // ✅ Upload Resume
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const token = localStorage.getItem("token");

    for (let file of Array.from(files)) {
      const formData = new FormData();
      formData.append("resume", file);

      try {
        const res = await fetch("http://localhost:5000/api/resume/upload", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        const data = await res.json();
        console.log(data);

        const newResume: Resume = {
          id: data.resume._id,
          name: data.resume.fileName,
          uploadDate: new Date(data.resume.createdAt)
            .toISOString()
            .split("T")[0],
          size: `${(file.size / 1024).toFixed(0)} KB`,
          filePath: data.resume.filePath,
        };

        setResumes((prev) => [...prev, newResume]);
      } catch (err) {
        console.error("Upload error:", err);
      }
    }
  };

  // ✅ Delete Resume
  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");

    if (!confirm("Are you sure you want to delete this resume?")) return;

    try {
      await fetch(`http://localhost:5000/api/resume/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setResumes((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };
 useEffect(() => {
  const token = localStorage.getItem("token"); // move token here

  const fetchResumes = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/resume", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      const formatted: Resume[] = (data.resumes || data).map((item: any) => ({
        id: item._id,
        name: item.fileName,
        uploadDate: new Date(item.createdAt)
          .toISOString()
          .split("T")[0],
        size: "N/A",
        filePath: item.filePath,
      }));

      setResumes(formatted);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  fetchResumes();
}, []); // empty dependency array
  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Resume Manager
          </h1>
          <p className="text-slate-600">
            Upload, manage, and organize your resumes
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-slate-200">
          <label className="block cursor-pointer">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-12 hover:border-blue-500 hover:bg-blue-50 transition-all text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Upload Your Resume
              </h3>
              <p className="text-slate-600 mb-4">
                Drag and drop or click to browse
              </p>
              <p className="text-sm text-slate-500">
                Supported formats: PDF, DOC, DOCX (Max 5MB)
              </p>
            </div>
          </label>
        </div>

        {/* Resume List */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-semibold">
              Your Resumes ({resumes.length})
            </h2>
          </div>

          <div className="divide-y divide-slate-200">
            {resumes.map((resume) => (
              <div
                key={resume.id}
                className="p-6 hover:bg-slate-50 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900">
                      {resume.name}
                    </h3>
                    <p className="text-sm text-slate-600">
                      Uploaded on {resume.uploadDate} • {resume.size}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {/* View */}
                  <button
                    onClick={() =>
                      window.open(
                        `http://localhost:5000${resume.filePath}`,
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                    className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg"
                    disabled={!resume.filePath}
                  >
                    <Eye className="w-5 h-5" />
                  </button>

                  {/* Download */}
                  <button
                    onClick={() => {
                      const url = `http://localhost:5000${resume.filePath}`;
                      window.open(url, "_blank", "noopener,noreferrer");
                      const link = document.createElement("a");
                      link.href = url;
                      link.setAttribute("download", resume.name);
                      link.setAttribute("target", "_blank");
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="p-2 hover:bg-green-100 text-green-600 rounded-lg"
                    disabled={!resume.filePath}
                  >
                    <Download className="w-5 h-5" />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(resume.id)}
                    className="p-2 hover:bg-red-100 text-red-600 rounded-lg"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}