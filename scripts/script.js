// ISSUES:
// MATH!!!
// jQuery UI Sliders - can they bind to text inputs?

//GLOBAL VARIABLES:
var income;
var rent;
var expenses;
var interest;
var loans;
var payment;
var payments;
var monthly_interest;
var rate;
var monthly_rate = 12;

$(document).ready(function(){

	//Resets form and variable "rate" which sets income = 100% of graph
	$(':reset').click(function(){
		// using <form> tags causes problems for toggling buttons
		// this line uses native Javascript (not jQuery) to reset the 2nd form
		$('#myForm2')[0].reset()
		rate = undefined;
		interest = 0;
		$('#income_bar').height(0);
		$('#bar_container').find('div').height(0);
	});

	// Toggles for interest divs; clears values
	$('#sub-choices').hide();
	$('#sub').click(function(){
		$('#sub-choices').toggle();
		$('#unsub-choices').hide();
	});
	$('#unsub-choices').hide();
	$('#unsub').click(function(){
		$('#unsub-choices').toggle();
		$('#sub-choices').hide();
		// Prevents conflict in value of var "interest" by clearing existing
		$('#sub-month').find('option:selected').val(0);
		$('#sub-year').find('option:selected').val(0);
	});
	
	// Toggles label descriptions
	$('.description').hide();
	$('label').click(function(){
		$(this).parent('.panel').find('.description').slideToggle('fast');
	});

	// On any change in any input, run all of the functions called:
	$('input').change(function(){
		income = $('#income').val();
		interest = ($('#interest').val() / 100);
		loans = $('#loans').val();
		rent = ($('#rent').val() * monthly_rate);
		expenses = ($('#expenses').val() * monthly_rate);
		payment = $('#payments').val();
		payments = ($('#payments').val() * monthly_rate);
		monthly_interest = 30 * loans * (interest / 365.25);
		annual_interest = monthly_interest * 12;
		animateIncome();
		animateLoans();
		animateRent();
		animateExpenses();
		animatePayments();
	});
	
	// BUTTON FOR DEBUGGING
	$('#print').click(function(){
		$('#wrapper').append(annual_interest + ' ');
		});
		
	var percent_spent = loans / income * 100;
	$('#percent_spent').empty().append(percent_spent + '%');

// INCOME
	function animateIncome (){
		$('#income_bar').find('.label').remove();
		if (rate == undefined){
			rate = 300 / income;
		}else{
			rate = rate;
		};
		var income_height = (income - rent - expenses - payments) * rate;
		$('#income_bar').animate({
			'height' : income_height},
			1000);
		if (income_height == 0){return;}
		else {
			$('#income_bar').append('<p class="label">$' + (income_height / rate) + '</p>');
		};
	};

// LOANS
	function animateLoans (){
		$('#loans_bar').find('.label').remove();
		var loans_height = loans * rate;
		$('#loans_bar').animate({
			'height' : loans_height},
			1000);
		if (loans_height == 0){return;}
		else {
			$('#loans_bar').append('<p class="label">$' + (loans_height / rate) + '</p>');
		};
	};
	
// MONTHLY LOAN PAYMENTS
	function animatePayments (){
		$('#payments_bar').find('.label').remove();
		var payments_height = payments * rate;
		$('#payments_bar').animate({
			'height' : payments_height},
			1000);
		var principal_paid = Math.round((payment - monthly_interest) * 100) / 100;
		if (payments_height == 0){return;}
		else {
			$('#payments_bar').append('<p class="label">$' + (payments_height / rate) + '</p>');
		if (payment > 0){
			$('#principal-paid').empty().append('<span>$' + principal_paid + '</span> of your monthly payment is going toward paying off your principal balance.');
		}else{return;};
		};
	};
	
// RENT
	function animateRent (){
		$('#rent_bar').find('.label').remove();
		var rent_height = rent * rate;
		$('#rent_bar').animate({
			'height' : rent_height},
			1000);
		if (rent_height == 0){return;}
		else {
			$('#rent_bar').append('<p class="label">$' + (rent_height / rate) + '</p>');
		};
	};
	
// EXPENSES
	function animateExpenses (){
		$('#expenses_bar').find('.label').remove();
		var expenses_height = expenses * rate;
		$('#expenses_bar').animate({
			'height' : expenses_height},
			1000);
		if (expenses_height == 0){return;}
		else {
			$('#expenses_bar').append('<p class="label">$' + (expenses_height / rate) + '</p>');
		}
	};
	
	// additional interest rates: http://www.asa.org/basics/loans/interest-rates/student-loan-interest-rates.aspx
	// http://www.debtfreeadventure.com/how-student-loan-interest-is-calculated-and-why-it-varies-from-month-to-month/
	
// INTEREST:
	$('.get-rate').click(function(){
		var subMonth = $('#sub-month').find('option:selected').val();
		var subYear = $('#sub-year').find('option:selected').val();
		interest = $('input:checked').val();
		if (subMonth <= 7){
			subYear = subYear - 1;
			// fix these values:
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
			};
		$('#interest').val(interest);
		$('#display-rate').empty().append(interest + '%');
	});

});

