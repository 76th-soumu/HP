//検索用-------------------------------------------

function Key_on(key)
{
    if(key == 13){
        search();
    }
}

//テキストボックス
//var url = (location.search).substr(6);
function search(){
    var str1 = document.js.txtb.value;    //テキストボックスの内容をstr1に格納
    if (str1 == ''){
        $('.pins').removeClass('show');
        $('#search_result').removeClass('active');
        allpinShow();
    }
    else{
        var pin_floor;
        var locationpin = 0;
        var hit_pin_amount = 0;
        $('#result tbody tr').each(function(){
            var txt = $(this).find("td:eq(0)").html().toLowerCase();
            str1 = str1.toLowerCase();
            if(txt.match(str1) != null){
                if(txt.split('_').length == 3 && this.id.split('_').length == 3){ //検索結果が現在地ピンなら
                    $('.alwaysshow').removeClass('alwaysshow');
                    $(this).addClass('alwaysshow');
                    result_pin_number = this.id.substr(1);
                    pin_floor = result_pin_number.slice(0,1);
                    $('.pin' + result_pin_number).addClass('active');
                    locationpin = 1;
                }
                else{
                    $(this).addClass('show');
                    result_pin_number = this.id.substr(1);
                    pin_floor = result_pin_number.slice(0,1);
                    $('.pin' + result_pin_number).addClass('active');
                    hit_pin_amount++;
                }
            }else{
                $(this).removeClass('show');
            }
        });
        if(pin_floor != undefined){ //ピンが見つかれば
            movefloor(pin_floor);
            if(hit_pin_amount == 1){
                pinselected('pin' + result_pin_number);  //指定されたピンを自動選択
            }
            if(locationpin){
                getlocation_qr();
            }
            $('#search_result').addClass('active');
            $('#search_result').html(hit_pin_amount + '件ヒット');
        }
        else{
            $('#search_result').html('0件ヒット');
        }
    }
}


function searchunei(){
    document.js.txtb.value = '学園祭運営';
    search();
}
function searchfood(){
    document.js.txtb.value = '食事';
    search();
}
function searchhatudan(){
    document.js.txtb.value = '発団';
    search();
}
function searchbathroom(){
    document.js.txtb.value = 'トイレ';
    search();
}