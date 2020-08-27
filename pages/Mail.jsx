const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
import MailList from '../apps/mail/cmps/mail-list.jsx'
import { MailService } from '../apps/mail/services/mail-service.js'
import MailDetails from '../apps/mail/cmps/mail-details.jsx'
import { SideBar } from '../apps/mail/cmps/mail-sidebar.jsx'
import MailCompose from '../apps/mail/cmps/mail-compose.jsx'
import {BusService} from '../services/event-bus-service.js'
import { Toolbar } from '../apps/mail/cmps/toolbar-dynamic-cmp.jsx'

export default class MailApp extends React.Component { 

    state = {
        mails:null,
        filterBy:'inbox',
        sortBy:'',
        unreadMails: 0,
        onlyDisplayReadOrUnread: '',
        searchQuery: '',
        isMailsChecked: false
    }

    bulkAction = (action) => {
        var a = MailService.bulkAction(action)
        a.then(() => {this.getMailsForDisplay()})
       
    }


    getQueryParams = () => {
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        const sortBy = params.get('sortby');
        if (sortBy) this.setState({sortBy},this.getMailsForDisplay)
        const filterOnlyRead = params.get('onlyread')
        if (filterOnlyRead) this.setState({onlyDisplayReadOrUnread:filterOnlyRead},this.getMailsForDisplay)
        // this.getMailsForDisplay()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            const regex = /\/mail\/(.*?)/
            const filterString = this.props.location.pathname.replace(regex,'')
                this.setState({filterBy:filterString},this.getMailsForDisplay)
                
            }
        if (prevProps.location.search !== this.props.location.search) {
                this.getQueryParams()
            }            
    }

    onToggleStar =(id) => {
        MailService.toggleStar(id).then(res => this.getMailsForDisplay())
    }


    onRead = (id) => {
        MailService.markAsRead(id).then(res => this.getMailsForDisplay())
        window.location.replace(`/#/mail/inbox/${id}`)
    }

    onRemove = (id) => {
        MailService.removeMail(id).then(res => this.getMailsForDisplay())
    }

    onArchive = (id) => {
        MailService.toggleArchived(id).then(res => this.getMailsForDisplay())
    }

    toggleChecked = (id) => {
        MailService.toggleChecked(id).then(res => {
            this.getMailsForDisplay()})
    }

    checkIfMailsChecked = () => {
        var isMailsChecked = (this.state.mails.some(mail => {
            return mail.isChecked}))
        this.setState({isMailsChecked})
    }


    sumUnread(mails) {
        var totalUnread = 0
        mails.forEach(mail => {
            if(!mail.isRead) totalUnread++
        })
        return totalUnread
    }


    onSendMail = (mail) => {
        MailService.addMail(mail.subject,mail.body)
        .then(res => {
            this.getMailsForDisplay()
            window.location.replace(`/#/mail/inbox/`)
        })
    }

    getMailsForDisplay = () => {
        var filters = {
            sortBy: this.state.sortBy,
            filterBy: this.state.filterBy,
            filterReadAndUnread: this.state.onlyDisplayReadOrUnread,
            searchQuery: this.state.searchQuery
        }
        
            MailService.getMailsForDisplay(filters)
                .then(mails => {
                    (this.setState({mails}),this.checkIfMailsChecked()) 
})}


    componentDidMount() {
        this.getMailsForDisplay()
        BusService.on('searchUpdated',this.onSearch)
        
    }
    
    onSearch = (searchQuery) => {
        // window.location.replace(`/#/mail/inbox/`)
        this.setState({searchQuery},this.getMailsForDisplay)
    }

    render() {
        if (!this.state.mails) return <div>Loading...</div>
        return  (
            <section>
            <Toolbar selectedMails={this.state.isMailsChecked} bulkAction={this.bulkAction}/>
            <div className="mail-main-container">
            <SideBar unreadMails={this.state.unreadMails}/>
            <Switch>
            {/* <Route component={MailCompose} exact path="mail/compose" /> */}
            <Route  component={MailList} exact path="/mail/:filterBy">
                <MailList mails={this.state.mails} checkFn={this.toggleChecked} starFn={this.onToggleStar} readFn={this.onRead} removeFn={this.onRemove} archiveFn={this.onArchive}/>
                <Route component={() => <MailCompose sendFn={this.onSendMail} searchParams={this.props.location.search} />} exact path="/mail/compose" />
            </Route>
            <Route  component={MailDetails} exact path="/mail/inbox/:mailId" />
            </Switch>
            </div>
            </section>
            )
        }
}
