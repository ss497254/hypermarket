import React from "react";
import Helmet from "react-helmet";

export const Head = () => {
  return (
    <Helmet>
      <title>SAS</title>
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="manifest" href="/manifest.json" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, user-scalable=no, user-scalable=0"
      />
      <link rel="apple-touch-startup-image" href="android-chrome-512x512.png" />
      <meta name="theme-color" content="#0f0f0f" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      ></link>
    </Helmet>
  );
};
