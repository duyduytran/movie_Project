import React, { Component, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";

import Film from "../Film/Film";
import Film_Flip from "../Film/Film_Flip";
import styleSlick from "./MultipleRowSlick.module.css";
import {
  SET_FILM_DANG_CHIEU,
  SET_FILM_SAP_CHIEU,
} from "../../redux/types/QuanLyPhimType";
import { Tabs } from "antd";

const { TabPane } = Tabs;

function SampleNextArrow(props) {
  const { className, style, onClick } = props;

  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    ></div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{ ...style, display: "block", left: "-50px" }}
      onClick={onClick}
    ></div>
  );
}
const MultipleRowSlick = (props) => {
  const { dangChieu, sapChieu } = useSelector(
    (state) => state.QuanLyPhimReducer
  );
  const [state, setState] = useState({
    tabPosition: "top top",
  });

  const dispatch = useDispatch();
  const renderFilm = () => {
    return props.arrFilm.map((item, index) => {
      return (
        <div className="mt-2" key={index}>
          <Film_Flip item={item} />
        </div>
      );
    });
  };

  let activeClassDC = dangChieu === true ? "active_Film" : "non_active_Film";
  let activeClassSC = sapChieu === true ? "active_Film" : "non_active_Film";

  const settings = {
    className: "center variable-width",
    centerMode: true,
    infinite: true,
    centerPadding: "30px",
    slidesToShow: 2,
    speed: 300,
    rows: 2,
    slidesPerRow: 2,
    variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const { tabPosition } = state;

  return (
    <div>
      {/* <div style={{ textAlign: 'center' }}>
                <button type="button" className={`${styleSlick[activeClassDC]} mx-2 px-8 py-3 font-semibold rounded-full `} onClick={() => {
                    const action = {
                        type: SET_FILM_DANG_CHIEU
                    }
                    dispatch(action);
                }}>Phim Đang Chiếu</button>
                <button type="button" className={`${styleSlick[activeClassSC]} mx-2 px-8 py-3 font-semibold rounded-full `} onClick={() => {
                    const action = { type: SET_FILM_SAP_CHIEU }
                    dispatch(action);
                }}>Phim Sắp Chiếu</button>
            </div> */}

      <Tabs tabPosition={tabPosition}>
        <TabPane
          tab="Phim Đang Chiếu"
          key="1"
          onClick={() => {
            const action = {
              type: SET_FILM_DANG_CHIEU,
            };
            dispatch(action);
          }}
        >
          <Slider {...settings}>{renderFilm()}</Slider>
        </TabPane>
        <TabPane tab="Phim Sắp Chiếu" key="2">
          <Slider {...settings}>{renderFilm()}</Slider>
        </TabPane>
      </Tabs>

      {/* <Slider {...settings}>
                {renderFilm()}
            </Slider> */}
    </div>
  );
};

export default MultipleRowSlick;
