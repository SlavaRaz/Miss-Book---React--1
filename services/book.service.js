import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { getDemoBooks } from './book-data.js'

const BOOK_KEY = 'bookDB'

// var gFilterBy = {

//     title: '',
//     listPrice: {
//         amount: null,
//         currencyCode: 'USD',
//         isOnSale: false
//     }
// }
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getNextBookId,
    getDefaultFilter,
    addReview,
    // setFilterBy
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            books = _getFilteredBooks(books, filterBy)
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function addReview(bookId, review) {
    return storageService.get(BOOK_KEY, bookId)
        .then(book => {
            if (!book.reviews) book.reviews = []
            book.reviews.push(review)
            return storageService.put(BOOK_KEY, book)
        })
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title = '', listPrice = { amount: 0, currencyCode: 'USD', isOnSale: false }) {
    return { id: '', title, listPrice }
}

function getDefaultFilter() {
    return {
        title: '',
        maxPrice: 0
    }
}

function _getFilteredBooks(books, filterBy) {
    if (filterBy.title) {
        const regExp = new RegExp(filterBy.title, 'i')
        books = books.filter(book => regExp.test(book.title))
    }
    if (filterBy.maxPrice) {
        books = books.filter(book => book.listPrice.amount <= filterBy.maxPrice)
    }
    if (filterBy.minPrice) {
        books = books.filter(book => book.listPrice.amount >= filterBy.minPrice)
    }
    if (filterBy.category) {
        books = books.filter(book => book.categories.includes(filterBy.category))
    }
    if (filterBy.isOnSale) {
        books = books.filter(book => book.listPrice.isOnSale)
    }

    return books
}

// function getFilterBy() {
//     return { ...gFilterBy }
// }

// function setFilterBy(filterBy = {}) {
//     if (filterBy.title !== undefined) gFilterBy.title = filterBy.title
//     if (filterBy.listPrice.amount !== undefined) gFilterBy.listPrice.amount = filterBy.listPrice.amount
//     return gFilterBy
// }

function getNextBookId(bookId) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            let nextBookIdx = books.findIndex(book => book.id === bookId) + 1
            if (nextBookIdx === books.length) nextBookIdx = 0
            return books[nextBookIdx].id
        })
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = getDemoBooks()
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

// function _createBook(title, listPrice = { amount: 250, currencyCode: 'USD', isOnSale: false }) {
//     const book = getEmptyBook(title, listPrice)
//     book.id = utilService.makeId()
//     return book
// }