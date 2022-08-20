import { useRouter } from "next/router";
const Home = () => {

  const router = useRouter();
  const hanleClick = ()=>{
    router.replace('/login') // bg-dark vw-100 vh-100
  }
  return (
    <div className="" style={{backgroundColor: '#000000', display: 'grid', placeContent: 'center', height: '100vh'}}>
      <button onClick={hanleClick} className=" caja1 btn w-100 h-100 fs-1 fw-bold" style={{backgroundColor: '#000000', border: 'none'}}>Login</button>
    </div>
  );
};

export default Home;
