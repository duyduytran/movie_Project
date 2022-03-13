import React, { useEffect } from "react";
import { Carousel } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getCarouselAction } from "../../../redux/action/CarouselAction";
import "./HomeCarousel.css";

const contentStyle = {
  height: "400px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",

  backgroundSize: "100%",
  backgroundPosition: "center",
};

export default function HomeCarousel() {
  const { arrImg } = useSelector((state) => state.CarouselReducer);

  const dispatch = useDispatch();

  //Sẽ tự kích hoạt khi component load ra
  useEffect(() => {
    const action = getCarouselAction();
    dispatch(action);
  }, []);

  const renderCarousel = () => {
    return arrImg.map((item, index) => {
      return (
        <div key={index}>
          <div
            style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})` }}
          >
            <img className="w-full" src={item.hinhAnh} alt="..." />
          </div>
        </div>
      );
    });
  };
  return <Carousel>{renderCarousel()}</Carousel>;
}
