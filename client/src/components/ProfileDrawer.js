import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Divider, Col, Row, Button, Modal, Form, Input, message } from "antd";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { dateFormat } from "./ParseData";

import "../assets/css/profileDrawer.css";
import { USER_SERVER } from "../templates/Config";

import { LogoutOutlined, UserOutlined, DollarOutlined } from "@ant-design/icons";
import { updateUser } from "../_actions/user_actions";
import { requestSeller } from "../_actions/seller_actions";

function ProfileDrawer() {
  const profile = useSelector((state) => state.user);
  const dispatch = useDispatch();

  let dataToSubmit;


  const [visible, setVisible] = useState(false);
  const [visibleSeller, setVisibleSeller] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmLoadingSeller, setConfirmLoadingSeller] = useState(false);
  const [userInfo, setUserInfo] = useState([]);

  const logoutHandler = () => {
    axios.get(`${process.env.REACT_APP_USER_SERVER}logout`).then((response) => {
      if (response.status === 200) {
        window.localStorage.setItem("userId", "");
        // window.location.href = "/login";
        window.location.reload();
      } else {
        message.error("Logout Failed..!");
      }
    });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

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
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 3000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const showModalSeller = () => {
    getUserInfo();
    setVisibleSeller(true);
  }

  const handleOkSeller = () => {
    setConfirmLoadingSeller(true);
    setTimeout(() => {
      setVisibleSeller(false);
      setConfirmLoadingSeller(false);
    }, 3000);
  };

  const handleCancelSeller = () => {
    setVisibleSeller(false);
  }

  const withdrawalUser = () => {
    axios
      .delete(`${process.env.REACT_APP_USER_SERVER}user/${profile.userData._id}`)
      .then((response) => {
        if (response.status === 200) {
          window.localStorage.setItem("userId", "");
          window.localStorage.setItem("rememberMe", "");
          window.location.reload();
        } else {
          message.error("Failed withdrawal user...!");
        }
      });
  };

  const getUserInfo = () => {
    axios
      .get(`${process.env.REACT_APP_USER_SERVER}user/${profile.userData._id}`)
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
          <DescriptionItem
            title="email"
            content={userInfo ? userInfo.email : "load failed...."}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title="name"
            content={userInfo ? userInfo.name : "load failed...."}
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem
            title="joinDate"
            content={
              userInfo
                ? dateFormat(userInfo.joinDate, "YYYY-MM-DD")
                : "load failed...."
            }
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title="birthDay"
            content={userInfo ? userInfo.birthDay : "load failed...."}
          />
        </Col>
      </Row>

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

              dispatch(updateUser(profile, dataToSubmit)).then((response) => {
                if (response.payload.success) {
                  message.success("The change has been completed.");
                } else {
                  message.error("update error");
                }
              });
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
      <Button className="site-description-item-profile-button"
        type="primary"
        ghost
        icon={<DollarOutlined />}
        onClick={showModalSeller}>
          Request Seller
      </Button>
      <Modal
        title="Request Seller"
        visible={visibleSeller}
        onOk={handleOkSeller}
        confirmLoading={confirmLoadingSeller}
        onCancel={handleCancelSeller}
      >
        <Formik
          initialValues={{
            companyName: "",
            companyAddress: "",
          }}
          validationSchema={Yup.object().shape({
            companyName: Yup.string().required("companyName is required"),
            companyAddress: Yup.string().required("companyAddress is required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              dataToSubmit = {
                userId: profile.userData._id,
                userName: profile.userData.name,
                userRole: profile.userData.role,
                userEmail: profile.userData.email,
                companyName: values.companyName,
                companyAddress: values.companyAddress,
              };

              dispatch(requestSeller(dataToSubmit)).then((response) => {
                if (response.payload.success) {
                  message.success("Request Complete!");
                } else {
                  message.error("Request Failed.");
                }
              });
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
                <h2 className="site-description-item-profile-modal-header">Request Seller</h2>
                <Form style={{ minWidth: "375px" }}
                  {...formItemLayout}
                  onSubmit={handleSubmit}
                >
                  <Form.Item required label="companyName" hasFeedback>
                    <Input
                      id="companyName"
                      placeholder="Enter your companyName"
                      type="companyName"
                      value={values.companyName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.companyName && touched.companyName ? "text-input error" : "text-input"
                      }
                    />
                    {errors.companyName && touched.companyName && (
                      <div className="input-feedback">{errors.companyName}</div>
                    )}
                  </Form.Item>

                  <Form.Item required label="companyAddress">
                    <Input
                      id="companyAddress"
                      placeholder="Enter your companyAddress"
                      type="companyAddress"
                      value={values.companyAddress}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.companyAddress && touched.companyAddress
                        ? "text-input error" : "text-input"
                      }
                    />
                    {errors.companyAddress && touched.companyAddress && (
                      <div className="input-feedback">{errors.companyAddress}</div>
                    )}
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
