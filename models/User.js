const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
    },
    role: {
      type: String,
      enum: ["viewer", "analyst", "admin"],
      default: "viewer",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);


// ** Hash password before saving to DB **
userSchema.pre("save", async function () {

  // Prevents re-hashing an already hashed password
  if (!this.isModified("password")) return;

  // Hash the password with strength level 12.
  this.password = await bcrypt.hash(this.password, 12);

});


// ** Check if Entered Password Matches Stored Password **
userSchema.methods.comparePassword = async function (enteredPassword) {

  // bcrypt compares plain text vs hashed password 
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);