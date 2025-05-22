const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },  // description field added
  dueDate: { type: Date, required: false }
});

module.exports = mongoose.model('Task', taskSchema);
