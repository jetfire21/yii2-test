jQuery(function ($) {

    let tmpAjax = false;

    function sendAjax(url, sendData) {
        const csrfToken = $('meta[name="csrf-token"]').attr("content");
        $.ajax({
            url: url,
            data: sendData,
            type: 'POST',
            _csrf: csrfToken,
            success: function (res) {
                console.log('from backend res=' + res);
                var json = JSON.parse(res);
                tmpAjax = json;
                if (json) {
                    console.log(json.data);
                }
            },
            error: function () {
                console.log('Произошла ошибка! Обратитесь к администратору');
            },
            beforeSend: function () {
                // modalUpdateForm.prepend('<h3>Загрузка...</h3>');
                // $.("#loader").css("display", "block");
                // $.("#loader").animate({opacity: 1}, 500);
            }
        });
    }

    let data = sendAjax("/trip-tickets/", 'all=1');

    function template(data) {
        console.log('--template--');
        for (let key in data) {
            console.log(key + '-' + data[key]);
        }
    }

    if (data) template(data);
    console.log(tmpAjax);
    /*

        let template = `
                    <tr data-key="1">
                        <td>1</td>
                        <td><input type="checkbox" name="selection[]" value="1"></td>
                        <td>1</td>
                        <td class="count-room" data-name="from_city">${data.from_city}</td>
                        <td class="field-name" data-name="to_city">Хабаровск</td>
                        <td class="field-name" data-name="recipient">Иванов И.И.</td>
                        <td class="field-name" data-name="status">1</td>
                        <td><a href="/trip-tickets/view?id=1" title="View" aria-label="View" data-pjax="0"><span class="glyphicon glyphicon-eye-open"></span></a> <a href="/trip-tickets/update?id=1" title="Update" aria-label="Update" data-pjax="0"><span class="glyphicon glyphicon-pencil"></span></a> <a href="/trip-tickets/delete?id=1" title="Delete" aria-label="Delete" data-pjax="0" data-confirm="Are you sure you want to delete this item?" data-method="post"><span class="glyphicon glyphicon-trash"></span></a></td>
                        <td><a href="/admin/single/1"><span class="glyphicon glyphicon-eye-open"></span></a> <a class="link-update" href="#" title="Изменить">Изменить</a> <a class="link-delete" href="/trip-tickets/delete?id=1" data-method="post" data-confirm="Вы уверены, что хотите удалить этот элемент?">Удалить</a> </td>
                    </tr>`;
    */

});