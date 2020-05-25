jQuery(function ($) {

    console.log('---test---');

    $("#new_tickets").on("pjax:end", function () {
        $.pjax.reload({container: "#tickets"});
    });

    var modalUpdate = $('#ModalUpdate');
    var modalUpdateForm = $('#ModalUpdate form');
    var modalUpdateBtn = $("#ModalUpdate button[type='submit']");
    var ticketsTable = $("#tickets table");

    $(".trip-tickets-index a.link-update").on('click', function (e) {

        e.preventDefault();
        modalUpdate.modal();

        // var t = $(this).closest('tr').html();
        var sel = $(this).closest('tr');
        var dataKey = ticketsTable.find("input[type='checkbox']:checked").val();
        if (dataKey === undefined) dataKey = sel.attr('data-key');
        console.log('----------' + dataKey);
        // return false;
        modalUpdateForm.attr('data-id', dataKey);
        // return false;

        // var d = sel.find("td").text();
        // console.log(d);
        var fieldValues = {};
        $(sel.find("td")).each(function (i, el) {
            var dataName = $(el).attr('data-name');
            if (dataName !== undefined) fieldValues[dataName] = $(el).text();
        });
        console.log(fieldValues);
        // fieldValues = JSON.stringify(fieldValues);
        // console.log(fieldValues);

        // TripTickets[from_city];
        // var form = $(modalUpdate + " form");
        // console.log(form.html());
        // var f3 = $(form).find(".to_city");
        // console.log(f);
        // console.log(f3.html());

        for (var key in fieldValues) {
            // var f = $(form).find("input[name='TripTickets[" + key + "]'");
            // var f2 = $(form).find('input[name="TripTickets[to_city]"');
            // var f2 = $(form).find(".to_city");
            var fieldValuesPush = modalUpdateForm.find("." + key);
            fieldValuesPush.val(fieldValues[key]);
            // console.log(f);
            // console.log(fieldValuesPush.html());
            console.log(key + " -> " + fieldValues[key]);
        }
        // $('#ModalUpdate').find(".modal-body").load("/trip-tickets/update?id=" + t);

    });

    modalUpdateBtn.on('click', function (e) {

        e.preventDefault();
        ticketsTable.find("input[type='checkbox']").removeAttr('checked');
        ticketsTable.find("input[type='checkbox']").prop('checked', false);
        var formData = modalUpdateForm.serialize();
        var idTicket = modalUpdateForm.attr('data-id');
        console.log('---' + idTicket);
        console.log('---' + formData);
        // return false;

        $.ajax({
            url: "/trip-tickets/update?id=" + idTicket,
            data: formData,
            type: 'POST',
            success: function (res) {
                console.log('res=' + res);
                var json = JSON.parse(res);
                if (json) {

                    console.log(json.data);
                    // window.location.reload();
                    // if (json.data) $('#send-emails').html(json.data);
                    console.log('--------' + idTicket);
                    var selectTicket = ticketsTable.find("tr[data-key='" + idTicket + "']");
                    // var ii = $("#tickets table").find("tr[data-key=25]");
                    // console.log(selectTicket.html());

                    var ajaxData = json.data;
                    for (var key in ajaxData) {
                        // console.log(ajaxData[key]);
                        selectTicket.find("td[data-name='" + key + "']").text(ajaxData[key]);
                    }
                }
            },
            error: function () {
                console.log('Произошла ошибка! Обратитесь к администратору');
            },
            beforeSend: function () {
                modalUpdateForm.prepend('<h3>Загрузка...</h3>');
                // $.("#loader").css("display", "block");
                // $.("#loader").animate({opacity: 1}, 500);
            }
        });
    });

    $("#as21-multi-action").on('click', function (e) {
        // $("#as21-multi-action").on('click','.trip-tickets-index', function (e) {
        // $(".trip-tickets-index").on('click', '#as21-multi-action', function (e) {
        // $("#tickets").on('click', '#as21-multi-action', function (e) {
        // $("body").on('click','#as21-multi-action', function (e) {

        e.preventDefault();
        console.log('--chbox as21-multi-action--');
        // console.log(e.target())

        var selectAction = $("#formMultiAction select").val();
        console.log('selectAction:' + selectAction);

        // as21
        var dataKey = ticketsTable.find("input[type='checkbox']:checked").val();
        if (parseInt(selectAction) === 2) {
            $(".trip-tickets-index tr[data-key='" + dataKey + "'] a.link-update").trigger('click');
            return false;
        }
        // as21
        var chboxData = ticketsTable.find("input[type='checkbox']:checked").serialize();
        // var test1 = ticketsTable.find("input[type='checkbox']").parent().html();
        var test1 = ticketsTable.html();
        console.log(test1);
        console.log('chboxData: ' + chboxData);
        if (!chboxData) return false;

        $.ajax({
            url: "/trip-tickets/multi-delete",
            data: chboxData,
            type: 'POST',
            success: function (res) {
                console.log('res=' + res);
                var json = JSON.parse(res);
                if (json) {
                    console.log(json.data);
                    var ajaxData = json.data.ids;
                    for (var key in ajaxData) {
                        // console.log(ajaxData[key]);
                        ticketsTable.find("tr[data-key='" + ajaxData[key] + "']").remove();
                    }
                }
            },
            error: function () {
                console.log('Произошла ошибка! Обратитесь к администратору');
            },
            beforeSend: function () {
                modalUpdateForm.prepend('<h3>Загрузка...</h3>');
                // $.("#loader").css("display", "block");
                // $.("#loader").animate({opacity: 1}, 500);
            }
        });
    });

    $("#as21_multi_action").on('click', function (e) {
        e.preventDefault();
        console.log('--btn--');
        // var a = $(this).closest("select");
        // var a = $("#formMultiAction select");

        // ticketsTable.find("input[type='checkbox']");
        var changeName = ticketsTable.find("input[type='checkbox']");
        var dataKey = ticketsTable.find("input[type='checkbox']:checked").val();
        var selectAction = $("#formMultiAction select").val();
        console.log(selectAction);

        if (parseInt(selectAction) === 1) changeName.attr("name", "selection[]");
        else {
            changeName.attr("name", "selection");
            $(".trip-tickets-index tr[data-key='" + dataKey + "'] a.link-update").trigger('click');
        }
    });

    $("#formMultiAction select").change(function () {
        var selectAction = $("#formMultiAction select").val();
        var changeName = ticketsTable.find("input[type='checkbox']");
        if (parseInt(selectAction) === 1) changeName.attr("name", "selection[]");
        else {
            changeName.attr("name", "selection");
        }
    });
    /*
        function runAjax(url,sendData) {
            $.ajax({
                url: url,
                data: sendData,
                type: 'POST',
                success: function (res) {
                    console.log('res=' + res);
                    var json = JSON.parse(res);
                    if (json) {
                        console.log(json.data);
                        var ajaxData = json.data.ids;
                        for (var key in ajaxData) {
                            // console.log(ajaxData[key]);
                            ticketsTable.find("tr[data-key='" + ajaxData[key] + "']").remove();
                        }
                    }
                },
                error: function () {
                    console.log('Произошла ошибка! Обратитесь к администратору');
                },
                beforeSend: function () {
                    modalUpdateForm.prepend('<h3>Загрузка...</h3>');
                    // $.("#loader").css("display", "block");
                    // $.("#loader").animate({opacity: 1}, 500);
                }
            });
        }
        */

});