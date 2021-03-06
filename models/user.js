const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
    },
    teacherCode: {
      type: String,
      minlength: 7,
    },
    studentCode: {
      type: String,
      minlength: 7,
    },
    schoolCode: {
      type: String,
      minlength: 7,
    },
    role: {
      type: String,
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
      name: user.name,
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

UserSchema.statics.findByCredentials = async function (code, password, role) {
  var User = this;


  return User.findOne({ [`${role}Code`] : code }).then((user) => {
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
