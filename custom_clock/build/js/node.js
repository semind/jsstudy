(function() {
  var cron, cronTime, io, job, moment, options, port;

  port = 3000;

  moment = require('moment');

  cron = require('cron');

  io = require('socket.io').listen(port);

  cronTime = "* * * * * *";

  options = {
    cronTime: cronTime,
    onTick: function() {
      var time;
      time = {
        time: moment().format('hhmmssdA')
      };
      io.sockets.emit('client_update', time);
      return console.log(time);
    },
    timeZone: "Japan/Tokyo"
  };

  job = new cron.CronJob(options);

  job.start();

}).call(this);
