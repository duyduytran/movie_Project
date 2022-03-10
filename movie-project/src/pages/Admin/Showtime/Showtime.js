import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Select,
  DatePicker,
  Selectker,
  InputNumber,
} from "antd";
import { quanLyRapService } from "../../../services/QuanLyRapService";
import { useFormik } from "formik";
import moment from "moment";
import { quanLyDatVeService } from "../../../services/QuanLyDatVeService";

export default function Showtime(props) {
  const formik = useFormik({
    initialValues: {
      maPhim: props.match.params.id,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: "",
    },
    onSubmit: async (values) => {
      console.log("values", values);

      try {
        let result = await quanLyDatVeService.taoLichChieu(values);
        alert(result.data.content);
      } catch (errors) {
        console.log("errors", errors.response?.data);
      }
    },
  });

  const [state, setState] = useState({
    heThongRapChieu: [],
    cumRapChieu: [],
  });

  const onOk = (values) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(values).format("DD/MM/YYYY hh:mm:ss")
    );
  };
  const onChangeData = (values) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(values).format("DD/MM/YYYY hh:mm:ss")
    );
  };
  const onChangeInputNumber = (values) => {
    formik.setFieldValue("giaVe", values);
  };
  useEffect(async () => {
    try {
      let result = await quanLyRapService.layThongTinHeThongRap();
      setState({
        ...state,
        heThongRapChieu: result.data.content,
      });
    } catch (errors) {
      console.log("errors", errors.response?.data);
    }
  }, []);
  const handleChangeHeThongRap = async (value) => {
    //Từ hệ thống rạp call api lấy thông tin rạp
    try {
      let result = await quanLyRapService.layThongTinCumRap(value);
      setState({
        ...state,
        cumRapChieu: result.data.content,
      });
    } catch (errors) {
      console.log("errors", errors.response?.data);
    }
  };

  const handleChangeCumRap = (value) => {
    formik.setFieldValue("maRap", value);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      autoComplete="off"
      onSubmitCapture={formik.handleSubmit}
    >
      <h3 className="text-2xl ">
        Tạo lịch chiếu: {props.match.params.tenPhim}
      </h3>
      <Form.Item label="Hệ thống rạp">
        <Select
          options={state.heThongRapChieu.map((htr, index) => {
            return { label: htr.maHeThongRap, value: htr.tenHeThongRap };
          })}
          onChange={handleChangeHeThongRap}
          placeholder="Chọn hệ thống rạp"
        />
        ,
      </Form.Item>
      <Form.Item label="Cụm rạp">
        <Select
          options={state.cumRapChieu?.map((cumRap, index) => ({
            label: cumRap.tenCumRap,
            value: cumRap.maCumRap,
          }))}
          onChange={handleChangeCumRap}
          placeholder="Chọn cụm rạp"
        />
        ,
      </Form.Item>
      <Form.Item label="Ngày chiếu giờ chiếu">
        <DatePicker showTime onChange={onChangeData} onOk={onOk} />
      </Form.Item>

      <Form.Item label="Giá vé">
        <InputNumber onChange={onChangeInputNumber} onOk={onOk} />
      </Form.Item>
      <Form.Item label="Chức năng">
        <Button style={{ color: "green" }} htmlType="submit">
          Tạo lịch chiếu
        </Button>
      </Form.Item>
    </Form>
  );
}
