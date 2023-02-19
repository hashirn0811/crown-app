import styles from "./FormInputs.module.scss"

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
  return (
    <div className={styles.formInput_wrap}>
      <input
        className={styles.formInput}
        name={name}
        type={type}
        value={value}
        // placeholder={placeholder}
        onChange={onChange}
      />
      <label className={styles.formLabel}>{name}</label>
    </div>
  )
}
