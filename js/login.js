function registro (){
    let usuario ={}
    usuario.nombre = document.getElementById("correo").value;
    usuario.clave = document.getElementById("contraseña").value;
    let expMail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    if (usuario.nombre !=="" && usuario.clave !=="" && expMail.test(usuario.nombre)){
        
        localStorage.setItem("usuario", JSON.stringify(usuario));
        location.href="index.html";
    }else{
        //alert ("Para continuar debe ingresar correo y contraseña");
        Swal.fire({
            icon: 'error',
            title: 'Para continuar..',
            text: 'Debe ingresar correo y contraseña. Gracias!',
            
          })
    };
};

document.addEventListener("DOMContentLoaded",()=>{
    document.getElementById("regBtn").addEventListener("click",()=>{
        registro()
    });

});