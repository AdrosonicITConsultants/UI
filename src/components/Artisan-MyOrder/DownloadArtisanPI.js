
import React, { Component } from 'react';
import logos from "../../assets";
import ReactToPrint from "react-to-print";

import { PreviewChangedPI } from './PreviewChangedPI';

export class DownloadArtisanPI extends Component {
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
            <PreviewChangedPI 
        enquiryId={this.props.enquiryCode}
        enquiryCode={this.props.enquiryCode}
        getOrderStatus={this.props.getOrderStatus}
        bp={this.props.bp}
        enquiryId={this.props.enquiryId}
        enquiryCode={this.props.enquiryCode}
        expectedDateOfDelivery={this.props.expectedDateOfDelivery}
        hsn={this.props.hsn}
        rpu={this.props.rpu}
        quantity={this.props.quantity}
        sgst={this.props.sgst}
        cgst={this.props.cgst}
        piSend={this.props.piSend}
        onlyView={this.props.onlyView}
        previewAndRaisePI={this.props.previewAndRaisePI}
            ref={el => (this.componentRef = el)}/>
        </React.Fragment>
        )
    }
}