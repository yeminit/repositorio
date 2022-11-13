let nuevacompra = JSON.parse(localStorage.getItem("carro"))
console.log(nuevacompra)

let carrodecompras = [];

let btnpapelera = document.getElementsByName("papelera");

function eliminar(item){
    carrodecompras.splice(item,1);
    mostrarcompra();
};

function mostrarcarro(compra){
   let carro ="";
   for(let info of compra){
    carro += `
    <tr>
    <td><img src= ${info.image} width=100></td>
    <td>${info.name}</td>
    <td><span class="moneda">${info.currency}</span> <span class="Punit">${info.unitCost}</span></td>
    <td><input onchange="subtotalizar()" name="Q" type="number" style="width: 1.5cm" placeholder="1" min="1" required></td>
    <td><span>${info.currency}</span> <span class="subtotalPxQ"> </span></td>
    <td><img src="img/papelera.png" width=40 name="papelera"></td>
    </tr>`
    };
document.getElementById("artencarro").innerHTML = carro;

};

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
        });
    };
    
};

let tipoenvio = document.getElementsByName("envio");

function subtotalizar(){
    let cantidades = document.getElementsByName("Q");
    let precios = document.getElementsByClassName("Punit");
    let subtotales = document.getElementsByClassName("subtotalPxQ");
    let monedas = document.getElementsByClassName("moneda");

    let subtotal = 0;

    for (let i=0; i< cantidades.length; i++){
        
        if((monedas[i].innerHTML) == "UYU"){
            subtotal += (parseFloat(precios[i].innerHTML)/40) * parseFloat(cantidades[i].value);
        } else {
            subtotal += (parseFloat(precios[i].innerHTML)) * parseFloat(cantidades[i].value);
        };
      subtotales[i].innerHTML = parseFloat(precios[i].innerHTML) * parseFloat(cantidades[i].value); 
    };

    let calculoenvio = 0;
    for (let z=0; z< tipoenvio.length; z++){
        if (tipoenvio[z].checked){
            calculoenvio = subtotal* parseFloat(tipoenvio[z].value);
        };
    };

    document.getElementById("sumatoriasubtotales").innerHTML ="USD " + subtotal;
    document.getElementById("costoenvio").innerHTML ="USD " + (calculoenvio).toFixed(0);
    document.getElementById("costototal").innerHTML ="USD " + (subtotal + calculoenvio);

};

function chequearenvio(){

    let checkenvio1 = document.getElementById("premium").checked;
    let checkenvio2 = document.getElementById("express").checked;
    let checkenvio3 = document.getElementById("standar").checked;
    
    if(checkenvio1 || checkenvio2 || checkenvio3){
        document.getElementById("feedbacktipoe").classList.remove("pendiente");
        document.getElementById("feedbacktipoe").classList.add("exito");
        document.getElementById("feedbacktipoe").innerHTML = "Tipo de envío seleccionado";
      
    } else {
        document.getElementById("feedbacktipoe").innerHTML = "Recuerda seleccionar un envío";
    };
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

function validar(){
    document.getElementById("alert-success").classList.add("show");
  };

document.addEventListener("DOMContentLoaded",()=>{

    getJSONData(CART_INFO_URL+"25801.json").then(function(resultObj){
        if (resultObj.status === "ok")
            {
                carrodecompras = resultObj.data.articles;
                //mostrarcarro(carrodecompras); No lo muestro desde el comienzo. Solo cuando se presiona "comprar en products-info.js"
                mostrarcompra();
                
            }
    });

    for (let i=0; i< tipoenvio.length; i++){
        tipoenvio[i].addEventListener('click',()=>{
            subtotalizar();
        });
    };

    document.getElementById("tarj").addEventListener("click",()=>{
        deshabilitar()
    });
    document.getElementById("trf").addEventListener("click",()=>{
        deshabilitar()
    });
    document.getElementById("cierramodal").addEventListener("click",()=>{
        let tarjcredito = document.getElementById("tarj")
        let transfer = document.getElementById("trf")
        let Ntarj = document.getElementById("numtarjeta")
        let Cseg = document.getElementById("codseguridad")
        let Vtarj = document.getElementById("vtotarjeta")
        let Ncta = document.getElementById("numcuenta") 

        if(tarjcredito.checked && Ntarj.checkValidity() && Cseg.checkValidity() && Vtarj.checkValidity()){
            document.getElementById("selectforma").innerHTML = "Tarjeta de crédito"
            document.getElementById("selectforma").classList.remove("pendiente")
            document.getElementById("selectforma").classList.add("exito") 
        } else if (transfer.checked && Ncta.checkValidity()){
            document.getElementById("selectforma").innerHTML = "Transferencia bancaria"
            document.getElementById("selectforma").classList.remove("pendiente")
            document.getElementById("selectforma").classList.add("exito")
        };
    });

    document.getElementById("formcarrito").addEventListener('submit', function (event) {
        if (!this.checkValidity()) {
            chequearenvio()
            event.preventDefault()
            event.stopPropagation()
        } else {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Tu compra se realizó con éxito!',
                showConfirmButton: false,
                timer: 1500
              })
        }
            
        document.body.classList.add('was-validated');
        
    });

});