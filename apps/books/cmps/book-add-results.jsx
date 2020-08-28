import { getGoogleBooks } from '../services/google-books-service.js'
import { BookService } from '../services/book-service.js'

export default class BookAddResults extends React.Component {
    state = {
        books: null
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.searchQuery === this.props.searchQuery) return
        if (this.props.searchQuery.length === 0) {
            this.setState({books:null})
            return }
        this.getBooksFromApi()
        
    }
    
    addBook = (bookIdx) => {
        
        const book = this.state.books[bookIdx]
        var newBook = {
            authors: book.volumeInfo.authors,
            description: book.volumeInfo.description,
            id: book.id,
            listPrice: {amount: book.saleInfo.listPrice.amount, currencyCode:book.saleInfo.listPrice.currencyCode},
            pageCount: book.volumeInfo.pageCount,
            title: book.volumeInfo.title,
            publishedDate: book.volumeInfo.publishedDate,
            isOnSale: false,
            thumbnail: book.volumeInfo.imageLinks.thumbnail
        }
        BookService.addGoogleBook(newBook).then(() => this.props.whenChange())
    }

    getBooksFromApi() {
        getGoogleBooks(this.props.searchQuery).then(data => this.setState({books:data.items}))
    }

    render() {
        if (!this.state.books) return <div></div>
        return (
            <ul className="google-books-search-results">
                {this.state.books.map((book,idx) => {
                    if (book.saleInfo.listPrice){
                        return (<li key={idx}>
                            {book.volumeInfo.title}
                            <button onClick={() => {this.addBook(idx)}}>Add Book</button>
                    </li>)
                        }
                })}
            </ul>
        )
    }
}

