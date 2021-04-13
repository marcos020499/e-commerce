const express = require('express');
const router = express.Router();
const { Product } = require("../models/Product");
const multer = require('multer');
const crypto = require("crypto");
router.post('/crear', async(req, res) => {
    const products = new Product(req.body);
    const db = await products.save();
    res.status(201).json(db);
});
router.delete('/listar/:id', async(req, res) => {
    const products = await Product.findByIdAndRemove(req.params.id
        );
        res.status(200).json(products);
});
router.post('/editar/:id', async(req, res) => {
    const products = await Product.findByIdAndUpdate(req.params.id, {
        $set: req.body
      });
    const db = await products.save();
    res.status(201).json(db);
});
router.get('/filtrar/:id', async(req, res) => {
    const products = await Product.findById(
        req.params.id
      );
      res.status(200).json(products);
});
router.get('/filtrar1/:name', async(req, res) => {
    const products = await Product.find(
        req.params
      );
      res.status(200).json(products);
});
router.get('/price0', async(req, res) => {
    const products = await Product.find(
        {'price': {$gt : 0, $lt: 2000 }}
      );
      res.status(200).json(products);
});
router.get('/price2000', async(req, res) => {
    const products = await Product.find(
        {'price': {$gt : 2000 }}
      );
      res.status(200).json(products);
});
router.get('/categories/:categories', async(req, res) => {
    const products = await Product.find(
        req.params
      );
      res.status(200).json(products);
});
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        try {
            crypto.pseudoRandomBytes(16, function (err, raw) {
                if (err) return cb(err);
                cb(
                    null,
                    raw.toString("hex")+Date.now()+file.originalname
                );
            });
        } catch (error) {
            console.log(error);
        }
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, png are allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")

router.post("/upload",  (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
    })

});
router.post("/crear", (req, res) => {
    const product = new Product(req.body)
    const product1 = product.toLowerCase();
    product1.save((err) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
    })
});
router.get("/listar", (req, res) => {

    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);

    let findArgs = {};
    let term = req.body.searchTerm;

    for (let key in req.body.filters) {

        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }
    if (term) {
        Product.find(findArgs)
            .find({ $text: { $search: term } })
            .populate("writer")
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec((err, products) => {
                if (err) return res.status(400).json({ success: false, err })
                res.status(200).json({ success: true, products, postSize: products.length })
            })
    } else {
        Product.find(findArgs)
            .populate("writer")
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec((err, products) => {
                if (err) return res.status(400).json({ success: false, err })
                res.status(200).json({ success: true, products, postSize: products.length })
            })
    }

});

router.get("/products_by_id", (req, res) => {
    let type = req.query.type
    let productIds = req.query.id

    console.log("req.query.id", req.query.id)

    if (type === "array") {
        let ids = req.query.id.split(',');
        productIds = [];
        productIds = ids.map(item => {
            return item
        })
    }
    Product.find({ '_id': { $in: productIds } })
        .populate('writer')
        .exec((err, product) => {
            if (err) return res.status(400).send(err)
            return res.status(200).send(product)
        })
});

module.exports = router;