import "dotenv/config";
import colors from "colors";
import dbConnect from "./config/db.js";
import user from "./data/user.js";
import product from "./data/product.js";

import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
dbConnect();

const importData = async () => {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    try {
        const createdUsers = await User.insertMany(user);
        const adminid = createdUsers[0]._id;
        const productList = product.map((prod) => { return { ...prod, user: adminid } })
        await Product.insertMany(productList);
        process.exit()
    } catch (error) {
        console.log(error.red)
        process.exit(1)
    }
};
const destroyData = async () => {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
}
if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}
