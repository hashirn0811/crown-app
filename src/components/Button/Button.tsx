import styles from "./Button.module.scss"

type IButton = {
  text: string
  btnType: "default" | "inverted" | "google"
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const btnTypes = {
  default: `${styles.btn_default}`,
  inverted: `${styles.inverted}`,
  google: `${styles.google}`,
}

export default function Button({ text, btnType, ...other }: IButton) {
  return (
    <button {...other} className={` ${btnTypes[btnType]} ${styles.button}`}>
      {text}
    </button>
  )
}
