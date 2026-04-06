const User = require("../models/User");

// ** GET ALL USERS **
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ** GET SINGLE USER **
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ** UPDATE USER ROLE **
const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Role updated", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ** TOGGLE USER STATUS (active / inactive) **
const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // if active → make inactive, if inactive → make active
    if (user.isActive === true) {
      user.isActive = false;
    } else {
      user.isActive = true;
    }

    await user.save();

    res.status(200).json({
      message: `User is now ${user.isActive ? "active" : "inactive"}`,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ** DELETE USER **
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {
  getAllUsers,
  getUser,
  updateUserRole,
  toggleUserStatus,
  deleteUser,
};