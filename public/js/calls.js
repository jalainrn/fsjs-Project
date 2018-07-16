$(document).ready(function() {
    console.log('Hi, I am ready');

    $('#roleCatalogCall').on('click', () => {
        setWWRolesForm();
        setWWRoles();
    });
});


function setWWRolesForm() {
    var compile = ''
    compile += `
    .card.mb-3
        .card-header
            i.fa.fa-table
            |  Title
        .card-body
            .table-responsive
                table#dataTable.table.table-bordered(width='100%', cellspacing='0')
                    thead
                        tr
                            td
                            td
                            th Name
                            th Created at
                            th Updated at
                    tfoot
                    -     tr
                    -         td
                    -         td
                    -         th Name
                    -         th Created at
                    -         th Updated at
                    - tbody
                    -     each role in roles
                    -         tr
                    -             td
                    -             td
                    -             td #{role.name}
                    -             td #{role.created_at}
                    -             td #{role.updated_at}
        .card-footer.small.text-muted
        | Updated yesterday at 11:59 PM`

        var x = pug.render('p Hello world!');
    $("#contentHolderPlace").append(pug.render(compile))
};



function setWWRoles() {
    console.log('click');
    getRoles()
    .then(roles => {
      window.shirtList = shirts
      $('#list-container').html(listItemTemplate(shirts))
    })
};

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