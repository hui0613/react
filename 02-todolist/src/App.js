import React from "react";
import store from "./store";
import { Provider } from "react-redux";

import { Container } from "./AppStyle";

import Input from "./components/input";
import ListItem from "./components/ListItem";

export default class APP extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container>
          <Input></Input>
          <ListItem></ListItem>
        </Container>
      </Provider>
    );
  }
}
