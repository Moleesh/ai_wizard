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
      <Container fluid className="pt-2">
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
                  className="d-inline-block align-top pt-4"
                />
              </Col>
              <Col column sm="10">
                <Row className="justify-content-center font-weight-bold  h1 pt-4">
                  Ai Wizard
                </Row>
                <Row className="justify-content-center font-italic h5" />
              </Col>
            </Row>
          </CardTitle>
        </Card>
        <Row className="pt-2">
          <Col>
            {this.state.image ? (
              <img
                src={this.state.image}
                className="img-fluid rounded mx-auto d-block"
                alt=""
                width="100%"
              />
            ) : null}
          </Col>
        </Row>
        <Row className="py-2 d-flex justify-content-center">
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
        </Row>
      </Container>
    );
  }
}

export default App;
