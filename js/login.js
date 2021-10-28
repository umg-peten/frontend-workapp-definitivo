let username = document.getElementById('usernameLogin');
let password = document.getElementById('passwordLogin');
let btnLogin = document.getElementById('btnLogin');

btnLogin.addEventListener('click', Authentication);

function Authentication(e){

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "username": username.value,
    "password": password.value
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    let response = fetch("http://workapp.somee.com/api/Auth/", requestOptions)
    .then(response => {
        return response.json();
    })
    .then(result => {
        console.log(result.status);
        console.log(result.message);
        if(result.status === 400){
            let alert = document.getElementById('alert');
            alert.classList.remove('d-none');
            alert.innerText = result.message
        }else if(result.status === 200){
            console.log(result.data.token)
            sessionStorage.setItem("token", result.data.token);
            localStorage.setItem("Nombre", result.data.name);
            localStorage.setItem("Apellido", result.data.lastName);
            localStorage.setItem("User", result.data.username);
            location.href = "dashboard.html";
            //redireccionar al dashboard
            
        }
    })
    .catch(error => {
        console.log("error");
    });

}