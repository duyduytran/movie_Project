import { Fragment, useEffect } from "react";
import { Route, Redirect } from "react-router";
import { USER_LOGIN } from "../../util/setting/confiq";

export const CheckOutTemplate = (props) => {
  const { Component, ...restProps } = props;
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  //Chưa đăng nhập thì chưa checkout đc đá về login
  if (!localStorage.getItem(USER_LOGIN)) {
    return <Redirect to="/login" />;
  }

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        //Trả về location,history và match từ propsRoute
        return (
          <Fragment>
            <Component {...propsRoute} />
          </Fragment>
        );
      }}
    />
  );
};
