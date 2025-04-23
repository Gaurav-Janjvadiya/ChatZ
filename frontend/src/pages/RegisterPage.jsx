import React from "react";
import { useForm } from "react-hook-form";

function RegisterPage() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form className="text-white border bg-amber-500 border-black" onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("name")} />
        <input type="email" {...register("email")} />
        <input type="password" {...register("password")} />
        <button className="">Default</button>
      </form>
    </div>
  );
}

export default RegisterPage;
