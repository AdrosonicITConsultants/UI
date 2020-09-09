import React, { Component } from 'react';
import logos from "../../assets";
import ReactToPrint from "react-to-print";

import { BuyerPreviewNewPI } from './BuyerPreviewNewPI';

export class DownloadBuyerPreviewPI extends Component {
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
            <br/>
            <BuyerPreviewNewPI 
         enquiryId={this.props.enquiryId}
         enquiryCode={this.props.enquiryCode}
            
            ref={el => (this.componentRef = el)}/>
        </React.Fragment>
        )
    }
}