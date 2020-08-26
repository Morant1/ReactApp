import { StorageService } from '../../../services/storage-services.js'
import { utils } from '../../../services/utils.js'


export const MailService = {
    addMail,
    getAllMails,
    getMailDetails,
    getIdxById,
    toggleStar,
    toggleArchived,
    markAsRead
}


var templateMails = [
    { id: utils.makeId(), subject: 'WHERE ARE YOU', isRead: false, body: 'I hope you\'re not talking about what we said we won\'t talk about', sentAt: Date.now(), isStarred: false, author: 'Tyler Durden', isArchived: false },
    { id: utils.makeId(), subject: 'I\'m knocking...', isRead: true, body: '', sentAt: Date.now(), isStarred: false, author: 'Walter White', isArchived: false },
    { id: utils.makeId(), subject: 'Noice', isRead: false, body: 'Cool cool cool cool cool cool cool', sentAt: Date.now(), isStarred: true, author: 'Jake Peralta', isArchived: false },
]


function addMail(subject, body, author = 'me@appsusmail.com') {
    getAllMails().then(
        mails => {
            const newMail = {
                id: utils.makeId(),
                subject,
                isRead: false,
                body,
                sentAt: Date.now(),
                isStarred: false,
                author,
                isArchived: false
            }
            mails.push(newMail)
            StorageService.saveToStorage('mailsList', mails)
            return Promise.resolve(mails)
        }
    )
}

function toggleStar(id) {
    console.log(id)
    return new Promise(resolve => {
        toggleStatus('isStarred', id)
        resolve()
    })
}

function toggleArchived(id) {
    return new Promise(resolve => {
        toggleStatus('isArchived', id)
        resolve()
    })
}

function markAsRead(id) {
    return new Promise(resolve => {
        getAllMails()
            .then(mails => {
                var currMail = mails.find(mail => mail.id === id)
                currMail.isRead = true
                StorageService.saveToStorage('mailsList', mails)
                return resolve()
            })
    })
}


function toggleStatus(status, id) {
    return new Promise(resolve => {
        getAllMails()
            .then(mails => {
                var currMail = mails.find(mail => mail.id === id)
                if (currMail[status]) {
                    currMail[status] = false
                } else {
                    currMail[status] = true
                }
                StorageService.saveToStorage('mailsList', mails)
                return resolve()
            })
    })
}

function getAllMails() {
    var mails = StorageService.loadFromStorage('mailsList')
    if (!mails) {
        StorageService.saveToStorage('mailsList', templateMails)
        mails = templateMails
    }
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