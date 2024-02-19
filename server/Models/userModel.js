import Mongoose from "mongoose";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

const userSchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required"],
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
      unique: [true, "Email Already Exists"],
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
      minLength: [2, "Password must be at least 6 Characters"],
    },
    address: {
      type: String,
      required: [true, "Address is Required"],
    },
    city: {
      type: String,
      required: [true, "City is Required"],
    },
    country: {
      type: String,
      required: [true, "Country is Required"],
    },
    phone: {
      type: String,
      required: [true, "Phone is Required"],
    },
    profilePic: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },   
    role:{
      type: String,
      default: "user",
    }
  },
  { timestamps: true }
);

//function for Crypt password
//hash
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});
// compare function
userSchema.methods.comparePassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

//Token for Authorization JWT
userSchema.methods.genrateToken = function () {
  return JWT.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "500d",
  });
};

export const userModel = Mongoose.model("Users", userSchema);
export default userModel;
