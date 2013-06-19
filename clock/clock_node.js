// パラメータ
var port = 3000

// 時刻の扱いをするためのライブラリ
var moment = require('moment');
// 定期実行ライブラリ
var cron = require('cron');
// ブラウザとの双方向通信用ライブラリ
var io   = require('socket.io').listen(port);

// 目覚まし予約時間を保存しておくための変数
var hour;
var minute;
var ampm;

// 目覚まし予約用処理、(ブラウザ->node)
io.sockets.on('connection', function (socket) {
  // ブラウザで入力した目覚まし予約時間を変数に代入
  function set_alarm(data) {
    hour   = data['hour'];
    minute = data['minute'];
    ampm   = data['ampm'];
  }
  socket.on('server_set_alarm', set_alarm);
});

// ブラウザからのアクセスがあった場合にNode Digital Clockの文字列をブラウザに送る(node->ブラウザ)
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
    io.sockets.emit('client_update', {time: time, hour: hour, minute: minute, ampm: ampm});
  },

  timeZone: "Japan/Tokyo"
}

var job = new cron.CronJob(options);
//ジョブ開始
job.start();
