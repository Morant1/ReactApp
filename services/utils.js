export const utils = {
    makeId,
    makeHtmlStringNotEditable,
    relativeLink
}

function makeHtmlStringNotEditable(string) {
    // this will take an html string and remove the "content-editable"
    return string.split('contenteditable="true"').join('')

}

function relativeLink(path) {
    return `${window.location.origin}${window.location.pathname}${path}`
}

function makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}