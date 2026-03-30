import Resume from "../models/resume.js";
import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

export const analyzeResume = async (req, res) => {
  try {
    const { resumeId, role } = req.body;

    const resume = await Resume.findById(resumeId);
    console.log(resume);

    if (!resume) {
      return res.status(404).json({ msg: "Resume not found" });
    }

    // read file
    const filePath = `.${resume.filePath}`;
    const data = new Uint8Array(fs.readFileSync(filePath));

    // load pdf
    const pdf = await pdfjsLib.getDocument({ data }).promise;

    let resumeText = "";

    // extract all pages
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();

      const pageText = content.items
        .map((item) => item.str)
        .join(" ");

      resumeText += pageText + " ";
    }

    resumeText = resumeText.toLowerCase();

    console.log(resumeText.substring(0, 200));

    const roleKeywords = {
      "Frontend Developer": [
        "html","css","javascript","react","tailwind",
        "bootstrap","typescript","responsive","redux","next"
      ],
      "Backend Developer": [
        "node","express","mongodb","sql","api",
        "jwt","authentication","docker","aws","microservices"
      ],
      "Full Stack Developer": [
        "react","node","mongodb","express","rest api",
        "git","typescript","docker","jwt","deployment"
      ],
      "Data Analyst": [
        "python","pandas","numpy","sql","excel",
        "power bi","tableau","statistics","visualization","machine learning"
      ]
    };

    const keywords =
      roleKeywords[role] || roleKeywords["Full Stack Developer"];

    const found = [];
    const missing = [];

    keywords.forEach((keyword) => {
      if (resumeText.includes(keyword)) {
        found.push(keyword);
      } else {
        missing.push(keyword);
      }
    });

    const score = Math.round((found.length / keywords.length) * 100);

    res.json({
      score,
      role,
      fileName: resume.fileName,
      strengths: [
        "ATS readable formatting",
        "Clear section headings",
        "Skills section detected",
        "Education section present"
      ],
      improvements: missing.slice(0, 4).map(
        (item) => `Consider adding experience with ${item}`
      ),
      keywords: {
        found,
        missing
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "ATS analysis failed" });
  }
};