import React, { useState, useEffect } from "react";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../Config";
import MainImage from "./components/MainImage";
import { Row, Card, Col, Button } from "antd";
import "../../assets/css/mainPage.css";
import "antd/dist/antd.css";
import MainImageSlider from "./components/MainImageSlider";

const { Meta } = Card;

function Main() {
  const [mainTitleImage, setMainTitleImage] = useState(null);
  const [products, setProducts] = useState([]);
  const [firstMainProduct, setFirstMainProduct] = useState([]);
  const [firstMainProductImage, setFirstMainProductImage] = useState([]);
  const [secondMainProduct, setSecondMainProduct] = useState([]);
  const [secondMainProductImage, setSecondMainProductImage] = useState([]);
  const [thirdMainProduct, setThirdMainProduct] = useState([]);
  const [thirdMainProductImage, setThirdMainProductImage] = useState([]);
  const [fourMainProduct, setFourMainProduct] = useState([]);
  const [fourMainProductImage, setFourMainProductImage] = useState([]);

  useEffect(() => {
    const allProductApi = `${process.env.REACT_APP_PRODUCT_SERVER}all-product`
    fetchProducts(allProductApi);
  }, []);

  const fetchProducts = (allProductApi) => {
    fetch(allProductApi)
    .then((result) => result.json())
    .then((result) => {
      setProducts([...products, ...result.products]);
      setMainTitleImage(result.products[0]);
      setFirstMainProduct(result.products[0]);
      setFirstMainProductImage(result.products[0].images[0]);
      setSecondMainProduct(result.products[1]);
      setSecondMainProductImage(result.products[1].images[0]);
      setThirdMainProduct(result.products[2]);
      setThirdMainProductImage(result.products[2].images[0]);
      setFourMainProduct(result.products[3]);
      setFourMainProductImage(result.products[3].images[0]);
    })
  }

  return (
    <div className="main-page">
      {mainTitleImage && (
        <MainImage
          image={`http://localhost:5000/${firstMainProductImage}`}
          title={firstMainProduct.title}
          text={firstMainProduct.description}
        />
      )}
      <div className="main-row">
        <h2 className="content-title">Popular item</h2>

        <div className="site-card-wrapper">
          <Row gutter={24}>
            <Col span={6}>
              <Card
                className="nft-category-card-size"
                hoverable
                cover={
                  <a href={`/product/${firstMainProduct._id}`}>
                    <img
                      className="card-image-default-size"
                      alt="Popular item first"
                      src={`http://localhost:5000/${firstMainProductImage}`}
                    />
                  </a>
                }
              >
                <Meta className="nft-category-text" title={firstMainProduct.title} />
              </Card>
            </Col>
            <Col span={6}>
              <Card
                className="nft-category-card-size"
                hoverable
                cover={
                  <a href={`/product/${secondMainProduct._id}`}>
                    <img
                      className="card-image-default-size"
                      alt="Popular item second"
                      src={`http://localhost:5000/${secondMainProductImage}`}
                    />
                  </a>
                }
              >
                <Meta className="nft-category-text" title={secondMainProduct.title} />
              </Card>
            </Col>
            <Col span={6}>
              <Card
                className="nft-category-card-size"
                hoverable
                cover={
                  <a href={`/product/${thirdMainProduct._id}`}>
                    <img
                      className="card-image-default-size"
                      alt="Popular item third"
                      src={`http://localhost:5000/${thirdMainProductImage}`}
                    />
                  </a>
                }
              >
                <Meta className="nft-category-text" title={thirdMainProduct.title} />
              </Card>
            </Col>
            <Col span={6}>
              <Card
                className="nft-category-card-size"
                hoverable
                cover={
                  <a href={`/marketplace/${fourMainProduct._id}`}>
                    <img
                      className="card-image-default-size"
                      alt="Popular item four"
                      src={`http://localhost:5000/${fourMainProductImage}`}
                    />
                  </a>
                }
              >
                <Meta className="nft-category-text" title={fourMainProduct.title} />
              </Card>
            </Col>
          </Row>
        </div>

        <h2 className="content-title">Browse by category</h2>

        <div className="site-card-wrapper">
          <Row gutter={24}>
            <Col span={6}>
              <Card
                className="nft-category-card-size"
                hoverable
                cover={
                  <img
                    alt="Art"
                    src="https://opensea.io/static/images/categories/art.png"
                  />
                }
              >
                <Meta className="nft-category-text" title="Art" />
              </Card>
            </Col>
            <Col span={6}>
              <Card
                className="nft-category-card-size"
                hoverable
                cover={
                  <img
                    alt="Sports"
                    src="https://opensea.io/static/images/categories/sports.png"
                  />
                }
              >
                <Meta className="nft-category-text" title="Sports" />
              </Card>
            </Col>
            <Col span={6}>
              <Card
                className="nft-category-card-size"
                hoverable
                cover={
                  <img
                    alt="Utility"
                    src="https://opensea.io/static/images/categories/utility.png"
                  />
                }
              >
                <Meta className="nft-category-text" title="Utility" />
              </Card>
            </Col>
            <Col span={6}>
              <Card
                hoverable
                className="nft-category-card-size"
                cover={
                  <a href="/marketPlace">
                    <img
                      className="nft-category-card-size"
                      alt="All NFTs"
                      src="https://opensea.io/static/images/categories/all-nfts.png"
                    />
                  </a>
                }
              >
                <Meta className="nft-category-text" title="All NFTs" />
              </Card>
            </Col>
          </Row>
        </div>

        <Button
          className="explore-button"
          type="primary"
          size="large"
        >
          Explore the marketplace
        </Button>
      </div>
    </div>
  );
}

export default Main;
