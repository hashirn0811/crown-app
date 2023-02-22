import { useState } from "react"
import FormInput from "../../components/Form/"
import Button from "../../components/Button/"
import styles from "./signup.module.scss"
import { createUser } from "../../helpers/firebase"

export interface ISignUp {
  displayName: string
  email: string
  password: string
  confirmPassword: string
}

export default function SignUp() {
  const values: ISignUp = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  }

  const [formValues, setFormValues] = useState<ISignUp>(values)

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      return await createUser(formValues)
    } catch (error) {
      console.error(`Error creating user at form`, error)
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    })
  }

  const formInputs = fields.map((field) => {
    return (
      <FormInput
        key={field.id}
        name={field.name}
        placeholder={field.placeholder}
        type={field.type}
        onChange={handleChange}
        value={formValues[field.name as keyof ISignUp]}
      />
    )
  })

  return (
    <section className={styles.section_signup}>
      <div className={styles.signup}>
        <h2>Dont&apos;t have an account ?</h2>
        <p>Sign up with an email and password</p>
        <div className={styles.form_wrap}>
          <form onSubmit={handleSubmit} className={styles.form_signup}>
            {formInputs}
            <Button btnType='default' text='Sign Up' />
          </form>
        </div>
      </div>
    </section>
  )
}
