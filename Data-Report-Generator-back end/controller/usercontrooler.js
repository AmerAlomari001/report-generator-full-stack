const UserService = require("../service/userservice");

const UserController = {
  register: async (req, res) => {
    try {
      const result = await UserService.register(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const data = await UserService.login(req.body);
      res.json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = UserController;
