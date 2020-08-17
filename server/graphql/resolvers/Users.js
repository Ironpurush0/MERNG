const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  validateRegisterInput,
  validLoginInputs,
} = require("../../utils/validate");
const { SECRET_KEY } = require("../../config");
const { UserInputError, AuthenticationError } = require("apollo-server");

const getToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    SECRET_KEY
  );
};

module.exports = {
  Query: {
    async getUser(_, { userId }) {
      try {
        const user = await User.findById(userId);
        if (user) {
          return user;
        }
      } catch (error) {
        throw new Error("User not found.");
      }
    },
  },
  Mutation: {
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("username is taken.", {
          errors: {
            username: "This username is already taken",
          },
        });
      }

      password = await bcrypt.hash(password, 10);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = getToken(res);
      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
    async login(_, { username, password }) {
      const { errors, valid } = validLoginInputs(username, password);

      if (!valid) {
        throw new AuthenticationError("Login failed.", {
          errors,
        });
      }

      const user = await User.findOne({ username });

      if (!user) {
        errors.general = "User not found.";
        throw new UserInputError("User not found", { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Wrong credentials";
        throw new UserInputError("Wrong credentials", { errors });
      }

      const token = getToken(user);
      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
  },
};
