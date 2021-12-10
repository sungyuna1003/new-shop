/* eslint-disable */

import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import "../detail.scss";
import { 재고context } from "../App.js";
import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";
function Detail(props) {
  let [alert, alert변경] = useState(true);
  let [inputData, inputData변경] = useState("");

  let [누른탭, 누른탭변경] = useState(0);
  let [스위치, 스위치변경] = useState(false);

  let 재고 = useContext(재고context);
  //실행 한번만 될 때만 나타남
  useEffect(() => {
    let timer = setTimeout(function () {
      alert변경(false);
    }, 2000);
    console.log("ddd");
    return () => {
      clearTimeout(timer);
    };
  }, []);

  let history = useHistory(props);
  let { id } = useParams();
  return (
    <div className="container">
      {inputData}
      <input
        onChange={(e) => {
          inputData변경(e.target.value);
        }}
      />
      {alert === true ? (
        <div className="my-alert">
          <p class="alert">재고가 얼마 남지 않았습니다.</p>
        </div>
      ) : null}
      <div className="row">
        <div className="col-md-6">
          <img
            src="https://codingapple1.github.io/shop/shoes1.jpg"
            width="100%"
          />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">상품명: {props.shoes[id].title}</h4>
          <p>상품설명:{props.shoes[id].content}</p>
          <p>{props.shoes[id].price}</p>

          <Info 재고두번째={props.재고} />
          <button
            className="btn btn-danger"
            onClick={() => {
              props.재고변경([9, 10, 12]);
            }}
          >
            주문하기
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              history.goBack();
            }}
          >
            뒤로가기
          </button>
        </div>
      </div>
      <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link
            eventKey="link-0"
            onClick={() => {
              스위치변경(false);
              누른탭변경(0);
            }}
          >
            Active
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-1"
            onClick={() => {
              누른탭변경(1);
            }}
          >
            Option 2
          </Nav.Link>
        </Nav.Item>
        <Nav.Item></Nav.Item>
      </Nav>
      <CSSTransition in={스위치} classNames="wow" timeout={500}>
        <TabContent 누른탭={누른탭} 스위치변경={스위치변경} />
      </CSSTransition>
    </div>
  );
}

function TabContent(props) {
  useEffect(() => {
    props.스위치변경(true);
  });
  if (props.누른탭 === 0) {
    return <div>0번째입니다</div>;
  } else if (props.누른탭 === 1) {
    return <div>1번째입니다</div>;
  }
}
function Info(props) {
  return <p>재고:{props.재고두번째[0]}</p>;
}
export default Detail;
