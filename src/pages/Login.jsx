import React, { useContext, useState } from "react";
import axios from "axios";
import { backendUrl } from "../context/ShopContext";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";

const Login = () => {
  const { setAuthStatus, navigate } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [currentState, setCurrentState] = useState("Sign up");

  const register = async () => {
    // register
    try {
      const response = await axios.post(
        backendUrl + "/api/v1/users/register",
        { name, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await login();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const login = async () => {
    try {
      const response = await axios.post(
        backendUrl + "/api/v1/users/login",
        { name, email, password },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setAuthStatus(true);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (currentState === "Sign up") {
      register();
    } else {
      login();
    }
  };
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center sm:max-w-96 w-[90%] m-auto mt-14 gap-4 text-gray-800"
    >
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
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      )}
      <input
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <div className="flex justify-between w-full text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password?</p>

        {currentState === "Login" ? (
          <p
            className="cursor-pointer"
            onClick={() => setCurrentState("Sign up")}
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Login Here
          </p>
        )}
      </div>

      <button className="px-8 py-2 mt-4 font-light text-white bg-black">
        {" "}
        {currentState === "Login" ? "Sign in" : "Sign up"}{" "}
      </button>
    </form>
  );
};

export default Login;
