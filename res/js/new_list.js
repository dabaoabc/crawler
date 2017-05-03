$(function() {
    var $selected = $('#js-selected');
    var $data = $("li[data-category='none']")

    $selected.on('change', function() {
        var select = $(this).find('option').eq(this.selectedIndex).val();
        if (select == 'all') {
            $data.each(function() {
                $(this).css("display", "block");;
            });
        } else {
            $data.each(function() {
                $(this).css("display", "none");;
            });
        }
    });
});
