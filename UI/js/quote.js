//POST QUOTE 

document.getElementById('postQuote').addEventListener('submit', postQuote)

function postQuote(event){
    event.preventDefault();
   
    let companyName = document.getElementById('companyName').value;
    let loadingSite = document.getElementById('loadingSite').value;
    let companyEmail = document.getElementById('companyEmail').value;
    let companyPhone = document.getElementById('companyPhone').value;
    let product = document.getElementById('product').value;
    let tonnage = document.getElementById('tonnage').value;
    let truckType = document.getElementById('truckType').value;
    

    

    console.log('Posting request to Kaya API...');
    fetch('http://localhost:8000/api/v1/quote/', 
    {
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    },
      method: 'POST',
      body: JSON.stringify({companyName, loadingSite, companyEmail, companyPhone, product, tonnage, truckType})

    }).then(function(response) {
      return response.json();
    }).then(function(data) {
      console.log('Quote sent', data);
    })
    .catch(function(error) {
        console.log('Request failure', error);
      }); 

 }
