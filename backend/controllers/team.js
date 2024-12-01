const TeamDb = require("../models").Team;

const controller = {
  addTeam: async (req, res) => {
    const team = {
      name: req.body.name,
      idAssignment:req.body.idAssignment
    };

    try {
      const newTeam = await TeamDb.create(team);
      res.status(200).send(newTeam);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  getAll: async (req, res) => {
    try {
      const teams = await TeamDb.findAll();
      res.status(200).send(teams);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  getTeamById: async (req, res) => {
    const id = req.params.id;
    try {
      const team = await TeamDb.findByPk(id);
      res.status(200).send(team);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  editTeam: async (req, res) => {
    const id = req.params.id;
    const updatedTeam = {
      name: req.body.name,
    };

    try {
      const team = await TeamDb.findByPk(id);

      if (team) {
        await team.update(updatedTeam);
        res.status(200).send(team);
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  deleteTeam: async (req, res) => {
    const id = req.params.id;
    try {
      const team = await TeamDb.findByPk(id);
      if (team) {
        await team.destroy();
        res.status(200).send("S-a sters yeyy");
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
};

module.exports=controller;
