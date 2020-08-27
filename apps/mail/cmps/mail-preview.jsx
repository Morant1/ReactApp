import {formatDate} from './format-date.jsx'

export default class MailPreview extends React.Component {
    state = {
        id: '',
        subject: '',
        isRead: false,
        body: '',
        sentAt: '',
        isStarred: false,
        author: '',
        isArchived: false,
        isChecked: false
    }
    

    isMailRead = () => {
        if (this.state.isRead) return 'mail-preview-line mail-preview-read'
        return 'mail-preview-line mail-preview-unread'
    }

    isMailStarred = () => {
        if (this.state.isStarred) return <img src="./apps/mail/assets/imgs/star-filled.svg" />
        return <img src="./apps/mail/assets/imgs/star-hollow.svg" />
    }

    isMailChecked = () => {
        if (this.state.isChecked) return <img src="./apps/mail/assets/imgs/icon-toggle-check_box_24px.svg" />
        return <img src="./apps/mail/assets/imgs/icon-toggle-check_box_off_24px.svg" />
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.mail.isStarred !== this.props.mail.isStarred) {            
            this.setState({isStarred:this.props.mail.isStarred})
        }
        if (prevProps.mail.isRead !== this.props.mail.isRead) {            
            this.setState({isRead:this.props.mail.isRead})
        }
        if (prevProps.mail.isChecked !== this.props.mail.isChecked) {            
            this.setState({isChecked:this.props.mail.isChecked})
        }
    }
    
    componentDidMount() {
        this.setState(this.props.mail)
    }
    

    render() {
        return (
            <li className={this.isMailRead()} >
                <div className="mail-preview-checkbox" onClick={() => {this.props.checkFn(this.state.id)}}>{this.isMailChecked()}</div>
                <div className="mail-preview-star" onClick={() => {this.props.starFn(this.state.id)}}>{this.isMailStarred()}</div>
                <div className="mail-preview-author" onClick={() => {this.props.readFn(this.state.id)}}>{this.state.author}</div>
                <div className="mail-preview-contents" onClick={() => {this.props.readFn(this.state.id)}}><span className="mail-previw-subject">{this.state.subject} -</span><span className="mail-preview-body"> {this.state.body}</span></div>
                <div className="mail-preview-sentAt">{formatDate(this.state.sentAt)}</div>
                <div className="mail-preview-remove-container">
                    <div className="mail-preview-remove" onClick={() => {this.props.removeFn(this.state.id)}}></div>
                    <div className="mail-preview-archive" onClick={() => {this.props.archiveFn(this.state.id)}}></div>
                </div>
            </li>
        )
    }
}
