import { BookService } from '../../../services/storage-services.js'
import ReviewAdd from '../cmps/ReviewAdd.jsx'
import {BookReviewDetails} from './BookReviewDetails.jsx'


export default class BookReviews extends React.Component {
    
    state = {
        bookReviews: null
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('props',this.props)
    }
    
    componentDidMount() {
        this.updateReviews()
    }


    updateReviews = () => {
        BookService.getById(this.props.bookId)
        .then(data => {
            const bookReview = data.review
            if (bookReview) {
                this.setState({bookReviews : bookReview})
            }
        })
    }
    
    onAddReview = (bookId,review) => {
        BookService.addReview(bookId,review)
        .then(res => this.updateReviews())
    }

    
    
    render() {
        return (
            <section className="reviews">
                {(!this.state.bookReviews) ? <div>No reviews yet</div> : <BookReviewDetails  bookReviews = {this.state.bookReviews}/>}
                <ReviewAdd bookId={this.props.bookId} whenChange={this.updateReviews} onAddReview={this.onAddReview}/>
            </section>
        )
    }
}
