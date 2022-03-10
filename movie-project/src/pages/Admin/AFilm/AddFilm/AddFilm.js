import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
} from "antd";
import { useFormik } from "formik";
import moment from "moment";
import { themPhimUploadHinhAction } from "../../../../redux/action/QuanLyPhimAction";
import { GROUP_ID } from "../../../../util/setting/confiq";

const AddFilm = () => {
  const [componentSize, setComponentSize] = useState("default");

  const [imgSrc, setImgSrc] = useState("null");

  const dispatch = useDispatch();
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 0,
      hinhAnh: {},
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
          formData.append("File", values.hinhAnh, values.hinhAnh.name);
        }
      }
      //gọi api thêm các giá trị formdata về backend xử lý
      dispatch(themPhimUploadHinhAction(formData));
    },
  });

  const handleChangeDatePicker = (values) => {
    let ngayKhoiChieu = moment(values).format("DD/MM/YYYY");
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };

  const handleChangeFile = (e) => {
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
      formik.setFieldValue("hinhAnh", file);
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
        <Input onChange={formik.handleChange} name="tenPhim" />
      </Form.Item>
      <Form.Item label="Trailer">
        <Input onChange={formik.handleChange} name="trailer" />
      </Form.Item>
      <Form.Item label="Mô Tả">
        <Input onChange={formik.handleChange} name="moTa" />
      </Form.Item>
      <Form.Item label="Ngày khởi chiếu">
        <DatePicker onChange={handleChangeDatePicker} />
      </Form.Item>
      <Form.Item label="Đang chiếu" valuePropName="checked">
        <Switch onChange={handleChangeSwitch("dangChieu")} />
      </Form.Item>
      <Form.Item label="Sắp chiếu" valuePropName="checked">
        <Switch onChange={handleChangeSwitch("sapChieu")} />
      </Form.Item>
      <Form.Item label="Hot" valuePropName="checked">
        <Switch onChange={handleChangeSwitch("hot")} />
      </Form.Item>
      <Form.Item label="Số sao">
        <InputNumber onChange={handleChangeSwitch("danhGia")} />
      </Form.Item>
      <Form.Item label="Hình ảnh">
        <input
          accept="image/png,image/jpeg,image/gif,img/jpg"
          type="file"
          onChange={handleChangeFile}
        />
        <br />
        <img style={{ width: 150, height: 150 }} src={imgSrc} alt="..." />
      </Form.Item>

      <Form.Item label="Tác vụ">
        <button type="submit" className="bg-green-800 text-white p-2">
          Thêm phim
        </button>
      </Form.Item>
    </Form>
  );
};

export default AddFilm;
