import { createContext, useEffect, useState } from "react"
import { AuthListener, createUserDoc } from "../helpers/firebase"
import { User } from "firebase/auth"

export const UserContext = createContext<{
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}>({
  user: null,
  setUser: () => null,
})

interface IUserProviderProps {
  children: React.ReactNode
}

export function UserProvider({ children }: IUserProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const value = { user, setUser }

  useEffect(() => {
    const unsubscribe = AuthListener((user) => {
      if (user) {
        createUserDoc(user)
      }
      setUser(user)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
