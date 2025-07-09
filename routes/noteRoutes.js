const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const noteControllers = require("../controllers/noteController");

router.get("/", auth, noteControllers.getNotes);
router.post("/", auth, noteControllers.createNote);
router.put("/:id", auth, noteControllers.updateNote);
router.delete("/:id", auth, noteControllers.deleteNote);

module.exports = router;
