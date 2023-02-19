import styles from "./Button.module.scss"

type IButton = {
  text: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({ text, ...other }: IButton) {
  return (
    <button {...other} className={styles.button}>
      {text}
    </button>
  )
}
