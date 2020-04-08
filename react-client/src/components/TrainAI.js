import React, { useState } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Link, withRouter } from "react-router-dom";

function TrainAI(props) {
  const [Status, setStatus] = useState("No");
  const [testData, settestData] = useState({
    sepal_length: 0,
    sepal_width: 0,
    petal_length: 0,
    petal_width: 0,
    species: "",
    epochs: 0,
  });
  const [testResult, settestResult] = useState();
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "http://localhost:3000/api/training";

  const Training = async () => {
    setShowLoading(true);
    const data = {
      sepal_length: parseFloat(testData.sepal_length),
      sepal_width: parseFloat(testData.sepal_width),
      petal_length: parseFloat(testData.petal_length),
      petal_width: parseFloat(testData.petal_width),
      species: testData.species,
      epochs: parseFloat(testData.epochs),
    };
    try {
      if (
        data.sepal_length === 0 ||
        data.sepal_width === 0 ||
        data.petal_length === 0 ||
        data.petal_width === 0 ||
        data.epochs === 0
      ) {
        window.alert("Please Check values");
      } else {
        const result = await axios.post(apiUrl, data);

        if (result.data.Status !== undefined) {
          setStatus(result.data.Status);
          settestResult(result.data.resultForTest1);
        }
      }
    } catch (e) {
      console.log(e);
    }
    setShowLoading(false);
  };

  const onChange = (e) => {
    e.persist();
    settestData({ ...testData, [e.target.name]: e.target.value });
  };

  if (Status === "No") {
    return (
      <div>
        <Jumbotron>
          <div className="row" style={{ marginTop: "40px" }}>
            <div className="col-4"></div>
            <div className="col-4" style={{ textAlign: "center" }}>
              {showLoading && (
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              )}
            </div>
            <div className="col-4"></div>
          </div>
          <div className="row">
            <div className="col-4"></div>
            <div
              className="col-4"
              style={{
                textAlign: "center",
                marginTop: "20px",
                border: "2px solid",
              }}
            >
              <Form>
                <Form.Group>
                  <Form.Label>species</Form.Label>
                  <Form.Control
                    as="select"
                    name="species"
                    id="species"
                    value={testData.species}
                    target={testData.species}
                    onChange={onChange}
                  >
                    <option value="setosa" defaultValue>
                      setosa
                    </option>
                    <option value="virginica">virginica</option>
                    <option value="versicolor">versicolor</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label> sepal_length</Form.Label>
                  <Form.Control
                    type="text"
                    name="sepal_length"
                    id="sepal_length"
                    placeholder="Enter sepal_length"
                    value={testData.sepal_length}
                    onChange={onChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>sepal_width</Form.Label>
                  <Form.Control
                    type="text"
                    name="sepal_width"
                    id="sepal_width"
                    placeholder="Enter sepal_width"
                    value={testData.sepal_width}
                    onChange={onChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>petal_length</Form.Label>
                  <Form.Control
                    type="text"
                    name="petal_length"
                    id="petal_length"
                    placeholder="Enter petal_length"
                    value={testData.petal_length}
                    onChange={onChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>petal_width</Form.Label>
                  <Form.Control
                    type="text"
                    name="petal_width"
                    id="petal_width"
                    placeholder="Enter petal_width"
                    value={testData.petal_width}
                    onChange={onChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>epochs</Form.Label>
                  <Form.Control
                    type="text"
                    name="epochs"
                    id="epochs"
                    placeholder="Enter epochs"
                    value={testData.epochs}
                    onChange={onChange}
                  />
                </Form.Group>
              </Form>
              <button className="btn btn-primary btn-md" onClick={Training}>
                Train & Test
              </button>
            </div>
            <div className="col-4"></div>
          </div>
        </Jumbotron>
      </div>
    );
  } else {
    return (
      <div>
        <Jumbotron>
          <div
            className="row"
            style={{ marginTop: "40px", textAlign: "center" }}
          >
            <div className="col-4"></div>
            <div className="col-4">
              <h1 className="display-4">Test is Done</h1>
              <p className="lead">Click the button to see the result</p>
              <Link
                to={{
                  pathname: "/Result",
                  state: {
                    ResultofTest: testResult,
                  },
                }}
              >
                Show Result
              </Link>
            </div>
            <div className="col-4"></div>
          </div>
        </Jumbotron>
      </div>
    );
  }
}

export default withRouter(TrainAI);
