const Faculty = require("../models/faculty");
exports.addFaculty = async (req, res) => {
  try {
    const { name,initials,courses, } = req.body;

    const faculty = await Faculty.create({
      name,
      department: "CSE",
      initials,
      courses,
      avgRating: 0,
      totalReviews: 0
    });

    res.status(201).json(faculty);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getAllFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.find();
    res.json(faculty);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single faculty
exports.getFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty) return res.status(404).json({ message: "Faculty not found" });
    res.json(faculty);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};