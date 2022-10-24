let nuevacompra = JSON.parse(localStorage.getItem("carro"))
console.log(nuevacompra)

let carrodecompras = [];

function mostrarcarro(compra){
   let carro ="";
   for(let info of compra){
    carro += `
    <tr>
    <td><img src= ${info.image} width=100></td>
    <td>${info.name}</td>
    <td class="Punit"><span>${info.currency}</span>${info.unitCost}</td>
    <td><input onchange="subtotalizar()" name="Q" type="number" style="width: 1.5cm" placeholder="1"></td>
    <td class="subtotalPxQ"> </td>
    <td><img src="img/papelera.png" width=40 name="papelera"></td>
    </tr>`
    };

document.getElementById("artencarro").innerHTML = carro;
};

let btnpapelera = document.getElementsByName("papelera");

function eliminar(item){
    carrodecompras.splice(item,1);
    mostrarcompra();
}

function mostrarcompra(){

    let compra = {};
    compra.image = nuevacompra.foto;
    compra.name = nuevacompra.nombre;
    compra.currency = nuevacompra.moneda;
    compra.unitCost = nuevacompra.precio;
    carrodecompras.push(compra);
    mostrarcarro(carrodecompras);
    
    for (let i=0; i< btnpapelera.length; i++){
            btnpapelera[i].addEventListener('click',()=>{
            eliminar(i);
        })
       
    }
};

let tipoenvio = document.getElementsByName("envio");

function subtotalizar(){
    let cantidades = document.getElementsByName("Q");
    let precios = document.getElementsByClassName("Punit");

    let subtotal = 0;
    for (let i=0; i< cantidades.length; i++){
      subtotal = parseFloat(precios[i].innerHTML) * parseFloat(cantidades[i].value);
      document.getElementsByClassName("subtotalPxQ").innerHTML = subtotal[i]; 
    }
    

    let calculoenvio = 0;
    for (let i=0; i< tipoenvio.length; i++){
        if (tipoenvio[i].checked){
            calculoenvio = subtotal * parseFloat(tipoenvio[i].value);
        }
    }

    document.getElementById("sumatoriasubtotales").innerHTML = subtotal;
    document.getElementById("costoenvio").innerHTML = calculoenvio;
    document.getElementById("costototal").innerHTML = subtotal + calculoenvio;
   
    console.log(cantidades);
    console.log(precios);
    console.log(subtotal);
};

function deshabilitar(){
    if(document.getElementById("tarj").checked){
        document.getElementById("numcuenta").disabled=true;
        document.getElementById("numcuenta").value="";
        document.getElementById("numtarjeta").disabled=false;
        document.getElementById("codseguridad").disabled=false;
        document.getElementById("vtotarjeta").disabled=false;
    } else {
        document.getElementById("numtarjeta").disabled=true;
        document.getElementById("codseguridad").disabled=true;
        document.getElementById("vtotarjeta").disabled=true;
        document.getElementById("numtarjeta").value="";
        document.getElementById("codseguridad").value="";
        document.getElementById("vtotarjeta").value="";
        document.getElementById("numcuenta").disabled=false;
    };
};


//Comienza código para validación (desde bootstrap)
(function () {
    'use strict'

    var forms = document.querySelectorAll('.needs-validation')
  
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()
// Termina código para validación

document.addEventListener("DOMContentLoaded",()=>{

    getJSONData(CART_INFO_URL+"25801.json").then(function(resultObj){
        if (resultObj.status === "ok")
            {
                carrodecompras = resultObj.data.articles;
                //mostrarcarro(carrodecompras); No lo muestro desde el comienzo. Solo cuando se presiona "comprar en products-info.js"
                mostrarcompra();
                
            }
    });

    document.getElementById("tarj").addEventListener("click",()=>{
        deshabilitar()
    });
    document.getElementById("trf").addEventListener("click",()=>{
        deshabilitar()
    });
    document.getElementById("cierramodal").addEventListener("click",()=>{
        let tarjcredito = document.getElementById("tarj")        
        if(tarjcredito.checked){
            document.getElementById("selectforma").innerHTML = "Tarjeta de crédito"
        } else {
            document.getElementById("selectforma").innerHTML = "Transferencia bancaria"
        };
    });
});