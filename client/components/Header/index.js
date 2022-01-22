import React, { Component } from "react";
import { MenuLinks } from "../../../src/routes";
import { Link } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <>
        {MenuLinks.map((menu, index) => (
          <Link key={index} to={menu.url}>{menu.menuText}</Link>
        ))}
      </>
    );
  }
}
