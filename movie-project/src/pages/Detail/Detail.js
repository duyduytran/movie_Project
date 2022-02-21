import React, { useEffect } from "react";
import "./Detail.css";
import "../../assets/Styles/circle.css";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { layThongTinLichChieu } from "../../redux/action/QuanLyRapAction";
import moment from "moment";
import { NavLink, Redirect } from "react-router-dom";
import { USER_LOGIN } from "../../util/setting/confiq";

const { TabPane } = Tabs;

export default function Detail(props) {
  const filmDetail = useSelector((state) => state.QuanLyPhimReducer.filmDetail);
  console.log("filmDetail", filmDetail);

  const dispatch = useDispatch();
  useEffect(() => {
    //Lấy thông tin từ url
    let { id } = props.match.params;

    dispatch(layThongTinLichChieu(id));
  }, []);

  //Chưa đăng nhập thì chưa checkout đc đá về login
  if (!localStorage.getItem(USER_LOGIN)) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <div
        className="App "
        style={{
          backgroundImage: `url(${filmDetail.hinhAnh})`,
          backgroundSize: "100%",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        <div className="box1">
          <div className="grid grid-cols-12">
            <div className="col-span-4 col-start-4">
              <div className="grid grid-cols-2">
                <img src={filmDetail.hinhAnh} alt="..." />
                <div>
                  <p className="text-sm">
                    Ngaỳ chiếu:{" "}
                    {moment(filmDetail.ngayKhoiChieu).format("DD.MM.YYYY")}
                  </p>
                  <p className="text-4xl">Tên phim: {filmDetail.tenPhim}</p>
                  <p>Mô tả: {filmDetail.moTa}</p>
                </div>
              </div>
            </div>
            <div className="col-span-4">
              <div className={`c100 p${filmDetail.danhGia * 10} big`}>
                <span>{filmDetail.danhGia * 10}%</span>
                <div class="slice">
                  <div class="bar"></div>
                  <div class="fill"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-20 ml-72 w-2/3 container  bg-white px-5 py-5">
            <div>
              <Tabs tabPosition={"left"} className="">
                {filmDetail.heThongRapChieu?.map((rapChieu, index) => {
                  return (
                    <TabPane
                      tab={
                        <div>
                          <img
                            src={rapChieu.logo}
                            width={50}
                            alt={rapChieu.logo}
                            className="rounded-full"
                          />
                          {rapChieu.tenHeThongRap}
                        </div>
                      }
                      key={index}
                    >
                      {rapChieu.cumRapChieu?.map((cumRap, index) => {
                        return (
                          <div className="mt-5" key={index}>
                            <div className="flex flex-row">
                              <img
                                style={{ width: 60, height: 60 }}
                                src="https://s3img.vcdn.vn/123phim/2018/09/ddc-dong-da-15379624326697.jpg"
                                alt="..."
                              />
                              <div className="ml-2">
                                <p
                                  style={{
                                    fontSize: 20,
                                    fontWeight: "bold",
                                    lineHeight: 1,
                                  }}
                                >
                                  {cumRap.tenCumRap}
                                </p>
                                <p
                                  className="text-gray-400"
                                  style={{ marginTop: 0 }}
                                >
                                  {cumRap.tenCumRap}
                                </p>
                              </div>
                            </div>
                            <div className="thong-tin-lich-chieu grid grid-cols-4">
                              {cumRap.lichChieuPhim
                                ?.slice(0, 12)
                                .map((lichChieu, index) => {
                                  return (
                                    <NavLink
                                      to={`/checkout/${lichChieu.maLichChieu}`}
                                      key={index}
                                      className="col-span-1 text-green-800 font-bold"
                                    >
                                      {moment(
                                        lichChieu.ngayChieuGioChieu
                                      ).format("hh:mm A")}
                                    </NavLink>
                                  );
                                })}
                            </div>
                          </div>
                        );
                      })}
                    </TabPane>
                  );
                })}
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
