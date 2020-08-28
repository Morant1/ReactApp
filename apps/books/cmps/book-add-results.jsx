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
        // this.checkIfHaveBooks()
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

    checkIfHaveBooks = () => {
        if (this.state.books) {
            this.props.hasBooks(true)
        } else {
            this.props.hasBooks(false)
        }
    }

    getBooksFromApi() {
        getGoogleBooks(this.props.searchQuery).then(data => this.setState({books:data.items}))
        
    }

    render() {
        if (!this.state.books) return (
            
        <div>{this.checkIfHaveBooks()}</div>
        )
        return (
            <ul className="google-books-search-results">
                {this.checkIfHaveBooks()}
                {this.state.books.map((book,idx) => {
                    if (book.saleInfo.listPrice){
                        return (<li key={idx}>
                            <div onClick={() => {this.addBook(idx)}}>{book.volumeInfo.title}</div>
                            <button onClick={() => {this.addBook(idx)}}>Add Book</button>
                    </li>)
                        }
                })}
            </ul>
        )
    }
}

