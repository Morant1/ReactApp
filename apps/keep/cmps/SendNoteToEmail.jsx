const { Link } = ReactRouterDOM;

export class SendNoteToEmail extends React.Component {


    render() {
        return (
            <Link className='icon' to={`/mail/compose?body=${this.props.getValueByType()? this.props.getValueByType(): 
            this.props.list.type === "video" ? `https://www.youtube.com/watch?v=${this.props.list.info.url}` : this.props.list.info.url} &subject=This is my ${this.props.list.type}`}>
            <img src="apps\keep\assets\icons\send-outline.svg" className="icon"/>
            </Link>
        )
    }
}
