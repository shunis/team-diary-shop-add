import React, { useEffect, useState } from "react";
import { API_KEY, API_URL, IMAGE_BASE_URL } from "../Config";
import {
  PageHeader,
  Tag,
  Statistic,
  Row,
  Col,
  Image,
  Space,
  Button,
  Popconfirm,
  Collapse,
  Table,
} from "antd";
import Favorite from "./components/Favorite";
import GuestFavorite from "./components/GuestFavorite";
import "../../assets/css/simple.css";
import Ethereum from "../../assets/img/ethereum.png";
import MoreCategory from "./components/MoreCategory";

import { WalletFilled, SwapOutlined, AppstoreOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

function MarketPlaceDetail(props) {
  let nftId = props.match.params.nftId;

  const [Nft, setNft] = useState([null]);
  const [visible, setVisible] = useState(false);
  const [owned, setOwned] = useState([]);
  const [category, setCategory] = useState([]);

  const columns = [
    {
      title: "Events",
      dataIndex: "events",
      key: "events",
      render: (events) => (
        <>
          {events.map((eventTag) => {
            let color = eventTag === "Minted" ? "geekblue" : "green";
            if (eventTag === "Offer") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={eventTag}>
                {eventTag}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "From",
      dataIndex: "from",
      key: "from",
    },
    {
      title: "To",
      dataIndex: "to",
      key: "to",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  const data = [
    {
      key: "1",
      events: ["Minted"],
      price: 10000,
      from: "test@naver.com",
      to: "test2@naver.com",
      date: "2021-08-11",
    },
    {
      key: '2',
      events: ['Offer'],
      price: 20000,
      from: 'test2@naver.com',
      to: 'test3@naver.com',
      date: '2021-08-12'
    }
  ];

  useEffect(() => {
    let endpointInfo = `${API_URL}/movie/${nftId}?api_key=${API_KEY}`;

    fetch(endpointInfo)
      .then((response) => response.json())
      .then((response) => {
        setNft(response);
        setOwned(response.production_companies[0]);
        setCategory(response.genres[0]);
      });
  }, []);

  return (
    <div style={{ width: "85%", margin: "1rem auto" }}>
      <PageHeader
        onBack={() => window.history.back()}
        title={Nft.original_title}
        tags={<Tag color="blue">{Nft.status}</Tag>}
        extra={[
          localStorage.getItem("userId").length !== 0 ? (
            <Favorite
              key={nftId}
              nftId={nftId}
              userFrom={localStorage.getItem("userId")}
            />
          ) : (
            <GuestFavorite key={nftId} />
          ),
        ]}
      >
        <Row>
          <Statistic
            title="Category"
            // prefix="￦"
            value={category.name}
          />
          <Statistic
            title="Closing Date"
            // prefix="￦"
            value={Nft.release_date}
            style={{ margin: "0 32px" }}
          />
          <Statistic title="Owned by" value={owned.name} />
        </Row>
      </PageHeader>

      {/* <div style={{ display: "flex", justifyContent: "flex-end" }}></div> */}
      <Row className="marketplace-row">
        {/* NFT Image */}
        <Col xs={3} md={5} lg={7} xl={7} className="marketPlace-detail-image">
          <Image
            preview={{ visible: false }}
            width={240}
            src={`${IMAGE_BASE_URL}w500${Nft.poster_path}`}
            onClick={() => setVisible(true)}
          />
          <div style={{ display: "none" }}>
            <Image.PreviewGroup
              preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}
            >
              <Image src={`${IMAGE_BASE_URL}w500${Nft.poster_path}`} />
            </Image.PreviewGroup>
          </div>
        </Col>
        {/* End NFT Image */}
        <Col xs={1} md={1} lg={1} xl={1}></Col>
        {/* Price Area */}
        <Col xs={20} md={22} lg={16} xl={16}>
          <Space className="marketplace-space" direction="vertical">
            <span className="marketplace-span-current-price">
              Current Price
            </span>
            <span className="marketplace-span-price">
              <img
                className="marketplace-ethereum"
                src={Ethereum}
                alt="ethereum"
              />
              0.186
            </span>
            <Popconfirm title="Buy Now" okText="Yes" cancelText="No">
              <Button
                type="primary"
                shape="round"
                size="large"
                style={{ width: 150 }}
              >
                <WalletFilled />
                Buy Now
              </Button>
            </Popconfirm>
          </Space>
          <Collapse
            className="marketplace-collapse-description"
            defaultActiveKey={["1"]}
          >
            <Panel header="Description" key="1">
              <p>{Nft.overview}</p>
            </Panel>
          </Collapse>
        </Col>
        {/* End Price Area */}
      </Row>
      {/* Trading History Area */}
      <Row className="marketplace-row">
        <Col xs={2} md={2} lg={2} xl={2}></Col>
        <Col xs={20} md={24} lg={20} xl={20}>
          <Collapse
            className="marketplace-collapse"
            defaultActiveKey={["1"]}
            expandIconPosition="left"
          >
            <Panel header="Trading History" key="1" extra={<SwapOutlined />}>
              <Table columns={columns} dataSource={data} />
            </Panel>
          </Collapse>
        </Col>
        <Col xs={2} md={2} lg={2} xl={2}></Col>
      </Row>
      {/* End Trading History Area */}
      {/* More from this category Area */}
      <Row className="marketplace-row">
      <Col xs={2} md={2} lg={2} xl={2}></Col>
        <Col xs={20} md={24} lg={20} xl={20}>
          <Collapse
            className="marketplace-collapse"
            defaultActiveKey={["1"]}
            expandIconPosition="left"
          >
            <Panel header="More from this category" key="1" extra={<AppstoreOutlined />}>
              <MoreCategory />
              <Button className="collapse-button" type="primary" size="large">view Collection</Button>
            </Panel>
          </Collapse>
        </Col>
        <Col xs={2} md={2} lg={2} xl={2}></Col>
      </Row>
      {/* End More from this category Area */}
    </div>
  );
}

export default MarketPlaceDetail;
