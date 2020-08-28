

export class ModalColor extends React.Component {

    toggleColor = (color) => {
      
       this.props.changeColor(color,this.props.id);
       this.props.openColorPicker();
        
    }

    render() {
        

        return (
            <div className="color-picker">
                <div className="picker picker-white" onClick={()=>{this.toggleColor("white")}}></div>
                <div className="picker picker-green" onClick={()=>{this.toggleColor("green")}}></div>
                <div className="picker picker-blue" onClick={()=>{this.toggleColor("blue")}}></div>
                <div className="picker picker-purple" onClick={()=>{this.toggleColor("purple")}}></div>
                <div className="picker picker-red" onClick={()=>{this.toggleColor("red")}}></div>
                <div className="picker picker-pink" onClick={()=>{this.toggleColor("pink")}}></div>
                <div className="picker picker-yellow" onClick={()=>{this.toggleColor("yellow")}}></div>
            </div>
        )
    }
}


