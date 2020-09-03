$(function(){
    get_window_aspectratio();   //ウィンドウ縦横比取得
    check_device(); //PC/モバイル判定

    //ローディング
    if(init_compass()){
        setTimeout('open_compass()',0);
    }
    current_navigation_number = 0;
    $('.previous_button').hide();
    $(function(){
        $('.mobile #locationinfo').transform('translateY',$('#wrap').height()+'px');
    })
});

var pin_loaded_percent = 0;
var window_scrolled = 0;
var locinfo_closing = 0;
var opening_new_data = 0;
var compass_opened = 0;
var window_loaded = 0;
var window_scrolled = 0;
var first_view = 0;
var floor_height;

function get_window_aspectratio(){
    var sW = window.innerWidth;
    var sH = window.innerHeight;
    if(sH < sW){
        $('.aspectratio').addClass('landscape');
        $('.aspectratio').removeClass('mobile');
    }
    else{
        $('.aspectratio').addClass('mobile');
        $('.aspectratio').removeClass('landscape');
    }
}

function check_device(){
    var userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.indexOf('ipad') != -1) {
        $('#pc').html('');
    }else if(userAgent.indexOf('iphone') != -1){
        $('#pc').html('');
    }else if(userAgent.indexOf('Android') != -1){
        $('#ios').html('');
        $('#pc').html('');
    }else{
        $('#mobile').html('');
        $('#ios').html('');
    };
};

//画面のサイズが変わったとき
$(window).resize(function(){
    var sW = window.innerWidth;
    var sH = window.innerHeight;
    var current_window_type;
    var new_window_type;
    if($('.aspectratio').hasClass('landscape')){
        current_window_type = 'landscape';
    }
    else{
        current_window_type = 'mobile';
    }
    if(sH < sW){
        $('.aspectratio').addClass('landscape');
        $('.aspectratio').removeClass('mobile');
        new_window_type = 'landscape';
    }
    else{
        $('.aspectratio').addClass('mobile');
        $('.aspectratio').removeClass('landscape');
        new_window_type = 'mobile';
    }
    if(current_window_type != new_window_type){ //新しい縦横比の場合
        setTimeout('init_map()', 200);
    }
});

function init_compass(){    //コンパスの初期化
    $('#compass_box').addClass('close');
    $('.compass').transform('translateX','-50%').transform('translateY','-50%').transform('translateZ','0px').transform('rotateX','0deg').transform('rotateZ','0deg');
    $('.compass').removeClass('default_opacity');
    $('.compass').removeClass('default_size');
    $('.compass').removeClass('default_transition');
    return 1;
}

function init_map(){    //マップの初期化
    var windowheight = $(window).height();
    var windowwidth = $(window).width();

    $("#compass_box").css({'width':'100%'});
    $("#mapwindow").css({'width':'100%'});
    $("#mapwindow").css({'transform':'translateX(' + $(window).width()*0.5 + ')'});
    //場所の説明の収納
    $('.landscape #locationinfo').transform('translateX','100vw').transform('translateY','0');
    $('.mobile #locationinfo').transform('translateX','0').transform('translateY','100vh');
    $('#locationinfo').removeClass('active');
    $("#locationtitle").empty();
    $("#locationtitle-en").empty();
    $(".moreinfo").remove();
    $(".moreinfo2").remove();
    //地図を初期化
    $('#mapbox').addClass('initial_opacity');
    $('.map_element').transform('translateX','-50%').transform('translateY','-50%').transform('translateZ','0px').transform('rotateX','0deg').transform('rotateZ','0deg');
    $('#mapbox').removeClass('loaded');
    $('#mapbox').removeClass('default_transition');

    //画面の幅に応じて階間の距離を設定
    if($(window).width() <= 900){
        floor_height = 15;
    }
    else{
        floor_height = 25;
    }

    $('#mapwindow').css({'transform':'translateX(' + windowwidth*0.5 + ')'});

    if($('.aspectratio').hasClass("landscape")){    //画面が横向きならば
        var mapcenter_t = ($('#map').width() - windowheight) * 0.5;
        var mapcenter_l = windowwidth * 0.1;
    }
    else{
        var mapcenter_t = windowheight * 0.1;
        var mapcenter_l = ($('#map').width() - windowwidth) * 0.5;   
    }
    $("#mapwindow").scrollTop(mapcenter_t);  //地図を中央にスクロール
    $("#mapwindow").scrollLeft(mapcenter_l);
    $('#locationinfo.large').transform('translateX','calc(100vw - 500px)').transform('translateY','0');
    allpinShow();
    if($('.b-flip').hasClass("map3d-open-v")){
        $('.t-flip').addClass('map3d-open-v');
        $('.b-flip').removeClass('map3d-open-v'); 
    }
    pin_select_flag = 0;

    if(compass_opened){
        if(init_compass()){
            open_compass();
        }
    }
}


function search_from_url(){
    var pin_floor;
    var result_pin_number;
    if((location.search).slice(1,11) != 'locationid'){  //locationidがなければ
        locationNumber = 'none'
        locationpinFloor = 'notselected';
        var url = (location.search).substr(7).toLowerCase();
        
        if(url == ''){    //mapidがなければ
            if($.cookie('accesscount') == '1'){
                current_navigation_number = 9;
            }
            else{
                setTimeout('user_navi_view()', 8000);   //ユーザーナビゲーションモードを有効
            }
        }
        else{
            current_navigation_number = 9;
            var hit_pin_amount = 0;
            $('#result tbody tr').each(function(){
                var txt = $(this).find("td:eq(0)").html().toLowerCase().split(',');
                for(var i=0;i<txt.length;i++){
                    if(txt[i] == url){
                        result_pin_number = this.id.substr(1);
                        pin_floor = result_pin_number.slice(0,1);
                        if(result_pin_number.split('_').length == 2){ //普通のピンであれば
                            $(this).addClass('show');
                            $('.pin' + result_pin_number).addClass('active');
                            hit_pin_amount++;
                        }
                        break;
                    }else{
                        $(this).removeClass('show');
                    }
                }
            });
            if(pin_floor != undefined){
                setTimeout("movefloor(" + pin_floor + ")",7500);
            }
            if(hit_pin_amount == 1){
                setTimeout('pinselected("pin' + url + '")', 7500);  //指定されたピンを自動選択
            }
            $('#search_result').addClass('active');
            $('#search_result').html(hit_pin_amount + '件ヒット');
        }
    }
    else{
        current_navigation_number = 9;
        var locationNumber = (location.search).substr(12);
        if(locationNumber == ''){
            locationNumber = 'none'
            locationpinFloor = 'notselected';
        }
        else{
            $('#result tbody tr').each(function(){
                var txt = $(this).find("td:eq(0)").html();
                if(txt.match(locationNumber) != null){
                    $(this).addClass('alwaysshow');
                    result_pin_number = this.id.substr(1);
                    pin_floor = result_pin_number.slice(0,1);
                    $('.pin' + result_pin_number).addClass('active');
                }else{
                    $(this).removeClass('alwaysshow');
                }
            });
            if(pin_floor != undefined){
                locationpinFloor = pin_floor;
                setTimeout("movefloor(" + pin_floor + ")",7500);
                setTimeout("getlocation_qr()",7500);
            }
        }
    }
    var accesscount = $.cookie('accesscount');
    if(accesscount == '1'){
        $('.navigation').hide();
    }
    else{
        document.cookie = 'accesscount=1;path=/;max-age=31536000';
        first_view = 1;
    }
};


