//get the form submit button
document.getElementById('loan-form').addEventListener('submit',function(e){
    e.preventDefault();
     //hide the calculations
     document.querySelector('#results').style.display = 'none';

     //Show the loader
     document.querySelector('#loading').style.display = 'block';
 
     //after 2s disappear and load the results
     setTimeout(calculateResults,2000)
});

//Calculate function
function calculateResults(){
    //UI Vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payments');
    const totalPayment = document.getElementById('total-payments');
    const totalInterest = document.getElementById('total-interest');

    const principle = parseFloat(amount.value);
    const calulatedInterest  = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    //Compute monthly 
    const x = Math.pow(1 + calulatedInterest, calculatedPayments);
    const monthly = (principle*x*calulatedInterest) /(x-1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) -principle).toFixed(2);

         //hide the calculations
     document.querySelector('#results').style.display = 'block';

     //Show the loader
     document.querySelector('#loading').style.display = 'none';
    }else{
        //Show an error
        showError('Please Enter Fields!')
    }
}

function showError(error){
            //create div
            const errDiv = document.createElement('div');
            //create classname
            errDiv.className = 'alert alert-danger';
            //text node
            errDiv.appendChild(document.createTextNode(error));
            //create element
            const card = document.querySelector('.card');
            const heading = document.querySelector('.heading');

            //insert the div
            card.insertBefore(errDiv,heading);

            //set timeout
            setTimeout(clearError,1500);
            //Show the loader
            document.querySelector('#loading').style.display = 'none';

}

//remove the error msg
function clearError(){
    document.querySelector('.alert').remove();
}