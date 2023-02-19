import "./Signin.scss"
import { createUserDoc, signInWithGooglePopup } from "../../helpers/firebase"

export default function Signin() {
  const logUser = async () => {
    try {
      const response = await signInWithGooglePopup()
      createUserDoc(response.user)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div>Signin</div>
      <button onClick={logUser}> sign in with google</button>
    </>
  )
}
