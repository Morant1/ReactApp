
export class AddNotes extends React.Component {
    render() {
        return (
            <div className="input-container">
            <div className="input">
                 <textarea name="textBox" value='' rows="3" cols="70">
            </textarea>
            </div>
            <input type="color" name="favcolor" value="#FFFFF"></input>
            <img src=".\assets\icons\trash-outline.svg"/>
            </div>
        )
    }
}

export default AddNotes
