import { AddReview } from "../cmps/AddReview.jsx"
import { LongTxt } from "../cmps/LongTxt.jsx"

import { bookService } from "../services/book.service.js"
import { showSuccessMsg } from "../services/event-bus.service.js"


const { useEffect, useState } = React
const { useParams, Link } = ReactRouterDOM

export function BookDetails() {
    const [book, setBook] = useState(null)
    const params = useParams()

    useEffect(() => {
        loadBook()
    }, [params.bookId])

    function loadBook() {
        bookService.get(params.bookId)
            .then(setBook)
            .catch(err => {
                console.log('Problem getting book:', err)
            })
    }

    function onRemoveReview(reviewId) {
        bookService.removeReview(book.id, reviewId)
            .then(() => {
                setBook(prevBook => ({
                    ...prevBook, reviews: prevBook.reviews.filter(review => review.id !== reviewId)
                }))
                showSuccessMsg('Review removed')
            })
            .catch(err => {
                console.log('Error:', err)
                showErrorMsg('Cannot remove review')
            })
    }

    function onSaveBook(bookToSave) {
        bookService.save(bookToSave)
            .then(() => {
                showSuccessMsg('Book saved successfully')
                loadBook()
            })
            .catch(err => {
                console.log('Error:', err)
                showErrorMsg('Cannot save book')
            })
    }

    function getPageCount() {
        let pageCount = book.pageCount
        if (pageCount > 500) pageCount += ' - Long reading'
        else if (pageCount > 200) pageCount += ' - Decent reading'
        else if (pageCount < 100) pageCount += ' - Light reading'
        return pageCount
    }

    function getPublishDate() {
        const currYear = new Date().getFullYear()
        let publishedYear = book.publishedDate
        let diff = currYear - publishedYear

        if (diff > 10) publishedYear += '- Vintage'
        else if (diff < 1) publishedYear += '-New'
        return publishedYear
    }

    function getPriceClass() {
        if (book.listPrice.amount > 150) return 'red'
        else if (book.listPrice.amount < 20) return 'green'
        return ''
    }

    if (!book) return 'Loading...'

    const {
        title,
        subtitle,
        thumbnail,
        authors,
        description,
        language,
        categories,
        listPrice
    } = book

    return (
        <section className="book-details">

            <section>
                <div className='book-title'>Book Title: {title}</div>
                <div className='book-subtitle'>Book subtitle: {subtitle}</div>
                <div className="book-thumbnail-container">
                    <img src={thumbnail} />
                </div>
            </section>

            <section>
                <div className='book-more-info'>
                    <div className='book-authors'>Authors: <span>{authors.join(',')}</span></div>
                    <div className='book-language'>Language: <span>{language}</span></div>
                    <div className='book-published'>Published: <span>{getPublishDate()}</span></div>
                    <div className='book-pages'>Pages: <span>{getPageCount()}</span></div>
                    <div className='book-categories'>Categories: <span>{categories.join(', ')}</span></div>
                    <span className={"book-price " + getPriceClass()}>Book Price: {listPrice.amount} {listPrice.currencyCode}</span>
                    {listPrice.isOnSale && <div className="book-on-sale">On-sale!</div>}
                </div>
            </section>

            <section>
                <div className="description-container">
                    <span className='book-description'>Description: </span>
                    <LongTxt txt={description} />
                </div>
            </section>

            <button><Link to={`/book/edit/${book.id}`}>Edit</Link></button>
            <button><Link to="/book">Back</Link></button>

            <section>
                <button><Link to={`/book/${book.prevBookId}`}>← Previous Book</Link></button>
                <button><Link to={`/book/${book.nextBookId}`}>Next Book →</Link></button>
            </section>

            <section className='reviews'>
                <AddReview onSaveBook={onSaveBook} />

                {book.reviews && book.reviews.length > 0 && (
                    <ul className="review-list">
                        {book.reviews.map(review => (
                            <li key={review.id}>
                                <h4>{review.fullname}</h4>
                                <div>{'⭐'.repeat(+review.rating)}</div>
                                <p>Read at: {review.readAt}</p>
                                <button onClick={() => onRemoveReview(review.id)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                )}

            </section>
        </section>
    )
}


