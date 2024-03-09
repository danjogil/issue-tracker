import React from "react";
import RegisterForm from "./RegisterForm";
import { Heading } from "@radix-ui/themes";

const RegisterPage = () => {
  return (
    <div>
      <Heading mb="5">Create Account</Heading>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
