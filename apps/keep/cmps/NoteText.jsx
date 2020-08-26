

export class NoteText extends React.Component {
    render() {
        return (
        <div className="note-content">
                <div className="type">
                <img className="icon"src="apps\keep\assets\icons\text-outline.svg"/>
                </div>
                {this.props.list.info.txt}
            </div>
        )
    }
}


