const Note = require("../models/Note");

const noteControllers = {
  async getNotes(req, res) {
    const notes = await Note.find({ user: req.userId });
    res.json(notes);
  },

  async createNote(req, res) {
    const { title, content } = req.body;
    const note = await Note.create({ user: req.userId, title, content });
    res.json(note);
  },

  async updateNote(req, res) {
    const { id } = req.params;
    const note = await Note.findOneAndUpdate(
      { _id: id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!note) return res.status(404).json({ error: "Nota no encontrada" });
    res.json(note);
  },

  async deleteNote(req, res) {
    const { id } = req.params;
    const note = await Note.findOneAndDelete({ _id: id, user: req.userId });
    if (!note) return res.status(404).json({ error: "Nota no encontrada" });
    res.json({ message: "Nota eliminada" });
  },
};

module.exports = noteControllers;