//--------------------------
//  マップを画面中央に表示する
//  ユーザーが地図を少し縦横にスクロールできるように、地図のサイズをウィンドウの1.2倍のサイズにしているため、地図を中央に表示するためにスクロールする関数
//--------------------------

//マップのアニメーション
function open_compass(){
    compass_opened = 1;
    $('#wrap').addClass('loading');
    $('#compass_box p').addClass('late_bounce_transition');
    $('#loading_text').addClass('late_bounce_transition');
    $('#compass_box').addClass('loading');
    $('.compass').addClass('loading_size');
    $('.compass').addClass('bounce_transition');
    $('.compass').addClass('loading_opacity');
    $('#compass_box').removeClass('close');
    if(window_loaded){
        setTimeout('end_loading()', 1500);
    }
    else{
        window_loaded = 1;
        if(display_pins()){
            init_map();
            search_from_url();
            setTimeout('end_loading()', 1500);
        }
    }
}
function end_loading(){
    $('#compass_box p').removeClass('late_bounce_transition');
    $('#compass_box p').addClass('slow_transition');
    $('#loading_text').removeClass('late_bounce_transition');
    $('#loading_text').addClass('slow_transition');
    $('#compass_box').removeClass('loading');
    $('.compass').removeClass('bounce_transition');
    $('.compass').addClass('slow_transition');
    $('.compass').transform('translateZ','-1500px');
    $('#mapbox').transform('translateZ','-1500px');
    setTimeout('load_map_image()', 1500);
}
function load_map_image(){
    $('.compass').removeClass('loading_size');
    $('.compass').addClass('default_size');
    $('#mapbox').addClass('zoom_transition');
    $('#mapbox').removeClass('initial_opacity');
    $('.mapimage').addClass('default_floor1_opacity');
    $('#mapbox').addClass('loaded');
    setTimeout('map_rotate()', 1800);
}
function map_rotate(){
    $('.compass').removeClass('slow_transition');
    $('.compass').addClass('rotate_transition');
    $('.compass').removeClass('loading_opacity');
    $('.compass').addClass('default_opacity');
    $('.compass').transform('translateZ','0px');
    $('.compass').transform('rotateX','50deg');
    $('.map_element').transform('translateZ','0px').transform('rotateX','50deg');
    setTimeout('load_2nd_floor()', 1900);
}
function load_2nd_floor(){
    $('.mapimage').removeClass('default_floor1_opacity');
    $('.map-pin').transform('rotateZ','0deg').transform('rotateX','-50deg');
    $('.mapimage1').addClass('default_floor0_opacity');
    $('.mapimage1').addClass('default_floor1_opacity');
    $('.mapimage2').removeClass('default_floor1_opacity');
    $('.mapimage3').removeClass('default_floor1_opacity');
    $('.mapimage2').addClass('default_floor2_opacity');
    $('.mapimage3').addClass('default_floor3_opacity');
    $('.mapimage2').transform('translateZ',floor_height + 'px');
    $('.mapimage3').transform('translateZ',floor_height + 'px');
    $('.compass').removeClass('rotate_transition');
    $('.compass').addClass('default_transition');
    setTimeout('default_map()', 600);
}
function default_map(){
    $('#wrap').removeClass('loading');
    $('#mapbox').removeClass('zoom_transition');
    $('#mapbox').addClass('default_transition');
    $('.ground').transform('translateZ','0');
    $('.mapimage1').transform('translateZ','0');
    $('.mapimage2').transform('translateZ',floor_height + 'px');
    $('.mapimage3').transform('translateZ',floor_height*2 + 'px');
    $('.mapimage').removeClass('mapimage-notselected');
    $('.mapimage').removeClass('mapimage-selected');
    $('.pin').removeClass('active');
    $('.pin.ground').addClass('active');
    $('.pin.ground').removeClass('displaynone');
    $('.pin.floor1').addClass('displaynone');
    $('.pin.floor2').addClass('displaynone');
    $('.pin.floor3').addClass('displaynone');
}


//初期表示ピン
function allpinShow(){$('.pins').addClass('show');}


//マップ3d回転用
//3dボタン
function map3dopen(){
    if($('.locationbutton').hasClass('second')){
        $('.locationbutton').addClass('first');
        getlocation_qr();
    }
    var rotatedeg = $('#mapbox').transform('rotateX');
    if($('.map3d-open').length){
        $('#map3dcontrol').removeClass('active');
        if(rotatedeg == '0deg'){
            $('.r-flip').removeClass('map3d-open');
            $('.l-flip').removeClass('map3d-open');
            $('.b-flip').removeClass('map3d-open-v');
        }
        else{
            $('.r-flip').removeClass('map3d-open');
            $('.l-flip').removeClass('map3d-open');
            $('.t-flip').removeClass('map3d-open-v');
        }
    }
    else{
        $('#map3dcontrol').addClass('active');
        if(rotatedeg == '0deg'){
            $('.r-flip').addClass('map3d-open');
            $('.l-flip').addClass('map3d-open');
            $('.b-flip').addClass('map3d-open-v');
        }
        else{
            $('.r-flip').addClass('map3d-open');
            $('.l-flip').addClass('map3d-open');
            $('.t-flip').addClass('map3d-open-v');
        }
    }
}

function map3drfclick(){$('.r-flip').addClass('map3d-open');}
function map3dlfclick(){$('.l-flip').addClass('map3d-open');}

function rflip() {
    $('.r-flip').removeClass('map3d-open');
    var rotatedeg = $('#mapbox').transform('rotateZ');
    var rotatevalue = parseInt(rotatedeg.slice( 0, -3 )) + 90;
    $('#mapbox').transform('rotateZ',rotatevalue + 'deg');
    $('.pinbox').transform('rotateZ',rotatevalue + 'deg');
    $('.compass').transform('rotateZ',rotatevalue + 'deg');
    $('.map-pin').transform('rotateZ',rotatevalue * -1 + 'deg');
    setTimeout('map3drfclick()', 200);
    check_pin_scale();
}
function flipright() {
    var rotatedeg = $('#mapbox').transform('rotateZ');
    var rotatevalue = parseInt(rotatedeg.slice(0,-3)) + 90;
    $('#mapbox').transform('rotateZ',rotatevalue + 'deg');
    $('.pinbox').transform('rotateZ',rotatevalue + 'deg');
    $('.compass').transform('rotateZ',rotatevalue + 'deg');
    $('.map-pin').transform('rotateZ',rotatevalue * -1 + 'deg');
    check_pin_scale();
}
function lflip() {
    $('.l-flip').removeClass('map3d-open');
    var rotatedeg = $('#mapbox').transform('rotateZ');
    var rotatevalue = parseInt(rotatedeg.slice( 0, -3 )) - 90;
    $('#mapbox').transform('rotateZ',rotatevalue + 'deg');
    $('.pinbox').transform('rotateZ',rotatevalue + 'deg');
    $('.compass').transform('rotateZ',rotatevalue + 'deg');
    $('.map-pin').transform('rotateZ',rotatevalue * -1 + 'deg');
    setTimeout('map3dlfclick()', 200);
    check_pin_scale();
}
function flipleft() {
    var rotatedeg = $('#mapbox').transform('rotateZ');
    var rotatevalue = parseInt(rotatedeg.slice( 0, -3 )) - 90;
    $('#mapbox').transform('rotateZ',rotatevalue + 'deg');
    $('.pinbox').transform('rotateZ',rotatevalue + 'deg');
    $('.compass').transform('rotateZ',rotatevalue + 'deg');
    $('.map-pin').transform('rotateZ',rotatevalue * -1 + 'deg');
    check_pin_scale();
}
function tflip() {
    var rotatedegz = $('#mapbox').transform('rotateZ');
    var rotatevaluez = parseInt(rotatedegz.slice( 0, -3 ));
    var rotatedegx = $('#mapbox').transform('rotateX');
    var rotatevaluex = parseInt(rotatedegx.slice( 0, -3 )) - 50;
    $('#mapbox').transform('rotateX',rotatevaluex + 'deg');
    $('.pinbox').transform('rotateX',rotatevaluex + 'deg');
    $('.compass').transform('rotateX',rotatevaluex + 'deg');
    $('.map-pin').transform('rotateZ',rotatevaluez * -1 + 'deg');
    $('.map-pin').transform('rotateX','0deg');
    $('.t-flip').removeClass('map3d-open-v');
    $('.b-flip').addClass('map3d-open-v');
    check_pin_scale();
}
function bflip() {
    var rotatedegz = $('#mapbox').transform('rotateZ');
    var rotatevaluez = parseInt(rotatedegz.slice( 0, -3 ));
    var rotatedegx = $('#mapbox').transform('rotateX');
    var rotatevaluex = parseInt(rotatedegx.slice( 0, -3 )) + 50;
    $('#mapbox').transform('rotateX',rotatevaluex + 'deg');
    $('.pinbox').transform('rotateX',rotatevaluex + 'deg');
    $('.compass').transform('rotateX',rotatevaluex + 'deg');
    $('.map-pin').transform('rotateZ',rotatevaluez * -1 + 'deg');
    $('.map-pin').transform('rotateX','-50deg');
    $('.t-flip').addClass('map3d-open-v');
    $('.b-flip').removeClass('map3d-open-v');
    check_pin_scale();
}


