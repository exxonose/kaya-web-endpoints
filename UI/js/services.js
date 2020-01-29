//GET SERVICES

fetch('http://localhost:8000/api/v1/service').then((resp) => resp.json())
.then((result) =>{
  const arrayData = result.data.length;
for(let i=0; i < arrayData; i++){

  const parentService = document.querySelector(".parentService");
  const servicesContainer = document.querySelector(".servicesContainer");
  const serviceRow = document.querySelector(".serviceRow");
  const bannerGrids = document.querySelector(".bannerGrids");
  const aboutPic = document.querySelector(".aboutPic");
  const aboutMatter = document.querySelector(".aboutMatter");
  const serviceHeading =  document.querySelector(".serviceHeading");
  const serviceDescription = document.querySelector(".serviceDescription");


    serviceHeading.textContent = result.data[i].heading;
    serviceDescription.textContent = result.data[i].description;
    
    parentService.appendChild(servicesContainer);
    servicesContainer.appendChild(serviceRow);
    serviceRow.appendChild(bannerGrids);
    bannerGrids.appendChild(aboutPic);
    bannerGrids.appendChild(aboutMatter);
    aboutMatter.appendChild(serviceHeading);
    aboutMatter.appendChild(serviceDescription);


  // const parentService = document.querySelector(".parentService");
  // const serviceContainer = document.querySelector('.servicesContainer');
  // const serviceTitle = document.querySelector(".serviceTitle");
  // const bannerGrids = document.querySelector(".bannerGrids");
  // const bottomGrids = document.querySelector(".bottomGrids");
  // const serviceSection = document.querySelector(".serviceSection");
  // const bannerIcon = document.querySelector(".bannerIcon");
  // const serviceHeading = document.querySelector(".serviceHeading");
  // const serviceDescription = document.querySelector(".serviceDescription");

 
  // serviceTitle.textContent = result.data[i].title;
  // //bannerIcon.textContent = result.data[i].icon;
  // serviceHeading.textContent = result.data[i].heading;
  // serviceDescription.textContent = result.data[i].description;

  // parentService.appendChild(serviceContainer);
  // serviceContainer.appendChild(serviceTitle);
  // serviceContainer.appendChild(bannerGrids);
  // bannerGrids.appendChild(bottomGrids);
  // bottomGrids.appendChild(serviceSection);
  // //serviceSection.appendChild(bannerIcon);
  // serviceSection.appendChild(serviceHeading);
  // serviceSection.appendChild(serviceDescription);


}

})

.catch((error) =>{
  console.log(error, 'Internal Service Error')
});
 
