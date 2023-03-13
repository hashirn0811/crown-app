/* eslint-disable no-debugger */
import styles from "./auth.module.scss"
import FormInput from "../../components/Form"
import Button from "../../components/Button"
import { signIn, signInWithGooglePopup } from "../../helpers/firebase"
import { FirebaseError } from "firebase/app"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router"

export interface ISignIn {
  email: string
  password: string
  error?: string
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
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<ISignIn>({
    defaultValues: {
      email: "",
      password: "",
    },
    criteriaMode: "all",
  })

  const onsubmit: SubmitHandler<ISignIn> = async (data) => {
    console.log(`Submit`)
    try {
      const loginFeedBack = await signIn(data)
      if ("code" in loginFeedBack) {
        return setError("root", {
          type: "custom",
          message: loginFeedBack.code,
        })
      }
      clearErrors("root")
      navigate("/")
    } catch (error) {
      console.error("error on submit", error)
    }
  }

  async function handleGoogleLogin() {
    try {
      await signInWithGooglePopup()
      navigate("/")
    } catch (error) {
      console.error((error as FirebaseError).code)
      console.error(`Error logging in with google`)
    }
  }

  const fields = Fields.map((field) => {
    return (
      <FormInput
        key={field.id}
        inputType={field.type}
        label={field.name as keyof ISignIn}
        register={register}
        required={true}
      />
    )
  })
  //TODO: Refactor into an ErrorComponent
  const errorField = (
    <span className='invalid__state--form'>Error: {errors.root?.message}</span>
  )

  return (
    <section className={styles.section_login}>
      <div className={styles.login}>
        <h2 className='u-mb-sm'>Crwn Login</h2>
        <span className='u-mb-sm'>Sign in with your email and password</span>
        <form
          className={styles.form_login}
          onSubmit={handleSubmit(onsubmit)}
        >
          {fields}
          <div className={styles.form_btn_wrap}>
            {errors.root && errorField}
            <Button
              text='Sign In'
              btnType='default'
              type='submit'
            />
            <Button
              text='sign in with google'
              btnType='google'
              onClick={handleGoogleLogin}
            />
          </div>
        </form>
      </div>
    </section>
  )
}