//-----
//階移動
//-----
function clear_map_position(){
    $('.pin').removeClass('translucent');
    $('.pin').removeClass('active');
    $('.pin').addClass('displaynone');
    $('.ground').transform('translateZ','-200px');//他の階の画像をフェードアウト
    $('.floor1').transform('translateZ','-200px');
    $('.floor2').transform('translateZ','200px');
    $('.floor3').transform('translateZ','200px');
    $('.mapimage').removeClass('mapimage-selected');//他の画像を非表示
    $('.mapimage').addClass('mapimage-notselected');    //他のフロア画像を透明
    $('.floor_control').removeClass('active');//階選択ボタン切り替え
}
function change_floor(floor){
    var rotatedegx = $('#mapbox').transform('rotateX');
    var rotatevaluex = parseInt(rotatedegx.slice(0,-3));
    if($('.floor' + floor).hasClass('active')){
        if(rotatevaluex == 0){
            default_map();
            $('.map-pin').transform('rotateX','0deg');
            $('.floor_control').removeClass('active');
        }
        else{
            default_map();
            $('.floor_control').removeClass('active');
        }
    }
    else{
        movefloor(floor);
    }
}
function movefloor(floor){
    if(floor == 0){floor = 1}
    clear_map_position();
    $('.pin.floor' + floor).addClass('active');
    $('.pin.floor' + floor).removeClass('displaynone');
    $('.floor' + floor).transform('translateZ','0px');
    $('.mapimage' + floor).addClass('mapimage-selected');
    $('.mapimage' + floor).removeClass('mapimage-notselected');
    $('.floor' + floor + 'select').addClass('active');
    if(floor == 3){
        $('.floor2').transform('translateZ','-200px');
    }
    if(floor == 1){
        $('.pin.ground').addClass('active');
        $('.pin.ground').removeClass('displaynone');
        $('.ground').transform('translateZ','0px');
        $('.mapimage0').addClass('mapimage-selected');
        $('.mapimage0').removeClass('mapimage-notselected');
    }
    selected_floor = floor;
    locationiconcheck();
}


//----------
//検索ボックス
//----------
function mapsearchopen(){
    $('.locationsearch').addClass('active');
    $('.mapinfo').addClass('down');
}
function mapsearchclose(){
    $('.locationsearch').removeClass('active');
    $('.mapinfo').removeClass('down');
}


//
function check_pin_scale(){
    $('.defaultpin').transform('scale',new_pinScale);
    $('.activepin').transform('scale',new_pinScale*2);
}


//----------
//場所の説明
//----------

//locationinfo.jsのデータを表示
function display_pins(){
    var pin_amount = location_data.length;
    for(var i=0;i<pin_amount;i++){  //ピンの数だけ繰り返し
        var target_pin_id = location_data[i].pin_name; //ピンのidを取得
        var target_pin_floor = target_pin_id.split("_")[0]; //ピンのある階を取得
        var target_pin_keyword = location_data[i].key_word; //ピンのキーワードを取得
        var target_pin_image = location_data[i].pin_img_id; //ピンの画像を取得
        if(target_pin_image == 15){ //現在地ピンならば
            var location_angle_type = target_pin_id.split("_")[2];
            if(target_pin_id == "2_5_2" || target_pin_id == "3_3_2" || target_pin_id == "3_4_2" || target_pin_id == "2_6_2"){
                location_angle_type = 1;
            }
            var pin_html = '<tr id="p' + target_pin_id + '" class="locationpinicon type' + location_angle_type + '">'
                + '<td class="keyword">' + target_pin_keyword + '</td>'
                + '<td></td>'
                + '<td><img id="pin' + target_pin_id + '" class="locationpin" src="icon/location.svg" onclick="pinselected(this.id)"></td>'
                + '</tr>';
            $('#pinfloor' + target_pin_floor).append(pin_html)
            $('#pin' + target_pin_id).css({'left':location_data[i].map_location[0]});
            $('#pin' + target_pin_id).css({'top':location_data[i].map_location[1]});
        }
        else if(target_pin_image == 2){ //正面玄関ならば
            var pin_html = '<tr id="p' + target_pin_id + '" class="pins">'
                + '<td class="keyword">' + target_pin_keyword + '</td>'
                + '<td></td>'
                + '<td><img id="pin' + target_pin_id + '" class="pin' + target_pin_id + ' pin' + target_pin_id + '-s map-pin entrance" onclick="pinselected(this.id)" src="icon/' + target_pin_image +'.svg"></td>'
                + '</tr>';
            $('#pinfloor' + target_pin_floor).append(pin_html)
            $('#pin' + target_pin_id).css({'left':location_data[i].map_location[0]});
            $('#pin' + target_pin_id).css({'top':location_data[i].map_location[1]});
        }
        else{
            var pin_html = '<tr id="p' + target_pin_id + '" class="pins">'
                + '<td class="keyword">' + target_pin_keyword + '</td>'
                + '<td></td>'
                + '<td><img id="pin' + target_pin_id + '" class="pin' + target_pin_id + ' pin' + target_pin_id + '-s map-pin normal_pin" onclick="pinselected(this.id)" src="icon/' + target_pin_image +'.svg"></td>'
                + '</tr>';
            $('#pinfloor' + target_pin_floor).append(pin_html)
            $('#pin' + target_pin_id).css({'left':location_data[i].map_location[0]});
            $('#pin' + target_pin_id).css({'top':location_data[i].map_location[1]});
        }
        pin_loaded_percent = (i+1) / pin_amount * 100;
        $('#loading_text').html(parseInt(pin_loaded_percent));
    }
    return 1;
}

