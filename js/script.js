const result = $('#result');
const channels = ['esl_sc2', 'kregme', "OgamingSC2", "cretetion", "ffglive", 'MarckozHD', "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

channels.forEach(function (channel){
	$.getJSON('https://wind-bow.gomix.me/twitch-api/channels/' + channel + '?callback=?', function(data) {
		console.log(data);
		let url = data.url;
		let channelCard = $('<li>').addClass('media m-2').appendTo(result);
		let logoHolder = $('<img>').addClass('mr-3 alt="channel logo" ').attr('src',data.logo).appendTo(channelCard);
		let channelLink = $('<a>').attr('href', url).appendTo(channelCard);
		let channelBody = $('<div>').addClass('media-body').appendTo(channelLink);
		let channelName = $('<h5>').addClass('mt-0 mb-1').text(data.display_name).appendTo(channelBody);
	

		$.getJSON('https://wind-bow.gomix.me/twitch-api/streams/' + channel + '?callback=?', function(data) {
			if (data.stream !== null) {
				if (data.stream.game) {
					channelBody.append('Playing ' + data.stream.game);					
				}
				channelBody.append(data.stream.status);
				
			} else {
				let offButton = $('<button>').addClass('btn btn-danger mt-2').appendTo(channelBody).text(' Offline ');
				let buttonIcon = $('<i>').addClass('fa fa-power-off').prependTo(offButton);
				

			}
			});
	});

});