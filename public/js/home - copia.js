$(document).ready(function() {
    InicializarHome();
});

function InicializarHome(){
    EventosHome();    

    LoadLlamadaApi();
}

function LoadLlamadaApi(){
    var obj = { page: 1 }
    LLamadaApi();
}

function EventosHome(){           
    $('#btnApiGET').on("click",function(){
        LoadLlamadaApi();      
    });

    $('#btnApiPOST').on("click",function(){      
        var obj = { nombre: "prueba api jquery 66666", fechacreacion: "2020-05-29T09:39:48.618Z" }  
        GuardarCategoriaApi(obj);        
    });

    $('#btnApiGETCAT').on("click",function(){
        var obj = { id: 3 };
        ObtenerCategoriaApi(obj);        
    });

    $('#btnApiDELETE').on("click",function(){      
        var obj = { id: 24 };  
        DeleteCategoriaApi(obj);
    });

    $('#btnApiPUT').on("click",function(){
        var obj = {
            nombre: "futbol 666",
            fechacreacion: "2020-05-30T16:37:14.760Z"
        }
        ActualizarCategoriaApi(21,obj);        
    });
}    

function LLamadaApi(obj){        
    var obj = {
        url: "http://localhost:8000/api/articulos",
        data: obj,
        nombreFuncion: CallBackLlamadaApi
    }    
    AjaxGetAll(obj);    
}

function CallBackLlamadaApi(result){
    PintarHome(result);
}

function GuardarCategoriaApi(objItem){          
    var obj = {
        url: "http://localhost:8000/api/categorias",
        data: objItem,
        nombreFuncion: CallBackGuardarCategoria
    }        
    AjaxPost(obj);
}

function CallBackGuardarCategoria(result){
    console.log(result); 
}

function ObtenerCategoriaApi(objItem){        
    var obj = {
        url: "http://localhost:8000/api/categorias",
        data: objItem,
        nombreFuncion: CallBackDeleteCategoria
    }   
    AjaxGetItem(obj);     
}

function CallBackObtenerCategoria(result){
    alert("Categoria Obtenida " + result.nombre );
}

function DeleteCategoriaApi(objItem){          
    var obj = {
        url: "http://localhost:8000/api/categorias",
        data: objItem,
        nombreFuncion: CallBackDeleteCategoria
    }       
    AjaxDeleteItem(obj);
}

function CallBackDeleteCategoria(result){
    console.log(result);
}

function ActualizarCategoriaApi(id, objItem){   
    var obj = {
        url: "http://localhost:8000/api/categorias",
        data: objItem,
        nombreFuncion: CallBackActualizarCategoria
    }           
   AjaxPutItem(id, obj)
}

function CallBackActualizarCategoria(result){
    console.log(result);        
}

function PintarHome(producto){
    $(producto).each(function(index){            
        var html = `<div class="card" style="width: 18rem;">
                        <img src="..." class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${this.titulo}</h5>
                            <p class="card-text">${this.descirpcion}</p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>`;

        $('#listadoHome').append(html);                    
    });
}