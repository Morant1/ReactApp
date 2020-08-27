import { storageService } from '../../../services/storage-services.js'
import { utils } from '../../../services/utils.js'


export const MailService = {
    addMail,
    getAllMails,
    getMailDetails,
    getIdxById,
    toggleStar,
    toggleArchived,
    markAsRead,
    removeMail,
    getMailsForDisplay
}

var templateMails = [
    { id: 'aeio1', subject: 'WHERE ARE YOU', isRead: false, body: 'I hope you\'re not talking about what we said we won\'t talk about', sentAt: 1598465996748, isStarred: false, author: 'Tyler Durden', isArchived: false, mailAddress: 'tdurden@gmail.com' },
    { id: utils.makeId(), subject: 'I\'m knocking...', isRead: true, body: '', sentAt: 1593465996448, isStarred: false, author: 'Walter White', isArchived: false, mailAddress: 'heisenberg@gmail.com' },
    { id: utils.makeId(), subject: 'Noice', isRead: false, body: 'Cool cool cool cool cool cool cool', sentAt: 1598435995748, isStarred: true, author: 'Jake Peralta', isArchived: false, mailAddress: 'jakep@nypd.gov' },
    { id: utils.makeId(), subject: 'REVENGE!', isRead: false, body: 'My name is Maximus Decimus Meridius, Commander of the Armies of the North, General of the Felix Legions, loyal servant to the true emperor, Marcus Aurelius. Father to a murdered son, husband to a murdered wife. And I will have my vengeance, in this life or the next.', sentAt: 1598465596718, isStarred: true, author: 'Maximus Decimus Meridius', isArchived: false, mailAddress: 'mdm@yahoo.com' }
]


function addMail(subject, body, author = 'Keyser Söze', mailAddress = 'me@appsusmail.com') {
    return getAllMails().then(
        mails => {
            const newMail = {
                id: utils.makeId(),
                subject,
                isRead: false,
                body,
                sentAt: Date.now(),
                isStarred: false,
                author,
                isArchived: false,
                mailAddress
            }
            mails.push(newMail)
            storageService.saveToStorage('mailsList', mails)
            return Promise.resolve(mails)
        }
    )
}

function searchMails(searchQuery) {
    var searchQuery = searchQuery.toLowerCase()
    return templateMails.filter(mail => mail.subject.toLowerCase().includes(searchQuery) || mail.author.toLowerCase().includes(searchQuery) || mail.body.toLowerCase().includes(searchQuery))
}

function getMailsForDisplay(filters) {
    return new Promise(resolve => {
        getAllMails()
            .then(allMails => {
                if (filters.searchQuery) {
                    return resolve(searchMails(filters.searchQuery))
                }
                var mails = filterStarredAndArchived(allMails, filters.filterBy)
                mails = sortMails(mails, filters.sortBy)
                if (filters.filterReadAndUnread) {
                    mails = filterReadAndUnread(mails, filters.filterReadAndUnread)
                }
                return resolve(mails)
            })
    })
}

function sortMails(mails, sortBy = "date") {
    if (sortBy === 'date') {
        return mails.sort((a, b) => b.sentAt - a.sentAt)
    } else {
        return mails.sort((a, b) => {
            if (a.author < b.author) {
                return -1;
            }
            if (a.author > b.author) {
                return 1;
            }
            return 0;
        })
    }
}

function filterStarredAndArchived(mails, filterBy) {
    switch (filterBy) {
        case 'starred':
            return mails.filter(mail => mail.isStarred === true)

        case 'archived':
            return mails.filter(mail => mail.isArchived === true)

        default: //also acts as inbox
            return mails.filter(mail => mail.isArchived === false)

    }
}

function filterReadAndUnread(mails, filter) {
    switch (filter) {

        case 'onlyread':
            return mails.filter(mail => mail.isRead === true)

        case 'onlyunread':
            return mails.filter(mail => mail.isRead === false)

        default: //also acts as inbox
            return mails

    }
}



function toggleStar(id) {
    return new Promise(resolve => {
        toggleStatus('isStarred', id)
        resolve()
    })
}

function toggleArchived(id) {
    return new Promise(resolve => {
        toggleStatus('isArchived', id).then(res => {
            resolve()
        })
    })
}

function markAsRead(id) {
    return new Promise(resolve => {
        getAllMails()
            .then(mails => {
                var currMail = mails.find(mail => mail.id === id)
                currMail.isRead = true
                storageService.saveToStorage('mailsList', mails)
                return resolve()
            })
    })
}

function removeMail(id) {
    return new Promise(resolve => {
        getAllMails()
            .then(mails => {
                var currMailIdx = mails.findIndex(mail => mail.id === id)
                mails.splice(currMailIdx, 1)
                storageService.saveToStorage('mailsList', mails)
                resolve()
            })
    })
}

function toggleStatus(status, id) {
    return new Promise(resolve => {
        getAllMails()
            .then(mails => {
                var currMailIdx = mails.findIndex(mail => mail.id === id)
                var currMail = mails[currMailIdx]
                if (currMail[status]) {
                    currMail[status] = false
                } else {
                    currMail[status] = true
                }
                storageService.saveToStorage('mailsList', mails)
                resolve()
            })
    })
}

function getAllMails() {
    var mails = storageService.loadFromStorage('mailsList')
    if (!mails) {
        storageService.saveToStorage('mailsList', templateMails)
        mails = templateMails
    }
    // console.log('getting mails', mails)
    return Promise.resolve(mails)
}

function getMailDetails(id) {
    return new Promise(resolve => {
        getAllMails().then(mails => {
            resolve(mails.find(mail => mail.id === id))
        })
    })
}

function getIdxById(id) {
    return new Promise(resolve => {
        getAllMails().then(mails => {
            resolve(mails.findIndex(mail => mail.id === id))
        })
    })
}