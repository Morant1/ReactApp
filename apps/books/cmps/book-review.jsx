import { BookService } from '../services/book-service.js'
import { ReviewAdd } from './review-add.jsx'
import { BookReviewDetails } from './book-review-details.jsx'


export class BookReviews extends React.Component {
    
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
        const bookId = this.props.bookId
        console.log('bookId',bookId)
        console.log(BookService)
        BookService.getById(bookId)
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
