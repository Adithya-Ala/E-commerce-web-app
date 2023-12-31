const Product = require("../models/products");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const products = require("../models/products");

exports.getProductById = ( req,res,next,id ) => {
    Product.findById(id)
    .populate("category")
    .exec((err,product) => {
        if(err) {
            return res.status(400).json({
                error: "Product was not found"
            });
        }
        req.product = product
        next();
    })
} 

exports.createProduct = (req,res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if(err) {
            return res.status(400).json({
                error: "Problem with image"
            });
        }

        //destructure the fields
        const{ name,description,price,category,stock } = fields;

        if(!name || !description || !price || !category || !stock) {
            return res.status(400).json({
                error: "Please include all the fields"
            });
        }


        //todo restrictions
        let product = new Product(fields);

        if(file.photo) {
            if(file.photo.size > 3000000) {
                return res.status(400).json({
                    error: "file size is too big"
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }
        product.save((err,product) => {
            if(err) {
                return res.status(400).json({
                    error: "Saving tshirt in DB Failed"
                });
            }
            res.json(product)
        })
    });
};

exports.getProduct = (req,res) => {
    req.product.photo = undefined;
    return res.json(req.product);
};

exports.photo = (req,res,next)  => {
    if(req.product.photo.data) {
        res.set("Content-Type",req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
};


exports.deleteProduct = (req,res) => { 
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if(err) {
            return res.status(400).json({
                error: "Failed to delete Product"
            })
        }
        res.json({
            message: "Deletion was Success",
            deletedProduct
        })
    })
},

exports.updateProduct = (req,res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err,fields, file) => {
        if(err) {
            return res.status(400).json({
                error: "Problem with image"
            });
        }

        //updation code
        let product = req.product;
        product = _.extend(product, fields)

        if(file.photo) {
            if(file.photo.size > 3000000) {
                return res.status(400).json({
                    error: "file size is too big"
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }
        product.save((err,product) => {
            if(err) {
                return res.status(400).json({
                    error: "Updation of product failed"
                });
            }
            res.json(product)
        });
    });
};


exports.getAllProducts = (req, res) => {
    let limit = req.query.limit ? req.query.limit : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    Product.find()
    .select("-photo")
    .populate("category")
    .limit(limit)
    .sort([[sortBy, "asc"]])
    .exec((err, products) => {
        if(err) {
            return res.status(400).json({
                error: "No products found"
            })
        }
        res.json(products);
    })
};


exports.getAllUniqueCategories = (req,res) => {
    Product.distinct("category", {}, (err,category) => {
        if(err) {
            return res.status(400).json({
                error: "No Category Found"
            })
        }
        res.json(category);
    })
}

exports.updateStock = (req, res, next) => {
    let myOperations = req.body.order.products.map(prod => {
        return {
            updateOne : {
                filter: {_id: prod._id},
                update: {$inc: {stock:-prod.count, sold:+prod.count}}
            }
        }
    })

Product.bulkWrite(myOperations, {}, (err,products) => {
    if(err) {
        return res.status(400).json({
            error: "Bulk operation failed"
        })
    }
    next()
    })
}