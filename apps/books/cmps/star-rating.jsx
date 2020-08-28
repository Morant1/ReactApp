
export default function StarRating(props) {
  function getStar(isFilled,key) {
      if (isFilled === false) {
          return <img key={key} onClick={() => {props.setRatingFn(key+1)}} src="../apps/books/assets/img/star-hollow.svg" />
      } else {
          return <img key={key} onClick={() => {props.setRatingFn(key+1)}} src="../apps/books/assets/img/star-filled.svg" />
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
