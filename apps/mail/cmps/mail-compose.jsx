

export default class MailCompose extends React.Component {
    state = {
        recipient: '',
        subject: '',
        body:''
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.searchParams !== this.props.searchParams) {
            this.updateFromQueryString()
        }
    }
    
    updateFromQueryString = () => {
        const search = this.props.searchParams;
        const params = new URLSearchParams(search);
        var body = params.get('body');
        var subject = params.get('subject');
        var recipient = params.get('recipient');
        if (!body) body = ''
        if (!subject) subject = ''
        if (!recipient) recipient = ''
        this.setState({body,subject,recipient})
    }

    onInputChange = (ev) => {
        const key = ev.target.name
        const value = ev.target.value
        this.setState({[key]: value})
    }

    componentDidMount() {
        this.updateFromQueryString()
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
                <div className="mail-compose-title">New Message</div>
                <div className="mail-compose-recipient">
                    <input type="email" className="mail-compose-rec-input" value={this.state.recipient} placeholder="Receipients" name="recipient" onChange={this.onInputChange}></input>
                </div>
                <div className="mail-compose-subject">
                    <input type="text" className="mail-compose-subject-input" value={this.state.subject} placeholder="Subject" name="subject" onChange={this.onInputChange}></input>
                </div>
                <div className="mail-compose-body-container">
                    <textarea className="mail-compose-body-textarea" name="body" value={this.state.body} onChange={this.onInputChange}></textarea>
                </div>
                <div className="mail-compose-buttons">
                    <button onClick={() => {this.props.sendFn(this.state)}}>Send</button>
                </div>
            </div>
        )
    }
}
