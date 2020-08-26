import { MailService } from '../services/mail-service.js'
import MailPreview from './mail-preview.jsx'


export default class MailList extends React.Component {

    state = {
        mails:false
    }

    onToggleStar =(id) => {
        MailService.toggleStar(id).then(res => {
                this.getMails()
        })
    }

    onRead = (id) => {
        console.log('mail read', id)
        MailService.markAsRead(id)
    }

    getMails =() => {
        MailService.getAllMails()
        .then(mails => this.setState({mails}))
    }
    componentDidMount() {
        this.getMails()
    }
    
    render() {
        if (!this.state.mails) return <div>Loading...</div>
        return (
            <ul className="mail-list">
                {this.state.mails.map(mail => <MailPreview key={mail.id} mail={mail} starFn={this.onToggleStar} readFn={this.onRead}/>)}
            </ul>
        )
    }
}
