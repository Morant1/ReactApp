import { BookService } from '../services/book-service.js'
import  StarRating  from './star-rating.jsx'

export class ReviewAdd extends React.Component {
    
    state = {
        allFieldsFilled: false,
        review: {}
    }

    onAddReview = (ev) => {
        ev.preventDefault()
        if (!this.state.allFieldsFilled) return
        BookService.addReview(this.props.bookId,this.state.review)
        this.props.whenChange()
    }
    
    onInputChange = (ev) => {
        if (Object.keys(this.state.review).length >= 4) {
            this.setState({allFieldsFilled:true}) 
        }else {
            this.setState({allFieldsFilled:false})
        }
        const value = ev.target.type === 'number' ? +ev.target.value : ev.target.value
        this.setState({review:{...this.state.review, [ev.target.name] : value}})
    }

    onAddRate = (value) => {
        console.log(value)
        this.setState({review:{...this.state.review,rating:value}})
    }

    getNowDate() {
        const d = new Date(Date.now())
        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
        const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d)
        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
        return `${ye}-${mo}-${da}`
    }

    render() {
        return (
            <form>
               <input name="username" className="form-user-name"  onChange={ this.onInputChange } placeholder="Full Name" required></input>
               
                <StarRating setRatingFn={this.onAddRate} value={this.state.review.rating}/>
               {/* <input name="rating" type="range" onChange={ this.onInputChange } min="1" max="5" defaultValue="0"></input> */}
               
               <div className="form-read-date">
                   Read on
               <input className="form-read-date-input" name="date" type="date" onChange={ this.onInputChange }  defaultValue={this.getNowDate()}></input>
               </div>
               <textarea name="fullReview" className="form-full-review" onChange={ this.onInputChange } placeholder="Full Review"></textarea>
               <button type="button" onClick={() => this.props.onAddReview(this.props.bookId,this.state.review)}>Submit</button>
               {(this.state.allFieldsFilled) ? <span></span> : <div className="form-fields-warning">Please fill all fields</div>}
                   
            </form>
        )
    }
}
