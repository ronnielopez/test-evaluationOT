let modeloId = '';

//get Informacion del pedido
$(window).load(function () {
      
    let token = getToken();
    
    let TokenHash = atob(token);

    //Mostramos los valores en consola:
    let expresionRegular = /\s*,\s*/;
    let datos = TokenHash.split(expresionRegular);
    
    modeloId = datos[0];
    
    document.getElementById('Title').innerHTML = "Cuéntanos de tu experiencia en la reparación de tu " + datos[2];
    document.getElementById('subTitle').innerHTML = "Evalua el servicio brindado por "+ datos[1] + " (mecanico) "; 

});



$("#send").click(() => {
    let rating = $("input[type='radio'][name='rating']:checked").val();
    let comentary = $('#comentary').val();
    if (rating === undefined) {
        rating = 0;
    }
    send(rating , comentary);
});

function send(rating , comentary) {
    const data = {
        "work_order_grade": rating,
        "work_order_grade_comment": comentary
    }

    axios.put(`http://localhost:5000/api/work_order_grade/${modeloId}` , data)
    .then((response) =>{
        Swal.fire({
            icon: 'success',
            title: 'Gracias',
            text: 'Tu opinion es muy importante!'
          }).then(()=>{
            window.location.replace('https://www.facebook.com/dastechsv');
          })
          
    });

}

function getToken(){

    let loc = window.location.href;

    if(loc.indexOf('?')>0)
    {
        let Token = loc.split('?')[1];
        
        return(Token);
    }
}