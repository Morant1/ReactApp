import { utils } from './utils.js';
import { storageService } from '../../../services/storage-services.js'
const key = "Notes";

export const keepService = {
    getNotes,
    addNote,
    removeList

}
let gNotes;


// function _getById(listId) {
//     const list = notes.find(list => list.id === listId)
//     return list;
//   }


function removeList(listId) {
    gNotes = gNotes.filter(list => list.id !== listId)
    if (!gNotes.length) {
        gNotes = _createNotes();

    }
    storageService.saveToStorage(key, gNotes);

}

function addNote(type, text) {
    var newNote = _createNote(type, text);
    gNotes.push(newNote);
    storageService.saveToStorage(key, gNotes)

}

function _createNote(type, detail) {

    let list = {
        id: utils.makeId(),
        type,
        isPinned: false,
        info: {},
        style : {
            bgc: 'white',
            color: 'white'
        }
    }

    if (type === 'text') list.info.txt = detail;
    if (type === 'img') {
        list.info.url = detail;
        list.info.title = '';
    }
    if (type === 'video') {
        const videoIDIdx = detail.indexOf('=');
        let videoID = detail.slice(videoIDIdx + 1);
        list.info.url = videoID;
        list.info.title = '';
    }

    if (type === 'todo') {
        list.info.todos = detail.split(",").map((item) => {
            return { txt: item }
        })
        list.info.label = 'add Label'
    }

    return list;
}


function getNotes() {
    gNotes = storageService.loadFromStorage(key);
    if (!gNotes|| !gNotes.length) {
        gNotes = _createNotes()
        storageService.saveToStorage(key, gNotes);
    }
    return Promise.resolve(gNotes)
}



function _createNotes() {

    return [
        {
            id: utils.makeId(),
            type: "text",
            isPinned: false,
            info: {
                txt: "Fullstack Me Baby!"
            },
            style : {
                bgc: 'white',
                color: 'white'
            }
        },
        {
            id: utils.makeId(),
            type: "text",
            isPinned: false,
            info: {
                txt: "lol!"
            },
            style : {
                bgc: 'white',
                color: 'white'
            }
        },
        {
            id: utils.makeId(),
            type: "img",
            isPinned: false,
            info: {
                url: "https://media.licdn.com/dms/image/C560BAQHMnA03XDdf3w/company-logo_200_200/0?e=2159024400&v=beta&t=C7KMOtnrJwGrMXmgIk2u1B8a7VRfgxMwXng9cdP9kZk",
                title: "Me playing Mi"
            },
            style : {
                bgc: 'white',
                color: 'white'
            }
        },
        {
            id: utils.makeId(),
            type: "video",
            isPinned: false,
            info: {
                url: "tgbNymZ7vqY",
                title: "song"
            },
            style : {
                bgc: 'white',
                color: 'white'
            }
        },
        {
            id: utils.makeId(),
            type: "todo",
            isPinned: false,
            info: {
                label: "How was it:",
                todos: [
                    { txt: "Do that", doneAt: null },
                    { txt: "Do this", doneAt: 187111111 }
                ]},
                style : {
                    bgc: 'white',
                    color: 'white'
                }
            
        }
    ]
}
