jQuery(document).ready(function () {
    $("#header_securityInfo").addClass('active');
    App.init();
    $('#header-custom').removeClass('header-sticky');
    $('#header-custom').addClass('header-fix-top');
    $('#header-custom').addClass('header-fixed-shrink');

    // -----------------------------------------------------------

    var local_param = urlParam('local');
    var keyword_param = urlParam('keyword');
    var local_url = local_param ? "Local/" + local_param : "";
    var keyword_url = keyword_param ? "Keyword/" + keyword_param : "";
    if (local_param) {
        if (local_param == "1") {
            $('#list_description').html("<p>搜尋條件：國內</p>");
        } else if (local_param == "2") {
            $('#list_description').html("<p>搜尋條件：國際</p>");
        }
    } else if (keyword_param) {
        $('#list_description').html("<p>搜尋條件：" + decodeURIComponent(keyword_param) + "</p>");
    }

    $('#policy_table').DataTable({
        "ajax": "/api/getApi.php?api=" + "/api/getHackeventList" + local_url + keyword_url,
        "bLengthChange": false,
        "searching": false,
        "info": false,
        "columns": [
            { "data": "eventdate" },
            { "data": "title" },
            { "data": "top" },
        ],
        "columnDefs": [
            {
                targets: 1,
                data: "title",
                className: "dt-body-left",
                render: function (data, type, full, meta) {
                    var label = '';
                    if (full.top == 1) {
                        label = '<span class="label rounded label-red">置頂</span> ';
                    }
                    return label + '<a target="_blank" href="hackevent_details.aspx?id=' + full.hid + '">' + data + '</a>';
                }
            },
            {
                targets: 2,
                visible: false
            }
        ],
        "order": [[2, 'desc'], [0, 'desc']],
    });
});
