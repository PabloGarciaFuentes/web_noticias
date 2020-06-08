$(document).ready(function() {
    InicializarMultimedia();
});

function InicializarMultimedia(){
    EventosMultimedia();    
    LoadMultimedia();
}


function CallBackJsonController(result){
    console.log(result);
}

function EventosMultimedia(){ 
    $("#pagMultimedia").on("click", "button:not(:disabled)",function(){      
        ClickPaginador(this);
    });

    $('#btnNuevo').on("click", function(){
        MostrarVentanaNuevaMultimedia();
    })

    $("#listaMultimedia").on("click", "button[class*='btn-primary']",function(){
        MostrarVentanaEditarMultimedia(this);       
    });

    $("#listaMultimedia").on("click", "button[class*='btn-danger']",function(){        
        MostrarVentanaBorrarMultimedia(this);
    });

}    

function LoadMultimedia(){
    ObtnerMultimedia();
}

function ObtnerMultimedia(){        
    var obj = {
        url: "http://noticias.api.com/multimedia/ObtenerJsonMultimedia",
        //data: objItem,
        nombreFuncion: CallBackMultimedia
    }    
    AjaxGetAll(obj);    
}

function CallBackMultimedia(result){  
    console.log(result);
    //PintarListaMultimedias();
}

function PintarListaMultimedias(Multimedia){
    //categorias
    var art = Multimedia["hydra:member"];
    var listMultimedia = $('#listaMultimedia');
    listMultimedia.html('');
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
        listMultimedia.append(html);                    
    });
    
    CrearPaginador(Multimedia["hydra:view"],"#pagMultimedia");
}

function ClickPaginador(obj){
    var page = $(obj).attr("page");
    var obj = { page: page }
    ObtnerMultimedias(obj);
}

function MostrarVentanaNuevaMultimedia(){
    var idFichero = "fileImg";
    var idArt = "txtArticulo";
    var body = `<label>Imagen</label><br>
                <input id="${idFichero}" type="file" class="form-control" name="fichero[]" aria-describedby="fichero" placeholder="Fichero">   
                <label>IdArticulo</label><br>
                <input id="${idArt}" type="text"/><br>
                `;
    var click = `"NuevaMultimedia('${idFichero}', '${idArt}')"`;
    var value = "Añadir";

    VentanaModal(body, click, value);
}

function MostrarVentanaEditarMultimedia(obj){
    var button = $(obj);
    var id = button.attr("id");
    var idCat = button.attr("idCat");
    var titulo = $('#titulo_' + id).html();
    var desc = $('#desc_' + id).html();


    var idTxt = "txtMultimedia";
    var idDesc = "txtDescript";
    var idCombo = "cbCategoria";
    var body = `<label>Titulo</label><br>
                <input id="${idTxt}" value="${titulo}" type="text"/><br>
                <label>Descripcion</label><br>
                <input id="${idDesc}" value="${desc}" type="text"/><br>
                <label>Categoria</label><br>
                ${CrearComboCategoria(idCombo, idCat)}
                `;
    var click = `"EditarMultimedia(${id}, '${idTxt}', '${idDesc}', '${idCombo}')"`;
    var value = "Actualizar";

    VentanaModal(body, click, value);
}

function MostrarVentanaBorrarMultimedia(obj){
    var button = $(obj);
    var id = button.attr("id");

    var body = `<p>¿Estas seguro que deseas eliminar el Multimedia?</p>`;
    var click = `"BorrarMultimedia(${id})"`;
    var value = "Eliminar";

    VentanaModal(body, click, value);
}


function NuevaMultimedia(idFichero, idArt){
    var file = $('#' + idFichero)[0].files[0];
    var idArt = $('#' + idArt).val();

    var obj = {
        url: "http://noticias.api.com/multimedia/FileUpload",
        file: file,
        id: idArt,
        nombreFuncion: CallBackFileUpload
    }

    AjaxFileUpload(obj);

    /* var html = `Subiendo Multimedia`;
    MostrarDivBlock(html); */

    /* var fecha = FechaActualISO();
    var objItem = { 
        titulo: titulo,
        descirpcion: descripcion,
        fechacreacion: `${fecha}`,
        idcategoria: "api/categorias/" + categoria
     };
    var obj = {
        url: "http://localhost:8000/api/Multimedias",
        data: objItem,
        nombreFuncion: CallBackGuardarMultimedia
    }  
    //console.log(objItem);      
    AjaxPost(obj); */
}

function CallBackFileUpload(result){
    console.log(result);
}

function CallBackGuardarMultimedia(result){
    OcultarDivBlock();
    alert('Multimedia guardado correctamente');
    LoadMultimedia();
}

function EditarMultimedia(id, idTitulo, idDescripcion, idCategoria){
    var titulo = $('#' + idTitulo).val();
    var descripcion = $('#' + idDescripcion).val();
    var categoria = $('#' + idCategoria).val();

    var html = `Actualizando Multimedia ${titulo}`;
    MostrarDivBlock(html);

    var fecha = FechaActualISO();
    var objItem = { 
        titulo: titulo,
        descirpcion: descripcion,
        fechacreacion: `${fecha}`,
        idcategoria: "api/categorias/" + categoria
     };
    var obj = {
        url: "http://localhost:8000/api/Multimedias",
        data: objItem,
        nombreFuncion: CallBackActualizarMultimedia
    }           
   AjaxPutItem(id, obj)
}

function CallBackActualizarMultimedia(result){
    OcultarDivBlock();
    alert('Multimedia actualizado correctamente');
    LoadMultimedia();
}

function BorrarMultimedia(id){
    var html = `Eliminando Multimedia`;
    MostrarDivBlock(html);    

     var objItem = { id:id };
     var obj = {
         url: "http://localhost:8000/api/Multimedias",
         data: objItem,
         nombreFuncion: CallBackDeleteMultimedia
     }       
     AjaxDeleteItem(obj);

    
}

function CallBackDeleteMultimedia(result){
    alert('Multimedia eliminado correctamente');
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
