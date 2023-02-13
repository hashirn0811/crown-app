import { Link, Outlet } from 'react-router-dom'
import { ReactComponent as Logo } from '../../assets/crown.svg'
import './Navigation.scss'

export default function Navigation() {
    return (
        <>
        <nav className='nav'>
            <div className="nav-logo">
                <Link to='/'>
                    <Logo />
                </Link>
            </div>
            <ul className="nav-wrap">
                <li>
                    <Link className='main-nav-item' to='/shop'>Shop</Link>
                </li>
                <li>
                    <Link className='main-nav-item' to='/contact'>Contact</Link>
                </li>
                <li>
                    <Link className='main-nav-item' to='/cart'>cart</Link>
                </li>
            </ul>
        </nav>
        <Outlet />
        </>
    )
}