//ピンを選択した時の情報表示
function locinfoOpen(){
    opening_new_data = 0;
    if($('.aspectratio').hasClass("landscape")){    //画面が横向きならば
        if(!$('#locationinfo').hasClass('active')){ //パネルが開いていない状態なら
            $('#map3dcontrol').removeClass('default_transition');
            $('#map3dcontrol').addClass('slow_transition');
            $('#map3dcontrol').addClass('left');
            $('.landscape #locationinfo').transform('translateX','60vw');
            if(!window_scrolled){
                setTimeout('scroll_map_left()',600);
            }
            else{
                setTimeout('switch_default_transition()',700);
            }
        }
    }
    else{
        if(!first_view){}
        else{
            appeal_locinfo();
        }
    }
    $('#locationinfo').addClass('active');
    $('.mobile #locationinfo').transform('translateY',$(window).height() - 90 + 'px');
}
function scroll_map_left(){
    $("#compass_box").css({'width':$(window).width()*0.6});
    $("#mapwindow").css({'width':$(window).width()*0.6});
    $("#mapwindow").css({'transform':'translateX(0)'});
    var scroll_position = $("#mapwindow").scrollLeft();
    window_scroll(scroll_position + $(window).width()*0.2);
    window_scrolled = 1;
    setTimeout('switch_default_transition()',700);
}
function switch_default_transition(){
    $('#map3dcontrol').removeClass('slow_transition');
    $('#map3dcontrol').addClass('default_transition');
}
function scroll_map_right(){
    $("#compass_box").css({'width':'100%'});
    $("#mapwindow").css({'width':'100%'});
    $("#mapwindow").css({'transform':'translateX(' + $(window).width()*0.5 + ')'});
    var scroll_position = $("#mapwindow").scrollLeft();
    window_scroll(scroll_position - $(window).width()*0.2);
    window_scrolled = 0;
}
function locinfoClose(){
    $('#map3dcontrol').removeClass('default_transition');
    $('#map3dcontrol').addClass('slow_transition');
    allpinShow();
    $('#finger').css({display:'none'});
    locinfo_closing = 1;
    $('body,html').animate({
        scrollTop: 0
    }, 300);
    if($('.aspectratio').hasClass("landscape")){    //画面が横向きならば
        scroll_map_right();
        setTimeout('close_locinfo_panel()',700);
        setTimeout('close_map3dcontrol()',700);
    }
    else{
        close_locinfo_panel();
    }
}
function close_map3dcontrol(){
    $('#map3dcontrol').removeClass('left');
}
function close_locinfo_panel(){
    remove_slow_transition();
    $('.activepin').transform('scale',new_pinScale);
    $('.activepin').removeClass('activepin');
    $('.landscape #locationinfo').transform('translateX','100vw');
    $('.mobile #locationinfo').transform('translateY',$('#map_camera').height() + 10 + 'px');
    setTimeout('remove_locinfo_data()', 600);
}
function remove_locinfo_data(){
    if(!opening_new_data){
        $('#locationinfo').removeClass('active');
        $("#locationtitle").empty();
        $("#locationtitle-en").empty();
        $(".moreinfo").remove();
        $(".moreinfo2").remove();
    }
    locinfo_closing = 0;
}
function remove_slow_transition(){
    if(!opening_new_data){
        $('#map3dcontrol').removeClass('slow_transition');
        $('#map3dcontrol').addClass('default_transition');
    }
}
function locinfoChange(){
    $('body,html').animate({
        scrollTop: 0
    }, 300);
    close_locinfo_panel();
}

function window_scroll(position){
    $("#mapwindow").animate({scrollLeft:position},800, 'swing');
}

function scrolltop(){
    scrollTo( 0, 0 ) ;
}

//----------------------
//コントローラーの収納ボタン
//----------------------
controlmode = 1;
function controlclose(){
    if(controlmode == 1){
        $('.expansionmapcontrol').addClass('close');
        $('.expansionmapcontrol li').transform('translateY','-80px');
        $('.expansionmapcontrol li').transform('scale','0');
        $('.controlclose').transform('rotate','180deg');
        controlmode = 0;
    }
    else{
        $('.expansionmapcontrol li').transform('translateY','0px');
        $('.expansionmapcontrol li').transform('scale','1');
        $('.expansionmapcontrol').removeClass('close');
        $('.controlclose').transform('rotate','0deg');
        controlmode = 1;
    }
}

//---------------
//ピンが選択された時
//---------------
function pinselected(id){
    pin_select_flag = 1;
    $('.pin').removeClass('translucent');
    if($('#locationinfo').hasClass('active')){
        locinfoChange();//今まで表示していた場所の説明を収納
        setTimeout('locinfoOpen()',600);
        setTimeout('write_data("' + id + '")',600);
    }
    else{
        locinfoOpen();
        write_data(id);
    }
    $('.activepin').transform('scale',new_pinScale);
    $('.activepin').removeClass('activepin');
    $('.map-pin').addClass('defaultpin');
    if(id.split('_').length != 3){  //現在地ピンでなければ
        $('#' + id).addClass('activepin');
        $('#' + id).removeClass('defaultpin');
        $('.activepin').transform('scale',new_pinScale*2).transform('translateZ','1px');
    }
}

