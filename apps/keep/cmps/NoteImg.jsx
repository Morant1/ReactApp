

export class NoteImg extends React.Component {
    render() {
        return (
            <div className= "note-content">
                <div className="type">
                <img className="icon"src="apps\keep\assets\icons\image-outline.svg"/> 
                </div>
                <img className="img"src={this.props.list.info.url}></img>
                <h3>{this.props.list.info.title}</h3>
            </div>
        )
    }
}


