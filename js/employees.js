/* OBTENER LA URI Y TOKEN */

uri = "http://workapp.somee.com/api/Employee/";
token_sesion = sessionStorage.getItem("token");

/* OBTENER DEPARTAMENTOS Y PUESTOS */

$.ajax({
  url: "http://workapp.somee.com/api/Department/GetAll",
  method: "GET",
  headers: {
    "Authorization": `Bearer ${token_sesion}`
  },
  cache: false,
  beforeSend: function () {
    //$('.ajax-loader').show();
  },
  complete: function () {
    //$('.ajax-loader').hide();
  },
  success: function (response) {
    for (var i = 0; i < response.data.length; i++) {
      $('#department').append('<option value=' + response.data[i].id + '>' + response.data[i].name + '</option>');
    }
    $.ajax({
      url: "http://workapp.somee.com/api/Position/" + $("#department").val(),
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token_sesion}`
      },
      cache: false,
      beforeSend: function () {
        //$('.ajax-loader').show();
      },
      complete: function () {
        //$('.ajax-loader').hide();
      },
      success: function (response) {
        if (response.status == 200) {
          $('#position').prop("disabled", false);
        }
        for (var i = 0; i < response.data.length; i++) {
          $('#position').append('<option value=' + response.data[i].id + '>' + response.data[i].name + '</option>');
        }
      },
      error: function (response) {
        if (response.status == 404) {
          $('#position').html("");
          $('#position').prop("disabled", true);
        }
      }
    });
  },
  error: function (response) {
    console.log("Reenviar al login");
  }
});

/* OBTENER PUESTOS BASADOS EN EL DEPARTAMENTO */

$('#department').change(function () {
  $.ajax({
    url: "http://workapp.somee.com/api/Position/" + $("#department").val(),
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token_sesion}`
    },
    cache: false,
    beforeSend: function () {
      //$('.ajax-loader').show();
    },
    complete: function () {
      //$('.ajax-loader').hide();
    },
    success: function (response) {
      if (response.status == 200) {
        $('#position').prop("disabled", false);
      }
      for (var i = 0; i < response.data.length; i++) {
        $('#position').append('<option value=' + response.data[i].id + '>' + response.data[i].name + '</option>');
      }
    },
    error: function (response) {
      if (response.status == 404) {
        $('#position').html("");
        $('#position').prop("disabled", true);
      }
    }
  });
})

/* OBTENER EMPLEADOS */

$.ajax({
  url: uri,
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
    for (var i = 0; i < response.data.length; i++) {
      $('table tbody').append('<tr>' +
        '<td>' + response.data[i].id + '</td>' +
        '<td>' + response.data[i].name + '</td>' +
        '<td>' + response.data[i].lastName + '</td>' +
        '<td>' + response.data[i].position.department.name + '</td>' +
        '<td>' + response.data[i].position.name + '</td>' +
        '<td><button type="button" class="btn btn-primary viewEmployee" data-bs-toggle="viewModal" data-bs-target="#viewModal"><i class="fas fa-eye"></i> Ver</button>' +
        '<button type="button" class="btn btn-warning modifyEmployee" data-bs-toggle="modalEmployee" data-bs-target="#modalEmployee"><i class="fas fa-pen"></i> Modificar</button>' +
        '<button type="button" class="btn btn-danger deleteEmployee"></i> Eliminar</button><td>' +
        '</tr>');
        
    }
    //var modal = new bootstrap.Modal(document.getElementById('modalEmployee'));

    /* PARA DELEGAR LA FUNCION ELIMINAR EMPLEADOS */
    $(".deleteEmployee").click(function () {
      deleteEmployee($(this));
    });

    /* PARA DELEGAR LA FUNCION ELIMINAR EMPLEADOS */
    $(".modifyEmployee").click(function () {
      modifyEmployee($(this));
    });

    /* PARA DELEGAR LA FUNCION VER EMPLEADOS */
    $(".viewEmployee").click(function () {
      viewEmployee($(this));
    });



  },
  error: function (response) {
    console.log("Reenviar al login");
    // if(response.status == 401) {
    //   window.location.replace("/login.html");
    // }
  }
});


/* AGREGAR EMPLEADOS */

$("#addEmployee").click(function () {
  /* No es la solucion mas elegante, podria iterarse sobre los campos del form (por hacer)*/
  if (!$("#name").val()
    || !$("#lastName").val()
    || !$("#name").val()
    || !$("#lastName").val()
    || !$("#birthDate").val()
    || !$("#dpi").val()
    || !$("#salary").val()
    || !$("#personalExpenses").val()
    || !$("#bonification").val()
    || !$("#phoneNumber").val()
    || !$("#sex").val()
    || !$("#department").val()
    || !$("#position").val()) {
    console.log("empty!");
  } else {
    data = {
      name: $("#name").val(),
      lastName: $("#lastName").val(),
      Birthdate: $("#birthDate").val(),
      phoneNumber: $("#phoneNumber").val(),
      dpi: $("#dpi").val(),
      sex: parseInt($("#sex").val()),
      idPosition: parseInt($("#position").val()),
      salary: parseInt($("#salary").val()),
      personalExpenses: parseInt($("#personalExpenses").val()),
      bonification: parseInt($("#bonification").val())
    }

    jsonData = JSON.stringify(data, null, 2);

    console.log(jsonData);

    $.ajax({
      url: uri + 'add',
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
        // if(response.status == 401) {
        //   window.location.replace("/login.html");
        // }
      }
    });

  }
});


/* ACTUALIZAR EMPLEADOS */
function modifyEmployee(employeeRow) {
  $("#modalEmployee").load('modals/modifyEmployees.html');
}



/* VER EMPLEADO */
function viewEmployee(employeeRow) {
  console.log(employeeRow);
}

/* ELIMINAR EMPLEADO */

function deleteEmployee(employeeRow) {
  console.log(employeeRow.closest('tr'));
  employeeRow.closest('tr').remove();
}