const fs = require("fs");
const path = require("path");
const modelCrud = require("../data/modelCrud");
//const {validationResult, body} = require("express-validator")
const { validationResult, body } = require("express-validator");

const productModel = modelCrud("factura");

const db = require("../src/database/models");
const req = require("express/lib/request");
const { equal } = require("assert");
const UserTax = require("../src/database/models/User-Tax");

const sequelize = db.sequelize;

const controller = {
  enlaces: (req, res) => {
    if (
      req.session.usuarioLogueado &&
      req.session.usuarioLogueado.categoria == 2
    ) {
      res.render("enlacesDB");
    } else {
      let mensaje = "SU CATEGORIA DE USUARIO NO HABILITA ESTA OPERACION";
      res.render("mensajesDB", { mensaje: mensaje });
    }
  },
  altaType: (req, res) => {
    let array = [
      {
        id: 0,
        type_name: " ",
      },
    ];
    db.ProductType.findAll({
      order: [["id", "ASC"]],
    }).then(function (productTypes) {
      if (productTypes) {
        res.render("altaTypeDb", { array: productTypes });
      } else {
        res.render("altaTypeDb", { array });
      }
    });
  },
  creaType: (req, res) => {
    // inicializo Variables
    let array = [
      {
        id: 0,
        type_name: " ",
      },
    ];
    const errors = validationResult(req);

    db.ProductType.findAll({
      order: [["id", "ASC"]],
    }).then(function (productTypes) {
      //chequea errores
      if (errors.errors.length > 0) {
        // SIGO CON ERROR FANTASMA
        res.render("altaTypeDb", {
          errorsProd: errors.mapped(),
          array: productTypes,
        });
      } else {
        console.log("está en else de alta " + req.body.name);
        let newType = {
          type_name: req.body.name,
        };
        db.ProductType.create(newType);
        res.render("enlacesDB");
      } // termina el IF
    });
  },
  listType: (req, res) => {
    let array = [
      {
        id: 0,
        type_name: " ",
      },
    ];
    db.ProductType.findAll({
      order: [["id", "ASC"]],
    }).then(function (productTypes) {
      if (productTypes) {
        res.render("listTypeDb", { array: productTypes });
      } else {
        res.render("listTypeDb", { array });
      }
    });
  },
  deleteType: (req, res) => {
    db.ProductType.destroy({
      where: {
        id: req.params.id,
      },
    }).then(function () {
      let mensaje = "baja exitosa";
      res.render("mensajesDB", { mensaje: mensaje });
    });
  },
  altaYear: (req, res) => {
    let array = [
      {
        id: 0,
        year_name: " ",
      },
    ];
    db.ProductYear.findAll({
      order: [["id", "ASC"]],
    }).then(function (productYears) {
      if (productYears) {
        res.render("altaYearDb", { array: productYears });
      } else {
        res.render("altaYearDb", { array });
      }
    });
  },
  creaYear: (req, res) => {
    // inicializo Variables
    let array = [
      {
        id: 0,
        year_name: " ",
      },
    ];
    const errors = validationResult(req);
    //
    db.ProductYear.findAll({
      order: [["id", "ASC"]],
    }).then(function (productYear) {
      //chequea errores
      if (errors.errors.length > 0) {
        // SIGO CON ERROR FANTASMA
        res.render("altaYearDb", {
          errorsProd: errors.mapped(),
          array: productYear,
        });
      } else {
        let newYear = {
          year_name: req.body.name,
        };
        db.ProductYear.create(newYear);
        res.render("enlacesDB");
      } // termina el IF
    });
  },
  listYear: (req, res) => {
    let array = [
      {
        id: 0,
        type_name: " ",
      },
    ];
    db.ProductYear.findAll({
      order: [["id", "ASC"]],
    }).then(function (productYears) {
      if (productYears) {
        res.render("listYearDb", { array: productYears });
      } else {
        res.render("listYearDb", { array });
      }
    });
  },
  deleteYear: (req, res) => {
    db.ProductYear.destroy({
      where: {
        id: req.params.id,
      },
    }).then(function () {
      let mensaje = "baja exitosa";
      res.render("mensajesDB", { mensaje: mensaje });
    });
  },

  altaColection: (req, res) => {
    let array = [
      {
        id: 0,
        year_name: " ",
      },
    ];
    db.ProductColection.findAll({
      order: [["id", "ASC"]],
    }).then(function (productColections) {
      if (productColections) {
        res.render("altaColectionDb", { array: productColections });
      } else {
        res.render("altaColectionDb", { array });
      }
    });
  },
  creaColection: (req, res) => {
    // inicializo Variables
    let array = [
      {
        id: 0,
        colection_name: " ",
      },
    ];
    const errors = validationResult(req);
    console.log("la lenght de errores es : " + errors.errors.length);

    //
    db.ProductColection.findAll({
      order: [["id", "ASC"]],
    }).then(function (productColections) {
      //chequea errores
      if (errors.errors.length > 0) {
        res.render("altaColectionDb", {
          errorsProd: errors.mapped(),
          array: productColections,
        });
      } else {
        console.log("está en else de alta " + req.body.name);
        let newColection = {
          colection_name: req.body.name,
        };
        db.ProductColection.create(newColection);
        res.render("enlacesDB");
      } // termina el IF
    });
  },
  listColection: (req, res) => {
    let array = [
      {
        id: 0,
        colection_name: " ",
      },
    ];
    db.ProductColection.findAll({
      order: [["id", "ASC"]],
    }).then(function (productYears) {
      if (productColections) {
        res.render("listColectionDb", { array: productColections });
      } else {
        res.render("listColectionDb", { array });
      }
    });
  },
  deleteYear: (req, res) => {
    db.ProductYear.destroy({
      where: {
        id: req.params.id,
      },
    }).then(function () {
      let mensaje = "BAJA AÑO HA SIDO REALIZADA";
      res.send("mensajesDB", { mensaje: mensaje });
    });
  },
  Colection: (req, res) => {
    let array = [
      {
        id: 0,
        type_name: " ",
      },
    ];
    db.ProductColection.findAll({
      order: [["id", "ASC"]],
    }).then(function (productColections) {
      if (productColections) {
        res.render("listColectionDb", { array: productColections });
      } else {
        res.render("listColectionDb", { array });
      }
    });
  },
  deleteColection: (req, res) => {
    db.ProductColection.destroy({
      where: {
        id: req.params.id,
      },
    }).then(function () {
      let mensaje = "baja exitosa";
      res.render("mensajesDB", { mensaje: mensaje });
    });
  },
  altaColor: (req, res) => {
    let array = [
      {
        id: 0,
        year_name: " ",
      },
    ];
    db.ProductColor.findAll({
      order: [["id", "ASC"]],
    }).then(function (productColors) {
      if (productColors) {
        res.render("altaColorDb", { array: productColors });
      } else {
        res.render("altaColorDb", { array });
      }
    });
  },
  creaColor: (req, res) => {
    // inicializo Variables
    let array = [
      {
        id: 0,
        color_name: " ",
        color_image: " ",
      },
    ];
    const errors = validationResult(req);
    //
    db.ProductColor.findAll({
      order: [["id", "ASC"]],
    }).then(function (productColors) {
      //chequea errores
      if (errors.errors.length > 0) {
        res.render("altaColorDb", {
          errorsProd: errors.mapped(),
          array: productColors,
        });
      } else {
        let newColor = {
          color_name: req.body.name,
          color_image: req.body.image,
        };
        db.ProductColor.create(newColor);
        res.render("enlacesDB");
      } // termina el IF
    });
  },
  listColor: (req, res) => {
    let array = [
      {
        id: 0,
        type_name: " ",
      },
    ];
    db.ProductColor.findAll({
      order: [["id", "ASC"]],
    }).then(function (productColors) {
      if (productColors) {
        res.render("listColorDb", { array: productColors });
      } else {
        res.render("listColorDb", { array });
      }
    });
  },
  deleteColor: (req, res) => {
    db.ProductColor.destroy({
      where: {
        id: req.params.id,
      },
    }).then(function () {
      let mensaje = "baja exitosa";
      res.render("mensajesDB", { mensaje: mensaje });
    });
  },
  altaProduct: (req, res) => {
    //VER LA AUTORIZACIÓN SEGURAMENTE LA PONGO EN ENLACES.. POR AHORA SIN AUTO
  
    // FALTA VER QUE PASA CON UN PRODUCTO QUE TIENE VARIOS COLORES . ver en VALIDATOR
    let cantidades = [];
    let colors = db.ProductColor.findAll();
    let years = db.ProductYear.findAll();
    let types = db.ProductType.findAll();
    let colections = db.ProductColection.findAll();
    Promise.all([colors, years, types, colections]).then(function ([
      productColors,
      productYears,
      productTypes,




      
      productColections,
    ]) {
      return res.render("altaProductDB", {
        colors: productColors,
        years: productYears,
        types: productTypes,
        colections: productColections,
        cantidades,
      });
    });
  },
  creaProduct: (req, res) => {
    const errors = validationResult(req);

    if (errors.errors.length > 1) {
      /*ver esto porque hay un error que no encuentro y puse 1 */

      /*armo valores para modificar falta CUANDO HAGA MODIFICAFR */

      let colors = db.ProductColor.findAll();
      let years = db.ProductYear.findAll();
      let types = db.ProductType.findAll();
      let colections = db.ProductColection.findAll();

      Promise.all([colors, years, types, colections]).then(function ([
        productColors,
        productYears,
        productTypes,
        productColections,
      ]) {
        return res.render("altaProductoDB", {
          errorsProd: errors.mapped(),
          colors: productColors,
          years: productYears,
          types: productTypes,
          colections: productColections,
        });
      });
    }
    if (errors.errors.length == 1) {
      db.Product.create({
        name: req.body.name,
        description: req.body.description,
        description2: req.body.description2,
        price: req.body.price,
        dto: req.body.descuento,
        //created : new DATE(),
        id_colection: req.body.colection,
        id_product_year: req.body.anio,
        id_type: req.body.tipo,
        image_ppal: req.body.imagenPPAL,
        image_back: req.body.imagenDORSO,
        image_det1: req.body.imagenDetalle1,
        image_det2: req.body.imagenDetalle2,
        image_det3: req.body.imagenDetalle3,
      })

        .then(function (product) {
          // tengo que pasar un array
          //tengo armar el input como una array y modificar en validator
          return product.setColoresDB(req.body.colores);
        })
        .then(function () {
          let mensaje = "alta exitosa";
          res.render("mensajesDB", { mensaje: mensaje });
        });
    }
    ///******************************************* */
  },
  listarProduct: (req, res) => {
    let array = [];
    db.Product.findAll({
      order: [["id", "ASC"]],
    }).then(function (products) {
      if (products) {
        res.render("listProductsDB", { array: products });
      } else {
        res.render("listProductsDB", { array });
      }
    });
  },
  armarApi: async (req, res) => {
    let productos = await db.ProductType.findAll({
      include: ["typesP"],
    });
    return res.json(productos);
  },
  detailOneDB: (req, res) => {
    let producto = db.Product.findOne({
      where: {
        id: req.params.id,
      },
      //  include :["coloresDB"],
      include: ["pYear", "pColection", "pType", "coloresDB"],
    });
    let colors = db.ProductColor.findAll();
    let years = db.ProductYear.findAll();
    let types = db.ProductType.findAll();
    let colections = db.ProductColection.findAll();

    Promise.all([producto, colors, years, types, colections]).then(function ([
      product,
      productColors,
      productYears,
      productTypes,
      productColections,
    ]) {
      //return  res.json(product)
      return res.render("updateProductoDB", {
        colors: productColors,
        years: productYears,
        types: productTypes,
        colections: productColections,
        producto: product,
      });
    });
    //let producto = productModel.find(id);
    //res.render("updateProductoDB",{producto:producto,colors,years,types,colections})
  },
  storeUpdate: (req, res) => {
    // queda analizar la validación de colores.
    let id = req.params.id;
    const errors = validationResult(req);
    console.log("la lenght de errores es : " + errors.errors.length);
    if (errors.errors.length > 1) {
      //*** */
      let producto = db.Product.findOne({
        where: {
          id: req.params.id,
        },
        //  include :["coloresDB"],
        include: ["pYear", "pColection", "pType", "coloresDB"],
      });
      let colors = db.ProductColor.findAll();
      let years = db.ProductYear.findAll();
      let types = db.ProductType.findAll();
      let colections = db.ProductColection.findAll();

      Promise.all([producto, colors, years, types, colections]).then(function ([
        product,
        productColors,
        productYears,
        productTypes,
        productColections,
      ]) {
        //return  res.json(product)
        return res.render("updateProductoDB", {
          colors: productColors,
          years: productYears,
          types: productTypes,
          colections: productColections,
          producto: product,
          errorsProd: errors.mapped(),
        });
      });
    } else {
      // acordarse de error oculto por eso el 1
      if (errors.errors.length == 1) {
        db.Product.update(
          {
            name: req.body.name,
            description: req.body.description,
            description2: req.body.description2,
            price: req.body.price,
            //falta tema imagenes
            dto: req.body.descuento,
            //created : new DATE(),
            id_colection: req.body.colection,
            id_product_year: req.body.anio,
            id_type: req.body.tipo,
            image_ppal: req.body.imagenPPAL,
            image_back: req.body.imagenDORSO,
            image_det1: req.body.imagenDetalle1,
            image_det2: req.body.imagenDetalle2,
            image_det3: req.body.imagenDetalle3,
          },
          {
            where: {
              id: req.params.id,
            },
          }
        )
          .then(function () {
            return db.Product.findByPk(req.params.id);
          })
          .then(function () {
            let mensaje = "modificación exitosa";
            return res.render("mensajesDB", { mensaje: mensaje });
          });
      }
    }
  },
  irBajaProduct: (req, res) => {
    res.render("listProdBAJADB");
  },
  bajaProducto: (req, res) => {
    /* reconfirmar que quiere dar de baja */
    /* reconfirmar que quiere dar de baja */
    //let id = req.params.id
    //let producto = productModel.find(id);
    db.Product.findByPk(req.params.id).then(function (product) {
      res.render("bajaProductoDB", { producto: product });
    });

    //llamo a la tabla pivot
    //elimino todos los registros de la tabla pivot que tengan el id
  },
  storeDelete: (req, res) => {
    //llamo a la tabla pivot
    //elimino todos los registros de la tabla pivot que tengan el id
    if (req.body.params < 12) {
      let mensaje = "NO PUEDE DAR DE BAJA ESTE PRODUCTO-DESARROLLO";
      res.render("mensajesDB", { mensaje: mensaje });
    }
    db.ProductColorProduct.destroy({
      where: {
        id_product: req.params.id,
      },
    })
      .then(function () {
        //elimino la pelicula
        return db.Product.destroy({
          where: {
            id: req.params.id,
          },
        });
      })
      .then(function () {
        let mensaje = "baja exitosa";
        return res.render("mensajesDB", { mensaje: mensaje });
      });
  },
  listarProductosRemito: (req, res) => {
    let array = [];

    db.Product.findAll({
      order: [["id", "ASC"]],
      include: ["coloresDB"],
    }).then(function (products) {
      //return res.json(products)
      if (products) {
        res.render("listProdRtosDB", { array: products });
      } else {
        res.render("listProdRtosDB", { array });
      }
    });
  },
  cargaRemitos: (req, res) => {
    let producto = db.Product.findOne({
      where: {
        id: req.params.id,
      },
      include: ["coloresDB"],
    });
    let coloresProd = db.ProductColorProduct.findAll({
      where: {
        id_product: req.params.id,
      },
    });

    Promise.all([producto, coloresProd]).then(function ([
      product,
      productColorProducts,
    ]) {
      return res.render("remitosDB", {
        producto: product,
        coloresProd: productColorProducts,
      });
    });
  },
  storeRemitos: (req, res) => {
    const errors = validationResult(req);
    console.log(req.body);
    if (req.body) {
      let suma = 0;
      for (i = 0; i < req.body.idRegistro.length; i++) {
        suma =
          parseInt(req.body.cantidadStock[i]) + parseInt(req.body.cantidad[i]);
        db.ProductColorProduct.update(
          {
            quantity: suma,
            dispach: req.body.remito[i],
          },
          {
            where: {
              id: req.body.idRegistro[i],
            },
          }
        );
      } // el del for
    } else {
      res.send("ver que pasó ");
    }
    res.render("enlacesDB");
  },
  detail: (req, res) => {
    /*busco producto y oferta semanal */
    productoD = db.Product.findOne({
      where: {
        id: req.params.id,
      },
      include: ["pType", "pYear", "pColection", "coloresDB"],
    });
    ofertaD = db.ProductSale.findOne({
      where: {
        id_product: req.params.id,
      },
    });
    Promise.all([productoD, ofertaD]).then(function ([product, productSale]) {
      if (productSale) {
        return res.render("detallProdNuevoDB", {
          producto: product,
          oferta: productSale,
        });
      } else {
        oferta = [];
        return res.render("detallProdNuevoDB", {
          producto: product,
          oferta: productSale,
        });
      }
    });
  },
  comprar: async (req, res) => {
    if (!req.session.usuarioLogueado) {
      res.render("loginDB");
    } else {
      const errors = validationResult(req);
      if (errors.errors.length > 0) {
        res.render("detallProdNuevoDB", { errorsProd: errors });
      } else {
        // cargo las bases que quiero usar
        try {
          let impuesto = await db.UserTax.findOne({
            where: {
              id_user: req.session.usuarioLogueado.id,
            },
          });
          if (!impuesto) {
            res.render("formularioTaxesDB");
          } else {
            // de impuesto
            /*guardo los datos de impuestos para acompañar la factura en endCarrito */
            let impuestos = {
              id_user: impuesto.id_user,
              tax_condition: impuesto.tax_condition,
              cuit: impuesto.cuit,
              cuil: impuesto.cuil,
              ingresosBrutos: impuesto.ingresosBrutos,
              retGanancias: impuesto.retGanancias,
            };
            // calcula todos los descuentos y el total item
            // revisa si hay también precio de OFERTA SEMANAL
            let aux3 = 0;
            let precioBody = parseInt(req.body.precio);
            let dtoBody = parseInt(req.body.descuento);
            let precioSub = precioBody * parseInt(req.body.cantidadProducto);
            let dto = 100 - dtoBody;
            let aux2 = 0;
            aux3 = dto * 0.01;
            let aux1 = precioSub * aux3;
            if (req.body.ofertaSem != undefined) {
              let saleBody = parseInt(req.body.ofertaSem);
              let sale = 100 - saleBody;
              aux3 = sale * 0.01;
              aux2 = aux1 * aux3;
            } else {
              // de ofertaSem
              aux2 = aux1;
            }
            // termina los cálculos precio unitario
            let compra = await db.InvoiceItem.create({
              id_product: req.params.id,
              quantity: req.body.cantidadProducto,
              item_u_price: aux2,
              id_user: req.session.usuarioLogueado.id,
              made: 0,
            });
            let otrasCompras = await db.InvoiceItem.findAll({
              where: {
                id_user: req.session.usuarioLogueado.id,
                made: 0,
              },
              include: ["itemProduct"],
            });
            //return res.json(otrasCompras)
            let suma = 0;
            let montoItem = 0;
            //return res.json(otrasCompras)
            for (i = 0; i < otrasCompras.length; i++) {
              if (
                otrasCompras[i].item_u_price !== 0 ||
                otrasCompras[i].item_u_price !== undefined
              ) {
                // res.json(otrasCompras)
                montoItem = parseInt(otrasCompras[i].item_u_price);
                suma = suma + montoItem;
              } // fin del if
            } // final del for

            res.render("carritoDB", {
              compras: otrasCompras,
              suma: suma,
              impuestos: impuestos,
            });
          } // el else de impuestos
        } catch (error) {
          // cierra el try
          console.log(error);
        }
      } // fin if errors
    } // fin usuarioLogueado
  },
  homeCarrito: async (req, res) => {
   
      if (!req.session.usuarioLogueado) {
        res.render("loginDB");
      } else {
       
          // cargo las bases que quiero usar
          try {
            let impuesto = await db.UserTax.findOne({
              where: {
                id_user: req.session.usuarioLogueado.id,
              },
            });
            if (!impuesto) {
              res.render("formularioTaxesDB");
            } else {
              // de impuesto
              /*guardo los datos de impuestos para acompañar la factura en endCarrito */
              let impuestos = {
                id_user: impuesto.id_user,
                tax_condition: impuesto.tax_condition,
                cuit: impuesto.cuit,
                cuil: impuesto.cuil,
                ingresosBrutos: impuesto.ingresosBrutos,
                retGanancias: impuesto.retGanancias,
              };
              // calcula todos los descuentos y el total item
              // revisa si hay también precio de OFERTA SEMANAL
              /*let aux3 = 0;
              let precioBody = parseInt(req.body.precio);
              let dtoBody = parseInt(req.body.descuento);
              let precioSub = precioBody * parseInt(req.body.cantidadProducto);
              let dto = 100 - dtoBody;
              let aux2 = 0;
              aux3 = dto * 0.01;
              let aux1 = precioSub * aux3;
              if (req.body.ofertaSem != undefined) {
                let saleBody = parseInt(req.body.ofertaSem);
                let sale = 100 - saleBody;
                aux3 = sale * 0.01;
                aux2 = aux1 * aux3;
              } else {
                // de ofertaSem
                aux2 = aux1;
              }
              // termina los cálculos precio unitario
              let compra = await db.InvoiceItem.create({
                id_product: req.params.id,
                quantity: req.body.cantidadProducto,
                item_u_price: aux2,
                id_user: req.session.usuarioLogueado.id,
                made: 0,
              }); */
              let otrasCompras = await db.InvoiceItem.findAll({
                where: {
                  id_user: req.session.usuarioLogueado.id,
                  made: 0,
                },
                include: ["itemProduct"],
              });
              if ( otrasCompras.length === 0 ){
                let mensaje = "No tiene compras en CARRITO , elija un producto e inicie la compra";
                 res.render("mensajesDB", { mensaje: mensaje });
              }
              else { // SI tiene compras en carrito 
              //return res.json(otrasCompras)
            
                let suma = 0;
                let montoItem = 0;
                //return res.json(otrasCompras)
                for (i = 0; i < otrasCompras.length; i++) {
                  if (
                    otrasCompras[i].item_u_price !== 0 ||
                    otrasCompras[i].item_u_price !== undefined
                  ) {
                  // res.json(otrasCompras)
                  montoItem = parseInt(otrasCompras[i].item_u_price);
                  suma = suma + montoItem;
                 } // fin del if
                } // final del for
  
              res.render("carritoDB", {
                compras: otrasCompras,
                suma: suma,
                impuestos: impuestos,
              });
            } // else de si no tiene compras
            
            } // el else de impuestos
          } catch (error) {
            // cierra el try
            console.log(error);
          }
        
      } // fin usuarioLogueado
    
  },
  borraCarrito: (req, res) => {
    if (req.session.usuarioLogueado.id) {
      db.InvoiceItem.destroy({
        where: {
          id_user: req.session.usuarioLogueado.id,
          made: 0,
        },
      }).then(function () {
        let mensaje = "Se ha eliminado compras en CARRITO ";
        return res.render("mensajesDB", { mensaje: mensaje });
      });
    } else {
      // de usaurio Logueado
      res.render("loginDB");
    }
  },
  finComprar: (req, res) => {
    let row = productModel.find(0);
    let suma = parseInt(req.params.suma);
    let impuestos = {
      tax_condition: req.body.taxCondicion,
      cuit: req.body.taxCuit,
      cuil: req.body.taxCuil,
      ingresosBrutos: req.body.taxBrutos,
      retGanancias: req.body.taxGanancias,
    };
    res.render("finCarritoDB", {
      facturacion: row,
      suma: suma,
      impuestos: impuestos,
    });
  },
  creaFactura: async (req, res) => {
    let total1 = parseInt(req.params.suma);

    try {
      // actualiza el nro de factura en JSON
      // busco el nro de factura
      let facturacion = productModel.find(0);
      let numeroFact = facturacion.numero + 1;
      let facturaData = {
        id: 0,
        numero: numeroFact,
        standard: facturacion.standard,
        premiun: facturacion.premiun,
      };
      productModel.update(facturaData);
      /*arma datos Factura*/
      let factura = {
        number: numeroFact,
        id_user: req.session.usuarioLogueado.id,
        delivery_dir: req.body.direccion,
        delivery_cost: req.body.costoDistribucion,
        total: total1,
      };
      /*guardo los datos de impuestos para acompañar la factura en endCarrito */
      let impuestos = {
        tax_condition: req.body.taxCondicion,
        cuit: req.body.taxCuit,
        cuil: req.body.taxCuil,
        ingresosBrutos: req.body.taxBrutos,
        retGanancias: req.body.taxGanancias,
      };
      /*arma datos impositivos */

      // actualiza el numero en invoiceItem
      let item = await db.InvoiceItem.update(
        {
          made: numeroFact,
        },
        {
          where: {
            id_user: req.session.usuarioLogueado.id,
            made: 0,
          },
        }
      );
      total1 = total1 + parseInt(req.body.costoDistribucion);

      res.render("carritoRegistraDB", {
        datos: factura,
        user: req.session.usuarioLogueado,
        impuestos: impuestos,
      });
    } catch (error) {
      // final del try
      console.log(error);
    }
    //} // final del else
  },
  endCompra: async (req, res) => {
    let factura = await db.Invoice.create({
      number: req.body.factura,
      id_user: req.body.idUsuario,
      delivery_dir: req.body.direccion,
      delivery_cost: req.body.costoEnvio,
      total: req.body.total,
    });
    let mensaje = "SE CREO FACTURA EXISTOSAMENTE";
    res.render("mensajesDB", { mensaje: mensaje });
  },
  altaTaxes: (req, res) => {
    res.render("formularioTaxesDB");
  },
  storeTaxes: (req, res) => {
    const errors = validationResult(req);

    if (errors.errors.length > 0) {
      res.render("formularioTaxesDB", { errorsProd: errors });
    } else {
      db.UserTax.create({
        id_user: req.session.usuarioLogueado.id,
        tax_condition: req.body.condicion,
        cuil: req.body.cuil,
        cuit: req.body.cuit,
        ingresosBrutos: req.body.brutos,
        retGanancias: req.body.ganancias,
      }).then(function () {
        if (req.session.usuarioLogueado.cproduct !== 0) {
          db.Product.findOne({
            where: {
              id: req.session.usuarioLogueado.cprod.id,
            },
            include: ["pType", "pYear", "pColection", "coloresDB"],
          }).then(function (product) {
            //return res.json(product)
            res.render("detallProdNuevoDB", { producto: product });
          });
        }
        res.redirect("/");
      });
    } // fin de else
  },
  prodPorType: (req, res) => {
    db.Product.findAll({
      where: {
        id_type: req.params.id,
      },
      include: ["pType"],
    }).then(function (products) {
      if (products) {
        let mensaje2 = products[0].pType.type_name;
        let mensaje = "TIPOS DE PRODUCTOS ";
        //return res.json(products)
        res.render("listProductGRALDB", {
          array: products,
          mensaje: mensaje,
          mensaje2: mensaje2,
        });
      } else {
        let mensaje = "no hay productos disponibles";
        res.render("mensajesDB", { mensaje: mensaje });
      }
    });
  },
  mostrarOfertas: (req, res) => {
    db.ProductSale.findAll({
      include: ["saleP"],
    }).then(function (productSales) {
      //return res.json(productSales)
      if (productSales) {
        res.render("ofertasDB", { produSales: productSales });
      } else {
        let mensaje = "NO HAY OFERTAS DISPONIBLES ";
        res.render("mensajesDB", { mensaje: mensaje });
      }
    });
  },
  updateOfertas: (req, res) => {
    let produSales = db.ProductSale.findAll({
      include: ["saleP"],
    });
    let productos = db.Product.findAll();
    Promise.all([produSales, productos]).then(function ([
      productSales,
      products,
    ]) {
      // return res.json(productSales)
      if (productSales) {
        //return  res.json(products)
        return res.render("updateOfertas", {
          productos: products,
          produSales: productSales,
        });
      } else {
        let produSales = [];
        let saleP = [];
        return res.render("updateOfertas", {
          productos: products,
          produSales: produSales,
          saleP: saleP,
        });
      }
    });
  },
  storeOfertas: (req, res) => {
    const errors = validationResult(req);

    if (errors.errors.length > 0) {
      let prodSales = db.ProductSale.findAll({
        include: ["saleP"],
      });
      let productos = db.Product.findAll();
      Promise.all([prodSales, productos]).then(function ([
        productSales,
        products,
      ]) {
        if (typeof productSales == !undefined) {
          return res.render("updateOfertas", {
            productos: products,
            produSales: productSales,
            errorsProd: errors.mapped(),
          });
        } // en else de errores
        else {
          let produSales = [];
          let saleP = [];
          return res.render("updateOfertas", {
            productos: products,
            produSales: produSales,
            saleP: saleP,
            errorsProd: errors.mapped(),
          });
        }
      });
    } else {
      for (i = 0; i < req.body.producto.length; i++) {
        db.ProductSale.update(
          {
            dtoSale: req.body.descuento,
            id_product: req.body.producto[i],
          },
          {
            where: {
              id: i,
            },
          }
        );
      }
      let mensaje = "SE HA MOIFICADO OFERTA SEMANAL";
      res.render("mensajesDB", { mensaje: mensaje });
    } // fin del else
  },
  search: (req, res) => {
    let verprimera = req.query.busca.split(" ");
    let busca1 = verprimera[0];
    let idBusca = verprimera[1];
    switch (busca1) {
      case "C":
        db.Product.findAll({
          where: {
            id_colection: idBusca,
          },
          include: ["pType", "pColection", "pYear", "coloresDB"],
        }).then(function (products) {
          // if(req.query.nombre == "todos"){
          if (products.length > 0) {
            let mensaje = "Productos según Colección ";
            mensaje2 = products[0].pColection.colection_name;
            res.render("listProductGRALDB", {
              array: products,
              mensaje: mensaje,
              mensaje2: mensaje2,
            });
          } else {
            let mensaje = "No Hay productos que coincidan con su BÚSQUEDA";
            res.render("mensajesDB", { mensaje: mensaje });
          }
        });
        break;
      case "Y":
        db.Product.findAll({
          where: {
            id_product_year: idBusca,
          },
          include: ["pType", "pColection", "pYear", "coloresDB"],
        }).then(function (products) {
          // if(req.query.nombre == "todos"){
          if (products.length > 0) {
            let mensaje = "Tu Selección de Productos por Año Lanzamiento";
            let mensaje2 = products[0].pYear.year_name;
            res.render("listProductGRALDB", {
              array: products,
              mensaje: mensaje,
              mensaje2: mensaje2,
            });
          } else {
            let mensaje = "NO hay productos que coincidan con su BÚSQUEDA ";
            res.render("mensajesDB", { mensaje: mensaje });
          }
          // return res.json(products)
        });
        break;
      case "T":
        db.Product.findAll({
          where: {
            id_type: idBusca,
          },
          include: ["pType", "pColection", "pYear", "coloresDB"],
        }).then(function (products) {
          // if(req.query.nombre == "todos"){
          if (products.length > 0) {
            let mensaje = "Tu Selección de Productos ";
            let mensaje2 = products[0].pType.type_name;
            res.render("listProductGRALDB", {
              array: products,
              mensaje: mensaje,
              mensaje2: mensaje2,
            });
          } else {
            let mensaje = "NO hay productos que coincidan con su BÚSQUEDA ";
            res.render("mensajesDB", { mensaje: mensaje });
          }
          //return res.json(products)
        });
        break;
      case "all":
        db.Product.findAll({
          include: ["pType", "pColection", "pYear", "coloresDB"],
        }).then(function (products) {
          // if(req.query.nombre == "todos"){
          let mensaje = "Todos los productos Disponibles ";
          let mensaje2 = "";
          res.render("listProductGRALDB", {
            array: products,
            mensaje: mensaje,
            mensaje2: mensaje2,
          });
          //return res.json(products)
        });
        break;
      case "O":
        let mensaje =
          "SELECCIONÁ EL ICONO % EN LA BARRA para ver las OFertas de la Semana ";
        res.render("mensajesDB", { mensaje: mensaje });
        break;
      default:
        res.send("error en búsqueda");
    }
  },
  carrito: (req, res) => {
    res.render("carritoDeCompras");
  },
  finCarrito: (req, res) => {
    res.render("finCarrito");
  },
  list: (req, res) => {
    let productsFound = productModel.all();
    res.render("listProductos", { products: productsFound });
  },
  probar: (req, res) => {
    console.log("en probar ver que hay en req.session");
    console.log("el id" + req.session.usuarioLogueado);
    console.log("el producto" + req.session.usuarioLogueado);
  },
};

module.exports = controller;
