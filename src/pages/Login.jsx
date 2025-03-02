import React, { useState } from "react";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign up");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  }
  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center sm:max-w-96 w-[90%] m-auto mt-14 gap-4 text-gray-800">
      <div className="inline-flex items-center gap-2 mt-10 mb-2">
        <p className="text-3xl prata-regular">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState === "Login" ? (
        ""
      ) : (
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
        />
      )}
      <input
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
      />
      <input
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
      />

      <div className="flex justify-between w-full text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password?</p>

        {currentState === 'Login' ? <p className="cursor-pointer" onClick={() => setCurrentState('Sign up')}>Create account</p> : <p onClick={() => setCurrentState('Login')} className="cursor-pointer">Login Here</p>}
      </div>

      <button className="px-8 py-2 mt-4 font-light text-white bg-black"> {currentState === 'Login' ? 'Sign in' : 'Sign up'} </button>
    </form>
  );
};

export default Login;
