/* eslint-disable */

import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import "./detail.scss";

function Detail(props) {
  let [alert, alert변경] = useState(true);
  let [inputData, inputData변경] = useState("");
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
          <button className="btn btn-danger">주문하기</button>
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
    </div>
  );
}
function Info(props) {
  return <p>재고:{props.재고두번째[0]}</p>;
}
export default Detail;
