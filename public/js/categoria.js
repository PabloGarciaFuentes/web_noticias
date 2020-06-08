$(document).ready(function() {
    InicializarCategoria();
});

function InicializarCategoria(){
    EventosCategoria();    

    LoadCategoria();
}

function EventosCategoria(){ 
    $("#pagCategoria").on("click", "button:not(:disabled)",function(){      
        ClickPaginador(this);
    });

    $('#btnNuevo').on("click", function(){
        MostrarVentanaNuevaCategoria();
    })

    $("#listaCategoria").on("click", "button[class*='btn-primary']",function(){
        MostrarVentanaEditarCategoria(this);       
    });

    $("#listaCategoria").on("click", "button[class*='btn-danger']",function(){        
        MostrarVentanaBorrarCategoria(this);
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
    AjaxGetAll(obj,null);    
}

function CallBackCategoria(result){    
    PintarListaCategorias(result);
    OcultarDivBlock();
}


function PintarListaCategorias(categoria){
    var cat = categoria["hydra:member"];
    var listCategoria = $('#listaCategoria');
    listCategoria.html('');
    $(cat).each(function(index){                    
        var html = `    <div class="row pb-2">
                            <div class="col-3">${this.nombre}</div>
                            <div class="col-2">
                                <button type="button" class="btn btn-primary" id="${this.id}" nombre="${this.nombre}">Editar</button>
                            </div>
                            <div class="col-2">
                                <button type="button" class="btn btn-danger" id="${this.id}" nombre="${this.nombre}">Eliminar</button>
                            </div>
                        </div>
                    `;
        listCategoria.append(html);                    
    });
    
    CrearPaginador(categoria["hydra:view"],"#pagCategoria");
}

function ClickPaginador(obj){
    var page = $(obj).attr("page");
    var obj = { page: page }
    ObtnerCategorias(obj);
}

function MostrarVentanaNuevaCategoria(){
    var id = "txtCategoria";
    var body = `<label>Categoria</label><br>
                <input id="${id}" type="text"/>`;
    var click = `"NuevaCategoria('${id}')"`;
    var value = "Añadir";

    VentanaModal(body, click, value);
}

function MostrarVentanaEditarCategoria(obj){
    var button = $(obj);
    var id = button.attr("id");
    var nombre = button.attr("nombre");
    var idTxt = "txtCategoria";
    var body = `<label>Categoria</label><br>
                <input id="${idTxt}" value="${nombre}" type="text"/>`;
    var click = `"EditarCategoria(${id}, '${idTxt}', '${nombre}')"`;
    var value = "Actualizar";

    VentanaModal(body, click, value);
}

function MostrarVentanaBorrarCategoria(obj){
    var button = $(obj);
    var id = button.attr("id");
    var nombre = button.attr("nombre");   

    var body = `<p>¿ Estas seguro que deseas eliminar la categoria: <b>${nombre}</b> ?</p>`;
    var click = `"BorrarCategoria(${id},'${nombre}')"`;
    var value = "Eliminar";

    VentanaModal(body, click, value);
}

function NuevaCategoria(id){
    var categoria = $('#'+id).val();

    var html = `Guardando categoria ${categoria}`;
    MostrarDivBlock(html);
    
    var fecha = FechaActualISO();
    var objItem = { nombre: categoria, fechacreacion: `${fecha}` };
    var obj = {
        url: "http://localhost:8000/api/categorias",
        data: objItem,
        nombreFuncion: CallBackGuardarCategoria
    }  
    console.log(objItem);      
    AjaxPost(obj);
}

function CallBackGuardarCategoria(result){
    OcultarDivBlock();
    alert('Categoría guardada correctamente');
}

function EditarCategoria(id, idTxt, nombre){
    var categoria = $('#'+idTxt).val();

    var html = `Actualizando categoria ${nombre} por categoria ${categoria}`;
    MostrarDivBlock(html);

    var fecha = FechaActualISO();
    var objItem = { nombre: categoria, fechacreacion: `${fecha}` };
    var obj = {
        url: "http://localhost:8000/api/categorias",
        data: objItem,
        nombreFuncion: CallBackActualizarCategoria
    }           
   AjaxPutItem(id, obj)
}

function CallBackActualizarCategoria(result){
    OcultarDivBlock();
    alert('Categoría actualizada correctamente');
}

function BorrarCategoria(id, nombre){
    var html = `Eliminando categoria ${nombre}`;
    MostrarDivBlock(html);    

     var objItem = { id:id };
     var obj = {
         url: "http://localhost:8000/api/categorias",
         data: objItem,
         nombreFuncion: CallBackDeleteCategoria
     }       
     AjaxDeleteItem(obj);

    
}

function CallBackDeleteCategoria(result){
    LoadCategoria(); 
}

