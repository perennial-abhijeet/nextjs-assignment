import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  mobile: {
    type: String,
    required: [true, "Please provide a mobile number"],
    unique: true,
  },
  address: {
    type: String,
    required: [true, "Please provide an address"],
  },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
