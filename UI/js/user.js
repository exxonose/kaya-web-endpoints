const url = 'http://localhost:8000/api/v1/users';

fetch(url).then((resp) => resp.json())
.then((result) => {
  const userTable = result.data.length;

  for(let i = 0; i <= userTable; i++){
   
    const mainTable = document.querySelector('.mainTable');
    const dataTable = document.querySelector('#dataTable');
    const newUser = document.querySelector('#newUser');
    const tableRow = document.querySelector('.tableRow');
    const userName = document.querySelector('.userName');
    const emailAdd = document.querySelector('.emailAdd');
    const userAdd = document.querySelector('.userAdd');
    const phoneNumber = document.querySelector('.phoneNumber');
    const createdAt = document.querySelector('.createdAt');

    userName.textContent = result.data[i].fullname;
    emailAdd.textContent = result.data[i].email;
    userAdd.textContent = result.data[i].address;
    phoneNumber.textContent = result.data[i].phonenumber;
    createdAt.textContent = result.data[i].createdAt; 


    mainTable.appendChild(dataTable);
    dataTable.appendChild(newUser);
    newUser.appendChild(tableRow);
  }
})

.catch((error) =>{
  console.log('Internal Service Error');
});
 

//Create Users 