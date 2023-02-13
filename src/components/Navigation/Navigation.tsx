import { Link, Outlet } from 'react-router-dom'
import { ReactComponent as Logo } from '../../assets/crown.svg'
export default function Navigation() {
    return (
        <>
        <nav>
            <div className="nav-logo">
                <Logo/>
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