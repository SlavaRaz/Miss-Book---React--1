
export function BookPreview({ book }) {

    const { title, pageCount, listPrice } = book

    function getReadingLevel() {
        if (pageCount > 500) return 'Serious Reading'
        if (pageCount > 200) return 'Descent Reading'
        if (pageCount < 100) return 'Light Reading'
        return ''
    }

    function getPriceClass() {
        if (listPrice.amount > 150) return "red-price"
        if (listPrice.amount < 20) return "green-price"
        return 'default-price'
    }

    return (
        <article className="book-preview">
            <h2>Title: {title}</h2>
            <h4>Price: {book.listPrice.amount}</h4>
            <p>Pages: {pageCount}</p>
            <p>{getReadingLevel()}</p>
            <p className={getPriceClass()}>Price: ${listPrice.amount}</p>
            <img src={`../assets/img/3.jpg`} alt="book-image" />
        </article>
    )
}