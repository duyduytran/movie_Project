import React, { useEffect } from "react";
import { Button, Table } from "antd";
import { Input } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { layDanhSachPhimAction } from "../../../redux/action/QuanLyPhimAction";

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

  const onSearch = (value) => console.log(value);

  const columns = [
    {
      title: "maPhim",
      dataIndex: "maPhim",

      filters: [
        {
          text: "Joe",
          value: "Joe",
        },
        {
          text: "Jim",
          value: "Jim",
        },
        {
          text: "Submenu",
          value: "Submenu",
          children: [
            {
              text: "Green",
              value: "Green",
            },
            {
              text: "Black",
              value: "Black",
            },
          ],
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Age",
      dataIndex: "age",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Address",
      dataIndex: "address",
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
  ];

  const data = arrFilmDefault;

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }
  return (
    <div>
      <h3>Quản lý phim</h3>
      <Button className="mb-5">Thêm phim</Button>
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Tìm kiếm"
        size="large"
        onSearch={onSearch}
      />
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
  );
}
