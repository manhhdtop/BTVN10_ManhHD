$(function () {
    "use strict";
    // Variable id use to save id of a row in student table
    var id;

    // Variable item use to save a student
    var item;

    // Variable items use to save list student
    var items;

    // Variable table_header is html of student table title. It use to render student table
    var table_header = '<tr class="bg-primary"><th scope="col">ID</th><th scope="col">Họ tên</th><th' +
        ' scope="col">Ngày sinh</th>\n' +
        '<th scope="col">Giới tính</th><th scope="col">Ngày nhập học</th><th></th></tr>';

    /**
     * This method call to pagination student table
     * @param students is list of student
     */
    function pagination(students) {
        /**
         * pagination is function of library pagination.js
         * dataSource is data to paging
         * pageSide is number of item in a page
         * ajax is some process use before paging
         * callback use to process data to paging
         */
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
                        html += '<tr><td class="min">' + item.id + '</td>';
                        html += '<td>' + item.name + '</td>';
                        let date = new Date(item.birthday);
                        dateFomat = ("0" + date.getDate()).slice(-2) + "/"
                            + ("0" + (date.getMonth() + 1)).slice(-2)
                            + "/" + date.getFullYear();
                        html += '<td>' + dateFomat + '</td>';
                        html += '<td data-value="' + item.gender + '">' + gender + '</td>';
                        date = new Date(item.enrollDate);
                        dateFomat = ("0" + date.getDate()).slice(-2) + "/"
                            + ("0" + (date.getMonth() + 1)).slice(-2)
                            + "/" + date.getFullYear();
                        html += '<td>' + dateFomat + '</td>';
                        html += '<td class="min"><button class="btn btn-primary mr-1 text-white edit">' +
                            '<i class="fas fa-pen-square"></i></button>';
                        html += '<button class="btn btn-danger text-white delete" data-id="' +
                            item.id + '"><i class="fas fa-trash"></i></button></td></tr>';
                    });
                }

                $('#container').html(html);
            }
        });
    }

    /**
     * Validate input type datepicker from datepicker by jquery-ui
     */
    $("input.datepicker").on('blur', function () {
        let valid = true;
        if (this.value.match(/\d{1,2}[^\d]\d{1,2}[^\d]\d{4,4}/gi) == null) {
            valid = false;
        } else {
            var t = this.value.split(/[^\d]/);
            var dd = parseInt(t[0], 10);
            var m0 = parseInt(t[1], 10) - 1;
            var yyyy = parseInt(t[2], 10);
            var d = new Date(yyyy, m0, dd);
            if (d.getDate() !== dd || d.getMonth() !== m0 || d.getFullYear() !== yyyy) {
                valid = false;
            }
        }

        if (valid) {
            $(this).removeClass('is-invalid');
        } else {
            $(this).addClass('is-invalid');
        }
    });

    /**
     * Init datepicker for birthday input
     * monthNames is name for months
     * dayNames is name for day of week
     * firstDay check first of week is sunday or monday (0: sunday, 1: monday)
     * dateFormat is format of date
     */
    $("#birthdayPicker").datepicker({
        monthNames: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
            "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
        dayNames: ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"],
        dayNamesMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
        firstDay: 1,
        dateFormat: "dd/mm/yy",
    });

    /**
     * Init datepicker for enrollDate input
     * monthNames is name for months
     * dayNames is name for day of week
     * firstDay check first of week is sunday or monday (0: sunday, 1: monday)
     * dateFormat is format of date
     */
    $("#enrollDatePicker").datepicker({
        monthNames: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
            "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
        dayNames: ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"],
        dayNamesMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
        firstDay: 1,
        dateFormat: "dd/mm/yy",
    });

    /**
     * Handle the onclick event of button id: insert-button open modal to insert new student
     */
    $('#insert-button').click(function () {
        item = null;
        // Get list student from server to init new id for student
        getStudents();

        $('#title').html('Thêm mới');
        $('#update-btn').html('Thêm mới');

        $('#id').val(items[items.length - 1].id + 1).removeClass('is-valid').removeClass('is-invalid');
        $('#name').val("").removeClass('is-valid').removeClass('is-invalid');
        $('#birthdayPicker').val("").removeClass('is-valid').removeClass('is-invalid');
        $('#gender').val("").removeClass('is-valid').removeClass('is-invalid');
        $('#enrollDatePicker').val("").removeClass('is-valid').removeClass('is-invalid');

        // Open modal
        $('#update-modal').modal('toggle');
    });

    /**
     * Handle the onclick event of button id: delete-btn delete a student using ajax.
     */
    $('#delete-btn').click(function () {
        $.ajax({
            method: 'get',
            url: '/delete?id=' + id,
            contentType: "application/json",
            dataType: 'json',
            success: function (e) {
                console.log(e);
                $.alert(e.message, {
                    autoClose: true,
                    closeTime: 3000,
                    type: 'success',
                    position: ['top-right'],
                });
                getStudents();
            },
            error: function (e) {
                console.log(e);
                $.alert(e.message, {
                    autoClose: true,
                    closeTime: 3000,
                    type: 'warning',
                    position: ['top-right'],
                });
            }
        });
        $('#delete-modal').modal('hide');
    });

    /**
     * Handle the onclick event of button id: update-btn add/edit a student using ajax.
     */
    $('#update-btn').click(function () {
        if (validate()) {
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
            });
            $('#update-modal').modal('hide');
        }
    });

    /**
     * Handle the onclick event of button id: filter-button show/hide search input.
     */
    $('#filter-button').click(function () {
        if ($('#filter-block').attr('data-id') === '0') {
            $('#filter-block').attr('data-id', '1').fadeIn(1500);
            $('#filter-keyword').focus();
        } else {
            $('#filter-block').attr('data-id', '0').fadeOut(1000);
        }
    });

    /**
     * Handle the onchanging event of search input to search student and change css.
     */
    $('#filter-keyword').on('propertychange input', function (e) {
        var valueChanged = false;
        if (e.type === 'propertychange') {
            valueChanged = e.originalEvent.propertyName === 'value';
        } else {
            valueChanged = true;
        }
        if (valueChanged) {
            if ($(this).val().trim() === '') {
                $('#clear-input').removeClass('btn-focus').hide();
                $(this).removeClass('input-focus border-right-0 border');
            } else {
                $('#clear-input').addClass('btn-focus').show();
                $(this).addClass('input-focus border-right-0 border');
            }
            filter($(this).val());
        }
    }).focus(function () {
        if ($(this).val().trim() !== "") {
            $(this).addClass('input-focus border-right-0 border');
            $('#clear-input').addClass('btn-focus');
        } else {
            $('#clear-input').removeClass('btn-focus').hide();
        }
    }).blur(function () {
        $(this).removeClass('input-focus border-right-0 border');
        $('#clear-input').removeClass('btn-focus');
    });

    /**
     * Handle the onclick event of button id: clear-input to clear search input value.
     */
    $('#clear-input').click(function () {
        $('#filter-keyword').val('').focus();
    });

    /**
     * Function filter use to search a student by name
     */
    function filter(keyword) {
        let result = [];
        $.each(items, function (i, item) {
            if (removeAccent(item.name).indexOf(removeAccent(keyword)) !== -1) {
                result.push(item);
            }
        });
        pagination(result);
    }

    /**
     * Function validate use to validate input field to add/edit student
     */
    function validate() {
        let valid = true;
        $('#id').addClass('is-valid').removeClass('is-invalid');
        let value = $('#name').val();
        if (value.trim() === "") {
            $('#name').addClass('is-invalid').removeClass('is-valid');
            valid = false;
        } else {
            $('#name').addClass('is-valid').removeClass('is-invalid');
        }
        value = $('#birthdayPicker').val();
        if (value.trim() === "") {
            $('#birthdayPicker').addClass('is-invalid').removeClass('is-valid');
            valid = false;
        } else {
            if ($('#birthdayPicker').hasClass('is-invalid')) {
                valid = false;
            } else {
                $('#birthdayPicker').addClass('is-valid');
            }
        }
        value = $('#gender').val();
        if (value == null) {
            $('#gender').addClass('is-invalid').removeClass('is-valid');
            valid = false;
        } else {
            $('#gender').addClass('is-valid').removeClass('is-invalid');
        }
        value = $('#enrollDatePicker').val();
        if (value.trim() === "") {
            $('#enrollDatePicker').addClass('is-invalid').removeClass('is-valid');
            valid = false;
        } else {
            if ($('#enrollDatePicker').hasClass('is-invalid')) {
                valid = false;
            } else {
                $('#enrollDatePicker').addClass('is-valid');
            }
        }
        return valid;
    }

    /**
     * Function removeAccent use to clear utf-8 character and convert to lowercase
     */
    function removeAccent(s) {
        s = s.toLowerCase().replace('đ', 'd');
        s = s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return s;
    }

    /**
     * Function getStudents use to get list student form server
     */
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

    /**
     * $(document).ready() called when page loaded
     */
    $(document).ready(function () {
        // Hide filter block
        $('#filter-block').attr('data-id', '0').fadeOut(0);
        // Hide button clear-input
        $('#clear-input').hide();
        // call function getStudents
        getStudents();

        /**
         * Handle onclick from button have class name is edit to edit student
         */
        $(document).on('click', 'button.edit', function (e) {
            id = $(this).attr('data-id');
            let row = $(this).parent().parent();
            item = {
                id: row.find('td:nth-child(1)').html(),
                name: row.find('td:nth-child(2)').html(),
                birthday: row.find('td:nth-child(3)').html(),
                gender: row.find('td:nth-child(4)').attr('data-value'),
                enrollDate: row.find('td:nth-child(5)').html(),
            };
            $('#title').html('Cập nhật');
            $('#update-btn').html('Cập nhật');
            $('#id').val(item.id).removeClass('is-valid');
            $('#name').val(item.name).removeClass('is-valid').removeClass('is-invalid');
            $('#birthdayPicker').datepicker("setDate", item.birthday).removeClass('is-valid').removeClass('is-invalid');
            $('#gender').val(item.gender).removeClass('is-valid').removeClass('is-invalid');
            $('#enrollDatePicker').datepicker("setDate", item.enrollDate).removeClass('is-valid').removeClass('is-invalid');
            $('#update-modal').modal('toggle');
        });

        /**
         * Handle onclick from button have class name is delete to delete student
         */
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