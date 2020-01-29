const pickupState = [
    {
        id: 1,
        stateName: 'Oyo',
       },
       {
           id: 2,
           stateName: 'Ogun',
          },
          {
           id: 3,
           stateName: 'Cross River',
          },
          {
           id: 4,
           stateName: 'Lagos',
          }         
];

  const pickupCity = [
        {
            id: 1,
            state_id: 3,
            city: 'Calabar',
           },
    
           {
            id: 2,
            state_id: 4,
            city: 'Apapa',
           },
    
           {
            id: 3,
            state_id: 4,
            city: 'Iganmu',
           },
           {
            id: 4,
            state_id: 1,
            city: 'Ibadan',
           },
           {
            id: 5,
            state_id: 1,
            city: 'Oyo',
           },
       
           {
            id: 6,
            state_id: 2,
            city: 'Agbara',
           },
           
           {
            id: 7,
            state_id: 1,
            city: 'Saki',
           },
           
   ];

   const container_loading_site = [
    {
        id: 1,
        state_id: 4,
        city: 'Apapa Port',
       },

       {
        id: 2,
        state_id: 4,
        city: 'Tincan Port',
       },
   ]


const destinationState = [
    {
        id:1,
        destName: 'FCT'
    },
    {
        id:2,
        destName: 'Kano'
    },
    {
        id:3,
        destName: 'Plateau'
    },
    {
        id:4,
        destName: 'River State'
    },
    {
        id:5,
        destName: 'Enugu'
    }
];

const destinationCities = [
    {
        id:1,
        stateId: 1,
        city: 'Abuja'
    },
    {
        id: 2,
        stateId: 1,
        city: 'Suleja'
    },
    {
        id: 3,
        stateId: 2,
        city: 'Kura'
    },
    {
        id: 4,
        stateId: 3,
        city: 'Shendam'
    },
    {
        id: 5,
        stateId: 2,
        city: 'Bichi'
    },
    {
        id: 6,
        stateId: 3,
        city: 'Jos'
    },
     
    {
        id: 7,
        stateId: 4,
        city: 'Port Harcourt'
    },

    {
        id: 8,
        stateId: 5,
        city: 'Enugu'
    }
];


const transportRate = [
         
        {
            from_state:4 ,
            to_state: 1,
            truck_type: 'fullSided',
            exactCity: 1,
            tonnage: 30,
            rate: 438000
        },
        {
            from_state:4 ,
            to_state: 1,
            truck_type: 'fullSided',
            exactCity: 1,
            tonnage: 30,
            rate: 438000
        },
        {
            from_state: 4,
            to_state: 2,
            exactCity:5,
            truck_type: 'fullSided',
            tonnage: 30,
            rate: 530000
        },
        {
            from_state: 1,
            to_state: 3,
            exactCity:6,
            truck_type: 'fullSided',
            tonnage: 30,
            rate: 550000
        },
        {
            from_state: 3,
            to_state: 4,
            exactCity:7,
            truck_type: 'fullSided',
            tonnage: 30,
            rate: 550000
        },
        {
            from_state: 1,
            to_state: 3,
            exactCity:6,
            truck_type: 'fullSided',
            tonnage: 30,
            rate: 367000
        },
        {
            from_state: 4,
            to_state: 2,
            exactCity: 3,
            truck_type: 'fullSided',
            tonnage: 30,
            rate: 220500
        },
        {
            from_state: 9,
            to_state: 11,
            truck_type: 'fullSided',
            tonnage: 30,
            rate: 189000
        }
      
      
];

const estRateTitle = [
    {
        id:1,
        title:'Estimated Price'
    }
]



function getPickupStates(){
    const selectPickupState = document.getElementById('priceEstPickupState');
    for(let i = 0; i < pickupState.length; i++){
       let stateOptions = new Option(pickupState[i].stateName, pickupState[i].id);
       selectPickupState.appendChild(stateOptions);
    } 
}
getPickupStates()

function getPickupCities(){
   const pickupStateId = document.getElementById('priceEstPickupState').value;
   const pickupCityPlaceholder = document.getElementById('priceEstPickupCity');
   pickupCityPlaceholder.innerHTML = '';

   let foundPickupCities = pickupCity.filter(city => city.state_id === Number(pickupStateId));
   if(foundPickupCities){
    for(let i = 0; i < foundPickupCities.length; i++) {
        let pickupCityOptions = new Option(foundPickupCities[i].city, foundPickupCities[i].id);
        pickupCityPlaceholder.appendChild(pickupCityOptions);
     }
   } 
} 

getPickupCities();


function getDistinationStates() {
    const selectDestinationState = document.getElementById('priceEstDestinationState')

   for(let i = 0; i < destinationState.length; i++ ) {
    let destinationOptions = new Option(destinationState[i].destName, destinationState[i].id);
    selectDestinationState.appendChild(destinationOptions);  
}
  }

getDistinationStates();

function getDistinationCities() {
    const destinationStateId = document.getElementById('priceEstDestinationState').value;
    const destinationPlaceholder = document.getElementById('priceEstDestinationCity');
    destinationPlaceholder.innerHTML = '';

    let foundDestCities = destinationCities.filter(dest => dest.stateId === Number(destinationStateId));
  if(foundDestCities){
      for(let i = 0; i < foundDestCities.length; i++){
        let destinationStateOptions = new Option(foundDestCities[i].city, foundDestCities[i].id);
        destinationPlaceholder.appendChild(destinationStateOptions);
      }
  }
}

 getDistinationCities() 




// function getContainerLoadingSite() {
//     const containerCargoId = document.getElementById('cargo_type')
//     for(let i = 0; i < container_loading_site.length; i++ ){
//         let containerCargoOptions = new Option(container_loading_site[i].city, container_loading_site[i].id)
//         containerCargoId.appendChild(containerCargoOptions);
//     }
// }
// getContainerLoadingSite()


function transportRateCalc() 
{

    const fromStateId = document.getElementById('priceEstPickupState').value
    const toStateId = document.getElementById('priceEstDestinationState').value
    const exactCity = document.getElementById('priceEstDestinationCity').value
    const noOfTrucks = document.getElementById('priceEstNumberOfTrucks').value
    const truckType = document.getElementById('truckType').value
    const tonnage = document.getElementById('cargoWeight').value

    let estimatedRate = transportRate.find(newRate => newRate.from_state === Number(fromStateId) && newRate.to_state === Number(toStateId) && newRate.exactCity === Number(exactCity) && newRate.truck_type === truckType && newRate.tonnage === Number(tonnage));

    let response = document.getElementById('responseDisplay');
    const message = document.createElement('h3');
    let answer;
  
    response.innerHTML = '';

    if (typeof noOfTrucks === 'undefined' || noOfTrucks === null || !noOfTrucks){
        
       alert('Please add the number of trucks you need')

    }
    else 

    if(!estimatedRate) 
    {
        message.innerHTML =  'Sorry, we can\'t find any estimate for your criteria. Do check back some other time.';
        answer =  response.appendChild(message)
    } else {
        let actualRate = estimatedRate.rate * noOfTrucks;
        const estimatedRateValue = actualRate * 0.1;
        message.innerHTML = `&#8358;${actualRate} - &#8358;${actualRate + estimatedRateValue}`
        answer = response.appendChild(message);
    }
    return answer;

}

