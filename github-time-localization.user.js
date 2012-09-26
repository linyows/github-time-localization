// ==UserScript==
// @name        Github Time Localization
// @description Localize time on Github.
// @namespace   linyows
// @include     https://github.com/*
// @author      linyows <linyows@gmail.com>
// @version     1.0.0
// ==/UserScript==
function useLibrary(library, callback)
{
  var counter = 0;

  for (var i in library) {
    var script = document.createElement('script');
    script.setAttribute('src', library[i]);
    script.addEventListener('load', function() {
      var script = document.createElement('script');
      counter++;
      if (counter == library.length) { script.textContent = '(' + callback.toString() + ')();'; }
      document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
  }
}

function userScript()
{
  var m = moment;
  $('time').each(function(){
    var time = moment($(this).attr('datetime'));
    $(this).attr('title', time.format('MMM D, YYYY h:mm a'));
    var style = 'font-size:0.85em;width:auto;height:auto;top:0;margin:0 0.4em';
    $(this).html('<i class="mini-icon mini-icon-time" style="' + style + '"></i>' + time.fromNow());
  });
}

useLibrary(['//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js',
            '//raw.github.com/timrwood/moment/master/min/moment.min.js'], userScript);
