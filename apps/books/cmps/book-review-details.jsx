import StarRating from './star-rating.jsx'

export function BookReviewDetails(props) {
    
    
        return (
            <div className="book-reviews-container">
                {props.bookReviews.map((review,idx) => {
                    return <div className="review-container"  key={idx}>
                    <div ><p>{review.fullReview}</p></div>
                    
                    <StarRating setRatingFn={() => {}} value={review.rating} />
                    <div>Read on {review.date}</div>
                    <div>{review.username}</div>
                    </div>
                })}
            </div>
        )
    }

