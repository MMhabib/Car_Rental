import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {
  const { setShowLogin, axios, setToken, navigate } = useAppContext();
  const [isLogin, setIsLogin] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const url = isLogin ? "/api/user/login" : "/api/user/register";
      const response = await axios.post(url, data);
      const result = response.data;
console.log(result)
      if (result.success) {
        setToken(result.token);
        localStorage.setItem("token", result.token);
        toast.success(isLogin ? "Login successful" : "Registration successful");
        setShowLogin(false);
        navigate("/"); // adjust if needed
      } else {
        toast.error(result.message || "Operation failed");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "An error occurred");
    }
  };

  return (
    <div
      onClick={() => setShowLogin(false)}
      className="fixed top-0 left-0 right-0 bottom-0 z-100 flex items-center justify-center bg-black/50 text-sm text-gray-600"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        onClick={(e) => e.stopPropagation()}
        className="max-w-96 w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white"
      >
        <h1 className="text-gray-900 text-3xl mt-10 font-medium">
          {isLogin ? "Login" : "Sign Up"}
        </h1>
        <p className="text-gray-500 text-sm mt-2">
          {isLogin ? "Please sign in to continue" : "Create your account"}
        </p>

        {/* Name (only for Sign Up) */}
        {!isLogin && (
          <div className="flex items-center w-full mt-6 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <input
              type="text"
              placeholder="Name"
              {...register("name", {
                required: !isLogin && "Name is required",
              })}
              className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
            />
          </div>
        )}
        {!isLogin && errors.name && (
          <p className="text-red-500 text-xs text-left mt-1">
            {errors.name.message}
          </p>
        )}

        {/* Email */}
        <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email format",
              },
            })}
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-xs text-left mt-1">
            {errors.email.message}
          </p>
        )}

        {/* Password */}
        <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value:
                  /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!?]).{8,}/,
                message:
                  "Password must have upper, lower, number, special char, min 8 chars",
              },
            })}
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
          />
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs text-left mt-1">
            {errors.password.message}
          </p>
        )}

        {isLogin && (
          <div className="mt-5 text-left text-indigo-500">
            <a className="text-sm" href="#">
              Forgot password?
            </a>
          </div>
        )}

        <button
          type="submit"
          className="mt-4 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <p className="text-gray-500 text-sm mt-3 mb-11">
          {isLogin
            ? "Don’t have an account?"
            : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-500"
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
