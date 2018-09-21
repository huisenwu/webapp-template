import "@babel/polyfill";
import "whatwg-fetch";
import React from "react";
import ReactDOM from "react-dom";
import Main from "./components/main";

ReactDOM.render(React.createElement(Main, {}), document.getElementById("container"));
