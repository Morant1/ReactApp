

export function BookReviewDetails(props) {
    console.log(props)
    
        return (
            <div className="book-reviews-container">
                {props.bookReviews.map((review,idx) => {
                    return <div className="review-container"  key={idx}>
                    <div ><p>{review.fullReview}</p></div>
                    <div>{review.rating}</div>
                    <div>Read on {review.date}</div>
                    <div>{review.username}</div>
                    </div>
                })}
            </div>
        )
    }

