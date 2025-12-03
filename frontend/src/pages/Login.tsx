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
      setMessage("Account created & logged in ✅");
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
    <div style={styles.container}>
      <h1 style={styles.heading}>Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />

      <div style={styles.buttonGroup}>
        <button onClick={handleSignup} style={styles.button}>Sign Up</button>
        <button onClick={handleLogin} style={styles.button}>Log In</button>
        <button onClick={handleLogout} style={styles.logout}>Log Out</button>
      </div>

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '40px',
    maxWidth: '400px',
    margin: '0 auto',
    textAlign: 'center',
    fontFamily: 'Georgia, serif',
  },
  heading: {
    marginBottom: '30px',
    color: '#e90be9ff',
    fontSize: '26px',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '20px',
    flexWrap: 'wrap',
  },
  button: {
    padding: '10px 16px',
    backgroundColor: '#2ce2ecff',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  logout: {
    padding: '10px 16px',
    backgroundColor: '#ccc',
    color: '#db0b0bff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  message: {
    marginTop: '20px',
    color: '#e22626ff',
  },
};
export default Login;