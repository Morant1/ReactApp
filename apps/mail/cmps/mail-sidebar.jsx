const { NavLink, withRouter } = ReactRouterDOM

function _NavBar(props) {

    function displayUnreadMails() {
        if (props.unreadMails > 0) return <span>{props.unreadMails}</span>
    }

    function goBack() {
        props.history.goBack()
    }
    return (
        <nav className="mail-sidebar">
            <NavLink exact activeClassName='active-mail-nav' className="mail-sidebar-option mail-sidebar-compose" to="/mail/compose">Compose</NavLink>
            <NavLink activeClassName='active-mail-nav' className="mail-sidebar-option mail-sidebar-inbox" to="/mail/inbox">Inbox {displayUnreadMails()}</NavLink>
            <NavLink activeClassName='active-mail-nav' className="mail-sidebar-option mail-sidebar-starred" to="/mail/starred">Starred</NavLink>
            <NavLink activeClassName='active-mail-nav' className="mail-sidebar-option mail-sidebar-archived" to="/mail/archived">Archived</NavLink>
        </nav>
    )
}
export const SideBar = withRouter(_NavBar)