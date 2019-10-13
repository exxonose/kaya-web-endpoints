//POST CONTACT

window.onload = () =>{
    let firstName = document.getElementById('firstName');
      let lastName = document.getElementById('lastName');
      let email = document.getElementById('email');
      let phoneNumber = document.getElementById('phoneNumber');
      let message = document.getElementById('message');
      let submit = document.getElementById('submit');
  
  submit.onclick = (event) =>{
    event.preventDefault();
    validateAddContact();
   };
  };
  
  const validateAddContact = () => {
    const errorMsgResponse = document.getElementById('errorMessage');
    errorMsgResponse.innerHTML = '';
    errorMsgResponse.removeAttribute('class')
  
    if(firstName.value === '') {
      errorMsgResponse.textContent = 'Name is required';
      errorMsgResponse.className = 'errorMessage';
      firstName.focus();
      return false;
    }

    
    if(lastName.value === '') {
      errorMsgResponse.textContent = 'Name is required';
      errorMsgResponse.className = 'errorMessage';
      firstName.focus();
      return false;
    }
     
    if(phoneNumber.value === '') {
      errorMsgResponse.textContent = 'Phone number is required';
      errorMsgResponse.className = 'errorMessage';
      firstName.focus();
      return false;
    }
  
    if(email.value === '') {
      errorMsgResponse.textContent = 'email is required';
      errorMsgResponse.className = 'errorMessage';
      firstName.focus();
      return false;
    }
  
    if(validateEmail(email.value) === false) {
      errorMsgResponse,textContent = 'Please enter a valid email';
      errorMsgResponse.className = 'errorMessage';
      return false;
    }
  }

    const baseUrl = 'http://localhost:8000';
    const contactEndpoint = '/api/v1/contact';
    const uri = `${baseUrl}${contactEndpoint}`;
   
      document.write('Successfully Sent.');
      fetch(uri, 
      {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
        method: 'POST',
        body: JSON.stringify({
          firstName: firstName.value, 
          lastName: lastName.value, 
          email: email.value,
           phoneNumber: phoneNumber.value, 
          message: message.value})
  
      }).then(response => response.json()).then((data) => {
         if(data.status === 400){
          errorMsgResponse.textContent = 'Bad Request';
          errorMsgResponse.className = 'errorMessage';
          return false;
         }

         if(data.status === 200){
          errorMsgResponse.textContent = 'Contact successfully added';
          errorMsgResponse.className = 'errorMessage';
          reloader('index.html');
       }
      });
     
       


        
 const validateEmail = (email) => {
    const atSymbol = email.indexOf('@');
    const dot = email.indexOf('.');
    if (atSymbol < 1) { return false; }
    if (dot <= atSymbol + 2) { return false; }
    if (dot === email.length - 1) { return false; }
    return true;
  };
  
  const reloader = (destination) => {
    window.setTimeout(() => {
      window.location = `${destination}`;
    }, 3000);
  };