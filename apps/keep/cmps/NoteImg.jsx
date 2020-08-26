

export class NoteImg extends React.Component {
    render() {
        return (
            <div className="note note-img">
                <img src={this.props.list.info.url}></img>
                <h3>{this.props.list.info.title}</h3>
            </div>
        )
    }
}


