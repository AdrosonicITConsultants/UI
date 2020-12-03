import React, { Component } from 'react';
import logos from "../../assets";
import ReactToPrint from "react-to-print";
import { PreviewTaxInvoice } from './PreviewTaxInvoice';

export class PrintTaxInvoice extends Component {
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
            <PreviewTaxInvoice 
            bp={this.bp}
            enquiryId ={this.props.enquiryId}
            enquiryCode={this.props.enquiryCode}
            quantity={this.props.quantity}
            rpu={this.props.rpu}
            pta={this.props.pta}
            apr={this.props.apr}
            deliverycharge={this.props.deliverycharge}
            sgst={this.props.sgst}
            cgst={this.props.cgst}
            finalamt={this.props.finalamt}
            amttobepaid={this.props.amttobepaid}
            invoiceId={this.props.invoiceId}
            percentage={this.props.percentage}
            selectedFile={this.props.selectedFile}
            selectedFileName={this.props.selectedFileName}
            taxInvoiceGenerated={this.props.taxInvoiceGenerated}
            CR={this.props.CR}
            ref={el => (this.componentRef = el)}/>
        </React.Fragment>
        )
    }
}