!function ($) {
  var $body;

  if (document.body) {
    $body = $('body');
  } else {
    $(function () {
      $body = $('body');
    });
  }

  $.fn.miniTip = $.extend(function (options) {

    options = $.extend({
      size: '12px',
      color: '#007AFF',
      blurColor: '#8E8E93'
    }, options);
    
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
          height: options.size,
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
          marginTop: options.size,
          color: options.blurColor,
          backgroundColor: 'white',
          fontSize: options.size
        }
      });

      wrapper.append(miniTip);
      $body.append(wrapper);

      process.call(this);
      $this.on('input propertychange', process);
      $this.on('focus', focus);
      $this.on('blur', blur);

      function process(event) {
        var $this = $(this);

        if (event && event.type === 'propertychange'
          && event.originalEvent.propertyName.toLowerCase() !== 'value')
          return;

        if (parseInt(miniTip.css('margin-top'), 10) > 0 && $this.val().length > 0)
          miniTip.finish().animate({marginTop: '0'}, $.fn.miniTip.duration);
        else if (parseInt(miniTip.css('margin-top'), 10) === 0 && $this.val().length === 0)
          miniTip.finish().animate({marginTop: options.size}, $.fn.miniTip.duration);
      }

      function focus() {
        miniTip.finish().animate({'color': options.color}, $.fn.miniTip.duration);
      }

      function blur() {
        miniTip.finish().animate({'color': options.blurColor}, $.fn.miniTip.duration);
      }
    });
  }, {
    duration: 200
  });
}(jQuery);
