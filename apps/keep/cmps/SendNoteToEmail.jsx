const { Link } = ReactRouterDOM;

export class SendNoteToEmail extends React.Component {

    sendEmail = () => {

    }

    render() {
        return (
            <Link className='book' to={`/mail/compose?body=${this.props.getValueByType()? this.props.getValueByType(): this.props.list.info.url}&subject=${this.props.list.type}`}>
            <img src="apps\keep\assets\icons\send-outline.svg" className="icon"/>
            </Link>
        )
    }
}
