//GET CONTACT

const url = 'http://localhost:8000/api/v1/counter';

fetch(url).then((resp) => resp.json())
.then((result) => {

  // let dataItems = "",

  /*
    <div class="counterFamily col-lg-3 col-md-3 col-sm-3 col-xs-12 ">
      <div class="counterParent">
        <p class="counterCount"></p>
        <p class="counterTitle"></p>
      </div>
    </div>

  */
   
    const arrayRecord =  result.data.length;
        const counter = document.querySelector(".counter");
        const counterContainer = document.querySelector(".counterContainer");
        const counterRow = document.querySelector(".counterRow");

    for(let i=0; i < arrayRecord; i++){
      
      let counterFamily = document.createElement('div');
      counterFamily.className = 'counterFamily col-lg-3 col-md-3 col-sm-3 col-xs-12';
      let counterParent = document.createElement('div');
      counterParent.className = 'counterParent';
      let counterCount = document.createElement('p')
      counterCount.className = 'counterCount';
      counterCount.textContent = result.data[i].amount
      let counterTitle = document.createElement('p')
      counterTitle.className = 'counterTitle';
      counterTitle.textContent = result.data[i].name

      counterParent.appendChild(counterCount);
      counterParent.appendChild(counterTitle);
      counterFamily.appendChild(counterParent);

     counterRow.appendChild(counterFamily);
     counterContainer.appendChild(counterRow);          
    }
    counter.append(counterContainer)


//Counter Animation

    $('.counterCount').each(function () {
      $(this).prop('Counter',0).animate({
          Counter: $(this).text()
      }, {
          duration: 7000,
          easing: 'swing',
          step: function (now) {
              $(this).text(Math.ceil(now));
          }
      });
    });
    


})  
.catch((error) => {
  console.log(error, 'request failed');
});






/*
// const counterFamily = document.getElementById(".counterFamily");
        // const counterParent =  document.querySelector(".counterParent");
        // const counterCount = document.querySelector(".counterCount");
        // const counterTitle = document.querySelector(".counterTitle");
        
      //  dataItems += arrayRecord[i] + ''; 
        // counterCount.textContent = result.data[i].amount;
        // counterTitle.textContent = result.data[i].name;

        
        // counterParent.appendChild(counterCount);
        // counterParent.appendChild(counterTitle);
        // counterFamily.appendChild(counterParent);
        // counterRow.appendChild(counterFamily); 
        // counterContainer.appendChild(counterRow);
        // counter.append(counterContainer);
*/