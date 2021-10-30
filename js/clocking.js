/* OBTENER LA URI Y TOKEN */

uri = "http://workapp.somee.com/api/Employee/";
token_sesion = sessionStorage.getItem("token");

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
      $(".employeeList").append('<option value=' + response.data[i].id + '>' + response.data[i].name + ' ' + response.data[i].lastName +'</option>');

    }

  },
  error: function (response) {
    console.log("Reenviar al login");
    // if(response.status == 401) {
    //   window.location.replace("/login.html");
    // }
  }
});
