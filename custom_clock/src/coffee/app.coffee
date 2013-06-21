
$ ->
  # selectors
  clock = $('#clock')
  alarm = clock.find('.alarm')
  ampm = clock.find('.ampm')
  
  digit_to_name = 'zero one two three four five six seven eight nine'.split(' ')
  
  digits = {}
  
  positions = ['h1', 'h2', ':', 'm1', 'm2', ':', 's1', 's2']
  
  digit_holder = clock.find('.digits')
  
  $.each(positions, () ->
    console.log @['0']
    if @['0'] == ':'
      digit_holder.append('<div class="dots">')
    else
      pos = $('<div>')
      for i in [1..8]
        pos.append('<span class="d' + i + '">')
      
      digits[@] = pos
      digit_holder.append(pos)
  )
  
  weekday_names = 'MON TUE WED THU FRI SAT SUN'.split(' ')
  weekday_holder = clock.find('.weekdays')
  
  $.each(weekday_names, () ->
    weekday_holder.append('<span>' + @ + '</span>')
  )
  
  weekdays = clock.find('.weekdays span')
  
  $('a.button').click(() ->
    clock.toggleClass('light dark')
  )
  
  update_time = (data) ->
    now = data['time']
    
    digits.h1.attr('class', digit_to_name[now[0]])
    digits.h2.attr('class', digit_to_name[now[1]])
    digits.m1.attr('class', digit_to_name[now[2]])
    digits.m2.attr('class', digit_to_name[now[3]])
    digits.s1.attr('class', digit_to_name[now[4]])
    digits.s2.attr('class', digit_to_name[now[5]])
    
    dow = now[6]
    dow--
    
    if dow < 0
      dow = 6
    
    weekdays.removeClass('active').eq(dow).addClass('active')
    
    ampm.text(now[7]+now[8])
    
  socket = io.connect('http://127.0.0.1:3000')
  socket.on('client_update', update_time)