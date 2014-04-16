// ISSUES:
// fixing scope of universal variables
// THEN --> using universal variables to change #bar_container height more easily
// finding interest values
// MATH!!!

$(document).ready(function(){
	
	$('#sub-choices').hide();
	$('#sub').click(function(){
		$('#sub-choices').toggle();
		$('#unsub-choices').hide();
	});
	$('#unsub-choices').hide();
	$('#unsub').click(function(){
		$('#unsub-choices').toggle();
		$('#sub-choices').hide();
	});
	
	// NOT WORKING?
	var subMonth = $('#sub-month').find('option:selected').val();
	var subYear = $('#sub-year').find('option:selected').val();
	
	//$('#interest').click(function(){	
	//	var interest = $('input[name=i]:checked').val();
	//	$('#wrapper').append(interest);
	//});

	// INCOME function - takes #income's value and animates #income_bar to match
	$('#income').change(function (){
		var $income = ($('#income').val() * .003);
		$('#income_bar').animate({
			'height' : $income},
			1000);
	});
	
	// RENT function - animates #rent_bar and #income_bar
	$('#rent').change(function (){
		var $rent_val = ($('#rent').val() * .036);
		$('#rent_bar').animate({
			'height' : $rent_val},
			1000);
		var income = ($('#income').val() * .003); // not good
		var $income_val = income - $rent_val;
		$('#income_bar').animate({
			'height' : $income_val},
			1000);
	});
	
	// EXPENSES function - animates #expenses_bar and #income_bar
	$('#expenses').change(function (){
		var $expenses_val = ($('#expenses').val() * .036);
		$('#expenses_bar').animate({
			'height' : $expenses_val},
			1000);
		var income = ($('#income').val() * .003); // not good
		var $income_val = income - $expenses_val;
		$('#income_bar').animate({
			'height' : $income_val},
			1000);
	});
});