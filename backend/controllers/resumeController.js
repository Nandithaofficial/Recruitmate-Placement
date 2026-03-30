import Resume from "../models/resume.js";
import fs from "fs";

// Upload resume
export const uploadResume = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    const resume = await Resume.create({
      userId: req.user.id,
      fileName: file.filename,
      filePath: `/uploads/${file.filename}`,
    });

    res.json({ msg: "Resume uploaded", resume });
  } catch (error) {
    res.status(500).json({ msg: "Upload failed" });
  }
};

// Get resumes
export const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id });
    res.json(resumes);
  } catch (err) {
    res.status(500).json({ msg: "Fetch failed" });
  }
};

// Delete resume
export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ msg: "Resume not found" });
    }

    // delete file from uploads folder
    if (fs.existsSync(`.${resume.filePath}`)) {
      fs.unlinkSync(`.${resume.filePath}`);
    }

    await resume.deleteOne();

    res.json({ msg: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Delete failed" });
  }
};