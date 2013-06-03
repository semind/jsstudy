// 時刻の扱いをするためのライブラリ
var moment = require('moment');
// 定期実行ライブラリ
var cron   = require('cron');

// 実行時間の定義 (毎秒実行)
var cronTime = "* * * * * *";
var options  = {
  cronTime: cronTime,

  onTick:   function() {
    time = moment().format('MMMM Do YYYY, h:mm:ss a');
    console.log(time);
  },

  timeZone: "Japan/Tokyo"
}

var job = new cron.CronJob(options);

//ジョブ開始
job.start();
