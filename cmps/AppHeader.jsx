import { MailFilter } from "../apps/mail/cmps/MailFilter.jsx";

const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    return <header className="app-header-mail">
        <div className="app-header-mail-container">
        <Link to="/">
            <img src="assets/css/apps/mail/images/gmailLogo.png" alt=""></img>
        </Link>
        <MailFilter />
        </div>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/mail">Mail</NavLink>
            <NavLink to="/note">Note</NavLink>
            <NavLink to="/book">Books</NavLink>
        </nav>
    </header>
}
{/* <header className="app-header">
        <Link to="/">
            <img src="assets/css/img/AppUs LOGO.png" alt=""></img>
        </Link>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/mail">Mail</NavLink>
            <NavLink to="/note">Note</NavLink>
            <NavLink to="/book">Books</NavLink>
        </nav>
    </header> */}