
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
          
            // <img src={this.state.ImageUrl + data.productId + '/' + data.lable } />
        }
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
    markcompleted(){
        console.log("clicked");
        let params = queryString.parse(this.props.location.search);
        console.log(params);
        TTCEapi.markEnquiryClosed(params.code).then((response)=>{
            if(response.data.valid)
            {
                customToast.success("Enquiry closed!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true,
                  });
                  browserHistory.push("/buyerEnquiriesList"); 

            }
        });
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
                            <li >Completed</li>
                            </ul>
                            :
                            <ul className="list-unstyled multi-steps">
                              {this.state.enquiryStagesMTO.map((item1) => <li key={item1.id} className={this.state.progressid  == item1.id ? "is-active": " "} >{item1.desc}</li> )     }
                              <li >Completed</li>
                            </ul>
                                }

                            </div>
                           
                           </Col>
                       </Row>
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col className="col-xs-6">
                    <button className=" closedEnquirybtn"
                    onClick={()=>{this.markcompleted()}}
                                       >
                                <img src={logos.cancelenq} className="closeenqimg"></img>
                                Close Enquiry
                                </button>
                    </Col>
                    {/* <Col className="col-xs-2"></Col> */}
                    <Col className="col-xs-6">
                    <button className="completedenqButton"
                                       onClick={()=>{this.markcompleted()}}
                                       disabled = {this.state.progressid != 14}

                                       >
                                       <img src={logos.completedenq} className="completeenqimg" 
                                       ></img>
                                Mark order Delivered
                                </button>
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
                                                            <Col sm={1}></Col>
                                                            <Col sm={8}>
                                                        {this.state.isSend==1?    
                                                          null
                                                            :
                                                            <>  {this.state.isMoqdetail ? <img
                                                                src={logos.apedit}
                                                                className="aoctick"
                                                                style={{"cursor":"pointer" ,
                                                                     "position" : "absolute"}}
                                                                onClick={this.handleMoqEdit}
                                                        ></img> : 
                                                       null} </>
                                                           }

                                                                <Row noGutters={true} className="moqdetailCard Allenqlistbtnmt">
                                                                    <Col sm={6} className="Moqh1">
                                                                        Min Order Qnty:
                                                                    </Col>
                                                                    <Col sm={6} className="Moqh2">
                                                                       <input 
                                                                       id="moq"
                                                                       className="width200 alignbox" 
                                                                       type="number"
                                                                       disabled={this.state.isMoqdetail} 
                                                                        value={this.state.moq }
                                                                        name="moq"
                                                                        onChange={this.handleChange}/> 
                                                                    </Col>
                                                                </Row>

                                                                 <Row noGutters={true} className="moqdetailCard Allenqlistbtnmt2">
                                                                 <Col sm={6} className="Moqh1">
                                                                     Price/unit:
                                                                 </Col>
                                                                 <Col sm={6} className="Moqh2">
                                                                 <i class="fa fa-inr" aria-hidden="true"></i> 
                                                                 <input 
                                                                 id="ppu"
                                                                 className="width200 alignbox2"
                                                                  type="text"
                                                                  disabled={this.state.isMoqdetail} 
                                                                  value={this.state.ppu}
                                                                   name="ppu"
                                                                   onChange={this.handleChange}
                                                                   /> 
                                                                  
                                                                 </Col>
                                                             </Row>

                                                             <Row noGutters={true} className="moqdetailCard Allenqlistbtnmt2">
                                                                 <Col sm={6} className="Moqh1">
                                                                    Estimated delivery date:
                                                                 </Col>
                                                                 <Col sm={6} className="Moqh2select">
                                                                                        <select
                                                                                        id="productCategorie"
                                                                                        className="Moqh2selectheight" 
                                                                                        name="deliveryDesc"
                                                                                        value={this.state.deliveryDesc}
                                                                                        disabled={this.state.isMoqdetail} 
                                                                                        onChange={this.handleChange}
                                                                                    >
                                                                                        <option
                                                                                        key="0"
                                                                                        deliveryDesc = '-1'
                                                                                        value="Select"
                                                                                        >
                                                                                        Select
                                                                                        </option>
                                                                                        {this.state.getMoqDeliveryTimes.map(
                                                                                        (data) => (
                                                                                            <option
                                                                                            key={data.deliveryDesc}
                                                                                            deliveryDesc={data.id}
                                                                                            value= {data.id}
                                                                                                >
                                                                                            {data.deliveryDesc}
                                                                                            </option>
                                                                                        )
                                                                                        )}
                                                                                    </select>
                                                                 </Col>
                                                             </Row>

                                                             <Row noGutters={true} className="moqdetailCard Allenqlistbtnmt2">
                                                                 <Col sm={12} className="Moqh1 ">
                                                                    Additional Note:
                                                                 </Col>
                                                                 <p className="Moqh1p">
                                                                     <textarea id="additionalInfo " 
                                                                     name="additionalInfo"
                                                                     value={this.state.additionalInfo}
                                                                       disabled={this.state.isMoqdetail} 
                                                                       onChange={this.handleChange}
                                                                     className="width100p "></textarea>
                                                                 </p>
                                                             </Row>
                                                             <p className="text-center">
                                                             {this.state.showValidationMoq ? (
                                            <span className="bg-danger">All fields are Mandatory</span>
                                        ) : (
                                            <br />
                                        )}
                                                             </p>
                                                            
                                                             <Row noGutters={true} className=" Allenqlistbtnmt2">
                                                               
                                                                 <Col sm={6} >
                                                                 {this.state.isSend== 1?
                                                                 <button className="savemoqbtn"
                                                                  disabled >Save</button>
                                                                
                                                                :
                                                                <button className="savemoqbtn"
                                                                    onClick={() => this.saveMoqDetails()} >Save</button>}
                                                                    
                                                                 </Col>
                                                                 <Col sm={6} className="">
                                                                 {this.state.isSend== 1?
                                                                 <button className="sendmoqbtn"
                                                                   onClick={() => this.sendMoqDetails()}
                                                                  disabled >Send</button>
                                                                   : 
                                                                   <button className="sendmoqbtn"
                                                                   onClick={() => this.sendMoqDetails()}
                                                                   >Send</button>
                                                                 }
                                                                 </Col>
                                                             </Row>
                                                             <p className="marginBottompage"></p>
                                                             </Col>
                                                             </>

                                                                :null}
                     {/* -------------------MOQ------------------------------------------------------------------------------ */}

                                                            {this.state.proformaDetails ? 
                                                            <>
                                                            <Col sm={1}></Col>
                                                            <Col sm={8}>
                                                         {this.state.getPi.isSend==1?    
                                                          null
                                                            :
                                                            <>  {this.state.isPidetail ? <img
                                                                src={logos.apedit}
                                                                className="aoctick"
                                                                style={{"cursor":"pointer" ,
                                                                     "position" : "absolute"}}
                                                                onClick={this.handlePiEdit}
                                                        ></img> : 
                                                       null} </>
                                                           }   
                                                           <Row noGutters={true} className="PIcolmt BdImgCol">
                                                               <Col sm={6} >
                                                                   <label>Quantity</label>
                                                                   <br/>
                                                               <input 
                                                               className="PIinput"
                                                                type="number"
                                                                disabled={this.state.isPidetail}
                                                                value={this.state.quantity }
                                                                name="quantity"
                                                                onChange={this.handleChange}
                                                                />
                                                               </Col>
                                                               <Col sm={6}>
                                                               <label >Rate per unit(or metre)</label>
                                                               <br/>
                                                               {/* <input className="PIinput" type="number"/> */}
                                                             <span 
                                                             className={this.state.isPidetail ? "rssymboldis":"rssymbol"}
                                                             disabled={this.state.isPidetail}>
                                                            <i class="fa fa-inr" aria-hidden="true"></i></span>
                                                             <input type="number"  className="PIinput rsinputboxwidth"
                                                             disabled={this.state.isPidetail}
                                                             value={this.state.rpu }
                                                             name="rpu"
                                                             onChange={this.handleChange} />
                                                               </Col>
                                                           </Row>

                                                           <Row noGutters={true} className="PIcol2mt BdImgCol">
                                                           <Col sm={6}>
                                                           <label>Expected date of delivery</label>
                                                           <br/>
                                                               <input className="PIinput" type="date"
                                                               disabled={this.state.isPidetail}
                                                               value={this.state.dod }
                                                               name="dod"
                                                               onChange={this.handleChange}/>
                                                        
                                                           </Col>
                                                           <Col sm={6}>
                                                           <label>HSN Code</label>
                                                           <br/>
                                                               <input className="PIinput" type="number"
                                                               disabled={this.state.isPidetail}
                                                               value={this.state.hsncode }
                                                               name="hsncode"
                                                               onChange={this.handleChange}/>
                                                           </Col>
                                                       </Row>

                                                       <Row noGutters={true} className="PIcol2mt BdImgCol">
                                                           <Col sm={6}>
                                                           <label>CGST %</label>
                                                           <br/>
                                                               <input className="PIinput" type="number"
                                                               disabled={this.state.isPidetail}
                                                               value={this.state.cgst }
                                                               name="cgst"
                                                               onChange={this.handleChange}/>
                                                        
                                                           </Col>
                                                           <Col sm={6}>
                                                           <label>SGST %</label>
                                                           <br/>
                                                               <input className="PIinput" type="number"
                                                               disabled={this.state.isPidetail}
                                                               value={this.state.sgst }
                                                               name="sgst"
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
                                                                onClick={() => {
                                                                alert("clicked");
                                                                }}
                                                            >
                                                                terms & condition
                                                            </a>
                              
                                                           </Col>
                                                       </Row>
                                                       <p className="text-center">
                                                             {this.state.showValidationPi ? (
                                            <span className="bg-danger">All fields are Mandatory</span>
                                        ) : (
                                            <br />
                                        )}
                                                             </p>
                                                       <Row noGutters={true}>
                                                           <Col sm={12} className="text-center">
                                                                <button className="previewandpi" onClick={() => this.savePIDetails()}>
                                                                  <img src={logos.PIbtnicon} className="PIbuttonicon"></img>  Preview and send PI</button>
                                                           </Col>
                                                          
                                                       </Row>
                                                       <p className="marginBottompage"></p>
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

const connectedLoginPage = connect(mapStateToProps)(BuyerSingleEnquiry);
export default connectedLoginPage;

