/* eslint-disable react/jsx-no-undef */
import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import Script from "next/script";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "../store/index";

export default function App({ Component, pageProps }) {
  let persistor = persistStore(store);

  return (
    <>
      {/* <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}> */}
      <Component {...pageProps} />
      {/* </PersistGate>
      </Provider> */}

      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN"
        crossorigin="anonymous"
      />
    </>
  );
}
