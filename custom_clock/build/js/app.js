(function() {
  $(function() {
    var alarm, ampm, clock, digit_holder, digit_to_name, digits, positions, socket, update_time, weekday_holder, weekday_names, weekdays;
    clock = $('#clock');
    alarm = clock.find('.alarm');
    ampm = clock.find('.ampm');
    digit_to_name = 'zero one two three four five six seven eight nine'.split(' ');
    digits = {};
    positions = ['h1', 'h2', ':', 'm1', 'm2', ':', 's1', 's2'];
    digit_holder = clock.find('.digits');
    $.each(positions, function() {
      var i, pos, _i;
      console.log(this['0']);
      if (this['0'] === ':') {
        return digit_holder.append('<div class="dots">');
      } else {
        pos = $('<div>');
        for (i = _i = 1; _i <= 8; i = ++_i) {
          pos.append('<span class="d' + i + '">');
        }
        digits[this] = pos;
        return digit_holder.append(pos);
      }
    });
    weekday_names = 'MON TUE WED THU FRI SAT SUN'.split(' ');
    weekday_holder = clock.find('.weekdays');
    $.each(weekday_names, function() {
      return weekday_holder.append('<span>' + this + '</span>');
    });
    weekdays = clock.find('.weekdays span');
    $('a.button').click(function() {
      return clock.toggleClass('light dark');
    });
    update_time = function(data) {
      var dow, now;
      now = data['time'];
      digits.h1.attr('class', digit_to_name[now[0]]);
      digits.h2.attr('class', digit_to_name[now[1]]);
      digits.m1.attr('class', digit_to_name[now[2]]);
      digits.m2.attr('class', digit_to_name[now[3]]);
      digits.s1.attr('class', digit_to_name[now[4]]);
      digits.s2.attr('class', digit_to_name[now[5]]);
      dow = now[6];
      dow--;
      if (dow < 0) {
        dow = 6;
      }
      weekdays.removeClass('active').eq(dow).addClass('active');
      return ampm.text(now[7] + now[8]);
    };
    socket = io.connect('http://127.0.0.1:3000');
    return socket.on('client_update', update_time);
  });

}).call(this);
