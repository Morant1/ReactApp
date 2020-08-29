const { Link } = ReactRouterDOM
import { getBookCurrency } from './book-currency.jsx'
import { BookService } from '../services/book-service.js'
import { BookReviews } from './book-review.jsx'


export class BookDetails extends React.Component { 

    state = {
        shouldShowFullDescription:false,
        book: null
    }

    getBookLength() {
        const pageCount = this.state.book.pageCount
        var bookLength;
        if (pageCount > 500) {
            bookLength = 'Long Reading'
        } else if (pageCount > 200) {
            bookLength = 'Decent Reading'
        } else {
            bookLength = 'Light Reading'
        }

    return <h3>{bookLength}</h3>
    }

    componentDidMount() {
        const bookId = this.props.match.params.bookId
        BookService.getById(bookId)
            .then(book => this.setState({ book }))
    }
    
    getPublishedDate() {
        var publishedDate = this.state.book.publishedDate
        var bookAge = new Date().getFullYear() - publishedDate
        if (bookAge >= 10) {
            return <h3>Veteran Book</h3>
        } else if (bookAge <= 1) {
            return <h3>New!</h3>
        } else {
            return ''
        }
    }

    getPriceClass() {
        var bookPrice = this.state.book.listPrice.amount
        if (bookPrice > 150) {
            return 'book-price-red'
        } else if (bookPrice < 20) {
            return 'book-price-green'
        } else {
            return ''
        }
    }

    
    onClickReadMore = () => {
        this.setState({shouldShowFullDescription : true})
    }

    render() {
        
        const {bookId} = this.props.match.params
        {if (!this.state.book) return <div></div>}
        
        return <section className="book-details">
                <Link to="/book/"><div className="back-button">Back to list</div></Link>
                    <h2 className="book-title">{this.state.book.title}</h2>
                <img src={`${this.state.book.thumbnail}`} />
                    <div className={this.getPriceClass()}>{getBookCurrency(this.state.book.listPrice)}</div>
                    {this.getBookLength()}
                    {this.getPublishedDate()}
                    {(this.state.shouldShowFullDescription || this.state.book.description.length < 100) ? <p>{this.state.book.description}</p> : (<p>{this.state.book.description.substring(0,100) + '...'}<a className="book-details-read-more" onClick={this.onClickReadMore}>Read More</a></p>)}
                    <BookReviews bookId={bookId}/>
                 </section>
    }

    
}