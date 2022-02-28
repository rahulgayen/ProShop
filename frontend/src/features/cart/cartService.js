import axios from "axios";
const API_URL = "/api/products/";
const addCartItem = async ({ id, qty }) => {
    const { data } = await axios.get(API_URL + id);

    return {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
    };
};
const cartService = { addCartItem };
export default cartService;
