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
          $('#position').append('<option value=""> No hay departamentos</option>');
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
        $('#position').html("");
        $('#position').append('<option value=' + response.data[i].id + '>' + response.data[i].name + '</option>');
      }
    },
    error: function (response) {
      if (response.status == 404) {
        $('#position').html("");
        $('#position').prop("disabled", true);
        $('#position').append('<option value=""> No hay departamentos</option>');
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
        '<td><button type="button" class="btn btn-primary viewEmployee" data-bs-toggle="modal" data-bs-target="#viewModal"><i class="fas fa-eye"></i> Ver</button>' +
        '<button type="button" class="btn btn-warning modifyEmployee" data-bs-toggle="modal" data-bs-target="#modifyModal"><i class="fas fa-pen"></i> Modificar</button>' +
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

/* AGREGAR EMPLEADOS 
Tu madre Ernesto, deja de revisar mi codigo put* .l.
*/


$("#addEmployee").click(function () {

  counter = 0;

  $("#employeeAddData input, #employeeAddData :selected").each(function () {
    if ($(this).val() === "" || $(this).val() == null) {
      console.log("Este campo esta vacio " + $(this));
    } else {
      console.log("Este campo esta lleno " + $(this).val());
      counter++;
    }
  });

  if (counter >= $("#employeeAddData input, #employeeAddData :selected").length) {
    console.log("Realizar consulta");
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
        bootstrap.Modal.getInstance(modal).hide();
      },
      error: function (response) {
        console.log(response);
        // if(response.status == 401) {
        //   window.location.replace("/login.html"); ///REEMPLAZAR PVTOS
        // }

        if(response.status == 400) {
          alert("Error!, revise sus datos!");
        }
      }
    });
  } else {
    console.log("Faltan campos!");
    alert("Faltan campos");
  }
  
});


/* MODIFICAR EMPLEADOS */
function modifyEmployee(employeeRow) {

  idEmployee = parseInt(employeeRow.parent().parent().children().eq(0).html());

  $.ajax({
    url: "http://workapp.somee.com/api/Employee/" + idEmployee,
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
      $("#modifyLastName").val(response.data.lastName);
      $("#modifyBirthDate").val(formatDate(response.data.birthdate));
      $("#modifyPhoneNumber").val(response.data.phoneNumber);
      $("#modifyDpi").val(response.data.dpi);
      $("#modifySex").val(response.data.sex);
      $("#modifyPosition").val(response.data.position.name);
      $("#modifyDepartment").val(response.data.position.department.name);
      $("#modifySalary").val(response.data.salary.salary);
      $("#modifyPersonalExpenses").val(response.data.salary.personalExpenses);
      $("#modifyBonification").val(response.data.salary.personalExpenses);
    },
    error: function (response) {
      if (response.status == 404) {
        alert("Error!");
      }
    }
  });


}


/* VER EMPLEADO */
function viewEmployee(employeeRow) {
  console.log(employeeRow);
  console.log();

  idEmployee = parseInt(employeeRow.parent().parent().children().eq(0).html());

  $.ajax({
    url: "http://workapp.somee.com/api/Employee/" + idEmployee,
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
      $("#viewLastName").val(response.data.lastName);
      $("#viewBirthDate").val(formatDate(response.data.birthdate));
      $("#viewPhoneNumber").val(response.data.phoneNumber);
      $("#viewDpi").val(response.data.dpi);
      $("#viewSex").val(response.data.sex);
      $("#viewPosition").val(response.data.position.name);
      $("#viewDepartment").val(response.data.position.department.name);
      $("#viewSalary").val(response.data.salary.salary);
      $("#viewPersonalExpenses").val(response.data.salary.personalExpenses);
      $("#viewBonification").val(response.data.salary.bonification);

    },
    error: function (response) {
      if (response.status == 404) {
        alert("Error!");
      }
    }
  });

}

/* ELIMINAR EMPLEADO */

function deleteEmployee(employeeRow) {

  idEmployee = parseInt(employeeRow.parent().parent().children().eq(0).html());

  $.ajax({
    url: "http://workapp.somee.com/api/employee/" + idEmployee,
    method: "DELETE",
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
      console.log(employeeRow.closest('tr'));
      employeeRow.closest('tr').remove();
    },
    error: function (response) {
      console.log("Reenviar al login");
      // if(response.status == 401) {
      //   window.location.replace("/login.html");
      // }
    }
  });

}

/* OBTENER DEPARTAMENTOS Y PUESTOS (MODIFICAR) */

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
      $('#modifyDepartment').append('<option value=' + response.data[i].id + '>' + response.data[i].name + '</option>');
    }
    $.ajax({
      url: "http://workapp.somee.com/api/Position/" + $("#modifyDepartment").val(),
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
          $('#modifyPosition').prop("disabled", false);
        }
        for (var i = 0; i < response.data.length; i++) {
          $('#modifyPosition').append('<option value=' + response.data[i].id + '>' + response.data[i].name + '</option>');
        }
      },
      error: function (response) {
        if (response.status == 404) {
          $('#modifyPosition').html("");
          $('#modifyPosition').prop("disabled", true);
        }
      }
    });
  },
  error: function (response) {
    console.log("Reenviar al login");
  }
});

/* OBTENER PUESTOS BASADOS EN EL DEPARTAMENTO */

$('#modifyDepartment').change(function () {
  $.ajax({
    url: "http://workapp.somee.com/api/Position/" + $("#modifyDepartment").val(),
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
        $('#modifyPosition').prop("disabled", false);
      }
      for (var i = 0; i < response.data.length; i++) {
        $('#modifyPosition').append('<option value=' + response.data[i].id + '>' + response.data[i].name + '</option>');
      }
    },
    error: function (response) {
      if (response.status == 404) {
        $('#modifyPosition').html("");
        $('#modifyPosition').prop("disabled", true);
      }
    }
  });
})


function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}