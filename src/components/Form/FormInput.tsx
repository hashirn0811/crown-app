import styles from "./FormInputs.module.scss"
import { useRef } from "react"
import { UseFormRegister } from "react-hook-form"
import { ISignUp } from "../../routes/signup/"

export type IFormInput = {
  label: keyof ISignUp
  // Fix this
  register: UseFormRegister<ISignUp>
}

export default function FormInput({ label, register }: IFormInput) {
  const { ref, ...rest } = register(label)
  const inpRef = useRef<HTMLInputElement | null>(null)

  /*TODO: Find some other solution instead of this
    1. val.length ? addClass('.shrink', formLabel) : formLabel 
  */
  function handleBlur() {
    if (!inpRef.current) return

    if (inpRef.current.value) {
      inpRef.current.classList.toggle(`${styles.filled}`)
    }
  }

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
      />
      <label className={`${styles.formLabel}`}>{label}</label>
      {/* <span>input errors here</span> */}
    </div>
  )
}
