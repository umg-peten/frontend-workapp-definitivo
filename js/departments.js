uri = "http://workapp.somee.com/api/Department/";
token_sesion = sessionStorage.getItem("token");

/* OBTENER DEPARTAMENTOS */
$.ajax({
  url: uri + 'GetAll',
  method: "GET",
  headers: {
    "Authorization": `Bearer ${token_sesion}`
  },
  cache: false,
  beforeSend: function () {
  },
  complete: function () {
  },
  success: function (response) {
    for (var i = 0; i < response.data.length; i++) {
      $('table tbody').append('<tr>' +
        '<td>' + response.data[i].id + '</td>' +
        '<td>' + response.data[i].name + '</td>' +
        '<td>' + response.data[i].description + '</td>' +
        '<td><button type="button" class="btn btn-primary viewDepartment" data-bs-toggle="modal" data-bs-target="#viewModal"><i class="fas fa-eye"></i> Ver</button>' +
        '<button type="button" class="btn btn-warning modifyDepartmentView" data-bs-toggle="modal" data-bs-target="#modifyModal"><i class="fas fa-pen"></i> Modificar</button>' +
        '<button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modal"><i class="fas fa-trash"></i> Eliminar</button><td>' +
        '</tr>');
    }
    /* PARA DELEGAR LA FUNCION ELIMINAR EMPLEADOS */
    $(".deleteDepartment").click(function () {
      deleteDepartment($(this));
    });

    /* PARA DELEGAR LA FUNCION MODIFICAR EMPLEADOS */
    $(".modifyDepartmentView").click(function () {
      modifyDepartmentView($(this));
    });

    $(".modifyDepartmentSend").click(function () {
      modifyDepartmentSend($(this));
    });

    /* PARA DELEGAR LA FUNCION VER EMPLEADOS */
    $(".viewDepartment").click(function () {
      viewDepartment($(this));
    });

  },
  error: function (response) {
    console.log("Reenviar al login");
    // if(response.status == 401) {
    //   window.location.replace("/login.html");
    // }
  }
});


/* AGREGAR Departamento */
$("#DepartmentSave").click(function () {
  if (!$("#DepartmentName").val()
    || !$("#DepartmentDescription").val())
    {
    console.log("empty!");
  } else {
    data = {
      name: $("#DepartmentName").val(),
      description: $("#DepartmentDescription").val()
    }

    jsonData = JSON.stringify(data, null, 2);

    console.log(jsonData);

    $.ajax({
      url: uri + 'AddDepartment',
      method: "POST",
      data: jsonData,
      headers: {
        "Authorization": `Bearer ${token_sesion}`,
        'Content-Type': 'application/json'
      },
      dataType: 'json',
      cache: false,
      beforeSend: function () {
        $('.ajax-loader').show();
      },
      complete: function () {
        $('.ajax-loader').hide();
      },
      success: function (response) {
        alert("FANTASTICO!");
      },
      error: function (response) {
        console.log(response);
      }
    });

  }
});


/* VER Departamento */
function viewDepartment(departmentRow) {
  console.log(departmentRow);
  console.log();

  idDepartment = parseInt(departmentRow.parent().parent().children().eq(0).html());

  $.ajax({
    url: "http://workapp.somee.com/api/Department/" + idDepartment,
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token_sesion}`
    },
    cache: false,
    beforeSend: function () {
      $('.ajax-loader').show();
    },
    complete: function () {
      $('.ajax-loader').hide();
    },
    success: function (response) {
      $("#viewName").val(response.data.name);
      $("#viewDescription").val(response.data.description);

    },
    error: function (response) {
      if (response.status == 404) {
        alert("Error!");
      }
    }
  });

}

/* MODIFICAR Departamento */
function modifyDepartmentView(departmentRow) {

  idDepartment = parseInt(departmentRow.parent().parent().children().eq(0).html());

  $.ajax({
    url: "http://workapp.somee.com/api/Department/" + idDepartment,
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token_sesion}`
    },
    cache: false,
    beforeSend: function () {
      $('.ajax-loader').show();
    },
    complete: function () {
      $('.ajax-loader').hide();
    },
    /* Purgar */
    success: function (response) {
      $("#modifyName").val(response.data.name);
      $("#modifyDescription").val(response.data.description);
    },
    error: function (response) {
      if (response.status == 404) {
        alert("Error!");
      }
    }
  });


}