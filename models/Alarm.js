'use strict';

var mongoose = require('mongoose');

var alarmSchema = new mongoose.Schema({
  alarmTime: Number,
  wakeTime: {type: Number, default: null},
  id: String
});

alarmSchema.methods.compareTimes = function() {
  if (this.wakeTime - this.alarmTime < 5) {
    return 1;
  }
  return 0;
};

module.exports = mongoose.model('Alarm', alarmSchema);
