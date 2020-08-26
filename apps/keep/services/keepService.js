import { utils } from './utils.js';
export const keepService = {
    getNotes
  
  }


  

function getNotes() {
    return Promise.resolve(notes)
}
  


var notes = [
    {
        id: utils.makeId(),
        type: "text",
        isPinned: false,
        info: {
            txt: "Fullstack Me Baby!"
        }
    },
    {
        id: utils.makeId(),
        type: "text",
        isPinned: false,
        info: {
            txt: "lol!"
        }
    },
    {
        id: utils.makeId(),
        type: "img",
        isPinned: false,
        info: {
            url: "https://media.licdn.com/dms/image/C560BAQHMnA03XDdf3w/company-logo_200_200/0?e=2159024400&v=beta&t=C7KMOtnrJwGrMXmgIk2u1B8a7VRfgxMwXng9cdP9kZk",
            title: "Me playing Mi"
        }
    },
    {
        id: utils.makeId(),
        type: "video",
        isPinned: false,
        info: {
            url: "https://www.youtube.com/embed/tgbNymZ7vqY",
            title: "song"
        }
    },
    {
    id: utils.makeId(),
    type: "audio",
    isPinned: false,
    info: {
        url: "horse.mp3",
        title: "song"
    }
},
    {
        id: utils.makeId(),
        type: "todos",
        isPinned: false,
        info: {
            label: "How was it:",
            todos: [
                { txt: "Do that", doneAt: null },
                { txt: "Do this", doneAt: 187111111 }
            ]
        }
    }
];