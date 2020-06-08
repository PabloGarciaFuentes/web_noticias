$(document).ready(function() {
    InicializarHome();
});

function InicializarHome(){
    EventosHome();    

    LoadHome();
}

function EventosHome(){ }    

function LoadHome(){
    var obj = { page: 1 }
    ObtnerArticulos(obj);
}

var objArticulo;
function ObtnerArticulos(obj){        
    var obj = {
        url: "http://localhost:8000/api/articulos",
        data: obj,
        nombreFuncion: CallBackArticulos
    }    
    AjaxGetAll(obj);    
}

function CallBackArticulos(result){    
    objArticulo = result;
    ObtenerMultimedia(null);    
    //PintarHome(result, obj);
}

function ObtenerMultimedia(objItem){
    // var obj = {
    //     url: "http://localhost:8000/api/articulos",
    //     data: objItem,
    //     nombreFuncion: CallBackMultimedia
    // }    
    // AjaxGetAllMultimedia(obj);  
    var obj = [ 
        { idArticulo: 5, nombreFichero: "https://static.motor.es/fotos-noticias/2019/07/ventas-coches-2019-espana-junio-201958770-1561985554_1.jpg"},
        { idArticulo: 3, nombreFichero: "https://motor.elpais.com/wp-content/uploads/2018/11/tesla-roadster-000_1920x1600c-1800x728.jpg"},
        { idArticulo: 6, nombreFichero: "https://imagenes-cdn.autofacil.es/multimedia/fotos/2019/12/05/175269/prueba-alfa-romeo-giulia-2020-4g-11_g.jpg"},
        { idArticulo: 7, nombreFichero: "https://motor.elpais.com/wp-content/uploads/2018/12/Bugatti-Chiron-2017-1600-1c-1800x728.jpg"},
        { idArticulo: 9, nombreFichero: "https://static1.abc.es/media/summum/2019/12/08/lamborghini-abandonado-krdB--620x349@abc.jpg"}
    ];     
    CallBackMultimedia(obj);
}

function CallBackMultimedia(result){   
    PintarHome(objArticulo, result);
}

function PintarHome(articulo, obj){
    $(articulo).each(function(index){            
        var itemArticulo = this;
        var indexImagen  = -1;
        var urlImagen;
        $(obj).each(function(index){            
            if(this.idArticulo==itemArticulo.id){
                urlImagen = this.nombreFichero;
                indexImagen = index;               
            }
        });
        if (indexImagen > -1) obj.splice(indexImagen, 1);      
        console.log(obj);  
        var html = `<div class="card" style="width: 18rem;">
                        <img src="${urlImagen}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${this.titulo}</h5>
                            <p class="card-text">${this.descirpcion}</p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>`;

        $('#listadoHome').append(html);                    
    });
}