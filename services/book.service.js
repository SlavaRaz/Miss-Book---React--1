import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
var gFilterBy = { txt: '', minSpeed: 0 }
_createBooks()

export const bookservice = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getNextBookId,
    getFilterBy,
    setFilterBy
}

function query() {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (gFilterBy.txt) {
                const regex = new RegExp(gFilterBy.txt, 'i')
                books = books.filter(book => regex.test(book.title))
            }
            if (gFilterBy.minPrice) {
                books = books.filter(book => book.maxPrice >= gFilterBy.minPrice)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
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

function getFilterBy() {
    return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
    if (filterBy.title !== undefined) gFilterBy.title = filterBy.title
    if (filterBy.minPrice !== undefined) gFilterBy.minPrice = filterBy.minPrice
    return gFilterBy
}

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
        books = []
        books.push(_createBook('Book Title 1', { amount: 50, currencyCode: 'USD', isOnSale: false }))
        books.push(_createBook('Book Title 2', { amount: 120, currencyCode: 'USD', isOnSale: true }))
        books.push(_createBook('Book Title 3', { amount: 100, currencyCode: 'USD', isOnSale: false }))
        utilService.saveToStorage(BOOK_KEY, books);
    }
}

function _createBook(title, listPrice = { amount: 250, currencyCode: 'USD', isOnSale: false }) {
    const book = getEmptyBook(title, listPrice)
    book.id = utilService.makeId()
    return book
}