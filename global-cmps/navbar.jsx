const { NavLink, withRouter } = ReactRouterDOM


function _NavBar(props) {
    function goBack() {
        props.history.goBack()
    }
    return (
        <nav>
            {/* <button onClick={ goBack }>Back</button> */}
            <NavLink exact activeClassName='active-nav' to="/"><div className="nav-option-container">Home</div></NavLink>
            <NavLink to="/mail/inbox" activeClassName='active-nav'><div className="nav-option-container">Mail</div></NavLink>
            <NavLink to="/keep" activeClassName='active-nav' ><div className="nav-option-container">Keep</div></NavLink>
            <NavLink to="/book" activeClassName='active-nav'><div className="nav-option-container">Books</div></NavLink>
            <NavLink to="/about" activeClassName='active-nav'><div className="nav-option-container">About</div></NavLink>
        </nav>
    )
}
export const NavBar = withRouter(_NavBar)