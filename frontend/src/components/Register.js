import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import accountService from "../services/account";

export const Register = () => {
  const [error, setError] = useState(null);

  const { auth } = useContext(AuthContext);
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const [emailInput, usernameInput, passwordInput, confirmPasswordInput] =
      ev.target.elements;
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmedPassword = confirmPasswordInput.value;
    const username = usernameInput.value;
    console.log('email check',email)
    console.log('password check',password)
    console.log('confirmed password check',confirmedPassword)
    console.log('username check',username)
    
    if (
      email.length > 0 &&
      password.length > 0 &&
      confirmedPassword.length > 0 &&
      username.length > 0
      ) {
        if (password === confirmedPassword) {

        const userInfo = await accountService.ApiRegister(email, username, password);
        if (userInfo.error) {
          setError(userInfo.error);
        } else {
          auth(userInfo);
        }
      } else {
        setError("Passwords do not match");
      }
    } else {
      setError("Email or password too short");
    }
  };

  return (
    <form
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 h-full"
      onSubmit={handleSubmit}
    >
      <h1 className="text-center font-black pb-2">REGISTER</h1>
      <div className="mb-4">
        <label
          htmlFor="registerEmail"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Email Address
        </label>
        <input
          type="email"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="registerEmail"
          placeholder="Enter email"
        />
        <small id="emailHelpRegister" className="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor = 'username'>
          Username
        </label>
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="registerUsername"
          placeholder="@username"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="registerPassword"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Password
        </label>
        <input
          type="password"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="registerPassword"
          placeholder="Password"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="registerConfirmPassword"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Confirm Password
        </label>
        <input
          type="password"
          className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="registerConfirmPassword"
          placeholder="Password"
        />
      </div>
      <p className="text-danger text-center">{error}</p>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Register
        </button>
      </div>
    </form>
  );
};
