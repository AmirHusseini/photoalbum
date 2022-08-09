import React, { Component } from 'react'
import '../style/Style.css';
export default class FooterComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div>
                <footer className="footer">
                    <span className="text-muted">All Rights Reserved 2022 @Amir</span>
                </footer>
            </div>
        )
    }
}