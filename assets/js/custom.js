//location.href="/Maintain.aspx";
/* Write here your custom javascript codes */
jQuery(document).ready(function () {
    $.blockUI();
    //查詢 TOP 10 關鍵字
    $.ajax({
        url: "/api/getApi.php?api="+"/api/getTopSearchKeyword",
        type: "GET",
        success: function(data){
            var json = JSON.parse(data);
            // console.log(data);
            for (var i = 0; i < json.length; i++) {
                // console.log(json[i].keyword)
                $("#label_keyword").append('<a href="/search_result.aspx?keyword=' + json[i].keyword
                    + '" title="' + (urlParam('lang') == "en-US" ? 'Top Keword: ': '熱門搜尋關鍵字: ')
                    + json[i].keyword + '">' + json[i].keyword + '</a>');
                if (i < json.length - 1) {
                    $("#label_keyword").append("、");
                }
            }
        }
    })
    // 目錄處理
    var handle_header = function (tempArr) {
        tempArr.forEach(function (row, index) {
            if (row && row.data && index != 0) {
                var subName = '';
                var idName = '';
                row.data.forEach(function (dataRow) {
                    if (dataRow.url) {
                        subName += '<li><a href="' + dataRow.url + '">' + dataRow.name + '</a></li>';
                    } else {
                        subName += '<li><a href="javascript: alert(\'目前尚無功能!\');">' + dataRow.name + '</a></li>';
                    }
                    if (!idName && dataRow.url.match(/\/subpages\/(.*?)\//)) {
                        idName = dataRow.url.match(/\/subpages\/(.*?)\//)[1];
                    }
                });
                $("#header_menu").append(
                    '<li id="header_' + index + '" class="dropdown">' +
                    '<a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown">' +
                    row.name +
                    '</a>' +
                    '<ul class="dropdown-menu">' + subName + '</ul>' +
                    '</li>'
                );
                if (window.location.pathname.match(idName)) {
                    $("#header_" + index).addClass('active');
                }

            }
        });
        // 部分頁面不提供中英文轉換
        if (window.location.pathname.match("securityInfo") || window.location.pathname.match("security_school")) {
            $("#header_menu").append(
                '<li id="header_eng" class="dropdown hidden-md hidden-lg">' +
                '<a href="/Default.aspx?lang=en-US" title="切換為英文網頁"><i class="fa fa-globe"></i> English</a>' +
                '</li>'
            );

            $('#header-custom .mega-menu .container .pull-right .hoverSelector a').prop('onclick',null).off('click');
            $('#header-custom .mega-menu .container .pull-right .hoverSelector a:first').attr("href", "/Default.aspx?lang=en-US");
        } else {

            if (urlParam('lang') == "en-US") {
                $("#header_menu").append(
                    '<li id="header_eng" class="dropdown hidden-md hidden-lg">' +
                    '<a href="#" onclick="lang_change()" title="Chinese webstie"><i class="fa fa-globe"></i> 中文</a>' +
                    '</li>'
                );
            } else {
                $("#header_menu").append(
                    '<li id="header_eng" class="dropdown hidden-md hidden-lg">' +
                    '<a href="#" onclick="lang_change()" title="切換為英文網頁"><i class="fa fa-globe"></i> English</a>' +
                    '</li>'
                );
            }
        }

        // 使用 tab 切換目錄
        $('#header_menu').on('mouseenter focusin', '.dropdown > a', function (e) {
            $(this)
                .parent('.dropdown')
                .addClass('active')
                .siblings('.dropdown')
                .removeClass('active');
            $(this)
                .parent('.dropdown')
                .find('.dropdown-menu')
                .show();
            $(this)
                .parent('.dropdown')
                .siblings('.dropdown')
                .find('.dropdown-menu')
                .hide();
        });

        // Breadcrumbs 路徑位置
        $('.breadcrumb').append('<li><a href="' + tempArr[0]["url"] + '">' + tempArr[0]["name"] + '</a></li>');
        var temp = $("#header_menu li.active").attr('id');
        temp = temp ? parseInt(temp.substr(7)) : null;
        if (typeof temp == 'number') {
            // console.log(tempArr[temp]["name"])
            $('.breadcrumb').append('<li><a href="' + (tempArr[temp]["url"] ? tempArr[temp]["url"] : "#") + '">' + tempArr[temp]["name"] + '</a></li>');
            var check = false;
            tempArr[temp]["data"].forEach(function (row) {
                if (row.url) {
                    var path = row.url.replace(/\.aspx$/, '').replace(/\.aspx\?.+$/, '');
                    if (check == false && window.location.pathname.match(path)) {
                        $('.breadcrumb').append('<li class="active">' + row.name + '</li>');
                        $('#page_title').text(row.name);
                        check = true;
                    }
                }
            });
        } else {
            if (urlParam('lang') == "en-US") {
                $('.breadcrumb').append('<li class="active">Others</li>');
            }else{
                $('.breadcrumb').append('<li class="active">其他</li>');
            }
        }


    }

    // 目錄的搜尋 show & hide
    if (window.location.pathname.match(/^\/$/) || window.location.pathname.match("Default") || window.location.pathname.match("search_result")){
        $("#header_search").hide();
        if (window.location.pathname.match("search_result") && screen.width > 767) {
            $("#search_form").parent().css({ "margin-top": "80px" });
        }
    } else {
        $("#search_form").hide();
    }
    $("#header_search").click(function (){
        if ( $("#search_form").is(':visible') ){
            $("#search_form").hide();
            $("#search_form").parent().css({ "margin-top": "0px" });
        } else {
            $("#search_form").show();
            $("#search_form").parent().css({ "margin-top": "80px" });
        }
    });

    // 依照中英文取得目錄內容
    if (getCookie('menu') == null && urlParam('lang') != "en-US" || getCookie('menuEn') == null && urlParam('lang') == "en-US") {
        // console.log('reget_menu!!!');
        var menuurl = '/api/getMenu';
        if (urlParam('lang') == "en-US") { menuurl += 'En'; }
        $.ajax({
            url: "/api/getApi.php?api=" +(menuurl),
            type: 'GET',
            dataType: "json",
            success: function (resp) {
                $.unblockUI();
                // console.log(resp.data)
                var tempArr = [];
                resp.data.forEach(function (row, index) {
                    if (row.sublevel == 0) {
                        tempArr[row.level] = {
                            name: row.name,
                            url: row.url,
                            data: [],
                        };
                    } else {
                        tempArr[row.level]["data"].push({
                            name: row.name,
                            url: row.url,
                        });
                    }
                });
                // console.log(tempArr);
                if (urlParam('lang') == "en-US") {
                    doCookieSetup("menuEn", JSON.stringify(tempArr));
                } else {
                    doCookieSetup("menu", JSON.stringify(tempArr));
                }
                handle_header(tempArr);
            },
            error: function (e) {
                //console.log(e);
                alert("Error!");
            }
        });
    } else {
        // console.log("cookie has header");
        $.unblockUI();
        if (urlParam('lang') == "en-US") {
            handle_header(JSON.parse(getCookie('menuEn')));
        } else {
            handle_header(JSON.parse(getCookie('menu')));
        }
    }

    // 電子報訂閱
    $("#send_subscribe").click(function () {
        $.blockUI();
        var email = $("#email_subscribe input").val();
        if (email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            $.ajax({
                url: "/api/postApi.php?api=" + '/api/emailSubscribe',
                type: 'POST',
                dataType: "json",
                data: {
                    d:{
                        email: email
                    }
                },
                success: function (result) {
                    $.unblockUI();
                    if (result.data == 'OK') {
                        $('#subscribe_result').text(email + (urlParam('lang') != "en-US" ? ' 電子報訂閱成功!!' : ' Successfully Subscribed.'));
                        $('#modal').modal('toggle');
                    } else if (result.data == 'Subscribed') {
                        $('#subscribe_result').text(email + (urlParam('lang') != "en-US" ? ' 此電子信箱已訂閱!!' : ' has been subscribed.'));
                        $('#modal').modal('toggle');
                    } else {
                        console.log(result);
                    }

                },
                error: function (e) {
                    $.unblockUI();
                    alert("Error!");
                }
            });
        } else {
            $.unblockUI();
            $('#subscribe_result').text(urlParam('lang') != "en-US" ? '請輸入正確的 email !!' : "Please fill in the correct Email address.");
            $('#modal').modal('toggle');
        }
    });
});

// 設定 Set cookie
function doCookieSetup(name, value) {
    var expires = new Date();
    expires.setTime(expires.getTime() + 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + "; expires=" + expires.toGMTString()
}

// 查詢 Get cookie by name
function getCookie(name) {
    var arg = escape(name) + "=";
    var nameLen = arg.length;
    var cookieLen = document.cookie.length;
    var i = 0;
    while (i < cookieLen) {
        var j = i + nameLen;
        if (document.cookie.substring(i, j) == arg) return getCookieValueByIndex(j);
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0) break;
    }
    return null;
}

function getCookieValueByIndex(startIndex) {
    var endIndex = document.cookie.indexOf(";", startIndex);
    if (endIndex == -1) endIndex = document.cookie.length;
    return unescape(document.cookie.substring(startIndex, endIndex));
}

function lang_change() {
    var originalHref = window.location.href;
    if (!window.location.search.match("lang=en-US")) {
        if (window.location.search.match(/\?/)) {
            window.location.assign(originalHref.replace('_details.aspx', '.aspx').replace(/#$/, '') + '&lang=en-US');
        } else {
            window.location.assign(originalHref.replace('_details.aspx', '.aspx').replace(/#$/, '') + '?lang=en-US');
        }
    } else {
        window.location.assign(originalHref.replace('_details.aspx', '.aspx').replace(/\?lang=en-US&/, '?').replace(/\&lang=en-US&/, '&').replace(/\??&?lang=en-US#?$/, ''));
    }
}

function urlParam(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results) {
        return results[1] || 0;
    } else {
        return null;
    }
}

function ValidateIPaddress(ipaddress) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
        return (true);
    }
    alert("You have entered an invalid IP address!");
    return (false);
}
function validatePort(port) {
    var re = /^([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/;
    return re.test(port);
}
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}