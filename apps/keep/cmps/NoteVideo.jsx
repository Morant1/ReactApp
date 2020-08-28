

export class NoteVideo extends React.Component {
    render() {
        return (
            <div className="note-content">
                <div className="type">
                <img src="apps\keep\assets\icons\thumbtack-solid.svg" className={`icon ${this.props.list.isPinned? 'pinned':''} `} 
                onClick={()=>{this.props.pinnedNote(this.props.list.id,this.props.list.isPinned)}}/>
                <img className="icon"src="apps\keep\assets\icons\videocam-outline.svg"/>
                </div>
                <iframe 
                    src={`https://www.youtube.com/embed/${this.props.list.info.url}?autoplay=1`}>
                </iframe>
            </div>
        )
    }
}


