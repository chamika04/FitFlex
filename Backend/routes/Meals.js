const router = require("express").Router();
const UserForm = require("../models/Meal");

// Add a new user form entry
router.post("/add", async (req, res) => {
  try {
    const { age, gender, bmi, activityLevel, goal, dietType, mealsPerDay } = req.body;
    
    const newUserForm = new UserForm({
      age,
      gender,
      bmi,
      activityLevel,
      goal,
      dietType,
      mealsPerDay
    });

    await newUserForm.save();
    res.status(201).json({ message: "User form data saved successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all user form entries
router.get("/", async (req, res) => {
  try {
    const userForms = await UserForm.find();
    res.status(200).json(userForms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific user form entry by ID
router.get("/:id", async (req, res) => {
  try {
    const userForm = await UserForm.findById(req.params.id);
    if (!userForm) {
      return res.status(404).json({ message: "User form data not found" });
    }
    res.status(200).json(userForm);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a user form entry
router.put("/update/:id", async (req, res) => {
  try {
    const updatedUserForm = await UserForm.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedUserForm) {
      return res.status(404).json({ message: "User form data not found" });
    }

    res.status(200).json({ message: "User form data updated successfully", updatedUserForm });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a user form entry
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedUserForm = await UserForm.findByIdAndDelete(req.params.id);

    if (!deletedUserForm) {
      return res.status(404).json({ message: "User form data not found" });
    }

    res.status(200).json({ message: "User form data deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
