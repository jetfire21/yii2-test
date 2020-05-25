jQuery(function ($) {

    console.log('---test---');

    $("#new_tickets").on("pjax:end", function () {
        $.pjax.reload({container: "#tickets"});
        // $.pjax.reload('#tickets', {cache: false});
    });


});