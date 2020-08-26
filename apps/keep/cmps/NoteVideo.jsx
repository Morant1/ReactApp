

export class NoteVideo extends React.Component {
    render() {
        return (
            <div className="note note-video">
                <iframe width="200" height="205"
                    src={`${this.props.list.info.url}?autoplay=1`}>
                </iframe>
            </div>
        )
    }
}


