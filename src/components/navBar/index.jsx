import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import './styles.css';
import Logout from '../logout';

export default function NavBar () {
    return(
        <nav>
            <div className="header">
                <h1 className='h1'>Finantrack</h1>
                <ul className='list'>
                    <CustomLink to='/home'>Home</CustomLink>
                    <CustomLink to='/about'>Sobre</CustomLink>
                    <Logout />
                </ul>
            </div>
        </nav>
    )
}

function CustomLink({ to, children, ...props }) {
    const resolvPath = useResolvedPath(to);
    const isActive = useMatch({path: resolvPath.pathname, end: true});

    return (
        <li className={isActive ? 'active' : ''}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}