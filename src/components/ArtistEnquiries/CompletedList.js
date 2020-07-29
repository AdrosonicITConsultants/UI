import React, { Component } from 'react'
import { memoryHistory, browserHistory } from "../../helpers/history";
import { Row, Col , Container, Button} from 'reactstrap';
import { connect } from "react-redux";
import NavbarComponent from "../navbar/navbar";
import logos from "../../assets";
import "./AllEnquiryList.css"
import TTCEapi from '../../services/API/TTCEapi';

export class CompletedList extends Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default CompletedList
