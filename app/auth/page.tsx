"use client";

import { useLoginUserMutation } from "@/store/api/auth.api";
import { FormEvent, useState } from "react";

export default function AuthPage() {
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });

  const [login] = useLoginUserMutation();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login(authData).then((res) => {
      console.log(res);
    });
  };

  return (
    <div className="text-center">
      <form onSubmit={onSubmit}>
        <label className="block mb-2 text-black">
          <span className="text-gray-700">Login</span>
          <input
            value={authData.email}
            onChange={(e) =>
              setAuthData({ ...authData, email: e.target.value })
            }
            type="text"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            placeholder="Username"
          />
        </label>
        <label className="block mb-2 text-black">
          <span className="text-gray-700">Password</span>
          <input
            value={authData.password}
            onChange={(e) =>
              setAuthData({ ...authData, password: e.target.value })
            }
            type="password"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </label>
        <button
          type="submit"
          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Login
        </button>
      </form>
    </div>
  );
}
