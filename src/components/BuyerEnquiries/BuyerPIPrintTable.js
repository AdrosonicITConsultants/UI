import React, { Component } from 'react';
import logos from "../../assets";
import ReactToPrint from "react-to-print";
import { BuyerPreviewInvoice } from './BuyerPreviewInvoice';

export class BuyerPIPrintTable extends Component {
    render() {
        return(
        <React.Fragment>
            <ReactToPrint 
                trigger = {() => 
                <p className=" belowprevtext" style={{float:"right"}}>
                    <img src={logos.downloadpdficon} className="InvImg" /> 
                    Download this invoice in pdf
                </p>
                }
                content = {() => this.componentRef}
            />
            <BuyerPreviewInvoice  enquiryCode={this.props.enquiryCode} 
            enquiryId={this.props.enquiryId} ref={el => (this.componentRef = el)}/>
        </React.Fragment>
        )
    }
}