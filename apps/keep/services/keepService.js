import { utils } from '../../../services/utils.js';
import { storageService } from '../../../services/storage-services.js'
const key = "Notes";

export const keepService = {
    getNotes,
    addNote,
    removeList,
    changeBgc,
    editNote,
    setPinned

}
let gNotes;

function setPinned(id,pinned) {
    const noteIdx = _getIdxById(id);
    gNotes[noteIdx].isPinned = pinned;
    storageService.saveToStorage(key, gNotes);
}

function editNote(type,detail,id) {
    const noteIdx = _getIdxById(id);
    if (type === "text") gNotes[noteIdx].info.txt = detail;
    if (type === "img" || type === "video" )gNotes[noteIdx].info.url = detail;
    if (type === 'todo') {
        gNotes[noteIdx].info.todos = detail.split(",").map((item) => {
            return { txt: item }
        })
    }
    storageService.saveToStorage(key, gNotes);
    
}

function _getIdxById(noteId) {
    const currNote = gNotes.findIndex(note => note.id === noteId)
    return currNote;
  }

function changeBgc(color,id) {
    const noteIdx = _getIdxById(id);

    gNotes[noteIdx].style.bgc = color;
    storageService.saveToStorage(key, gNotes);
    
}

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
      
    }
    if (type === 'video') {
        const videoIDIdx = detail.indexOf('=');
        let videoID = detail.slice(videoIDIdx + 1);
        list.info.url = videoID;
        
     
    }

    if (type === 'todo') {
        list.info.todos = detail.split(",").map((item) => {
            return { txt: item }
        })
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
                todos: [
                    { txt: "Do that" },
                    { txt: "Do this" }
                ]},
                style : {
                    bgc: 'white',
                    color: 'white'
                }
            
        }
    ]
}
