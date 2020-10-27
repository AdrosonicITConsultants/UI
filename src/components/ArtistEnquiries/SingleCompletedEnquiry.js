
import React, { Component } from 'react'
import { memoryHistory, browserHistory } from "../../helpers/history";
import { Row, Col , Container, Button} from 'reactstrap';
import { connect } from "react-redux";
import NavbarComponent from "../navbar/navbar";
import logos from "../../assets";
import "./AllEnquiryList.css";
import queryString from 'query-string';
import TTCEapi from '../../services/API/TTCEapi';
import customToast from "../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Moment from 'react-moment';
// import { Footer } from 'rsuite';
import Footer from "../footer/footer";
import { PreviewInvoice } from './PreviewInvoice';



export class SingleEnquiry extends Component {
    constructor() {
        super();
        this.backPI = this.backPI.bind(this);
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
            deliveryDesc:1,
            additionalInfo:"",
            getMoq:[],
            getPi:[],
            dataload : false,
            isSend:-1,
            ImageUrl:TTCEapi.ImageUrl+'Product/',
            progressid:1,
            Progressidnext:2,
            cgst:0,
            sgst:0,
            hsncode:0,
            quantity:0,
            dod:"",
            rpu:"",
            preview:0,
            
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
        browserHistory.push("/enquiriesList"); 
    } 

