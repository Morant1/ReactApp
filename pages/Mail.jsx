const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
import MailList from '../apps/mail/cmps/mail-list.jsx'
import { MailService } from '../apps/mail/services/mail-service.js'
import MailDetails from '../apps/mail/cmps/mail-details.jsx'
import { SideBar } from '../apps/mail/cmps/mail-sidebar.jsx'
import MailCompose from '../apps/mail/cmps/mail-compose.jsx'


export default class MailApp extends React.Component { 

    state = {
        mails:null,
        filterBy:'inbox',
        sortBy:'',
        unreadMails: 0,
        onlyDisplayReadOrUnread: ''
    }


    getQueryParams = () => {
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        const sortBy = params.get('sortBy');
        if (sortBy) this.setState({sortBy})
        const filterOnlyRead = params.get('onlyread')
        if (filterOnlyRead) this.setState({onlyDisplayReadOrUnread:filterOnlyRead})
        this.getMailsForDisplay()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            const regex = /\/mail\/(.*?)/
            const filterString = this.props.location.pathname.replace(regex,'')
                this.setState({filterBy:filterString})
                this.getMailsForDisplay()
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


    sumUnread(mails) {
        var totalUnread = 0
        mails.forEach(mail => {
            if(!mail.isRead) totalUnread++
        })
        return totalUnread
    }

    sortMails(mails,sortBy) {
        if (sortBy === 'date') {
            console.log('sorting by date')
            return mails.sort((a,b) => b.sentAt - a.sentAt)
        } else {
            console.log('sorting by name')
            return mails.sort((a,b) => {
                    if ( a.author < b.author ){
                      return -1;
                    }
                    if ( a.author > b.author ){
                      return 1;
                    }
                    return 0;
                  })
            }
        }
    
        filterStarredAndArchived = (mails) => {
            switch (this.state.filterBy) {
                case 'starred':
                    return mails.filter(mail => mail.isStarred === true)
                    
                case 'archived':
                    return mails.filter(mail => mail.isArchived === true)
                
                default: //also acts as inbox
                    return mails.filter(mail => mail.isArchived === false)

            }
        }

        filterReadAndUnread = (mails) => {
            switch (this.state.onlyDisplayReadOrUnread) {

                case 'onlyread':
                    return mails.filter(mail => mail.isRead === true)
                    
                case 'onlyunread':
                    return mails.filter(mail => mail.isRead === false)
                
                default: //also acts as inbox
                    return mails

            }
    }

    onSendMail = (mail) => {
        console.log(mail)
        MailService.addMail(mail.subject,mail.body)
        .then(res => {
            this.getMailsForDisplay()
            window.location.replace(`/#/mail/inbox/`)
        })
    }

    getMailsForDisplay =() => {
        MailService.getAllMails()
        .then(allMails => {
            var mails = this.filterStarredAndArchived(allMails)
            mails = this.filterReadAndUnread(mails)
            console.log(mails)
            mails = this.sortMails(mails,this.state.sortBy)
            const unreadMails = this.sumUnread(mails)
            this.setState({mails,unreadMails})

        })
    }
    componentDidMount() {
        this.getMailsForDisplay()
    }
    

    render() {
        if (!this.state.mails) return <div>Loading...</div>
        return  (
            <section className="mail-main-container">
            <SideBar unreadMails={this.state.unreadMails}/>
            <Switch>
            {/* <Route component={MailCompose} exact path="mail/compose" /> */}
            <Route  component={MailList} exact path="/mail/:filterBy">
            <MailList mails={this.state.mails} starFn={this.onToggleStar} readFn={this.onRead} removeFn={this.onRemove} archiveFn={this.onArchive}/>
            <Route component={() => <MailCompose sendFn={this.onSendMail} searchParams={this.props.location.search} />} exact path="/mail/compose" />
            </Route>
            <Route  component={MailDetails} exact path="/mail/inbox/:mailId" />
            

            </Switch>
            </section>
            )
        }
}
