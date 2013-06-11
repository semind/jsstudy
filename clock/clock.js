// ブラウザ側js
$(function() {

  function update(time) {
    $("#time").text(time);
  };

  // node.jsへ接続する(コネクションを貼る)
  var socket = io.connect('http://127.0.0.1:3000');
  // node.jsよりremote_updateの命令を受けた際にupdate関数を実行する
  socket.on('remote_update', update);
});
