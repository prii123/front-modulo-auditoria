import { useRef, useState } from "react";
import { useAuth } from "../libs/auth";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPasword] = useState(null);

  const router = useRouter();
  const { signIn } = useAuth();

  const [message, setMessage] = useState(null);

  async function handleLogin(event) {
    event.preventDefault();

    signIn({ email, password }).then((ress) => {
      // console.log(ress);
      setMessage(ress);

      //   cookie.set('auth', ress)

      if (ress.pass) router.push("/dashboard");
    });
  }

  return (
    <div>
      <input
        type="text"
        placeholder="email"
        onChange={(e) => {
          e.preventDefault();
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => {
          e.preventDefault();
          setPasword(e.target.value);
        }}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
