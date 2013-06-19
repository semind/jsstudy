// ブラウザ側js
$(function() {

  function update(data) {
    time   = data['time'];
    hour   = data['hour'];
    minute = data['minute'];
    ampm   = data['ampm'];
    $("#time").text(time);
    if (hour && minute && ampm) {
      $("#reserved").text('alart ' + hour + ':' + minute + ' ' + ampm);
    }
  };

  // node.jsへ接続する(コネクションを貼る)
  var socket = io.connect('http://127.0.0.1:3000');
  // node.jsよりremote_updateの命令を受けた際にupdate関数を実行する
  socket.on('client_update', update);
});
