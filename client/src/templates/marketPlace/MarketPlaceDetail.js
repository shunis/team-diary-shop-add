import React, { useEffect, useState } from "react";
import { API_KEY, API_URL, IMAGE_BASE_URL } from "../Config";
import { Descriptions, PageHeader, Tag, Statistic, Row, Col, Image } from "antd";
import Favorite from "./components/Favorite";
import "../../assets/css/simple.css"

function MarketPlaceDetail(props) {
  let nftId = props.match.params.nftId;

  const [Nft, setNft] = useState([null]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let endpointInfo = `${API_URL}/movie/${nftId}?api_key=${API_KEY}`;

    fetch(endpointInfo)
      .then((response) => response.json())
      .then((response) => {
        setNft(response);
      });
  }, []);

  return (
    <div style={{ width: "85%", margin: "1rem auto" }}>
      <PageHeader
        onBack={() => window.history.back()}
        title={Nft.original_title}
        tags={<Tag color="blue">{Nft.original_language}</Tag>}
        extra={[
          <Favorite key={nftId} nftId={nftId} userFrom={localStorage.getItem("userId")}
          />
        ]}
      >
        <Row>
          <Statistic title="Status" value={Nft.status} />
          <Statistic
            title="Price"
            prefix="￦"
            value={Nft.budget}
            style={{ margin: "0 32px" }}
          />
          <Statistic title="Balance" prefix="￦" value={Nft.budget} />
        </Row>
      </PageHeader>

      {/* <div style={{ display: "flex", justifyContent: "flex-end" }}></div> */}
      <Row>
        <Col xs={1} md={3} lg={4} xl={5} className="marketPlace-detail-image">
          <Image preview={{ visible: false}} width={ 240 } src={`${IMAGE_BASE_URL}w500${Nft.poster_path}`} onClick={() => setVisible(true)} />
          <div style={{ display: 'none' }}>
            <Image.PreviewGroup preview={{ visible, onVisibleChange: vis => setVisible(vis)}}>
              <Image src={`${IMAGE_BASE_URL}w500${Nft.poster_path}`} />
            </Image.PreviewGroup>
          </div>
        </Col>
        <Col xs={1} md={1} lg={1} xl={1}></Col>
        <Col xs={22} md={24} lg={19} xl={18}>
        <Descriptions title="NFT Info" bordered>
          <Descriptions.Item label="Owned">
            {Nft.original_title}
          </Descriptions.Item>
          <Descriptions.Item label="Category">
            {Nft.original_title}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            {Nft.status}
          </Descriptions.Item>
          <Descriptions.Item label="Negotiated Amount">
            {Nft.budget}
          </Descriptions.Item>
          <Descriptions.Item label="DisCount">
            {Nft.budget}
          </Descriptions.Item>
          <Descriptions.Item label="ClosingDate">
            {Nft.release_date}
          </Descriptions.Item>
          <Descriptions.Item label="Descriptions">
            {Nft.overview}
          </Descriptions.Item>
        </Descriptions>
        </Col>
      </Row>

    </div>
  );
}

export default MarketPlaceDetail;
