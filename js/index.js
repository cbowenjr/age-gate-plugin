const legalAge = 21;

$(document).ready(function() {
	populateSelectTags();
	checkStorage();
});

function checkStorage() {
	let birthDate = window.sessionStorage.getItem('birthDate');
	if(birthDate) {
		let date = new Date();
		let legalDate = new Date(date.getYear() - legalAge, date.getMonth(), date.getDate());
		changeScreen(new Date(parseInt(birthDate)), legalDate);
	}
}

function populateSelectTags () {
	let months = "January,February,March,April,May,June,July,August,September,October,November,December";
	let monthsArr = months.split(',');

	monthsArr.forEach((month)=>{
		$('#months').append(`<option>${month}</option>`);
	})
	for(let i = 2018; i >= 1970; i--) {
		$('#year').append(`<option>${i}</option>`);
	}

	for(let i = 1; i < 32; i++) {
		$('#day').append(`<option>${i}</option>`);
	}
}

function calculateAge (sessionBirthDate) {

	let date = new Date();
	let legalDate = new Date(date.getYear() - legalAge, date.getMonth(), date.getDate());

	let months = "January,February,March,April,May,June,July,August,September,October,November,December";
	let monthsArr = months.split(',');
	let month = $('#months option:selected').text();
	let monthIndex = monthsArr.indexOf(month);
	let day = $('#day option:selected').val();
	let year = $('#year option:selected').val();
	let userInfoStored = $('#remember-user')[0].checked;

	let birthDate = new Date(year, monthIndex, day);

	//window.sessionStorage.removeItem("birthDate")
	//console.log(sessionStorage)

	if(month == "" || day == "" || year == "") {
		$('#valid-text').removeClass('hide');
	} else {
		if (userInfoStored == true) {
			//window.sessionStorage.removeItem("birthDate", birthDate);
			window.sessionStorage.setItem("birthDate", birthDate.getTime());
		}
		$('#valid-text').addClass('hide');
		changeScreen(birthDate, legalDate);
	}
}

function changeScreen (birthDate, legalDate) {
	if(birthDate <= legalDate) {
			$('#age-check-screen').addClass('hide');
			$('#legal-screen').removeClass('hide');
			$('#welcome').text('Enjoy The Video!')
		} else {
			$('#welcome').text('Sorry :(')
			$('#age-check-screen').addClass('hide');
			$('#underaged-screen').removeClass('hide');
		}
}

function showUnderagedScreen () {
	$('#welcome').text('Sorry :(')
	$('#age-check-screen').addClass('hide');
	$('#underaged-screen').removeClass('hide');
}
