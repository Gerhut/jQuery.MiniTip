!function ($) {
  var miniTips = []
    , DURATION = 200
    , $body;

  if (document.body) {
    $body = $('body');
  } else {
    $(function () {
      $body = $('body');
    });
  }

  function process(event) {
    var $this = $(this)
      , miniTip = miniTips[+$this.data('miniTipId')];

    if (event && event.type === 'propertychange'
      && event.originalEvent.propertyName.toLowerCase() !== 'value')
      return;

    if (parseInt(miniTip.css('margin-top'), 10) > 0 && $this.val().length > 0)
      miniTip.stop().animate({marginTop: '0'}, DURATION);
    else if (parseInt(miniTip.css('margin-top'), 10) === 0 && $this.val().length === 0)
      miniTip.stop().animate({marginTop: $this.css('fontSize')}, DURATION);
  }

  $.fn.miniTip = function (size, color) {

    if (typeof size === 'string') {
      color = size;
      size = 12;
    } else {
      size = size || 12;
      color = color || 'blue'
    }
    this.filter('input').each(function () {
      var $this = $(this)
        , wrapper, miniTip;

      if (typeof $body === 'undefined')
        throw new Error('Call MiniTip in body or after $(document).ready');
      if (typeof $this.attr('placeholder') === 'undefined')
        throw new Error('No placeholder');

      wrapper = $('<div>', {
        css: {
          position: 'absolute',
          height: size + 'px',
          overflow: 'hidden'
        },
        offset: function (offset) {
          return {
            top: parseInt(offset.top - 8),
            left: parseInt(offset.left + 5)
          }
        }($this.offset())
      });

      miniTip = $('<p>', {
        text: $this.attr('placeholder'),
        css: {
          marginTop: size + 'px',
          color: color,
          backgroundColor: 'white',
          fontSize: size + 'px'
        }
      });

      wrapper.append(miniTip);
      $body.append(wrapper);

      miniTips.push(miniTip);
      $this.data('miniTipId', miniTips.length - 1);

      process.call(this);
      $this.on('input propertychange', process);
    });
  }
}(jQuery);
