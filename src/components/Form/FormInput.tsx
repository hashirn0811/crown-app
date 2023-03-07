import styles from "./FormInputs.module.scss"
import { useRef } from "react"
import { UseFormRegister, FieldErrors } from "react-hook-form"
import { ISignUp } from "../../routes/signup/"

export type IFormInput = {
  label: keyof ISignUp
  // Fix this
  register: UseFormRegister<ISignUp>
  errors?: FieldErrors<ISignUp>
}

export default function FormInput({ label, register, errors }: IFormInput) {
  const { ref, ...rest } = register(label)
  const { message: errorMessage } = errors?.[`${label}`] || {}
  const inpRef = useRef<HTMLInputElement | null>(null)
  /*TODO: Find some other solution instead of this
    1. val.length ? addClass('.shrink', formLabel) : formLabel 
  */
  function handleBlur() {
    if (!inpRef.current) return

    if (inpRef.current.value.length) {
      inpRef.current.classList.add(`${styles.filled}`)
    } else {
      inpRef.current.classList.remove(`${styles.filled}`)
    }
  }

  const inputProps = {
    type: "",
  }

  if (label === "password" || label === "confirmPassword") {
    inputProps.type = "password"
  }

  const errorElement = (
    <span className='invalid__state--form'>{errorMessage}</span>
  )

  return (
    <div className={styles.formInput_wrap}>
      <input
        {...rest}
        ref={(e) => {
          ref(e)
          inpRef.current = e
        }}
        className={`${styles.formInput}`}
        onBlur={handleBlur}
        {...inputProps}
      />
      <label className={`${styles.formLabel}`}>{label}</label>
      {errorMessage && errorElement}
    </div>
  )
}
