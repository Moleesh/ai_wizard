import React, { Component } from "react";
import { Container, Row, Col, Card, CardTitle } from "reactstrap";
import DropzoneComponent from "react-dropzone-component";
import axios from "axios";

import logo from "./logo.svg";

class App extends Component {
  state = {
    image: null
  };

  render() {
    return (
      <Container fluid>
        <Card
          className="text-center w-100"
          style={{
            backgroundColor: "black",
            color: "white"
          }}
        >
          <CardTitle>
            <Row>
              <Col column sm="1">
                <img
                  src={logo}
                  alt=""
                  width="60"
                  height="60"
                  className="d-inline-block align-top"
                />
              </Col>
              <Col column sm="10">
                <Row className="justify-content-center font-weight-bold  h3">
                  Ai Wizard
                </Row>
                <Row className="justify-content-center font-italic h5" />
              </Col>
            </Row>
          </CardTitle>
        </Card>
        <Row className="pt-2">
          <Col column sm="6">
            <DropzoneComponent
              config={{
                iconFiletypes: [".jpg", ".png", ".gif"],
                showFiletypeIcon: true,
                postUrl: "http://127.0.0.1:5000/"
              }}
              eventHandlers={{
                success: event => {
                  axios
                    .get("http://127.0.0.1:5000/?filename=" + event.name)
                    .then(response =>
                      this.setState({ image: response.config.url })
                    );
                }
              }}
            />
          </Col>

          <Col column sm="6">
            {this.state.image ? (
              <img src={this.state.image} className="img-fluid" alt="" />
            ) : null}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
