export class ProductModel{
    constructor(clientSQL){
        this.client = clientSQL;
        this.client.execute (`
            CREATE TABLE IF NOT EXISTS product (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name TEXT,
            price FLOAT
            )
            `).catch(console.error)
    }

    async getAllProducts(){
        const [products] = await this.client.execute("SELECT * FROM product").catch(console.error);
        return products;    
    }

    async getProductById(id){
        //todo
        //   
        const [product] = await this.client.execute("SELECT * FROM product WHERE id = ?",[id]).catch(console.error);
        console.log(product);

        return product;
    }

    async addProduct(name,price){
        //todo
        //
    }
}