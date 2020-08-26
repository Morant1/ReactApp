

export class NoteVideo extends React.Component {
    render() {
        return (
            <div className="note-content">
                <div className="type">
                <img className="icon"src="apps\keep\assets\icons\videocam-outline.svg"/>
                </div>
                <iframe width="200" height="205"
                    src={`https://www.youtube.com/embed/${this.props.list.info.url}?autoplay=1`}>
                </iframe>
            </div>
        )
    }
}


