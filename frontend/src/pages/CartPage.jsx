import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { addCartItem, removeCartItem } from "../features/cart/cartSlice";
import Message from "../components/Message";
import { Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap";
const CartPage = () => {
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  useEffect(() => {
    if (id && searchParams.get("qty")) {
      dispatch(addCartItem({ id, qty: Number(searchParams.get("qty")) }));
    }
  }, [id, searchParams, dispatch]);

  const removeFromCartHandler = (productId) => {
    dispatch(removeCartItem(productId));
  };
  const checkoutHandler = () => {
    console.log("checkout");
  };
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cart.cartItems.length === 0 ? (
          <Message type="info">
            No Items Added to cart. <Link to="/"> Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cart.cartItems.map((cartItem) => {
              return (
                <ListGroup.Item key={cartItem.product} className="bg-dark my-2">
                  <Row className="align-items-center">
                    <Col md={2} sm={3}>
                      <Image src={cartItem.image} alt={cartItem.name} fluid />
                    </Col>
                    <Col md={3} sm={3}>
                      <Link to={`/product/${cartItem.product}`}> {cartItem.name}</Link>
                    </Col>
                    <Col md={2} sm={2}>
                      <span>${cartItem.price}</span>
                    </Col>
                    <Col md={2} sm={2}>
                      <Form.Select
                        value={cartItem.qty}
                        onChange={(e) => {
                          dispatch(addCartItem({ id: cartItem.product, qty: Number(e.target.value) }));
                        }}
                      >
                        {[...Array(cartItem.countInStock).keys()].map((val) => {
                          return (
                            <option key={val} value={val + 1}>
                              {val + 1}
                            </option>
                          );
                        })}
                      </Form.Select>
                    </Col>
                    <Col md={2} sm={2}>
                      <Button type="button" variant="light" onClick={() => removeFromCartHandler(cartItem.product)}>
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h4>SubTotal ({cart.cartItems.reduce((acc, cur) => acc + Number(cur.qty), 0)}) Items</h4>
            </ListGroup.Item>
            <ListGroup.Item>$ {cart.cartItems.reduce((acc, cur) => acc + Number(cur.price * cur.qty), 0).toFixed(1)}</ListGroup.Item>

            <ListGroup.Item>
              <Row className="px-3">
                <Button variant="light" className="btn-block" disabled={cart.cartItems.length === 0} onClick={checkoutHandler}>
                  PROCEED TO CHECKOUT
                </Button>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartPage;
