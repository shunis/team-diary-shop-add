import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Divider, Col, Row, Button, Image, Modal, Form, Input } from "antd";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";

import "../assets/css/profileDrawer.css";
import {
  API_KEY,
  API_URL,
  IMAGE_BASE_URL,
  USER_SERVER,
} from "../templates/Config";

import { LogoutOutlined, UserOutlined, HeartTwoTone } from "@ant-design/icons";
import { updateUser } from "../_actions/user_actions";

function ProfileDrawer() {
  const profile = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [firstFavoriteImage, setFirstFavoriteImage] = useState([]);
  const [visible, setVisible] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [userInfo, setUserInfo] = useState([]);

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        window.localStorage.setItem("userId", "");
        // window.location.href = "/login";
        window.location.reload();
      } else {
        alert("Logout Failed..!");
      }
    });
  };

  useEffect(() => {
    const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&;language=ko-KR&page=1`;
    fetchFavorites(endPoint);
    getUserInfo();
  }, []);

  const fetchFavorites = (endPoint) => {
    fetch(endPoint)
      .then((result) => result.json())
      .then((result) => {
        setFirstFavoriteImage(result.results[0]);
      });
  };

  const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">{title}:</p>
      {content}
    </div>
  );

  const showModal = () => {
    getUserInfo();
    setVisible(true);
  };

  const handleOk = () => {
    setModalText(
      "The change has been completed. The modal will be closed after three second"
    );
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 3000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const withdrawalUser = () => {
    axios
      .delete(`${USER_SERVER}/user/${profile.userData._id}`)
      .then((response) => {
        if (response.status === 200) {
          window.localStorage.setItem("userId", "");
          window.localStorage.setItem("rememberMe", "");
          window.location.reload();
        } else {
          alert("Failed withdrawal user...!");
        }
      });
  };

  const getUserInfo = () => {
    axios
      .get(`${USER_SERVER}/user/${profile.userData._id}`)
      .then((response) => {
        setUserInfo(response.data.user);
      });
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 16,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  return (
    <div>
      <p
        className="site-description-item-profile-p"
        style={{ marginBottom: 24 }}
      >
        User profile
      </p>
      <p className="site-description-item-profile-p">Personal</p>
      <Row>
        <Col span={12}>
          <DescriptionItem title="email" content={userInfo ? userInfo.email : "load failed...."} />
        </Col>
        <Col span={12}>
          <DescriptionItem title="name" content={userInfo ? userInfo.name : "load failed...."} />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem title="joinDate" content={userInfo ? userInfo.joinDate : "load failed...."} />
        </Col>
        <Col span={12}>
          <DescriptionItem title="birthDay" content={userInfo ? userInfo.birthDay : "load failed...."} />
        </Col>
      </Row>

      <Divider />
      <p className="site-description-item-profile-p">Favorite</p>
      <div className="site-description-item-profile-favorite-image">
        <Image
          width={120}
          height={180}
          src={`${IMAGE_BASE_URL}w500${firstFavoriteImage.poster_path}`}
        />
      </div>
      <div className="site-description-item-profile-favorite-image">
        <Image
          width={120}
          height={180}
          src={`${IMAGE_BASE_URL}w500${firstFavoriteImage.poster_path}`}
        />
      </div>
      <div className="site-description-item-profile-favorite-image">
        <Image
          width={120}
          height={180}
          src={`${IMAGE_BASE_URL}w500${firstFavoriteImage.poster_path}`}
        />
      </div>
      <div className="site-description-item-profile-favorite-image">
        <Image
          width={120}
          height={180}
          src={`${IMAGE_BASE_URL}w500${firstFavoriteImage.poster_path}`}
        />
      </div>
      <Button
        className="site-description-item-profile-favorite-button"
        danger
        icon={<HeartTwoTone twoToneColor="#eb2f96" />}
      >
        More Favorite Item
      </Button>

      <Divider />
      <Button
        className="site-description-item-profile-button"
        type="primary"
        ghost
        icon={<UserOutlined />}
        onClick={showModal}
      >
        Update Profile
      </Button>
      <Modal
        title="Update User Profile"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Formik
          initialValues={{
            birthDay: "",
            password: "",
          }}
          validationSchema={Yup.object().shape({
            birthDay: Yup.string().required("birthDay is required"),
            password: Yup.string()
              .min(6, "password must be at least 6 characters")
              .required("password is required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              let dataToSubmit = {
                birthDay: values.birthDay,
                password: values.password,
              };

              dispatch(updateUser(profile, dataToSubmit)).then(
                (response) => {
                  if (response.payload.success) {
                    alert(modalText);
                  } else {
                    alert("update error");
                  }
                }
              );
              setSubmitting(false);
            }, 500);
          }}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
            } = props;
            return (
              <div>
                <h2 className="site-description-item-profile-modal-header">
                  Update your profile
                </h2>
                <Form
                  style={{ minWidth: "375px" }}
                  {...formItemLayout}
                  onSubmit={handleSubmit}
                >
                  <Form.Item required label="password" hasFeedback>
                    <Input
                      id="password"
                      placeholder="Enter your password"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.password && touched.password
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    {errors.password && touched.password && (
                      <div className="input-feedback">{errors.password}</div>
                    )}
                  </Form.Item>

                  <Form.Item required label="birthDay">
                    <Input
                      id="birthDay"
                      type="date"
                      value={values.birthDay}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.birthDay &&
                        touched.birthDay && (
                          <div className="input-feedback">
                            {errors.birthDay}
                          </div>
                        )
                      }
                    />
                  </Form.Item>

                  <Form.Item {...tailFormItemLayout}>
                    <Button
                      onClick={handleSubmit}
                      type="primary"
                      disabled={isSubmitting}
                      className="site-description-item-profile-button"
                    >
                      Submit
                    </Button>
                    <Button danger onClick={withdrawalUser}>
                      Withdrawal
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            );
          }}
        </Formik>
      </Modal>
      <Button danger onClick={logoutHandler} icon={<LogoutOutlined />}>
        Logout
      </Button>
    </div>
  );
}

export default ProfileDrawer;