function write_data(id){
    opening_new_data = 1;
    var target_pin_data = location_data.find((loc_data) => loc_data.pin_name === id.slice(3));

    $("#locationtitle").append(target_pin_data.loc_name);
    $("#locationtitle-en").append(target_pin_data.sub_name);
    if(target_pin_data.info_title != undefined){   //詳細情報があれば実行
        var n = 0;  //詳細情報の数
        var ca = 0; //詳細情報それぞれの子要素の数
        var ta = 0; //詳細情報それぞれのテキスト要素の数
        var ca2 = 0; //詳細情報それぞれのサブ子要素の数
        var msa = 0; //子要素の音楽セクションの数
		var ma = 0; //子要素の音楽の数
		var pa = 0; //子要素の演劇セクションの数
        var fsa = 0; //子要素の模擬店の数
        var ia = 0; //子要素のアイテムの数
        var mna = 0; //子要素のメニューの数
        var fa = 0; //子要素の食事の数
        var la = 0; //子要素の講義の数
        for(i = 0; i < target_pin_data.info_title.length; i++){  //詳細情報の数だけループ
            switch(target_pin_data.info_category[i]){    //詳細情報のカテゴリーでスイッチ
                case 'timetable':   //カテゴリー：タイムテーブル
                    var locationinfo = "<div class='moreinfo'><h2>" + target_pin_data.info_title[i] + "</h2><div class='date'>" + target_pin_data.info_date[i] + "</div><ul class='" + target_pin_data.info_category[i] + "'>";
                    for(i2 = 0; i2 < target_pin_data.info_content_amount[n]; i2++){  //詳細情報の子要素の数だけループ
                        switch(target_pin_data.event_type[ca]){  //イベントのタイプでスイッチ
                            case 'music':   //タイプ：音楽
                                locationinfo += "<li>" + target_pin_data.event_time[ca] + "<br><b>" + target_pin_data.play_title[ca] + "</b><br><p>" + target_pin_data.event_discription[ca] + "</p>";
                                for(i3 = 0; i3 < target_pin_data.music_amount[msa]; i3++){    //音楽の数の分だけループ
                                    locationinfo += "<p class='music'>♫・" + target_pin_data.music[ma] + "</p>";
                                    ma++;
								}
								msa++;
                                break;
                            case 'play':    //タイプ：演劇
								locationinfo += "<li>" + target_pin_data.event_time[ca] + "<br><b>" + target_pin_data.play_title[ca] + "</b><br>" + target_pin_data.event_presenter[pa] + "<p>" + target_pin_data.event_discription[ca] + "</p>";
								pa++;
                                break;
                            case 'normal':   //タイプなし
                                locationinfo += "<li>" + target_pin_data.event_time[ca] + "<br><b>" + target_pin_data.play_title[ca] + "</b><br><p>" + target_pin_data.event_discription[ca] + "</p>";
                                break;
                        }
                        ca++;
                    }
                    break;
                case 'foodshop':   //カテゴリー：模擬店
                    var locationinfo = "<div class='moreinfo'><h2>" + target_pin_data.info_title[i] + "</h2><div class='date'>" + target_pin_data.info_date[i] + "</div><ul class='" + target_pin_data.info_category[i] + "'>";
                    for(i2 = 0; i2 < target_pin_data.info_content_amount[n]; i2++){  //詳細情報の子要素の数だけループ
                        locationinfo += "<li><b>" + target_pin_data.shop_name[fsa] + "</b><br>";
                        for(i3 = 0; i3 < target_pin_data.item_amount[ia]; i3++){
                            locationinfo += target_pin_data.item[fa] + "<br>";
                            fa++;
                        }
                        fsa++;
                        ia++;
                    }
                    break;
                case 'menu':   //カテゴリー：メニュー
                    var locationinfo = "<div class='moreinfo'><h2>" + target_pin_data.info_title[i] + "</h2><div class='date'>" + target_pin_data.info_date[i] + "</div><ul class='" + target_pin_data.info_category[i] + "'>";
                    for(i2 = 0; i2 < target_pin_data.info_content_amount[n]; i2++){  //詳細情報の子要素の数だけループ
                        locationinfo += "<li><b>" + target_pin_data.item_name[mna] + "</b><br>";
                        for(i3 = 0; i3 < target_pin_data.item_amount[ia]; i3++){
                            locationinfo += target_pin_data.item[fa] + "<br>";
                            fa++;
                        }
                        mna++;
                        ia++;
                    }
                    break;
                case 'price':   //カテゴリー：価格
                    var locationinfo = "<div class='moreinfo'><h2>" + target_pin_data.info_title[i] + "</h2><ul class='" + target_pin_data.info_category[i] + "'>";
                    for(i2 = 0; i2 < target_pin_data.info_content_amount[n]; i2++){  //詳細情報の子要素の数だけループ
                        if(target_pin_data.product_discription == undefined){
                            locationinfo += "<li><b>" + target_pin_data.product_name[ca2] + "</b><br>¥" + target_pin_data.price[ca2] + "</li>";
                        }
                        else{
                            locationinfo += "<li><b>" + target_pin_data.product_name[ca2] + "</b><br>¥" + target_pin_data.price[ca2] + "</li>";
                        }
                        ca2++;
                    }
                    break;
                case 'lecture':   //カテゴリー：講義
                    if(target_pin_data.info_date[i] == ""){
                        var locationinfo = "<div class='moreinfo'><h2>" + target_pin_data.info_title[i] + "</h2><ul class='" + target_pin_data.info_category[i] + "'>";
                    }
                    else{
                        var locationinfo = "<div class='moreinfo'><h2>" + target_pin_data.info_title[i] + "</h2><div class='date'>" + target_pin_data.info_date[i] + "</div><ul class='" + target_pin_data.info_category[i] + "'>";
                    }
                    for(i2 = 0; i2 < target_pin_data.info_content_amount[n]; i2++){  //詳細情報の子要素の数だけループ
                        locationinfo += "<li>" + target_pin_data.event_time[ca] + "<br><b>" + target_pin_data.play_title[ca] + "</b><br>" + target_pin_data.event_presenter[ca] + "<p>" + target_pin_data.event_discription[ca] + "</p>";
                        ca++;
                    }
                    break;
                case 'image':   //カテゴリー：画像
                    var locationinfo = "<div class='moreinfo'><h2>" + target_pin_data.info_title[i] + "</h2>";
                        locationinfo += "<img src='" + target_pin_data.image_link[0] + "'>";
                    break;
                case 'double_discription':
                    var locationinfo = "<div class='moreinfo'><h2>" + target_pin_data.info_title[i] + "</h2><ul><li>";
                    for(i2 = 0; i2 < target_pin_data.info_content_amount[n]; i2++){
                        locationinfo += "<b>" + target_pin_data.info_name[ca2] + "</b><br>" + target_pin_data.info_content[ca2] + "<br>";
                        ca2++;
                    }
                    locationinfo += "</li>"
                    break;
                case 'text':    //カテゴリー：テキスト
                    var locationinfo = "<div class='moreinfo'><h2>" + target_pin_data.info_title[i] + "</h2><ul>";
                    for(i2 = 0; i2 < target_pin_data.info_content_amount[n]; i2++){
                        locationinfo += "<li>" + target_pin_data.text_content[ta] + "</li>";
                        ta++;
                    }
                    break;
                default :
                    var locationinfo = "<div class='moreinfo'><h2>" + target_pin_data.info_title[i] + "</h2><ul>";
                    for(i2 = 0; i2 < target_pin_data.info_content_amount[n]; i2++){
                        locationinfo += "<li>" + target_pin_data.info_content[ca] + "</li>";
                        ca++;
                    }
            }
            n++;
            $("#locationinfo").append(locationinfo + "</ul></div>");
        }
        if(target_pin_data.link_button_name != undefined){
            var locationinfo = "<a class='moreinfo2' href='" + target_pin_data.link_button_link[0] + "'><div class='moreinfo_button'>" + target_pin_data.link_button_name[0] + "</div></a>";
            $("#locationinfo").append(locationinfo + "</ul></div>");
        }
    }
    opening_new_data = 0;
}

function scroll_locinfo(){
    if(!$('.aspectratio').hasClass("landscape")){
        if(!locinfo_closing){
            $('body,html').animate({
                scrollTop: $(window).height() - 90
            }, 600);
        }
    }
}

function appeal_locinfo(){
    if(!window_scrolled){
        $('#finger').css({display:'block'})
    }
}
$(window).scroll(function(){
    $('#finger').css({display:'none'});
    window_scrolled = 1;
})



//------------
//現在地アイコンの切り替え
//------------
function locationiconcheck(){
    if(locationpinFloor == 'notselected'){
        location_state = 0;
    }
    else{
        if(locationpinFloor == '0'){location_floor = 1;}
        if(locationpinFloor == '1'){location_floor = 1;}
        if(locationpinFloor == '2'){location_floor = 2;}
        if(locationpinFloor == '3'){location_floor = 3;}
        var locationbutton_class = 0;
        if($('.locationbutton').hasClass('first')){locationbutton_class = 1;}
        if($('.locationbutton').hasClass('second')){locationbutton_class = 2;}
        if($('.locationbutton').hasClass('third')){locationbutton_class = 3;}
        switch(locationbutton_class){
            case 1:
                if(location_floor != selected_floor){
                    $('.locationicon').addClass('active');
                    $('.locationangle').removeClass('active');
                    $('.locationbutton').removeClass('first');
                    $('.locationbutton').addClass('third');
                    location_state = 3;
                }
                else{
                    $('.locationangle-white').addClass('active');
                    $('.locationangle').removeClass('active');
                    $('.locationbutton').removeClass('first');
                    $('.locationbutton').addClass('second');
                    location_state = 2;
                }
                break;
            case 2:
                break;
            case 3:
                //if(location_floor == selected_floor){
                //    $('.locationicon').removeClass('active');
                //    $('.locationangle').addClass('active');
                //    $('.locationbutton').removeClass('third');
                //    $('.locationbutton').addClass('first');
                //    location_state = 1;
                //}
                //else{location_state = 3;};
                break;

        }
    }
}


