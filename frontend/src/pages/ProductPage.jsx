import React from "react";
import { useParams, Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../components/Rating";
import products from "../products";
const ProductPage = () => {
    const params = useParams();
    const product = products.find((product) => product._id === params.id);
    return (
        <>
            <Link to="/" className="btn btn-light my-3">
                Go Back
            </Link>
            <Row>
                <Col lg={5} fluid>
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
                            <ListGroup.Item>
                                <Row className="px-3">
                                    <Button variant="light" className="btn-block" disabled={product.countInStock == 0}>
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
