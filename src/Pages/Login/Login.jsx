import React, { useContext, useEffect, useState } from "react";
import { Button, Checkbox, Divider, Form, Input, message } from "antd";
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
// import "./Login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const onFinishFailed = (errorInfo) => {
  // console.log("Failed:", errorInfo);
};

const Login = () => {
  const { signIn, signInWithGoogle, user } = useContext(AuthContext);
  const [presentUser, setPresentUser] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const location = useLocation();

  // console.log(presentUser);

  const firebaseError = (message) => {
    messageApi.open({
      type: "error",
      content: message,
    });
  };

  const onFinish = (values) => {
    // console.log("Success:", values);
    signIn(values.email, values.password)
      .then((result) => {
        Swal.fire({
          title: "Congrats!!!",
          text: "Successfully Login to Your Account",
          icon: "success",
        });
        if (result.user) {
          navigate(location?.state ? location.state : "/");
        }
      })
      .catch((error) => {
        // console.log(error.message.replace("Firebase: ", ""));
        firebaseError(error.message.replace("Firebase: ", ""));
      });
  };

  // Google Sign In
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        if (result.user) {
          navigate(location?.state ? location.state : "/");
        }
        const values = {
          user_name: `${result.user.displayName}`,
          email: `${result.user.email}`,
          photoURL: `${result.user.photoURL}`,
          password: "Google Login",
          remember: "true",
        };
        if (presentUser === undefined) {
          fetch("https://assignment-10-arts-and-crafts-server.vercel.app/user", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(values),
          })
            .then((res) => res.json())
            .then((data) => {
              // console.log(data);
            });
        }
      })
      .catch((error) => {
        // console.log(error);
        firebaseError(error.message.replace("Firebase: ", ""));
      });
  };

  useEffect(() => {
    if (user) {
      fetch("https://assignment-10-arts-and-crafts-server.vercel.app/users")
        .then((res) => res.json())
        .then((data) =>
          setPresentUser(
            data.find((currentUser) => currentUser.email === user.email)
          )
        );
      // console.log(presentUser);
    }
  }, [user]);

  return (
    <div className="mb-10">
      <Helmet>
        <title>JAW Wonders | Login</title>
      </Helmet>
      {contextHolder}
      <h2 className="text-secondary text-4xl font-bold text-center mt-10 mb-10">
        Login
      </h2>
      <div className="bg-primary/50 w-full md:3/4 lg:w-1/2 mx-auto md:py-20">
        <Form
          className="p-5 mx-auto "
          name="basic"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" label={null}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item label={null}>
            <Button className="btn-primary font-bold w-32" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center">
          <div className="w-1/2 mx-auto">
            <p>
              Don't have an account?{" "}
              <Link className="font-bold text-primary" to="/register">
                Register
              </Link>
            </p>
            <Divider
              className="w-1/2"
              style={{
                borderColor: "#167D7F",
              }}
            >
              Or
            </Divider>
          </div>
          <div className="flex flex-col md:flex-row justify-center ">
            <div className="m-2">
              <Button
                className="btn-primary font-bold w-32"
                icon={<FaFacebook className="text-xl" />}
              >
                Facebook
              </Button>
            </div>
            <div className="m-2">
              <Button
                onClick={handleGoogleSignIn}
                className="btn-primary font-bold w-32"
                icon={<FaGoogle className="text-xl" />}
              >
                Google
              </Button>
            </div>
            <div className="m-2">
              <Button
                className="btn-primary font-bold w-32"
                icon={<FaTwitter className="text-xl" />}
              >
                Twitter
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
