import { Fragment } from "react";
import Head from "next/head";
import classes from "./../styles/Signup.module.css";
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { gql, useMutation } from '@apollo/client'
import { getErrorMessage } from '../lib/form'

const SignUpMutation = gql`
  mutation SignUpMutation($username: String!, $password: String!, $name: String!, $last_name: String!, $email: String!) {
    signUp(input: { username: $username, password: $password, last_name: $last_name, name: $name, email: $email }) {
      user {
        user_name
        name
        last_name
        email
      }
    }
  }
`

export default function SignUp() {
  const [signUp] = useMutation(SignUpMutation)
  const [errorMsg, setErrorMsg] = useState()
  const router = useRouter()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    
    const currentTarget   = event.currentTarget as  HTMLFormElement
    const { elements } = currentTarget
    const usernameElement = elements.namedItem("username") as HTMLInputElement
    const passwordElement = elements.namedItem("password") as HTMLInputElement
    const nameElement = elements.namedItem("name") as HTMLInputElement
    const lastnameElement = elements.namedItem("lastname") as HTMLInputElement

    try {
        await signUp({
            variables: {
              username: usernameElement.value,
              password: passwordElement.value,
              name: nameElement.value,
              last_name: lastnameElement.value,
              email: "",
        },
    })
    console.log("Accepted! Status 202")
      //router.push('/')
    } catch (error) {
      console.log("Sending data ", error)
      setErrorMsg(getErrorMessage(error))
    }
  }


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
            <div className={classes.login}>
              <div className={classes.content}>
                <div className={classes.title}>
                  <h2>¡Registrate aquí!</h2>
                </div>
                  <div className={classes.description}>
                    Crea tu usuario institucional para poder usar nuestros servicios.
                  </div>
              </div>
              <div className={classes.form}>
              <form onSubmit={handleSubmit} className={classes.form}>
                    <div className={classes.form_input}>
                      <label htmlFor="usuario">Usuario</label>
                      <input
                        type="text"
                        name="username"
                        required={true}
                        pattern="[A-Za-z]+"
                        placeholder="Nombre de usuario"
                        autoComplete="off"
                      />
                    </div>
                    <div className={classes.form_input}>
                      <label htmlFor="clave">Contraseña</label>
                      <input
                        type="password"
                        name="password"
                        required={true}
                        placeholder="Contraseña"
                      />
                    </div>
                    <div className={classes.form_input}>
                      <label htmlFor="nombre">Nombre</label>
                      <input
                        type="text"
                        name="name"
                        pattern="[a-zA-Z]+"
                        required={true}
                        placeholder="Nombre"
                      />
                    </div>

                    <div className={classes.form_input}>
                      <label htmlFor="apellido">Apellido</label>
                      <input
                        type="text"
                        name="lastname"
                        pattern="[a-zA-Z]+"
                        required={true}
                        placeholder="Apellido"
                      />
                    </div>
                    <div className={classes.form_submit}>
                      <div className="button_box">
                        <button type="submit">
                          <span>Ingresar</span>
                        </button>
                      </div>
                    </div>
                  </form>
              </div>
            </div>

          </div>
        </div>
      </main>
    </Fragment>
  );
}
