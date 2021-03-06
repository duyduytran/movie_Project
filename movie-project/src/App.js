import "./App.css";
import React from "react";
import { createBrowserHistory } from "history";
import { Router, Switch, Route } from "react-router";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import { AdminTemplate } from "./templates/AdminTemplate/AdminTemplate";
import Home from "./pages/Home/Home";
import Detail from "./pages/Detail/Detail";
import Contact from "./pages/Contact/Contact";
import News from "./pages/News/News";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import CheckOut from "./pages/CheckOut/CheckOut";
import { CheckOutTemplate } from "./templates/CheckOutTemplate/CheckOutTemplate";
import { UserTemplate } from "./templates/UserTemplate/UserTemplate";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import AFilm from "./pages/Admin/AFilm/AFilm";
import Showtime from "./pages/Admin/Showtime/Showtime";
import AddFilm from "./pages/Admin/AFilm/AddFilm/AddFilm";
import Edit from "./pages/Admin/AFilm/Edit/Edit";

export const history = createBrowserHistory();
function App() {
  return (
    <Router history={history}>
      <Switch>
        <HomeTemplate path="/home" exact Component={Home} />
        <HomeTemplate path="/contact" exact Component={Contact} />
        <HomeTemplate path="/news" exact Component={News} />
        <HomeTemplate path="/detail/:id" exact Component={Detail} />
        <UserTemplate path="/login" exact Component={Login} />
        <UserTemplate path="/register" exact Component={Register} />

        <CheckOutTemplate path="/checkout/:id" exact Component={CheckOut} />

        <AdminTemplate path="/admin/films" exact Component={AFilm} />
        <AdminTemplate path="/admin/films/addfilm" exact Component={AddFilm} />
        <AdminTemplate path="/admin/films/edit/:id" exact Component={Edit} />
        <AdminTemplate path="/admin/dashboards" exact Component={Dashboard} />
        <AdminTemplate
          path="/admin/films/showtime/:id/:tenPhim"
          exact
          Component={Showtime}
        />

        <HomeTemplate path="/" exact Component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
