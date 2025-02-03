import React from "react";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import groovyWalkAnimation from "/src/assets/groovyWalk.json";
import { Helmet } from "react-helmet-async";

const ErrorPage = () => (
  <div>
    <Helmet>
      <title>JAW Wonders | Error 404</title>
    </Helmet>
    <Lottie
      className="w-1/2 mx-auto mt-20"
      animationData={groovyWalkAnimation}
    />
    <div className="text-center space-y-2">
      <h2 className="text-5xl text-primary font-bold">404</h2>
      <p className="text-gray-400">
        Sorry, the page you visited does not exist.
      </p>
      <div>
        <Link to={"/"}>
          <Button className="btn-primary">Back Home</Button>
        </Link>
      </div>
    </div>
  </div>
);
export default ErrorPage;
