const TeamDb = require("../models").Team;
const EvaluationDb = require("../models").Evaluation;
const UserDb = require("../models").User;

const controller = {
  addTeam: async (req, res) => {
    const team = {
      name: req.body.name,
    };

    try {
      const newTeam = await TeamDb.create(team);
      res.status(200).json(newTeam);

    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  getAll: async (req, res) => {
    try {
      const teams = await TeamDb.findAll();
      res.status(200).send(teams);
      //return teams;
    } catch (err) {
      res.status(500).send(err.message);
      throw err;
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

  getAllTeamsByPhaseId: async (req, res) => {
    const phaseIdT = req.params.phaseId;

    if (!phaseIdT) {
      throw new Error("No phase ID provided.");
    }

    try {
      const teams = await TeamDb.findAll({
        include: [{
          model: EvaluationDb,
          required: true,
          where: { phaseId: phaseIdT }
        }],
      });
      res.status(200).send(teams);
      return teams;
    } catch (err) {
      res.status(500).send(err);
    }
  },

  getAllTeamsByPhaseIdByUser: async (req, res) => {
    const phaseIdT = req.params.phaseId;

    if (!phaseIdT) {
      throw new Error("No phase ID provided.");
    }

    try {
      const teams = await TeamDb.findAll({
        include: [{
          model: EvaluationDb,
          required: true,
          where: { phaseId: phaseIdT },
          include: [{
            model: UserDb,
            required: true,
          }]
        }],
      });
      res.status(200).send(teams);
      return teams;
    } catch (err) {
      res.status(500).send(err);
    }
  },

  getTeamStatus: async (req, res) => {
    const phaseIdT = req.params.id;

    if (!phaseIdT) {
      return res.status(400).json({ error: "No phase ID provided." });
    }

    try {
      const teamsCount = await TeamDb.count({
        include: [
          {
            model: EvaluationDb,
            required: true,
            where: { phaseId: phaseIdT },
          },
        ],
      });

      const teamsCreated = teamsCount > 0;

      return res.status(200).json({ teamsCreated });
    } catch (err) {
      console.error("Eroare la verificarea stării echipelor:", err);
      return res.status(500).json({ error: "Eroare la server." });
    }
  }
};

module.exports = controller;
