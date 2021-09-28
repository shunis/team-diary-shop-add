import React, { useState } from "react";
import "antd/dist/antd.css";
import { withRouter } from "react-router";
import { useSelector } from "react-redux";
import { Menu, Drawer, Badge } from "antd";
import {
  HomeTwoTone,
  ShopTwoTone,
  EditTwoTone,
  SettingTwoTone,
  LoginOutlined,
  UserOutlined,
  UploadOutlined,
  HistoryOutlined,
  ShoppingCartOutlined,
  CrownTwoTone
} from "@ant-design/icons";
import ProfileDrawer from "./ProfileDrawer";

const { SubMenu } = Menu;

function Navigation() {
  const user = useSelector((state) => state.user);

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  if (user.userData && user.userData.isAuth === true) {
    return (
      <Menu className="navigation" mode="horizontal">
        <Menu.Item key="Home" icon={<HomeTwoTone />}>
          <a href="/">Home</a>
        </Menu.Item>
        <SubMenu key="Marketplace" icon={<ShopTwoTone />} title="Marketplace">
          <Menu.ItemGroup title="Category">
            <Menu.Item key="All">
              <a href="/landing">All Products</a>
            </Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        {/* // TODO Update Required ItemGroup */}
        {user.userData.role === 'ROLE_SELLER' &&
          <Menu.Item
            key="upload"
            icon={<UploadOutlined style={{ color: "#4287f5 "}} />}
          >
            <a href="/product/upload">upload</a>
          </Menu.Item>
        }
        <Menu.Item
          key="cart"
          icon={<ShoppingCartOutlined style={{ color: "#4287f5 "}} />}
        >
        <a href="/user/cart" className="head-example" style={{ color: '#667777' }} >
          cart
          <Badge style={{ marginLeft: 5, marginBottom: 4 }} count={user.userData && user.userData.cart.length} offset={[0, 0]}>
          </Badge>
        </a>
        </Menu.Item>
        <Menu.Item
          key="history"
          icon={<HistoryOutlined style={{ color: "#4287f5 "}} />}
        >
          <a href="/history">history</a>
        </Menu.Item>
        {/* <Menu.Item
          key="Favorite"
          icon={<HeartTwoTone twoToneColor="#eb2f96" />}
        >
          <a href="/favorite">Favorite</a>
        </Menu.Item> */}
        <SubMenu key="Settings" icon={<SettingTwoTone />} title="Setting">
          <Menu.Item key="Profile" icon={<UserOutlined />}>
            <a onClick={showDrawer}>Profile</a>
            <Drawer width={640} placement="right" onClose={onClose} visible={visible}>
              <ProfileDrawer />
            </Drawer>
          </Menu.Item>
          {user.userData.role === 'ROLE_ADMIN' &&
            <Menu.Item key="AdminPage" icon={<CrownTwoTone twoToneColor="##fff954" />}>
              <a href="/adminPage">Admin Page</a>
            </Menu.Item>
          }
        </SubMenu>
      </Menu>
    );
  } else {
    return (
      <Menu className="navigation" mode="horizontal">
        <Menu.Item key="Home" icon={<HomeTwoTone />}>
          <a href="/">Home</a>
        </Menu.Item>
        <SubMenu key="Marketplace" icon={<ShopTwoTone />} title="Marketplace">
          <Menu.ItemGroup title="Category">
            <Menu.Item key="All">
              <a href="/landing">All NFTs</a>
            </Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <Menu.Item key="Login" icon={<LoginOutlined />}>
          <a href="/login">Sign In</a>
        </Menu.Item>
        <Menu.Item key="Register" icon={<EditTwoTone />}>
          <a href="/register">Register</a>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(Navigation);
