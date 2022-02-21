import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { CarouselReducer } from "./reducers/CarouselReducer";
import { QuanLyPhimReducer } from "./reducers/QuanLyPhimReducer";
import { QuanLyNguoiDungReducer } from "./reducers/QuanLyNguoiDungReducer";
import { QuanLyDatVeReducer } from "./reducers/QuanLyDatVeReducer";
import { QuanLyRapReducer } from "./reducers/QuanLyRapReducer";

const rootReducer = combineReducers({
  //state ứng dụng
  CarouselReducer,
  QuanLyPhimReducer,
  QuanLyNguoiDungReducer,
  QuanLyDatVeReducer,
  QuanLyRapReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
