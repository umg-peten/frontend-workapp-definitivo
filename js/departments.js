/* OBTENER DEPARTAMENTOS */

uri = "http://workapp.somee.com/api/Department/GetAll";

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
    console.log(response.data.length);
    for (var i = 0; i < response.data.length; i++) {
      console.log(response.data[i]);
      $('table tbody').append('<tr>' +
        '<td>' + response.data[i].id + '</td>' +
        '<td>' + response.data[i].name + '</td>' +
        '<td>' + response.data[i].description + '</td>' +
        '<td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal"><i class="fas fa-eye"></i> Ver</button>' +
        '<button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modal"><i class="fas fa-pen"></i> Modificar</button>' +
        '<button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modal"><i class="fas fa-trash"></i> Eliminar</button><td>' +
        '</tr>');
    }
  }
});
/* 
$.ajax(settings).done(function (response) {
  console.log(response.data.length);
  for (var i = 0; i < response.data.length; i++) {
    console.log(response.data[i]);
    $('table tbody').append('<tr>' +
      '<td>' + response.data[i].id + '</td>' +
      '<td>' + response.data[i].name + '</td>' +
      '<td>' + response.data[i].description + '</td>' +
      '<td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal"><i class="fas fa-eye"></i> Ver</button>' +
      '<button type="button" class="btn btn-warning"><i class="fas fa-pen"></i> Modificar</button>' +
      '<button type="button" class="btn btn-danger"><i class="fas fa-trash"></i> Eliminar</button><td>' +
      '</tr>');
  }
}); */