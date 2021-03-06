import { useState } from "react";
import Link from "next/link";
import baseUrl from "../helpers/baseUrl";
import { useRouter } from "next/router";
import cookie from "js-cookie";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const userLogin = async (e) => {
    e.preventDefault();
    // const res = await fetch(`${baseUrl}/api/login`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     email,
    //     password,
    //   }),
    // });
    const res = await fetch(`${baseUrl}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const res2 = await res.json();
    if (res2.error) {
      M.toast({ html: res2.error, classes: "red" });
    } else {
      cookie.set("token", res2.token);
      cookie.set("user", res2.user);
      router.push("/account");
    }
  };

  return (
    <div className="container card authcard center">
      <h1>Login</h1>
      <form onSubmit={(e) => userLogin(e)}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="btn waves-effect waves-light #1565c0 blue darken-3"
          type="submit"
        >
          Login
          <i className="material-icons right">forward</i>
        </button>
      </form>

      <Link href="/signup">
        <a>
          <h5>Don't have a Account ?</h5>
        </a>
      </Link>
    </div>
  );
};

export default Login;
