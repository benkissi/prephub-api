const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      minlength: 8,
    },

    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    {
      _id: user._id.toString(),
      email: user.email,
    },
    process.env.JWT_SECRET
  );

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.tokens;
  delete userObject.password;

  return userObject;
};

UserSchema.pre("save", function (next) {
  var user = this;
  var password = user.password;

  if (password && user.isModified("password")) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.statics.findByCredentials = async function (email, password) {
  var User = this;

  // const user = await User.findOne({email: email})
  // console.log('resolve', user)

  return User.findOne({ email }).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          console.log("resolve", user);
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
