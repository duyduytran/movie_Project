import React, { Fragment, useState } from "react";
import { Tabs, Radio, Space, Divider } from "antd";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import moment from "moment";
const { TabPane } = Tabs;

export default class Demo extends React.PureComponent {
  state = {
    tabPosition: "left",
  };

  renderHeThongRap = () => {
    return this.props.heThongRapChieu?.map((heThongRap, index) => {
      let { tabPosition } = this.state;
      return (
        <TabPane
          tab={
            <img src={heThongRap.logo} className="rounded-full" width="50" />
          }
          key={index}
        >
          <Tabs tabPosition={tabPosition}>
            {heThongRap.lstCumRap?.map((cumRap, index) => {
              return (
                <TabPane
                  tab={
                    <div style={{ width: "300px", display: "flex" }}>
                      <img src={heThongRap.logo} alt="" width={50} />
                      <div className="text-left ml-2">
                        <p>{cumRap.tenCumRap}</p>

                        <p className="text-red-500">Chi Tiết</p>
                      </div>
                    </div>
                  }
                  key={index}
                >
                  {/* load phim của cụm rạp */}
                  {cumRap.danhSachPhim.slice(0, 10).map((phim, index) => {
                    return (
                      <Fragment key={index}>
                        <div className="my-2">
                          <div style={{ display: "flex" }}>
                            <img
                              src={phim.hinhAnh}
                              alt={phim.tenPhim}
                              width={150}
                              height={150}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://picsum.photos/75/75";
                              }}
                            />
                            <div className="ml-3">
                              <h3 className="text-red-700 text-2xl">
                                {phim.tenPhim}
                              </h3>
                              <span>Địa chỉ: {cumRap.diaChi}</span>
                              <div className="grid grid-cols-6 gap-6">
                                {phim.lstLichChieuTheoPhim
                                  ?.slice(0, 12)
                                  .map((lichChieu, index) => {
                                    return (
                                      <NavLink
                                        className="text-xl text-red-500"
                                        to={`/checkout/${lichChieu.maLichChieu}`}
                                        key={index}
                                      >
                                        {moment(
                                          lichChieu.ngayChieuGioChieu
                                        ).format("hh:mm A")}
                                      </NavLink>
                                    );
                                  })}
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                      </Fragment>
                    );
                  })}
                </TabPane>
              );
            })}
          </Tabs>
        </TabPane>
      );
    });
  };

  changeTabPosition = (e) => {
    this.setState({ tabPosition: e.target.value });
  };
  render() {
    const { tabPosition } = this.state;
    return (
      <>
        <Tabs tabPosition={tabPosition}>{this.renderHeThongRap()}</Tabs>
      </>
    );
  }
}
