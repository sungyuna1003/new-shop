/* eslint-disable */
import logo from "./logo.svg";
import "./App.css";
import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import { useState } from "react";
import Data from "./Data.js";
import Detail from "./Detail.js";
import { Link, Route, Switch } from "react-router-dom";
import axios from "axios";

function App() {
  let [shoes, shoes변경] = useState(Data);
  let [재고, 재고변경] = useState([10, 11, 12]);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/detail">
                Detail
              </Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item
                  href="#action
                  /3.2"
                >
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="#action
                  /3.3"
                >
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Switch>
        <Route exact path="/">
          <div className="background">
            <h1>20% Season OFF</h1>
            <p>
              This site offer a biggest sale product in the Korea. We hope you
              to enjoy here
            </p>
            <p>
              <Button variant="primary">Learn more</Button>
            </p>
          </div>

          <div className="container">
            <div className="row">
              {shoes.map((a, i) => {
                return <Card shoes={shoes[i]} i={i} />;
              })}
            </div>
            <button
              className="btn btn-warning"
              onClick={() => {
                axios
                  .get("https://codingapple1.github.io/shop/data2.json")
                  .then((result) => {
                    console.log(result.data);
                    shoes변경([...shoes, ...result.data]);
                  })
                  .catch(() => {
                    console.log("fail");
                  });
              }}
            >
              더보기
            </button>
          </div>
        </Route>
        <Route path="/detail/:id">
          <Detail shoes={shoes} 재고={재고} 재고변경={재고변경} />
        </Route>
        <Route path="/:id">
          <div>아무거나~</div>
        </Route>
      </Switch>
    </div>
  );
}
function Card(props) {
  return (
    <div className="col-md-4">
      <img
        src={
          "https://codingapple1.github.io/shop/shoes" + (props.i + 1) + ".jpg"
        }
        width="100%"
      />
      <h4>상품명:{props.shoes.title}</h4>
      <p>
        상품설명:{props.shoes.content} 가격:{props.shoes.price}
      </p>
    </div>
  );
}

export default App;
