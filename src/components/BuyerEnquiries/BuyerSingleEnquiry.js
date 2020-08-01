

import React, { Component } from 'react'
import { memoryHistory, browserHistory } from "../../helpers/history";
import { Row, Col , Container, Button} from 'reactstrap';
import { connect } from "react-redux";
import NavbarComponent from "../navbar/navbar";
import logos from "../../assets";
// import "./AllEnquiryList.css";
import queryString from 'query-string';
import TTCEapi from '../../services/API/TTCEapi';
import customToast from "../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Moment from 'react-moment';
// import { Footer } from 'rsuite';
import Footer from "../footer/footer";
import { BuyerPreviewInvoice } from './BuyerPreviewInvoice';
import "./BuyerSingleEnquiry.css";


export class BuyerSingleEnquiry extends Component {
    constructor() {
        super();

        this.buyersDetailsbtn = this.buyersDetailsbtn.bind(this);
        this.moqDetailsbtn = this.moqDetailsbtn.bind(this);
        this.proformaDetailsbtn = this.proformaDetailsbtn.bind(this);
        this.changeRequestbtn = this.changeRequestbtn.bind(this);
        this.qualityCheckbtn = this.qualityCheckbtn.bind(this);
        this.handleMoqEdit = this.handleMoqEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlePiEdit= this.handlePiEdit.bind(this);
        this.state = {
            selected:"BuyerDetails",
            buyersDetail: true,
            moqDetail: false,
            proformaDetails: false,
            qualityCheck:false,
            changeRequest:false, 
            getMoqDeliveryTimes:[],
            showValidationMoq:false,
            showValidationPi:false,
            isMoqdetail:true,
            isPidetail:true,
            moq:0,
            ppu:"",
            deliveryDesc:-1,
            additionalInfo:"",
            getMoq:[],
            getPi:[],
            dataload : false,
            isSend:-1,
            ImageUrl:TTCEapi.ImageUrl+'Product/',
            progressid:1,
            Progressidnext:2,
            accountno : "NA",
            bankname : "NA" ,
            branch : "NA" ,
            ifsccode : "NA",
            benificiaryname : "NA",
            gpayupi : "NA",
            paytmupi : "NA",
            phonepeupi  : "NA",
          readmore:false,
            // <img src={this.state.ImageUrl + data.productId + '/' + data.lable } />
        }
    }
    readmoreNote(){
        this.setState({
        readmore:!this.state.readmore
        })
        }
       ToggleDelete = () => {
        document.getElementById('id01').style.display='block';
       }

       ToggleDeleteClose = () => {
        document.getElementById('id01').style.display='none';
       }