//これはHTTPSにできたら実装
function getlocation(){
    navigator.geolocation.watchPosition(update); //現在位置情報を定期的に監視
}
function update(position){
    var lat = position.coords.latitude; //緯度
    var lng = position.coords.longitude; //経度
    var acc = position.coords.accuracy; //緯度経度の誤差

    var map_lat = 30;
    var map_lat_length = 20;
    var map_lng = 130;
    var map_lng_length = 20;

    var now_lat = lat - map_lat;
    var now_lng = lng - map_lng;

    if(now_lat >= 0 && now_lng >= 0){
        if(now_lat < map_lat_length && now_lng < map_lng_length){
            var now_location_x = $('#mapbox').width() / map_lat_length * now_lat;
            var now_location_y = $('#mapbox').height() / map_lng_length * now_lng;
            $('#location_pin').transform('translateX',now_location_x + 'px');
            $('#location_pin').transform('translateY',now_location_y + 'px');
        }
    }
}
    

function getlocation_qr(){
    if(current_navigation_number <= 8){return;}
    if($('.locationpinicon.alwaysshow')[0] == undefined){
        location_state = 0;
        $('.nvcontent_bg').addClass("open");
        $('.nvcontent').removeClass("selected");
        $('.nvcontent').addClass("default");
        $('#info_window.i1').addClass('open');
        if($('.aspectratio').hasClass("landscape")){
            var image_height = ($('#info_window').height() - $('#info_window h3').height() - $('#info_window p').height());
            $('.info_image').css({height:image_height})
        }
        else{
            var image_height = ($('#info_window').height() - $('#info_window h3').height() - $('#info_window p').height()) * 0.8;
            $('.info_image').css({height:image_height})
        }
    }
    else{

        var location_type = $('.locationpinicon.alwaysshow')[0].className.split(' ')[1].slice(4);
        var rotatedeg = $('#mapbox').transform('rotateZ');

        //現在地ピンの方向にマップを回転
        var loc_pin_rotate = parseInt(location_type);
        var map_rotate = rotatedeg.slice(0,-3)%360/90;
        if(map_rotate < 0){
            map_rotate = map_rotate*-1;
        }
        else{
            switch(map_rotate){
                case 1:
                    map_rotate = 3;
                    break;
                case 3:
                    map_rotate = 1;
                    break;
            }
        }
        var flip_count = map_rotate - loc_pin_rotate;
        if(flip_count < 0){
            for(var i=0;i<flip_count*-1;i++){
                flipleft();
            }
        }
        else{
            for(var i=0;i<flip_count;i++){
                flipright();
            }
        }

        var location_id = $('.locationpinicon.alwaysshow')[0].id.slice(1);  //locationpinの座標を取得
        var location = location_data.filter(function(data,index){
            if (data.pin_name == location_id) return true;
        });
        var location_position_x = location[0].map_location[0];
        var location_position_y = location[0].map_location[1];

        if($('.locationbutton').hasClass('first')){locationbutton_class = 1;}
        if($('.locationbutton').hasClass('second')){locationbutton_class = 2;}
        if($('.locationbutton').hasClass('third')){locationbutton_class = 3;}
        switch(locationbutton_class){
            case 1: //階が選択済みで、ジャイロがオフ
                //3Dボタンの格納
                if($('.map3d-open').length){
                    var rotatedeg = $('#mapbox').transform('rotateX');
                    if(rotatedeg == '0deg'){
                        $('.r-flip').removeClass('map3d-open');
                        $('.l-flip').removeClass('map3d-open');
                        $('.b-flip').removeClass('map3d-open-v');
                    }
                    else{
                        $('.r-flip').removeClass('map3d-open');
                        $('.l-flip').removeClass('map3d-open');
                        $('.t-flip').removeClass('map3d-open-v');
                    }
                    $('.map3d-text1').addClass('map3d-button-active');
                    $('.map3d-text2').removeClass('map3d-button-active');
                }
                //現在地アイコンの更新
                $('.locationangle-white').addClass('active');
                $('.locationangle').removeClass('active');
                $('.locationbutton').removeClass('first');
                $('.locationbutton').addClass('second');
                location_state = 2;
                //gyro_activate(location_position_x,location_position_y);
                break;
            case 2: //ジャイロがオンである場合
                $('.locationangle-white').removeClass('active');
                $('.locationangle').addClass('active');
                $('.locationbutton').removeClass('second');
                $('.locationbutton').addClass('first');
                location_state = 1;
                //$('#mapwindow').removeClass('transition0');
                //$('#map').removeClass('transition0');
                //$('#mapbox').removeClass('transition0');
                //$('#mapimage').removeClass('transition0');
                //$('.pinbox').removeClass('transition0');
                //$('.map-pin').removeClass('transition0');
                //$('.compass').removeClass('transition0');
                break;
            case 3: //違う階層を表示している場合
                //$('.locationangle-white').removeClass('active');
                //$('.locationangle').addClass('active');
                //$('.locationbutton').removeClass('second');
                //$('.locationbutton').addClass('first');
                //location_state = 1;

                movefloor(location_id.slice(0,1));

                //他のピンを半透明化
                $('.pin').addClass('translucent');
                break;
        }
    }
}


function gyro_activate(location_position_x,location_position_y){
    $('#console').html("start");
    var location_id = $('.locationpinicon.alwaysshow')[0].id.slice(1);  //locationpinのidを取得

    $('#mapbox').css({'transform-origin':location_position_x+' '+location_position_y});
    $('.pinbox').css({'transform-origin':location_position_x+' '+location_position_y});
    
    //$('#mapwindow').addClass('transition0');
    //$('#map').addClass('transition0');
    //$('#mapbox').addClass('transition0');
    //$('#mapimage').addClass('transition0');
    //$('.pinbox').addClass('transition0');
    //$('.map-pin').addClass('transition0');
    //$('.compass').addClass('transition0');

    var $compass = document.querySelector('#mapwindow');

    const id = setTimeout(() => {
       alert("お使いの端末でジャイロセンサーへのアクセスが拒否されました")
    }, 500);
    window.addEventListener('devicemotion', (e) => clearTimeout(id));
    window.addEventListener('deviceorientation',deviceOrientationHandler,true);
    //$('#console').html("activate");

    function deviceOrientationHandler(event){
        $('#console').html("df");
        
        //ジャイロセンサー情報取得
        if($('#pin' + location_id).hasClass('locationpin90deg')){
            var beta = event.beta - 90;
            var gamma = event.gamma - 90;
        }
        if($('#pin' + location_id).hasClass('locationpin')){
            $('#console').html("direction")
            var beta = event.beta;
            var gamma = event.gamma;
        }
        if($('#pin' + location_id).hasClass('locationpin180deg')){
            var beta = event.beta * -1;
            var gamma = event.gamma * -1;
        }
        if($('#pin' + location_id).hasClass('locationpin270deg')){
            var beta = event.beta + 90;
            var gamma = event.gamma + 90;
        }
        // Z軸
        const alpha = event.alpha;
        
        // 方角
        const compassHeading = getCompassHeading(alpha, beta, gamma);
        
        const direction = 360 - compassHeading;
        

        $('#console').html("direction")
        
        if(location_state == 2){
            $('#mapbox').transform('rotateZ',direction + 'deg');
            $('.pinbox').transform('rotateZ',direction + 'deg');
            $('.compass').transform('rotateZ',direction + 'deg');
            $('.map-pin').transform('rotateZ',direction * -1 + 'deg');
            $('#pin' + location_id).transform('rotate',direction * -1 + 'deg');
        }
    }

    /**
     * 方角算出
     * @param alpha
     * @param beta
     * @param gamma
     * @returns {number}
     */
    function getCompassHeading(alpha, beta, gamma) {
        const degtorad = Math.PI / 180;
        
        const _x = beta ? beta * degtorad : 0;
        const _y = gamma ? gamma * degtorad : 0;
        const _z = alpha ? alpha * degtorad : 0;
        
        const cY = Math.cos(_y);
        const cZ = Math.cos(_z);
        const sX = Math.sin(_x);
        const sY = Math.sin(_y);
        const sZ = Math.sin(_z);
        
        const Vx = -cZ * sY - sZ * sX * cY;
        const Vy = -sZ * sY + cZ * sX * cY;
        
        let compassHeading = Math.atan(Vx / Vy);
        
        if (Vy < 0) {
            compassHeading += Math.PI;
        }
        else if (Vx < 0) {
            compassHeading += 2 * Math.PI;
        }
      
        return compassHeading * (180 / Math.PI);
    }
}



