import styles from "./FormInputs.module.scss"
import { useRef } from "react"
import classNames from "classnames"

export type IFormInput = {
  name: string
  type: string
  //   placeholder: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
} & React.InputHTMLAttributes<HTMLInputElement>

export default function FormInput({
  name,
  type,
  value,
  placeholder,
  onChange,
}: IFormInput) {
  const inpRef = useRef<HTMLInputElement>(null)

  //TODO: Find some other solution instead of this
  function handleBlur() {
    if (!inpRef.current) return

    if (inpRef.current.value) {
      inpRef.current.classList.toggle(`${styles.filled}`)
    }
  }

  return (
    <div className={styles.formInput_wrap}>
      <input
        className={`${styles.formInput}`}
        name={name}
        type={type}
        value={value}
        // placeholder={placeholder}
        onChange={onChange}
        ref={inpRef}
        onBlur={handleBlur}
      />
      <label className={styles.formLabel}>{name}</label>
    </div>
  )
}
