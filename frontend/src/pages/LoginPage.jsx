import React from "react";
import { useForm } from "react-hook-form";
import { login as loginUser } from "../api/user";
import { useMutation } from "@tanstack/react-query";
import useAuth from "../context/AuthContext";
import { useNavigate } from "react-router";

function LoginPage() {
  const { login } = useAuth();
  const { register, handleSubmit, setValue } = useForm(); // pulled setValue too 👀
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationKey: ["register"],
    mutationFn: loginUser,
    onSuccess: ({ token }) => {
      login();
      localStorage.setItem("jwt", token);
      navigate("/chat");
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  const handleAddCredential = () => {
    setValue("email", "demo@email.com");
    setValue("password", "demopassword123");
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <form className="grid gap-2" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="bg-[#121212] px-2 py-1 rounded-xl outline-none"
            placeholder="email"
            type="email"
            {...register("email")}
          />
          <input
            className="bg-[#121212] px-2 py-1 rounded-xl outline-none"
            placeholder="password"
            type="password"
            {...register("password")}
          />
          <button
            type="submit"
            className="bg-[#1A66FF] text-white py-1 rounded-xl hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <button
          onClick={handleAddCredential}
          className="bg-[#FF5733] text-white px-4 py-1 rounded-xl hover:bg-[#e04e2b] transition"
        >
          Add Credential
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
