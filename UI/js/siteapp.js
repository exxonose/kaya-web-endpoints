//GET SITEAPP or MENUS

const siteNavbar = document.querySelector(".siteNavbar");
const siteUl = document.querySelector(".siteUlNav");
const siteli = document.querySelector(".siteMenuList");

fetch('http://localhost:8000/api/v1/siteapp').then((resp) => resp.json())
.then((result) =>{
  const arrayRec = result.data.length;
for(let i=0; i < arrayRec; i++){ 

  siteli.textContent = result.data[i].name;
  siteNavbar.appendChild(siteUl);
  siteUl.appendChild(siteli);

}


})

.catch((error) =>{
 console.log('Internal Service Error', error);
});
 