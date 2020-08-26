const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

import MailList from '../apps/mail/cmps/mail-list.jsx'
import { MailService } from '../apps/mail/services/mail-service.js'
import MailDetails from '../apps/mail/cmps/mail-details.jsx'
import { SideBar } from '../apps/mail/cmps/mail-sidebar.jsx'


export default class MailApp extends React.Component { 

    state = {
        mails:null,
        filterBy:'inbox'
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
        console.log(this.props)
        const regex = /\/mail\/(.*?)/
        const filterString = this.props.location.pathname.replace(regex,'')
            this.setState({filterBy:filterString})
            this.getMailsForDisplay()
        }
    }

    onToggleStar =(id) => {
        MailService.toggleStar(id).then(res => this.getMailsForDisplay())
    }


    onRead = (id) => {
        MailService.markAsRead(id).then(res => this.getMailsForDisplay())
        window.location.replace(`/sprint3/#/mail/inbox/${id}`)
    }

    onRemove = (id) => {
        MailService.removeMail(id).then(res => this.getMailsForDisplay())
    }

    onArchive = (id) => {
        MailService.toggleArchived(id).then(res => this.getMailsForDisplay())
    }

    getMailsForDisplay =() => {
        MailService.getAllMails()
        .then(allMails => {
            switch (this.state.filterBy) {
                case 'inbox':
                    var mails = allMails.filter(mail => mail.isArchived === false)
                    break;
                case 'starred':
                    var mails = allMails.filter(mail => mail.isStarred === true)
                    break;
                case 'archived':
                    var mails = allMails.filter(mail => mail.isArchived === true)
                    break;

            }
            console.log(mails)
            this.setState({mails})
        })
    }
    componentDidMount() {
        this.getMailsForDisplay()
    }
    

    render() {
        if (!this.state.mails) return <div>Loading...</div>
        return  (
            <section className="mail-main-container">
            <SideBar />
            <Switch>
            <Route  component={MailList} exact path="/mail/:filterId?">
            <MailList mails={this.state.mails} starFn={this.onToggleStar} readFn={this.onRead} removeFn={this.onRemove} archiveFn={this.onArchive}/>
            </Route>
            <Route  component={MailDetails} exact path="/mail/inbox/:mailId" />
            
            {/* <Route component={ MailList } path="/mail/inbox"> */}
            

            </Switch>
            </section>
            )
        }
}
