$(document).ready(function () {
    $('#regButton').click(function () {
        $('#register').show();
        $('#login').hide();
        return false;
    });

    $('#logButton').click(function () {
        $('#register').hide();
        $('#login').show();
        return false;
    });


    $(document).on('click', '#optCat', function () {
        //   alert('clicked');
        //$(this).attr('checked','checked');
    });

    $('#edit_pro').click(function () {
        $('#form-profile').show();
        $('#profile').hide();
    });
    $('#newPass').click(function () {
        $('#error2').text("Password must be more than 8 characters.");
        $('#error2').delay(2000).hide(10);
    });

    $('#rNewPass').blur(function () {
        if ($('#newPass').val() != $(this).val()) {
            $('#error3').text("Please Repeat Your New Password Correctly.");
            $('#newPassStatus').val('false');
        }
        else {
            $('#error3').text('');
            $('#newPassStatus').val('true');
        }

        if (($('#oldPassStatus').val() == "true") && ($('#newPassStatus').val() == "true")) {
            $('#Change_pass').removeClass('disabled');
        }
    });


    $('#chpass').focusout(function () {
        id = $('#passuser').val();
        pass = $(this).val();
        $.ajax({
            method: 'post',
            url: baseurl + "/Profile/UpdatePass",
            data: {'user': id, 'pass': pass}
        })
                .done(function (msg) {
                    $('#error1').text(msg);
                    if (msg != "Password not Valid") {
                        $('#oldPassStatus').val('true');
                    } else {
                        $('#oldPassStatus').val('false');
                    }
                });
    });

    $('#Change_pass').click(function () {
        id = $('#passuser').val();
        npass = $('#newPass').val();
        $.ajax({
            method: 'post',
            url: baseurl + "/Profile/UserPassUpdate",
            data: {'user': id, 'pass': npass}
        })
                .done(function (msg) {
                    $('#SuccessState').text(msg);
                    $('#chpass').val('');
                    $('#newPass').val('');
                    $('#rNewPass').val('');


                });
    });


    $(document).on('click', '#btnUpdate', function () {
        id = $(this).parent().prevAll('#updateid').text();
        url = baseurl + "/News/getForUpdate/" + id;
        $.get(url, function (data, status) {
            data = JSON.parse(data);
            $('#txtupdateid').val(data[0].news_id);
            $('#txtUpheading').val(data[0].news_heading);
            $('#txtUpContent').val(data[0].news_content);

        });

    });

    $(document).on('click', '#btnABInt', function () {
        id = $(this).prevAll('#intID').val();
        div = $(this);
        c_s = $(this).text();
        $.ajax({
            method: 'get',
            url: baseurl + "/Profile/ActiveBlock/" + user,
            data: {'cat_id': id}
        })
                .done(function (msg) {
                    if (msg) {
                        if (c_s == 'Active')
                            $(div).text('Block');
                        else
                            $(div).text('Active');
                    } else {
                        alert('Not able to update Status this time');
                    }
                });
    });

    $(document).on('click', '#btnCatBA', function () {
        nid = $(this).prevAll('#catID').val();
        div = $(this);
        c_s = $(this).text();
        $.ajax({
            method: 'get',
            url: baseurl + "/Admin/catBlAc/",
            data: {'cat_id': nid}
        })
                .done(function (msg) {
                    if (msg) {
                        if (c_s == 'Active')
                            $(div).text('Block');
                        else
                            $(div).text('Active');
                    } else {
                        alert('Not able to Block/Active Category this time');
                    }
                });
    });
    $(document).on('click', '#btnUserBA', function () {
        uid = $(this).prevAll('#userID').val();
        //    alert(nid);
        div = $(this);
        //  alert(div);
        c_s = $(this).text();
        //alert(c_s);
        $.ajax({
            method: 'get',
            url: baseurl + "/Admin/userBlAc/",
            data: {'users_id': uid}
        })
                .done(function (msg) {
                    if (msg) {
                        if (c_s == 'Active')
                            $(div).text('Block');
                        else
                            $(div).text('Active');
                    } else {
                        alert('Not able to Block/Active user this time');
                    }
                });
    });
    $(document).on('click', '#btnNewsBA', function () {
        nwid = $(this).prevAll('#newsID').val();
        div = $(this);
        c_s = $(this).text();
        $.ajax({
            method: 'get',
            url: baseurl + "/Admin/newsBlAc/",
            data: {'newss_id': nwid}
        })
                .done(function (msg) {
                    if (msg) {
                        if (c_s == 'Active')
                            $(div).text('Block');
                        else
                            $(div).text('Active');
                    } else {
                        alert('Not able to Block/Active News this time');
                    }
                });
    });

    $(document).on('click', '#btnUpCat', function () {
        $('#txtUpCat').val($(this).parent().prevAll('#catName').text());
        $('#txtUpCatId').val($(this).parent().prevAll('#catId').text());
    });

    $('#update_news_content').click(function () {
        heading = $('#txtUpheading').val();
        content = $('#txtUpContent').val();
        idNews = $('#txtupdateid').val();
        // alert(idNews);
        $.ajax({
            method: 'post',
            url: baseurl + "/Admin/updateNewsContent",
            data: {'nid': idNews, 'nheading': heading, 'ncontent': content}
        })
                .done(function (msg) {
                    alert(msg);
                    $('#updatedNews').removeClass('in');
                });
    });



    $('#addCat').click(function () {
        newCat = $('#newCat').val();
        if (newCat != '') {
            $.ajax({
                method: 'post',
                url: baseurl + "/Admin/Addcategory",
                data: {'Ncat': newCat}
            })
                    .done(function (msg) {
                        // alert(msg); 
                        $('#error').text(msg);
                        $('#error').css('color', 'green');

                        $('#newCat').val('');
                    });

        } else {
            $('#error').css('color', 'red');
            $('#error').text("Please Enter The Category Name.");
        }
    });


    $('#update_category').click(function () {
        catname = $('#txtUpCat').val();
        idcat = $('#txtUpCatId').val();
        //alert(idcat);
        $.ajax({
            method: 'post',
            url: baseurl + "/Admin/updateCateory",
            data: {'cid': idcat, 'catgoryName': catname}
        })
                .done(function (msg) {
                    alert(msg);
                    $('#editCat').removeClass('in');
                });
    });



    $(document).on('click', '#nxtprecmtbtn', function () {
        if ($(this).text() == 'Show Previous Comments') {
            $(this).text('Hide Previous Comments');
            $('#precmtdiv').show();
        } else {
            $(this).text('Show Previous Comments');
            $('#precmtdiv').hide();
        }
    });

    $(document).on('click', '#cmttodb', function () {
        ccmt = $('#userCmt').val();
        if (ccmt != '') {
            $('#c_cmtDiv').css('opacity', '0.5');
            $('#prev').prepend($('#c_cmtDiv').html());
            $('#Fcmtuser').text($('#cUser').text());
            $('#FcmtTime').text('now');
            $('#Fcmttxt').text($('#userCmt').val());
            $('#userCmt').val('');
            $.ajax({
                method: 'get',
                url: baseurl + "/Profile/cmt/" + user,
                data: {'cmt': ccmt}
            })
                    .done(function (msg) {
                        $('#c_cmtDiv').css('opacity', '1.0');
                    });
        } else
            $('#userCmt').attr('placeholder', 'Comment required');
    });

    $(document).on('blur', '#userCmt', function () {
        if ($('#userCmt').val() != '')
            $('#cmttodb').removeClass('disabled');
        else
            $('#cmttodb').addClass('disabled');

    });

    $(document).on('click', '#btnModelRecentNG', function () {
        date = $(this).text();
        $('#cmtSection').html('');
        $('#cmtSection').text('');

        $.ajax({
            method: 'get',
            url: baseurl + "/Profile/RecentNG/",
            data: {'date': date}
        })
                .done(function (data) {
                    data = JSON.parse(data);
                    $('#RecentNGTitle').text(data[0].ng_title);
                    $.each(data, function (key1, value1) {
                        $.each(data[key1], function (key, value) {

                            if (key == 'cmt' && value != 'no comment') {
                                // alert(value); 
                                for (i = 0; i < value.length; i++) {
                                    e = '<div class="row" style="border-bottom: 1px dashed blue;"><div class="col-sm-8"><label for="userName" id="Fcmtuser" style="font-family: serif;font-size: 20px;color: darkblue">' + value[i].user_first_name + ' ' + value[i].user_mid_name + ' ' + value[i].user_last_name + '</label></div><div class="col-sm-4 text-right" id="FcmtTime">' + value[i].c_time + '</div></div><div class="row"  style="color: #3300cc; padding-left: 30px; padding-top: 10px" ><p id="Fcmttxt">' + value[i].c_content + '</p></div>';
                                    $('#cmtSection').append(e);
                                }
                            }
                            if (value == 'no comment') {
                                e = '<div class="row" style="border-bottom: 1px dashed blue;"><div class="col-sm-8"><label for="userName" id="Fcmtuser" style="font-family: serif;font-size: 20px;color: darkblue"></label></div><div class="col-sm-4 text-right" id="FcmtTime"></div></div><div class="row"  style="color: #3300cc; padding-left: 30px; padding-top: 10px" ><p id="Fcmttxt">' + value + '</p></div>';
                                $('#cmtSection').append(e);

                            }
                        });
                    });
                });
    });

    $(document).on('click', '#addNG', function () {
        topic = $('#content').val();
        date = $('#NGDate').val();
        $.ajax({
            method: 'get',
            url: baseurl + "/Admin/addNGTopic/" + user,
            data: {'topic': topic, 'date': date}
        })
                .done(function (msg) {
                    $('#respAddNG').text(msg);
                });
    });

    $(document).on('click', '#addANews', function () {

        $('#errors').text(" ");
        if (($('#heading').val() != '') && ($('#Content').val() != '') && ($('#nationaL').val() != '') && ($('#acK').val() != '') && ($('#categorY').val() != '')) {
            // alert("all fields are filled");
            //url=baseurl+"/Admin/AddANewss/";
            newsHead = $('#heading').val();
            newsCon = $('#Content').val();
            newscat = $('#categorY').val();
            // alert(newscat);
            newsNat = $('#nationaL').val();
            // alert(newsNat);
            if ($('#acK').val() == 'other') {
                newsacK = $('#newAckLoc').val();
                flag = 1;
                //url=baseurl+"/Admin/AddACK/"+newsacK;
            } else {
                newsacK = $('#acK').val();
                flag = 0;
            }
            //  alert(newsacK);
            $.ajax({
                method: 'post',
                url: baseurl + "/Admin/AddANewss/",
                data: {'heading': newsHead, 'content': newsCon, 'category': newscat, 'NatIntS': newsNat, 'acknow': newsacK, 'flag': flag}
            })
                    .done(function (msg) {
                        $('#errors').css('color', 'green');
                        $('#errors').text(msg);
                        $('#errors').css('color', 'red');
                        $('#heading').val('');
                        $('#Content').val('');
                        $('#nationaL').val('');
                        $('#acK').val('');
                        $('#categorY').val('');
                        $('#newAckLoc').val('');


                    })

        } else {
            // alert("all fields are not filled");
            $('#errors').text("All fields are manadatory to fill.");
        }
    });


    $(document).on('click', '#Search', function () {
        email = $('#emailuser').val();
        $('#hideID').val(email);

        //alert(email);
        $.ajax({
            method: 'post',
            url: baseurl + "/ONNEFE/validUser/",
            data: {'user': email}
        })
                .done(function (msg) {
                    if (msg == 'false') {
                        $('#error').text('Entered email-id is not valid.');
                        $('#emailuser').val('');
                    } else {
                        $('#phnNo').val(msg);
                        $('#secondDiv').show();
                        $('#head2').show();

                        $('#firstDiv').hide();
                        $('#head1').hide();

                        //$('#secondDiv').show();

                        // alert($('#phnNo').val());   
                    }

                });
    });

    $(document).on('click', '#Continue', function () {
        phnNoUser = $('#MNoUser').val();
        realPhnNo = $('#phnNo').val();
        if (phnNoUser == realPhnNo) {
            //alert('same');
            $('#MNoUser').val('');
            $('#mainDiv2').show();
            $('#mainDiv1').hide();
        } else {
            $('#errornew').text('Wrong Mobile Number.Please Try again.');
            $('#MNoUser').val('');
        }

    });


    $(document).on('click', '#Change', function () {
        firpass = $('#firstPass').val();
        secpass = $('#secondPass').val();
        id = $('#hideID').val();
        if (firpass == secpass) {
            //  alert('same');
            $.ajax({
                method: 'post',
                url: baseurl + "/ONNEFE/updateThePass",
                data: {'uid': id, 'pass': firpass}
            })
                    .done(function (msg) {
                        $('#errorPass').text(msg);
                        $('#firstPass').val('');
                        $('#secondPass').val('');
                    });

            //  alert(id);

        } else {
            $('#errorPass').text('Repeat Password is not the same.Fill Again');
            $('#firstPass').val('');
            $('#secondPass').val('');
        }

    });

    $(document).on('click', '#addInst', function (event) {
        event.preventDefault();
        var inst = $('input:checked').map(function () {
            return $(this).val();
        }).get();
        $.ajax({
            method: 'get',
            url: baseurl + "/Profile/AddInst/" + user,
            data: {'inst': inst}
        })
                .done(function (msg) {
                    $('#error_').html(msg);
                });
    });

    $(document).on('click', '#btnUserPD', function () {
        uid = $(this).prevAll('#userID').val();
        // alert(uid);
        div = $(this);
       // alert(div);
        c_s = $(this).text();
      //  alert(c_s);
        $.ajax({
            method: 'get',
            url: baseurl + "/superAdmin/userPODE/",
            data: {'users_id': uid}
        })
                .done(function (msg) {
                    if (msg) {
                        if (c_s == 'Promote')
                            $(div).text('Demote');
                        else
                            $(div).text('Promote');
                    } else {
                        alert('Not able to Promote/Demote user this time');
                    }
                });
    });
});

//edit by sonu654