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
    markAsUnRead,
    removeMail,
    getMailsForDisplay,
    toggleChecked,
    bulkAction
}

var templateMails = [{
        "id": "aeio1",
        "subject": "WHERE ARE YOU",
        "isRead": true,
        "body": "I hope you're not talking about what we said we won't talk about",
        "sentAt": 1598465996748,
        "isStarred": false,
        "author": "Tyler Durden",
        "isArchived": false,
        "mailAddress": "tdurden@gmail.com",
        "isChecked": false,
        "bodyPlainText": "I hope you're not talking about what we said we won't talk about"
    },
    {
        "id": "JNaLg",
        "subject": "I'm knocking...",
        "isRead": true,
        "body": "",
        "sentAt": 1593465996448,
        "isStarred": false,
        "author": "Walter White",
        "isArchived": false,
        "mailAddress": "heisenberg@gmail.com",
        "isChecked": false
    },
    {
        "id": "8tlnD",
        "subject": "Noice",
        "isRead": false,
        "body": "Cool cool cool cool cool cool cool",
        "sentAt": 1598435995748,
        "isStarred": true,
        "author": "Jake Peralta",
        "isArchived": false,
        "mailAddress": "jakep@nypd.gov",
        "isChecked": false,
        "bodyPlainText": "Cool cool cool cool cool cool cool"
    },
    {
        "id": "SUSsc",
        "subject": "REVENGE!",
        "isRead": false,
        "body": "My name is Maximus Decimus Meridius, Commander of the Armies of the North, General of the Felix Legions, loyal servant to the true emperor, Marcus Aurelius. Father to a murdered son, husband to a murdered wife. And I will have my vengeance, in this life or the next.",
        "sentAt": 1,
        "isStarred": true,
        "author": "Maximus Decimus Meridius",
        "isArchived": false,
        "mailAddress": "mdm@yahoo.com",
        "isChecked": false,
        "bodyPlainText": "My name is Maximus Decimus Meridius, Commander of the Armies of the North, General of the Felix Legions, loyal servant to the true emperor, Marcus Aurelius. Father to a murdered son, husband to a murdered wife. And I will have my vengeance, in this life or the next."
    },
    {
        "id": "zkw8Z",
        "subject": "I am Jack's unwillingness to continue",
        "isRead": true,
        "body": "<div class=\"text-editor\" contenteditable=\"true\">Me? no. of course not...</div><div class=\"reply-value-container\"><div class=\"reply-header\" contenteditable=\"true\">Tyler Durden wrote on 8/26/2020:</div><div class=\"reply-value\" contenteditable=\"true\">I hope you're not talking about what we said we won't talk about</div></div>",
        "sentAt": 1598695749984,
        "isStarred": false,
        "author": "The Narrator",
        "isArchived": false,
        "mailAddress": "me@appsusmail.com",
        "isChecked": false,
        "bodyPlainText": "Me? no. of course not..."
    },
    {
        "id": "e2563",
        "subject": "Would you like to pop in for dinner?",
        "isRead": true,
        "body": "I\'m warming up the Chianti",
        "sentAt": 1598695709984,
        "isStarred": false,
        "author": "Hannibal Lecter",
        "isArchived": true,
        "mailAddress": "hannibal@lecter.co.uk",
        "isChecked": false,
        "bodyPlainText": "I\'m warming up the Chianti"
    },
    {
        "id": "3l33t",
        "subject": "Follow the white rabbit",
        "isRead": false,
        "body": "",
        "sentAt": 1598692749984,
        "isStarred": false,
        "author": "Trinity",
        "isArchived": false,
        "mailAddress": "hannibal@lecter.co.uk",
        "isChecked": false,
        "bodyPlainText": ""
    },
    {
        "id": "2001h",
        "subject": "What are you doing?",
        "isRead": false,
        "body": "<div class=\"text-editor\" contenteditable=\"true\">I can't let you do that...<div>Stop...</div><div>I'm afraid...</div></div><div class=\"reply-value-container\"><div class=\"reply-header\" contenteditable=\"true\">Walter White wrote on 6/30/2020:</div><div class=\"reply-value\" contenteditable=\"true\"></div></div>",
        "sentAt": 1598693749984,
        "isStarred": false,
        "author": "HAL 9000",
        "isArchived": false,
        "mailAddress": "hal9000@nasa.gov.us",
        "isChecked": false,
        "bodyPlainText": "I can't let you do that...\nStop...\nI'm afraid..."
    },
    {
        "id": "h0d0r",
        "subject": "Hodor?",
        "isRead": false,
        "body": "Hodor Hodor Hodor Hodor, Hodor Hodor Hodor Hodor Hodor? Hodor Hodor...  ",
        "sentAt": 1598691249984,
        "isStarred": false,
        "author": "Hodor",
        "isArchived": false,
        "mailAddress": "hodor@hodor.hodor",
        "isChecked": false,
        "bodyPlainText": "Hodor Hodor Hodor Hodor, Hodor Hodor Hodor Hodor Hodor? Hodor Hodor..."
    }, {
        "id": "u0JvF",
        "subject": "You ever read the Bible?",
        "isRead": false,
        "body": "<div class=\"text-editor\" contenteditable=\"true\">There's a passage that I got memorized, seems appropiate for this situation: Ezekiel 25,17. \"The path of the righteous man is beset of all sides by the iniquities of the selfish and the tyranny of evil me. Blessed is he who, in the name of the charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who attempt to poison and destroy my brothers. And you will know my name is the Lord when I lay my vengeance upon thee.</div>",
        "sentAt": 1598715123989,
        "isStarred": false,
        "author": "Jules Winnfield",
        "isArchived": false,
        "mailAddress": "jules397@gmail.com",
        "isChecked": false,
        "bodyPlainText": "There's a passage that I got memorized, seems appropiate for this situation: Ezekiel 25,17. \"The path of the righteous man is beset of all sides by the iniquities of the selfish and the tyranny of evil me. Blessed is he who, in the name of the charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who attempt to poison and destroy my brothers. And you will know my name is the Lord when I lay my vengeance upon thee."
    }
]


function bulkAction(action) {
    return new Promise(resolve => {

        var fn;
        switch (action) {
            case 'archive':
                fn = toggleArchived
                break;
            case 'star':
                fn = toggleStar
                break;
            case 'remove':
                fn = removeMail
                break;
            case 'read':
                fn = markAsRead
                break;
            case 'unread':
                fn = markAsUnRead
                break;
        }
        // console.log(action)
        getAllMails().then(allMails => {
            var checkedMails = allMails.filter(mail => mail.isChecked)
            recursiveChangeStatus(checkedMails, fn).then(setTimeout(() => { resolve('done') }, 100))

        })
    })

}

function recursiveChangeStatus(mails, fn, i = 0) {
    return new Promise((resolve, reject) => {
        if (i >= mails.length) return resolve('done')
        fn(mails[i].id).then(res => recursiveChangeStatus(mails, fn, i + 1))
    })

}

function addMail(subject, body, bodyPlainText, author = 'Keyser Söze', mailAddress = 'me@appsusmail.com') {
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
                mailAddress,
                isChecked: false,
                bodyPlainText
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

function toggleChecked(id) {
    return new Promise(resolve => {
        toggleStatus('isChecked', id).then(res => resolve())
    })
}

function toggleStar(id) {
    return new Promise(resolve => {
        toggleStatus('isStarred', id).then(res => resolve())
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


function markAsUnRead(id) {
    return new Promise(resolve => {
        getAllMails()
            .then(mails => {
                var currMail = mails.find(mail => mail.id === id)
                currMail.isRead = false
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