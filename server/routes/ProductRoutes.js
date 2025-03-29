const express=require("express");
const route=express.Router();
const ProductController=require("../controllers/productController")

route.get("/displayproduct",ProductController.Productdisplay);
route.get("/showfullproduct", ProductController.productAllDisplay);
route.get("/prolist", ProductController.productDisplaybyCat);
route.post("/productratings", ProductController.productRatingSave);
route.get("/audio",ProductController.Audio);
route.post('/search_Product',ProductController.Search_Product)
route.get("/tablet",ProductController.Tablet);
route.get("/mobile",ProductController.Mobile);
// route.post("/removedelete",ProductController.RemoveDelete);

module.exports=route;