let correoregistrado = JSON.parse(localStorage.getItem("usuario"))
let mailregistrado = correoregistrado.nombre;

function crearperfil(){
    let perfildeusuario = {}
    perfildeusuario.nombre1 = document.getElementById("nombre1").value;
    perfildeusuario.apellido1 = document.getElementById("apellido1").value;
    perfildeusuario.nombre2 = document.getElementById("nombre2").value;
    perfildeusuario.apellido2 = document.getElementById("apellido2").value;
    perfildeusuario.telefono = document.getElementById("tel").value;
    console.log(perfildeusuario)

    let nombreusuario = document.getElementById("nombre1");
    let apellidousuario = document.getElementById("apellido1");
    
    if(nombreusuario.value !=="" && apellidousuario.value !=="" ){
        localStorage.setItem("perfil", JSON.stringify(perfildeusuario));
        let datosperfil = JSON.parse(localStorage.getItem("perfil"));
        document.getElementById("nombre1").value = datosperfil.nombre1
        document.getElementById("nombre2").value = datosperfil.nombre2
        document.getElementById("apellido1").value = datosperfil.apellido1
        document.getElementById("apellido2").value = datosperfil.apellido2
        document.getElementById("tel").value = datosperfil.telefono
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: 'No se guardó tu perfil',
            
          })
    };
       
};
document.addEventListener("DOMContentLoaded",()=>{

    document.getElementById("correousuario").value = mailregistrado;

    document.getElementById("formperfil").addEventListener('submit', function (event) {
        if (!this.checkValidity()) {
            crearperfil();
            event.preventDefault()
            event.stopPropagation()
        } else {
            crearperfil();

        }
        document.body.classList.add('was-validated');
        
        });
});