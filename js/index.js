
document.addEventListener("DOMContentLoaded",()=>{
    let usuario = JSON.parse(localStorage.getItem("usuario"));

    if (usuario==null){
        Swal.fire({
            icon: 'error',
            title: 'NO HAY USUARIO',
            text: 'Es necesario iniciar sesión para continuar',
            
          })
        location.href="login.html";
    }else{
        document.getElementById("userBtn").innerHTML=usuario.nombre;
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
    document.getElementById("salir").addEventListener("click", function(){
        localStorage.removeItem("usuario");
        localStorage.removeItem("carro");
        localStorage.removeItem("perfil");
    });
});

