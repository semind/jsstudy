// パラメータ
var port = 3000

// 時刻の扱いをするためのライブラリ
var moment = require('moment');
// 定期実行ライブラリ
var cron = require('cron');
// ブラウザとの双方向通信用ライブラリ
var io   = require('socket.io').listen(port);

// ブラウザからのアクセスがあった場合にNode Digital Clockの文字列をブラウザに送る
io.sockets.on('connection', function (client) {
  client.emit('remote_update', 'Node Digital Clock');
});

// 実行時間の定義 (毎秒実行)
var cronTime = "* * * * * *";
var options  = {
  cronTime: cronTime,

  // 毎秒実行
  onTick: function() {
    time = moment().format('h:mm:ss a');
    // 接続しているブラウザ全てに現時刻を送る
    io.sockets.emit('remote_update', time);
  },

  timeZone: "Japan/Tokyo"
}

var job = new cron.CronJob(options);
//ジョブ開始
job.start();
