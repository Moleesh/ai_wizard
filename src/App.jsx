import React, { Component } from "react";
import { Container, Row, Col, Card, CardTitle, Button } from "reactstrap";
import ImageDropZone from "react-image-dropzone";
import request from "superagent";

import logo from "./logo.jpg";

class App extends Component {
  state = {
    files: []
  };

  onDrop = files => {
    const req = request.post("https://httpbin.org/post");
    files.forEach(file => {
      req.attach(file.name, file);
    });
    req.end();
  };

  onPreviewDrop = files => {
    this.setState({
      files: this.state.files.concat(files)
    });
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
                <Row className="justify-content-center font-italic h5">
                  ------ Only by Aripta
                </Row>
              </Col>
            </Row>
          </CardTitle>
        </Card>
        <Row>
          <Col column sm="5">
            <ImageDropZone
              anySize
              showButton
              showDeleteButton
              height={512}
              block
              //   imageDefault={imageDefault}
              // imagePicked={image => console.log(image)}
            />
          </Col>
          <Col column sm="2">
            <Button color="success">success</Button>
          </Col>
          <Col column sm="5">
            {/* {this.state.files.length > 0 && (
              <React.Fragment>
                <h3>Previews</h3>
                {this.state.files.map(file => (
                  <img
                    alt="Preview"
                    key={file.preview}
                    src={file.preview}
                    //     style={previewStyle}
                  />
                ))}
              </React.Fragment>
            )} */}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
