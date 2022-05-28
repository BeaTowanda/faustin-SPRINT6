const db = require("../../src/database/models")
const sequelize = db.sequelize;

const apis = {
usersList: function (req, res){
    db.User.findAll().then(users => {
        let newData = users.map(user => {
            return {
                id: user.id,
                userName: user.userName,
                first_name : user.first_name,
                last_name: user.last_name,
                email: user.email, 
                bornDate: user.bornDate,   
                endpoint: "/api/users/" + user.id
            }
        })
        let respuesta = {
            meta:{
                status: 200,
                total_users: users.length ,
                url: "/api/users"
            },
            data: newData 
        }
        res.json(respuesta) 
    })         
},
userDetail: function (req, res) {
    db.User.findByPk(req.params.id).then(resultado => {
        let jsonProducto = {
            meta:{
                status: 200,
                url: "/api/users/"+ req.params.id
            },
            data: {
                id: resultado.id,
                userName: resultado.name,
                first_name:resultado.first_name,
                last_name: resultado.last_name,
                email: resultado.email,
                bornDate: resultado.bornDate         
            }
        }
        res.json(jsonProducto);
    })
},
productsList: async function (req, res){

    let products = await db.Product.findAll({
      //  order:[
      //     ["id", "DESC"], 
      //  ],
        include: ["pYear", "pColection", "pType", "coloresDB"]
        //["images", "subcategory", "colors"] 
        
    })

    let lastProducts = await db.Product.findAll({
        //include:["images"],
      //  order: [
       //     [ 'DESC'],
       // ],
        limit: 5
    })

    products.forEach(product =>{
        product.setDataValue("endpoint", "/api/products/" + product.id);
    })
    
    lastProducts.forEach(product => {
        product.setDataValue("endpoint", "/api/products/" + product.id);
    })

    let jsonProducts = {
        meta:{
            status: 200,
            total_products: products.length,
            lastProducts: lastProducts,
            url: "/api/products"
        },
        data:products
    }
    res.json(jsonProducts)

},
productDetail: function(req, res){
    db.Product.findByPk(req.params.id, {
        include:["pYear", "pColection", "pType", "coloresDB"]
        //["subcategory","colors"]
    }).then(product =>{
        let productJson = {
            data:{
                id: product.id,
               //code: product.code,
                name: product.name,
                price: product.price,
                description: product.description,
                //data_color:product.coloresDB,
                //data_color: product.colors,
                data_subcategory : product.id_type
                //data_subcategory: product.subcategory
            }
        }
        res.json(productJson)
    })
},
amountOrder: function (req, res) {
    //db.Order.findAll({
        db.Invoice.findAll({
       // include: ["items"]
    })
    .then(resultado => {
        let jsonOrders = {
            meta:{
                status:200,
                url: "/api/orders",
                total_orders: resultado.length
            },
            data: resultado
        }

        res.json(jsonOrders)
    })
},
categoriesList: async function(req, res){
    //let categories = await db.Category.findAll({
    //    include:["subcategories"]
    let categories = await db.ProductType.findAll({
        //order : [
        //    ["id_category"],
        //],
        //include : ["ptype"]
    })
    let categoriesJson = {
        meta:{
            status:200,
            url: "/api/categories",
        },
        data: categories
    }
    res.json(categoriesJson);
},
subcategoryList: async function(req, res){
/*    let subcategories = await db.Subcategory.findAll({
        include: ["products"]
    })
    let quantityProducts = subcategories.map(subcategory =>{
        return {
            name: subcategory.name,
            count: subcategory.products.length
        }
    })*/
    let subcategories = await db.ProductType.findAll({
        include : ["typesP"]
    })
    //return res.json(subcategories)
    let quantityProducts = subcategories.map(subcategories =>{
        return {
            name : subcategories.type_name,
            count : subcategories.typesP.length
        }
    })

    let subcategoriesJson = {
        meta:{
            status:200,
            url:"/api/subcategories",
            quantityProducts
        },
        data: subcategories
    }
    res.json(subcategoriesJson)
}, 
colectionList: async function(req, res){
 
        let colectionCategories = await db.ProductColection.findAll({
            include : ["colectionP"]
        })
        //return res.json(subcategories)
        let quantityProducts = colectionCategories.map(colectionCategories =>{
            return {
                name : colectionCategories.colection_name,
                count : colectionCategories.colectionP.length
            }
        })
    
        let colectionCategoriesJson = {
            meta:{
                status:200,
                url:"/api/colectionCategories",
                quantityProducts
            },
            data: colectionCategories
        }
        res.json(colectionCategoriesJson)
    },
yearList: async function(req, res){
 
    let yearCategories = await db.ProductYear.findAll({
            include : ["yearsP"]
        })
        //return res.json(subcategories)
        let quantityProducts = yearCategories.map(yearCategories =>{
            return {
                name : yearCategories.year_name,
                count : yearCategories.yearsP.length
            }
        })
    
        let yearCategoriesJson = {
            meta:{
                status:200,
                url:"/api/yearCategories",
                quantityProducts
            },
            data: yearCategories
        }
        res.json(yearCategoriesJson)
    },
updateCart: async function(req, res){
    await db.Item.update({
        subtotal: Number(req.body.quantity) * Number(req.body.unit_price),
        quantity: Number(req.body.quantity),
    },{
        where:{
            user_id: req.session.usuarioLogueado.id,
            order_id: null,
            product_name: req.body.product_name
        }
    })
    let item = await db.Item.findOne({
        where: {
            user_id: req.session.usuarioLogueado.id,
            order_id: null ,
            product_name: req.body.product_name
        }
    })

    res.json(item)
}
}

module.exports = apis