import { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSignup() {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage("Account created & logged in ✨");
    } catch (err: any) {
      setMessage(err.message);
    }
  }

  async function handleLogin() {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("Logged in ✅");
    } catch (err: any) {
      setMessage(err.message);
    }
  }

  async function handleLogout() {
    await signOut(auth);
    setMessage("Logged out");
  }

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1>Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: "8px", margin: "5px" }}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: "8px", margin: "5px" }}
      />
      <br />

      <button onClick={handleSignup} style={{ marginRight: "10px" }}>
        Sign Up
      </button>
      <button onClick={handleLogin} style={{ marginRight: "10px" }}>
        Log In
      </button>
      <button onClick={handleLogout}>Log Out</button>

      {message && <p style={{ marginTop: "15px" }}>{message}</p>}
    </div>
  );
};

export default Login;