import { Home } from './pages/Home.jsx'
import { Msg } from './cmps/Msg.jsx'
import { KeepApp } from './apps/keep/KeepApp.jsx'
import  MailApp from './pages/Mail.jsx'
import  {About} from './pages/About.jsx'
import { BookApp } from './pages/BookApp.jsx'
const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
import {NavBar} from './global-cmps/navbar.jsx'
import {GlobalSearch} from './global-cmps/global-search.jsx'

export class App extends React.Component {

    render() {
        return (
            <Router>
                <header>
                    <div className="logo"></div>
                    <GlobalSearch />
                    <NavBar />
                </header>
                <main>
                    <Switch>
                        <Route component={ KeepApp } path="/keep/" />
                        <Route path="/book/" component={ BookApp } />
                            {/* <BookApp /> */}
                            {/* </Route> */}
                        <Route component={ MailApp } path="/mail/" />
                        
                        <Route component={ About } path="/about" />
                        <Route component={ Home } path="/" />
                    </Switch>
                </main>
                <Msg />
            </Router>
        )
    }
}

