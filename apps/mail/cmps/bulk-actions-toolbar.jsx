
export class BulkActionsToolbar extends React.Component {
    // state = {

    // }
    
    render() {
        return (
            <div className="bulk-action-toolbar">
                <button className="bulk-action-archive" onClick={() => this.props.bulkAction('archive')}>archive</button>
                <button className="bulk-action-star" onClick={() => this.props.bulkAction('star')}>star</button>
                <button className="bulk-action-remove" onClick={() => this.props.bulkAction('remove')}>remove</button>
                <button className="bulk-action-read" onClick={() => this.props.bulkAction('read')}>read</button>
                <button className="bulk-action-unread" onClick={() => this.props.bulkAction('unread')}>unread</button>
            </div>
        )
    }
}
