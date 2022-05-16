import { Fragment } from "react";
import Head from "next/head";
import classes from "./../styles/Signup.module.css";

export default function SignUp() {
  return (
    <Fragment>
      <Head>
        <title>Sign Up | Dynamic Programming Coders</title>

        <meta
          name="description"
          content="Sign up for the Dynamic Programming Coders platform."
        />
        <meta
          name="keywords"
          content="sign up, platform, dynamic programming coders, competitive programming, register"
        />
        <meta name="robots" content="index, follow" />

        <meta
          property="og:title"
          content="Sign Up | Dynamic Programming Coders"
        />
        <meta
          property="og:description"
          content="Sign up for the Dynamic Programming Coders platform."
        />

        {/* <meta property="og:image" content="https://dynamicprogrammingcoders.com/static/images/logo.png" />
            <meta property="og:url" content="https://dynamicprogrammingcoders.com/signup" /> */}
        <meta property="og:site_name" content="Dynamic Programming Coders" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta
          name="twitter:title"
          content="Sign Up | Dynamic Programming Coders"
        />
        <meta
          name="twitter:description"
          content="Sign up for the Dynamic Programming Coders platform."
        />
        {/* <meta name="twitter:image" content="https://dynamicprogrammingcoders.com/static/images/logo.png" />
            <meta name="twitter:url" content="https://dynamicprogrammingcoders.com/signup" /> */}
        <meta name="twitter:site" content="@DynamicProgrammingCoders" />
        <meta name="twitter:card" content="summary_large_image" />

        <link
          rel="canonical"
          href="https://dynamicprogrammingcoders.com/signup"
        />
        <link
          rel="alternate"
          hrefLang="en-US"
          href="https://dynamicprogrammingcoders.com/signup"
        />
      </Head>
      <main>
        <div className={classes.container}>
          <div className={classes.content}>
            <h1>Sign Up</h1>
            <p>Sign up for the Dynamic Programming Coders platform.</p>
          </div>
        </div>
      </main>
    </Fragment>
  );
}
