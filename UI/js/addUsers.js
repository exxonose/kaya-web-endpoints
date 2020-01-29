window.onload = () =>{
    let fullName = document.getElementById('fullName');
      let email = document.getElementById('email');
      let phoneNumber = document.getElementById('phoneNumber');
      let inputPassword = document.getElementById('inputPassword');
      let confirmPassword = document.getElementById('confirmPassword');
      let register = document.getElementById('register');
  
  register.onclick = (event) =>{
    event.preventDefault();
    showErrMsg();
   }
  }; 

  let timer = null;

  function showErrMsg(message) {
  if(timer !== null) {
    //clear previous timeout:
    clearTimeout(timer);
    timer = null;
  }
  
    let errorMsgResponse = document.getElementById('errorMessage');
    errorMsgResponse.innerHTML = message;
    errorMsgResponse.style.display = 'block';
    //errorMsgResponse.removeAttribute('class')
    timer = setTimeout(function(){errorMsgResponse.style.display = 'none'; }, 2000)
  
    if(fullName.value === '') {
      errorMsgResponse.textContent = 'Name is required';
      errorMsgResponse.className = 'errorMessage';
      fullName.focus();
      return false;
    }


    if(email.value === '') {
      errorMsgResponse.textContent = 'Email address is required';
      errorMsgResponse.className = 'errorMessage';
      email.focus();
      return false;
    }
  
    if(validateEmail(email.value) === false) {
      errorMsgResponse.textContent = 'Please enter a valid email';
      errorMsgResponse.className = 'errorMessage';
      return false;
    }
      
    if(phoneNumber.value === '') {
      errorMsgResponse.textContent = 'Phone number is required';
      errorMsgResponse.className = 'errorMessage';
      phoneNumber.focus();
      return false;
    }


      
    if(!inputPassword.value || !confirmPassword.value) {
      errorMsgResponse.textContent = 'Please enter password';
      errorMsgResponse.className = 'errorMessage';
      return false;
    }
  
    if(inputPassword.value != confirmPassword.value) {
      errorMsgResponse.textContent = 'Password does not match';
      errorMsgResponse.className = 'errorMessage';
      return false;
    }


  } 


showErrMsg(errorMessage);



    const baseUrl = 'http://localhost:8000';
    const userEndpoint = '/api/v1/users';
    const uri = `${baseUrl}${userEndpoint}`;
   
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
          fullName: fullName.value, 
          email: email.value,
           phoneNumber: phoneNumber.value,
           password: inputPassword.value,
         })
  
      }).then(response => response.json()).then((data) => {
         if(data.status === 400){
          errorMsgResponse.textContent = 'Bad Request';
          errorMsgResponse.className = 'errorMessage';
          return false;
         }

         if(data.status === 200){
          errorMsgResponse.textContent = 'User successfully registered';
          errorMsgResponse.className = 'successMessage';
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

  