$(function () {
    "use strict";
    var id;
    var item;
    var items;
    var table_header = '<tr><th scope="col">ID</th><th scope="col">Họ tên</th><th scope="col">Ngày sinh</th>\n' +
        '<th scope="col">Giới tính</th><th scope="col">Ngày nhập học</th><th></th></tr>';

    function pagination(students) {
        $('#container').html('');
        $('#table').pagination({
            dataSource: students,
            pageSize: 5,
            ajax: {
                beforeSend: function () {
                    $('#container').html('<td colspan="5">Loading data...</td>');
                },

            },
            callback: function (data, pagination) {
                let html = '';

                if (data == null) {
                    html = '<tr><td colspan="6">Không có sinh viên nào.</td></tr>';
                } else {
                    html = table_header;
                    $.each(data, function (index, item) {
                        let gender;
                        switch (item.gender) {
                            case 0:
                                gender = 'Nữ';
                                break;
                            case 1:
                                gender = 'Nam';
                                break;
                            default:
                                gender = 'Khác';
                                break;
                        }
                        let dateFomat = '';
                        html += '<tr><td>' + item.id + '</td>';
                        html += '<td>' + item.name + '</td>';
                        let date = new Date(item.birthday);
                        dateFomat = ("0" + date.getDate()).slice(-2) + "/"
                            + ("0" + (date.getMonth() + 1)).slice(-2)
                            + "/" + date.getFullYear();
                        html += '<td>' + dateFomat + '</td>';
                        html += '<td>' + gender + '</td>';
                        date = new Date(item.enrollDate);
                        dateFomat = ("0" + date.getDate()).slice(-2) + "/"
                            + ("0" + (date.getMonth() + 1)).slice(-2)
                            + "/" + date.getFullYear();
                        html += '<td>' + dateFomat + '</td>';
                        html += '<td><button class="btn btn-primary mr-1 text-white edit"' +
                            'data-id="' + item.id + '"><i class="fas' +
                            ' fa-edit"></i></a>';
                        html += '<button class="btn btn-danger text-white delete" data-id="' +
                            item.id + '"><i class="fas fa-trash"></i></button></td></tr>';
                    });
                }

                $('#container').html(html);
            }
        });
    }

    $("#birthdayPicker").datepicker({
        monthNames: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
            "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
        dayNames: ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"],
        dayNamesMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
        firstDay: 1,
        selectOtherMonths: true,
        dateFormat: "dd/mm/yy",
    });
    $("#enrollDatePicker").datepicker({
        monthNames: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
            "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
        dayNames: ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"],
        dayNamesMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
        firstDay: 1,
        selectOtherMonths: true,
        dateFormat: "dd/mm/yy",
    });

    $('#insert-button').click(function () {
        item = null;

        getStudents();

        $('#title').html('Thêm mới');
        $('#updateBtn').html('Thêm mới');

        $('#id').val(items[items.length - 1].id + 1);
        $('#name').val("");
        $('#birthdayPicker').val("");
        $('#gender').val("");
        $('#enrollDatePicker').val("");

        $('#update-modal').modal('toggle');
    });

    $('#deleteBtn').click(function () {
        $.ajax({
            method: 'get',
            url: '/delete?id=' + id,
            contentType: "application/json",
            dataType: 'json',
            success: function (e) {
                console.log(e);
            },
            error: function (e) {
                console.log(e);
            }
        });
        getStudents();
        $('#delete-modal').modal('hide');
    });

    $('#updateBtn').click(function () {
        let url = 'id=' + $('#id').val();
        url += '&name=' + $('#name').val();
        url += '&birthday=' + $('#birthdayPicker').val();
        url += '&gender=' + $('#gender').val();
        url += '&enrollDate=' + $('#enrollDatePicker').val();

        if (item == null) {
            url = '/insert?' + url;
        } else {
            url = '/edit?' + url;
        }
        $.ajax({
            method: 'get',
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function (e) {
                console.log(e);
                getStudents();
            },
            error: function (e) {
                console.log(e);
            }
        })
        $('#update-modal').modal('hide');
        // $(location).attr('href', '/');
    });

    $('#filter-button').click(function () {
        if ($('#filter-block').attr('data-id') === '0') {
            $('#filter-block').attr('data-id', '1').fadeIn(1500);
        } else {
            $('#filter-block').attr('data-id', '0').fadeOut(1000);
        }
    });

    $('#filter-keyword').on('propertychange input', function (e) {
        var valueChanged = false;
        if (e.type === 'propertychange') {
            valueChanged = e.originalEvent.propertyName === 'value';
        } else {
            valueChanged = true;
        }
        if (valueChanged) {
            filter($(this).val());
        }
    });

    function filter(keyword) {
        let result = [];
        $.each(items, function (i, item) {
            if (removeAccent(item.name).indexOf(removeAccent(keyword)) !== -1) {
                result.push(item);
            }
        });
        pagination(result);
    }

    function removeAccent(s) {
        s = s.toLowerCase().replace('đ', 'd');
        s = s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return s;
    }

    function getStudents() {
        $.ajax({
            url: '/get-student',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function (data) {
                if (data.code === 200) {
                    items = data.datas;
                    pagination(items);
                }
            },
            error: function (e) {
                console.log(e);
            }
        }, 60000);
    }

    $(document).ready(function () {
        $('#filter-block').attr('data-id', '0').fadeOut(0);

        getStudents();

        $(document).on('click', 'button.edit', function (e) {
            id = $(this).attr('data-id');
            $('#title').html('Cập nhật');
            $('#updateBtn').html('Cập nhật');
            item = null;
            $.each(items, function (index, s) {
                if (s.id === parseInt(id)) {
                    item = s;
                    return;
                }
            });
            if (item != null) {
                $('#id').val(item.id);
                $('#name').val(item.name);
                let date = new Date(item.birthday);
                let dateFomat = ("0" + date.getDate()).slice(-2) + "/"
                    + ("0" + (date.getMonth() + 1)).slice(-2)
                    + "/" + date.getFullYear();
                $('#birthdayPicker').datepicker("setDate", dateFomat);
                $('#gender').val(item.gender);
                date = new Date(item.enrollDate);
                dateFomat = ("0" + date.getDate()).slice(-2) + "/"
                    + ("0" + (date.getMonth() + 1)).slice(-2)
                    + "/" + date.getFullYear();
                $('#enrollDatePicker').datepicker("setDate", dateFomat);
                $('#update-modal').modal('toggle');
            } else {
                $.alert('Sinh viên không tồn tại', {
                    autoClose: true,
                    closeTime: 3000,
                    type: 'warning',
                    position: ['top-right'],
                });
            }
        });

        $(document).on('click', 'button.delete', function (e) {
            id = $(this).attr('data-id');
            item = null;
            $.each(items, function (index, s) {
                if (s.id === parseInt(id)) {
                    item = s;
                    return;
                }
            });
            if (item == null) {
                $.alert('Sinh viên không tồn tại', {
                    autoClose: true,
                    closeTime: 3000,
                    type: 'warning',
                    position: ['top-right'],
                });
            } else {
                $('#delete-modal').modal('toggle');
            }
        });
    });
});