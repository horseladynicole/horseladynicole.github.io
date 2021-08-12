export default (el) => {
  jQuery(function ($) {
  if ($('#work-filters').length) {
    $(".filter-group input[type='checkbox']").change(function(){
      if ($(".filter-group input[type='checkbox']:checked").length) {
        var $stats = $(".filter-group input[type='checkbox']:checked");
        var $items = $('.all-work-block .work-teaser');

        $items.removeClass('do-none').addClass('do-block');
        if ($stats.length == 0) {
          return;
        }
        var $vstats = $.map($stats, function(o) {return $(o).data('id'); });
        $stats.each(function() {
          var $stat = $(this);
          $items.filter(function() {
            return $vstats.indexOf($(this).data($stat.data('type'))) < 0;
          }).addClass('do-none').removeClass('do-block');
        });
      }
    });
  }
  })

  return;
}