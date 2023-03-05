import FormInput from "../../components/Form/"
import Button from "../../components/Button/"
import styles from "./signup.module.scss"
import { SubmitHandler, useForm } from "react-hook-form"

export interface ISignUp {
  displayName: string
  email: string
  password: string
  confirmPassword: string
}

const fields = [
  {
    id: 0,
    name: "displayName",
    type: "text",
    placeholder: "Display Name",
  },
  {
    id: 1,
    name: "email",
    type: "email",
    placeholder: "Email",
  },
  {
    id: 2,
    name: "password",
    type: "password",
    placeholder: "password",
  },
  {
    id: 3,
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm password",
  },
]

export default function SignUp() {
  const { register, handleSubmit } = useForm<ISignUp>({
    defaultValues: {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit: SubmitHandler<ISignUp> = (data) => {
    console.log(data)
  }

  const formInputs = fields.map((field) => {
    return (
      <FormInput
        key={field.id}
        label={field.name as keyof ISignUp}
        register={register}
      />
    )
  })

  return (
    <section className={styles.section_signup}>
      <div className={styles.signup}>
        <h2>Dont&apos;t have an account ?</h2>
        <p>Sign up with an email and password</p>
        <div className={styles.form_wrap}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.form_signup}
          >
            {formInputs}
            <Button btnType='default' text='Sign Up' type='submit' />
          </form>
        </div>
      </div>
    </section>
  )
}
