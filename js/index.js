
document.addEventListener("DOMContentLoaded",()=>{
    let usuario = JSON.parse(sessionStorage.getItem("usuario"));

    if (usuario==null){
        alert ("NO HAY USUARIO. Es necesario iniciar sesión para continuar");
        location.href="login.html";
    }else{
        document.getElementById("user").innerHTML=usuario.nombre;
    }
});


document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

