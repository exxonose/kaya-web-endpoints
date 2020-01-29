$.ajax({
    type: 'GET',
    url: 'http://localhost:8000/api/v1/users',
    success: function(result){
        $response = result.data;
        $.each($response, function(index, user) {
            appendToUsrTable(user);
        } ) 
    }
})

 //POST with JQuery

   // Attach a submit handler to the form
 $("#submit #editUser #deleteUser ").click(function (e) {

     // Stop form from submitting normally
    e.preventDefault();

     //Get some values from elements on the page:
    let $fullName = $("#fullname").val();
    let $email = $("#email").val();
    let $address = $("#address").val();
    let $phonenumber = $("#phone").val();
    let $password = $("#pass").val();

    let url = "http://localhost:8000/api/v1/users";

    let posting = $.post(url, {fullName: $fullName, email: $email, address: $address, phoneNumber: $phonenumber, password: $password}, function(result){
       $resp =  result.data
       
        $.each($resp, function(index, user){
            appendToUsrTable(user);
        })
    })
 });


 
 $.ajax({
    url: 'http://localhost:8000/api/v1/users/:id',
    type: 'POST',
    success: function(result){
        $response = result.data;
        $.each($response, function(index, user) {
            deleteUser(id)
        } ) 
    }
})


 function deleteUser(id) {
    let action = confirm("Are you sure you want to delete this user?");
    let msg = "User deleted successfully!";
    $.each($response, function(index, user) {
      if (user.id == id && action != false) {
        $response.splice(index, 1);
        $("#userTable #user-" + user.id).remove();
        flashMessage(msg);
      }
    });
  }


 $.ajax({
    type: 'PUT',
    url: 'http://localhost:8000/api/v1/users/:id',
    success: function(result){
        $response = result.data;
        $.each($response, function(index, user) {
            editUser(id) 
        } ) 
    }
})


 function editUser(id) {
    $.each($response, function(index, user) {
      if (user.id == id) {
        $(".modal-body").empty().append(`
                  <form id="updateUser" action="">
                      <label for="name">Name</label>
                      <input class="form-control" type="text" name="fullName" value="${user.fullname}"/>
                      <label for="name">Email</label>
                      <input class="form-control" type="email" name="email" value="${user.email}"/>
                      <label for="address">Address</label>
                      <input class="form-control" type="text" name="address" value="${user.address}"/>
                      <label for="phone">Phone</label>
                      <input class="form-control" type="number" name="phone" value="${user.phonenumber}" />
              `);
        $(".modal-footer").empty().append(`
                      <button type="button" type="submit" class="btn btn-primary" onClick="updateUser(${user.id})">Save changes</button>
                      <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                  </form>
              `);
      }
    });
  }


  function updateUser(id) {
    let msg = "User updated successfully!";
    let user = {};
    user.id = id;
    $.each($resp, function(user, i) {
      if (user.id == id) {
        $("#updateUser").children("input").each(function() {
          let value = $(this).val();
          let attr = $(this).attr("fullName");
          if (attr == "fullName") {
            user.fullname = value;
          } else if (attr == "email") {
             user.email == value;
          }
           else if (attr == "address") {
            user.address = value;
          }
           else if (attr == "phoneNumber") {
            user.phonenumber = value;
          }
          else if (attr == "password") {
            user.password = value;
          }

        });
        data.splice(i, 1);
        data.splice(user.id - 1, 0, user);
        $("#userTable #user-" + user.id).children(".userData").each(function() {
          let attr = $(this).attr("fullName");
          if (attr == "fullName") {
            $(this).text(user.fullname);
          } else if (attr == "email") {
              $(this).email(user.email);
          }
          else if (attr == "address") {
            $(this).text(user.address);
          } else {
            $(this).text(user.phonenumber);
          }
        });
        $(".modal").modal("toggle");
        flashMessage(msg);
      }
    });
  }
  

  function flashMessage(msg) {
    $(".flashMsg").remove();
    $(".row").prepend(`
          <div class="col-sm-12"><div class="flashMsg alert alert-success alert-dismissible fade in" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button> <strong>${msg}</strong></div></div>
      `);
  }


function appendToUsrTable(user) {
    $("#userTable tbody").append(`
          <tr id="user-${user.id}">
              <td class="userData" name="fullName">${user.fullname}</td>
              <td class="userData" name="email">${user.email}</td>
              '<td class="userData" name="address">${user.address}</td>
              '<td id="tdAge" class="userData" name="phoneNumber">${user.phonenumber}</td>
              '<td align="center">
                  <button class="btn btn-success form-control" onClick="editUser(${user.id})" data-toggle="modal" data-target="#myModal")">EDIT</button>
              </td>
              <td align="center">
                  <button class="btn btn-danger form-control" onClick="deleteUser(${user.id})">DELETE</button>
              </td>
          </tr>
      `);
  }