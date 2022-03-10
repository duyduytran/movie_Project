import React, { useEffect } from "react";
import HomeMenu from "../HomeMenu/HomeMenu";
import { useSelector, useDispatch } from "react-redux";
import HomeCarousel from "../../templates/Layout/HomeCarousel/HomeCarousel";
import Film from "../../components/Film/Film";
import MultipleRowSlick from "../../components/ReactSlick/MultipleRowSlick";
import { layDanhSachPhimAction } from "../../redux/action/QuanLyPhimAction";
import { layDanhSachHeThongRapAction } from "../../redux/action/QuanLyRapAction";

export default function Home(props) {
  const { arrFilm } = useSelector((state) => state.QuanLyPhimReducer);
  const { heThongRapChieu } = useSelector((state) => state.QuanLyRapReducer);
  const dispatch = useDispatch();
  const renderFilm = () => {
    return arrFilm.map((film, index) => {
      return <Film key={index} />;
    });
  };

  useEffect(() => {
    const action = layDanhSachPhimAction();
    dispatch(action);

    dispatch(layDanhSachHeThongRapAction());
  }, []);
  return (
    <div>
      <HomeCarousel />
      <section className="text-gray-400  body-font">
        <div className="container px-5 py-24 mx-auto">
          <MultipleRowSlick arrFilm={arrFilm} />
          {/* <div className="flex flex-wrap -m-4" style={{ justifyContent: 'center' }}>
                        {renderFilm()}
                    </div> */}
        </div>
      </section>

      <div className="mx-44 mb-36">
        <HomeMenu heThongRapChieu={heThongRapChieu} />
      </div>
    </div>
  );
}
