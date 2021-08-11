import React, { useState, useEffect } from "react";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../Config";
import MainImage from "./components/MainImage";
import { Row, Card, Col, Button } from "antd";
import "../../assets/css/mainPage.css";
import "antd/dist/antd.css";

const { Meta } = Card;

function Main() {
  const [movies, setMovies] = useState([]);
  const [MainTitleImage, setMainTitleImage] = useState(null);
  const [FirstMainImage, setFirstMainImage] = useState([]);
  const [SecondMainImage, setSecondMainImage] = useState([]);
  const [ThirdMainImage, setThirdMainImage] = useState([]);
  const [FourthMainImage, setFourthMainImage] = useState([]);

  useEffect(() => {
    const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&;language=ko-KR&page=1`;
    fetchMovies(endPoint);
  }, []);

  const fetchMovies = (endPoint) => {
    fetch(endPoint)
      .then((result) => result.json())
      .then((result) => {
        setMovies([...movies, ...result.results]);
        setMainTitleImage(result.results[0]);
        setFirstMainImage(result.results[0]);
        setSecondMainImage(result.results[1]);
        setThirdMainImage(result.results[2]);
        setFourthMainImage(result.results[3]);
      });
  };

  return (
    <div className="main-page">
      {MainTitleImage && (
        <MainImage
          image={`${IMAGE_BASE_URL}w1280${MainTitleImage.backdrop_path}`}
          title={MainTitleImage.title}
          text={MainTitleImage.overview}
        />
      )}
      <div className="main-row">
        <h2 className="content-title">Popular item</h2>

        <div className="site-card-wrapper">
          <Row gutter={32}>
            <Col span={6}>
              <Card
                className="card-default-size"
                hoverable
                cover={
                  <a href={`/marketplace/${FirstMainImage.id}`}>
                    <img
                      className="card-image-default-size"
                      alt="Popular item first"
                      src={`${IMAGE_BASE_URL}w500${FirstMainImage.poster_path}`}
                    />
                  </a>
                }
              >
                <Meta title={FirstMainImage.title} />
              </Card>
            </Col>
            <Col span={6}>
              <Card
                className="card-default-size"
                hoverable
                cover={
                  <a href={`/marketplace/${SecondMainImage.id}`}>
                    <img
                      className="card-image-default-size"
                      alt="Popular item second"
                      src={`${IMAGE_BASE_URL}w500${SecondMainImage.poster_path}`}
                    />
                  </a>
                }
              >
                <Meta title={SecondMainImage.title} />
              </Card>
            </Col>
            <Col span={6}>
              <Card
                className="card-default-size"
                hoverable
                cover={
                  <a href={`/marketplace/${ThirdMainImage.id}`}>
                    <img
                      className="card-image-default-size"
                      alt="Popular item third"
                      src={`${IMAGE_BASE_URL}w500${ThirdMainImage.poster_path}`}
                    />
                  </a>
                }
              >
                <Meta title={ThirdMainImage.title} />
              </Card>
            </Col>
            <Col span={6}>
              <Card
                className="card-default-size"
                hoverable
                cover={
                  <a href={`/marketplace/${FourthMainImage.id}`}>
                    <img
                      className="card-image-default-size"
                      alt="Popular item four"
                      src={`${IMAGE_BASE_URL}w500${FourthMainImage.poster_path}`}
                    />
                  </a>
                }
              >
                <Meta title={FourthMainImage.title} />
              </Card>
            </Col>
          </Row>
        </div>

        <h2 className="content-title">Create and sell your NFTs</h2>

        <div className="site-card-wrapper">
          <Row gutter={16}>
            <Col span={6}>
              <Card title="Set up your wallet">
                Once you’ve set up your wallet of choice, connect it to OpenSea
                by clicking the wallet icon in the top right corner. Learn about
                the{" "}
                <a href="https://support.opensea.io/hc/en-us/articles/1500007978602-Wallets-supported-by-OpenSea">
                  wallets we support.
                </a>
              </Card>
            </Col>
            <Col span={6}>
              <Card title="Create your collection">
                Click <a href="#">Create</a> and set up your collection. Add
                social links, a description, profile & banner images, and set a
                secondary sales fee.
              </Card>
            </Col>
            <Col span={6}>
              <Card title="Add your NFTs">
                Upload your work (image, video, audio, or 3D art), add a title
                and description, and customize your NFTs with properties, stats,
                and unlockable content.
              </Card>
            </Col>
            <Col span={6}>
              <Card title="List them for sale">
                Choose between auctions, fixed-price listings, and
                declining-price listings. You choose how you want to sell your
                NFTs, and we help you sell them!
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
