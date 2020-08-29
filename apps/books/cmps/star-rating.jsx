
export default function StarRating(props) {
  function getStar(isFilled,key) {
      if (isFilled === false) {
          return <div key={key} onClick={() => {props.setRatingFn(key+1)}} className="review-star-hollow"></div>
      } else {
          return <div key={key} onClick={() => {props.setRatingFn(key+1)}} className="review-star-full"></div>
      }
  }

  
  function getStars(amount) {
    console.log(amount)
    if (!amount) amount = 0
    const hollowedStarsAmount = 5 - amount
    var imgStarsArray = []
    for (var i = 0; i< amount ; i++) {
        imgStarsArray.push(getStar(true,i))
    }
    for (var i=0; i<hollowedStarsAmount; i++) {
        imgStarsArray.push(getStar(false,i+amount))
    }
    return imgStarsArray
  }

  console.log('star value',props.value)
  return (
        <div className="review-stars">{getStars(props.value)}</div>
  );
}
