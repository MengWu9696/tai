jQuery(document).ready(function () {

    App.init();
    App.initCounter();
    App.initParallaxBg();
    $("#header_menu .dropdown .dropdown-menu li").click(function(){
        $("#header_menu .dropdown-menu").removeClass('active');
        $(this).addClass('active');
        $(this).parent().parent('dropdown').addClass('active');
    });
    $('#header-custom').removeClass('header-sticky');
    $('#header-custom').addClass('header-fix-top');
    $('#header-custom').addClass('header-fixed-shrink');
        var table1 = $('#small_news').DataTable({
            "bLengthChange": false,
            "searching": false,
            "info": false,
            "paging": false,
            "ordering": false,
            "columns": [
                { "data": "eventdate" },
                { "data": "title" },
                { "data": "top" },
            ],
            "columnDefs": [
                {
                    targets: 0,
                    width: "25%",
                    className: "dt-body-center text-nowrap",
                },
                {
                    targets: 1,
                    data: "title",
                    width: "75%",
                    className: "dt-body-left table_title_short",
                    render: function (data, type, full, meta) {
                        var label = '';
                        if (full.top == 1) {
                            label = '<span class="label rounded label-red">置頂</span> ';
                        }
                        return label + '<a href="subpages/securityInfo/securitypolicy_details.aspx?id=' + full.sid + '">' + data + '</a>';
                    }
                },
                {
                    targets: 2,
                    visible: false
                }
            ],
            "order": [[2, 'desc'], [0, 'desc']],
            "initComplete": function (settings, json) {
                
            }
        });

        var table2 = $('#small_hackevent').DataTable({
            "bLengthChange": false,
            "searching": false,
            "info": false,
            "paging": false,
            "ordering": false,
            "columns": [
                { "data": "eventdate" },
                { "data": "title" },
                { "data": "top" },
            ],
            "columnDefs": [
                {
                    targets: 0,
                    width: "25%",
                    className: "dt-body-center text-nowrap",
                },
                {
                    targets: 1,
                    data: "title",
                    width: "75%",
                    className: "dt-body-left table_title_short",
                    render: function (data, type, full, meta) {
                        var label = '';
                        if (full.top == 1) {
                            label = '<span class="label rounded label-red">置頂</span> ';
                        }
                        return label + '<a href="subpages/securityInfo/hackevent_details.aspx?id=' + full.hid + '">' + data + '</a>';
                    }
                },
                {
                    targets: 2,
                    visible: false
                }
            ],
            "order": [[2, 'desc'], [0, 'desc']],
        });

        var table3 = $('#small_loophole').DataTable({
            "bLengthChange": false,
            "searching": false,
            "info": false,
            "paging": false,
            "ordering": false,
            "columns": [
                { "data": "publictime" },
                { "data": "title" },
                { "data": "top" },
            ],
            "columnDefs": [
                {
                    targets: 0,
                    width: "25%",
                    className: "dt-body-center text-nowrap",
                },
                {
                    targets: 1,
                    data: "title",
                    className: "dt-body-left table_title_short",
                    render: function (data, type, full, meta) {
                        var label = '';
                        if (full.top == 1) {
                            label = '<span class="label rounded label-red">置頂</span> ';
                        }
                        return label + '<a href="subpages/securityInfo/loophole_details.aspx?id=' + full.lid + '">' + data + '</a>';
                    }
                },
                {
                    targets: 2,
                    visible: false
                }
            ],
            "order": [[2, 'desc'], [0, 'desc']],
        });

        var table4 = $('#small_secactivity').DataTable({
            "bLengthChange": false,
            "searching": false,
            "info": false,
            "paging": false,
            "ordering": false,
            "columns": [
                { "data": "activitytime" },
                { "data": "correspondname" },
                { "data": "title" },
                { "data": "country" },
                { "data": "top" },
            ],
            "columnDefs": [
                {
                    targets: 0,
                    width: "25%",
                    className: "dt-body-center text-nowrap",
                },
                {
                    targets: 1,
                    width: "25%",
                    className: "dt-body-center text-nowrap",
                },
                {
                    targets: 2,
                    data: "title",
                    className: "dt-body-left table_title_short",
                    render: function (data, type, full, meta) {
                        var label = '';
                        if (full.top == 1) {
                            label = '<span class="label rounded label-red">置頂</span> ';
                        }
                        return label + '<a href="subpages/securityInfo/securityactivity_details.aspx?id=' + full.sid + '">' + data + '</a>';
                    }
                },
                {
                    targets: 3,
                    data: "country",
                    visible: false,
                    render: function (data, type, full, meta) {
                        return data + full.city;
                    }
                },
                {
                    targets: 4,
                    visible: false
                }
            ],
            "order": [[4, 'desc'], [0, 'desc']]
        });

        var table5 = $('#small_activity').DataTable({
            "bLengthChange": false,
            "searching": false,
            "info": false,
            "paging": false,
            "ordering": false,
            "columns": [
                { "data": "act_date" },
                { "data": "title" },
            ],
            "columnDefs": [
                {
                    targets: 0,
                    width: "25%",
                    className: "dt-body-center text-nowrap",
                    render: function (data, type, full, meta) {
                        var d = new Date(data);
                        return d.toISOString().slice(0,10);
                    }
                },
                {
                    targets: 1,
                    data: "title",
                    width: "75%",
                    className: "dt-body-left table_title_short",
                    render: function (data, type, full, meta) {
                        var label = '';
                        if (full.top == 1) {
                            label = '<span class="label rounded label-red">置頂</span> ';
                        }
                        return label + '<a href="subpages/aboutus/activity_list_details.aspx?id=' + full.aid + '">' + data + '</a>';
                    }
                }
            ],
            "order": [[0, 'desc']],
        });

        var table6 = $('#small_publicdoc').DataTable({
            "bLengthChange": false,
            "searching": false,
            "info": false,
            "paging": false,
            "ordering": false,
            "columns": [
                { "data": "create_time" },
                { "data": "title" },
            ],
            "columnDefs": [
                {
                    targets: 0,
                    width: "25%",
                    className: "dt-body-center text-nowrap",
                    render: function (data, type, full, meta) {
                        return data.slice(0, 10);
                    }
                },
                {
                    targets: 1,
                    data: "title",
                    width: "75%",
                    className: "dt-body-left table_title_short",
                    render: function (data, type, full, meta) {
                        var label = '';
                        if (full.top == 1) {
                            label = '<span class="label rounded label-red">置頂</span> ';
                        }
                        return label + '<a href="subpages/ServeThePublic/public_document_details.aspx?id=' + full.pid + '">' + data + '</a>';
                    }
                }
            ],
            "order": [[0, 'desc']],
        });

});
