import React, { Component } from 'react'
import { memoryHistory, browserHistory } from "../../helpers/history";
import { Row, Col , Container, Button} from 'reactstrap';
import { connect } from "react-redux";
import NavbarComponent from "../navbar/navbar";
import logos from "../../assets";
import "./Artisianmyorder.css";
import queryString from 'query-string';
import TTCEapi from '../../services/API/TTCEapi';
import customToast from "../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Moment from 'react-moment';
import Footer from "../footer/footer";
import { PreviewChangedPI } from './PreviewChangedPI';
import { PreviewOldchanges } from './PreviewOldchanges';

export class PIchange extends Component {
    constructor() {
        super();
        this.backPI = this.backPI.bind(this);
        this.oldbackPI = this.oldbackPI.bind(this);
         this.viewOldPI = this.viewOldPI.bind(this);
         this.handleChange = this.handleChange.bind(this);
        this.handlePiEdit= this.handlePiEdit.bind(this);
        this.state = {
            
            showValidationPi:false,
            isPidetail:true,
            getPi:[],
            getCurrencySigns:[],
            previewPI:[],
            getOldPIData:[],
            dataload : false,
            ImageUrl:TTCEapi.ImageUrl+'Product/',
            cgst:0,
            sgst:0,
            hsn:0,
            quantity:0,
            dod:"",
            rpu:"",
            preview: false,
            enquiryId: 0,
            piSend:0,
            currency:4,
            expectedDateOfDelivery:"",  
            viewOldPi:false, 
            getOrder:[],
            onlyView:false,
            previewAndRaisePI:false,
            getOrderStatus:-1,
            daysleftinint:""
         
        }
    }

    backPI(){
        this.setState({
            viewOldPi: false,
            isPidetail:true
           
        })
    }

    oldbackPI(){
        this.setState({
            viewOldPi: false,
            isPidetail:true
           
        })
    }
  
    viewOldPI(){
        this.setState({
            viewOldPi:true,
            previewAndRaisePI:false,
            onlyView:true,
           
        })
    }
    daysleft(name,days)
    {
        var someDate = new Date(name);
                                var numberOfDaysToAdd =parseInt(days);
                                someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
                                var todayDate= new Date();
                                const diffTime =  someDate - todayDate ;
                                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                                return(diffDays);
                               
    }

    revisedPI(){
        var regex = /[1-9]|\./
        var previewhsn= /^\d{1,8}$/
        if(!previewhsn.test(this.state.hsncode)){
            this.setState({
               showValidationPi:true,
               message:" HSN code should not be empty & more than 8 digits " 
            })
        }
       else if(regex.test(this.state.quantity) &&  this.state.dod && regex.test(this.state.rpu) ){
            if(document.getElementById('agree').checked){
                           this.state.viewOldPi = true;  
                       
                             this.setState({  
                              viewOldPi:true,
                              onlyView:false,
                              previewAndRaisePI:true,
                             isPidetail:!this.state.isPidetail,
                             showValidationPi: false,
                          
                         },()=>{
                       
                       
                        });

            }
            else{
                customToast.error("Please agree to T&C", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true,
                  });
            }
           
            }
         

