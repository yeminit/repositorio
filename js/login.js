function registro (){
    let usuario ={}
    usuario.nombre = document.getElementById("correo").value;
    usuario.clave = document.getElementById("contraseña").value;

    if (usuario.nombre=="" || usuario.clave==""){
        alert ("Para continuar debe ingresar correo y contraseña");
    }else{
        localStorage.setItem("usuario", JSON.stringify(usuario));
        location.href="index.html";
    }
}

document.addEventListener("DOMContentLoaded",()=>{
    document.getElementById("regBtn").addEventListener("click",()=>{
        registro()
    })
})