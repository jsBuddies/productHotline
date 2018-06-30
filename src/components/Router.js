import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "../App";
import Form from "./form/Form";


const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/admin/form" component={Form} />
    </Switch>
  </BrowserRouter>
);

export default Router;
