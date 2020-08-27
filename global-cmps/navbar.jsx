const { NavLink, withRouter } = ReactRouterDOM


function _NavBar(props) {
    function goBack() {
        props.history.goBack()
    }
    return (
        <nav>
            {/* <button onClick={ goBack }>Back</button> */}
            <NavLink exact activeClassName='active-nav' to="/">Home</NavLink>
            <NavLink to="/mail/inbox" activeClassName='active-nav'>Mail</NavLink>
            <NavLink to="/keep" activeClassName='active-nav'>Keep</NavLink>
            <NavLink to="/book" activeClassName='active-nav'>Books</NavLink>
            <NavLink to="/about" activeClassName='active-nav'>About</NavLink>
        </nav>
    )
}
export const NavBar = withRouter(_NavBar)