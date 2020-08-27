const { Link } = ReactRouterDOM
import {formatDate} from './format-date.jsx'
import { MailService } from '../services/mail-service.js'

export default class MailDetails extends React.Component {
    
    state = {
        mail: null
    }
    
    loadMail = () => {
        console.log('props',this.props)
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
        const subject = `Re: ${this.state.mail.subject}`
        const recipient = this.state.mail.author
        const body = this.state.mail.body
        window.location.replace(`/#/mail/compose?body=${body}&recipient=${recipient}&subject=${subject}`)

    }

    componentDidMount() {
        this.loadMail()
    }
    

    render() {
        if (!this.state.mail) return <div>Loading...</div>
        console.log(this.state.mail)
        return (
            <div>
                <div className="mail-details-subject">{this.state.mail.subject}</div>
                <div className="mail-details-container">
                    <div className="mail-details-badge">{this.state.mail.author[0]}</div>
                    <div className="mail-details-content-container">
                        <div className="mail-details-author-container"><span className="mail-details-author">{this.state.mail.author}</span><span className="mail-details-time">{formatDate(this.state.mail.sentAt)}</span></div>
                        <div className="mail-details-to">to me</div>
                        <div className="mail-details-body">{this.state.mail.body}</div>
                        <div className="mail-details-buttons">
                            <button className="mail-details-reply" onClick={this.onReply}>Reply</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
