var mails = [
    { id: makeId(), subject: 'WHERE ARE YOU', isRead: false, body: 'I hope you\'re not talking about what we said we won\'t talk about', sentAt: Date.now(), isStarred: false, author: 'Tyler Durden' },
    { id: makeId(), subject: 'I\'m knocking...', isRead: false, body: '', sentAt: Date.now(), isStarred: false, author: 'Walter White' },
    { id: makeId(), subject: 'Noice', isRead: false, body: 'Cool cool cool cool cool cool cool', sentAt: Date.now(), isStarred: false, author: 'Jake Peralta' },
]


function addMail(subject, body, author = 'me@appsusmail.com') {
    const newMail = {
        id: makeId(),
        subject,
        isRead: false,
        body,
        sentAt: Date.now(),
        isStarred: false,
        author
    }
    mails.push(newMail)
}




function makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}