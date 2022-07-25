import { AuthProvider } from "../libs/auth";
// importing bootswatch
// import 'bootstrap'
import 'bootswatch/dist/cosmo/bootstrap.min.css'
// import './styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
