import { MailFilter } from "../apps/mail/cmps/MailFilter.jsx"

const { Link, NavLink, useLocation } = ReactRouterDOM
const { useState, useEffect } = React

export function AppHeader() {
    const location = useLocation()
    const [logo, setLogo] = useState("assets/css/img/google.png")
  

    useEffect(() => {
        switch (location.pathname) {
          case "/":
            setLogo("assets/css/img/google.png")
            break;
          case "/about":
            setLogo("assets/css/apps/mail/images/aboutLogo.png") 
            break;
          case "/mail":
            setLogo("assets/css/apps/mail/images/gmailLogo.png")
            break;
          case "/note":
            setLogo("assets/css/img/keep.png")
            break;
          case "/book":
            setLogo("assets/css/apps/mail/images/bookLogo.png")
            break;
          default:
            setLogo("assets/css/apps/mail/images/gmailLogo.png") 
        }
      }, [location]);

    return <header className="app-header">
         <div className="app-header-container">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
        {location.pathname === "/mail" && <MailFilter />} 
      </div>
        <nav>
        <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink>
        <NavLink to="/mail" className={({ isActive }) => isActive ? 'active' : ''}>Mail</NavLink>
        <NavLink to="/note" className={({ isActive }) => isActive ? 'active' : ''} >Note</NavLink>
        <NavLink to="/book" className={({ isActive }) => isActive ? 'active' : ''}>Books</NavLink>
        </nav>
    </header>
}
