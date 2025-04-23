import React from "react";
import { useForm } from "react-hook-form";
import { register as registerUser } from "../api/user";
import { useMutation } from "@tanstack/react-query";
import useAuth from "../context/AuthContext";
import { Link, useNavigate } from "react-router";

function RegisterPage() {
  const { login } = useAuth();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationKey: ["register"],
    mutationFn: registerUser,
    onSuccess: ({ token }) => {
      login();
      window.localStorage.setItem("jwt", token);
      navigate("/chat");
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div>
      <form className="grid" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="border"
          placeholder=""
          type="text"
          {...register("name")}
        />
        <input
          className="border"
          placeholder=""
          type="email"
          {...register("email")}
        />
        <input
          className="border"
          placeholder=""
          type="password"
          {...register("password")}
        />
        <button className="">SignUp</button>
      </form>
      <Link to={"/login"}>LoginPage</Link>
      <br />
      <Link to={"/chat"}>Chat</Link>
    </div>
  );
}

export default RegisterPage;
