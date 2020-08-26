

export class ModalColor extends React.Component {
    render() {
        

        return (
            <div className="color-picker">
                <div className="picker picker-green" onClick={()=>{this.props.changeColor("green",this.props.id)}}></div>
                <div className="picker picker-blue" onClick={()=>{this.props.changeColor("blue",this.props.id)}}></div>
                <div className="picker picker-purple" onClick={()=>{this.props.changeColor("purple",this.props.id)}}></div>
                <div className="picker picker-red" onClick={()=>{this.props.changeColor("red",this.props.id)}}></div>
                <div className="picker picker-pink" onClick={()=>{this.props.changeColor("pink",this.props.id)}}></div>
                <div className="picker picker-yellow" onClick={()=>{this.props.changeColor("yellow",this.props.id)}}></div>
            </div>
        )
    }
}


