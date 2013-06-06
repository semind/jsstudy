// 時刻の扱いをするためのライブラリ
var moment = require('moment');
// 定期実行ライブラリ
var cron   = require('cron');
// twitter
var twitter = require('twitter');
var twitterBot = new twitter({
  consumer_key: 'xxxxxxxxxxxxxxxxxxxxxxxxxxx',
  consumer_secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxx',
  access_token_key: 'xxxxxxxxxxxxxxxxxxxxxxxxxxx',
  access_token_secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxx'
});

// terminal-notifier
var notifier = require('node-notifier');
notifier.notify({
  title: 'SKIYAKI STUDY!',
  message: 'Node.jsうごかしはじめたお'
}, function(error, response) {
  //console.log(response);
});

// cron設定
var cronTime = '5 * * * * *';
var options = {
  cronTime: cronTime,
  onTick: function() {
    var nichantekinananika = 
    [
      '(((( ；ﾟДﾟ))))',
      '＼(^o^)／',
      '（"｀д´）ゞ',
      '(# ﾟДﾟ)',
      '(；´Д｀)',
      'ｷﾀ━(ﾟ∀ﾟ)━!',
      '(´∀｀*)ε｀　)',
      '(*´ω｀*).',
      '（　´_ゝ`）',
      '(´･ω･`)ｼｮﾎﾞｰﾝ',
      '(・∀・)',
      '(´･ω･`) 人(´･ω･`)',
      '|･ω･`)ﾉ',
      '(´･(ｪ)･)',
      '(*´・ω・)(´･ω･｀)(・ω・｀*)'
    ];
    // 上の顔文字ランダムセット
    var no = Math.floor(Math.random() * nichantekinananika.length);
    var tweetText = 'Node.js study!! ' + nichantekinananika[no];
    twitterBot.updateStatus(tweetText, function(json) {
      console.log(json);
      // つぶやき内容のNotificationをなげる
      notifier.notify({
        title: 'Botがつぶやきやがりました',
        message: tweetText,
        open: 'https://twitter.com/' + json.user.screen_name + '/statuses/' + json.id_str
      }, function(error, response) {
        //console.log(response);
      });
    });
  },
  timeZone: 'Japan/Tokyo'
}
var job = new cron.CronJob(options);
job.start();
//// 時刻の扱いをするためのライブラリ
//var moment = require('moment');
//// 定期実行ライブラリ
//var cron   = require('cron');
//
//// 実行時間の定義 (毎秒実行)
//var cronTime = "* * * * * *";
//var options  = {
//  cronTime: cronTime,
//
//  onTick:   function() {
//    time = moment().format('MMMM Do YYYY, h:mm:ss a');
//    console.log(time);
//  },
//
//  timeZone: "Japan/Tokyo"
//}
//
//var job = new cron.CronJob(options);
//
////ジョブ開始
//job.start();
