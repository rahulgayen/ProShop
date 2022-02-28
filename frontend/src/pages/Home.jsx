import { Row, Col } from "react-bootstrap";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, reset } from "../features/product/productSlice";
import Product from "../components/Product";
import Loading from "../components/Loading";
import ToastItem from "../components/ToastItem";
const Home = () => {
  const dispatch = useDispatch();
  const { products, isLoading, isSuccess, isError, message } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

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
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => {
          return (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Home;
