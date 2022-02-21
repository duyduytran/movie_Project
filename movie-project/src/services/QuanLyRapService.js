import { baseService } from "./baseService";
import { GROUP_ID } from "../util/setting/confiq";

export class QuanLyRapService extends baseService {
  constructor() {
    super();
  }

  layThongTinLichChieu = (maPhim) => {
    return this.get(`api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`);
  };

  layDanhSachHeThongRap = () => {
    return this.get(
      `/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUP_ID}`
    );
  };
}

export const quanLyRapService = new QuanLyRapService();
