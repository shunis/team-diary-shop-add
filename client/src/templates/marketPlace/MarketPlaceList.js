import React from "react";
import { Layout, Menu, Select, Input } from "antd";
import "../../assets/css/marketPlace.css";
import { AppstoreTwoTone, DollarTwoTone, FolderOpenTwoTone, FormatPainterOutlined, DribbbleOutlined, SketchOutlined } from "@ant-design/icons";

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;

function MarketPlaceList() {
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
              <SubMenu key="categoryMenu" icon={<FolderOpenTwoTone />} title="Category">
								<Menu.Item key="art" icon={<FormatPainterOutlined />}>Art</Menu.Item>
								<Menu.Item key="sports" icon={<DribbbleOutlined />}>Sports</Menu.Item>
								<Menu.Item key="Utility" icon={<SketchOutlined />}>Utility</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 800 }}>
            Content
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}>Team Diary</Footer>
    </Layout>
  );
}

export default MarketPlaceList;
