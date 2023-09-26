import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Alert from "../error/Alert";
import SignupForm from "@/components/SignupForm";
import axios from "axios";

const Signup = () => {

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    showPassword: false,
    role: "user",
  });

  const [error, setError] = useState({
    visibility: false,
    type: "",
    message: "",
  });

  // Toggle password visibility
  const handleShowPassword = () => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      showPassword: !prevCredentials.showPassword,
    }));
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password, role } = credentials;

    if (!email || !password || !name) {
      setError({
        visibility: true,
        type: "danger",
        message: "Please enter correct info.",
      });

      setTimeout(() => {
        setError({
          visibility: false,
          type: "",
          message: "",
        });
      }, 2500);
      return;
    }

    try {
      const response = await axios.post("/api/signup", {
        email,
        password,
        name,
        role,
      });

      console.log(response);  

      // Sign in after successful registration
      signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
      });
    } catch (error) {
      setError({
        visibility: true,
        type: "danger",
        message: "User already exists",
      });

      setTimeout(() => {
        setError({
          visibility: false,
          type: "",
          message: "",
        });
      }, 2500);
    }
    console.error("Error during signup:", error);
  }


  // Google Signup handler
  const handleGoogleSubmit = async () => {
    signIn("google", {
      callbackUrl: "/",
    });
  };

  const { visibility, type, message } = error;

  return (
    <>
      {visibility && <Alert type={type} message={message} />}

      <SignupForm
        credentials={credentials}
        setCredentials={setCredentials}
        handleSubmit={handleSubmit}
        handleShowPassword={handleShowPassword}
        handleGoogleSubmit={handleGoogleSubmit}
      />
    </>
  );
};

export default Signup;
