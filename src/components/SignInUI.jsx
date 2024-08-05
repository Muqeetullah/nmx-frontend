import React from "react";

const SignInUI = ({
  handleSubmit,
  email,
  setEmail,
  password,
  setPassword,
  error,
}) => {
  // throw new Error("Not implemented");
  return (
    <div className="flex w-full items-center justify-center min-h-screen">
      <div className="w-full sm:w-1/2 lg:w-1/3 bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-start">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-start">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInUI;
