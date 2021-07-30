import React, { useState, useEffect } from "react";
import { Layout, Menu, Select, Input, Row, Card, Col } from "antd";
import "../../assets/css/marketPlace.css";
import {
  AppstoreTwoTone,
  DollarTwoTone,
  FolderOpenTwoTone,
  FormatPainterOutlined,
  DribbbleOutlined,
  SketchOutlined,
} from "@ant-design/icons";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../Config";

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;
const { Meta } = Card;

function MarketPlaceList() {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&;amgiage=ko-Korean&page=1`;
    fetchNfts(endpoint);
  }, []);

  const fetchNfts = (endpoint) => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        setNfts([...nfts, ...response.results]);
      });
  };

  return (
    <Layout>
      <Content style={{ padding: "0 50px" }}>
        <Layout
          className="site-layout-background"
          style={{ padding: "24px 0" }}
        >
          <Sider className="site-layout-background" width={300}>
            <Menu
              mode="inline"
              // defaultSelectedKeys={['1']}
              defaultOpenKeys={["statusMenu"]}
              style={{ height: "100%" }}
            >
              <SubMenu
                key="statusMenu"
                icon={<AppstoreTwoTone />}
                title="Status"
              >
                <Menu.Item key="1">지금 구매하기</Menu.Item>
                <Menu.Item key="2">경매 중</Menu.Item>
                <Menu.Item key="3">신작</Menu.Item>
                <Menu.Item key="4">오퍼 있음</Menu.Item>
              </SubMenu>
              <SubMenu key="priceMenu" icon={<DollarTwoTone />} title="Price">
                <Menu.Item key="price">
                  <Select defaultValue="WON" style={{ width: 230 }}>
                    <Option value="WON">Republic of Korea Won (WON)</Option>
                    <Option value="ethereum">Ether (ETH)</Option>
                  </Select>
                </Menu.Item>
                <Menu.Item>
                  <Input.Group compact>
                    <Input
                      style={{ width: 100, textAlign: "center" }}
                      placeholder="Minimum"
                    />
                    <Input
                      className="site-input-split"
                      style={{
                        width: 30,
                        borderLeft: 0,
                        borderRight: 0,
                        pointerEvents: "none",
                      }}
                      placeholder="~"
                      disabled
                    />
                    <Input
                      className="site-input-right"
                      style={{ width: 100, textAlign: "center" }}
                      placeholder="Maximum"
                    />
                  </Input.Group>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="categoryMenu"
                icon={<FolderOpenTwoTone />}
                title="Category"
              >
                <Menu.Item key="art" icon={<FormatPainterOutlined />}>
                  Art
                </Menu.Item>
                <Menu.Item key="sports" icon={<DribbbleOutlined />}>
                  Sports
                </Menu.Item>
                <Menu.Item key="Utility" icon={<SketchOutlined />}>
                  Utility
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 800 }}>
            <Row gutter={16}>
              {nfts &&
                nfts.map((nft, index) => (
                  <Col span={6}>
                    <React.Fragment key={index}>
                      <a href={`/marketplace/${nft.id}`}>
                        <Card
                          hoverable
                          style={{ width: 240, marginTop: 20 }}
                          cover={
                            <img
                              alt="marketplace list"
                              src={`${IMAGE_BASE_URL}w500${nft.poster_path}`}
                            />
                          }
                        >
                          <Meta title={nft.title} />
                        </Card>
                      </a>
                    </React.Fragment>
                  </Col>
                ))}
            </Row>
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}>Team Diary</Footer>
    </Layout>
  );
}

export default MarketPlaceList;
