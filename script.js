var time = 40;
var now;
var hasStarted = false;
var t;
var showSet = false;
var audio = false;
var timeOver = document.createElement('audio');
timeOver.src = 'timeover.m4a';
var last10seconds = document.createElement('audio');
last10seconds.src = "last10seconds.m4a";


$(document).ready(function () {
  init();
  $('#start').click(start);
  $('#pause').click(pause);
  $('#stop').click(stop);
  $('#set').click(set);
  $(document).keydown(function (key) {
    switch(parseInt(key.which,10)) {
      case 32:
        if(hasStarted) {
          pause();
        } else {
          start();
        }
        break;
      case 27:
        stop();
        break;
      case 13:
        set();
        break;
      default:
        break;
    }
  });
});

var init = function () {
  clearInterval(t);
  now = time;
  $('#countdown').text(now + "秒");
  showStart();
  audio = false;
  $('#countdown').css("color", "black");
}

var showStart = function () {
  hasStarted = false;
  $('#pause').hide();
  $('#start').show();
}

var showPause = function () {
  hasStarted = true;
  $('#start').hide();
  $('#pause').show();
}

var start = function () {
  showPause();
  t = setInterval(function () {
    if(now > 0) {
      now--;
      $('#countdown').text(now + "秒");
      if(now <= 10 && !audio) {
        $('#countdown').css("color", "red");
        last10seconds.currentTime = 0;
        last10seconds.play();
        audio = true;
      }
    } else {
      $('#countdown').text('时间到');
      last10seconds.pause()
      timeOver.play();
      clearInterval(t);
      setTimeout("init()", 2000);
    }
  }, 1000);
}

var pause = function () {
  showStart();
  last10seconds.pause();
  audio = false;
  clearInterval(t);
}

var stop = init;

var set = function () {
  var strTime = prompt("设置时间", time);
  if(null != strTime && !isNaN(parseInt(strTime))) {
      time = parseInt(strTime);
  }
  init();
}
