$(document).ready(function() {
    InicializarArticulo();
});

function InicializarArticulo(){
    EventosArticulo();    
    LoadCategoria();

    //Ajax : Obtener json desde controlador
    ObtenerJsonController();
}

function ObtenerJsonController(){
    var obj = {
        url: "http://noticias.api.com/articulo/obtenerjson",
        //data: obj,
        nombreFuncion: CallBackJsonController
    }    
    AjaxGetAll(obj); 
}

function CallBackJsonController(result){
    console.log(result);
}

function EventosArticulo(){ 
    $("#pagArticulo").on("click", "button:not(:disabled)",function(){      
        ClickPaginador(this);
    });

    $('#btnNuevo').on("click", function(){
        MostrarVentanaNuevaArticulo();
    })

    $("#listaArticulo").on("click", "button[class*='btn-primary']",function(){
        MostrarVentanaEditarArticulo(this);       
    });

    $("#listaArticulo").on("click", "button[class*='btn-danger']",function(){        
        MostrarVentanaBorrarArticulo(this);
    });

}    

function LoadCategoria(){
    var obj = { page: 1 }
    ObtnerCategorias(obj);
}

function ObtnerCategorias(obj){        
    var obj = {
        url: "http://localhost:8000/api/categorias",
        data: obj,
        nombreFuncion: CallBackCategoria
    }    
    AjaxGetAll(obj);    
}

var categorias;
function CallBackCategoria(result){   
    categorias = result; 
    LoadArticulo();
}

function LoadArticulo(){
    var obj = { page: 1 }
    ObtnerArticulos(obj);
}

function ObtnerArticulos(obj){        
    var obj = {
        url: "http://localhost:8000/api/articulos",
        data: obj,
        nombreFuncion: CallBackArticulo
    }    
    AjaxGetAll(obj,null);    
}

function CallBackArticulo(result){    
    PintarListaArticulos(result);
    OcultarDivBlock();
}


function PintarListaArticulos(Articulo){
    //categorias
    var art = Articulo["hydra:member"];
    var listArticulo = $('#listaArticulo');
    listArticulo.html('');
    $(art).each(function(index){  
        var nombreCategoria = ObtenerNombreCategoria(this.idcategoria);
        var idCat = ObtenerIdCategoriaApi(this.idcategoria);                  
        var html = `    <div class="row pb-2">
                            <div class="col-3" id="titulo_${this.id}">${this.titulo}</div>
                            <div class="col-4" id="desc_${this.id}">${this.descirpcion}</div>
                            <div class="col-2">${nombreCategoria}</div>
                            <div class="col-1">
                                <button type="button" class="btn btn-primary" id="${this.id}" idCat="${idCat}">Editar</button>
                            </div>
                            <div class="col-1">
                                <button type="button" class="btn btn-danger" id="${this.id}" >Eliminar</button>
                            </div>
                        </div>
                    `;
        listArticulo.append(html);                    
    });
    
    CrearPaginador(Articulo["hydra:view"],"#pagArticulo");
}

function ClickPaginador(obj){
    var page = $(obj).attr("page");
    var obj = { page: page }
    ObtnerArticulos(obj);
}

function MostrarVentanaNuevaArticulo(){
    var idTxt = "txtArticulo";
    var idDesc = "txtDescript";
    var idCat = "cbCategoria";
    var body = `<label>Titulo</label><br>
                <input id="${idTxt}" type="text"/><br>
                <label>Descripcion</label><br>
                <input id="${idDesc}" type="text"/><br>
                <label>Categoria</label><br>
                ${CrearComboCategoria(idCat)}
                `;
    var click = `"NuevaArticulo('${idTxt}', '${idDesc}', '${idCat}')"`;
    var value = "Añadir";

    VentanaModal(body, click, value);
}

