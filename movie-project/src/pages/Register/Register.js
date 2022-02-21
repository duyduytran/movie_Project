import React from "react";
import { useFormik } from "formik";
import { dangKyAction } from "../../redux/action/QuanLyNguoiDungAction";
import { useDispatch } from "react-redux";

export default function Register(props) {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "",
      hoTen: "",
    },
    onSubmit: (values) => {
      const action = dangKyAction(values);
      dispatch(action);
      console.log("values", values);
    },
  });
  return (
    <div className="w-full h-100">
      <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
        Đăng ký tài khoản của riêng bạn
      </h1>
      <form
        onSubmit={formik.handleSubmit}
        className="mt-6"
        action="#"
        method="POST"
      >
        <div>
          <label className="block text-gray-700">Tài khoản:</label>
          <input
            onChange={formik.handleChange}
            name="taiKhoan"
            placeholder="Tài khoản"
            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
            required
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-700">Mật khẩu:</label>
          <input
            onChange={formik.handleChange}
            type="password"
            name="matKhau"
            placeholder="Nhập mật khẩu"
            minLength={5}
            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
focus:bg-white focus:outline-none"
            required
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-700">Email:</label>
          <input
            onChange={formik.handleChange}
            name="email"
            placeholder="Nhập email"
            minLength={5}
            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
focus:bg-white focus:outline-none"
            required
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-700">Số điện thoại:</label>
          <input
            onChange={formik.handleChange}
            name="soDt"
            placeholder="Số điện thoại"
            minLength={5}
            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
focus:bg-white focus:outline-none"
            required
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-700">Họ tên:</label>
          <input
            onChange={formik.handleChange}
            name="hoTen"
            placeholder="Họ Tên"
            minLength={5}
            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
focus:bg-white focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
px-4 py-3 mt-6"
        >
          Đăng ký
        </button>
      </form>
      <hr className="my-6 border-gray-300 w-full" />
    </div>
  );
}
