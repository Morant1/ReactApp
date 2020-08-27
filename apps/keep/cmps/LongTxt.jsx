
export class LongTxt extends React.Component {

    longTxt = () => {
        let txt;
        if (this.props.txt.length > 15) {
            txt = this.props.txt.slice(0,17) + '...';
        } else {txt = this.props.txt}

        return txt
    }

    render() {
        const txt = this.longTxt();
        return (
            <React.Fragment>
                {txt}
            </React.Fragment>
        )
    }
}

