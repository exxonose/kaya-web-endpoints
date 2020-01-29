//GET TEMPLATE ITEMS

fetch('http://localhost:8000/api/v1/template').then((resp) => resp.json())
.then((result) =>{
  const dataRecords = result.data.length;
  for( let i=0; i < dataRecords; i++){
 const companyTel = document.querySelector(".companyTel");
  companyTel.textContent = result.data[i].phonenumber;

  const companyEmailAdd = document.querySelector(".companyEmailAdd .info");
  companyEmailAdd.textContent = result.data[i].email;

  const companyTele = document.querySelector(".companyTele");
  companyTele.textContent = result.data[i].phonenumber;

  const companyEmailAddy = document.querySelector(".companyEmailAddy");
  companyEmailAddy.textContent = result.data[i].email;

  const companyAdd = document.querySelector(".companyAdd");
  companyAdd.textContent = result.data[i].address;
  
  // const aboutTitle = document.querySelector(".aboutTitle");
  // aboutTitle.textContent = result.data[i].about_us_subheader;

//   const serviceTitle = document.querySelector(".serviceTitle");
//   serviceTitle.textContent = result.data[i].service_subheader;

  const copyRight = document.querySelector(".copyRight");
  copyRight.textContent = result.data[i].copyright;

   }
})

.catch((error) =>{
   console.error(error, 'Internal Service Error');
});
 

 