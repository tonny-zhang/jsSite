/* jquery.ui.muliselect.js
 *
 * URL: http://corydorning.com/projects/multiselect
 *
 * @author: Cory Dorning
 * @modified: 08/25/2011
 *
 * Multiselect is a jQuery UI widget that transforms a <select>
 * box to provide a better User Experience when you need to select
 * multiple items, without the need to use the CTRL key.
 *
 * 
 * @TODO
 * 
 *
 */

(function($) {
  $.widget('ui.multiselect', {
    _version: 0.1,

    version: function() { return this._version },
  
    // default options
    options: {
      label: '-- Select --',
      minWidth: 200,
      maxWidth: null,
      scroll: 0
    },

    items: [],

    _create: function() {
      var self = this,
          $select = self.element.hide(),
          items = self.items = $select.children('option').map(function(){
            return {
              label: $(this).text(),
              value: $(this).text(),
              option: this // this stores a reference of the option element it belongs to
            };
            }).get();

      var $input = self.input = $('<div class="ui-multiselect-input" />')
            .attr({
              // workaround to close menu on blur
              tabIndex: -1
            })
            .html('<span class="ui-multiselect-label" style="display: inline-block; margin: 2px; padding: 1px;">' + self.options.label + '</span>')
            .insertAfter($select)
            .autocomplete({
              delay: 0,
              minLength: 0,
              source: function(req, resp) {
                var srcItems = [];

                $.each(items, function(i, o) {
                  if (!o.option.selected) {
                    srcItems.push(o);
                  }
                });
                resp(srcItems);
              },
              select: function(ev, ui) {
                $.each(items, function(i, o) {
                  if (ui.item.option === o.option) {
                    self.select(i);
                  }
                });
              }
            })
            .addClass('ui-widget ui-widget-content ui-corner-left')
            .css({
              display: 'inline-block',
              minWidth: self.options.minWidth,
              maxWidth: self.options.maxWidth || 'auto',
              padding: 1,
              verticalAlign: 'middle'
            })
            .click(function() {
              self.button.trigger('click');
            });

      self.button = $('<button>')
        .insertAfter($input)
        .button({
          icons: {
            primary: 'ui-icon-triangle-1-s'
          },
          text: false
        })
        .removeClass('ui-corner-all')
        .addClass('ui-corner-right')
        .css({
          height: $input.outerHeight(),
          verticalAlign: 'middle'
        })
        .click(function() {
          // close if already visible
          if ( $input.autocomplete('widget').is(':visible') ) {
            $input.autocomplete('close');
            return;
          }

          // work around a bug (likely same cause as #5265)
          $(this).blur();

          // pass empty string as value to search for, displaying all results
          $input.autocomplete('search', '');
          $input.focus();
        });

      if (self.options.scroll) {
        $('.ui-autocomplete').css({
          maxHeight: self.options.scroll,
          overflowY: 'auto',
          overflowX: 'hidden',
          paddingRight: '20px'
        });
      }

    }, // _create

    destroy: function() {
      this.input.remove();
      this.button.remove();
      this.element.show();
      $.Widget.prototype.destroy.call( this );
    }, // destroy

    select: function(index) {
      var self = this,
          item = self.items[index];

      item.option.selected = true;
      
      $('<span class="ui-multiselect-item">' + item.label + '</span>')
        .button({
          icons: { secondary: 'ui-icon-close' }
        })
        .css({
          cursor: 'default',
          margin: 2
        })
        .children('.ui-button-text')
          .css({
            lineHeight: 'normal',
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: '.5em'
          })
          .end()
        .children('.ui-icon-close')
          .css({
            cursor: 'pointer'
          })
          .click(function() {
            $(this).parent().remove();
            self.deselect(item);
            return false;
          })
          .end()
        .appendTo(self.input);
        
        self.input.children('.ui-multiselect-label').hide();
    }, // select

    deselect: function(item) {
      var self = this;

      item.option.selected = false;

      if (!self.input.children('.ui-multiselect-item').length) {
        self.input.children('.ui-multiselect-label').show();
      }
    } // deselect

  }); // $.widget('multiselect')
})(jQuery);
