import Progress from "../models/progressModel.js";

export const getProgress = async (req, res) => {
   console.log("Progress API hit", req.params.userId);
  try {
    const userId = decodeURIComponent(req.params.userId);

    const progress = await Progress.findOne({
      userId: userId,
    });

    res.json(progress || {});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};