import { AuthProvider } from "../libs/auth";

// import 'bootswatch/dist/cosmo/bootstrap.min.css'

import '../scss/custom.css'
import '../scss/personalizado.css'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
