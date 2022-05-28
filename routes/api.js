var express = require('express');
var router = express.Router();
const apisController= require("../controllers/api/apisController");

router.get('/users', apisController.usersList);
router.get("/users/:id" , apisController.userDetail);
//
router.get("/orders", apisController.amountOrder);
router.get("/categories", apisController.categoriesList);
// categorias type/colection/year
router.get("/subcategories", apisController.subcategoryList);
router.get("/colectionCategories", apisController.colectionList)
router.get("/yearCategories", apisController.yearList)
router.get('/products', apisController.productsList);
//
router.get("/products/:id", apisController.productDetail);
router.post("/cart/update", apisController.updateCart);
//router.post("/users/checkPassword", apisController.checkPassword)
//router.post("/users/updatePassword" , apisController.updatePassword);
module.exports = router;