import styles from "./auth.module.scss"
import FormInput from "../../components/Form"
import Button from "../../components/Button"
import { useState, useRef } from "react"
import { signIn, signInWithGooglePopup } from "../../helpers/firebase"
import { FirebaseError } from "firebase/app"

export interface ISignIn {
  email: string
  password: string
}

interface AuthError {
  code: string
  message: string
  name: string
}

const Fields = [
  {
    id: 0,
    name: "email",
    type: "email",
  },
  {
    id: 1,
    name: "password",
    type: "password",
  },
]

export default function Auth() {
  const [creds, setCreds] = useState<ISignIn>({
    email: "",
    password: "",
  })

  const errRef = useRef<AuthError>({
    code: "",
    message: "",
    name: "",
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCreds({
      ...creds,
      [e.target.name]: e.target.value,
    })
  }

  async function handleSignIn() {
    try {
      const signed = await signIn(creds)
      const { code, message, name } = signed as AuthError
      if (code) {
        errRef.current = {
          code,
          message,
          name,
        }
        console.log(errRef.current)
      }
    } catch (error) {
      console.error((error as FirebaseError).code)
      console.error(`Error while signing in`, error)
    }
  }

  async function handleGoogleLogin() {
    try {
      const creds = await signInWithGooglePopup()
      console.log(creds)
    } catch (error) {
      console.error((error as FirebaseError).code)
      console.error(`Error logging in with google`)
    }
  }

  const fields = Fields.map((field) => {
    return (
      <FormInput
        name={field.name}
        key={field.id}
        onChange={handleChange}
        type={field.type}
        value={creds[field.name as keyof ISignIn]}
      />
    )
  })

  return (
    <section className={styles.section_login}>
      <div className={styles.login}>
        <h2 className='u-mb-sm'>Crwn Login</h2>
        <span className='u-mb-sm'>Sign in with your email and password</span>
        <form className={styles.form_login}>{fields}</form>
        <span>{/* errors here */}</span>
        <div className={styles.form_btn_wrap}>
          <Button text='SignIn' btnType='default' onClick={handleSignIn} />
          <Button
            text='sign in with google'
            btnType='google'
            onClick={handleGoogleLogin}
          />
        </div>
      </div>
    </section>
  )
}
