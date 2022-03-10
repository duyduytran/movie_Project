import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, DatePicker, InputNumber, TreeSelect, Switch } from "antd";
import { useFormik } from "formik";
import moment from "moment";
import {
  capNhapPhimUpload,
  layThongTinPhim,
} from "../../../../redux/action/QuanLyPhimAction";
import { GROUP_ID } from "../../../../util/setting/confiq";

const Edit = (props) => {
  const [componentSize, setComponentSize] = useState("default");

  const [imgSrc, setImgSrc] = useState("");

  const { thongTinPhim } = useSelector((state) => state.QuanLyPhimReducer);
  console.log("thongTinPhim", thongTinPhim);

  const dispatch = useDispatch();
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  useEffect(() => {
    let { id } = props.match.params;
    dispatch(layThongTinPhim(id));
  }, []);

  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      tenPhim: thongTinPhim.tenPhim,
      trailer: thongTinPhim.trailer,
      moTa: thongTinPhim.moTa,
      ngayKhoiChieu: thongTinPhim.ngayKhoiChieu,
      dangChieu: thongTinPhim.dangChieu,
      sapChieu: thongTinPhim.sapChieu,
      hot: thongTinPhim.hot,
      danhGia: thongTinPhim.danhGia,
      hinhAnh: null,
    },
    onSubmit: (values) => {
      console.log("values", values);
      values.maNhom = GROUP_ID;
      //Tạo đối tượng formdata => Đua giá trị values từ formik vào formdata
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          if (values.hinhAnh !== null) {
            formData.append("File", values.hinhAnh, values.hinhAnh.name);
          }
        }
      }
      //cập nhật phim upload hình
      dispatch(capNhapPhimUpload(formData));
    },
  });

  const handleChangeDatePicker = (values) => {
    let ngayKhoiChieu = moment(values).format("DD/MM/YYYY");
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };

  const handleChangeFile = async (e) => {
    //Lấy file ra từ e
    let file = e.target.files[0];
    if (
      file.type === "image/jpeg" ||
      file.type === "image/gif" ||
      file.type === "image/png" ||
      file.type === "image/jpg"
    ) {
      //Tạo đối tượng để đọc file
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        console.log(e.target.result);
        setImgSrc(e.target.result);
      };
      //Đem dữ liệu file lưu vào formik
      await formik.setFieldValue("hinhAnh", file);
    }
    console.log("file", file);
  };

  return (
    <Form
      onSubmitCapture={formik.handleSubmit}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
    >
      <h3>Thêm phim :</h3>

      <Form.Item label="Tên phim">
        <Input
          onChange={formik.handleChange}
          name="tenPhim"
          value={formik.values.tenPhim}
        />
      </Form.Item>
      <Form.Item label="Trailer">
        <Input
          onChange={formik.handleChange}
          name="trailer"
          value={formik.values.trailer}
        />
      </Form.Item>
      <Form.Item label="Mô Tả">
        <Input
          onChange={formik.handleChange}
          name="moTa"
          value={formik.values.moTa}
        />
      </Form.Item>
      <Form.Item label="Ngày khởi chiếu">
        <DatePicker
          onChange={handleChangeDatePicker}
          format="DD/MM/YYYY"
          value={moment(formik.values.ngayKhoiChieu, "YYYY/MM/DD  ")}
        />
      </Form.Item>
      <Form.Item label="Đang chiếu" valuePropName="checked">
        <Switch
          onChange={handleChangeSwitch("dangChieu")}
          checked={formik.values.dangChieu}
        />
      </Form.Item>
      <Form.Item label="Sắp chiếu" valuePropName="checked">
        <Switch
          onChange={handleChangeSwitch("sapChieu")}
          checked={formik.values.sapChieu}
        />
      </Form.Item>
      <Form.Item label="Hot" valuePropName="checked">
        <Switch
          onChange={handleChangeSwitch("hot")}
          checked={formik.values.hot}
        />
      </Form.Item>
      <Form.Item label="Số sao">
        <InputNumber
          onChange={handleChangeSwitch("danhGia")}
          value={formik.values.danhGia}
        />
      </Form.Item>
      <Form.Item label="Hình ảnh">
        <input
          accept="image/png,image/jpeg,image/gif,img/jpg"
          type="file"
          onChange={handleChangeFile}
        />
        <br />
        <img
          style={{ width: 100, height: 100 }}
          src={imgSrc === "" ? thongTinPhim.hinhAnh : imgSrc}
          alt="..."
        />
      </Form.Item>

      <Form.Item label="Tác vụ">
        <button type="submit" className="bg-green-800 text-white p-2">
          Cập nhật
        </button>
      </Form.Item>
    </Form>
  );
};

export default Edit;
