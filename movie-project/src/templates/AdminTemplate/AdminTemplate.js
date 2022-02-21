import { Layout, Menu } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import "./AdminTemplate.css";
import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { USER_LOGIN } from "../../util/setting/confiq";
import { useSelector } from "react-redux";

export const AdminTemplate = (props) => {
  const { Component, ...restProps } = props;
  const { Header, Content, Sider } = Layout;
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  if (!localStorage.getItem(USER_LOGIN)) {
    alert("Bạn không có quyền truy cập vào trang này!");
    return <Redirect to="/" />;
  }

  if (userLogin.maLoaiNguoiDung !== "QuanTri") {
    alert("Bạn không có quyền truy cập vào trang này!");
    return <Redirect to="/" />;
  }

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        //Trả về location,history và match từ propsRoute
        return (
          <Layout>
            <Sider
              breakpoint="lg"
              collapsedWidth="0"
              onBreakpoint={(broken) => {
                console.log(broken);
              }}
              onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
              }}
            >
              <div className="logo" />
              <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
                <Menu.Item key="1" icon={<UserOutlined />}>
                  nav 1
                </Menu.Item>
                <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                  nav 2
                </Menu.Item>
                <Menu.Item key="3" icon={<UploadOutlined />}>
                  nav 3
                </Menu.Item>
                <Menu.Item key="4" icon={<UserOutlined />}>
                  nav 4
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout>
              <Header
                className="site-layout-sub-header-background"
                style={{ padding: 0 }}
              />
              <Content style={{ margin: "24px 16px 0" }}>
                <div
                  className="site-layout-background"
                  style={{ padding: 24, minHeight: 360 }}
                >
                  <Component {...propsRoute} />
                </div>
              </Content>
            </Layout>
          </Layout>
        );
      }}
    />
  );
};
