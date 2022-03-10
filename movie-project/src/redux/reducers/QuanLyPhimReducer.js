import { SET_CHI_TIET_PHIM } from "../types/QuanLyRapType";
import {
  SET_DANH_SACH_PHIM,
  SET_FILM_DANG_CHIEU,
  SET_FILM_SAP_CHIEU,
  SET_THONG_TIN_PHIM,
} from "../types/QuanLyPhimType";

const stateDefault = {
  arrFilm: [
    {
      maPhim: 8225,
      tenPhim: "The Boss Baby: Back in Business – Season 3",
      biDanh: "the-boss-baby-back-in-business-–-season-3",
      trailer: "aPu6yQ0OrG8",
      hinhAnh:
        "https://movienew.cybersoft.edu.vn/hinhanh/the-boss-baby-back-in-business-–-season-3_gp01.jpg",
      moTa: "With a little help from his brother and accomplice, Tim, Boss Baby tries to balance family life with his job at Baby Corp headquarters !!!",
      maNhom: "GP01",
      ngayKhoiChieu: "2021-12-06T01:21:57.173",
      danhGia: 6,
      hot: true,
      dangChieu: true,
      sapChieu: false,
    },
  ],
  dangChieu: false,
  sapChieu: false,
  arrFilmDefault: [],
  filmDetail: {
    maLichChieu: "21229",
    maRap: "562",
    tenRap: "Rạp 2",
    ngayChieuGioChieu: "2019-01-01T10:10:00",
    giaVe: 75000,
    thoiLuong: 120,
  },
  thongTinPhim: {},
};

export const QuanLyPhimReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case SET_DANH_SACH_PHIM: {
      state.arrFilm = action.arrFilm;
      state.arrFilmDefault = state.arrFilm;
      return { ...state };
    }

    case SET_FILM_DANG_CHIEU: {
      state.dangChieu = !state.dangChieu;
      state.arrFilm = state.arrFilmDefault.filter(
        (film) => film.dangChieu === state.dangChieu
      );
      return { ...state };
    }

    case SET_FILM_SAP_CHIEU: {
      state.sapChieu = !state.sapChieu;
      state.arrFilm = state.arrFilmDefault.filter(
        (film) => film.sapChieu === state.sapChieu
      );
      return { ...state };
    }

    case SET_CHI_TIET_PHIM: {
      state.filmDetail = action.filmDetail;
      return { ...state };
    }
    case SET_THONG_TIN_PHIM: {
      state.thongTinPhim = action.thongTinPhim;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
