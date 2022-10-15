let nuevacompra = JSON.parse(localStorage.getItem("carro"));
console.log(nuevacompra)

let carrodecompras = [];

function mostrarcarro(compra){
   let carro ="";
   for(let info of compra){
    carro += `
    <tr>
    <td><img src= ${info.image} width=100></td>
    <td>${info.name}</td>
    <td class="Punit"> ${info.currency} ${info.unitCost}</td>
    <td><input onchange="subtotalizar()" id="Q" type="number" style="width: 1.5cm"></td>
    <td class="subtotalPxQ"></td>
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
};

function subtotalizar(){
    let cantidad = document.getElementById("Q").value;
    let precio = document.getElementsByClassName("Punit").value; //probe con parseInt, parseFloat y Number: en esta linea me devuelve "NaN" y si los agrego en la linea 13 devuelve "undefined"
    let subtotal = cantidad * precio;
    document.getElementsByClassName("subtotalPxQ").innerHTML = subtotal;
    console.log(cantidad);
    console.log(precio);
    console.log(subtotal);
};

document.addEventListener("DOMContentLoaded",()=>{

    getJSONData(CART_INFO_URL+"25801.json").then(function(resultObj){
        if (resultObj.status === "ok")
            {
                carrodecompras = resultObj.data.articles;
                mostrarcarro(carrodecompras);
                mostrarcompra();
                console.log(carrodecompras)
            }
    });
});