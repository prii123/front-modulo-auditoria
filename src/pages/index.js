import { useRouter } from "next/router";
import Login from "./login";
const Home = () => {

  const router = useRouter();
  const hanleClick = () => {
    router.replace('/login') // bg-dark vw-100 vh-100
  }
  return (

    <>
      <Login />
    </>


  );
};

export default Home;
