const { Link } = ReactRouterDOM
import {formatDate} from './format-date.jsx'
import { MailService } from '../services/mail-service.js'
import { utils } from '../../../services/utils.js'

export default class MailDetails extends React.Component {
    
    state = {
        mail: null
    }
    
    loadMail = () => {
        const mailId = this.props.match.params.mailId
        MailService.getMailDetails(mailId)
        .then(mail => this.setState({mail}))
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.mailId !== this.props.match.params.mailId) {
            this.loadMail()
        }
    }

    onReply = () => {
        // const subject = `Re: ${this.state.mail.subject}`
        // const recipient = this.state.mail.author
        // const body = this.state.mail.body
        const link = utils.relativeLink(`#/mail/compose?reply=${this.state.mail.id}`)
        window.location.replace(link)
        // window.location.replace(`/#/mail/compose?body=${body}&recipient=${recipient}&subject=${subject}`)
    }

    onArchive = () => {
        MailService.toggleArchived(this.state.mail.id)
        const link = utils.relativeLink('#/mail/inbox')
        window.location.replace(link)
    }

    onRemove = () => {
        MailService.removeMail(this.state.mail.id)
        const link = utils.relativeLink('#/mail/inbox')
        window.location.replace(link)
        }

    onUnread = () => {
        MailService.markAsUnRead(this.state.mail.id)
        const link = utils.relativeLink('#/mail/inbox')
        window.location.replace(link)
    }

    onSaveAsNote = () => {
        window.location.replace(`#/keep/addnote?text=${this.state.mail.body}`)
    }

    componentDidMount() {
        this.loadMail()
    }
    
    convertBodyToHtmlString = () => {
        const body = this.state.mail.body
        const bodyHtml = utils.makeHtmlStringNotEditable(body)
        return {__html: bodyHtml};
    }

    render() {
        if (!this.state.mail) return <div>Loading...</div>
        
        return (
            <div className="mail-details-master-container">
                <div className="mail-details-subject">{this.state.mail.subject}</div>
                <div className="mail-details-container">
                    <div className="mail-details-badge">{this.state.mail.author[0]}</div>
                    <div className="mail-details-content-container">
                        <div className="mail-details-author-container"><span className="mail-details-author">{this.state.mail.author}</span><span className="mail-details-time">{formatDate(this.state.mail.sentAt)}</span></div>
                        <div className="mail-details-to">to me</div>
                        <div className="mail-details-body" dangerouslySetInnerHTML={this.convertBodyToHtmlString()}></div>
                        <div className="mail-details-buttons">
                            <button className="mail-details-reply" onClick={this.onReply}>Reply</button>
                            <button className="mail-details-archive" onClick={this.onArchive}>Archive</button>
                            <button className="mail-details-remove" onClick={this.onRemove}>Remove</button>
                            <button className="mail-details-unread" onClick={this.onUnread}>Unread</button>
                            <button className="mail-details-save-note" onClick={this.onSaveAsNote}>Save Note</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