// マップのズーム操作
var bZoom = false;    // ズーム中かどうかフラグ
$(function () {
    var values = $('#map').css('transform').split('(')[1];
    values = values.split(')')[0];
    values = values.split(', ');
    var currentScale = values[0];
    var current_pinScale = 1;
    var scale_change = 1;
    var pin_scale_change = 1;
    var newScale = 1;
    new_pinScale = 1;
    var zoom;
    var pinching = false; // ピンチかどうかフラグ
    var d0 = 1; // 前回の指の位置
    var d1 = 1; // 今回の指の位置
    var baseDx;
    var baseDy;
    var pinched = 0;
    var transform_position_x;
    var transform_position_y;
    var new_transform_origin_x = parseInt($('#map').css('transform-origin').split(" ")[0].slice(0,-2));
    var new_transform_origin_y = parseInt($('#map').css('transform-origin').split(" ")[1].slice(0,-2));


    // タッチ開始
    $('#mapwindow').on('touchstart', function (e) {
        if (bZoom) {
            // 拡大中の場合のみ
            startPosX = e.originalEvent.touches[0].screenX;
            startPosY = e.originalEvent.touches[0].screenY;
        }
    });

    
    $("#mapwindow").on("touchmove", function (e) {
        if (e.originalEvent.touches.length == 1) {}
        else if (e.originalEvent.touches.length == 2) {
            //回転

            if (!pinching) {    //ズーム状態でなければ
                // ピンチの中心座標を取得し、そこを変形の中心に設定
                baseDx = $("#mapwindow").scrollLeft() - parseInt($('#map').css('margin').split(" ")[3].slice(0,-2)) + ((parseInt(e.originalEvent.touches[1].screenX) + parseInt(e.originalEvent.touches[0].screenX)) / 2);
                baseDy = $("#mapwindow").scrollTop() - parseInt($('#map').css('margin').split(" ")[0].slice(0,-2)) + ((parseInt(e.originalEvent.touches[1].screenY) + parseInt(e.originalEvent.touches[0].screenY)) / 2);
                transform_position_x = (baseDx/$(window).height()) * 100;
                transform_position_y = (baseDy/$(window).height()) * 100;
                $('#map').css({'transform-origin':transform_position_x+'vh '+transform_position_y + 'vh'});
                //if (!pinching) {
                //他の動作をキャンセル
                e.preventDefault();
                //ズーム状態にする
                $('.locationpin').addClass('transition0');
                $('.map-pin').addClass('transition0');
                pinching = true;

                //ピンチの座標を記録
                //first_touch_pos = [parseInt(e.originalEvent.touches[0].screenX),parseInt(e.originalEvent.touches[0].screenY),parseInt(e.originalEvent.touches[1].screenX),parseInt(e.originalEvent.touches[1].screenY)];
                //prev_touch_pos = first_touch_pos;

                new_transform_origin_x = parseInt($('#map').css('transform-origin').split(" ")[0].slice(0,-2));
                new_transform_origin_y = parseInt($('#map').css('transform-origin').split(" ")[1].slice(0,-2));
                if(newScale>1){
                    $("#mapwindow").scrollTop($("#mapwindow").scrollTop() + (newScale-1) * (parseInt($('#map').css('transform-origin').split(" ")[1].slice(0,-2)) - new_transform_origin_y) * -1);
                    $("#mapwindow").scrollLeft($("#mapwindow").scrollLeft() + (newScale-1) * (parseInt($('#map').css('transform-origin').split(" ")[0].slice(0,-2)) - new_transform_origin_x) * -1);
                }
                //new_transform_origin_x = parseInt($('#map').css('transform-origin').split(" ")[0].slice(0,-2));
                //new_transform_origin_y = parseInt($('#map').css('transform-origin').split(" ")[1].slice(0,-2));

                // Xの2乗 + Yの2乗のルート
                d0 = Math.sqrt(
                    Math.pow(e.originalEvent.touches[1].screenX - e.originalEvent.touches[0].screenX, 2) +
                    Math.pow(e.originalEvent.touches[1].screenY - e.originalEvent.touches[0].screenY, 2)
                );
            }
            else {
                d1 = Math.sqrt(
                    Math.pow(e.originalEvent.touches[1].screenX - e.originalEvent.touches[0].screenX, 2) +
                    Math.pow(e.originalEvent.touches[1].screenY - e.originalEvent.touches[0].screenY, 2)
                );
                

                // 前回から何倍の距離を移動したかを計算
                zoom = (d1 / d0);

                // ピンチインorアウト判定
                var diff = d1 - d0;

                // 最小・最大拡大率の設定
                var maxScale = 2.5;
                var minScale = 0.5;

                // 前回の距離との倍率を取得
                newScale = zoom*scale_change;
                new_pinScale = pin_scale_change/zoom;

                // 幅
                if (newScale > maxScale) {
                    // 大きすぎるから最大倍率に
                    newScale = maxScale;
                }
                else if (newScale < minScale) {
                    // 小さすぎるから最小倍率に
                    newScale = minScale;
                }
                if (new_pinScale > (1/minScale)) {
                    // 大きすぎるから最大倍率に
                    new_pinScale = 1/minScale;
                }
                else if (new_pinScale < (1/maxScale)) {
                    // 小さすぎるから最小倍率に
                    new_pinScale = 1/maxScale;
                }


                //カメラ上下


                // 移動

                $('#map').transform('scale',newScale);
                $('.map-pin').transform('scale',new_pinScale);
                $('.activepin').transform('scale',new_pinScale*2);
                switch($('.locationpinicon.alwaysshow')[0].className.split(' ')[1].slice(4)){
                    case '0':
                        $('.locationpinicon.alwaysshow img').transform('scale',new_pinScale).transform('rotate','0deg').transform('translateZ','1px');
                        break;
                    case '1':
                        $('.locationpinicon.alwaysshow img').transform('scale',new_pinScale).transform('rotate','90deg').transform('translateZ','1px');
                        break;
                    case '2':
                        $('.locationpinicon.alwaysshow img').transform('scale',new_pinScale).transform('rotate','-180deg').transform('translateZ','1px');
                        break;
                    case '3':
                        $('.locationpinicon.alwaysshow img').transform('scale',new_pinScale).transform('rotate','-90deg').transform('translateZ','1px');
                        break;
                }
                pinched = 1;
                
                //prev_touch_pos = next_touch_pos;

                if (newScale > minScale) {
                    // 拡大中
                    bZoom = true;
                }
                else {
                    // 拡大していない
                    bZoom = false;
                }
            }
        }
    });

    // タッチ終了
    $("#mapwindow").on("touchend", function (e) {
        // ピンチ終わり
        if(pinching){
            $('#map').removeClass('transition0');
            $('.pinbox').removeClass('transition0');
            $('.locationpin').removeClass('transition0');
            $('.map-pin').removeClass('transition0');
            var current_margin = $('#map').css('margin');
            if(newScale > 1){
                $('#map').css({'margin':transform_position_y*(newScale - 1)+'vh 0 0 '+transform_position_x*(newScale - 1) + 'vh'});
                $("#mapwindow").scrollTop($("#mapwindow").scrollTop() + parseInt($('#map').css('margin').split(" ")[0].slice(0,-2)) - parseInt(current_margin.split(" ")[0].slice(0,-2)));
                $("#mapwindow").scrollLeft($("#mapwindow").scrollLeft() + parseInt($('#map').css('margin').split(" ")[3].slice(0,-2)) - parseInt(current_margin.split(" ")[3].slice(0,-2)));
            }
            else{
                if(parseInt(current_margin.split(" ")[0].slice(0,-2)) != 0){
                    $("#mapwindow").scrollTop($("#mapwindow").scrollTop() - parseInt(current_margin.split(" ")[0].slice(0,-2)));
                    $("#mapwindow").scrollLeft($("#mapwindow").scrollLeft() - parseInt(current_margin.split(" ")[3].slice(0,-2)));
                    $('#map').css({'margin':'0 0 0 1px'});
                }
            }
            scale_change = newScale/currentScale;
            pin_scale_change = new_pinScale/current_pinScale;
            pinched = 0;
        }
        pinching = false;
    });
});


