if (localStorage && localStorage.username == undefined) {
	var username = window.prompt('你是?');
	localStorage.username = username;
}

var user = localStorage.username;

$('#username').text(user +',');

var fb = new Firebase('https://twbus.firebaseio.com/');

fb.on('value', function(snapshot) {
	var val = snapshot.val();
	var type = val.type;

	if( type == 'go') {
		var next = val.currentNum + 1;	
		if (next > 9) {
			return;
		}
		
		$('li>.buttons').hide();
		$('li.station-now').removeClass('station-now')
				.addClass('station-passed').next()
				.addClass('station-next').find('.buttons').show();
		
		return;
	}

	if( type == 'stop' ) {
		$('li>.buttons').hide();
		$('li.station-next').removeClass('station-next')
				.addClass('station-now').find('.buttons').show();
		if(val.currentNum > 9) {
			$('#stations>li').removeClass('station-now').removeClass('station-passed');
			$('#station>li:first').addClass('station-now');
		}
		return;
	}
});

/*
if (localStorage && localStorage.station == undefined) {
	var chooseBtn = [
		"<div class='cell-right'>",
			"<a href='#' style='color: #fff;'>这里上车</a>",
		"</div>"].join('');

	console.log(chooseBtn);
	$('#stations>li').append(chooseBtn);
}*/

var bottomHtml = [
		"<div class='buttons'>",
			"<button class='start'>出发</button>",
			"<button class='stop'>到站</button>",
		"</div>"].join('');

var list = $('#stations>li');
list.append(bottomHtml);

list.find('a').on('click', function(e) {
	e.preventDefault();
	
	list.find('.buttons').hide();
	$(this).parent().find('.buttons').show();
});;

$('button.start').on('click', function(e) {
	var link = $(this).parent().hide()
		.parent().find('a');
	var strNum = link.attr('href').replace('#','');
	
	var num = parseInt(strNum);
	var current = link.text();

	var busEvent = {
		type: 'go',
		currentNum: num,
		currentName: current
	};
	
	fb.set(busEvent);
});

$('button.stop').on('click', function(e) {
	var link = $(this).parent().hide()
			.parent().find('a');
	var strNum = link.attr('href').replace('#','');
	
	var num = parseInt(strNum);
	var current = link.text();

	var busEvent = {
		type: 'stop',
		currentNum: num,
		currentName: current
	};

	fb.set(busEvent);
});



