const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: [true, "This username has been used before"],
      required: [true, "This field is required"],
    },
    email: {
      type: String,
      unique: [true, "This e-mail address has been used before"],
      required: [true, "This field is required"],
    },
    password: {
      type: String,
      required: [true, "This field is required"],
    },
    avatar: String,
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
      },
    },
  }
);

userSchema.methods.generateToken = function () {
  const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env;

  const payload = {
    id: this.id,
    username: this.username,
  };
  return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRE });
};

userSchema.methods.comparePasswords = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) next(err);
      this.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model("User", userSchema);
