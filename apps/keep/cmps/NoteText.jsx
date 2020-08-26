

export class NoteText extends React.Component {
    render() {
        console.log(this.props)
        return (
            <div className="note note-text">
                {this.props.list.info.txt}
            </div>
        )
    }
}


