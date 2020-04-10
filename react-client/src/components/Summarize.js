import { Link, withRouter } from "react-router-dom";
import React, { useState } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Summarize(props) {
  const [showLoading, setShowLoading] = useState(false);
  const [Status, setStatus] = useState("No");
  const [testData, settestData] = useState({
    article: "",
  });
  const [Result, setResult] = useState();
  const apiUrl = "http://localhost:3000/api/summarizewithInput";

  const Summarize = async () => {
    setShowLoading(true);
    const data = {
      article: testData.article,
    };
    try {
      if (testData === "") {
        window.alert("Please in put Article");
      } else {
        const result = await axios.post(apiUrl, data);

        if (result.data.Status !== undefined) {
          setStatus(result.data.Status);
          setResult(result.data.resultForTest1);
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

  return (
    <div>
      <Jumbotron>
        <div className="row" style={{ marginTop: "40px" }}>
          <div className="col-4"></div>
          <div className="col-4" style={{ textAlign: "center" }}>
            <Form>
              <Form.Group>
                <Form.Label>Article Summarize Tool</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="12"
                  type="text"
                  name="article"
                  id="article"
                  placeholder="Enter article"
                  value={testData.article}
                  onChange={onChange}
                />
              </Form.Group>
            </Form>
          </div>
          <div className="col-4"></div>
        </div>
        <div className="row" style={{ marginTop: "40px" }}>
          <div className="col-4"></div>
          <div className="col-4" style={{ textAlign: "center" }}>
            <button className="btn btn-primary btn-md" onClick={Summarize}>
              Summarize Article
            </button>
          </div>
          <div className="col-4"></div>
        </div>
        <div className="row" style={{ marginTop: "40px" }}>
          <div className="col-4"></div>
          <div className="col-4" style={{ textAlign: "center" }}>
            {showLoading && (
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            )}
            {Status === "show" && (
              <Card>
                <Card.Body>
                  <Card.Title>Summarized Article</Card.Title>
                  <Card.Text>{Result}</Card.Text>
                </Card.Body>
              </Card>
            )}
          </div>
          <div className="col-4"></div>
        </div>
      </Jumbotron>
    </div>
  );
}

export default withRouter(Summarize);
