import { useForm, UseFormRegister } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
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
const signUpSchema = yup.object().shape({
  displayName: yup.string().required("Name is required"),
  email: yup.string().required("Email is required").email("Email is invalid"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be atleast 6 characters")
    .max(40, "Password must not exceed 40 characters"),
  confirmPassword: yup
    .string()
    .required("This field is required")
    .oneOf([yup.ref("password")], "Passwords does not match"),
})

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ISignUp>({
    mode: "onChange",
    defaultValues: {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(signUpSchema),
  })

  async function onsubmit(data: ISignUp) {
    try {
      console.log(data)
      return await createUser(data)
    } catch (error) {
      console.error(`Threw on submit `, error)
    }
  }

  const formInputs = fields.map((field) => {
    return (
      <FormInput
        key={field.id}
        label={field.name as keyof ISignUp}
        register={register}
        inputType={field.type}
        errors={errors}
        required={true}
      />
    )
  })

  const btn = (
    <Button
      btnType='default'
      text='Sign Up'
      type='submit'
    />
  )
  const btnDisabled = (
    <Button
      btnType='default'
      text='Sign Up'
      type='submit'
      disabled
    />
  )

  return (
    <section className={styles.section_signup}>
      <div className={styles.signup}>
        <h2>Dont&apos;t have an account ?</h2>
        <p>Sign up with an email and password</p>
        <div className={styles.form_wrap}>
          <form
            onSubmit={handleSubmit(onsubmit)}
            className={styles.form_signup}
          >
            {formInputs}
            {isValid ? btn : btnDisabled}
          </form>
        </div>
      </div>
    </section>
  )
}
