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

//--------------------------------------------------------
//       GET Role List - (Currently not in used)
//--------------------------------------------------------
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
        compiled += `
            <tr role="row"><td class="sorting_1">${item.name}</td>
                <td>${reformatingDate(item.created_at)}</td>
                <td>${reformatingDate(item.updated_at)}</td>
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
    console.log('roleId ' + roleId)
    if (roleId !== undefined){
        getRole(roleId)
            .then(role => {
                window.RoleEdit = role
                $('#contentHolderRole').html(singleRoleTemplate(role))
            })
    } else {
        let role = {
            name: '',
            created_at: new Date(),
            updated_at: new Date()
        }
        $('#contentHolderRole').html(singleRoleTemplate(role))
    }
}

// template to view
function singleRoleTemplate(data) {
    let itemId = data._id !== undefined ? data._id : '';
    var compiled = ''
    compiled += `
        <div class="container">
            <h2>Edit Role</h2>
            <form class="form-horizontal">
                <input type="hidden" id="role-id" value="${itemId}">
                <div class="form-group">
                    <label class="control-label col-sm-2">Name:</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="role-name" placeholder="Name" value="${data.name}">
                    </div>
                </div>

                <div class="form-group">
                    <label class="control-label col-sm-2" ">Created at:</label>
                    <div class="col-sm-10">          
                        <input class="form-control" type="text" placeholder="Automatic filled" readonly value="${reformatingDate(data.created_at)}">
                    </div>
                </div>

                <div class="form-group">
                    <label class="control-label col-sm-2" ">Updated at:</label>
                    <div class="col-sm-10">          
                        <input class="form-control" type="text" placeholder="Automatic filled" readonly value="${reformatingDate(data.updated_at)}">
                    </div>
                </div>

                
            </form>

            <div>        
                <div class="col-sm-offset-2 col-sm-10">
                    <button class="btn btn-primary btn-space" onclick="handleAddEditRole('${data._id}')" roleId="${data._id}" id="submitRole">Submit</button>
                    <a class="btn btn-secondary btn-space" href="${window.location.origin + '/roles'}">Cancel</a>
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
      .catch(err => {
        console.log('Error in getRole()', err)
        throw err
      })
}

function handleAddEditRole() {
    console.log("You clicked 'submit'. Congratulations.")
    
    var method, url, roleData;

    if($('#role-id').val()){
        roleData = { 
            _id: $('#role-id').val(),
            name: $('#role-name').val()
        }
        method = 'PUT'
        url = '/api/roles/' + roleData._id
    } else {
        roleData = {
            name: $('#role-name').val()  
        }
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
            console.log('we have added/updated the data')
            window.location = window.location.origin + '/roles'
            cancelShirtForm()
            refreshShirtList()
        })
      .catch(err => {
        console.error('A terrible thing has happened', err)
      })
    
}

//   Reformating Date
function reformatingDate(dateString){
    var date = new Date(dateString);
    var d = date.getDate();
    var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
    var m = monthNames[date.getMonth()];
    var y = date.getFullYear();
    return m+' '+d+', '+y;
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