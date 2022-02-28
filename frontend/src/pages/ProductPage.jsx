import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, reset } from "../features/product/productSlice";
import { Row, Col, Image, ListGroup, Card, Button, Form } from "react-bootstrap";
import Rating from "../components/Rating";
import Loading from "../components/Loading";
import ToastItem from "../components/ToastItem";
const ProductPage = () => {
  const [qty, setQty] = useState(1);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product, isLoading, isError, message } = useSelector((state) => state.product);
  const cartHandler = () => {
    navigate(`/cart/${params.id}?qty=${qty}`);
  };
  useEffect(() => {
    dispatch(getProduct(params.id));
  }, [dispatch, params.id]);
  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        dispatch(reset());
      }, 2000);
    }
    // eslint-disable-next-line
  }, [isError, message]);

  if (isLoading) return <Loading />;
  else if (isError) return <ToastItem message={message} />;
  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      <Row>
        <Col lg={5}>
          <Image src={product.image} fluid></Image>
        </Col>
        <Col lg={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3 className="text-uppercase">{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            </ListGroup.Item>
            <ListGroup.Item>
              <span>Price: ${product.price}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <span>Description: ${product.description}</span>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>{product.countInStock > 0 ? "In Stock" : "Out Of Stock"}</Col>
                </Row>
              </ListGroup.Item>
              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Quantity:</Col>
                    <Col>
                      <Form.Select
                        as="select"
                        value={qty}
                        onChange={(e) => {
                          setQty(e.target.value);
                        }}
                      >
                        {[...Array(product.countInStock).keys()].map((val) => {
                          return (
                            <option key={val} value={val + 1}>
                              {val + 1}
                            </option>
                          );
                        })}
                      </Form.Select>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Row className="px-3">
                  <Button variant="light" className="btn-block" disabled={product.countInStock === 0} onClick={cartHandler}>
                    ADD TO CART
                  </Button>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductPage;
