export function formatDate(time) {
    var date = new Date(time)
    var today = new Date(Date.now())
    // if the e-mail is from today - return the time it was sent
    if (date.toLocaleDateString() === today.toLocaleDateString()) return date.toLocaleTimeString()
    // else - return the date it was sent on
    return date.toLocaleDateString()
}