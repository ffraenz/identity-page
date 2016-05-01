
(function($, Modernizr) {

    "use strict";

    // disable tooltips on touch screens
    // prevent triggering the hover state instead of following the anchor
    if (Modernizr.touchevents) {
        return;
    }

    var $tooltip = null;

    // create tooltip after animations have been completed
    setTimeout(function() {
        $tooltip = $('<div></div>');
        $tooltip.addClass('tooltip hidden');
        $('.section-hero').append($tooltip);
    }, 3500);

    // bind to actions
    var $actions = $('.section-hero .actions > li > a');

    $actions.each(function(index, element) {

        // move title attribute value to data-tooltip
        var $element = $(element);
        if (!$element.attr('data-tooltip')) {
            $element.attr('data-tooltip', $($element).attr('title'));
        }

        // clear title attribute to prevent browser tooltip
        $element.attr('title', '');
    });

    $actions.hover(function(evt) {

        if (!$tooltip) {
            return;
        }

        var $this = $(this);
        var offset = $this.offset();
        
        $tooltip
            .text($this.attr('data-tooltip'))
            .css({
                top: offset.top + $this.height(),
                left: offset.left
            });

        $tooltip.removeClass('hidden');

    }, function(evt) {

        if (!$tooltip) {
            return;
        }

        $tooltip.addClass('hidden');
    });

})(jQuery, Modernizr);
