import {ContentEditableArea} from './content-editable.jsx'
import {MailService} from '../services/mail-service.js'

export default class MailCompose extends React.Component {
    state = {
        recipient: '',
        subject: '',
        body:'',
        bodyPlainText: '',
        inBody: '',
        inBodyPlainText: ''
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.searchParams !== this.props.searchParams) {
            this.updateFromQueryString()
        }
    }
    
    isReply = (id) => {
        MailService.getMailDetails(id).then(mail => {
            const newSubjectText = `Re: ${mail.subject}`
            this.setState({inBody:mail,subject:newSubjectText,recipient:mail.author})
            // this.setState({subject:newSubjectText})
            // this.setState({recipient:mail.author})
        })
    }

    updateFromQueryString = () => {
        const search = this.props.searchParams;
        const params = new URLSearchParams(search);
        var subject = params.get('subject');
        var recipient = params.get('recipient');
        if (params.get('reply')) return this.isReply(params.get('reply'))
        var inBodyPlainText = params.get('body');
        if (!inBodyPlainText) inBodyPlainText = ''
        if (!subject) subject = ''
        if (!recipient) recipient = ''
        
        // console.log(inBodyPlainText)
        this.setState({inBodyPlainText: inBodyPlainText,subject,recipient})
    }

    onInputChange = (ev) => {
        const key = ev.target.name
        const value = ev.target.value
        this.setState({[key]: value})
    }

    componentDidMount() {
        this.updateFromQueryString()
    }
    
    onBodyInput = (ev) => {
        // console.dir(ev.target.innerText)
        this.setState({body:ev.target.parentElement.innerHTML,bodyPlainText:ev.target.innerText})
    }

    cleanMail = () => {
        this.setState({
            recipient: '',
            subject: '',
            body:''
        })
    }

    render() {
        return (
            <div className="mail-compose-container">
                <div className="mail-compose-title"><span>New Message</span><span onClick={() => {window.location.replace(`${window.location.origin}${window.location.pathname}#/mail/inbox`)}} className="mail-compose-close">X</span></div>
                <div className="mail-compose-recipient">
                    <input type="email" className="mail-compose-rec-input" value={this.state.recipient} placeholder="Receipients" name="recipient" onChange={this.onInputChange}></input>
                </div>
                <div className="mail-compose-subject">
                    <input type="text" className="mail-compose-subject-input" value={this.state.subject} placeholder="Subject" name="subject" onChange={this.onInputChange}></input>
                </div>
                <div className="mail-compose-body-container">
                    <ContentEditableArea onChange={this.onBodyInput} plainText={this.state.inBodyPlainText} replyValue={this.state.inBody}/>
                    {/* <textarea className="mail-compose-body-textarea" name="body" value={this.state.body} onChange={this.onInputChange}></textarea> */}
                </div>
                <div className="mail-compose-buttons">
                    <button onClick={() => {this.props.sendFn(this.state)}}>Send</button>
                </div>
            </div>
        )
    }
}
