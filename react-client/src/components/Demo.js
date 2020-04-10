import { Link, withRouter } from "react-router-dom";
import React, { useState } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import Button from "react-bootstrap/Button";

function Demo(props) {
  const [showLoading, setShowLoading] = useState(false);
  const [Status, setStatus] = useState("No");
  const [Result, setResult] = useState();
  const apiUrl = "http://localhost:3000/api/summarize";

  const Summarize = async () => {
    setShowLoading(true);
    try {
      const result = await axios.post(apiUrl);
      if (result.data.Status !== undefined) {
        setStatus(result.data.Status);
        setResult(result.data.resultForTest1);
      }
    } catch (e) {
      console.log(e);
    }
    setShowLoading(false);
  };

  return (
    <div>
      <Jumbotron>
        <div className="row" style={{ marginTop: "40px" }}>
          <div className="col-4"></div>
          <div className="col-4" style={{ textAlign: "center" }}>
            <Card>
              <Card.Body>
                <Card.Title>Summarize Article(Original)</Card.Title>
                <Card.Text>
                  Ontario reported 550 new cases of COVID-19, which is the
                  biggest single-day increase so far. In total, there have been
                  5,276 lab-confirmed cases of the virus in Ontario. The
                  province has confirmed 174 deaths linked to the virus so far
                  but reporting from Ontario's 34 local public health units
                  suggest the number is actually 204. Dr. Barbara Yaffe,
                  Ontario’s associate chief medical officer of health, said the
                  province is “working very hard” to ramp up testing. “I think
                  the bottom line is we want to do more testing – we are working
                  very hard now to increase the testing and expand the criteria
                  and encourage clinicians to test people where they are
                  concerned the person has symptoms that may be indicative of
                  covid-19. We are very much hopeful that we will go up –we do
                  have capacity we need more testing,” she said on Wednesday at
                  a news conference alongside Dr. David Williams, the province’s
                  top doctor. Williams said he doesn’t see the value of
                  comparing Ontario to other province’s when it comes to testing
                  numbers. “When you do rates and comparisons… it is not a very
                  valuable thing to do because you would have to really compare
                  us to a province of the same size on how that’s going. I can
                  say, compared to pretty well all of the provinces, including
                  the ones that have some better rates, we have processed more
                  tests than any other province,” Williams said. “It is not a
                  matter of who looks better. It is a matter of how collectively
                  we are doing on a Canadian basis and are we together bending
                  the curve for Canada because we are all in this and while my
                  counterpart… in Quebec is dealing with a large surge at this
                  time.” When asked if he felt the premier was critical of the
                  decisions he has made regarding testing, Williams said he and
                  Ford both want to increase testing.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-4"></div>
        </div>
        <div className="row" style={{ marginTop: "40px" }}>
          <div className="col-4"></div>
          <div className="col-4" style={{ textAlign: "center" }}>
            <button className="btn btn-primary btn-md" onClick={Summarize}>
              Show Demo
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
                  <Card.Title>Summarize Article(Test Result)</Card.Title>
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

export default withRouter(Demo);
