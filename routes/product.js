const express = require("express");
const router = express.Router();

const{isSignedIn,isAdmin,isAuthenticated,} = require("../controllers/auth");
const{getUserById} = require("../controllers/user");

const{
    getProductById,
    createProduct,
    getProduct,
    photo,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getAllUniqueCategories
} = require("../controllers/product");
  


router.param("userId",getUserById);
router.param("productId",getProductById);

//create
router.post(
    "/product/create/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    createProduct
    );


//read
router.get("/product/:productId",getProduct);
router.get("/product/photo/:productId",photo);

//update
router.put(
    "/product/:productId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateProduct
    );

//delete
router.delete(
    "/product/:productId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    deleteProduct
    );


router.get("/products",getAllProducts);

router.get("/products/categories", getAllUniqueCategories);


module.exports = router;