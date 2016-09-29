$("button").click(function(){
	var roi = 8;
	var inflation = 3;
	
	var daysPerYear = 365.25;
	var monthsPerYear = 12;
	var daysPerWeek = 7;
	var weeksPerMonth = daysPerYear / monthsPerYear / daysPerWeek;
	console.log("Weeks per month = " + weeksPerMonth);
	
	// get the years. 
	var years = $("#yearOfRetirement").val() - 2016.75;
	
	if (years < 0) {
		years = 0;
	}
	
	console.log ("years = "+years); 
	
	// calculate effective rate. 
	var rate = roi-inflation; 
	console.log ("effective growth rate = "+rate); 
	
	// future value of one dollar. 
	var futureOneDollar = 1 * Math.pow(1 + (rate / 100), years); 
	console.log("Future One Dollar = " + futureOneDollar)
	
	// future value of saving one dollar every month. 
	var cashFlow = 1; 
	var interestRate = (rate / 100) / monthsPerYear; 
	var numPayments = years * monthsPerYear; 
	// see http://www.investopedia.com/articles/03/101503.asp
	var futureSavingADollar = cashFlow * ((Math.pow(1 + interestRate, numPayments) - 1) / interestRate);
	
	// future values. 
	var currentsavings = $("#currentSavings").val(); 
	var fvCurrentSavings = currentsavings * futureOneDollar; 
	
	//$("[id=futureValueSaved").text("$"+fvCurrentSavings.toFixed(2)); 
	
	var monthlyDeposit = $("#weeklySavings").val() * weeksPerMonth;
	var fvMonthlyDeposit = monthlyDeposit * futureSavingADollar; 
	var totalSaved = fvMonthlyDeposit + fvCurrentSavings;
	
	console.log("Current Savings = " + fvCurrentSavings);
	console.log("Projected Savings = " + totalSaved);
	
	$('#results').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Your Retirement Forecast'
            },
            xAxis: {
                title: {
					text: 'Savings'
				}
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Amount (USD)'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>${point.y:.1f}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'Without Investment',
                data: [fvCurrentSavings]

            }, {
                name: 'With Investment',
                data: [totalSaved]

            }]
        });
});