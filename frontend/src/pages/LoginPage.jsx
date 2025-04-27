import React from "react";
import { useForm } from "react-hook-form";
import { login as loginUser } from "../api/user";
import { useMutation } from "@tanstack/react-query";
import useAuth from "../context/AuthContext";
import { useNavigate } from "react-router";

function LoginPage() {
  const {
    login,
    user: { isLoggedIn },
  } = useAuth();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationKey: ["register"],
    mutationFn: loginUser,
    onSuccess: ({ token }) => {
      login();
      // console.log(isLoggedIn);
      localStorage.setItem("jwt", token);
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
          className=""
          placeholder=""
          type="email"
          {...register("email")}
        />
        <input
          className=""
          placeholder=""
          type="password"
          {...register("password")}
        />
        <button className="">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
