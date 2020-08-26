const { NavLink, withRouter } = ReactRouterDOM

function _NavBar(props) {
    function goBack() {
        props.history.goBack()
    }
    return (
        <nav className="mail-sidebar">
            <NavLink exact activeClassName='active-mail-nav' className="mail-sidebar-option" to="/compose">Compose</NavLink>
            <NavLink activeClassName='active-mail-nav' className="mail-sidebar-option" to="/mail/inbox">Inbox</NavLink>
            <NavLink activeClassName='active-mail-nav' className="mail-sidebar-option" to="/mail/starred">Starred</NavLink>
            <NavLink activeClassName='active-mail-nav' className="mail-sidebar-option" to="/mail/archived">Archived</NavLink>
        </nav>
    )
}
export const SideBar = withRouter(_NavBar)