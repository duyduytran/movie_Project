import { DANG_NHAP_ACTION, DANG_KY_ACTION } from "../types/QuanLyNguoiDungType";
import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService";
import { history } from "../../App";

export const dangNhapAction = (thongTinDangNhap) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);
      if (result.data.statusCode === 200) {
        dispatch({
          type: DANG_NHAP_ACTION,
          thongTinDangNhap: result.data.content,
        });
        //Sau khi đăng nhập thành công trả về trang trước đó
        history.goBack();
      }
      console.log("result", result);
    } catch (errors) {
      console.log("errors", errors.response?.data);
    }
  };
};

export const dangKyAction = (thongTinDangKy) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.dangKy(thongTinDangKy);
      dispatch({
        type: DANG_KY_ACTION,
        thongTinDangKy: result.data.content,
      });
      //Sau khi đăng ký trả về trang đăng nhập
      history.push("/login");
    } catch (errors) {
      console.log("errors", errors.response?.data);
    }
  };
};
