/*Simple Memory Game*/
/*Author: Nahid Ibrahimov*/

var clicked_arr = [];
var images = [];
var same_nums = [];
var random;
var matched = [];
var attempts = 0;
var second = 5;
var blocks = 12;
var clicked;
var showed = false;

while(images.length < blocks){
	random = Math.floor(Math.random()* Math.floor(blocks / 2)) + 1;
		
		if(!check_array(same_nums, random)){
			images.push(random);
			same_nums.push(random);
		}		
	
}

show_all();
$('.game-info').find('div span').eq(0).text(second);
timer(second);
setTimeout(hide_all, second * 1000);

$('.card-wrapper').on('click', function(e) {

	e.stopImmediatePropagation();
	e.preventDefault();

	if(clicked)
		return false;
       
	var card_id = $(this).attr('id');	

	if(clicked_arr.indexOf(card_id) == -1 && clicked_arr.length < 2 && !check_matched(matched, card_id) && showed){
		clicked_arr.push(card_id);
		$('#' + card_id).find('.card').append('<img class="w-100p h-100p object-fit-c pn-ab tp-0 lf-0 img" src="img/'+ images[card_id - 1] +'.jpg">');
		$('#' + card_id).find('.card').css({transform: 'rotateY(180deg)'});
	}

	if(clicked_arr.length > 1){

		clicked = true;

		$('.game-info').find('div span').eq(1).text(++attempts);

		if(images[clicked_arr[0]-1] == images[clicked_arr[1]-1]){
			matched.push(clicked_arr[0]);
			matched.push(clicked_arr[1]);
			$('.game-info').find('div span').eq(2).text(Math.floor(matched.length / 2));
			clicked_arr = [];
			clicked = false;
			}else{
				var i = clicked_arr.length - 1;
				setTimeout(clear, 400);
			}

		function clear() {

		if(i >= 0){
			$('#' + clicked_arr[i]).find('.card').css({transform: 'rotateY(0deg)'});
			$('#' + clicked_arr[i] + ' .card').find('img').delay(100).queue(function() {
				$(this).remove();
			});
			clicked_arr.splice(i, 1);
			i--;
			clear();
		}//if
		clicked = false;
		} //func clear

				

	}//if

	if(matched.length == 12){
		$('.game-info').html('<div><span class="f-w-b d-b">Congratulations!</span> You won!</div><div class="pt-10 i-b click" onclick="window.location.reload();">Play Again</div>');
	}

});

function timer(second) {	
	if(second > 0){
		setTimeout(function(){
			second--;
		$('.game-info').find('div span').eq(0).text(second);
		timer(second);
		},1000);
	}else{
		$('.game-info').html('<div><span class="bg-f5f0ED i-b pt-10 pb-10 pl-30 pr-30 f-w-b f-s-20">Statistics</span></div><div class="pt-10"><div class="pt-5 i-b">Attempts: <span class="f-w-b">0</span></div> | <div class="i-b">Matched: <span class="f-w-b">0</span></div></div>');
	}		
}

function show_all() {
	var i;
	for(i = 1; i <= 12; i++){
	$('#' + i).find('.card').append('<img class="w-100p h-100p object-fit-c pn-ab tp-0 lf-0 img" src="img/'+ images[i-1] +'.jpg">');
		$('#' + i).find('.card').css({transform: 'rotateY(180deg)'});
	}
}

function hide_all(){
	var i;
	for(i = 1; i <= 12; i++){
		$('#' + i).find('.card').css({transform: 'rotateY(0deg)'});
		$('#' + i + ' .card').find('img').remove();
	}
	showed = true;
}


function check_array(array, num) {
	var bool = false;
	var count = 0;
	for(var i=0; i  < array.length;i++) {
  		  if (array[i] == num){
  		  		count++;
  		  		if(count == 2){
  		  			bool = true;
  		  			break;
  		  		}
  		  }
	}
	return bool;
}

function check_matched(array, num) {
	var bool = false;
	for(var i=0; i  < array.length;i++) {
  		  if (array[i] == num){
  		  			bool = true;
  		  			//break;
  		  		
  		  }
	}
	return bool;
}