// マップのドラッグ操作
$(function () {
    $('#mapwindow').addClass('grabable');
    var PrevClickPosX,
        PrevClickPosY,
        startPosX,
        startPosY,
        ClickPosX = 0,
        ClickPosY = 0;
    
    $('#mapwindow')[0].addEventListener("mousedown", clicked, false);
    // クリック開始
    function clicked(e){
        $('#mapwindow').removeClass('grabable');
        $('#mapwindow').addClass('grabbing');
        $('#mapwindow')[0].addEventListener("mousemove",mousemove, false);
        PrevClickPosX = e.pageX;
        PrevClickPosY = e.pageY;
        startPosX = $("#mapwindow").scrollLeft();
        startPosY = $("#mapwindow").scrollTop();
    };
    //ドラッグ開始
    function mousemove(e){
        e.preventDefault();
        $('#mapwindow')[0].addEventListener("mouseup",mouseup, false);
        ClickPosX = e.pageX;
        ClickPosY = e.pageY;
        var scrollX = (ClickPosX - PrevClickPosX) * -1;
        var scrollY = (ClickPosY - PrevClickPosY) * -1;
        $('#mapwindow').scrollLeft(startPosX + scrollX);
        $('#mapwindow').scrollTop(startPosY + scrollY);
    }
    //ドラッグ終了
    function mouseup(){
        $('#mapwindow').addClass('grabable');
        $('#mapwindow').removeClass('grabbing');
        $('#mapwindow')[0].removeEventListener("mousemove", mousemove, false);
    }
});


//ユーザーナビゲーション
function user_navi_view() {
    //ユーザーナビゲーションを有効にする場合はこれのコメントを解除
    $('.nvcontent_bg').addClass("open");
    $('.nvcontent').removeClass("selected");
    $('.nvcontent').addClass("default");
    $('#user_navigation').addClass('open');
}
//ユーザーナビゲーション [次へ進むボタン]
function user_navigation_next(){
    if(current_navigation_number==undefined){
        current_navigation_number=0;
    }
    switch(current_navigation_number){
        case 0:
            $('#user_navigation').removeClass('position1');
            $('#user_navigation').addClass('position5');
            $('.previous_button').show();
            break;
        case 4:
            if(!$('.map3d-open').length){
                map3dopen();
            }
            $('#map3dcontrol').addClass('left');
            $('#user_navigation').removeClass('position5');
            $('#user_navigation').addClass('position6');
            break;
        case 5:
            if($('.map3d-open').length){
                map3dopen();
            }
            $('#map3dcontrol').removeClass('left');
            break;
        case 6:
            $('#user_navigation').removeClass('position6');
            $('#user_navigation').addClass('position4');
            break;
        case 7:
            $('#user_navigation').removeClass('position4');
            $('#user_navigation').addClass('position3');
            if(pin_select_flag == 0){
                pinselected("pin0_1");
            }
            break;
        case 8:
            next_button.innerHTML = "終了";
            break;
        case 9:
            $('#user_navigation').addClass('position1');
            $('#user_navigation').removeClass('position2');
            $('.nvcontent_bg').removeClass("open");
            $('.nvcontent').removeClass("default");
            $('.nvcontent').addClass('selected');
            $('#user_navigation').removeClass('open');
            break;
        default:
            $('#user_navigation').addClass('position1');
            $('#user_navigation').removeClass('position2');
    }
    $('.nv' + current_navigation_number).removeClass('selected');
    current_navigation_number++;
    $('.nv' + current_navigation_number).addClass('selected');
}
    //[前に戻るボタン]
function user_navigation_previous(){
    if(current_navigation_number == 1){
        $('#user_navigation').removeClass('position5');
        $('#user_navigation').addClass('position1');
        $('.previous_button').hide();
    }
    if(current_navigation_number == 5){
        if($('.map3d-open').length){
            map3dopen();
        }
        $('#map3dcontrol').removeClass('left');
        $('#user_navigation').removeClass('position6');
        $('#user_navigation').addClass('position5');
    }
    if(current_navigation_number == 6){
        if(!$('.map3d-open').length){
            map3dopen();
        }
        $('#map3dcontrol').addClass('left');
    }
    if(current_navigation_number == 7){
        $('#user_navigation').removeClass('position4');
        $('#user_navigation').addClass('position6');
    }
    if(current_navigation_number == 8){
        $('#user_navigation').removeClass('position3');
        $('#user_navigation').addClass('position4');
    }
    if(current_navigation_number == 9){
        next_button.innerHTML = "次へ";
        $('#user_navigation').removeClass('position1');
        $('#user_navigation').addClass('position3');
    }
    $('.nv' + current_navigation_number).removeClass('selected');
    current_navigation_number--;
    $('.nv' + current_navigation_number).addClass('selected');
}
//[ナビゲーションを閉じるボタン]
function user_navigation_close(){
    current_navigation_number = 9;
    $('.nvcontent').removeClass("default");
    $('.nvcontent').addClass('selected');
    $('#user_navigation').removeClass('open');
}

function info_window_close(){
    $('.nvcontent').removeClass("default");
    $('.nvcontent').addClass('selected');
    $('#info_window').removeClass('open');
    $('.nvcontent_bg').removeClass('open');
}