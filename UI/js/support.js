fetch('http://localhost:8000/api/v1/contact').then((resp) => resp.json())
.then((result) => {
const supportEntry = result.data.length;
for (let i=0; i <= supportEntry; i++){
    const mainTable = document.querySelector('.mainTable');
    const dataTable = document.querySelector('#dataTable');
    const ticket = document.querySelector('.supportBody');
    const tableRow = document.querySelector('.tableRow');
    const firstName = document.querySelector('.firstName');
    const lastName = document.querySelector('.lastName');
    const customerEmail = document.querySelector('.customerEmail');
    const phoneNumber = document.querySelector('.phoneNumber');
    const customerMsg = document.querySelector('.customerMsg');

    firstName.textContent = result.data[i].firstname;
    lastName.textContent = result.data[i].lastname;
    customerEmail.textContent = result.data[i].email;
   phoneNumber.textContent = result.data[i].phonenumber;
   customerMsg.textContent = result.data[i].message;

   mainTable.appendChild(dataTable);
   dataTable.appendChild(supportBody);
   supportBody.appendChild(tableRow)
} 
    
});