import React, { useContext, useEffect, useState } from "react";
import { Button, Checkbox, Divider, Form, Input, message } from "antd";
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
const onFinishFailed = (errorInfo) => {
  // console.log("Failed:", errorInfo);
};
const Register = () => {
  const { user, createUser, signInWithGoogle } = useContext(AuthContext);
  const [success, setSuccess] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [presentUser, setPresentUser] = useState(null);

  // Ant Design Error Toast or Message
  const error = () => {
    messageApi.open({
      type: "error",
      content: registerError,
    });
  };

  const firebaseError = (message) => {
    messageApi.open({
      type: "error",
      content: message,
    });
  };

  // Create User With Email and Password
  const handleCreateUser = (values) => {
    // console.log("Success:", values);
    const email = values.email;
    const password = values.password;

    // Reset Error
    setRegisterError("");
    setSuccess("");
    if (password.length < 6) {
      setRegisterError("Password should be at least 6 characters or longer!!!");
      // console.log(registerError);
      error();
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisterError(
        "Password should have at least one uppercase characters."
      );
      // console.log(registerError);
      error();
      return;
    } else if (!/[0-9]/.test(password)) {
      setRegisterError("Your password must contain at least one number.");
      // console.log(registerError);
      error();
      return;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setRegisterError("Password must contain at least one special character.");
      // console.log(registerError);
      error();
      return;
    }

    // console.log(email, password);
    createUser(email, password)
      .then((result) => {
        Swal.fire({
          title: "Congrats!!!",
          text: "Successfully Created Your Account",
          icon: "success",
        });
        // console.log(result.user);
        updateProfile(result.user, {
          displayName: values.user_name,
          photoURL: values.photoURL,
        });
        if (result.user) {
          if (result.user) {
            navigate(location?.state ? location.state : "/");
          }
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
        <title>JAW Wonders | Register</title>
      </Helmet>
      <h2 className="text-secondary text-4xl font-bold text-center mt-10 mb-10">
        {contextHolder}
        Register
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
          onFinish={handleCreateUser}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="user_name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
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
            label="photoURL"
            name="photoURL"
            rules={[
              {
                required: true,
                message: "Please input your photoURL!",
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
              Register
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center">
          <div className="w-1/2 mx-auto">
            <p>
              Already have an accound?{" "}
              <Link className="font-bold text-primary " to="/login">
                Login
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

export default Register;
