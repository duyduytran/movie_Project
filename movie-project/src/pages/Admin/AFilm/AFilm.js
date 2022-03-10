import React, { Fragment, useEffect } from "react";
import { Button, Table } from "antd";
import { Input } from "antd";
import {
  AudioOutlined,
  DeleteOutlined,
  EditOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  layDanhSachPhimAction,
  xoaPhimAction,
} from "../../../redux/action/QuanLyPhimAction";
import { NavLink } from "react-router-dom";
import { history } from "../../../App";

export default function AFilm() {
  const { arrFilmDefault } = useSelector((state) => state.QuanLyPhimReducer);
  const dispatch = useDispatch();
  console.log("arrFilmDefault", arrFilmDefault);
  useEffect(() => {
    dispatch(layDanhSachPhimAction());
  }, []);

  const { Search } = Input;

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1890ff",
      }}
    />
  );

  const onSearch = (value) => {
    dispatch(layDanhSachPhimAction(value));
  };

  const columns = [
    {
      title: "Mã Phim",
      dataIndex: "maPhim",

      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ["descend", "ascend"],
      width: "15%",
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      render: (text, film, index) => {
        return (
          <Fragment>
            <img
              src={film.hinhAnh}
              alt={film.tenPhim}
              width={50}
              height={50}
              onError={(e) => {
                e.target.onError = null;
                e.target.src = `https://picsum.photo/id/${index}/50/50`;
              }}
            />
          </Fragment>
        );
      },
      defaultSortOrder: "descend",
      sorter: (a, b) => a.age - b.age,
      width: "15%",
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      sorter: (a, b) => {
        let tenPhimA = a.tenPhim.toLowerCase().trim();
        let tenPhimB = b.tenPhim.toLowerCase().trim();
        if (tenPhimA > tenPhimB) {
          return 1;
        }
        return -1;
      },
      onFilter: (value, record) => record.address.indexOf(value) === 0,
      width: "20%",
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      sorter: (a, b) => {
        let motaA = a.mota.toLowerCase().trim();
        let motaB = b.mota.toLowerCase().trim();
        if (motaA > motaB) {
          return 1;
        }
        return -1;
      },
      onFilter: (value, record) => record.address.indexOf(value) === 0,
      render: (text, film) => {
        return (
          <Fragment>
            {film.moTa.length > 50
              ? film.moTa.substr(0, 50) + "..."
              : film.moTa}
          </Fragment>
        );
      },
      width: "25%",
    },
    {
      title: "Tác vụ",
      dataIndex: "Tacvu",

      render: (text, film) => {
        return (
          <Fragment>
            <NavLink
              key={1}
              className="mr-2 text-2xl"
              to={`/admin/films/edit/${film.maPhim}`}
            >
              <EditOutlined style={{ color: "blue" }} />
            </NavLink>
            <span
              style={{ cursor: "pointer" }}
              key={2}
              className="text-2xl"
              onClick={() => {
                //Gọi action xóa
                if (
                  window.confirm("Bạn có chắc muốn xóa phim " + film.tenPhim)
                ) {
                  //Gọi  action
                  dispatch(xoaPhimAction(film.maPhim));
                }
              }}
            >
              <DeleteOutlined style={{ color: "red" }} />
            </span>
            <NavLink
              key={1}
              className="mr-2 text-2xl"
              to={`/admin/films/showtime/${film.maPhim}/${film.tenPhim}`}
            >
              <CalendarOutlined style={{ color: "green" }} />
            </NavLink>
          </Fragment>
        );
      },
      width: "25%",
    },
  ];

  const data = arrFilmDefault;

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }
  return (
    <div>
      <h3>Quản lý phim</h3>
      <Button
        className="mb-5"
        onClick={() => {
          history.push("/admin/films/addfilm");
        }}
      >
        Thêm phim
      </Button>
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Tìm kiếm"
        size="large"
        onSearch={onSearch}
      />
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        rowKey={"maPhim"}
      />
    </div>
  );
}
