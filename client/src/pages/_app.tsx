import Router from "next/router";
import NProgress from "nprogress";
import { Head } from "src/components/Head";
import { ToastContainer } from "src/components/ToastContainer";
import "src/styles/fonts.css";
import "src/styles/globals.css";
import "src/styles/loading-animation.css";
import "src/styles/nprogress.css";
import "src/styles/scrollbar.css";
import "src/styles/toast.css";
import { AppPropsWithLayout } from "src/types/NextPageWithLayout";

Router.events.on("routeChangeStart", NProgress.start);
Router.events.on("routeChangeComplete", NProgress.done);
Router.events.on("routeChangeError", NProgress.done);

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head />
      <ToastContainer />
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}

export default App;
