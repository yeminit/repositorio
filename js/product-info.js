let tomaproducto = localStorage.getItem("Prodid");

let listaimagenes = [];
let listacomentarios = [];

function puntuar(puntos){
    let estrellas ="";
    for (let i=1; i<=5; i++){
        if (i<=puntos){
            estrellas += `<i style="color:green;" class="fas fa-star "></i>`;
        } else {
            estrellas += `<i style="color:green;" class="far fa-star "></i>`;
        }
    }
    return estrellas;
};

function comentar(com){
    let listacom ="";
    for (texto of com){
        listacom +=`
        <div class="list-group-item list-group-item-action" >        
            <div class="row">
                <div class="d-flex w-100 justify-content">
                <div class="mb-1">
                <p>${texto.user + " - "+ texto.dateTime + " - " + puntuar(texto.score)}</p> 
                <small> ${texto.description} </small> 
                </div>
                </div>
            </div>
        </div>  
        `
    };
document.getElementById("comentarios").innerHTML = listacom;
};

function mostrar(imagen){
    let listaimg = "";
        for(let img of imagen){
            listaimg += `<div class="container">
                        <div class="row">
                        <img src=" ${img} " class="img-fluid">
                        </div>
                        </div>`

       /* `
    <div class="carousel-item active">
      <img src="${img}" class="d-block w-100" alt="imagen">
    </div>
    <div class="carousel-item">
      <img src="${img}" class="d-block w-100" alt="imagen">
    </div>  

         `*/
        }
    document.getElementById("imagenes").innerHTML = listaimg;
};

let fecha = new Date();

let dia = fecha.getDate();

let mes = fecha.getMonth()+1;

let año = fecha.getFullYear();

let reloj = new Date();

let hora = reloj.getHours();

let minutos =reloj.getMinutes();

let segundos = reloj.getSeconds();

function agregarcom(){
    let coment={}
    //coment.user = localStorage.getItem("usuario"); //trae todo lo que esta guardado en local, yo solo quiero el nombre por eso agrego un campo para poner el nombre
    coment.user = document.getElementById("nombreuser").value;
    coment.dateTime = año+"-"+mes+"-"+dia+" "+hora+":"+minutos+":"+segundos;
    coment.description = document.getElementById("espaciocoment").value;
    coment.score = puntuar(document.getElementById("puntos").value); // trae las estrellas pero no las pinta sg el numero  
    listacomentarios.push(coment);
    document.getElementById("nombreuser").value="";
    document.getElementById("espaciocoment").value="";
    comentar(listacomentarios)
};

let listaimagenesrel = [];

function setIDrel(id){
    localStorage.removeItem("Prodid");
    localStorage.setItem("Prodid",id);
    window.location="product-info.html";

};

function relacionar(imagen){
    let listaimgrel ="";
    for (img of imagen){
        listaimgrel +=`
        <div onclick="setIDrel(${img.id})">
        <div class="row">
            <div class="col-3">
                <img src="${img.image}" alt="product image" class="img-thumbnail"> 
            </div>   
            <div class="mb-1">
                <p>${img.name}</p> 
            </div>
        </div>
        </div>       
        `
    };
document.getElementById("imagenesrel").innerHTML = listaimgrel;
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
        
    });

    getJSONData(PRODUCT_INFO_URL+tomaproducto+".json").then(function(resultObj){
        if (resultObj.status === "ok")
            {
                listaimagenesrel = resultObj.data.relatedProducts;
                relacionar(listaimagenesrel);
            }
    }); 

   
    getJSONData(PRODUCT_INFO_COMMENTS_URL+tomaproducto+".json").then(function(resultObj){
        if (resultObj.status === "ok")
            {
                listacomentarios = resultObj.data;
                comentar(listacomentarios);
            }
    }); 

    document.getElementById("ptosBtn").addEventListener("click",()=>{
        agregarcom();    
    });

    getJSONData(PRODUCT_INFO_URL+tomaproducto+".json").then(function(resultObj){
        if (resultObj.status === "ok")
            {
                listaimagenes = resultObj.data.images;
                mostrar(listaimagenes);
            }
    }); 

});
