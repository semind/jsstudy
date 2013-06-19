// ブラウザ側js
$(function() {

  $('#reserve').click(function() {
    var hour   = $("#hour").val();
    var minute = $("#minute").val();
    var ampm   = $("#ampm").val();
    var socket = io.connect('http://127.0.0.1:3000');
    socket.emit('server_set_alarm', {hour: hour, minute: minute, ampm: ampm});
  });

  // node.jsへ接続する(コネクションを貼る)
});
