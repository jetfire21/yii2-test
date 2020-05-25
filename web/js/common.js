jQuery(function ($) {

    console.log('---test---');

    $("#new_tickets").on("pjax:end", function () {
        $.pjax.reload({container: "#tickets"});
    });

    var modalUpdate = $('#ModalUpdate');
    var modalUpdateForm = $('#ModalUpdate form');
    var ticketsTable = $("#tickets table");
    var wrapTickets = $("#tickets");
    var modalUpdateBtn = $("#ModalUpdate button[type='submit']");
    var linkDelete = $("#tickets table .link-delete");
    var wrapTickets2 = document.querySelector("#tickets");
    var mainWrap = $(".trip-tickets-index");
    // tmp
    var ticketsTableDyn = document.querySelector("#tickets table");
    var updateChecked = false;

    // as21_dyn
    mainWrap.on('click', 'a.link-update', function (e) {
        // $(".trip-tickets-index a.link-update").click(function (e) {

        e.preventDefault();
        console.log('---a.link-update---');
        modalUpdate.modal();

        // var t = $(this).closest('tr').html();
        var sel = $(this).closest('tr');
        console.log('work html: ' + sel.html());
        console.log(sel.get(0));
        // var dataKey = ticketsTable.find("input[type='checkbox']:checked").val();
        jsTT = document.querySelector("#tickets table");
        // var dataKey = jsTT.querySelector(" input[type='checkbox']:checked").value;
        var dataKey = jsTT.querySelector(" input[type='checkbox']:checked");

        if (dataKey === undefined || dataKey === null) dataKey = sel.attr('data-key');
        else dataKey = dataKey.value;
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
            console.log(fieldValuesPush.get(0));
            fieldValuesPush.val(fieldValues[key]);
            // console.log(f);
            // console.log(fieldValuesPush.html());
            console.log(key + " -> " + fieldValues[key]);
        }
        // $('#ModalUpdate').find(".modal-body").load("/trip-tickets/update?id=" + t);

    });

    // mainWrap.on('click', modalUpdateBtn, function (e) {
    mainWrap.on('click', "#ModalUpdate button[type='submit']", function (e) {
        // modalUpdateBtn.on('click', function (e) {

        e.preventDefault();
        console.log('--#ModalUpdate---');
        console.log(e.target);

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
                    console.log(ticketsTable.get(0));
                    console.log(ticketsTableDyn);
                    console.log(wrapTickets.find('table').get(0));
                    console.log(wrapTickets2.querySelector("table"));
                    console.log(document.querySelector("#tickets table"));
                    // var selectTicket = ticketsTable.find("tr[data-key='" + idTicket + "']");
                    var selectTicket = wrapTickets.find("tr[data-key='" + idTicket + "']");
                    // var selectTicket = ticketsTableDyn.querySelector("tr[data-key='" + idTicket + "']");
                    // var ii = $("#tickets table").find("tr[data-key=25]");
                    // console.log(selectTicket);
                    console.log(selectTicket.html());

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

    mainWrap.on('click', '.link-delete', function (e) {
        // linkDelete.on('click', function (e) {

        e.preventDefault();
        console.log('--linkDelete---');
        console.log(e.target);

        var idTicket = $(this).attr('data-id');
        console.log('---' + idTicket);
        // return false;

        $.ajax({
            url: "/trip-tickets/delete?id=" + idTicket,
            data: 'id=' + idTicket,
            type: 'POST',
            success: function (res) {
                console.log('res=' + res);
                var json = JSON.parse(res);
                if (json) {

                    console.log(json.data);
                    // window.location.reload();
                    // if (json.data) $('#send-emails').html(json.data);
                    // console.log('--------' + idTicket);
                    // console.log(ticketsTable.get(0));
                    // console.log(ticketsTableDyn);
                    // console.log(wrapTickets.find('table').get(0));
                    // console.log(wrapTickets2.querySelector("table"));
                    // console.log(document.querySelector("#tickets table"));
                    // var selectTicket = ticketsTable.find("tr[data-key='" + idTicket + "']");
                    var selectTicket = wrapTickets.find("tr[data-key='" + idTicket + "']");
                    // var selectTicket = ticketsTableDyn.querySelector("tr[data-key='" + idTicket + "']");
                    // var ii = $("#tickets table").find("tr[data-key=25]");
                    // console.log(selectTicket);
                    console.log(selectTicket.html());

                    selectTicket.remove();

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

    // $("#as21-multi-action").on('click', function (e) {
    mainWrap.on('click', '#as21-multi-action', function (e) {
        // $("#as21-multi-action").on('click','.trip-tickets-index', function (e) {
        // $("#tickets").on('click', '#as21-multi-action', function (e) {
        // $("body").on('click','#as21-multi-action', function (e) {

        e.preventDefault();
        console.log('--chbox! as21-multi-action--');
        // console.log(e.target())

        var selectAction = $("#formMultiAction select").val();
        console.log('selectAction:' + selectAction);

        //as21_test
        var test1 = ticketsTable;
        // inspect(test1);
        // console.log(test1);
        console.log(document.querySelector("#tickets table"));
        // console.log(test1.html());
        // return false;
        //as21_test

        // var dataKey = ticketsTable.find("input[type='checkbox']:checked").val();
        jsTT = document.querySelector("#tickets table");
        var dataKey = jsTT.querySelector(" input[type='checkbox']:checked").value;
        console.log(dataKey);

        if (parseInt(selectAction) === 2) {
            $(".trip-tickets-index tr[data-key='" + dataKey + "'] a.link-update").trigger('click');
            // тригер не срабатывает дин созд
            // $(".link-update").trigger('click');
            // $(".link-update:first-child").trigger('click');
            return false;
        }
        // as21
        console.log(wrapTickets.get(0));
        var chboxData = wrapTickets.find("input[type='checkbox']:checked").serialize();
        // var test1 = ticketsTable.find("input[type='checkbox']").parent().html();

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
                        wrapTickets.find("tr[data-key='" + ajaxData[key] + "']").remove();
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
    /*
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
    */
    $("#formMultiAction select").change(function () {
        console.log('--change---');
        var selectAction = $("#formMultiAction select").val();
        var changeName = ticketsTable.find("input[type='checkbox']");
        if (parseInt(selectAction) === 1) {
            changeName.attr("name", "selection[]");
            updateChecked = false;
        }
        else {
            changeName.attr("name", "selection");
            updateChecked = true;
            // $("wrapTickets").not(":even");
            wrapTickets.find("input[type='checkbox']").prop('checked', false);
        }
    });

    mainWrap.on('click', "input[type='checkbox']", function (e) {
        // $().click(function(){
        console.log('--checked---');
        if ($(this).is(':checked') && updateChecked) {
            wrapTickets.find("input[type='checkbox']").prop('checked', false);
            $(this).prop('checked', true);
        }
    });

});