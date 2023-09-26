import React, { useState } from 'react';
import { signIn } from 'next-auth/react';

import LoginForm from '@/components/LoginForm';
import Alert from '../error/Alert';

const Login = () => {


  // state variables
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    showPassword: false,
  });

  const [error, setError] = useState({
    type: 'danger',
    message: '',
    visibility: false,
  });

  const { type, message, visibility } = error;
  // functions
  const handleShowPassword = () => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      showPassword: !prevCredentials.showPassword,
    }));
  };

  const handleLogin = () => {
    signIn("google", {
      callbackUrl: "/"
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = credentials;
    if (!email || !password) {

      setError({
        type: 'danger',
        message: 'Credentials cannot be empty',
        visibility: true,
      });

      setTimeout(() => {
        setError({
          type: 'danger',
          message: '',
          visibility: false,
        });
      }, 2500);


    } else {

      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });


      if (response && response.error) {
        setError({
          type: 'danger',
          message: 'Please enter correct credentials.',
          visibility: true,
        });

        setTimeout(() => {
          setError({
            type: 'danger',
            message: '',
            visibility: false,
          });
        }, 2500);

      } else {
        // Redirect the user to the dashboard
        // router.push("/");
      }
    }
  };



  return (
    <>
      {visibility && <Alert type={type} message={message} />}

      <LoginForm
        credentials={credentials}
        setCredentials={setCredentials}
        handleLogin={handleLogin}
        handleSubmit={handleSubmit}
        handleShowPassword={handleShowPassword}
      />
    </>
  );
};

export default Login;
