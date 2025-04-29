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
    <div className="h-screen w-full flex items-center justify-center">
      <div>
        <form className="grid gap-2" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="bg-[#121212] px-2 rounded-xl outline-none"
            placeholder="name"
            type="text"
            {...register("name")}
          />
          <input
            className="bg-[#121212] px-2 rounded-xl outline-none"
            placeholder="email"
            type="email"
            {...register("email")}
          />
          <input
            className="bg-[#121212] px-2 rounded-xl outline-none"
            placeholder="password"
            type="password"
            {...register("password")}
          />
          <button className="bg-[#1A66FF] rounded-xl">SignUp</button>
        </form>
        <p>
          If you have an accound please{" "}
          <Link to={"/login"} className="underline">
            login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
