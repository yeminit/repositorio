let tomaproducto = localStorage.getItem("Prodid");

let listaimagenes = [];
let listacomentarios = [];

function mostrar(img){
    let lista1 = ""; 
    for(let foto of img) {
        
        lista1 = `
                <div>
                    <img src=" ${foto.images} " class="img-thumbnail"> 
                </div>
                `
     };
     document.getElementById("imagenes").innerHTML = lista1;
};

function puntuar(puntos){
    let estrellas ="";
    for (let i=1; i<=5; i++){
        if (i=puntos){
            estrellas += `<i class="fas fa-star checked"></i>`;
        } else {
            estrellas += `<i class="far fa-star checked"></i>`;
        }
    }
    document-getElementById("puntos").addEventListener("change",()=>{
        puntuar(document.getElementById("puntos").value);
    });
};

function comentar(com){
    let lista2 ="";
    for (texto of com){
        lista2 +=`
        <div class="list-group-item list-group-item-action" >        
            <div class="row">
                <div class="d-flex w-100 justify-content">
                <div class="mb-1">
                <p>${texto.user + " - "+ texto.dateTime + " - " + texto.score}</p> 
                <small> ${texto.description} </small> 
                </div>
                </div>
            </div>
        </div>  
        `
    };
document.getElementById("comentarios").innerHTML = lista2;
};



document.addEventListener('DOMContentLoaded', ()=>{

    fetch(PRODUCT_INFO_URL+tomaproducto+".json")
    .then(respuesta => respuesta.json())
    .then(datos=> {
        document.getElementById("nombre").innerHTML= datos.name;
        document.getElementById("precio").innerHTML= datos.currency +" "+ datos.cost;
        document.getElementById("descripcion").innerHTML= datos.description;
        document.getElementById("categoria").innerHTML = datos.category;
        document.getElementById("cantidad").innerHTML = datos.soldCount;
        mostrar(listaimagenes);
    });
   
    getJSONData(PRODUCT_INFO_COMMENTS_URL+tomaproducto+".json").then(function(resultObj){
        if (resultObj.status === "ok")
            {
                listacomentarios = resultObj.data;
                comentar(listacomentarios);
            }
    }); 
});
