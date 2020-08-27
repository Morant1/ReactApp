const { Link } = ReactRouterDOM;

export class Home extends React.Component {

    render() {
        return (
            <section className="home-container">
                <div className="position-img">
                <div className="home-title">Welcome to AppSuS</div>
                <div className="imgs">
                    <Link to="/books"><img  className="img-home"src="assets\img\book.jpg"/></Link>
                    <Link to="/mail/inbox"><img className="img-home" src="assets\img\gmail.png"/></Link>
                    <Link to="/keep"><img className="img-home" src="assets\img\keep.jpg"/></Link>
                    </div>
                    </div>
                    <img className="main-img-container" src="assets\img\background.jpg"/>
            </section>
        )
    }
}