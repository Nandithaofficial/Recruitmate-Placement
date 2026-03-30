import StudyMaterial from "../models/StudyMaterial.js";

// ADMIN: upload material
export const uploadMaterial = async (req, res) => {
  try {
    const { title, description, category, difficulty, questions } = req.body;

    const material = new StudyMaterial({
      title,
      description,
      category,
      difficulty,
      questions
    });

    await material.save();

    res.json({ message: "Material uploaded successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// STUDENT: get by category
export const getMaterials = async (req, res) => {
  try {
    const { category } = req.params;

    const materials = await StudyMaterial.find({ category });

    res.json(materials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// STUDENT: get single material
export const getMaterialById = async (req, res) => {
  try {
    const material = await StudyMaterial.findById(req.params.id);
    res.json(material);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};