

export default class MailPreview extends React.Component {
    state = {
        id: '',
        subject: '',
        isRead: false,
        body: '',
        sentAt: Date.now(),
        isStarred: false,
        author: '',
        isArchived: false
    }
    
    formatDate = () => {
        var date = new Date(this.state.sentAt)
        var today = new Date(Date.now())
        // if the e-mail is from today - return the time it was sent
        if (date.toLocaleDateString() === today.toLocaleDateString()) return date.toLocaleTimeString()
        // else - return the date it was sent on
        return date.toLocaleDateString()
    }

    isMailRead = () => {
        if (this.state.isRead) return 'mail-preview-line mail-preview-read'
        return 'mail-preview-line mail-preview-unread'
    }

    isMailStarred = () => {
        if (this.state.isStarred) return <img src="./apps/mail/assets/imgs/star-filled.svg" />
        return <img src="./apps/mail/assets/imgs/star-hollow.svg" />
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.mail.isStarred !== this.props.mail.isStarred) {
            this.setState(this.props.mail)
        }
    }
    
    componentDidMount() {
        this.setState(this.props.mail)
    }
    

    render() {
        console.log('rendering mail preview')
        return (
            <li className={this.isMailRead()} onClick={() => {this.props.readFn(this.state.id)}}>
                <div className="mail-preview-star" onClick={() => {this.props.starFn(this.state.id)}}>{this.isMailStarred()}</div>
                <div className="mail-preview-author">{this.state.author}</div>
                <div className="mail-preview-contents"><span className="mail-previw-subject">{this.state.subject} -</span><span className="mail-preview-body"> {this.state.body}</span></div>
                <div className="mail-preview-sentAt">{this.formatDate()}</div>
            </li>
        )
    }
}