       stateupdate = () => {
        this.ToggleDeleteClose();
        let params = queryString.parse(this.props.location.search);

        TTCEapi.progressUpdate(parseInt(this.state.Progressidnext) , parseInt(params.code)).then((response)=>{
            if(response.data.valid)
            {   customToast.success("Product Status Updated", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: true,
              });
                this.componentDidMount();
                console.log("updated");
            }
            else{
                customToast.error(response.data.errorMessage, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true,
                  });
            }
        });
        this.componentDidMount();
        
       }
    buyersDetailsbtn(){
      
        this.setState((prevState) => {
            return{
                selected: "BuyerDetails",
                buyersDetail: true,
                moqDetail: false,
                proformaDetails: false,
                qualityCheck:false,
                changeRequest:false,
               
            };
          
        });
    }

    moqDetailsbtn(){
        this.setState((prevState) => {
            return{
             selected: "moqDetails",
            moqDetail: true,
            buyersDetail: false,
            proformaDetails: false,
            qualityCheck:false,
            changeRequest:false,
         
            };
        });
    }

        proformaDetailsbtn(){
        this.setState((prevState) => {
            return{
                selected:"proformaDetails",
                proformaDetails: true,
                moqDetail: false,
                buyersDetail: false,
                qualityCheck:false,
                changeRequest:false,
                
            };
        });
    }
    changeRequestbtn(){
        this.setState((prevState) => {
            return{
                selected:"changeRequest",
                proformaDetails: false,
                moqDetail: false,
                buyersDetail: false,
                qualityCheck:false,
                changeRequest:true,
             
            };
        });
    }
    qualityCheckbtn(){
        this.setState((prevState) => {
            return{
                selected:"qualityCheck",
                proformaDetails: false,
                moqDetail: false,
                buyersDetail: false,
                qualityCheck:true,
                changeRequest:false,
              
            };
        });
    }
          
    backoperation(){
        browserHistory.push("/buyerEnquiriesList"); 
    } 

    handleCluster(e) {
      
        // console.log(e.target.id);
        var index = e.target.selectedIndex;
        var optionElement = e.target.childNodes[index];
        var option =  optionElement.getAttribute('moqId');
        // console.log(option);
        
        // this.setState({ [e.target.name]: e.target.value,moqId:option }, ()=> {
        //   console.log(this.state.moqId);
         
          
        // });
      }

      handleMoqEdit(){
        
            this.setState({
                isMoqdetail:!this.state.isMoqdetail
                
            },()=>{
                // this.checkSave();
            });
            
        
      }

      handlePiEdit(){
        
        this.setState({
            isPidetail:!this.state.isPidetail
            
        },()=>{
            // this.checkSave();
        });
        
    
  }

      handleChange(e) {
        const { name, value } = e.target;
        console.log(value);
        this.setState({ [name]: value }, () => {
        //   console.log(this.state.moq);
        });
    }

    saveMoqDetails(){
        if(this.state.moq &&  this.state.additionalInfo && this.state.deliveryDesc && this.state.ppu){
            let params = queryString.parse(this.props.location.search);
            console.log(params);
            TTCEapi.saveMoq(
                params.code,
                this.state.additionalInfo,
                this.state.deliveryDesc ,
                this.state.moq,
                this.state.ppu,
              
               ).then((response)=>{
                this.setState({saveMoq : response.data,
                    isMoqdetail:!this.state.isMoqdetail,
                    showValidationMoq: false,
                },()=>{
                // console.log(this.state);
               
                });
                customToast.success("MOQ Details saved successfully", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true,
                  });
            });
        }

      else{
        this.setState({
            showValidationMoq: true,
        //   message : "Invalid PAN Number"
      });
      
      }
    } 
    savePIDetails(){
        if(this.state.quantity &&  this.state.dod && this.state.rpu && this.state.hsncode&& this.state.cgst&& this.state.sgst){
            if(document.getElementById('agree').checked){
                let params = queryString.parse(this.props.location.search);
                console.log(params);
                TTCEapi.savePi(
                    params.code,
                    this.state.cgst,
                    this.state.dod ,
                    this.state.hsncode,
                    this.state.rpu,
                    this.state.quality,
                    this.state.sgst,
                  
                   ).then((response)=>{
                    this.setState({savePi : response.data,
                        isPidetail:!this.state.isPidetail,
                        showValidationPi: false,
                    },()=>{
                    // console.log(this.state);
                   
                    });
                    customToast.success("PI Details saved successfully", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: true,
                      });
                      browserHistory.push("/Preview");
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
        //   message : "Invalid PAN Number"
      });
      
      }
    } 
    sendMoqDetails(){
        if(this.state.moq &&  this.state.additionalInfo && this.state.deliveryDesc && this.state.ppu){
        let params = queryString.parse(this.props.location.search);
        console.log(params);
        TTCEapi.sendMoq(
            params.code,
            this.state.additionalInfo,
            this.state.deliveryDesc ,
            this.state.moq,
            this.state.ppu,
          
           ).then((response)=>{
            this.setState({sendMoq : response.data,
                isMoqdetail:true},()=>{
            // console.log(this.state);
            this.componentDidMount();
            });
            customToast.success("MOQ Details send successfully", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: true,
              });
        });
      
    } 
    else{
        this.setState({
            showValidationMoq: true,
        //   message : "Invalid PAN Number"
      });
      
      }
    }
 
    componentDidMount(){
        let params = queryString.parse(this.props.location.search);
        console.log(params);
        TTCEapi.getMoq(params.code).then((response)=>{
            console.log(response)
            if(response.data.data==null){
                this.setState({
                moq:0,
                ppu:"0",
                deliveryDesc:-1,
                additionalInfo:"",
                isSend:-1,
                
                //  dataload : true,
                })
            }
            else {
            this.setState({
                // getxyz:response.data,
                getMoq : response.data.data,
                moq:response.data.data.moq,
                ppu:response.data.data.ppu,
                deliveryDesc:response.data.data.deliveryTimeId,
                additionalInfo:response.data.data.additionalInfo,
                isSend:response.data.data.isSend,
                //  dataload : true,
          },()=>{
            //  console.log(this.state.getxyz);
           
            });
        }
           
        });
        
        TTCEapi.getMoqDeliveryTimes().then((response)=>{
         this.setState({getMoqDeliveryTimes : response.data.data},()=>{
            //  console.log(this.state.getMoqDeliveryTimes);
        
         });
     });

     

    TTCEapi.getPi(params.code).then((response)=>{
        // console.log(response)
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
      },()=>{
         console.log(this.state.getPi);
       
        });
    }
       
    });
       TTCEapi.getProductUploadData().then((response)=>{
            if(response.data.valid)
            {
                console.log(response);
                this.setState({productCategories: response.data.data.productCategories,
                    yarns: response.data.data.yarns },()=>{
            
                        TTCEapi.getEnquiryMoq(params.code).then((response)=>{
                            if(response.data.data[0].paymentAccountDetails.length != 0)
                            {
                                
                                for (var  items in response.data.data[0].paymentAccountDetails)
                                {
                                    console.log(response.data.data[0].paymentAccountDetails[items].accountType.id);
                                    switch(response.data.data[0].paymentAccountDetails[items].accountType.id){
                                        case 1:
                                            console.log("bank");   
                                            this.setState({
                                                accountno : parseInt(response.data.data[0].paymentAccountDetails[items].accNo_UPI_Mobile),
                                                bankname : response.data.data[0].paymentAccountDetails[items].bankName ,
                                                branch : response.data.data[0].paymentAccountDetails[items].branch ,
                                                ifsccode : response.data.data[0].paymentAccountDetails[items].ifsc,
                                                benificiaryname : response.data.data[0].paymentAccountDetails[items].name
                                            }); 
                                            break;
                                        case 2:
                                            console.log("gpayy");
                                            if(response.data.data[0].paymentAccountDetails[items].accNo_UPI_Mobile != ''){
                                            
                                                this.setState({
                                                    gpayupi : parseInt(response.data.data[0].paymentAccountDetails[items].accNo_UPI_Mobile), 
                                                }); 
                                            }
                                            
                                            break;
                                        case 3:
                                            // console.log(response.data.data[0].paymentAccountDetails[items].accNo_UPI_Mobile);
                                            if(response.data.data[0].paymentAccountDetails[items].accNo_UPI_Mobile != ''){
                                            
                                            this.setState({
                                                phonepeupi : parseInt(response.data.data[0].paymentAccountDetails[items].accNo_UPI_Mobile), 
                                            }); 
                                        }
                                            break;
                                        case 4:
                                            console.log("paytm");
                                            if(response.data.data[0].paymentAccountDetails[items].accNo_UPI_Mobile != ''){
                                                                          
                                                this.setState({
                                                    paytmupi : parseInt(response.data.data[0].paymentAccountDetails[items].accNo_UPI_Mobile), 
                                                }); 
                                            }
                                            
                                            break;
                                    }
                                }
                                
                
                            }
                            var nextProgressid = 0;
                            if(response.data.data[0].openEnquiriesResponse.productStatusId == 2)
                            {
                                    if(response.data.data[0].openEnquiriesResponse.enquiryStageId == 3)
                                    {
                                        nextProgressid = 11;
                                    }
                                    else{
                                        nextProgressid =response.data.data[0].openEnquiriesResponse.enquiryStageId + 1;
                                    }
                            }
                            else{
                                nextProgressid =response.data.data[0].openEnquiriesResponse.enquiryStageId + 1;
                            }
                            this.setState({getEnquiryMoq : response.data.data,
                                progressid: response.data.data[0].openEnquiriesResponse.enquiryStageId,
                                Progressidnext : nextProgressid,
                                userid : response.data.data[0].userId,
                                dataload:true},()=>{
                                console.log(this.state);
                           
                            });
                        });
                    });
            }
        })
        TTCEapi.getEnquirStages().then((response)=>{
            if(response.data.valid)
            {
                console.log(response.data.data);
                this.setState({enquiryStagesMTO:response.data.data})
            }
        })
        TTCEapi.getEnquirStagesforAvailable().then((response)=>{
            if(response.data.valid)
            {
                console.log(response.data.data);
                this.setState({enquiryStagesAvailable:response.data.data})
            }
        })
     }

    acceptMOQModalShow = () => {
        document.getElementById('acceptMOQModal').style.display='block';
    }

    acceptMOQModalClose = () => {
        document.getElementById('acceptMOQModal').style.display='none';
    }

    buyerMOQAccept = () => {
        document.getElementById('acceptMOQModal').style.display='none';

        document.getElementById('confirmMOQModal').style.display='block';
    }

    buyerMOQAcceptClose = () => {
        document.getElementById('confirmMOQModal').style.display='none';
    }

     

    render() {
        return (
            <React.Fragment>
                 {this.state.dataload == true 
                   
                   ? 
                   <>
                <NavbarComponent/>
                <Container>
                <Row noGutters={true} className="">
                           <Col sm = "1" className="col-xs-2">
                           <img
                                       src={logos.backarrowicon}
                                       className="margin-cparrow cparrowsize glyphicon"
                                        onClick={() => this.backoperation()}
                            ></img>
                          
                          </Col>
                          <Col sm="10" className="col-xs-9">
                               <Row noGutters={true} className ="cp1heading bold  ">
                                   <Col md="12" className="col-xs-12">
                                        Enquiry Id : {this.state.getEnquiryMoq[0].openEnquiriesResponse.enquiryCode}
                                       </Col>
                               </Row>
                          </Col>                            
                </Row>
                <br></br>
                    <>
                    {this.state.getEnquiryMoq.map((item)=> 
                <>
                <Row noGutters={true}>
                    <Col className="col-xs-1"></Col>
                    <Col className="col-xs-10">
                        <Row noGutters={true}>
                            <Col sm="9">
                                <div className="imageinlist"> 
                                    <div className="imageinlist1"> 
                                    {
                                        item.openEnquiriesResponse.productType === "Product"
                                        ?
                                        <a href={"/showArtisanProduct?ProductId="+item.openEnquiriesResponse.productId }><img  src={TTCEapi.ImageUrl +"Product/" + item.openEnquiriesResponse.productId + "/" + item.openEnquiriesResponse.productImages.split(",")[0]} className="enquiryimage"></img>
                                        </a>
                                        :
                                        <a href={"/showBuyerProduct?productId="+item.openEnquiriesResponse.productId }><img  src={TTCEapi.ImageUrl +"CustomProduct/" + item.openEnquiriesResponse.productId + "/" + item.openEnquiriesResponse.productImages.split(",")[0]} className="enquiryimage"></img>
                                        </a>

                                    }

                                    </div>
                                    
                                    <a href={"/showArtisanProduct?ProductId="+item.openEnquiriesResponse.productId } className="leEnqprodName">{item.openEnquiriesResponse.productName}</a>
                                    {/* <span ></span> */}
                                </div>
                                <div>
                                  {/* <div noGutters={true} >
                                      <Col className="leEnqid bold">
                                      Enquiry Id : {item.openEnquiriesResponse.enquiryCode}
                                      </Col>
                                  </div> */}
                                  <div noGutters={true} >
                                      <Col >
                                      <span className="leEnqtype bold ">{this.state.productCategories[item.openEnquiriesResponse.productCategoryId - 1].productDesc} </span> 
                                       <span className="leEnqspun"> / {this.state.yarns[item.openEnquiriesResponse.warpYarnId - 1 ].yarnDesc}  X  {this.state.yarns[item.openEnquiriesResponse.weftYarnId - 1 ].yarnDesc}  
                                        {item.openEnquiriesResponse.extraWeftYarnId > 0 
                                        ?
                                        <>
                                        X  {this.state.yarns[item.openEnquiriesResponse.extraWeftYarnId - 1 ].yarnDesc}
                                        </>
                                        :
                                            <></>
                                        }</span> 
                                      </Col>
                                  </div>
                                  <div noGutters={true} className="" >
                                      <Col className="leEnqprodcode ">
                                          {item.openEnquiriesResponse.productType === "Product"
                                          ?
                                          <>
                                          Product Code : {item.openEnquiriesResponse.productCode}   
                                          </>
                                          :
                                          <>
                                          Product Code : NA  
                                          </>
                                          }
                                                                            
                                      </Col>
                                  </div>
                               
                                  <div noGutters={true} className="" >
                                      <Col className="leEnqprodtype ">
                                      {item.openEnquiriesResponse.productStatusId==2? "Available in stock"   : ""   }
                                          {item.openEnquiriesResponse.productStatusId==1? "Made to order"   : ""   }
                                          {item.openEnquiriesResponse.productStatusId==null? "Requested Custom Design"   : ""   }
                                                                  
                                      </Col>

                                  </div>
                                  {/* <div noGutters={true} className="" >
                                      <Col className="leEnqprodcode ">
                                          <span className="leEnqprodbn ">Brand Name : </span>
                                          <span className="leEnqbrandname ">{item.openEnquiriesResponse.companyName}</span>                                   
                                      </Col>
                                  </div> */}
                                </div>
                            </Col>
                            <Col sm="3" className="text-right">
                                <div noGutters={true} >
                                      <Col className="leEnqOrderAmount ">
                                      Order Amount
                                      </Col>
                                </div>
                                <div noGutters={true} >
                                      <Col className="leEnqAmount bold">
                                        {item.openEnquiriesResponse.totalAmount > 0 ? "₹"+ item.openEnquiriesResponse.totalAmount : "NA"} 
                                      </Col>
                                </div>
                                <div noGutters={true} >
                                      <Col className="leEnqidDateStarted">
                                      Date Started : 
                                      <Moment format="YYYY-MM-DD">
                                        {item.openEnquiriesResponse.startedOn}
                                        </Moment>
                                      </Col>
                                </div>
                                <div noGutters={true} >
                                      <Col className="leEnqidLastUpdated">
                                      Last Updated : 
                                      <Moment format="YYYY-MM-DD">
                                     {item.openEnquiriesResponse.lastUpdated}
                                        </Moment>
                                        
                                      </Col>
                                </div>
                                <div noGutters={true} >
                                      <Col className="leEnqidEstDelivery">
                                      Est. Date of delivery : 
                                      {item.openEnquiriesResponse.excpectedDate != null 
                                      ?
                                      <Moment format="YYYY-MM-DD">
                                        {item.openEnquiriesResponse.excpectedDate}
                                        </Moment>
                                      :
                                      "NA"
                                      }
                                      
                                      </Col>
                                </div>

                                
                            </Col>
                        </Row>
                    </Col>

                    
                </Row>
                <Row noGutters={true} className="mt7">
                <Col className="col-xs-1"></Col>
                    <Col className="col-xs-10">
                       <Row noGutters={true}>
                           <Col className="col-xs-12 leEnqstatus bold">
                           Enquiry Status
                           </Col>
                       </Row>
                    </Col>
                </Row>
                <Row noGutters={true} className="mt7">
                    <Col className="col-xs-1"></Col>
                    <Col className="col-xs-10">
                       <Row noGutters={true}>
                           <Col className="col-xs-12 ">
                           <div className="progressbarfont">
                            <br /><br />
                            {item.openEnquiriesResponse.productStatusId === 2
                            ?
                            <ul className="list-unstyled multi-steps">
                              {this.state.enquiryStagesAvailable.map((item1) => <li key={item1.id} className={this.state.progressid  == item1.id ? "is-active": " "} >{item1.desc}</li> )     }
                            </ul>
                            :
                            <ul className="list-unstyled multi-steps">
                              {this.state.enquiryStagesMTO.map((item1) => <li key={item1.id} className={this.state.progressid  == item1.id ? "is-active": " "} >{item1.desc}</li> )     }
                            </ul>
                                }

                            </div>
                           
                           </Col>
                       </Row>
                    </Col>
                </Row>
           
                </>
                )}
                    </>
                <br></br>

                               <br></br>
                               <Row noGutters={true}>
                                    <Row noGutters={true}>
                                    <Col sm={1}>
     
                                            </Col>
                                            <Col sm={2}  
                                            className={
                                                (this.state.selected == "BuyerDetails"
                                                     ? "Allenqlistbtn2"
                                                         : "Allenqlistbtn")
                                                     }
                                            onClick={this.buyersDetailsbtn}>
                                            Artisan's Detail
                                            </Col>
                                            <Col sm={2} 
                                            className={
                                                (this.state.selected == "moqDetails"
                                                     ? "Allenqlistbtn2"
                                                         : "Allenqlistbtn")
                                                     }
                                            onClick={this.moqDetailsbtn}>
                                            MOQ Detail 
                                            </Col>

                                            <Col sm={2} 
                                              className={
                                                (this.state.selected == "proformaDetails"
                                                     ? "Allenqlistbtn2"
                                                         : "Allenqlistbtn")
                                                     }
                                             onClick={this.proformaDetailsbtn}>
                                           Proforma Invoice
                                            </Col>
                                            <Col sm={2} 
                                              className={
                                                (this.state.selected == "changeRequest"
                                                     ? "Allenqlistbtn2"
                                                         : "Allenqlistbtn")
                                                     }
                                             onClick={this.changeRequestbtn}>
                                            Change Request 
                                            </Col>
                                            <Col sm={2}  
                                            className={
                                                (this.state.selected == "qualityCheck"
                                                     ? "Allenqlistbtn2"
                                                         : "Allenqlistbtn")
                                                     }
                                            onClick={this.qualityCheckbtn}>
                                           Quality Check 
                                            </Col>
                                            <Col sm={1}>
                                            
                                            </Col>
                                    </Row>

                                                       <Row noGutters={true}>
                                                           <Col sm={1}></Col>
                                                          
           {/* --------------------------------Buyer Detail----------------------------------------------  */}
                                                                {this.state.buyersDetail ? 
                                                                             
                                                                <>
                                                                <Col sm={10}>
                                                                {( this.state.getEnquiryMoq[0].openEnquiriesResponse.isMoqSend != null || this.state.getEnquiryMoq[0].openEnquiriesResponse.productType == "Product")
                                                                ?
                                                                <>
                                                                {this.state.getEnquiryMoq ? ( ( this.state.getEnquiryMoq.map((data) => (
                                                                
                                                                <>
                                                              <Row noGutters={true}>
                                                                  <Col sm={12} className="col-xs-12 BdImgCol">
                                                                      {/* <img  className="BdImg" src={logos.Dimapur}/> */}
                                                                      {data.openEnquiriesResponse.logo?
                                                                    <img className="Logobpdimg profileImage" src={TTCEapi.ImageUrl+'User/'+data.userId+'/CompanyDetails/Logo/'+data.openEnquiriesResponse.logo}/>
                                                                        :
                                                                        <img className="BdImg profileImage" src={logos.Smile} />
                                                                       }
                                                                      </Col>
                                                              </Row>
                                                              <Row noGutters={true} className="BdImgCol">
                                                                   <Col sm={3} className="BuyerDetailsh1">
                                                                   Brand Name:
                                                                   </Col>
                                                                   <Col sm={8} className="">
                                                                   {data.openEnquiriesResponse.companyName ? data.openEnquiriesResponse.companyName : "NA"}   
                                                                   </Col>
                                                               </Row>
                                                               <Row noGutters={true} className="BdImgCol">
                                                                   <Col sm={3} className="BuyerDetailsh1">
                                                                  Name:
                                                                   </Col>
                                                                   <Col sm={8} className="">
                                                                      {data.openEnquiriesResponse.firstName} <span></span> {data.openEnquiriesResponse.lastName ? data.openEnquiriesResponse.lastName :"" }
                                                                   </Col>
                                                               </Row>
                                                               <Row noGutters={true} className="BdImgCol">
                                                                   <Col sm={3} className="BuyerDetailsh1">
                                                                   Email Id:
                                                                   </Col>
                                                                   <Col sm={8} className="">
                                                                   {data.openEnquiriesResponse.email}
                                                                   </Col>
                                                               </Row>
                                                               <Row noGutters={true} className="BdImgCol">
                                                                   <Col sm={3} className="BuyerDetailsh1">
                                                                     Phone No:
                                                                   </Col>
                                                                   <Col sm={8} className="">
                                                                   {data.openEnquiriesResponse.mobile}
                                                                   </Col>
                                                               </Row>
                                                               <Row noGutters={true} className="">
                                                                   {/* <Col sm={6} className="BuyerDetailsh1">
                                                                   Alternate Phone Number:
                                                                   </Col>
                                                                   <Col sm={6} className="">
                                                                   {data.openEnquiriesResponse.alternateMobile ? data.openEnquiriesResponse.alternateMobile : "NA"}
                                                                   </Col> */}
                                                                   <hr className="hrlineasd1 "></hr>
                                                               </Row>
                                                               <Row noGutters={true} className="BdImgCol">
                                                                   <Col sm={3} className="">
                                                                  <h1 className="BDh1">Delivery address</h1>
                                                                  <p  className="BDp" style={{width:"95%",lineHeight:"25px"}}>
                                                                  {data.openEnquiriesResponse.line1}
                                                                   {/* {data.openEnquiriesResponse.line2 != "" ? ", " + data.openEnquiriesResponse.line2 : ""} */}
                                                                   {data.openEnquiriesResponse.district != "" ? ", " + data.openEnquiriesResponse.district : ""}
                                                                   {/* {data.openEnquiriesResponse.city != "" ? ", " + data.openEnquiriesResponse.city : ""} */}
                                                                   {data.openEnquiriesResponse.pincode != "" ? ", " + data.openEnquiriesResponse.pincode : ""}
                                                                   {data.openEnquiriesResponse.state != "" ? ", " + data.openEnquiriesResponse.state : ""}
                                                                   <br>
                                                                   </br>
                                                                      {data.openEnquiriesResponse.landmark}
                                                                      </p>
                                                                   </Col>
                                                                   <Col sm={4} className="">
                                                                   <h1 className="BDh1">Bank & Account Details</h1>
                                                                   <p  className="BDp">Cluster : {data.clusterName}</p>
                                                                   <p  className="BDp">Account Number :{this.state.accountno} </p>
                                                                   <p  className="BDp">Bank Name :{this.state.bankname}</p>
                                                                   <p  className="BDp">Beneficiary Name : {this.state.benificiaryname}</p>
                                                                   <p  className="BDp">Branch Name : {this.state.branch}</p>
                                                                   <p  className="BDp">IFSC Code :{this.state.ifsccode}</p>

                                                                   </Col>
                                                                   <Col sm={5} className="">
                                                                   <h1 className="BDh1">  </h1>
                                                                   <Row>
                                                                       <Col sm = {{size: "2"}}>

                                                                               <img src={logos.gpay} className="gpayicon mt0"></img>

                                                                               </Col>
                                                                               <Col sm = {{size: "9"}} className="digitalbank">
                                                                               <div className="font141">
                                                                                   Google Pay UPI Id
                                                                               </div>
                                                                               <div>
                                                                               {this.state.gpayupi}
                                                                               </div>
                                                                               </Col>
                                                                               </Row>   
                                                                               <Row>

                                                               <Col sm = {{size: "2"}}>
                                                               
                                                               <img src={logos.paytm} className="gpayicon mt0"></img>

                                                               </Col>
                                                               <Col sm = {{size: "9"}} className="digitalbank">
                                                               <div className="font141">
                                                                   Paytm Registered Mobile Number
                                                               </div>
                                                               <div>
                                                               {this.state.paytmupi}
                                                               
                                                               </div>
                                                               </Col>
                                                               </Row>
                                                               <Row>

                                                               <Col sm = {{size: "2"}}>
                                                               
                                                               <img src={logos.phonepe} className="gpayicon mt0"></img>

                                                               </Col>
                                                               <Col sm = {{size: "9"}} className="digitalbank">
                                                               <div className=" font141">
                                                                   Registered Number for PhonePe
                                                               </div>
                                                               <div>
                                                               {this.state.phonepeupi}
                                                               </div>
                                                               </Col>
                                                             
                                                               </Row>
                                                           
                                                                </Col>
                                                                  
                                                               </Row>

                                                               <p className="marginBottompage"></p>
                                                              </>    ) ) 
                                                                   )): null
                                                                   }
                                                                </>
                                                                :
                                                                <>
                                                                <Row>
                                                                    <br></br>
                                                                    <br></br>
                                                                    <br></br>   
                                                                    <Col className="col-xs-12 text-center font14">
                                                                        Artisan not finalised for this Custom Product yet.
                                                                    </Col>
                                                                </Row>
                                                                </>
                                                                }
                                                                </Col>
                                                                </>
                                                                : null
                                                                }
           {/* --------------------------------Buyer Detail end----------------------------------------------                                                          */}
            {/* -------------------MOQ start------------------------------------------------------------------------------ */}
           
                                                            {this.state.moqDetail ?  
                                                            
                                                            <>
                                                            {/* <Col sm={1}></Col> */}
                                                            <Col sm={10}>
                                                            <> 
                                                          <h1>Received MOQ</h1>
                                                         <Row noGutters={true} style={{overflow:"auto"}}>
                                                        <table className="MOqtable" style={{width:"100%"}}>
                                                            <tr className="borderleftblue">
                                                            <td >
                                                                <Row noGutters={true}>
                                                                     <Col className="col-xs-12 " sm={12} md={4} >
                                                                        <img src={logos.Fabric} className="Receivemoqbrandimg"></img>
                                                                    </Col>

                                                                    <Col className="col-xs-12 colright" sm={12} md={8}>
                                                                       <p className="Artisianbrandh">Artisian Brand :<span style={{color:"cornflowerblue"}}> Chidiya</span> </p>
                                                                        <span className="regionmoq"> Region,orissa</span>
                                                                    </Col>
                                                                </Row>
                                                            </td>
                                                            <td>
                                                            <Row noGutters={true}>
                                                                     <Col className="col-xs-12 tdclasscss">
                                                                        <p className="theading">MOQ</p>
                                                                            300
                                                                    </Col>
                                                                </Row>
                                                            </td>
                                                            <td>
                                                            <Row noGutters={true}>
                                                            <Col className="col-xs-12 tdclasscss">
                                                            <p className="theading">Price/unit(or m)</p>
                                                            <i class="fa fa-inr" aria-hidden="true"></i>
                                                                                   300
                                                                    </Col>
                                                                </Row>
                                                             </td>
                                                            <td>
                                                            <Row noGutters={true}>
                                                            <Col className="col-xs-12 tdclasscss">
                                                            <p className="theading">ETA Delivery</p>
                                                                            300 Days
                                                                    </Col>
                                                                </Row>
                                                            </td>
                                                            <td>
                                                            <Row noGutters={true} onClick={() => this.readmoreNote()}>
                                                            <Col className="col-xs-12 readmored" >
                                                            <p className="receading"  >Received</p>
                                                            {this.state.readmore ? <>Collapse  <i class="fa fa-angle-up fa-lg" aria-hidden="true"></i> </>:
                                                            <> Read More <i class="fa fa-angle-down fa-lg" aria-hidden="true"></i></>
                                                            }
                                                                           

                                                                    </Col>
                                                                </Row>
                                                            </td>
                                                            {this.state.readmore?
                                                            ""
                                                            :
                                                            <td>
                                                            <Row noGutters={true}>
                                                            <Col className="col-xs-12 tdclasscss">
                                                           
                                                            <i class="fa fa-minus-circle" aria-hidden="true" style={{color:"red"}}></i>
                                                                    </Col>
                                                                </Row>
                                                            </td>
                                                            }
                                                           
                                                            <td className={this.state.readmore? "acceptmoqbtnlg":"acceptmoqbtn"} onClick={this.acceptMOQModalShow}>
                                                            <Row noGutters={true} >
                                                                <Col className="col-xs-12 ">
                                                                <i class="fa fa-handshake-o accepticon" aria-hidden="true"></i>
                                                                Accept
                                                                </Col>
                                                            </Row>
                                                            </td>

                                                            <div id="acceptMOQModal" class="w3-modal">
                                                            <div class="w3-modal-content w3-animate-top modalBoxSize">
                                                                <div class="w3-container buyerMOQAcceptModalContainer">
                                                                <Row noGutters={true} className="buyerMOQAcceptModalOuter">
                                                                    <Col className="col-xs-12">
                                                                        <div className="buyerMOQAcceptModalHeader">Are you sure ?</div>
                                                                        <div className="buyerMOQAcceptModalEnquiryDiv">
                                                                            <span className="buyerMOQAcceptModalEnquiry">Enquiry Id</span>
                                                                            <span className="buyerMOQAcceptModalEnquiryId">AN-SA-987659</span>
                                                                        </div>
                                                                        <div className="buyerMOQAcceptModalTerms">Terms Decided</div>
                                                                        <table className="buyerMOQAcceptModalTable">
                                                                            <tr>
                                                                                <td>
                                                                                    <p className="buyerMOQAcceptModalTableContent">MOQ</p>
                                                                                    <p className="buyerMOQAcceptModalpBottom">300</p>
                                                                                </td>
                                                                                <td>
                                                                                    <p className="buyerMOQAcceptModalTableContent">Price/unit(or m)</p>
                                                                                    <p className="buyerMOQAcceptModalpBottom">₹ 30000.00</p>
                                                                                </td>
                                                                                <td>
                                                                                    <p className="buyerMOQAcceptModalTableContent">ETA Delivery</p>
                                                                                    <p className="buyerMOQAcceptModalpBottom">45 Days</p>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                        <div className="buyerMOQAcceptModalEnquiryDiv">
                                                                            <span className="buyerMOQAcceptModalBrand">Artisan Brand: </span>
                                                                            <span className="buyerMOQAcceptModalBrandName">Matsar</span>
                                                                        </div>
                                                                        <div className="buyerMOQAcceptModalState">Maniabandha, Orissa</div>
                                                                        <hr className="buyerMOQAcceptModalHr"/>
                                                                        <div className="buyerMOQAcceptModalDesc">
                                                                            MOQ once accepted cannot be changed further.<br/>
                                                                            You can find this MOQ in <span className="buyerMOQAcceptModalDescSpan">Ongoing Enquiry</span> under 
                                                                            <span className="buyerMOQAcceptModalDescSpan">Enquires</span><br/>
                                                                            tab to track your enquiry.
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                                <hr className="buyerMOQAcceptModalHr"/>
                                                                <div className="buyerMOQAcceptModalButtonOuter">
                                                                    <span onClick={this.acceptMOQModalClose} className="buyerMOQAcceptModalCancelButton">Cancel</span>
                                                                    <span onClick={this.buyerMOQAccept} className="buyerMOQAcceptModalOkayButton">Ok</span>
                                                                </div>
                                                                </div>
                                                            </div>
                                                            </div>

                                                            <div id="confirmMOQModal" class="w3-modal">
                                                            <div class="w3-modal-content w3-animate-top modalBoxSize">
                                                                <div class="w3-container buyerMOQAcceptModalContainer">
                                                                <Row noGutters={true} className="buyerMOQAcceptModalOuter">
                                                                    <Col className="col-xs-12">
                                                                        <div className="buyerMOQConfirmModalHeader">MOQ is accepted !</div>
                                                                        <div className="buyerMOQAcceptModalEnquiryDiv">
                                                                            <span className="buyerMOQAcceptModalEnquiry">Enquiry Id</span>
                                                                            <span className="buyerMOQAcceptModalEnquiryId">AN-SA-987659</span>
                                                                        </div>
                                                                        <div className="buyerMOQAcceptModalTerms">Terms Decided</div>
                                                                        <table className="buyerMOQAcceptModalTable">
                                                                            <tr>
                                                                                <td>
                                                                                    <p className="buyerMOQAcceptModalTableContent">MOQ</p>
                                                                                    <p className="buyerMOQConfirmModalpBottom">300</p>
                                                                                </td>
                                                                                <td>
                                                                                    <p className="buyerMOQAcceptModalTableContent">Price/unit(or m)</p>
                                                                                    <p className="buyerMOQConfirmModalpBottom">₹ 30000.00</p>
                                                                                </td>
                                                                                <td>
                                                                                    <p className="buyerMOQAcceptModalTableContent">ETA Delivery</p>
                                                                                    <p className="buyerMOQConfirmModalpBottom">45 Days</p>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                        
                                                                        <div className="buyerMOQConfirmModalEnquiryChatButton">Go to this enquiry chat</div>
                                                                        
                                                                        <div className="buyerMOQConfirmModalDesc">
                                                                            MOQ once accepted cannot be changed further.<br/>
                                                                            You can find this MOQ in <span className="buyerMOQAcceptModalDescSpan">Ongoing Enquiry</span> under 
                                                                            <span className="buyerMOQAcceptModalDescSpan">Enquires</span><br/>
                                                                            tab to track your enquiry.
                                                                        </div>
                                                                        <div className="buyerMOQConfirmModalButtonOuter">
                                                                            <span onClick={this.buyerMOQAcceptClose} className="buyerMOQConfirmModalCancelButton">Close</span>
                                                                            <span className="buyerMOQConfirmModalOkayButton">View Enquiry</span>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                                </div>
                                                            </div>
                                                            </div>
                                                        </tr>
                                                       
                                                        </table>
                                                        {/* -----------readmore-------------- */}
                                                                 {this.state.readmore ? 
                                                                  <div className="readmorediv">
                                                                  <p><b>Note from Artisan</b></p>
                                                                   This is a note from artisan  This is a note from artisan  This is a note from artisan  This is a note from artisan
                                                                   This is a note from artisan  This is a note from artisan  This is a note from artisan  This is a note from artisan
                                                                   This is a note from artisan  This is a note from artisan  This is a note from artisan  This is a note from artisan
                                                                   This is a note from artisan  This is a note from artisan  This is a note from artisan  This is a note from artisan
                                                                  </div>
                                                                 :null}
                                                             
                                                              
                                                          
                                                        </Row>  
                                                          </>


                                                            </Col>
                                                       </>
                                                                :null}
                     {/* -------------------MOQ------------------------------------------------------------------------------ */}

                                                            {this.state.proformaDetails ? 
                                                            <>
                                                            {/* <Col sm={1}></Col> */}
                                                            <Col sm={10}>
                                                                <BuyerPreviewInvoice/>
                                                            </Col>
                                                         
                                                            </>:null}
                                         {/* ----------------------------------------------------------------------------------------------                   */}
                                                            {this.state.changeRequest ?  
                                                            <>
                                                            <Col sm={1}></Col>
                                                            <Col sm={8}>
                                                                <div>

                                                            <h6>change....</h6>
                                                            </div>
                                                            </Col>
                                                            </>:null}

                                                            {this.state.qualityCheck ? 
                                                            <>
                                                            <Col sm={1}></Col>
                                                            <Col sm={8}>
                                                             <div>
                                                            <h6>qualityCheck...</h6>
                                                            </div>
                                                            </Col>
                                                            </>
                                                            :null}
                                                            
                                                            
                                                            
                                                     </Row>
  
  
                               </Row>
                               <Row>
            <div> 
              <img
                className="notifyFooterBanner internaldiv"
                src={logos.notifyFooterBanner}
              ></img>
            </div>
          </Row> 
                </Container>
                <Footer/>
                </> :
                <> </>}
            </React.Fragment>
        )
    }
}



function mapStateToProps(state) {
    // debugger;
    const { user } = state
    return { user };
}
