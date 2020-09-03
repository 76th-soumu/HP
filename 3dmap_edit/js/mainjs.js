var floor_location_pin_amount = [0,0,0,0];

//ウィンドウ縦横比取得--------------------------------------------
$(function(){
    var sW = window.innerWidth;
    var sH = window.innerHeight;
    if(sH - 50 > sW){
        $('.aspectratio').addClass('vertical');
        $('.aspectratio').removeClass('beside');
    }
    else{
        $('.aspectratio').addClass('beside');
        $('.aspectratio').removeClass('vertical');
    }
    if(sH * 1.3 < sW){
        $('.aspectratio').addClass('landscape');
        $('.aspectratio').removeClass('mobile');
    }
    else{
        $('.aspectratio').addClass('mobile');
        $('.aspectratio').removeClass('landscape');
	}
	
	var user="";
	if((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
		user="phone";
	} else {
		user="pc";
	}
	$('body').addClass(user);
});
$(window).resize(function(){
    var sW = window.innerWidth;
    var sH = window.innerHeight;
    if(sH - 50 > sW){
        $('.aspectratio').addClass('vertical');
        $('.aspectratio').removeClass('beside');
    }
    else{
        $('.aspectratio').addClass('beside');
        $('.aspectratio').removeClass('vertical');
    }
    if(sH * 1.3 < sW){
        $('.aspectratio').addClass('landscape');
        $('.aspectratio').removeClass('mobile');
    }
    else{
        $('.aspectratio').addClass('mobile');
        $('.aspectratio').removeClass('landscape');
    }
    //init_map();
});


$(function(){
	$('.mobile #locationinfo').transform('translateY',$('#wrap').height()+'px');
})

function scrolltop(){
    scrollTo( 0, 0 ) ;
}

function change_data_box_height(target_data_id,height){
    $('#' + target_data_id).css({'height':height});
}

function open_pin_data(id){
    var target_data_id = id.slice(2);
    $('#' + target_data_id).removeClass('close');
    $('#' + target_data_id).addClass('open');
    change_data_box_height(target_data_id,$('#' + target_data_id + ' .data_parts_box').height()+60);
}

function close_pin_data(id){
	var target_data_id = id.slice(2);
    $('#' + target_data_id).addClass('close');
    $('#' + target_data_id).removeClass('open');
    $('#' + target_data_id).css({'height':60});
}

function check_loc_pin_id(){
	var loc_pin_amount = $('.location_pin_data').length;
	var floor_location_pin_amount = [0,0,0,0];
	for(var i=0;i<loc_pin_amount;i++){
		var floor = $('.location_pin_data .floor_form [name=floor]')[i].value;
		var direction = $('.location_pin_data .direction_form [name=direction]')[i].value;
		$('.location_pin_data .loc_name_form [name=loc_name]')[i].value = floor + '_' + (floor_location_pin_amount[floor]+1) + '_' + direction;
		floor_location_pin_amount[floor] = floor_location_pin_amount[floor]+1;
	}
}

function add_data(){
    var current_data_amount = $('#data_container ul').length;
    if(current_data_amount == 0){
        var new_data_id = 1;
    }
    else{
        var new_data_id = parseInt($('#data_container ul')[current_data_amount-1].id.slice(1))+1;
    }

    var parts_amount = 1;

    var html = '<ul id="d' + new_data_id + '" class="pin_data close">'+
            '<div class="data_parts_box">'+
                '<li class="p' + parts_amount++ + ' type1">'+
                    '<form class="loc_name_form" name="js" onsubmit="return false;"><input class="it1 data_txtbox" type="text" name="loc_name" value="" placeholder="テキストを入力"></form>'+
                '</li>'+
                '<li class="p' + parts_amount++ + ' type2">'+
                    '<form class="sub_name_form" name="js" onsubmit="return false;"><input class="it2 data_txtbox" type="text" name="sub_name" value="" placeholder="テキストを入力"></form>'+
                '</li>'+
                '<li class="p' + parts_amount++ + ' type3">'+
                    '<form class="key_word_form" name="js" onsubmit="return false;"><input class="it3 data_txtbox" type="text" name="key_word" value="" placeholder="テキストを入力"></form>'+
                '</li>'+
                '<li class="p' + parts_amount++ + ' type4">'+
                    '<form class="floor_form" name="js" onsubmit="return false;">'+
                        '<select class="data_select" name="floor" size="1">'+
                            '<option value="0">地上</option>'+
                            '<option value="1">1階</option>'+
                            '<option value="2">2階</option>'+
							'<option value="3">3階</option>'+
						'</select>'+
						'<img class="select_img" src="icon/select.svg">'+
                    '</form>'+
                '</li>'+
                '<li class="p' + parts_amount++ + ' type5">'+
                    '<form class="pin_location_form" name="js" onsubmit="return false;">'+
                        '<input class="it5 data_txtbox2 normal" type="text" name="pin_location" value="" placeholder="テキストを入力">'+
                        '<button id="df_d' + new_data_id + '" class="image_select_button" onclick="image_select(this.id)">画像で選択</button>'+
                    '</form>'+
                '</li>'+
                '<li class="p' + parts_amount++ + ' type7">'+
                    '<div class="scroll_box">'+
                        '<div id="d' + new_data_id + '" class="button_box">'+
                            '<button id="p-i_d' + new_data_id + '_1" class="image_button" onClick="select_image(this.id)"><img src="icon/1.png"></button>'+
                            '<button id="p-i_d' + new_data_id + '_2" class="image_button" onClick="select_image(this.id)"><img src="icon/2.png"></button>'+
                            '<button id="p-i_d' + new_data_id + '_3" class="image_button" onClick="select_image(this.id)"><img src="icon/3.png"></button>'+
                            '<button id="p-i_d' + new_data_id + '_4" class="image_button" onClick="select_image(this.id)"><img src="icon/4.png"></button>'+
                            '<button id="p-i_d' + new_data_id + '_5" class="image_button" onClick="select_image(this.id)"><img src="icon/5.png"></button>'+
                            '<button id="p-i_d' + new_data_id + '_6" class="image_button" onClick="select_image(this.id)"><img src="icon/6.png"></button>'+
                            '<button id="p-i_d' + new_data_id + '_7" class="image_button" onClick="select_image(this.id)"><img src="icon/7.png"></button>'+
							'<button id="p-i_d' + new_data_id + '_8" class="image_button" onClick="select_image(this.id)"><img src="icon/8.png"></button>'+
							'<button id="p-i_d' + new_data_id + '_9" class="image_button" onClick="select_image(this.id)"><img src="icon/9.png"></button>'+
                            '<button id="p-i_d' + new_data_id + '_10" class="image_button" onClick="select_image(this.id)"><img src="icon/10.png"></button>'+
                            '<button id="p-i_d' + new_data_id + '_11" class="image_button" onClick="select_image(this.id)"><img src="icon/11.png"></button>'+
                            '<button id="p-i_d' + new_data_id + '_12" class="image_button" onClick="select_image(this.id)"><img src="icon/12.png"></button>'+
							'<button id="p-i_d' + new_data_id + '_13" class="image_button" onClick="select_image(this.id)"><img src="icon/13.png"></button>'+
							'<button id="p-i_d' + new_data_id + '_14" class="image_button" onClick="select_image(this.id)"><img src="icon/14.png"></button>'+
							'<button id="p-i_d' + new_data_id + '_16" class="image_button" onClick="select_image(this.id)"><img src="icon/16.png"></button>'+
                        '</div>'+
                    '</div>'+
                    '<div id="clear-fix"></div>'+
                '</li>'+
                '<button id="a_d' + new_data_id + '" class="section_add_button" onclick="add_section(this.id)">セクションを追加</button>'+
                '<div class="bottom_bar">'+
                    '<div class="button_box2">'+
                        '<button id="b_d' + new_data_id + '" class="normal_button delete_data_button" onClick="delete_pin_data(this.id)">消去</button>'+
                        '<button id="b_d' + new_data_id + '" class="normal_button preview_data_button" onClick="preview_pin_data(this.id)">プレビュー</button>'+
                        '<button id="b_d' + new_data_id + '" class="normal_button save_data_button" onClick="close_pin_data(this.id)">保存</button>'+
                    '</div>'+
                    '<div id="clear-fix"></div>'+
                '</div>'+
			'</div>'+
			'<button id="b_d' + new_data_id + '" class="normal_button open_button" onClick="open_pin_data(this.id)">情報を修正</button>'+
        '</ul>';
    $('#data_container').append(html);
}

function add_location_data(){
    var current_data_amount = $('#data_container ul').length;
    if(current_data_amount == 0){
        var new_data_id = 1;
    }
    else{
        var new_data_id = parseInt($('#data_container ul')[current_data_amount-1].id.slice(1))+1;
	}
	
	var ground_locationpin_amount = floor_location_pin_amount[0];
	floor_location_pin_amount[0] = ground_locationpin_amount+1;

    var parts_amount = 1;

    var html = '<ul id="d' + new_data_id + '" class="location_pin_data pin_data close">'+
			'<div class="data_parts_box">'+
				'<li class="p' + parts_amount++ + ' type21">'+
                    '<form class="loc_name_form" name="js" onsubmit="return false;"><input class="it21 data_txtbox" type="text" name="loc_name" value="0_' + (ground_locationpin_amount+1) + '_0" disabled="disabled"></form>'+
				'</li>'+
				'<li class="p' + parts_amount++ + ' type22">'+
                    '<form class="direction_form" name="js" onsubmit="return false;">'+
                        '<select id="d_d' + new_data_id + '" class="data_select" name="direction" size="1" onchange="change_direction(this.id)">'+
                            '<option value="0">北</option>'+
                            '<option value="1">東</option>'+
                            '<option value="2">南</option>'+
                            '<option value="3">西</option>'+
						'</select>'+
						'<img class="select_img" src="icon/select.svg">'+
                    '</form>'+
                '</li>'+
                '<li class="p' + parts_amount++ + ' type4">'+
                    '<form class="floor_form" name="js" onsubmit="return false;">'+
                        '<select id="f_d' + new_data_id + '" class="data_select" name="floor" size="1" onchange="change_floor(this.id)">'+
                            '<option value="0">地上</option>'+
                            '<option value="1">1階</option>'+
                            '<option value="2">2階</option>'+
                            '<option value="3">3階</option>'+
						'</select>'+
						'<img class="select_img" src="icon/select.svg">'+
                    '</form>'+
                '</li>'+
                '<li class="p' + parts_amount++ + ' type5">'+
                    '<form class="pin_location_form" name="js" onsubmit="return false;">'+
                        '<input class="it5 data_txtbox2 normal" type="text" name="pin_location" value="" placeholder="テキストを入力">'+
                        '<button id="df_d' + new_data_id + '" class="image_select_button" onclick="image_select_location(this.id)">画像で選択</button>'+
                    '</form>'+
				'</li>'+
                '<div class="bottom_bar">'+
                    '<div class="button_box2">'+
                        '<button id="b_d' + new_data_id + '" class="normal_button delete_data_button" onClick="delete_pin_data(this.id)">消去</button>'+
                        '<button id="b_d' + new_data_id + '" class="normal_button save_data_button" onClick="close_pin_data(this.id)">保存</button>'+
                    '</div>'+
                    '<div id="clear-fix"></div>'+
                '</div>'+
			'</div>'+
			'<button id="b_d' + new_data_id + '" class="normal_button open_button" onClick="open_pin_data(this.id)">情報を修正</button>'+
        '</ul>';
	$('#data_container').append(html);
	check_loc_pin_id();
}

function delete_pin_data(id){
    var target_data_id = id.slice(2);
    $('#' + target_data_id).remove();
}


function add_section(id){
    var target_data_id = id.slice(2);

    var parts_amount = $('#' + target_data_id + ' li').length;
    if(parts_amount == 0){
        var new_parts_id = 1;
    }
    else{
        var new_parts_id = parseInt($('#' + target_data_id + ' li')[parts_amount-1].className[1])+1;
    }

    var section_amount = $('#' + target_data_id + ' .additional_section').length;
    if(section_amount == 0){
        var new_section_id = 1;
    }
    else{
        var new_section_id = parseInt($('#' + target_data_id + ' .additional_section')[section_amount-1].id.slice(3))+1;
    }

    var html = '<div id="as_' + new_section_id + '" class="additional_section">'+
            '<li class="p' + new_parts_id++ + ' type8">'+
                '<form class="info_title_form" name="js" onsubmit="return false;">'+
                    '<input class="it8 data_txtbox" type="text" name="info_title" value="" placeholder="テキストを入力">'+
                '</form>'+
            '</li>'+
            '<li class="p' + new_parts_id++ + ' type9">'+
                '<form class="info_date_form" name="js" onsubmit="return false;">'+
                    '<select class="data_select" name="info_date" size="1">'+
                        '<option value="両日">両日</option>'+
                        '<option value="1日目">1日目</option>'+
						'<option value="2日目">2日目</option>'+
						'<option value="">指定なし</option>'+
					'</select>'+
					'<img class="select_img" src="icon/select.svg">'+
                '</form>'+
            '</li>'+
            '<li class="p' + new_parts_id++ + ' type10">'+
                '<form class="info_category_form" name="info_category_form" onsubmit="return false;">'+
                    '<select id="s_' + target_data_id + '_' + new_section_id + '" class="data_select" name="info_category" onchange="change_section_category(this.id)" size="1">'+
                        '<option value="text">テキスト</option>'+
                        '<option value="timetable">タイムテーブル</option>'+
                        '<option value="foodshop">模擬店</option>'+
                        '<option value="menu">メニュー</option>'+
                        '<option value="price">価格表</option>'+
                        '<option value="lecture">講義</option>'+
					'</select>'+
					'<img class="select_img" src="icon/select.svg">'+
                '</form>'+
            '</li>'+
            '<li class="p' + new_parts_id++ + ' type16 added_parts">'+
                '<form class="text_content_form" name="js" onsubmit="return false;">'+
                    '<input class="it16 data_txtbox" type="text" name="text_content" value="" placeholder="テキストを入力">'+
                '</form>'+
            '</li>'+
            '<div id="e_' + target_data_id + '_' + new_section_id + '" class="delete_button" onclick="delete_section(this.id)"><img src="icon/delete.png"></div>'+
        '</div>'+
        '<button id="a_' + target_data_id + '" class="section_add_button" onclick="add_section(this.id)">セクションを追加</button>';
    $('#' + target_data_id + ' .section_add_button').remove();
    $('#' + target_data_id + ' .data_parts_box').append(html);
    change_data_box_height(target_data_id,$('#' + target_data_id + ' .data_parts_box').height()+60);
}

function delete_section(id){
    var target_data_id = id.split('_')[1];
    var target_section_id = id.split('_')[2];
    $('#' + target_data_id + ' #as_' + target_section_id).remove();
    change_data_box_height(target_data_id,$('#' + target_data_id + ' .data_parts_box').height()+60);
}

function add_event_card(id){
    var target_data_id = id.split('_')[1];
    var target_section_id = id.split('_')[2];
    var parts_amount = $('#'+target_data_id + ' li').length;
    if(parts_amount == 0){
        var new_parts_id = 1;
    }
    else{
        var new_parts_id = parseInt($('#' + target_data_id + ' li')[parts_amount-1].className[1])+1;
    }
    var event_card_amount = $('#'+target_data_id + ' #as_' + target_section_id + ' .event_card').length;
    if(event_card_amount == 0){
        var new_event_card_id = 1;
    }
    else{
        var new_event_card_id = parseInt($('#'+target_data_id + ' #as_' + target_section_id + ' .event_card')[event_card_amount-1].id.slice(3))+1;
    }
    $('#'+target_data_id + ' #as_' + target_section_id + ' .eventcard_add_button').remove();
    var category_type = $('#' + target_data_id + ' #as_' + target_section_id + ' .info_category_form [name=info_category]').val();
    switch(category_type){
        case "timetable":
            var html = '<div id="ec_' + new_event_card_id + '" class="event_card ' + category_type + '">'+
                    '<li class="p' + new_parts_id++ + ' type11 added_parts">'+
                        '<form class="play_title_form" name="js" onsubmit="return false;">'+
                            '<input class="it11 data_txtbox" type="text" name="play_title" value="" placeholder="テキストを入力">'+
                        '</form>'+
                    '</li>'+
                    '<li class="p' + new_parts_id++ + ' type12 added_parts">'+
                        '<form class="event_time_form" name="js" onsubmit="return false;">'+
                            '<input class="it12 data_timeform" type="time" name="start">'+
                            '<span>~</span>'+
                            '<input class="it12 data_timeform" type="time" name="end">'+
                            '<div id="clear-fix"></div>'+
                        '</form>'+
                    '</li>'+
                    '<li class="p' + new_parts_id++ + ' type13 added_parts">'+
                        '<form class="event_type_form" name="event_type_form" onsubmit="return false;">'+
                            '<select id="e_' + target_data_id + '_' + target_section_id + '_' + new_event_card_id + '" class="data_select" name="event_type" onchange="change_event_type(this.id)" size="1">'+
                                '<option value="normal">その他</option>'+
                                '<option value="music">音楽</option>'+
                                '<option value="play">演劇</option>'+
							'</select>'+
							'<img class="select_img" src="icon/select.svg">'+
                        '</form>'+
                    '</li>'+
                    '<li class="p' + new_parts_id++ + ' type16 added_parts">'+
                        '<form class="event_discription_form" name="js" onsubmit="return false;">'+
                            '<input class="it16 data_txtbox" type="text" name="event_discription" value="" placeholder="テキストを入力">'+
                        '</form>'+
                    '</li>'+
                    '<div id="e_' + target_data_id + '_' + target_section_id + '_' + new_event_card_id + '" class="delete_button" onclick="delete_event_card(this.id)"><img src="icon/delete.png"></div>'+
                '</div>'+
                '<button id="a_' + target_data_id + '_' + target_section_id + '" class="eventcard_add_button added_parts" onclick="add_event_card(this.id)">イベントカードを追加</button>'
            break;
        case "foodshop":
            var html = '<div id="ec_' + new_event_card_id + '" class="event_card ' + category_type + '">'+
                    '<li class="p' + new_parts_id++ + ' type20 added_parts">'+
                        '<form class="shop_name_form" name="js" onsubmit="return false;">'+
                            '<input class="it20 data_txtbox" type="text" name="shop_name" value="" placeholder="テキストを入力">'+
                        '</form>'+
					'</li>'+
                    '<li class="p' + new_parts_id + ' type17 added_parts">'+
                        '<form class="food_form" name="food_form" onsubmit="return false;">'+
                            '<input id="f_' + target_data_id + '_' + target_section_id + '_' + new_event_card_id + '_1" class="it17 data_txtbox2 normal" type="text" name="f1" value="" placeholder="テキストを入力">'+
                            '<button id="df_' + target_data_id + '_' + target_section_id + '_' + new_event_card_id + '_1" class="delete_item_button" onclick="delete_food(this.id)">商品を消去</button>'+
                            '<div id="clear-fix"></div>'+
                            '<button id="f_' + target_data_id + '_' + target_section_id + '_' + new_event_card_id + '" class="add_food_button" onclick="add_food(this.id)">商品を追加</button>'+
                        '</form>'+
                    '</li>'+
                    '<div id="e_' + target_data_id + '_' + target_section_id + '_' + new_event_card_id + '" class="delete_button" onclick="delete_event_card(this.id)"><img src="icon/delete.png"></div>'+
                '</div>'+
                '<button id="a_' + target_data_id + '_' + target_section_id + '" class="eventcard_add_button added_parts" onclick="add_event_card(this.id)">イベントカードを追加</button>'
            break;
        case "menu":
            var html = '<div id="ec_' + new_event_card_id + '" class="event_card ' + category_type + '">'+
                    '<li class="p' + new_parts_id++ + ' type19 added_parts">'+
                        '<form class="item_type_form" name="event_category_form" onsubmit="return false;">'+
                            '<select id="e_' + target_data_id + '_' + target_section_id + '" class="data_select" name="item_type" size="1">'+
                                '<option value="主食">主食</option>'+
                                '<option value="副食">副食</option>'+
                                '<option value="ジュース">ジュース</option>'+
                                '<option value="ゲーム">ゲーム</option>'+
							'</select>'+
							'<img class="select_img" src="icon/select.svg">'+
                        '</form>'+
                    '</li>'+
                    '<li class="p' + new_parts_id++ + ' type17 added_parts">'+
                        '<form class="food_form" name="food_form" onsubmit="return false;">'+
                            '<input id="f_' + target_data_id + '_' + target_section_id + '_' + new_event_card_id + '_1" class="it17 data_txtbox2 normal" type="text" name="f1" value="" placeholder="テキストを入力">'+
                            '<button id="df_' + target_data_id + '_' + target_section_id + '_' + new_event_card_id + '_1" class="delete_item_button" onclick="delete_food(this.id)">商品を消去</button>'+
                            '<div id="clear-fix"></div>'+
                            '<button id="f_' + target_data_id + '_' + target_section_id + '_' + new_event_card_id + '" class="add_food_button" onclick="add_food(this.id)">商品を追加</button>'+
                        '</form>'+
                    '</li>'+
                    '<div id="e_' + target_data_id + '_' + target_section_id + '_' + new_event_card_id + '" class="delete_button" onclick="delete_event_card(this.id)"><img src="icon/delete.png"></div>'+
                '</div>'+
                '<button id="a_' + target_data_id + '_' + target_section_id + '" class="eventcard_add_button added_parts" onclick="add_event_card(this.id)">イベントカードを追加</button>'
            break;
        case "price":
            var html = '<div id="ec_' + new_event_card_id + '" class="event_card ' + category_type + '">'+
                    '<li class="p' + new_parts_id++ + ' type17 added_parts">'+
                        '<form class="product_name_form" name="js" onsubmit="return false;">'+
                            '<input class="it17 data_txtbox" type="text" name="product_name" value="" placeholder="テキストを入力">'+
                        '</form>'+
                    '</li>'+
                    '<li class="p' + new_parts_id++ + ' type18 added_parts">'+
                        '<form class="price_form" name="js" onsubmit="return false;">'+
                            '<input class="it18 data_txtbox" type="number" name="price"  pattern="\d*" value="" placeholder="テキストを入力">'+
                        '</form>'+
                    '</li>'+
                    '<div id="e_' + target_data_id + '_' + target_section_id + '_' + new_event_card_id + '" class="delete_button" onclick="delete_event_card(this.id)"><img src="icon/delete.png"></div>'+
                '</div>'+
                '<button id="a_' + target_data_id + '_' + target_section_id + '" class="eventcard_add_button added_parts" onclick="add_event_card(this.id)">イベントカードを追加</button>'
            break;
        case "lecture":
            var html = '<div id="ec_' + new_event_card_id + '" class="event_card ' + category_type + '">'+
                    '<li class="p' + new_parts_id++ + ' type11 added_parts">'+
                        '<form class="play_title_form" name="js" onsubmit="return false;">'+
                            '<input class="it11 data_txtbox" type="text" name="play_title" value="" placeholder="テキストを入力">'+
                        '</form>'+
                    '</li>'+
                    '<li class="p' + new_parts_id++ + ' type12 added_parts">'+
                        '<form class="event_time_form" name="js" onsubmit="return false;">'+
                            '<input class="it12 data_timeform" name="start">'+
                            '<span>~</span>'+
                            '<input class="it12 data_timeform" name="end">'+
                            '<div id="clear-fix"></div>'+
                        '</form>'+
                    '</li>'+
                    '<li class="p' + new_parts_id++ + ' type15 added_parts">'+
                        '<form class="event_presenter_form" name="js" onsubmit="return false;">'+
                            '<input class="it15 data_txtbox" type="text" name="event_presenter" value="" placeholder="テキストを入力">'+
                        '</form>'+
                    '</li>'+
                    '<li class="p' + new_parts_id++ + ' type16 added_parts">'+
                        '<form class="event_discription_form" name="js" onsubmit="return false;">'+
                            '<input class="it16 data_txtbox" type="text" name="event_discription" value="" placeholder="テキストを入力">'+
                        '</form>'+
                    '</li>'+
                    '<div id="e_' + target_data_id + '_' + target_section_id + '_' + new_event_card_id + '" class="delete_button" onclick="delete_event_card(this.id)"><img src="icon/delete.png"></div>'+
                '</div>'+
                '<button id="a_' + target_data_id + '_' + target_section_id + '" class="eventcard_add_button added_parts" onclick="add_event_card(this.id)">イベントカードを追加</button>'
            break;
    }
    $('#' + target_data_id + ' #as_' + target_section_id).append(html);
    change_data_box_height(target_data_id,$('#' + target_data_id + ' .data_parts_box').height()+60);
}

function delete_event_card(id){
    var target_data_id = id.split('_')[1];
    var target_section_id = id.split('_')[2];
    var target_event_card_id = id.split('_')[3];
    $('#' + target_data_id + ' #as_' + target_section_id + ' #ec_' + target_event_card_id).remove();
    change_data_box_height(target_data_id,$('#' + target_data_id + ' .data_parts_box').height()+60);
}

function change_section_category(id){
    var target_data_id = id.split('_')[1];
    var target_section_id = id.split('_')[2];
    $('#' + target_data_id + ' #as_' + target_section_id + ' .added_parts').remove();
    $('#' + target_data_id + ' #as_' + target_section_id + ' .event_card').remove();
    var event_card_amount = $('#' + target_data_id + ' #as_' + target_section_id + ' .event_card').length;
    if(event_card_amount == 0){
        var new_event_card_id = 1;
    }
    else{
        var new_event_card_id = parseInt($('#'+target_data_id + ' #as_' + target_section_id + ' .event_card')[event_card_amount].id.slice(3))+1;
    }
    var category_type = $('#' + target_data_id + ' #as_' + target_section_id + ' .info_category_form [name=info_category]').val();
    var parts_amount = $('#'+target_data_id + ' li').length;
    if(parts_amount == 0){
        var new_parts_id = 1;
    }
    else{
        var new_parts_id = parseInt($('#' + target_data_id + ' li')[parts_amount-1].className[1])+1;
    }
    switch(category_type){
        case "text":
            var html = '<li class="p' + new_parts_id++ + ' type16 added_parts">'+
                    '<form class="text_content_form" name="js" onsubmit="return false;">'+
                        '<input class="it16 data_txtbox" type="text" name="text_content" value="" placeholder="テキストを入力">'+
                    '</form>'+
                '</li>';
            break;
        case "timetable":
            var html = '<div id="ec_' + new_event_card_id + '" class="event_card ' + category_type + '">'+
                    '<li class="p' + new_parts_id++ + ' type11 added_parts">'+
                        '<form class="play_title_form" name="js" onsubmit="return false;">'+
                            '<input class="it11 data_txtbox" type="text" name="play_title" value="" placeholder="テキストを入力">'+
                        '</form>'+
                    '</li>'+
                    '<li class="p' + new_parts_id++ + ' type12 added_parts">'+
                        '<form class="event_time_form" name="js" onsubmit="return false;">'+
                            '<input class="it12 data_timeform" type="time" name="start">'+
                            '<span>~</span>'+
                            '<input class="it12 data_timeform" type="time" name="end">'+
                            '<div id="clear-fix"></div>'+
                        '</form>'+
                    '</li>'+
                    '<li class="p' + new_parts_id++ + ' type13 added_parts">'+
                        '<form class="event_type_form" name="event_type_form" onsubmit="return false;">'+
                            '<select id="e_' + target_data_id + '_' + target_section_id + '_' + new_event_card_id + '" class="data_select" name="event_type" onchange="change_event_type(this.id)" size="1">'+
                                '<option value="normal">その他</option>'+
                                '<option value="music">音楽</option>'+
                                '<option value="play">演劇</option>'+
							'</select>'+
							'<img class="select_img" src="icon/select.svg">'+
                        '</form>'+
                    '</li>'+
                    '<li class="p' + new_parts_id++ + ' type16 added_parts">'+
                        '<form class="event_discription_form" name="js" onsubmit="return false;">'+
                            '<input class="it16 data_txtbox" type="text" name="event_discription" value="" placeholder="テキストを入力">'+
                        '</form>'+
                    '</li>'+
                    '<div id="e_' + target_data_id + '_' + target_section_id + '_' + new_event_card_id + '" class="delete_button" onclick="delete_event_card(this.id)"><img src="icon/delete.png"></div>'+
                '</div>'+
                '<button id="a_' + target_data_id + '_' + target_section_id + '" class="eventcard_add_button added_parts" onclick="add_event_card(this.id)">イベントカードを追加</button>'
            break;
        case "foodshop":
            var html = '<div id="ec_' + new_event_card_id + '" class="event_card ' + category_type + '">'+
                    '<li class="p' + new_parts_id++ + ' type20 added_parts">'+
                        '<form class="shop_name_form" name="js" onsubmit="return false;">'+
                            '<input class="it20 data_txtbox" type="text" name="shop_name" value="" placeholder="テキストを入力">'+
                        '</form>'+
                    '</li>'+
                    '<li class="p' + new_parts_id++ + ' type17 added_parts">'+
                        '<form class="food_form" name="food_form" onsubmit="return false;">'+
                            '<input id="f_' + target_data_id + '_' + target_section_id + '_' + new_event_card_id + '_1" class="it17 data_txtbox2 normal" type="text" name="f1" value="" placeholder="テキストを入力">'+
                            '<button id="df_' + target_data_id + '_' + target_section_id + '_' + new_event_card_id + '_1" class="delete_item_button" onclick="delete_food(this.id)">商品を消去</button>'+
                            '<div id="clear-fix"></div>'+
                            '<button id="f_' + target_data_id + '_' + target_section_id + '_' + new_event_card_id + '" class="add_food_button" onclick="add_food(this.id)">商品を追加</button>'+
                        '</form>'+
                    '</li>'+
                    '<div id="e_' + target_data_id + '_' + target_section_id + '_' + new_event_card_id + '" class="delete_button" onclick="delete_event_card(this.id)"><img src="icon/delete.png"></div>'+
                '</div>'+
                '<button id="a_' + target_data_id + '_' + target_section_id + '" class="eventcard_add_button added_parts" onclick="add_event_card(this.id)">イベントカードを追加</button>'
            break;
        case "menu":
            var html = '<div id="ec_' + new_event_card_id + '" class="event_card ' + category_type + '">'+
                    '<li class="p' + new_parts_id++ + ' type19 added_parts">'+
                        '<form class="item_type_form" name="event_category_form" onsubmit="return false;">'+
                            '<select id="e_' + target_data_id + '_' + target_section_id + '" class="data_select" name="item_type" size="1">'+
                                '<option value="主食">主食</option>'+
                                '<option value="副食">副食</option>'+
                                '<option value="ジュース">ジュース</option>'+
                                '<option value="ゲーム">ゲーム</option>'+
							'</select>'+
							'<img class="select_img" src="icon/select.svg">'+
                        '</form>'+
                    '</li>'+
                    '<li class="p' + new_parts_id++ + ' type17 added_parts">'+
                        '<form class="food_form" name="food_form" onsubmit="return false;">'+
                            '<input id="f_' + target_data_id + '_' + target_section_id + '_' + new_event_card_id + '_1" class="it17 data_txtbox2 normal" type="text" name="f1" value="" placeholder="テキストを入力">'+
                            '<button id="df_' + target_data_id + '_' + target_section_id + '_' + new_event_card_id + '_1" class="delete_item_button" onclick="delete_food(this.id)">商品を消去</button>'+
                            '<div id="clear-fix"></div>'+
                            '<button id="f_' + target_data_id + '_' + target_section_id + '_' + new_event_card_id + '" class="add_food_button" onclick="add_food(this.id)">商品を追加</button>'+
                        '</form>'+
                    '</li>'+
                    '<div id="e_' + target_data_id + '_' + target_section_id + '_' + new_event_card_id + '" class="delete_button" onclick="delete_event_card(this.id)"><img src="icon/delete.png"></div>'+
                '</div>'+
                '<button id="a_' + target_data_id + '_' + target_section_id + '" class="eventcard_add_button added_parts" onclick="add_event_card(this.id)">イベントカードを追加</button>'
            break;
        case "price":
            var html = '<div id="ec_' + new_event_card_id + '" class="event_card ' + category_type + '">'+
                    '<li class="p' + new_parts_id++ + ' type17 added_parts">'+
                        '<form class="product_name_form" name="js" onsubmit="return false;">'+
                            '<input class="it17 data_txtbox" type="text" name="product_name" value="" placeholder="テキストを入力">'+
                        '</form>'+
                    '</li>'+
                    '<li class="p' + new_parts_id++ + ' type18 added_parts">'+
                        '<form class="price_form" name="js" onsubmit="return false;">'+
                            '<input class="it18 data_txtbox" type="number" name="price" pattern="\d*" value="" placeholder="テキストを入力">'+
                        '</form>'+
                    '</li>'+
                    '<div id="e_' + target_data_id + '_' + target_section_id + '_' + new_event_card_id + '" class="delete_button" onclick="delete_event_card(this.id)"><img src="icon/delete.png"></div>'+
                '</div>'+
                '<button id="a_' + target_data_id + '_' + target_section_id + '" class="eventcard_add_button added_parts" onclick="add_event_card(this.id)">イベントカードを追加</button>'
            break;
        case "lecture":
            var html = '<div id="ec_' + new_event_card_id + '" class="event_card ' + category_type + '">'+
                    '<li class="p' + new_parts_id++ + ' type11 added_parts">'+
                        '<form class="play_title_form" name="js" onsubmit="return false;">'+
                            '<input class="it11 data_txtbox" type="text" name="play_title" value="" placeholder="テキストを入力">'+
                        '</form>'+
                    '</li>'+
                    '<li class="p' + new_parts_id++ + ' type12 added_parts">'+
                        '<form class="event_time_form" name="js" onsubmit="return false;">'+
                            '<input class="it12 data_timeform" name="start">'+
                            '<span>~</span>'+
                            '<input class="it12 data_timeform" name="end">'+
                            '<div id="clear-fix"></div>'+
                        '</form>'+
                    '</li>'+
                    '<li class="p' + new_parts_id++ + ' type15 added_parts">'+
                        '<form class="event_presenter_form" name="js" onsubmit="return false;">'+
                            '<input class="it15 data_txtbox" type="text" name="event_presenter" value="" placeholder="テキストを入力">'+
                        '</form>'+
                    '</li>'+
                    '<li class="p' + new_parts_id++ + ' type16 added_parts">'+
                        '<form class="event_discription_form" name="js" onsubmit="return false;">'+
                            '<input class="it16 data_txtbox" type="text" name="event_discription" value="" placeholder="テキストを入力">'+
                        '</form>'+
                    '</li>'+
                    '<div id="e_' + target_data_id + '_' + target_section_id + '_' + new_event_card_id + '" class="delete_button" onclick="delete_event_card(this.id)"><img src="icon/delete.png"></div>'+
                '</div>'+
                '<button id="a_' + target_data_id + '_' + target_section_id + '" class="eventcard_add_button added_parts" onclick="add_event_card(this.id)">イベントカードを追加</button>'
            break;
    }
    $('#' + target_data_id + ' #as_' + target_section_id).append(html);
    change_data_box_height(target_data_id,$('#' + target_data_id + ' .data_parts_box').height()+60);
}

function change_event_type(id){
    var target_data_id = id.split('_')[1];
    var target_section_id = id.split('_')[2];
    var target_event_card_id = id.split('_')[3];
    var parts_amount = $('#'+target_data_id + ' li').length;
    if(parts_amount == 0){
        var new_parts_id = 1;
    }
    else{
        var new_parts_id = parseInt($('#' + target_data_id + ' li')[parts_amount-1].className[1])+1;
    }
    if($('#' + target_data_id + ' #as_' + target_section_id + ' #ec_' + target_event_card_id + ' .event_type_form [name=event_type]').val() == "music"){
        var html = '<li class="p' + new_parts_id++ + ' type14 added_parts">'+
                '<form class="music_form" name="music_form" onsubmit="return false;">'+
                    '<input id="m_' + target_data_id + '_' + target_section_id + '_' + target_event_card_id + '_1" class="it14 data_txtbox2 normal" type="text" name="m1" value="" placeholder="テキストを入力">'+
                    '<button id="dm_' + target_data_id + '_' + target_section_id + '_' + target_event_card_id + '_1" class="delete_item_button" onclick="delete_music(this.id)">曲を消去</button>'+
                    '<div id="clear-fix"></div>'+
                    '<button id="am_' + target_data_id + '_' + target_section_id + '_' + target_event_card_id + '" class="add_music_button" onclick="add_music(this.id)">曲を追加</button>'+
                '</form>'+
            '</li>';
        $('#' + target_data_id + ' #as_' + target_section_id + ' #ec_' + target_event_card_id).append(html);
        change_data_box_height(target_data_id,$('#' + target_data_id + ' .data_parts_box').height()+60);
	}
    else{
        $('#' + target_data_id + ' #as_' + target_section_id + ' #ec_' + target_event_card_id + ' .type14').remove();
        change_data_box_height(target_data_id,$('#' + target_data_id + ' .data_parts_box').height()+60);
	}
	if($('#' + target_data_id + ' #as_' + target_section_id + ' #ec_' + target_event_card_id + ' .event_type_form [name=event_type]').val() == "play"){
		var html = '<li class="p' + new_parts_id++ + ' type15 added_parts">'+
				'<form class="event_presenter_form" name="js" onsubmit="return false;">'+
					'<input id="e_p_' + target_data_id + '_' + target_section_id + '_' + target_event_card_id + '" class="it15 data_txtbox" type="text" name="event_presenter" value="" placeholder="テキストを入力">'+
				'</form>'+
			'</li>';
		$('#' + target_data_id + ' #as_' + target_section_id + ' #ec_' + target_event_card_id).append(html);
        change_data_box_height(target_data_id,$('#' + target_data_id + ' .data_parts_box').height()+60);
	}
	else{
		$('#' + target_data_id + ' #as_' + target_section_id + ' #ec_' + target_event_card_id + ' .type15').remove();
		change_data_box_height(target_data_id,$('#' + target_data_id + ' .data_parts_box').height()+60);
	}
}

function add_music(id){
    var target_data_id = id.split('_')[1];
    var target_section_id = id.split('_')[2];
    var target_event_card_id = id.split('_')[3];
    var music_amount = $('#' + target_data_id + ' #as_' + target_section_id + ' #ec_' + target_event_card_id + ' .music_form input').length
    if($('#' + target_data_id + ' #as_' + target_section_id + ' #ec_' + target_event_card_id + ' .music_form [name=m' + music_amount + ']').val() == ""){
        alert("データを入力してください。");
        return;
    }
    $('.normal').addClass('small');
    $('.normal').removeClass('normal');
    music_amount++;
    var html = '<input id="m_' + target_data_id + '_' + target_section_id + '_' + target_event_card_id + '_' + music_amount + '" class="it14 data_txtbox2 small" type="text" name="m' + music_amount + '" value="" placeholder="テキストを入力"></input>'+
        '<button id="dm_' + target_data_id + '_' + target_section_id + '_' + target_event_card_id + '_' + music_amount + '" class="delete_item_button" onclick="delete_music(this.id)">曲を消去</button>';
    $('#' + target_data_id + ' #as_' + target_section_id + ' #ec_' + target_event_card_id + ' .music_form').prepend(html);
    change_data_box_height(target_data_id,$('#' + target_data_id + ' .data_parts_box').height()+60);
}
function delete_music(id){
    var target_data_id = id.split('_')[1];
    var target_section_id = id.split('_')[2];
    var target_event_card_id = id.split('_')[3];
    var target_music_id = id.split('_')[4];
    $('#m_' + target_data_id + '_' + target_section_id + '_' + target_event_card_id + '_' + target_music_id).remove();
    $('#dm_' + target_data_id + '_' + target_section_id + '_' + target_event_card_id + '_' + target_music_id).remove();
    change_data_box_height(target_data_id,$('#' + target_data_id + ' .data_parts_box').height()+60);
}

function add_food(id){
    var target_data_id = id.split('_')[1];
    var target_section_id = id.split('_')[2];
    var target_event_card_id = id.split('_')[3];
    var food_amount = $('#' + target_data_id + ' #as_' + target_section_id + ' #ec_' + target_event_card_id + ' .food_form input').length
    if($('#as_' + target_section_id + ' #ec_' + target_event_card_id + ' .food_form [name=f' + food_amount + ']').val() == ""){
        alert("データを入力してください。");
        return;
    }
    $('.normal').addClass('small');
    $('.normal').removeClass('normal');
    food_amount++;
    var html = '<input id="f_' + target_data_id + '_' + target_section_id + '_' + target_event_card_id + '_' + food_amount + '" class="it17 data_txtbox2 small" type="text" name="f'+ food_amount + '" value="" placeholder="テキストを入力"></input>'+
        '<button id="df_' + target_data_id + '_' + target_section_id + '_' + target_event_card_id + '_' + food_amount + '" class="delete_item_button" onclick="delete_food(this.id)">商品を消去</button>';
    $('#' + target_data_id + ' #as_' + target_section_id + ' #ec_' + target_event_card_id + ' .food_form').prepend(html);
    change_data_box_height(target_data_id,$('#' + target_data_id + ' .data_parts_box').height()+60)
}
function delete_food(id){
    var target_data_id = id.split('_')[1];
    var target_section_id = id.split('_')[2];
    var target_event_card_id = id.split('_')[3];
    var target_food_id = id.split('_')[4];
    $('#f_' + target_data_id + '_' + target_section_id + '_' + target_event_card_id + '_' + target_food_id).remove();
    $('#df_' + target_data_id + '_' + target_section_id + '_' + target_event_card_id + '_' + target_food_id).remove();
    change_data_box_height(target_data_id,$('#' + target_data_id + ' .data_parts_box').height()+60);
}

function select_image(id){
    var target_data_id = id.split('_')[1];
	var selected_image_id = id.split('_')[2];

	$('#' + target_data_id + ' .image_button').removeClass('selected');
    $('#p-i_' + target_data_id + '_' + selected_image_id).addClass('selected');	
}

function change_direction(id){
	check_loc_pin_id();
}
function change_floor(id){
	check_loc_pin_id();
}

function export_data(data_id){
    var data_amount = $('#data_container ul').length;
    var data = 'var location_data = [\n';
    var floor_pin_amount = [0,0,0,0];
    var export_data = 0;
    for(var i=0;i<data_amount;i++){ //データの数だけ繰り返し
        var target_data_id = $('#data_container ul')[i].id;
        if(data_id != undefined){	//書き出すデータが指定されてるならば
            if(data_id != target_data_id){	//書き出す対象でないならば
                export_data = 0;
            }
            else{
                export_data = 1;
            }
        }
        else{
            export_data = 1;
		}
		
        if(export_data){	//書き出し対象データならば
			//全部入力されてるかのチェック
			var input_amount = $('#' + target_data_id + ' input').length;
			for(var ia=0;ia<input_amount;ia++){
				if($('#' + target_data_id + ' input')[ia].value == ""){
					var target_class_name = $('#' + target_data_id + ' input')[ia].className.split(' ')[0]
					var undefined_content = window.getComputedStyle($('.type' + target_class_name.slice(2))[0], '::before').getPropertyValue('content');
					if(undefined_content == '場所のタイトル'){
						alert('「場所のタイトル」が未入力です');
					}
					else{
						alert('「' + $('#' + target_data_id + ' .loc_name_form [name=loc_name]').val() + '」ピンの「' + undefined_content + '」の項目が未入力です');
					}
					open_pin_data('b_' + target_data_id);
					return;
				}
			}

			//データを文字列として書き出す
			var data_type = $('#data_container ul')[i].className.split(' ')[0];
			if(data_type == 'location_pin_data'){	//現在地ピンならば
				var pin_name = $('#' + target_data_id + ' .loc_name_form [name=loc_name]').val();
				var floor = $('#' + target_data_id + ' .floor_form [name=floor]').val();
				var left_position = $('#' + target_data_id + ' .pin_location_form [name=pin_location]').val().split(',')[0];
            	var top_position = $('#' + target_data_id + ' .pin_location_form [name=pin_location]').val().split(',')[1];
				data += '\t{\n' + '\t\tpin_name:"' + pin_name + '",\n\t\tmap_location:["' + left_position + '","' + top_position + '"],\n\t\tpin_img_id:' + 15 + ',\n\t\tloc_name:"現在地",\n\t\tsub_name:"You are here",\n\t\tkey_word:["' + pin_name + '"],\n\t},\n';
			}
			else{
				var floor = $('#' + target_data_id + ' .floor_form [name=floor]').val();
            	var left_position = $('#' + target_data_id + ' .pin_location_form [name=pin_location]').val().split(',')[0];
				var top_position = $('#' + target_data_id + ' .pin_location_form [name=pin_location]').val().split(',')[1];
				if($('#' + target_data_id + ' .image_button.selected')[0] == undefined){	//ピンの画像が選択されているかのチェック
					alert('「' + $('#' + target_data_id + ' .loc_name_form [name=loc_name]').val() + '」ピンの「ピンの画像」が選択されていません');
					open_pin_data('b_' + target_data_id);
					return;
				}
            	var pin_img_id = $('#' + target_data_id + ' .image_button.selected')[0].id.split('_')[2];
            	var loc_name = $('#' + target_data_id + ' .loc_name_form [name=loc_name]').val();
            	var sub_name = $('#' + target_data_id + ' .sub_name_form [name=sub_name]').val();
            	floor_pin_amount[floor] = floor_pin_amount[floor] + 1;
            	data += '\t{\n';
            	data += '\t\tpin_name:"' + floor + '_' + floor_pin_amount[floor] + '",\n\t\tmap_location:["' + left_position + '","' + top_position + '"],\n\t\tpin_img_id:' + pin_img_id + ',\n\t\tloc_name:"' + loc_name + '",\n\t\tsub_name:"' + sub_name + '",\n';
            	var key_word = $('#' + target_data_id + ' .key_word_form [name=key_word]').val();
            	var key_word_amount = key_word.split(',').length
            	data += '\t\tkey_word:['
            	for(var k=0;k<key_word_amount;k++){
            	    data += '"' + key_word.split(',')[k] + '",';
				}
				data += '"' + floor + '_' + floor_pin_amount[floor] + '",' + '"all"';
            	data += '],\n'
            	if($('#' + target_data_id + ' .additional_section').length != 0){    //もし追加セクションがあれば
            	    var additional_section_amount = $('#' + target_data_id + ' .additional_section').length;
            	    var info_title = new Array(additional_section_amount);
            	    var info_date = new Array(additional_section_amount);
            	    var info_category = new Array(additional_section_amount);
            	    var info_content_amount = new Array(additional_section_amount);
            	    var event_card_amount = new Array(additional_section_amount);
            	    var text_content = undefined;
            	    for(var a=0;a<additional_section_amount;a++){   //セクションの数だけ繰り返し
            	        var target_additional_section_id = $('#' + target_data_id + ' .additional_section')[a].id;
            	        info_title[a] = '"' + $('#' + target_data_id + ' #' + target_additional_section_id + ' .info_title_form [name=info_title]').val() + '"';
            	        info_date[a] = '"' + $('#' + target_data_id + ' #' + target_additional_section_id + ' .info_date_form [name=info_date]').val() + '"';
            	        info_category[a] = '"' + $('#' + target_data_id + ' #' + target_additional_section_id + ' .info_category_form [name=info_category]').val() + '"';
            	        if(info_category[a] == '"text"'){
            	            if(text_content == undefined){
            	                text_content = new Array(0);
            	            }
            	            text_content[text_content.length] = '"' + $('#' + target_data_id + ' #' + target_additional_section_id + ' .text_content_form [name=text_content]').val() + '"';
            	        }
            	        if($('#' + target_data_id + ' #' + target_additional_section_id + ' .event_card').length != 0){  //もしイベントカードがあれば
            	            info_content_amount[a] = $('#' + target_data_id + ' #' + target_additional_section_id + ' .event_card').length;
            	            event_card_amount[a] = info_content_amount[a];
            	        }
            	        else{
            	            info_content_amount[a] = 1;
            	            event_card_amount[a] = 0;
            	        }
            	    }
            	    data += '\t\tinfo_title:[' + info_title + '],\n\t\tinfo_date:[' + info_date + '],\n\t\tinfo_category:[' + info_category + '],\n\t\tinfo_content_amount:[' + info_content_amount + '],\n';
            	    if(text_content != undefined){
            	        data += '\t\ttext_content:[' + text_content + '],\n';
            	    }

            	    var event_type = undefined,
            	    	event_time = undefined,
            	    	event_discription = undefined,
            	    	play_title = undefined,
            	    	music = undefined,
						music_amount = undefined,
						play_amount = undefined,
						event_presenter = undefined,
            	    	shop_name = undefined,
            	    	item_amount = undefined,
            	    	item = undefined,
            	    	item_name = undefined,
            	    	product_name = undefined,
						price = undefined;
					var exported_event_card_amount = 0;
            	    for(var a=0;a<additional_section_amount;a++){   //セクションの数だけ繰り返し
            	        if(event_card_amount[a] != 0){
            	            var target_additional_section_id = $('#' + target_data_id + ' .additional_section')[a].id;
            	            for(var e=0;e<event_card_amount[a];e++){    //イベントカードの数だけ繰り返し
            	                var target_event_card_id = $('#' + target_data_id + ' #' + target_additional_section_id + ' .event_card')[e].id;
								var added_music_amount = 0;
            	                var added_item_amount = 0;
            	                switch(info_category[a]){
            	                    case '"timetable"':
            	                        if(event_type == undefined){
            	                            event_type = new Array(0);
            	                            event_time = new Array(0);
            	                            event_discription = new Array(0);
            	                            play_title = new Array(0);
            	                        }
            	                        event_type[event_type.length] = '"' + $('#' + target_data_id + ' #' + target_additional_section_id + ' #' + target_event_card_id + ' .event_type_form [name=event_type]').val() + '"';
            	                        event_time[event_time.length] = '"' + $('#' + target_data_id + ' #' + target_additional_section_id + ' #' + target_event_card_id + ' .event_time_form [name=start]').val() + ' - ' + $('#' + target_data_id + ' #' + target_additional_section_id + ' #' + target_event_card_id + ' .event_time_form [name=end]').val() + '"';
            	                        event_discription[event_discription.length] = '"' + $('#' + target_data_id + ' #' + target_additional_section_id + ' #' + target_event_card_id + ' .event_discription_form [name=event_discription]').val() + '"';
            	                        play_title[play_title.length] = '"' + $('#' + target_data_id + ' #' + target_additional_section_id + ' #' + target_event_card_id + ' .play_title_form [name=play_title]').val() + '"';
										if(event_type[exported_event_card_amount] == '"music"'){
            	                            if(music == undefined){
            	                                music = new Array(0);
            	                                music_amount = new Array(0);
            	                            }
            	                            music_amount[music_amount.length] = $('#' + target_data_id + ' #' + target_additional_section_id + ' #' + target_event_card_id + ' .music_form input').length;
            	                            var current_music_amount = music.length;
            	                            for(var m=0;m<music_amount[music_amount.length-1];m++){
            	                                var target_item_id = $('#' + target_data_id + ' #' + target_additional_section_id + ' #' + target_event_card_id + ' .music_form input')[added_music_amount].id.split('_')[4];
            	                                music[current_music_amount+m] = '"' + $('#m_' + target_data_id + '_' + target_additional_section_id.slice(3) + '_' + target_event_card_id.slice(3) + '_' + target_item_id).val() + '"';
            	                                added_music_amount++;
            	                            }
										}
										if(event_type[exported_event_card_amount] == '"play"'){
            	                            if(event_presenter == undefined){
												event_presenter = new Array(0);
											}
            	                            var current_play_amount = event_presenter.length;
											event_presenter[current_play_amount] = '"' + $('#e_p_' + target_data_id + '_' + target_additional_section_id.slice(3) + '_' + target_event_card_id.slice(3)).val() + '"';
            	                        }
            	                        break;
            	                    case '"foodshop"':
            	                        if(shop_name == undefined){
            	                            shop_name = new Array(0);
            	                        }
            	                        if(item_amount == undefined){
            	                            item_amount = new Array(0);
            	                            item = new Array(0);
            	                        }
            	                        shop_name[shop_name.length] = '"' + $('#' + target_data_id + ' #' + target_additional_section_id + ' #' + target_event_card_id + ' .shop_name_form [name=shop_name]').val() + '"';
            	                        item_amount[item_amount.length] = $('#' + target_data_id + ' #' + target_additional_section_id + ' #' + target_event_card_id + ' .food_form input').length;
            	                        var current_item_amount = item.length;
            	                        for(var ia=0;ia<item_amount[item_amount.length-1];ia++){
            	                            var target_item_id = $('#' + target_data_id + ' #' + target_additional_section_id + ' #' + target_event_card_id + ' .food_form input')[added_item_amount].id.split('_')[4];
            	                            item[current_item_amount + ia] = '"' + $('#f_' + target_data_id + '_' + target_additional_section_id.slice(3) + '_' + target_event_card_id.slice(3) + '_' + target_item_id).val() + '"';
            	                            added_item_amount++;
            	                        }
            	                        break;
            	                    case '"menu"':
            	                        if(item_name == undefined){
            	                            item_name = new Array(0);
            	                        }
            	                        if(item_amount == undefined){
            	                            item_amount = new Array(0);
            	                            item = new Array(0);
            	                        }
            	                        item_amount[item_amount.length] = $('#' + target_data_id + ' #' + target_additional_section_id + ' #' + target_event_card_id + ' .food_form input').length;
            	                        var current_item_amount = item.length;
            	                        item_name[item_name.length] = '"' + $('#' + target_data_id + ' #' + target_additional_section_id + ' #' + target_event_card_id + ' .item_type_form [name=item_type]').val() + '"';
            	                        for(var ia=0;ia<item_amount[item_amount.length-1];ia++){
            	                            var target_item_id = $('#' + target_data_id + ' #' + target_additional_section_id + ' #' + target_event_card_id + ' .food_form input')[added_item_amount].id.split('_')[4];
            	                            item[current_item_amount + ia] = '"' + $('#f_' + target_data_id + '_' + target_additional_section_id.slice(3) + '_' + target_event_card_id.slice(3) + '_' + target_item_id).val() + '"';
            	                            added_item_amount++;
            	                        }
            	                        break;
            	                    case '"price"':
            	                        if(product_name == undefined){
            	                            product_name = new Array(0);
            	                            price = new Array(0);
            	                        }
            	                        product_name[product_name.length] = '"' + $('#' + target_data_id + ' #' + target_additional_section_id + ' #' + target_event_card_id + ' .product_name_form [name=product_name]').val() + '"';
            	                        price[price.length] = $('#' + target_data_id + ' #' + target_additional_section_id + ' #' + target_event_card_id + ' .price_form [name=price]').val();
            	                        break;
            	                    case '"lecture"':
            	                        if(event_type == undefined){
            	                            event_type = new Array(0);
            	                            event_time = new Array(0);
            	                            event_presenter = new Array(0);
            	                            event_discription = new Array(0);
            	                            play_title = new Array(0);
            	                        }
            	                        event_type[event_type.length] = '"' + $('#' + target_data_id + ' #' + target_additional_section_id + ' #' + target_event_card_id + ' .event_type_form [name=event_type]').val() + '"';
            	                        event_time[event_time.length] = '"' + $('#' + target_data_id + ' #' + target_additional_section_id + ' #' + target_event_card_id + ' .event_time_form [name=start]').val() + ' - ' + $('#' + target_data_id + ' #' + target_additional_section_id + ' #' + target_event_card_id + ' .event_time_form [name=end]').val() + '"';
            	                        event_presenter[event_presenter.length] = '"' + $('#' + target_data_id + ' #' + target_additional_section_id + ' #' + target_event_card_id + ' .event_presenter_form [name=event_presenter]').val() + '"';
            	                        event_discription[event_discription.length] = '"' + $('#' + target_data_id + ' #' + target_additional_section_id + ' #' + target_event_card_id + ' .event_discription_form [name=event_discription]').val() + '"';
            	                        play_title[play_title.length] = '"' + $('#' + target_data_id + ' #' + target_additional_section_id + ' #' + target_event_card_id + ' .play_title_form [name=play_title]').val() + '"';
            	                        break;
            	                    case '"image"':
            	                        break;
								}
								exported_event_card_amount++;
            	            }
            	        }
            	    }

            	    if(event_type != undefined){
            	        data += '\t\tevent_type:[' + event_type + '],\n\t\tevent_time:[' + event_time + '],\n\t\tevent_discription:[' + event_discription + '],\n\t\tplay_title:[' + play_title + '],\n';
            	    }
            	    if(music_amount != undefined){
            	        data += '\t\tmusic_amount:[' + music_amount + '],\n\t\tmusic:[' + music + '],\n'
					}
					if(event_presenter != undefined){
            	        data += '\t\tevent_presenter:[' + event_presenter + '],\n'
            	    }
            	    if(shop_name != undefined){
            	        data += '\t\tshop_name:[' + shop_name + '],\n'
            	    }
            	    if(item_name != undefined){
            	        data += '\t\titem_name:[' + item_name + '],\n'
            	    }
            	    if(item_amount != undefined){
            	        data += '\t\titem_amount:[' + item_amount + '],\n\t\titem:[' + item + '],\n'
            	    }
            	    if(product_name != undefined){
            	        data += '\t\tproduct_name:[' + product_name + '],\n\t\tprice:[' + price + '],\n'
            	    }
				}
				data += '\t},\n';
			}
		}
    }
    data += ']'
	$('#data_textarea').val(data);
    if(data_id == undefined){
        var blob = new Blob([ data ], { "type" : "application/x-msdownload" });
        window.URL = window.URL || window.webkitURL;
		$("#download_link").attr("href", window.URL.createObjectURL(blob));
		$("#download_link").attr("download", "locationinfo.js");
        $('#output_monitor h2').html('データは正常に書き出されました');
		show_output_monitor();
	}
    return data;
}

$(function(){
	if (window.File && window.FileReader && window.FileList && window.Blob) {} 
	else {
		alert('The File APIs are not fully supported in this browser.');
	}
    document.getElementById("datafile").addEventListener("change",function(evt){

        var file = evt.target.files;
        
        var reader = new FileReader();

        reader.readAsText(file[0]);
        
        reader.onload = function(ev){
			var raw_data = reader.result.slice(21,-1).split('},');

			var current_data_amount = $('#data_container ul').length;
			var new_data_id = current_data_amount+1;

            for(var d=1;d<raw_data.length;d++){
				
				var slice_data = raw_data[d-1].slice(0,-1).split('\t\t');
				var data = {};
                for(var i=1;i<slice_data.length;i++){
                    var key = slice_data[i].split(':')[0];
                    var value = slice_data[i].slice(key.length+1,-2);
                    
                    if(value.slice(0,1) == '['){
                        value = value.slice(1,-1);
                    }
                    value = value.split(",")
                    for(var v=0;v<value.length;v++){
                        if(value[v].slice(0,1) == '"'){
                            value[v] = value[v].slice(1,-1);
                        }
                    }
                    data[key] = value;
                }

				var pin_name = data.pin_name;
				var loc_name = data.loc_name;
                var sub_name = data.sub_name;
				var key_word = data.key_word;
				var floor = pin_name[0].split('_')[0];
                var left_position = data.map_location[0];
                var top_position = data.map_location[1];
                var pin_img_id = data.pin_img_id;
				var key_word_amount = key_word.length;

				if(data.pin_name[0].split('_').length == 3){
					add_location_data();
					$('#d' + new_data_id + ' .loc_name_form [name=loc_name]').val(pin_name);
					$('#d' + new_data_id + ' .direction_form [name=direction]').val(data.pin_name[0].split('_')[2]);
					$('#d' + new_data_id + ' .floor_form [name=floor]').val(floor);
					$('#d' + new_data_id + ' .pin_location_form [name=pin_location]').val(left_position + ',' + top_position);
				}
				else{
					add_data();
					$('#d' + new_data_id + ' .loc_name_form [name=loc_name]').val(loc_name);
					$('#d' + new_data_id + ' .sub_name_form [name=sub_name]').val(sub_name);
					var key_word_data = '';
					for(var i=0;i<key_word_amount;i++){
						if(key_word[i] != "all" && key_word[i] != pin_name){
							key_word_data += key_word[i] + ',';
						}
					}
					key_word_data = key_word_data.slice(0,-1);  //最後のコンマを消去
					$('#d' + new_data_id + ' .key_word_form [name=key_word]').val(key_word_data);
					$('#d' + new_data_id + ' .floor_form [name=floor]').val(floor);
					$('#d' + new_data_id + ' .pin_location_form [name=pin_location]').val(left_position + ',' + top_position);
					$('#p-i_d' + new_data_id + '_' + pin_img_id).addClass('selected');
					
					if(data.info_content_amount != undefined){
						var text_content_count = 0;
						var added_music_amount = 0;
						var added_play_amount = 0;
						var added_item_amount = 0;
						var added_schedule_amount = 0;
						var added_music_section_amount = 0;
						var added_shop_amount = 0;
						var added_product_amount = 0;
						for(var s=1;s<=data.info_content_amount.length;s++){	//セクションを追加
							add_section('a_d' + new_data_id);
							var info_title = data.info_title[s-1];
							var info_date = data.info_date[s-1];
							var info_category = data.info_category[s-1];
							$('#d' + new_data_id + ' #as_' + s + ' .info_title_form [name=info_title]').val(info_title);
							$('#d' + new_data_id + ' #as_' + s + ' .info_date_form [name=info_date]').val(info_date);
							$('#d' + new_data_id + ' #as_' + s + ' .info_category_form [name=info_category]').val(info_category);
							change_section_category('#s_d' + new_data_id + '_' + s)
							for(var e=0;e<data.info_content_amount[s-1];e++){
								if(info_category != 'text'){
									if(e>0){add_event_card('a_d' + new_data_id + '_' + s);}
								}
								switch(info_category){
									case 'text':
										var text = data.text_content[text_content_count];
										$('#d' + new_data_id + ' #as_' + s + ' .text_content_form [name=text_content]').val(text);
										text_content_count++;
										break;
									case 'timetable':
										var play_title = data.play_title[added_schedule_amount];
										var event_time_start = data.event_time[added_schedule_amount].split(' - ')[0];
										var event_time_end = data.event_time[added_schedule_amount].split(' - ')[1];
										var event_type = data.event_type[added_schedule_amount];
										var event_discription = data.event_discription[added_schedule_amount];
										$('#d' + new_data_id + ' #as_' + s + ' #ec_' + (e+1) + ' .play_title_form [name=play_title]').val(play_title);
										$('#d' + new_data_id + ' #as_' + s + ' #ec_' + (e+1) + ' .event_time_form [name=start]').val(event_time_start);
										$('#d' + new_data_id + ' #as_' + s + ' #ec_' + (e+1) + ' .event_time_form [name=end]').val(event_time_end);
										$('#d' + new_data_id + ' #as_' + s + ' #ec_' + (e+1) + ' .event_presenter_form [name=event_presenter]').val(event_presenter);
										$('#d' + new_data_id + ' #as_' + s + ' #ec_' + (e+1) + ' .event_discription_form [name=event_discription]').val(event_discription);
										$('#d' + new_data_id + ' #as_' + s + ' #ec_' + (e+1) + ' .event_type_form [name=event_type]').val(event_type);
										if(event_type == 'music'){
											change_event_type('e_d' + new_data_id + '_' + s + '_' + (e+1));
											var music_amount = data.music_amount[added_music_section_amount];
											var add_count = 0;
											for(var m=0;m<music_amount;m++){
												if(add_count>0){add_music('am_d' + new_data_id + '_' + s + '_' + (e+1));}
												$('#m_d' + new_data_id + '_' + s + '_' + (e+1) + '_' + (add_count+1)).val(data.music[added_music_amount]);
												added_music_amount++;
												add_count++;
											}
											added_music_section_amount++;
										}
										if(event_type == 'play'){
											change_event_type('e_d' + new_data_id + '_' + s + '_' + (e+1));
											$('#e_p_d' + new_data_id + '_' + s + '_' + (e+1)).val(data.event_presenter[added_play_amount]);
											added_play_amount++;
										}
										added_schedule_amount++;
										break;
									case 'foodshop':
										var shop_name = data.shop_name[added_shop_amount];
										var item_amount = data.item_amount[added_shop_amount];
										$('#d' + new_data_id + ' #as_' + s + ' #ec_' + (e+1) + ' .shop_name_form [name=shop_name]').val(shop_name);
										var add_count = 0;
										for(var ia=0;ia<item_amount;ia++){
											var item = data.item[added_item_amount];
											if(add_count>0){add_food('af_d' + new_data_id + '_' + s + '_' + (e+1));}
											$('#f_d' + new_data_id + '_' + s + '_' + (e+1) + '_' + (ia+1)).val(item);
											added_item_amount++;
											add_count++;
										}
										added_shop_amount++;
										break;
									case 'menu':
										var item_name = data.item_name[added_shop_amount];
										var item_amount = data.item_amount[added_shop_amount];
										$('#d' + new_data_id + ' #as_' + s + ' #ec_' + (e+1) + ' .item_type_form [name=item_type]').val(item_name);
										var add_count = 0;
										for(var ia=1;ia<=item_amount;ia++){
											var item = data.item[added_item_amount];
											if(add_count>0){add_food('af_d' + new_data_id + '_' + s + '_' + (e+1));}
											$('#f_d' + new_data_id + '_' + s + '_' + (e+1) + '_' + ia).val(item);
											added_item_amount++;
											add_count++;
										}
										added_shop_amount++;
										break;
									case 'price':
										var product_name = data.product_name[added_product_amount];
										var price = data.price[added_product_amount];
										$('#d' + new_data_id + ' #as_' + s + ' #ec_' + (e+1) + ' .product_name_form [name=product_name]').val(product_name);
										$('#d' + new_data_id + ' #as_' + s + ' #ec_' + (e+1) + ' .price_form [name=price]').val(price);
										added_product_amount++;
										break;
									case 'lecture':
										var play_title = data.play_title[added_schedule_amount];
										var event_time_start = data.event_time[added_schedule_amount].split(' - ')[0];
										var event_time_end = data.event_time[added_schedule_amount].split(' - ')[1];
										var event_presenter = data.event_presenter[added_schedule_amount];
										var event_discription = data.event_discription[added_schedule_amount];
										$('#d' + new_data_id + ' #as_' + s + ' #ec_' + (e+1) + ' .play_title_form [name=play_title]').val(play_title);
										$('#d' + new_data_id + ' #as_' + s + ' #ec_' + (e+1) + ' .event_time_form [name=start]').val(event_time_start);
										$('#d' + new_data_id + ' #as_' + s + ' #ec_' + (e+1) + ' .event_time_form [name=end]').val(event_time_end);
										$('#d' + new_data_id + ' #as_' + s + ' #ec_' + (e+1) + ' .event_presenter_form [name=event_presenter]').val(event_presenter);
										$('#d' + new_data_id + ' #as_' + s + ' #ec_' + (e+1) + ' .event_discription_form [name=event_discription]').val(event_discription);
										added_schedule_amount++;
										break;
									case 'image':
										break;
								}
							}
						}
					}
				}
				close_pin_data('b_d' + new_data_id);
				new_data_id++;
            }
        }
    },false);
})


function preview_pin_data(id){
    if($('#locationinfo').hasClass('active')){
        locinfoChange();//今まで表示していた場所の説明を収納
        setTimeout('locinfoOpen()',600);
        setTimeout('write_data("' + id + '")',600);
    }
    else{
        locinfoOpen();
        write_data(id);
    }
}
function write_data(id){
	var data = export_data(id.slice(2)).slice(0,-5).split('\t\t');
    var target_pin_data = {};
    for(var i=1;i<data.length;i++){
        var key = data[i].split(':')[0];
        var value = data[i].slice(key.length+1,-2);
        
        if(value.slice(0,(1-value.length)) == '['){
            value = value.slice(1,-1);
        }

        value = value.split(",")
        for(var v=0;v<value.length;v++){
            if(value[v].slice(0,(1-value[v].length)) == '"'){
                value[v] = value[v].slice(1,-1);
            }
        }
        target_pin_data[key] = value;
	}
	
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
                    var locationinfo = "<div class='moreinfo'><h2>" + target_pin_data.info_title[i] + "</h2><div class='date'>" + target_pin_data.info_date[i] + "</div><ul class='" + target_pin_data.info_category[i] + "'>";
                    for(i2 = 0; i2 < target_pin_data.info_content_amount[n]; i2++){  //詳細情報の子要素の数だけループ
                        locationinfo += "<li>" + target_pin_data.event_time[ca] + "<br><b>" + target_pin_data.event_presenter[ca] + "</b><br>" + target_pin_data.play_title[ca] + "<p>" + target_pin_data.event_discription[ca] + "</p>";
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
}



var locinfo_closing = 0;
var opening_new_data = 0;
function locinfoOpen(){
    opening_new_data = 0;
    if($('.aspectratio').hasClass("landscape")){    //画面が横向きならば
        if(!$('#locationinfo').hasClass('active')){ //パネルが開いていない状態なら
            $('.landscape #locationinfo').transform('translateX','60vw');
        }
    }
    $('#locationinfo').addClass('active');
    $('.mobile #locationinfo').transform('translateY',$(window).height() - (90+50) + 'px');
}
function locinfoClose(){
    locinfo_closing = 1;
    $('body,html').animate({
        scrollTop: 0
    }, 300);
    if($('.aspectratio').hasClass("landscape")){    //画面が横向きならば
        setTimeout('close_locinfo_panel()',600);
    }
    else{
        close_locinfo_panel();
    }
}
function close_locinfo_panel(){
    $('.landscape #locationinfo').transform('translateX','100vw');
    $('.mobile #locationinfo').transform('translateY',$(window).height() + 'px');
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


function minimize_data_window(){
	$('#data_container').addClass('minimize');
}
function default_data_window(){
	$('#data_container').removeClass('minimize');
}

function show_output_monitor(){
	var text_area_height = $('#output_monitor').height() - 250;
	$('#data_textarea').css({height:text_area_height + 'px'});
	minimize_data_window();
	$('#output_monitor').transform('translateY','0');
}
function close_output_monitor(){
	default_data_window();
	$('#output_monitor').transform('translateY','100vh');
}

function image_select(id){
	minimize_data_window();
    var target_data_id = id.split('_')[1];
	var floor = $('#' + target_data_id + ' .floor_form [name=floor]').val();
	if($('#' + target_data_id + ' .pin_location_form [name=pin_location]').val() != ""){
		var left_position = $('#' + target_data_id + ' .pin_location_form [name=pin_location]').val().split(',')[0].slice(5);
		var top_position = $('#' + target_data_id + ' .pin_location_form [name=pin_location]').val().split(',')[1].slice(5);
		$('.pin').css({'left':'calc(' + left_position.split('%')[0]*1.2 + 'vmax' + left_position.split('%')[1]});
    	$('.pin').css({'top':'calc(' + top_position.split('%')[0]*1.2 + 'vmax' + top_position.split('%')[1]});
	}
    $('#get_location_box').addClass('open');
    $('#get_location_box').addClass(target_data_id);
	$('#get_location_box').addClass('f' + floor);
	$('#get_location_box').addClass('11_25');
    $('.pinlocation_save_button').addClass('active');
	$('#gl' + floor).addClass('selected');
	$('.location_pin').hide();
}
function save_location(){
	default_data_window();
	var pin_size = $("#get_location_box")[0].className.split(' ')[3];
    var target_floor = $("#get_location_box")[0].className.split(' ')[2].slice(1);
	var target_data_id = $("#get_location_box")[0].className.split(' ')[1];
	$('#get_location_box').removeClass(pin_size);
    $('#get_location_box').removeClass('f' + target_floor);
    $('#get_location_box').removeClass(target_data_id);
    $('#get_location_box').removeClass('open');
    $('.pinlocation_save_button').removeClass('active');
	$('.get_location_image').removeClass('selected');
	$('.pin').show();
	$('.location_pin').show();
}
$(function(){
    document.getElementById("get_location_box").onclick = function( event ) {
        var target_data_id = $("#get_location_box")[0].className.split(' ')[1];
		var target_floor = $("#get_location_box")[0].className.split(' ')[2].slice(1);
		var pin_size = $("#get_location_box")[0].className.split(' ')[3];
    	var x = event.pageX ;	// 水平の位置座標
		var y = event.pageY ;	// 垂直の位置座標
        var left_parsent = (x + $("#get_location_box").scrollLeft()) / $("#gl" + target_floor).width();
		var top_parsent = (y + $("#get_location_box").scrollTop()) / $("#gl" + target_floor).height();
		if(pin_size.split('_')[0] == '11'){
			$('.pin').css({'left':'calc(' + left_parsent*120 + 'vmax - ' + pin_size.split('_')[0] + 'px)'});
        	$('.pin').css({'top':'calc(' + top_parsent*120 + 'vmax - ' + pin_size.split('_')[1] + 'px)'});
		}
		else{
			$('.location_pin').css({'left':'calc(' + left_parsent*120 + 'vmax - ' + pin_size.split('_')[0] + 'px)'});
			$('.location_pin').css({'top':'calc(' + top_parsent*120 + 'vmax - ' + pin_size.split('_')[1] + 'px)'});
		}
        $('#' + target_data_id + ' .pin_location_form [name=pin_location]').val('calc(' + left_parsent*100 + '% - ' + pin_size.split('_')[0] + 'px),' + 'calc(' + top_parsent*100 + '% - ' + pin_size.split('_')[1] + 'px)');
    }
})

function image_select_location(id){
	for(var i=0;i<4;i++){
		$('.location_pin').removeClass('type' + i);
	}
	minimize_data_window();
	var target_data_id = id.split('_')[1];
	var direction = $('#' + target_data_id + ' .direction_form [name=direction]').val();
	var floor = $('#' + target_data_id + ' .floor_form [name=floor]').val();
	if($('#' + target_data_id + ' .pin_location_form [name=pin_location]').val() != ""){
		var left_position = $('#' + target_data_id + ' .pin_location_form [name=pin_location]').val().split(',')[0].slice(5);
		var top_position = $('#' + target_data_id + ' .pin_location_form [name=pin_location]').val().split(',')[1].slice(5);
		$('.location_pin').css({'left':'calc(' + left_position.split('%')[0]*1.2 + 'vmax' + left_position.split('%')[1]});
		$('.location_pin').css({'top':'calc(' + top_position.split('%')[0]*1.2 + 'vmax' + top_position.split('%')[1]});
	}
    $('#get_location_box').addClass('open');
    $('#get_location_box').addClass(target_data_id);
	$('#get_location_box').addClass('f' + floor);
	$('#get_location_box').addClass('15_15');
    $('.pinlocation_save_button').addClass('active');
	$('#gl' + floor).addClass('selected');
	$('.pin').hide();
	$('.location_pin').addClass('type' + direction);
}

// フロア画像のドラッグ操作
$(function () {
    $('#get_location_box').addClass('grabable');
    var PrevClickPosX,
        PrevClickPosY,
        startPosX,
        startPosY,
        ClickPosX = 0,
        ClickPosY = 0;
    
    $('#get_location_box')[0].addEventListener("mousedown", clicked, false);
    // クリック開始
    function clicked(e){
        $('#get_location_box').removeClass('grabable');
        $('#get_location_box').addClass('grabbing');
        $('#get_location_box')[0].addEventListener("mousemove",mousemove, false);
        PrevClickPosX = e.pageX;
        PrevClickPosY = e.pageY;
        startPosX = $("#get_location_box").scrollLeft();
        startPosY = $("#get_location_box").scrollTop();
    };
    //ドラッグ開始
    function mousemove(e){
        e.preventDefault();
        $('#get_location_box')[0].addEventListener("mouseup",mouseup, false);
        ClickPosX = e.pageX;
        ClickPosY = e.pageY;
        var scrollX = (ClickPosX - PrevClickPosX) * -1;
        var scrollY = (ClickPosY - PrevClickPosY) * -1;
        $('#get_location_box').scrollLeft(startPosX + scrollX);
        $('#get_location_box').scrollTop(startPosY + scrollY);
    }
    //ドラッグ終了
    function mouseup(e){
        $('#get_location_box').addClass('grabable');
        $('#get_location_box').removeClass('grabbing');
        $('#get_location_box')[0].removeEventListener("mousemove", mousemove, false);
    }
});