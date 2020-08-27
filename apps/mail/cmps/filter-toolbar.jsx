// import React, { Component } from 'react'

export class FilterToolbar extends React.Component {
    
    state = {
        onlyread: 'all',
        sortby: 'date'
    }

    navigate() {
        var url = window.location.href;
        var path = url.substring(0, url.indexOf("?"));
        if (!path) path = window.location.href;
        var newPath = `${path}?onlyread=${this.state.onlyread}&sortby=${this.state.sortby}`
        window.location.replace(newPath)
    }

    onFilter = (ev) => {
        const value = ev.target.value
        const key = ev.target.name
        this.setState({[key]:value},this.navigate)
    }

    render() {
        return (
            <div className="filter-toolbar">
                <div className="filter-read-unread-container">
                    <select name="onlyread" id="read-unread" onChange={this.onFilter}>
                        <option value="all">All</option>
                        <option value="onlyread">Only read e-mails</option>
                        <option value="onlyunread">Only unread e-mails</option>
                    </select>
                    <select name="sortby" id="sortby" onChange={this.onFilter}>
                        <option value="">Sort By</option>
                        <option value="date">date</option>
                        <option value="name">name</option>
                        
                    </select>
                </div>
            </div>
        )
    }
}
