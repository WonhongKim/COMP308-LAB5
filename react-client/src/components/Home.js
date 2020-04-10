import { withRouter } from "react-router-dom";

import React from "react";

function Home(props) {
  return (
    <div className="jumbotron">
      <h1 className="display-3">Hello, User</h1>
      <p className="lead">This is the site for Summery Article</p>
      <hr className="my-4" />
      <p>You can see the demo or do the test with input</p>
    </div>
  );
}

export default withRouter(Home);
