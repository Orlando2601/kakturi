const controllers ={
        products: (req,res)=>{
            res.render('products')
        },
        home: (req,res)=>{
            res.render('home')
        },
}
module.exports =controllers;