      else{
        this.setState({
            showValidationPi: true,
            message : "Please fill mandatory fields"
   
      });
      
      }
    } 
    
    ToggleDelete22 = (id) => {
        document.getElementById('id09'+ id).style.display='block';
    }

    ToggleDeleteClose22 = (id) => {
    document.getElementById('id09'+ id).style.display='none';
    } 

    
    handlePiEdit(){
        
        this.setState({
            isPidetail:!this.state.isPidetail
            
        },()=>{
        });
        
    
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value,showValidationMoq: false,showValidationPi:false }, () => {
        });
    }

    componentDidMount(){
        TTCEapi.getPi(this.props.enquiryId).then((response)=>{
            if(response.data.data==null){
                this.setState({
                    getPi : 0,
                    quantity:0,
                    rpu:0,
                    dod:"",
                    hsncode:0,
                    cgst:0,
                    sgst:0,
                })
            }
            else {
            this.setState({
                getPi : response.data.data,
                quantity:response.data.data.quantity,
                rpu:response.data.data.ppu,
                dod:response.data.data.date,
                hsncode:response.data.data.hsn,
                cgst:response.data.data.cgst,
                sgst:response.data.data.sgst,
                piSend:response.data.data.isSend,
          },()=>{
             
           
            });
        }
           
        });
        TTCEapi.getCurrencySigns().then((response)=>{
            this.setState({getCurrencySigns : response.data.data},()=>{
           
            });
        });
        

        if(this.props.completed){

            TTCEapi.getClosedOrder(this.props.enquiryId).then((response)=>{
                if(response.data.valid)
                {
                    this.setState({getOrder:response.data.data,
    
                       })
                        TTCEapi.previewPI(this.props.enquiryId).then((response)=>{
                            if(response.data.valid)
                            {
                                this.setState({previewPI:response.data.data,dataload:true
                                    })
                                    TTCEapi.getOldPIData(this.props.enquiryId).then((response)=>{
                                        if(response.data.valid)
                                        {
                                            this.setState({getOldPIData:response.data.data,
                                                dataload:true
                                                })
                                        }
                                    })
                            }
                        })
    
                }
              
            })
        }
        else
        {
            TTCEapi.getOrder(this.props.enquiryId).then((response)=>{
                if(response.data.valid)
                {
                    this.setState({getOrder:response.data.data},()=>{
                        var someDate = new Date(response.data.data[0].openEnquiriesResponse.changeRequestModifiedOn);
                                                var numberOfDaysToAdd =parseInt(2);
                                                someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
                                                var todayDate= new Date();
                                                const diffTime =  someDate - todayDate ;
                                                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                                                this.setState({
                                                    daysleftinint:diffDays
                                                })
                                                return(diffDays);
                    })
                    
                        TTCEapi.previewPI(this.props.enquiryId).then((response)=>{
                            if(response.data.valid)
                            {
                                this.setState({previewPI:response.data.data,dataload:true
                                    })
                                    TTCEapi.getOldPIData(this.props.enquiryId).then((response)=>{
                                        if(response.data.valid)
                                        {
                                            this.setState({getOldPIData:response.data.data,
                                                dataload:true
                                                })
                                        }
                                    })
                            }
                        })
                       
                }
              
            })
        }
      
     
       

    }
    render() {
        return (
            <React.Fragment>
                <>
                    {this.state.dataload?
                    <>
                        {this.state.getOrder[0].openEnquiriesResponse.changeRequestStatus===1 ||
                        this.state.getOrder[0].openEnquiriesResponse.changeRequestStatus===3 ?
                        <>
                          {/* {console.log("PIChange.js status-1/3")} */}
                        {this.state.getOldPIData.length==0
                        ?
                                   <>
                                    {this.state.viewOldPi ?
                                    <>
                                    {this.state.getOldPIData.length>0 && this.state.previewAndRaisePI==false?
                                    <>
                                     {/* { console.log(" old data NA")} */}
                                                <PreviewOldchanges
                                                bp={this.oldbackPI}
                                                enquiryId={this.props.enquiryId}
                                                enquiryCode={this.props.enquiryCode}
                                              
                                                />
                                    </>
                                    :
                                    <>
                                    {this.state.getPi.isSend===1?
                                    <>
                                     {/* { console.log("pi send ")} */}
                                                <PreviewChangedPI 
                                                bp={this.backPI}
                                                enquiryId={this.props.enquiryId}
                                                enquiryCode={this.props.enquiryCode}
                                                expectedDateOfDelivery={this.state.dod}
                                                hsn={this.state.hsncode}
                                                rpu={this.state.rpu}
                                                quantity={this.state.quantity}
                                                sgst={this.state.sgst}
                                                cgst={this.state.cgst}
                                                piSend={this.state.piSend}
                                                onlyView={this.state.onlyView}
                                                previewAndRaisePI={this.state.previewAndRaisePI}
                                                />
                                   </>
                                    :
                                    
                                             <>
                                             {/* { console.log("pi not send & old data NA")} */}
                                                <PreviewChangedPI 
                                                bp={this.backPI}
                                                enquiryId={this.props.enquiryId}
                                                enquiryCode={this.props.enquiryCode}
                                                expectedDateOfDelivery={this.state.dod}
                                                hsn={this.state.hsncode}
                                                rpu={this.state.rpu}
                                                quantity={this.state.quantity}
                                                sgst={this.state.sgst}
                                                cgst={this.state.cgst}
                                                piSend={this.state.piSend}
                                                onlyView={this.state.onlyView}
                                               
                                                />
                                                </>}
                                    </>
                                    }
                                        
                                       
                                    </>
                                    :
                                    <>
                                    {this.daysleft(this.state.getOrder[0].openEnquiriesResponse.changeRequestModifiedOn,2)==0?
                                     <>
                                     {/* Days left ==0 */}
                                      <PreviewChangedPI 
                                                bp={this.backPI}
                                                enquiryId={this.props.enquiryId}
                                                enquiryCode={this.props.enquiryCode}
                                                expectedDateOfDelivery={this.state.dod}
                                                hsn={this.state.hsncode}
                                                rpu={this.state.rpu}
                                                quantity={this.state.quantity}
                                                sgst={this.state.sgst}
                                                cgst={this.state.cgst}
                                                piSend={this.state.piSend}
                                                onlyView={this.state.onlyView}
                                               
                                                />
                                     </>
                                     :
                                                                       <>
                                {/* {console.log("Form display")} */}
                            <Row noGutters={true}>
                                <Col style={{textAlign:"center"}} className="playfair">
                                    <h3 className="postchangereq"><img src={logos.postchangerequesticon} style={{height:"20px"}}/> 
                                    Post Change Request Process</h3>
                                <h1>Update the pro forma invoice</h1>
                                <p className="crpigreennote">
                                    You have <strong>{this.state.daysleftinint} </strong>
                                     days remaining to update your invoice after change request.</p>
                                </Col>
                                </Row>
                            
                              <p style={{float:"right",color:"cornflowerblue",cursor:"pointer"}}
                              onClick={() => this.viewOldPI()}>
                             <img src={logos.recent} style={{height:"15px"}}/> View old PI</p> 
                              
                                 
                                  
                            {/* :""
                                } */}
                            <Row noGutters={true} className="PIcolmt BdImgCol">
                            <Col sm={6} >
                                <label>Quantity <strong className="requiredStar">*</strong></label>
                                <br/>
                            <input 
                            className="PIinput"
                                type="number"
                            
                                value={this.state.quantity }
                                name="quantity"
                                onChange={this.handleChange}
                                />
                            </Col>
                            <Col sm={6}>
                            <label >Rate per unit(or metre) <strong className="requiredStar">*</strong></label>
                            <br/>
                          
                            ₹ <input type="number"  className="PIinput rsinputboxwidth"
                             value={this.state.rpu }
                            name="rpu"
                            onChange={this.handleChange} />
                            </Col>
                            </Row>
                            <Row noGutters={true} className="PIcol2mt BdImgCol">
                            <Col sm={6}>
                            <label>Expected date of delivery <strong className="requiredStar">*</strong></label>
                            <br/>
                            <input className="PIinput" type="date"
                        
                            value={this.state.dod }
                            name="dod"
                            onChange={this.handleChange}/>
                            
                            </Col>
                            <Col sm={6}>
                            <label>HSN Code <strong className="requiredStar">*</strong></label>
                            <br/>
                            <input className="PIinput" type="number"
                            value={this.state.hsncode }
                            name="hsncode"
                            onChange={this.handleChange}/>
                            </Col>
                            </Row>
                        
                            <Row noGutters={true} className="PIcol2mt BdImgCol">
                                <Col sm={12}>
                                <input type="checkbox" name="checkbox" value="check" id="agree"
                                
                                style={{marginRight:"5px"}} 
                                /> 
                                    Agree to <a
                                        style={{ cursor: "pointer", fontSize: "15px" }}
                                        href={TTCEapi.DocumentsURL + "TERMS_and_CONDITIONS.pdf"}
                                        target="_blank"
                                    >
                                        terms & condition
                                    </a>
                            
                                </Col>
                                </Row>
                                <p className="text-center">
                            {this.state.showValidationPi ? (
                            <span className="bg-danger">{this.state.message}</span>
                            ) : (
                            <br />
                            )}
                            </p>
                            <Row noGutters={true}>
                            <Col sm={12} className="text-center crpinote">
                                The pro forma will be updated according to the changes in fields, <br/>
                                the same shall be intimated to the buyer. 
                                </Col></Row>
                            <Row noGutters={true}>
                            <Col sm={12} className="text-center">
                            
                            <button className="previewandpi" onClick={() => this.revisedPI()}>
                            <img src={logos.PIbtnicon} className="PIbuttonicon"></img>Preview & Raise PI</button>
                            </Col>
                            
                            </Row>
                                    </>
                                    }
                                   </>
                                    }
                    </>
                :
                <>
                 {/* {console.log("PI is raised")} */}
                                                <PreviewChangedPI 
                                                bp={this.backPI}
                                                enquiryId={this.props.enquiryId}
                                                enquiryCode={this.props.enquiryCode}
                                                expectedDateOfDelivery={this.state.dod}
                                                hsn={this.state.hsncode}
                                                rpu={this.state.rpu}
                                                quantity={this.state.quantity}
                                                sgst={this.state.sgst}
                                                cgst={this.state.cgst}
                                                piSend={this.state.piSend}
                                                onlyView={this.state.onlyView}
                                                previewAndRaisePI={this.state.previewAndRaisePI}
                                                />
                </>
                }
           
                        </>
                        :
                        <>
                        {this.state.getOrder[0].openEnquiriesResponse.changeRequestStatus===2 ||
                       
                        this.state.getOrder[0].openEnquiriesResponse.changeRequestStatus===0?
                        <>
                         {/* {console.log("PIChange.js status-2/0")} */}
                        
                       <PreviewChangedPI 
                        bp={this.backPI}
                        enquiryId={this.props.enquiryId}
                        enquiryCode={this.props.enquiryCode}
                        expectedDateOfDelivery={this.state.dod}
                        hsn={this.state.hsncode}
                        rpu={this.state.rpu}
                        quantity={this.state.quantity}
                        sgst={this.state.sgst}
                        cgst={this.state.cgst}
                        piSend={this.state.piSend}
                    
                        />
                        </>:
                        <PreviewChangedPI 
                        bp={this.backPI}
                        enquiryId={this.props.enquiryId}
                        enquiryCode={this.props.enquiryCode}
                        expectedDateOfDelivery={this.state.dod}
                        hsn={this.state.hsncode}
                        rpu={this.state.rpu}
                        quantity={this.state.quantity}
                        sgst={this.state.sgst}
                        cgst={this.state.cgst}
                        piSend={this.state.piSend}
                        />}
                        </>
                        }
                    </>
                    :
                    <Row noGutters={true}>
                    <Col className="col-xs-12  text-center">
                       No Data
                    </Col>
                </Row>}
                </>   
                </React.Fragment>
                )
                }



}



