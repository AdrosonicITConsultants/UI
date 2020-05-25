import React, { Component } from 'react';
import { Row, Col, Container } from 'reactstrap';
import "./buyerRegister.css"
// import Buyerlogin from "../../buyer/buyeruser";
import Buyreg1 from "./buyreg1";
import Buyreg2 from "./buyreg2";
import Buyreg3 from "./buyreg3";
import Buyreg4 from "./buyreg4";
import Buyreg5 from "./buyreg5";
import Buyreg6 from "./buyreg6";



export default class buyerRegister extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userpage: 5
        };
        this.handler = this.handler.bind(this);

    }

    renderSection(num) {
        switch (num) {
            case 0:
                return <Buyreg1 handler={this.handler} />;
                break;
            case 1:
                return <Buyreg2 handler={this.handler} />;
                break;
            case 2:
                return <Buyreg3 handler={this.handler} />;
                break;
            case 3:
                return <Buyreg4 handler={this.handler} />;
                break;
            case 4:
                return <Buyreg5 handler={this.handler} />;
                break;
            case 5:
                return <Buyreg6 handler={this.handler} />;
                break;
            default:
                break;
        }
    }

    handler(num) {
        this.setState({ userpage: num }, () => {
            console.log(this.state.userpage);
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="registerimg">
                    <Container>
                        <Row noGutters={true} className="mt-5">

                            {this.renderSection(this.state.userpage)}

                        </Row>
                        
                    </Container>
                </div>
            </React.Fragment>
        )
    }
}
