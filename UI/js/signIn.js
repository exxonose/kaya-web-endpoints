//POST CONTACT
window.onload = () =>{
      let email = document.getElementById('email');
      let inputPassword = document.getElementById('inputPassword');
      let signIn = document.getElementById('signin');
  
      signIn.onclick = (event) =>{
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
  

    if(email.value === '' || !email.value) {
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

    if(inputPassword.value === '' || !inputPassword.value) {
        errorMsgResponse.textContent = 'Please enter password';
        errorMsgResponse.className = 'errorMessage';
        return false;
      }
       
  } 

showErrMsg(errorMessage);


    const baseUrl = 'http://localhost:8000';
    const userEndpoint = '/api/v1/users';
    const uri = `${baseUrl}${userEndpoint}`;
   
      document.write('Successfully Signed In.');
      fetch(uri, 
      {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
        method: 'POST',
        body: JSON.stringify({
           email: email.value,
           password: inputPassword.value,
         })
  
      }).then(response => response.json()).then((data) => {
        let errorMsgResponse = document.getElementById('errorMessage');
          
         if(data.status === 400){
          errorMsgResponse.textContent = 'Bad Request';
          errorMsgResponse.className = 'errorMessage';
          return false;
         }
    
               
            if(data.email  !== email.value && data.password !== inputPassword.value ) {
            errorMsgResponse.textContent = 'Please enter correct crendentials';
            errorMsgResponse.className = 'errorMessage';
            return false;
            }

         if(data.status === 200){
          errorMsgResponse.textContent = ' Signin successful';
          errorMsgResponse.className = 'successMessage';
          reloader('index.html');
       }
      });
     
        
 const validateEmail = (email) => {
    const atSymbol = email.indexOf('@');
    const dot = email.indexOf('.');
    // if (atSymbol < 1) { return false; }
    //if (dot <= atSymbol + 2) { return false; }
    if (dot === email.length - 1) { return false; }
    return true;
  };
  
  const reloader = (destination) => {
    window.setTimeout(() => {
      window.location = `${destination}`;
    }, 3000);
  };

  