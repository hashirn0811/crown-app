import { Link, Outlet } from "react-router-dom"
import { ReactComponent as Logo } from "../../assets/crown.svg"
import "./Navigation.scss"
import { useContext } from "react"
import { UserContext } from "../../context/"
import { logOut } from "../../helpers/firebase"

export default function Navigation() {
  const { user } = useContext(UserContext)

  async function handleLogout(e: React.MouseEvent<HTMLButtonElement>) {
    if (!user) return
    await logOut(user)
  }

  return (
    <>
      <nav className='nav'>
        <div className='nav-logo'>
          <Link to='/'>
            <Logo />
          </Link>
        </div>
        <ul className='nav-wrap'>
          <li>
            <Link className='main-nav-item' to='/shop'>
              Shop
            </Link>
          </li>
          <li>
            <Link className='main-nav-item' to='/contact'>
              Contact
            </Link>
          </li>
          <li>
            <Link className='main-nav-item' to='/cart'>
              cart
            </Link>
          </li>
          <li>
            {user ? (
              <button onClick={handleLogout} className='main-nav-item'>
                Logout
              </button>
            ) : (
              <Link to='/auth' className='main-nav-item'>
                Sign in
              </Link>
            )}
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  )
}
