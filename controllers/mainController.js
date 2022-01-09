const productos = [
    {
        id:1,
        titulo:"Fimo",
        descripcion:"Sarta aros de fimo, colores variados. Diseña portagafas, collares, shoker y más.",
        precio:"1000",
        img:"fimo.jpg"
    },
    {
        id:2,
        titulo:"Fimo2",
        descripcion:"Sarta aros de fimo, colores variados. Diseña portagafas, collares, shoker y más.",
        precio:"2000",
        img:"fimo.jpg"
    },
    {
        id:3,
        titulo:"Fimo3",
        descripcion:"Sarta aros de fimo, colores variados. Diseña portagafas, collares, shoker y más.",
        precio:"3000",
        img:"fimo.jpg"
    }
]


const controllers ={
        products: (req,res)=>{
            res.render('products')
        },
        home: (req,res)=>{
            res.render('home')
        },
        detalle: (req,res)=>{
            let id = req.params.id;
            let producto = productos.find(detalle =>detalle.id ==id);
            res.render('detalleProducto', {
                titulo:producto.titulo,
                descripcion: producto.descripcion,
                precio: producto.precio,
            })
        },
}



module.exports =controllers;