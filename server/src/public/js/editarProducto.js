window.onload = function(){
    const formCrearProducto = document.querySelector('#formCrearProducto');
   
    const errorTitulo = document.querySelector('#errorTitulo');
    const titulo = document.querySelector('#titulo')

    const errorDescripcion = document.querySelector('#errorDescripcion');
    const descripcion = document.querySelector('#descripcion')


    const errorMaterial = document.querySelector('#errorMaterial');
    const material = document.querySelector('#material')


    const errorPrecio = document.querySelector('#errorPrecio');
    const precio = document.querySelector('#precio')

    const errorColores = document.querySelector('#errorColores');
    const colores = document.querySelector('#colores')

   

    console.log('hola desde el form editar');

    const errors = {};

   formCrearProducto.addEventListener('submit', function(ev){
    
                 
        titulo.value.length === 0 || titulo.value.length < 2 ? (errors.titulo = 'Verifique el campo titulo', errorTitulo.innerText = 'campo titulo incorrecto' ): (delete errors.titulo, errorTitulo.innerText = '' );    
        descripcion.value.length === 0 ? (errors.descripcion = 'Verifique el campo descripcion', errorDescripcion.innerText = 'campo descripcion incorrecto' ): (delete errors.descripcion, errorDescripcion.innerText = '' );  
        material.value.length === 0 ? (errors.material = 'Verifique el campo material', errorMaterial.innerText = 'campo material incorrecto' ): (delete errors.material, errorMaterial.innerText = '' );  
        precio.value.length === 0 ? (errors.precio = 'Verifique el campo precio', errorPrecio.innerText = 'campo precio incorrecto' ): (delete errors.precio, errorPrecio.innerText = '' );
        colores.value.length === 0 ? (errors.colores = 'Verifique el campo colores', errorColores.innerText = 'campo colores incorrecto' ): (delete errors.colores, errorColores.innerText = '' );
 
         if(Object.keys(errors).length > 0){
            ev.preventDefault()
        } 
        
        
        
        


    }) 



}
