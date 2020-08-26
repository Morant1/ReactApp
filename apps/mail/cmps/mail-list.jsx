import MailPreview from './mail-preview.jsx'
import { MailService } from '../services/mail-service.js'


export default class MailList extends React.Component {


    render() {
        return (
            <div className="mail-list-container">
            <ul className="mail-list">
                {this.props.mails.map(mail => <MailPreview key={mail.id} mail={mail} starFn={this.props.starFn} readFn={this.props.readFn} removeFn={this.props.removeFn} archiveFn={this.props.archiveFn}/>)}
            </ul>
            </div>
        )
    }
}
