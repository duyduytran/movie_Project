import { Fragment, useEffect } from "react";
import { Route } from "react-router";
import Footer from "../Layout/Footer/Footer";
import Header from "../Layout/Header/Header";

export const HomeTemplate = (props) => {
  const { Component, ...restProps } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        //Trả về location,history và match từ propsRoute
        return (
          <Fragment>
            <Header {...propsRoute} />

            <Component {...propsRoute} />
            {/* <hr className="mt-10" /> */}
            <Footer />
          </Fragment>
        );
      }}
    />
  );
};
