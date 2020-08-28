export   function  getBookCurrency(bookPrice) {
    // var bookPrice = this.props.book.listPrice
    switch (bookPrice.currencyCode) {
        case 'EUR':
            return `${new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(bookPrice.amount)}`
        case 'ILS':
            return `${new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(bookPrice.amount)}`
        case 'USD':
            return `${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(bookPrice.amount)}`
}}