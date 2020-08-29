import {formatDate} from './format-date.jsx'

export class ContentEditableArea extends React.Component {
    state = {
        replyValue: '',
        recValue:''
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.plainText !== this.props.plainText || prevProps.replyValue !== this.props.replyValue) {
            this.setFromProps()
        }
    }
    
    componentDidMount() {
        // this.setFromProps()
    }
    
    setFromProps = () => {
        
        if (this.props.plainText) {
            this.setState({recValue:this.props.plainText})
        }
        if (this.props.replyValue) {
            this.setState({replyValue:this.props.replyValue})
        }
    }

    shouldRenderRecievedValue = () => {
        if (this.state.recValue) {
            // const fakeEv = {target:{parentElement:{innerHTML:this.state.recValue},innerText:this.state.recValue}}
            return <div className="received-value-container" onInput={this.props.onChange} suppressContentEditableWarning={true} contentEditable="true" dangerouslySetInnerHTML={{__html: this.state.recValue}}></div>
        }
        return <div className="text-editor" onInput={this.props.onChange} contentEditable="true"></div>
    }
    shouldRenderReplyValue = () => {
        if (this.state.replyValue) return( 
        <div className="reply-value-container" >
            <div className="reply-header" suppressContentEditableWarning={true} contentEditable="true">{`${this.state.replyValue.author} wrote on ${formatDate(this.state.replyValue.sentAt)}:`}</div>
            <div className="reply-value" suppressContentEditableWarning={true} contentEditable="true" dangerouslySetInnerHTML={{__html: this.state.replyValue.body}}></div>
            
        </div>
        )
    }
    render() {
        return (
            <div className="nested-editable-container">
            
            {this.shouldRenderRecievedValue()}
            {this.shouldRenderReplyValue()}
            </div>
        )
    }
}
