import { axios } from 'axios';

// Make a request for a user with a given ID
axios.get('http://localhost:8000/api/v1/counter')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle erro
    console.log(error);
  })
  .finally(function () {
    // always executed
  });

  export default axios;