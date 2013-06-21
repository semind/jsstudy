
port = 3000
# moment
moment = require 'moment'
# cron
cron = require 'cron'
# socket.io
io = require('socket.io').listen(port)

# cron 設定
cronTime = "* * * * * *"
options = 
  cronTime: cronTime
  onTick: () ->
    time = 
      time: moment().format('hhmmssdA')
    io.sockets.emit('client_update', time)
    console.log time
  timeZone: "Japan/Tokyo"

job = new cron.CronJob(options)
job.start()
