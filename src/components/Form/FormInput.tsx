import styles from "./FormInputs.module.scss"
import { HTMLInputTypeAttribute, useRef } from "react"
import {
  UseFormRegister,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form"

export type IFormInput<TFormValues extends FieldValues> = {
  label: Path<TFormValues>
  inputType?: HTMLInputTypeAttribute
  register: UseFormRegister<TFormValues>
  errors?: FieldErrors<TFormValues>
  required?: boolean
}

export default function FormInput<TFormValues extends FieldValues>({
  label,
  register,
  inputType,
  errors,
  required,
}: IFormInput<TFormValues>) {
  const { ref, ...rest } = register(label, { required })
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

  const errorElement = (
    <span className='invalid__state--form'>{errorMessage as string}</span>
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
        type={inputType}
      />
      <label className={`${styles.formLabel}`}>{label}</label>
      {errorMessage && errorElement}
    </div>
  )
}