function MostrarVentanaEditarArticulo(obj){
    var button = $(obj);
    var id = button.attr("id");
    var idCat = button.attr("idCat");
    var titulo = $('#titulo_' + id).html();
    var desc = $('#desc_' + id).html();


    var idTxt = "txtArticulo";
    var idDesc = "txtDescript";
    var idCombo = "cbCategoria";
    var body = `<label>Titulo</label><br>
                <input id="${idTxt}" value="${titulo}" type="text"/><br>
                <label>Descripcion</label><br>
                <input id="${idDesc}" value="${desc}" type="text"/><br>
                <label>Categoria</label><br>
                ${CrearComboCategoria(idCombo, idCat)}
                `;
    var click = `"EditarArticulo(${id}, '${idTxt}', '${idDesc}', '${idCombo}')"`;
    var value = "Actualizar";

    VentanaModal(body, click, value);
}

function MostrarVentanaBorrarArticulo(obj){
    var button = $(obj);
    var id = button.attr("id");

    var body = `<p>¿Estas seguro que deseas eliminar el Articulo?</p>`;
    var click = `"BorrarArticulo(${id})"`;
    var value = "Eliminar";

    VentanaModal(body, click, value);
}


function NuevaArticulo(idTitulo, idDescripcion, idCategoria){
    var titulo = $('#' + idTitulo).val();
    var descripcion = $('#' + idDescripcion).val();
    var categoria = $('#' + idCategoria).val();

    var html = `Guardando Articulo ${titulo}`;
    MostrarDivBlock(html);

    var fecha = FechaActualISO();
    var objItem = { 
        titulo: titulo,
        descirpcion: descripcion,
        fechacreacion: `${fecha}`,
        idcategoria: "api/categorias/" + categoria
     };
    var obj = {
        url: "http://localhost:8000/api/articulos",
        data: objItem,
        nombreFuncion: CallBackGuardarArticulo
    }  
    //console.log(objItem);      
    AjaxPost(obj);
}

function CallBackGuardarArticulo(result){
    OcultarDivBlock();
    alert('Articulo guardado correctamente');
    LoadArticulo();
}

function EditarArticulo(id, idTitulo, idDescripcion, idCategoria){
    var titulo = $('#' + idTitulo).val();
    var descripcion = $('#' + idDescripcion).val();
    var categoria = $('#' + idCategoria).val();

    var html = `Actualizando Articulo ${titulo}`;
    MostrarDivBlock(html);

    var fecha = FechaActualISO();
    var objItem = { 
        titulo: titulo,
        descirpcion: descripcion,
        fechacreacion: `${fecha}`,
        idcategoria: "api/categorias/" + categoria
     };
    var obj = {
        url: "http://localhost:8000/api/articulos",
        data: objItem,
        nombreFuncion: CallBackActualizarArticulo
    }           
   AjaxPutItem(id, obj)
}

function CallBackActualizarArticulo(result){
    OcultarDivBlock();
    alert('Articulo actualizado correctamente');
    LoadArticulo();
}

function BorrarArticulo(id){
    var html = `Eliminando Articulo`;
    MostrarDivBlock(html);    

     var objItem = { id:id };
     var obj = {
         url: "http://localhost:8000/api/articulos",
         data: objItem,
         nombreFuncion: CallBackDeleteArticulo
     }       
     AjaxDeleteItem(obj);

    
}

function CallBackDeleteArticulo(result){
    alert('Articulo eliminado correctamente');
    LoadCategoria(); 
}

function ObtenerNombreCategoria(idcategoriaApi){
    var returnValue = "";
    $(categorias).each(function(index){
        var id = this.id;
        var idApi = ObtenerIdCategoriaApi(idcategoriaApi);

        if(id == idApi){
            returnValue = this.nombre;
            return false;
        }
    });
    return returnValue;
}

function ObtenerIdCategoriaApi(value){
    return value.split("/")[3];
}

function CrearComboCategoria(idCombo, idCat = null){
    var returnValue = `<select id="${idCombo}">`;
    returnValue = returnValue + "<option></option>";
    $(categorias).each(function(index){
        var selected = "";
        if(this.id == idCat) selected = "selected";
        returnValue = returnValue + `<option value="${this.id}" ${selected}>${this.nombre}</option>`;
    });
    returnValue = returnValue + "</select>";
    return returnValue;
}