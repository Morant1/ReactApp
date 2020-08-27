import {FilterToolbar} from './filter-toolbar.jsx'
import {BulkActionsToolbar} from './bulk-actions-toolbar.jsx'


export function Toolbar(props) {
    if (props.selectedMails) return (
        <div className="mail-toolbar">
    <BulkActionsToolbar bulkAction={props.bulkAction} />
    </div>
    )
    return (
        <div className="mail-toolbar">
                <FilterToolbar />
        </div>
    )
    
}