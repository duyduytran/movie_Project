import { quanLyDatVeService } from "../../services/QuanLyDatVeService";
import { DAT_VE, SET_CHI_TIET_PHONG_VE } from "../types/QuanLyDatVeType";

export const layChiTietPhongVeAction = (maLichChieu) => {
  return async (dispatch) => {
    try {
      const result = await quanLyDatVeService.layChiTietPhongVe(maLichChieu);

      if (result.data.statusCode === 200) {
        dispatch({
          type: SET_CHI_TIET_PHONG_VE,
          chiTietPhongVe: result.data.content,
        });
      }
    } catch (errors) {
      console.log("errors", errors.response?.data);
    }
  };
};

export const datVeAction = (thongTinDatVe) => {
  return async (dispatch) => {
    try {
      let result = await quanLyDatVeService.datVe(thongTinDatVe);
      if (result.data.statusCode === 200) {
        alert("Bạn đã đặt vé thành công");
      }
      console.log("result", result.data.content);
    } catch (errors) {
      console.log("errors", errors.response?.data);
    }
  };
};