    backPI(){
        this.setState({
            preview:0,
        })
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
        
        if(this.state.moq && this.state.deliveryDesc && this.state.ppu){
            let params = queryString.parse(this.props.location.search);
            console.log(params);
            TTCEapi.saveMoq(
                params.code,
                this.state.additionalInfo,
                this.state.deliveryDesc ,
                this.state.moq,
                this.state.ppu,
              
               ).then((response)=>{
                   if(response.data.valid){
                this.setState({saveMoq : response.data,
                    isMoqdetail:!this.state.isMoqdetail,
                    showValidationMoq: false,
                },()=>{
                console.log(this.state.saveMoq);
               
                });
                customToast.success("MOQ Details saved successfully", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true,
                  });
         } });
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
                    this.state.quantity,
                    this.state.sgst,
                  
                   ).then((response)=>
                   {
                       if(response.data.valid){
                    this.setState({savePi : response.data,
                        isPidetail:!this.state.isPidetail,
                        showValidationPi: false,
                        preview:1,
                    },()=>{
                    // console.log(this.state);
                   
                    });
                    customToast.success("PI Details saved successfully", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: true,
                      });
                    //   browserHistory.push("/Preview");
              }  });
        
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
        if(this.state.moq  && this.state.deliveryDesc && this.state.ppu){
        let params = queryString.parse(this.props.location.search);
        this.state.enquiryCode = params.code;
        console.log(params);
        TTCEapi.sendMoq(
            params.code,
            this.state.additionalInfo,
            this.state.deliveryDesc ,
            this.state.moq,
            this.state.ppu,
          
           ).then((response)=>{
               console.log(response);
               if(response.data.valid){
            this.setState({sendMoq : response.data,
                isMoqdetail:true,showValidationMoq: false},()=>{
            console.log(this.state.sendMoq);
            this.componentDidMount();
            });
            customToast.success("MOQ Details sent successfully", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: true,
              });
          }  });
      
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
                deliveryDesc:1,
                additionalInfo:"",
                isSend:-1,
                
                //  dataload : true,
                })
            }
            else {
            this.setState({
                // getxyz:response.data,
                getMoq : response.data.data,
                moq:response.data.data.moq.moq,
                ppu:response.data.data.moq.ppu,
                deliveryDesc:response.data.data.moq.deliveryTimeId,
                additionalInfo:response.data.data.moq.additionalInfo,
                isSend:response.data.data.moq.isSend,
                //  dataload : true,
          },()=>{
             console.log(this.state.getMoq);
           
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
            
                        TTCEapi.getCompletedEnquiry(params.code).then((response)=>{
                            var nextProgressid = 0;
                            if(response.data.data[0].openEnquiriesResponse.historyProductId == null )
                            {
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
                            }
                            else{
                                if(response.data.data[0].openEnquiriesResponse.productStatusHistoryId == 2)
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
                {item.openEnquiriesResponse.historyProductId == null
                ?
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
                                      <Moment format="DD-MM-YYYY">
                                        {item.openEnquiriesResponse.startedOn}
                                        </Moment>
                                      </Col>
                                </div>
                                <div noGutters={true} >
                                      <Col className="leEnqidLastUpdated">
                                      Last Updated : 
                                      <Moment format="DD-MM-YYYY">
                                     {item.openEnquiriesResponse.lastUpdated}
                                        </Moment>
                                        
                                      </Col>
                                </div>
                                <div noGutters={true} >
                                      <Col className="leEnqidEstDelivery">
                                      Est. Date of delivery : 
                                      {item.openEnquiriesResponse.excpectedDate != null 
                                      ?
                                      <Moment format="DD-MM-YYYY">
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
                                {item.openEnquiriesResponse.enquiryStageId == 3
                                ?
                                this.state.enquiryStagesAvailable.map((item1) => <li key={item1.id} className={7 == item1.orderStages.id ? "is-active stop": " "} >{item1.orderStages.desc}</li> )     

                                :
                                this.state.enquiryStagesAvailable.map((item1) => <li key={item1.id} className={item.openEnquiriesResponse.enquiryStageId + 1  == item1.orderStages.id ? "is-active stop": " "} >{item1.orderStages.desc}</li> )     

                                }
                                {item.openEnquiriesResponse.enquiryStageId == 14
                              ?
                              <li >Completed</li>
                            :
                            <li className="closedenq">Closed</li>
                            }
                            </ul>
                            :
                            <ul className="list-unstyled multi-steps">
                                   {item.openEnquiriesResponse.enquiryStageId == 5 && item.openEnquiriesResponse.innerEnquiryStageId < 6
                                ?
                                <>
                                 {this.state.enquiryStagesMTO.map((item1) => 
                           
                                <li key={item1.id} className={item.openEnquiriesResponse.enquiryStageId  == item1.id ? "is-active stop": " "} >{item1.desc}</li> )     }
                                {item.openEnquiriesResponse.enquiryStageId == 14
                                ?
                                <li >Completed</li>
                                :
                                <li className="closedenq">Closed</li>
                                }
                                </>
                            :
                            <>
                            {this.state.enquiryStagesMTO.map((item1) => 
                           
                                <li key={item1.id} className={item.openEnquiriesResponse.enquiryStageId + 1 == item1.id ? "is-active stop": " "} >{item1.desc}</li> )     }
                                {item.openEnquiriesResponse.enquiryStageId == 14
                                ?
                                <li >Completed</li>
                              :
                              <li className="closedenq">Closed</li>
                              }
                              </>
                        }
                            
                             
                            </ul>
                            
                                }

                            </div>
                          
                           
                           </Col>
                       </Row>
                    </Col>
                </Row>
             
                </>
                :
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
                                        <a href={"/showArtisanProduct?ProductHistoryId="+item.openEnquiriesResponse.historyProductId }><img  src={TTCEapi.ImageUrl +"HistoryProduct/" + item.openEnquiriesResponse.historyProductId + "/" + item.openEnquiriesResponse.productHistoryImages.split(",")[0]} className="enquiryimage"></img>
                                        </a>
                                        :
                                        <a href={"/showBuyerProduct?ProductHistoryId="+item.openEnquiriesResponse.historyProductId }><img  src={TTCEapi.ImageUrl +"HistoryCustomProduct/" + item.openEnquiriesResponse.historyProductId + "/" + item.openEnquiriesResponse.productHistoryImages.split(",")[0]} className="enquiryimage"></img>
                                        </a>

                                    }

                                    </div>
                                    
                                    <a href={"/showArtisanProduct?ProductHistoryId="+item.openEnquiriesResponse.historyProductId } className="leEnqprodName">{item.openEnquiriesResponse.productHistoryName}</a>
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
                                      <span className="leEnqtype bold ">{this.state.productCategories[item.openEnquiriesResponse.productCategoryHistoryId - 1].productDesc} </span> 
                                       <span className="leEnqspun"> / {this.state.yarns[item.openEnquiriesResponse.warpYarnHistoryId - 1 ].yarnDesc}  X  {this.state.yarns[item.openEnquiriesResponse.weftYarnHistoryId - 1 ].yarnDesc}  
                                        {item.openEnquiriesResponse.extraWeftYarnId > 0 
                                        ?
                                        <>
                                        X  {this.state.yarns[item.openEnquiriesResponse.extraWeftYarnHistoryId - 1 ].yarnDesc}
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
                                          Product Code : {item.openEnquiriesResponse.productHistoryCode}   
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
                                          {item.openEnquiriesResponse.productStatusHistoryId==2? "Available in stock"   : ""   }
                                          {item.openEnquiriesResponse.productStatusHistoryId==1? "Made to order"   : ""   }
                                          {item.openEnquiriesResponse.productStatusHistoryId==null? "Requested Custom Design"   : ""   }
                                                                  
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
                                      <Moment format="DD-MM-YYYY">
                                        {item.openEnquiriesResponse.startedOn}
                                        </Moment>
                                      </Col>
                                </div>
                                <div noGutters={true} >
                                      <Col className="leEnqidLastUpdated">
                                      Last Updated : 
                                      <Moment format="DD-MM-YYYY">
                                     {item.openEnquiriesResponse.lastUpdated}
                                        </Moment>
                                        
                                      </Col>
                                </div>
                                <div noGutters={true} >
                                      <Col className="leEnqidEstDelivery">
                                      Est. Date of delivery : 
                                      {item.openEnquiriesResponse.excpectedDate != null 
                                      ?
                                      <Moment format="DD-MM-YYYY">
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
                            {item.openEnquiriesResponse.productStatusHistoryId === 2
                            ?
                            <ul className="list-unstyled multi-steps">
                                {item.openEnquiriesResponse.enquiryStageId == 3
                                ?
                                this.state.enquiryStagesAvailable.map((item1) => <li key={item1.id} className={7 == item1.orderStages.id ? "is-active stop": " "} >{item1.orderStages.desc}</li> )     

                                :
                                this.state.enquiryStagesAvailable.map((item1) => <li key={item1.id} className={item.openEnquiriesResponse.enquiryStageId + 1  == item1.orderStages.id ? "is-active stop": " "} >{item1.orderStages.desc}</li> )     

                                }
                                {item.openEnquiriesResponse.enquiryStageId == 14
                              ?
                              <li >Completed</li>
                            :
                            <li className="closedenq">Closed</li>
                            }
                            </ul>
                            :
                            <ul className="list-unstyled multi-steps">
                                 {item.openEnquiriesResponse.enquiryStageId == 5 && item.openEnquiriesResponse.innerEnquiryStageId < 6
                                ?
                                <>
                                 {this.state.enquiryStagesMTO.map((item1) => 
                           
                                <li key={item1.id} className={item.openEnquiriesResponse.enquiryStageId  == item1.id ? "is-active stop": " "} >{item1.desc}</li> )     }
                                {item.openEnquiriesResponse.enquiryStageId == 14
                                ?
                                <li >Completed</li>
                                :
                                <li className="closedenq">Closed</li>
                                }
                                </>
                            :
                            <>
                            {this.state.enquiryStagesMTO.map((item1) => 
                           
                                <li key={item1.id} className={item.openEnquiriesResponse.enquiryStageId + 1 == item1.id ? "is-active stop": " "} >{item1.desc}</li> )     }
                                {item.openEnquiriesResponse.enquiryStageId == 14
                                ?
                                <li >Completed</li>
                              :
                              <li className="closedenq">Closed</li>
                              }
                              </>
                        }
                            
                             
                            </ul>
                            
                                }

                            </div>
                          
                           
                           </Col>
                       </Row>
                    </Col>
                </Row>
             
                </>
    }
            
                </>
                )}
                    </>
                <br></br>

                               <br></br>
                               <Row noGutters={true}>
                                    <Row noGutters={true}>
                                    <Col sm={1}>
     
                                            </Col>
                                            <Col sm={3}  
                                            className={
                                                (this.state.selected == "BuyerDetails"
                                                     ? "Allenqlistbtn2 ml60"
                                                         : "Allenqlistbtn ml60")
                                                     }
                                            onClick={this.buyersDetailsbtn}>
                                            Buyer's Detail
                                            </Col>
                                            <Col sm={3} 
                                            className={
                                                (this.state.selected == "moqDetails"
                                                     ? "Allenqlistbtn2"
                                                         : "Allenqlistbtn")
                                                     }
                                            onClick={this.moqDetailsbtn}>
                                            MOQ Detail 
                                            </Col>

                                            <Col sm={3} 
                                              className={
                                                (this.state.selected == "proformaDetails"
                                                     ? "Allenqlistbtn2"
                                                         : "Allenqlistbtn")
                                                     }
                                             onClick={this.proformaDetailsbtn}>
                                           Proforma Invoice
                                            </Col>
                                            {/* <Col sm={3} 
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
                                            </Col> */}
                                            {/* <Col sm={1}>
                                            
                                            </Col> */}
                                    </Row>
                                    <br></br>

                                                       <Row noGutters={true}>
                                                           <Col sm={2}></Col>
                                                                    <Col sm={8}>
           {/* --------------------------------Buyer Detail----------------------------------------------  */}
                                                                {this.state.buyersDetail ? 
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
                                                                    <Col sm={6} className="BuyerDetailsh1">
                                                                    Brand Name:
                                                                    </Col>
                                                                    <Col sm={6} className="">
                                                                    {data.openEnquiriesResponse.companyName ? data.openEnquiriesResponse.companyName : "NA"}   
                                                                    </Col>
                                                                </Row>
                                                                <Row noGutters={true} className="BdImgCol">
                                                                    <Col sm={6} className="BuyerDetailsh1">
                                                                   Name:
                                                                    </Col>
                                                                    <Col sm={6} className="">
                                                                       {data.openEnquiriesResponse.firstName} <span></span> {data.openEnquiriesResponse.lastName ? data.openEnquiriesResponse.lastName :"" }
                                                                    </Col>
                                                                </Row>
                                                                <Row noGutters={true} className="BdImgCol">
                                                                    <Col sm={6} className="BuyerDetailsh1">
                                                                    Email Id:
                                                                    </Col>
                                                                    <Col sm={6} className="">
                                                                    {data.openEnquiriesResponse.email}
                                                                    </Col>
                                                                </Row>
                                                                <Row noGutters={true} className="BdImgCol">
                                                                    <Col sm={6} className="BuyerDetailsh1">
                                                                      Phone No:
                                                                    </Col>
                                                                    <Col sm={6} className="">
                                                                    {data.openEnquiriesResponse.mobile}
                                                                    </Col>
                                                                </Row>
                                                                <Row noGutters={true} className="BdImgCol">
                                                                    <Col sm={6} className="BuyerDetailsh1">
                                                                    Alternate Phone Number:
                                                                    </Col>
                                                                    <Col sm={6} className="">
                                                                    {data.openEnquiriesResponse.alternateMobile ? data.openEnquiriesResponse.alternateMobile : "NA"}
                                                                    </Col>
                                                                    <hr className="hrlineasd "></hr>
                                                                </Row>
                                                                <Row noGutters={true} className="BdImgCol">
                                                                    <Col sm={4} className="">
                                                                   <h1 className="BDh1">Delivery address</h1>
                                                                   <p  className="BDp" style={{width:"95%",lineHeight:"25px"}}>
                                                                   {data.openEnquiriesResponse.line1}
                                                                    {data.openEnquiriesResponse.line2 != "" ? ", " + data.openEnquiriesResponse.line2 : ""}
                                                                    {data.openEnquiriesResponse.street != "" ? ", " + data.openEnquiriesResponse.street : ""}
                                                                    {data.openEnquiriesResponse.city != "" ? ", " + data.openEnquiriesResponse.city : ""}
                                                                    {data.openEnquiriesResponse.pincode != "" ? ", " + data.openEnquiriesResponse.pincode : ""}
                                                                    {data.openEnquiriesResponse.state != "" ? ", " + data.openEnquiriesResponse.state : ""}
                                                                    <br>
                                                                    </br>
                                                                       {data.openEnquiriesResponse.landmark}
                                                                       </p>
                                                                    </Col>
                                                                    <Col sm={5} className="">
                                                                    <h1 className="BDh1">POC details</h1>
                                                                  <p className="BDp">Name : {data.openEnquiriesResponse.pocFirstName} {data.openEnquiriesResponse.pocLastName ? data.openEnquiriesResponse.pocLastName :""}</p>
                                                                  <p  className="BDp">Email Id : {data.openEnquiriesResponse.pocEmail ? data.openEnquiriesResponse.pocEmail:""}</p>
                                                                  <p  className="BDp">Phone Number : {data.openEnquiriesResponse.pocContact ?data.openEnquiriesResponse.pocContact:"" }</p>
                                                                    </Col>
                                                                    <Col sm={3} className="">
                                                                    <h1 className="BDh1">GST Number</h1>
                                                                    <p  className="BDp" style={{overflow:"visible"}}>{data.openEnquiriesResponse.gst}</p>
                                                                    </Col>
                                                                   
                                                                </Row>
                                                                <p className="marginBottompage"></p>
                                                               </>    ) ) 
                                                                    )): null
                                                                    }
                                                </>
                                                                :null}
           {/* --------------------------------Buyer Detail end----------------------------------------------                                                          */}
            {/* -------------------MOQ start------------------------------------------------------------------------------ */}
           
            {this.state.moqDetail ?  
                                                            
                                                            <>
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

                                                                 <Row noGutters={true} className="moqdetailCard Allenqlistbtnmt">
                                                                 <Col sm={6} className="Moqh1">
                                                                     Price/unit:
                                                                 </Col>
                                                                 <Col sm={6} className="Moqh2">
                                                                 {/* <i class="fa fa-inr" aria-hidden="true"></i>  */}
                                                                 <input 
                                                                 id="ppu"
                                                                 className="width200 alignbox"
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
                                                                                        deliveryDesc = '1'
                                                                                        value="Select"
                                                                                        selected="true" disabled="disabled"
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
                                            <span className="bg-danger">please fill mandatory fields</span>
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
                                                                disabled={this.state.saveButtonClick}
                                                                    onClick={() => this.saveMoqDetails()} >Save</button>}
                                                                    
                                                                 </Col>
                                                                 <Col sm={6} className="">
                                                                 {this.state.isSend== 1?
                                                                 <button className="sendmoqbtn"                    
                                                                  disabled >Send</button>
                                                                   : 
                                                                   <button className="sendmoqbtn" disabled={this.state.sendButtonClick}
                                                                   onClick={() => this.sendMoqDetails()}
                                                                   >Send</button>
                                                                 }
                                                                 </Col>
                                                             </Row>
                                                             <p className="marginBottompage"></p>
                                                             </>

                                                                :null}
                     {/* -------------------MOQ ends------------------------------------------------------------------------------ */}

                                 {this.state.proformaDetails ? 
                                        
                                        <>
                                {this.state.piSend === 1?
                                <PreviewInvoice 
                                bp={this.backPI}
                                enquiryId={this.state.enquiryId}
                                enquiryCode={this.state.getEnquiryMoq[0].openEnquiriesResponse.enquiryCode}
                                expectedDateOfDelivery={this.state.dod}
                                hsn={this.state.hsncode}
                                rpu={this.state.rpu}
                                quantity={this.state.quantity}
                                sgst={this.state.sgst}
                                cgst={this.state.cgst}
                                piSend={this.state.piSend}
                                />
                                :
                                <>
                                { this.state.isSend== 1  && this.state.getMoq.accepted== true
                                ?
                                <>
                                {this.state.preview === false? <>


                                {this.state.piSend==1?    
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
                                    {/* <span 
                                    className={this.state.isPidetail ? "rssymboldis":"rssymbol"}
                                    disabled={this.state.isPidetail}> */}
                                        <select name="cars" id="cars" 
                                        className={this.state.isPidetail ? "rssymboldis":"rssymbol"}
                                        disabled={this.state.isPidetail}>
                                            <option value="volvo">₹</option>
                                            <option value="saab">$</option>
                                        </select>
                                {/* </span> */}
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
                                                href={TTCEapi.DocumentsURL + "TERMS_and_CONDITIONS.pdf"}
                                                target="_blank"
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
                                    <img src={logos.PIbtnicon} className="PIbuttonicon"></img>Preview & send PI</button>
                                </Col>

                                </Row>

                                </>
                                :
                                <PreviewInvoice 
                                bp={this.backPI}
                                enquiryId={this.state.enquiryId}
                                enquiryCode={this.state.getEnquiryMoq[0].openEnquiriesResponse.enquiryCode}
                                expectedDateOfDelivery={this.state.dod}
                                hsn={this.state.hsncode}
                                rpu={this.state.rpu}
                                quantity={this.state.quantity}
                                sgst={this.state.sgst}
                                cgst={this.state.cgst}
                                piSend={this.state.piSend}
                                />

                                }




                                </>:<>
                                <Row>
                                <br></br>
                                <br></br>
                                <br></br>   
                                <Col className="col-xs-12 text-center font14">
                                MOQ Details are Not submitted / accepted yet.
                                </Col>
                                </Row>

                                </>}







                                </>
                                }
                                    

                                        </>:null}

                                       
                                         {/* ----------------------------------------------------------------------------------------------                   */}
                                                            {this.state.changeRequest ?  <div>
                                                          
                                                            </div>:null}

                                                            {this.state.qualityCheck ?  <div>
                                                            <h6>qualityCheck...</h6>
                                                            </div>:null}
                                                            
                                                            </Col>
                                                            <Col sm={2}></Col>
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

const connectedLoginPage = connect(mapStateToProps)(SingleEnquiry);
export default connectedLoginPage;

