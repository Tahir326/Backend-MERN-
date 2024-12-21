import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save",async function(next){
  if (this.isModified("password")) return next()
  this.password= bcrypt.hash(this.password,10)
  next()
})
userSchema.methods.isPasswordCorrect = async function (password){
  return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessTokens = function(){
  return jwt.sign(
    {
      _id:this.id,
      email:this.email,
      username: this.username,
      fullName:this.fullName

    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expireIn:process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}
userSchema.methods.generateRefreshTokens = function(){
  return jwt.sign(
    {
      _id:this.id,
      email:this.email,
      username: this.username,
      fullName:this.fullName

    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expireIn:process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}

export const user = mongoose.model("User", userSchema);