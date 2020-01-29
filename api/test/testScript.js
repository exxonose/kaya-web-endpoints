let abaRate = [

  {
          from_state_id: "Lagos",
          to_state_id: "Abia",
          destination: "Aba",
          tonnage : 15000,
          amount_rate: 227448
  },
  {
          from_state_id: "Lagos",
          to_state_id: "Abia",
          destination: "Aba",
          tonnage : 30000,
          amount_rate: 385258
  },
  {
          from_state_id: "Lagos",
          to_state_id: "Abia",
          destination: "Aba",
          tonnage : 40000,
          amount_rate: 461916
  },
  {
          from_state_id: "Lagos",
          to_state_id: "Abia",
          destination: "Aba",
          tonnage : 45000,
          amount_rate: 539361
  },
  {
          from_state_id:"Lagos",
          to_state_id: "Abia",
          destination: "Aba",
          tonnage : 60000,
          amount_rate: 647233
  }
];



let IbadanRate = [

  {
          from_state_id: "Lagos",
          to_state_id: "Oyo",
          destination: "Ibadan",
          tonnage : 15000,
          amount_rate: 86750
  },
  {
          from_state_id: "Lagos",
          to_state_id: "Oyo",
          destination: "Ibadan",
          tonnage : 30000,
          amount_rate: 139919
  },
  {
          from_state_id: "Lagos",
          to_state_id: "Oyo",
          destination: "Ibadan",
          tonnage : 40000,
          amount_rate: 167903
  },
  {
          from_state_id: "Lagos",
          to_state_id: "Oyo",
          destination: "Ibadan",
          tonnage : 45000,
          amount_rate: 195887
  },
  {
          from_state_id: "Lagos",
          to_state_id: "Oyo",
          destination: "Ibadan",
          tonnage : 60000,
          amount_rate: 235064
  }
];



let ab = abaRate;
 let len=ab.length;
for(i=0; i<len; i++){
  for(ib in IbadanRate[i]){
    console.log(ib, IbadanRate[i].ib, IbadanRate[i][ib]);
  }
  




  
//   console.log(ibRate[i].from_state_id);
//   console.log(ibRate[i].to_state_id);
//   console.log(ibRate[i].destination);
//   console.log(ibRate[i].tonnage);
//   console.log(ibRate[i].amount_rate)

//}

// let rows = abaRate.length;
// for(i=0; i<rows; i++){
//   let items = abaRate.length;
//   console.log(i, items)
//   for(n=0; n<items; n++){
//     console.log(abaRate[i])

//   }
 }

    
    // const record = dummyData.length;

    // for(let i = 0; i < record; i++) {
    
    //   console.log(abaRate[i]);

    //   for (let z = 0; z < record; z++) {
    //     console.log(abaRate[z].tonnage);
    //   }


      
    
    //    fromState = result.abaRate[i].from_state_id;
    //    toState = result.abaRate[i].to_state_id;
    //    destination = result.abaRate[i].destination;
    //    tonnage = result.abaRate[i].tonnage;
    //    amountRate = result.abaRate[i].amount_rate;
    // }
  

const basket = ['apples', 'oranges', 'grapes'];
const detailedBasket = {
  apples: 5,
  oranges: 10,
  grapes: 1000
}

//1
for (let i = 0; i < basket.length; i++) {
  console.log(basket[i]);
}

//2
basket.forEach(item => {
  console.log(item);
})

for (item in detailedBasket) {
  console.log(item);
}

for (item of basket) {
  console.log(item);
}

// Question #1:
// create a function called biggestNumberInArray() that takes
// an array as a parameter and returns the biggest number.
// biggestNumberInArray([-1,0,3,100, 99, 2, 99]) should return 100;
// Use at least 3 different types of javascript loops to write this:
const array = [-1,0,3,100, 99, 2, 99] // should return 100
const array2 = ['a', 3, 4, 2] // should return 4
const array3 = [] // should return 0

function biggestNumberInArray(arr) {
 
}

function biggestNumberInArray2(arr) {

}

function biggestNumberInArray3(arr) {

}


// Question #2:
// Write a function checkBasket() that lets you know if the item is in the basket or not
amazonBasket = {
  glasses: 1,
  books: 2,
  floss: 100
}

function checkBasket(basket, lookingFor) {

}




const basket = ['apples', 'oranges', 'grapes'];
const detailedBasket = {
  apples: 5,
  oranges: 10,
  grapes: 1000
}

//1
for (let i = 0; i < basket.length; i++) {
  console.log(basket[i]);
}

//2
basket.forEach(item => {
  console.log(item);
})

for (item in detailedBasket) {
  console.log(item);
}

for (item of basket) {
  console.log(item);
}

// Question #1:
// create a function called biggestNumberInArray() that takes
// an array as a parameter and returns the biggest number.
// biggestNumberInArray([-1,0,3,100, 99, 2, 99]) should return 100;
// Use at least 3 different types of javascript loops to write this:
const array = [-1,0,3,100, 99, 2, 99] // should return 100
const array2 = ['a', 3, 4, 2] // should return 4
const array3 = [] // should return 0

function biggestNumberInArray(arr) {
  let highest = 0;
  for (let i = 0; i < arr.length; i++) {
    if (highest < arr[i]) {
      highest = arr[i];
    }
  }
  return highest
}

function biggestNumberInArray2(arr) {
  let highest = 0;
  arr.forEach(item => {
    if (highest < item) {
      highest = item;
    }
  })
  return highest;
}

function biggestNumberInArray3(arr) {
  let highest = 0;
  for (item of arr) {
    if (highest < item) {
      highest = item;
    }
  }
  return highest;
}


biggestNumberInArray3(array)



// Question #2:
// Write a function checkBasket() that lets you know if the item is in the basket or not
amazonBasket = {
  glasses: 1,
  books: 2,
  floss: 100
}

function checkBasket(basket, lookingFor) {
  for (item in basket) {
    if (item === lookingFor) {
      return `${lookingFor} is in your basket`
    }
  }
  return 'that does not exist in your basket'
}