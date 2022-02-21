import React from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { dangNhapAction } from "../../redux/action/QuanLyNguoiDungAction";

export default function Login(props) {
  const dispatch = useDispatch();
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  console.log("userLogin", userLogin);
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    onSubmit: (values) => {
      const action = dangNhapAction(values);
      dispatch(action);
      console.log("values", values);
    },
  });
  return (
    <div className="w-full h-100">
      <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
        Đăng nhập vào tài khoản của bạn
      </h1>
      <form
        onSubmit={formik.handleSubmit}
        className="mt-6"
        action="#"
        method="POST"
      >
        <div>
          <label className="block text-gray-700">Tài khoản</label>
          <input
            onChange={formik.handleChange}
            name="taiKhoan"
            placeholder="Tài khoản"
            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
            required
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-700">Mật khẩu</label>
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
        <div className="text-right mt-2">
          <a
            href="#"
            className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
          >
            Quên mật khẩu?
          </a>
        </div>
        <button
          type="submit"
          className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
px-4 py-3 mt-6"
        >
          Đăng nhập
        </button>
      </form>
      <hr className="my-6 border-gray-300 w-full" />
      <button
        type="button"
        className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
      >
        <div className="flex items-center justify-center">
          <span className="ml-4">Đăng nhập bằng Google</span>
        </div>
      </button>
      <p className="mt-8">
        Bạn cần đăng ký?{" "}
        <a href="#" className="text-blue-500 hover:text-blue-700 font-semibold">
          Tạo tài khoản ngay
        </a>
      </p>
    </div>
  );
}
