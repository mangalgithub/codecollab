import "../styles/global.css";
import type { AppProps } from "next/app";
import { GlobalContext } from "../contexts/Globalcontext";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
function MyApp({ Component, pageProps }: AppProps) {
   const [name, setName] = useState("")
  return (
      <GlobalContext.Provider value={{name, setName}}>
          <Toaster
        position="top-right"
        toastOptions={{
          success: {
            duration: 3000,
            theme: {
              primary: "#4aee88",
            },
          },
        }}
      />
        <Component {...pageProps} />
      </GlobalContext.Provider>
  );
}

export default MyApp;
