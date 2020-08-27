

export class NoteImg extends React.Component {
    render() {
        return (
            <div className= "note-content">
                <div className="type">
                <img src="apps\keep\assets\icons\thumbtack-solid.svg" className={`icon ${this.props.list.isPinned? 'pinned':''} `} 
                onClick={()=>{this.props.pinnedNote(this.props.list.id,this.props.list.isPinned)}}/>
                <img className="icon"src="apps\keep\assets\icons\image-outline.svg"/> 
                </div>
                <img className="img"src={this.props.list.info.url}></img>
            </div>
        )
    }
}


