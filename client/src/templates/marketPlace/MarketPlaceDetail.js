import React, { useEffect, useState } from "react";
import { API_KEY, API_URL } from "../Config";
import { Descriptions, PageHeader, Tag, Statistic, Row } from "antd";
import Favorite from "./components/Favorite";

function MarketPlaceDetail(props) {
  let nftId = props.match.params.nftId;

  const [Nft, setNft] = useState([null]);

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
        tags={<Tag color="blue">On sale</Tag>}
        // extra={[
        //   <Favorite
        //     nftInfo={Nft}
        //     nftId={nftId}
        //     userFrom={localStorage.getItem("userId")}
        //   />
        // ]}
      >
        <Row>
          <Statistic title="Status" value="Pending" />
          <Statistic
            title="Price"
            prefix="￦"
            value={10000}
            style={{ margin: "0 32px" }}
          />
          <Statistic title="Balance" prefix="￦" value={100000} />
        </Row>
      </PageHeader>

      <div style={{ display: "flex", justifyContent: "flex-end" }}></div>

      <Descriptions title="Info" bordered>
        <Descriptions.Item label="Owned">
          {Nft.original_title}
        </Descriptions.Item>
        <Descriptions.Item label="Category">
          {Nft.original_title}
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          {Nft.original_title}
        </Descriptions.Item>
        <Descriptions.Item label="Negotiated Amount">
          {Nft.original_title}
        </Descriptions.Item>
        <Descriptions.Item label="DisCount">
          {Nft.original_title}
        </Descriptions.Item>
        <Descriptions.Item label="ClosingDate">
          {Nft.original_title}
        </Descriptions.Item>
        <Descriptions.Item label="Descriptions">
          {Nft.overview}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}

export default MarketPlaceDetail;
