const PRODUCT_AUTO_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";

let productos = [];

let preciomin = undefined;
let preciomax = undefined;

function categorias(autos){
    document.getElementById("paraprod").innerHTML ="";
    let listaAutos = "";
    for(let auto of autos) {
        
        listaAutos += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="${auto.image}" alt="product image" class="img-thumbnail"> 
                </div>   
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>${auto.name + " - "+ auto.currency + " " +auto.cost}</h4> 
                        <p> ${auto.description}</p> 
                        </div>
                        <small class="text-muted">${auto.soldCount} artículos</small> 
                    </div>
                </div>
            </div>    
        </div>
        `
    }
document.getElementById("paraprod").innerHTML=listaAutos ;
}

function filtrar(){
    
    preciomin = parseInt(document.getElementById("min").value);
    preciomax = parseInt(document.getElementById("max").value);
    //let listaFiltrada = productos.filter((producto) =>  {if ((!(parseInt(producto.cost) < preciomin) && (!(parseInt(producto.cost) > preciomax)))) {
    let listaFiltrada = productos.filter((producto) => producto.cost >= preciomin && producto.cost <= preciomax);
    categorias(listaFiltrada);  
    console.log(listaFiltrada);
    }


let tomacategoria = localStorage.getItem("catID");

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL+tomacategoria+".json").then(function(resultObj){
        if (resultObj.status === "ok")
            {
                productos = resultObj.data.products;
                categorias(productos);
            }
    }); 
    document.getElementById("botonfiltro").addEventListener("click",()=>{
        filtrar();    
    });
    document.getElementById("sortAsc").addEventListener("click",()=>{
        productos.sort((a,b)=> {
            return (parseInt(a.cost) - parseInt(b.cost));
        });
        categorias(productos);
    });
    document.getElementById("sortDesc").addEventListener("click",()=>{
        productos.sort((a,b)=> {
            return (parseInt(b.cost) - parseInt(a.cost));
         });
        categorias(productos);
    });
    
    document.getElementById("sortByCount").addEventListener("click",()=>{
        productos.sort((a,b)=> {
            return (parseInt(b.soldCount) - parseInt(a.soldCount));
         });
        categorias(productos);
    });
    document.getElementById("botonlimpia").addEventListener("click",()=>{
        document.getElementById("min").value = "";
        document.getElementById("max").value = "";
        preciomin = undefined;
        preciomax = undefined;
        categorias(productos);
    });
});







