//pour lancer le server : sudo docker run -p 3306:3306 -e MARIADB_ROOT_PASSWORD=root -e MARIADB_DATABASE=shop  mariadb
//pour connecter à la base de donnée : mysql -p -uroot -h127.0.0.1


import mysql from "mysql2/promise";
import {ProductModel} from "./product.model.js";
import express from "express";

async function main() {
    //init sql connection
    const client = await mysql.createConnection({
        host: "localhost",
        user : "root",
        password : "root",
        database : "shop"
    }).catch(console.error);

    const productModel = new ProductModel(client);

    const server = express();

    server.get("/", (req, res) => {
        res.send("hello, bienvenue dans l'api")
    });

    server.get("/product", (req, res) => {
        res.send("coucou mon cul")
    });

    server.get("/product/:id", async (req, res) => {
        const productId = req.params.id;
        const product = await productModel.getProductById(productId);
        res.json(product);
    });

    server.get("/all-products", (req, res) => {
        productModel.getAllProducts().then(products => {
            res.json(products);
        });
    });

    server.listen(8090, () => {
        console.log("listen on http://localhost:8090")
    });
}

main();