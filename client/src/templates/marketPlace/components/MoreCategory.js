import React, { useState, useEffect } from "react";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import { Card, Col, Row } from "antd";
import "../../../assets/css/marketPlace.css";

const { Meta } = Card;

function MoreCategory() {
  const [FirstCategoryImage, setFirstCategoryImage] = useState([]);
  const [SecondCategoryImage, setSecondCategoryImage] = useState([]);
  const [ThirdCategoryImage, setThirdCategoryImage] = useState([]);
  const [FourthCategoryImage, setFourthCategoryImage] = useState([]);

  useEffect(() => {
    const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&;language=ko-KR&page=1`;
    fetchCategory(endPoint);
  }, []);

  const fetchCategory = (endPoint) => {
    fetch(endPoint)
      .then((result) => result.json())
      .then((result) => {
        setFirstCategoryImage(result.results[0]);
        setSecondCategoryImage(result.results[1]);
        setThirdCategoryImage(result.results[2]);
        setFourthCategoryImage(result.results[3]);
      });
  };

  return (
    <div>
      <Row className="marketplace-row" gutter={24}>
        <Col span={6}>
          <Card
            className="marketplace-category-card"
            hoverable
            cover={
              <a href={`/marketplace/${FirstCategoryImage.id}`}>
                <img
                  className="marketplace-category-card-image"
                  alt="category first item"
                  src={`${IMAGE_BASE_URL}w500${FirstCategoryImage.poster_path}`}
                />
              </a>
            }
          >
            <Meta title={FirstCategoryImage.title} />
          </Card>
        </Col>
        <Col span={6}>
          <Card
            className="marketplace-category-card"
            hoverable
            cover={
              <a href={`/marketplace/${SecondCategoryImage.id}`}>
                <img
                  className="marketplace-category-card-image"
                  alt="category second item"
                  src={`${IMAGE_BASE_URL}w500${SecondCategoryImage.poster_path}`}
                />
              </a>
            }
          >
            <Meta title={SecondCategoryImage.title} />
          </Card>
        </Col>
        <Col span={6}>
          <Card
            className="marketplace-category-third-card"
            hoverable
            cover={
              <a href={`/marketplace/${ThirdCategoryImage.id}`}>
                <img
                  className="marketplace-category-card-image"
                  alt="category third item"
                  src={`${IMAGE_BASE_URL}w500${ThirdCategoryImage.poster_path}`}
                />
              </a>
            }
          >
            <Meta title={ThirdCategoryImage.title} />
          </Card>
        </Col>
        <Col span={6}>
          <Card
            className="marketplace-category-fourth-card"
            hoverable
            cover={
              <a href={`/marketplace/${FourthCategoryImage.id}`}>
                <img
                  className="marketplace-category-card-image"
                  alt="category fourth item"
                  src={`${IMAGE_BASE_URL}w500${FourthCategoryImage.poster_path}`}
                />
              </a>
            }
          >
            <Meta title={FourthCategoryImage.title} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default MoreCategory;
