function share_link(title, description) {
    var share = {
        // url: 'http://210.65.131.67/subpages/securityInfo/hackevent_details.aspx?id=440',
        url: 'https://twcert.org.tw' + window.location.pathname + window.location.search,
        // url: window.location.href,
        mymessage: '『' + title + '』',
        twitter: {
            url: "https://twitter.com/intent/tweet",
            via: 'TWCERTCC',
        },
        facebook: {
            url: "https://www.facebook.com/dialog/feed",
            app_id: "1828293214099374",
            picture: "https://twcert.org.tw/assets/img/twcertLogo400.png",
            description: description,
        }

    };

    $.ajax({
        url: "/api/postApi.php?api="+"/api/shorturl",
        type: "POST",
        dataType: "json",
        data: {
            d:{
                url: share.url
            }
        },
        success: function (result) {
            share.urlshortener = result.url;

        },
        error: function (e) {
            console.log(e);
            share.urlshortener = share.url;
        },
        complete: function () {
            $.unblockUI();

            var twitter_link = share.twitter.url + '?text=' + share.mymessage + '&via=' + share.twitter.via + '&url=' + encodeURI(share.urlshortener);
            $("#twitter_share").attr("href", twitter_link);
            var facebook_link = share.facebook.url + '?app_id=' + share.facebook.app_id + '&picture=' + share.facebook.picture +
                '&name=' + share.mymessage + '&link=' + share.urlshortener + '&description=' + share.facebook.description;
            $("#facebook_share").attr("href", facebook_link);

        }
    });
}