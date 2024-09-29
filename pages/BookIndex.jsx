const { useEffect, useState } = React
const { Link } = ReactRouterDOM

import { showErrorMsg, showSuccessMsg, showUserMsg } from "../services/event-bus.service.js"
import { bookService } from "../services/book.service.js"
import { BookDetails } from "./BookDetails.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { AppLoader } from "../cmps/AppLoader.jsx"


export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [isEdit, setIsEdit] = useState(false)
    const [selectedBookId, setSelectedBookId] = useState('')

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(setBooks)
            .catch(err => {
                console.log('Problems getting books:', err)
            })
    }

    function handleFilterChange(filterBy) {
        setFilterBy({ ...filterBy })
    }

    function onSelectBook(bookId) {
        setSelectedBookId(bookId)
    }

    function onSaveBook(bookToSave) {
        bookService.save(bookToSave)
            .then(() => {
                setIsEdit(false)
                setSelectedBookId(null)
                loadBooks()
            })
            .catch(err => {
                console.log('Had issues with book save:', err)
            })
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(books => books.filter(book => book.id !== bookId))
                showSuccessMsg(`Book removed successfully!`)
            })
            .catch(err => {
                console.log('Problems removing book:', err)
                showErrorMsg(`Problems removing book (${bookId})`)

            })
    }

    function onSetFilterBy(filterBy) {
        console.log(filterBy)
        setFilterBy({ ...filterBy })
    }

    if (!books) return <AppLoader />
    return (
        <section className="book-index">

            <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <section>
                <Link to="/book/edit" >Add Book</Link>
            </section>
            <BookList
                books={books}
                onRemoveBook={onRemoveBook} />
        </section>
    )
}

