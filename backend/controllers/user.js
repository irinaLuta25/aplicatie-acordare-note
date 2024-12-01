const { use } = require("../routes");

const UserDb=require("../models").User;

const controller = {
    addUser: async (req, res) => {
        const user = {
            firstName: req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            password:req.body.password,
            role:req.body.role
        };
    
        try {
          const newUser = await UserDb.create(user);
          res.status(200).send(newUser);
        } catch (err) {
          res.status(500).send(err.message);
        }
    },

    getAll: async (req, res) => {
        try {
          const users = await UserDb.findAll();
          res.status(200).send(users);
        } catch (err) {
          res.status(500).send(err.message);
        }
      },
    
      getUserById: async (req, res) => {
        const id = req.params.id;
        try {
          const user = await UserDb.findByPk(id);
          res.status(200).send(user);
        } catch (err) {
          res.status(500).send(err.message);
        }
      },
    
      editUser: async (req, res) => {
        const id = req.params.id;
        const updatedUser = {
          name: req.body.name,
        };
    
        try {
          const user = await UserDb.findByPk(id);
    
          if (user) {
            await user.update(updatedUser);
            res.status(200).send(user);
          }
        } catch (err) {
          res.status(500).send(err.message);
        }
      },
    
      deleteUser: async (req, res) => {
        const id = req.params.id;
        try {
          const user = await UserDb.findByPk(id);
          if (user) {
            await user.destroy();
            res.status(200).send("S-a sters yeyy");
          }
        } catch (err) {
          res.status(500).send(err.message);
        }
      },
    
}

module.exports=controller;