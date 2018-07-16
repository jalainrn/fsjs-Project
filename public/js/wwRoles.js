// document.getElementById("submitRole").addEventListener("click", function(event){
//     event.preventDefault()
// });

//------------------------------------------------
//              DELETE
//------------------------------------------------
function handleDeleteRoleClick(element) {
    const rolesId = element.getAttribute('roleId');
    if (confirm("Are you sure you want to delete this item?")) {
        deleteRole(rolesId);
    }
}

function deleteRole (roleId) {
    const url = '/api/roles/' + roleId;
  
    fetch(url, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(response => {
        console.log("DOOOOOOOOOM!!!!!");
        refreshRoleList();
      })
      .catch(err => {
        console.error("I'm not dead yet!", err);
      });
  }

//------------------------------------------------
//              GET Role List
//------------------------------------------------
function refreshRoleList() {
    getRoles()
        .then(roles => {
            window.RolesList = roles
            $('#contentHolderRoles').html(listRoleTemplate(roles))
        })
}

function getRoles () {
    return $.ajax('/api/roles')
      .then(res => {
        console.log('Results from getRoles()', res)
        return res
      })
      .fail(err => {
        console.log('Error in getRoles()', err)
        throw err
      })
  }

  function listRoleTemplate (data) {
    var compiled = ''
    data.forEach(item => {
        // let month = item.created_at.getMonth() + 1;
        // let day = item.created_at.getDate();
        // let year = item.created_at.getFullYear();
        // <td>${month}/${day}/${year}</td>

        compiled += `
            <tr role="row"><td class="sorting_1">${item.name}</td>
                <td>${item.created_at}</td>
                <td>${item.updated_at}</td>
                <td>
                    <a class="btn btn-warning btn-space" type="button" href="roles/${item._id}">Edit</a>
                    <button class="btn btn-danger btn-space" type="button" onclick="handleDeleteRoleClick(this)" roleid=${item._id}>Delete</button>
                </td>
            </tr>
        `
    })
    return compiled
  }

//------------------------------------------------
//              GET Role
//------------------------------------------------
function addEditRole (roleId) {
    if (roleId){
        getRole(roleId)
            .then(role => {
                window.RoleEdit = role
                $('#contentHolderRole').html(singleRoleTemplate(role))
            })
    }
}

function singleRoleTemplate(data) {
    let item = JSON.parse(JSON.stringify(data))
    // let role = JSON.parse(item)
    // console.log('result here - ' + item)
    // console.log('thias is th name - ' + item.name)
    var compiled = ''
    compiled += `
        <div class="container">
            <h2>Edit Role</h2>
            <form class="form-horizontal">
                <input type="hidden" id="role-id" value="${item._id}">
                <div class="form-group">
                    <label class="control-label col-sm-2">Name:</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="role-name" placeholder="Name" value="${item.name}">
                    </div>
                </div>

                <div class="form-group">
                    <label class="control-label col-sm-2" ">Created at:</label>
                    <div class="col-sm-10">          
                        <input class="form-control" type="text" placeholder="Automatic filled" readonly value="${item.created_at}">
                    </div>
                </div>

                <div class="form-group">
                    <label class="control-label col-sm-2" ">Updated at:</label>
                    <div class="col-sm-10">          
                        <input class="form-control" type="text" placeholder="Automatic filled" readonly value="${item.updated_at}">
                    </div>
                </div>

                
            </form>

            <div>        
                <div class="col-sm-offset-2 col-sm-10">
                    <button class="btn btn-primary btn-space" onclick="handleAddEditRole('${item._id}')" roleId="${item._id}" id="submitRole">Submit</button>
                    <button class="btn btn-default btn-space">Cancel</button>
                </div>
            </div>
        </div>
    `
    return compiled
  }

function getRole(roleId) {
    let url = '/api/roles/' + roleId
    return $.ajax(url)
      .then(res => {
        // console.log('Results from getRole()', res)
        return res
      })
      .fail(err => {
        console.log('Error in getRole()', err)
        throw err
      })
}

function handleAddEditRole() {
    console.log("You clicked 'submit'. Congratulations.")
    const roleData = {
        name: $('#role-name').val(),
        _id: $('#role-id').val()     
    }

    if (roleData._id) {
        method = 'PUT'
        url = '/api/roles/' + roleData._id
    } else {
        method = 'POST'
        url = '/api/roles'
    }

    fetch(url, {
        method: method,
        body: JSON.stringify(roleData),
        headers: {
                    'Content-Type': 'application/json'
                }
        })
        // .then(res => res.json())
        .then(() => {
            console.log('we have updated the data')
            // alert(`Has been created.` )
            window.location = window.location.origin + '/roles'
            // cancelShirtForm()
            // refreshShirtList()
        })
      .catch(err => {
        console.error('A terrible thing has happened', err)
      })
    
}

function submitShirtForm () {
    console.log("You clicked 'submit'. Congratulations.")
  
    const shirtData = {
      name: $('#shirt-name').val(),
      description: $('#shirt-description').val(),
      price: $('#shirt-price').val(),
      _id: $('#shirt-id').val()
    }
  
    let method, url
    if (shirtData._id) {
      method = 'PUT'
      url = '/api/shirt/' + shirtData._id
    } else {
      method = 'POST'
      url = '/api/shirt'
    }
  
    fetch(url, {
      method: method,
      body: JSON.stringify(shirtData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(shirt => {
        console.log('we have updated the data', shirt)
        cancelShirtForm()
        refreshShirtList()
      })
      .catch(err => {
        console.error('A terrible thing has happened', err)
      })
  }



//   Pending Homework
function getRolesTest () {
    return $.ajax('/roles')
        .then(res => {
            console.log('Results from getRoles()', res)
        return res
        })
        .fail(err => {
            console.log('Error in getRoles()', err)
        throw err
    })
}