function FechaActualISO(){
    var d = new Date();
    var month = ConvertirMesDia(d.getMonth(), 1);
    var date = ConvertirMesDia(d.getDate());

    return d.getFullYear().toString() + month + date;
}

function ConvertirMesDia(value, uno = 0){
    if(value >= 0 && value <= 8) value = "0" + (value + uno).toString();

    return value;
}

function CrearPaginador(view,id){
    //var obj = { first: 0, last: 0 , previous: 0, next:0 };    
    $(id).html('');   
    if (view) {                       
        var pag = { 
            actual: ObtenerNumeroPagina(view["@id"]), 
            first: ObtenerNumeroPagina(view["hydra:first"]), 
            last: ObtenerNumeroPagina(view["hydra:last"]),       
            previous: ObtenerNumeroPagina(view["hydra:previous"]),
            next: ObtenerNumeroPagina(view["hydra:next"])
        }               
                
        var firstActive = "";
        if (pag.actual == pag.first) firstActive = "disabled";

        var prevActive = "disabled";        
        if (pag.previous) {
            prevActive = "";
            if (pag.previous < pag.first) { 
                pag.previous = pag.first;
                prevActive = "disabled";
            }            
        }

        var nextActive = "disabled";        
        if (pag.next) {
            nextActive = "";
            if (pag.next > pag.last) { 
                pag.next = pag.last;
                nextActive = "disabled";
            }            
        }

        var lastActive = "";
        if (pag.actual == pag.last) lastActive = "disabled";

        var pages = "";    
        for (i=1;i<=pag.last;i++){
            var pagActual = "";
            var pagActive = "";
            if (i==pag.actual){
                pagActual = "disabled";
                pagActive = "active"
            }    
            pages = pages + `<li class="page-item ${pagActive}"><button class="btn page-link" ${pagActual} page=${i}>${i}</button></li>`
        }
        var paginador = `
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <li class="page-item"><button class="btn page-link" ${firstActive} page=${pag.first}>Firts</button></li>                        
                            <li class="page-item"><button class="btn page-link" ${prevActive} page=${pag.previous}>Previous</button></li>                        
                            ${pages}
                            <li class="page-item"><button class="btn page-link" ${nextActive} page=${pag.next}>Next</button></li>
                            <li class="page-item"><button class="btn page-link" ${lastActive} page=${pag.last}>Last</button></li>                        
                        </ul>
                    </nav> 
                    `;                    
        $(id).append(paginador);           
    }    
}

function ObtenerNumeroPagina(value){
    if(value) value = value.split("=")[1];    
    return value;
}

function MostrarDivBlock(html){
    var body = $('body');
    body.addClass('overflow-hidden');
    var divBlock = $('#divBlock')
    divBlock.removeClass('d-none');
    var divBlock2 = $('#divBlock2')
    divBlock2.html(html);
    divBlock2.removeClass('d-none');
}

function OcultarDivBlock(){
    var divBlock = $('#divBlock')    
    divBlock.addClass('d-none');
    var divBlock2 = $('#divBlock2')    
    divBlock2.addClass('d-none');
    var body = $('body');
    body.removeClass('overflow-hidden');
}

function VentanaModal(body, click, value){
    var id = "btnBorrarArticulo";
    $(`#${id}`).remove();
    var html = `<div class="modal fade" id="${id}" tabindex="-1" role="dialog" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Articulos</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            ${body}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal" onclick=${click}>${value}</button>
                        </div>
                        </div>
                    </div>
                </div>`;
    $('body').append(html);
    $(`#${id}`).modal('show');
}
