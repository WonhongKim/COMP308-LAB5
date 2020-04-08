import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";

function Result(props) {
  const newData = props.location.state;

  return (
    <div>
      <Jumbotron>
        <div className="row" style={{ marginTop: "40px" }}>
          <div className="col-4"></div>
          <div
            className="col-4"
            style={{ textAlign: "center", border: "2px solid" }}
          >
            <Form>
              <Form.Group>
                <Form.Label>First Value</Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  defaultValue={newData.ResultofTest[0]}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Second Value</Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  defaultValue={newData.ResultofTest[1]}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Third Value</Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  defaultValue={newData.ResultofTest[2]}
                />
              </Form.Group>
            </Form>
          </div>
          <div className="col-4"></div>
        </div>
      </Jumbotron>
    </div>
  );
}

export default withRouter(Result);
