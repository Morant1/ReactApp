import {BookService} from '../apps/books/services/book-service.js'
// import {BookFilter} from '../cmps/BookFilter.jsx'
import BookList from '../apps/books/cmps/book-list.jsx'
import BookDetails from '../apps/books/cmps/book-details-description.jsx'
import { Modal } from '../global-cmps/Modal.jsx';
import { BookAdd } from '../apps/books/cmps/book-add.jsx';
import {BusService} from '../services/event-bus-service.js'


export class BookApp extends React.Component { 

    state = {
        books: null,
        filterBy: '',
        selectedBook: null
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy })
    }

    loadBooks(books) {
        // this.isReady = true
        this.setState({books})
    }

    booksToShow() {
        if (!this.state.books) return
        return this.state.books.filter(book => book.title.includes(this.state.filterBy))
    }

    onSelectBook = (id) => {
        this.setState({selectedBook:this.state.books[this.findBookById(id)]})
    }

    findBookById(id) {
        return this.state.books.findIndex(book => book.id === id)
    }

    onUnSelectBook = () => {
        this.setState({selectedBook:null})
    }

    getBooks = () => {
        BookService.getAllBooks().then(books => this.loadBooks(books))
    }
    componentDidMount() {
        this.getBooks()
        BusService.on('searchUpdated',this.onSetFilter)
    }

    render() {
        
            {if (this.state.books) {
                return <div> {!this.state.selectedBook ? <section><div className="add-book-title">Add a book <BookAdd whenChange={this.getBooks} /></div>
                
                <BookList onSelectBook={this.onSelectBook} books={this.booksToShow()}  /></section>: <section><BookDetails book={this.state.selectedBook} onUnSelectBook={this.onUnSelectBook} />
                <Modal  >
                </Modal>
                </section>
            } </div>} else {
                return <div></div>
            }

        }}}
