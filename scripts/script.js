// ISSUES:
// fixing scope of universal variables
// MATH!!!
// jQuery UI Sliders - can they bind to text inputs?

//GLOBAL VARIABLES:
var income;
var rent;
var expenses;
var interest;
var loans;
var interest_val;

$(document).ready(function(){
	
	$('.next').click(function(){
		$(this).parent('.panel').fadeOut('fast');
	});
	

	var rate = .003;
	var monthly_rate = 12;
	
	$('#sub-choices').hide();
	$('#sub').click(function(){
		$('#sub-choices').toggle();
		$('#unsub-choices').hide();
	});
	$('#unsub-choices').hide();
	$('#unsub').click(function(){
		$('#sub-month').find('option:selected').val(0);
		$('#sub-year').find('option:selected').val(0);
		$('#unsub-choices').toggle();
		$('#sub-choices').hide();
	});
	
	// additional interest rates: http://www.asa.org/basics/loans/interest-rates/student-loan-interest-rates.aspx
	
	// INTEREST:
	$('#get_interest').click(function(){
		var subMonth = $('#sub-month').find('option:selected').val();
		var subYear = $('#sub-year').find('option:selected').val();
		interest = $('input:checked').val();
		if (subMonth <= 7){
			subYear = subYear - 1;
			switch (subYear) {
    			case 2006:
    				interest = 6.8
    				break;
				case 2007:
					interest = 6.8
					break;
				case 2008:
					interest = 6
					break;
				case 2009:
					interest = 5.6
					break;
				case 2010:
					interest = 4.5
					break;
				case 2011:
					interest = 3.4
					break;
				case 2012:
					interest = 3.4
					break;
				case 2013:
					interest = 3.9
					break;
				default:
					if (interest > 0) {
						interest = interest;
					}
					else {
						alert("Either you have not chosen an interest rate or interest rates for that period aren't available online.")
					};
					break;
				};
			} else {
				switch (subYear) {
				case 2006:
					interest = 6.8
					break;
				case 2007:
					interest = 6.8
					break;
				case 2008:
					interest = 6
					break;
				case 2009:
					interest = 5.6
					break;
				case 2010:
					interest = 4.5
					break;
				case 2011:
					interest = 3.4
					break;
				case 2012:
					interest = 3.4
					break;
				case 2013:
					interest = 3.9
					break;
				default:
					alert("Either you have not chosen an interest rate or interest rates for that period aren't available online.")
					break;
				};
			}
	});
		
	//LOANS function - defines loans
	$('#loans').change(function (){
		loans = $('#loans').val();
	});
	
	// INCOME function - takes #income's value and animates #income_bar to match
	$('#income').change(function (){
		$('#income_bar').find('.label').remove();
		income = $('#income').val();
		var income_height = income * rate;
		$('#income_bar').animate({
			'height' : income_height},
			1000);
		$('#income_bar').append('<p class="label">$' + income + '</p>');

	});
	
	// RENT function - animates #rent_bar and #income_bar
	$('#rent').change(function (){
		$('#income_bar').find('.label').remove();
		$('#rent_bar').find('.label').remove();
		rent = ($('#rent').val() * monthly_rate);
		var rent_height = rent * rate;
		$('#rent_bar').animate({
			'height' : rent_height},
			1000);
		var income_height = (income - rent) * rate;
		income = income - rent;
		$('#income_bar').animate({
			'height' : income_height},
			1000);
		$('#income_bar').append('<p class="label">$' + income + '</p>');
		$('#rent_bar').append('<p class="label">$' + rent + '</p>');
	});
	
	// EXPENSES function - animates #expenses_bar and #income_bar
	$('#expenses').change(function (){
		$('#income_bar').find('.label').remove();
		$('#expenses_bar').find('.label').remove();
		expenses = ($('#expenses').val() * monthly_rate);
		var expenses_height = expenses * rate;
		$('#expenses_bar').animate({
			'height' : expenses_height},
			1000);
		var income_height = (income - expenses) * rate;
		income = income - expenses;
		$('#income_bar').animate({
			'height' : income_height},
			1000);
		$('#income_bar').append('<p class="label">$' + income + '</p>');
		$('#expenses_bar').append('<p class="label">$' + expenses + '</p>');
	});
	
	// LOANS function - animates #loans_bar and #income_bar
	$('#loans').change(function (){
		$('#income_bar').find('.label').remove();
		$('#loans_bar').find('.label').remove();
		loans = ($('#loans').val() * monthly_rate); // MATH FIX IT
		var loans_height = loans * rate;
		$('#loans_bar').animate({
			'height' : loans_height},
			1000);
		var income_height = (income - loans) * rate;
		income = income - loans;
		$('#income_bar').animate({
			'height' : income_height},
			1000);
		$('#income_bar').append('<p class="label">$' + income + '</p>');
		$('#loans_bar').append('<p class="label">$' + loans + '</p>');
		interest_val = (loans * interest) / 365.25;

	});

	// BUTTON FOR DEBUGGING
	$('#print').click(function(){
		$('#wrapper').append(income + ' ');
		});
		
	var percent_spent = loans / income * 100;
	$('#percent_spent').append(percent_spent);


});