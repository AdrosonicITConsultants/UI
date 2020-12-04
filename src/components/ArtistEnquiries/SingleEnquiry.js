
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
import Footer from "../footer/footer";
import { PreviewInvoice } from './PreviewInvoice';
import { useTranslation, withTranslation } from "react-i18next";
import ModernDatepicker from 'react-modern-datepicker';

 class SingleEnquiry extends Component {
    constructor() {
        super();
        this.scrollPI = React.createRef();
        this.backPI = this.backPI.bind(this);
        this.buyersDetailsbtn = this.buyersDetailsbtn.bind(this);
        this.moqDetailsbtn = this.moqDetailsbtn.bind(this);
        this.proformaDetailsbtn = this.proformaDetailsbtn.bind(this);
        this.changeRequestbtn = this.changeRequestbtn.bind(this);
        this.qualityCheckbtn = this.qualityCheckbtn.bind(this);
        this.handleMoqEdit = this.handleMoqEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlePiEdit= this.handlePiEdit.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.state = {
            startDate: "",
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
            preview: false,
            sendButtonClick: false,
            saveButtonClick:true,
            enquiryId: 0,
            piSend:0,
            innerEnquiryStages:[],
            enquiryStagesMTO:[],
           
        }
    }

    handleChangeDate(date) {
        this.setState({
            startDate:date,
            dod: date,
            showValidationMoq: false ,
            showValidationPi:false
        });
    }
    ToggleDelete = () => {
        document.getElementById('id01').style.display='block';
       }

       ToggleDeleteClose = () => {
        document.getElementById('id01').style.display='none';
       }
       inprogresss = () => {
        this.ToggleDeleteClose();
        let params = queryString.parse(this.props.location.search);
        TTCEapi.progressUpdate(parseInt(this.state.openEnquiries[0].openEnquiriesResponse.enquiryStageId),parseInt(params.code),parseInt(this.state.openEnquiries[0].openEnquiriesResponse.innerEnquiryStageId)).then((response)=>{
            if(response.data.valid)
            {
                customToast.success("Product Status Updated", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true,
                  });
            }
            else{
                customToast.error(response.data.errorMessage, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true,
                  });
            }
        })
    }

    stateupdate = () => {
        
        this.ToggleDeleteClose();
        let params = queryString.parse(this.props.location.search);
        var innerID = 0 ;
        if(this.state.openEnquiries[0].openEnquiriesResponse.enquiryStageId == 4)
        {
            innerID = 1;
        }
        else if(this.state.Progressidnext == 5) {
            innerID = this.state.openEnquiries[0].openEnquiriesResponse.innerEnquiryStageId + 1;
        }
        else innerID = 0;

        if(this.state.Progressidnext == 9){
            TTCEapi.validateFinalPaymentFromArtisan(parseInt(params.code),1).then((response)=>{
                if(response.data.valid)
                {
                    customToast.success("Transaction Status Updated!", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: true,
                      });
                    this.componentDidMount();
                   
            }
            else{
               
                customToast.error(response.data.errorMessage, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true,
                  });
            }
            });
        }
       else if(this.state.Progressidnext == 4)
        {   
            TTCEapi.validateAdvancePaymentFromArtisan(parseInt(params.code),1).then((response)=>{
                if(response.data.valid)
                {
                    customToast.success("Product Status Updated", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: true,
                      });
                      this.componentDidMount();

                }
                else{
                    customToast.error(response.data.errorMessage, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: true,
                      });
                }
            })
        }
        else{
            if(this.state.Progressidnext == 5 && innerID == 5 ){
                TTCEapi.progressUpdate(parseInt(this.state.Progressidnext),parseInt(params.code),innerID ).then((response)=>{
                    if(response.data.valid){

                    
                TTCEapi.progressUpdate(6,parseInt(params.code),0).then((response)=>{
                    if(response.data.valid)
                    {   customToast.success("Product Status Updated", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: true,
                      });
                        this.componentDidMount();
                    }
                    else{
                        customToast.error(response.data.errorMessage, {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: true,
                          });
                    }
                });
                }else{
                    customToast.error(response.data.errorMessage, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: true,
                      });
                }
            });
            }
            else{
                TTCEapi.progressUpdate(parseInt(this.state.Progressidnext),parseInt(params.code),innerID ).then((response)=>{
                    if(response.data.valid)
                    {   customToast.success("Product Status Updated", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: true,
                      });
                        this.componentDidMount();
                    }
                    else{
                        customToast.error(response.data.errorMessage, {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: true,
                          });
                    }
                });
                
    
            }
        }
           
        
        
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
            this.componentDidMount()
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
        browserHistory.goBack(); 
    } 

    backPI(){
        this.setState({
            preview: false,
            isPidetail:true
           
        })
    }

    handleCluster(e) {
      
        var index = e.target.selectedIndex;
        var optionElement = e.target.childNodes[index];
        var option =  optionElement.getAttribute('moqId');
     
      }

    handleMoqEdit(){
    
        this.setState({
            saveButtonClick: !this.state.saveButtonClick,
            isMoqdetail:!this.state.isMoqdetail,
          
        },()=>{
        });
        
    
    }

    handlePiEdit(){
        
        this.setState({
            isPidetail:!this.state.isPidetail
            
        },()=>{
        });
        
    
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value,showValidationMoq: false ,showValidationPi:false}, () => {
        });
    }

    

    saveMoqDetails(){
        var regex = /[1-9]|\./
        var moqlen= /^\d{1,2}$/
        var ppulen=/^\d{1,6}$/
        if(!moqlen.test(this.state.moq)  ){
            this.setState({
                showValidationMoq: true,
              message : "MOQ should not be empty & more than 2 digits  "
          });
        }
        else if(!ppulen.test(this.state.ppu)){
            this.setState({
                showValidationMoq: true,
              message : "PPU should not be empty & more than 6 digits "
          });
        }
     
       else if(regex.test(this.state.moq) && regex.test(this.state.deliveryDesc) && regex.test(this.state.ppu)){
            this.setState({
                saveButtonClick:true
              })
            let params = queryString.parse(this.props.location.search);
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
            saveButtonClick:false,
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
    gotoOrders(){
        browserHistory.push("/artisanorder?code="+this.state.enquiryId);
    }

    gotoTransaction(){
        browserHistory.push("/TransactionList")
    }
    savePIDetails(){
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
                let params = queryString.parse(this.props.location.search);
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
                        this.state.preview = true;   
                        this.setState({  
                        preview: true,
                        savePi : response.data,
                        isPidetail:!this.state.isPidetail,
                        showValidationPi: false,
                      
                    },()=>{
                  
                    });
                    customToast.success("PI Details saved successfully", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: true,
                      });
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
           
          message : "Please fill mandatory fields"
      });
      
      }
    } 
    sendMoqDetails(){
      
        var regex = /[1-9]|\./
        var moqlen= /^\d{1,2}$/
        var ppulen=/^\d{1,6}$/
        if(!moqlen.test(this.state.moq)){
            this.setState({
                showValidationMoq: true,
              message : "MOQ should not be empty & more than 2 digits "
          });
        }
        else if(!ppulen.test(this.state.ppu)){
            this.setState({
                showValidationMoq: true,
              message : "PPU should not be empty & more than 6 digits "
          });
        }
        else if(regex.test(this.state.moq) && regex.test(this.state.deliveryDesc) && regex.test(this.state.ppu)){
            this.setState({
                sendButtonClick: true,
                saveButtonClick:true
                  
            })
        let params = queryString.parse(this.props.location.search);
        TTCEapi.sendMoq(
            params.code,
            this.state.additionalInfo,
            this.state.deliveryDesc ,
            this.state.moq,
            this.state.ppu,
          
           ).then((response)=>{
            if(response.data.valid){
            this.setState({sendMoq : response.data,
                isMoqdetail:true,showValidationMoq: false},()=>{
                    this.componentDidMount();
           
            });
            customToast.success("MOQ Details sent successfully", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: true,
              });
          }
          else {
            this.setState({
                sendButtonClick: false,
                saveButtonClick:false
            })
            customToast.error(response.data.errorMessage, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: true,
              });
          }  
        });
      
    } 
    else{
        this.setState({
            showValidationMoq: true,
            message : "Please fill mandatory fields"
      });
      
      }
    }

    viewPI = () => {
        this.proformaDetailsbtn();
        this.scrollPI.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
        });
    }
 
    componentDidMount(){
       
        let params = queryString.parse(this.props.location.search);
        this.setState({
            enquiryId: params.code
        })
        TTCEapi.getMoq(params.code).then((response)=>{
            if(response.data.data==null){
                this.setState({
                moq:0,
                ppu:"0",
                deliveryDesc:1,
                additionalInfo:"",
                isSend:-1,
                })
            }
            else {
            this.setState({
                getMoq : response.data.data,
                moq:response.data.data.moq.moq,
                ppu:response.data.data.moq.ppu,
                deliveryDesc:response.data.data.moq.deliveryTimeId,
                additionalInfo:response.data.data.moq.additionalInfo,
                isSend:response.data.data.moq.isSend,
                 
          },()=>{
           
            });
        }
           
        });
        
        TTCEapi.getMoqDeliveryTimes().then((response)=>{
         this.setState({getMoqDeliveryTimes : response.data.data},()=>{
       
         });
     });

     

    TTCEapi.getPi(params.code).then((response)=>{
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
            dod:response.data.data.expectedDateOfDelivery,
            hsncode:response.data.data.hsn,
            cgst:response.data.data.cgst,
            sgst:response.data.data.sgst,
            piSend:response.data.data.isSend,
      },()=>{
         
       
        });
    }
       
    });
       TTCEapi.getProductUploadData().then((response)=>{
            if(response.data.valid)
            {    TTCEapi.getEnquirStages().then((response)=>{
                if(response.data.valid)
                {
                    this.setState({enquiryStagesMTO:response.data.data})
                }
            })
            TTCEapi.getEnquirStagesforAvailable().then((response)=>{
                if(response.data.valid)
                {
                    this.setState({enquiryStagesAvailable:response.data.data})
                }
            })
            TTCEapi.getInnerEnquirStages().then((response)=>{
                if(response.data.valid)
                {
                    this.setState({innerEnquiryStages:response.data.data})
                }
            })
                this.setState({productCategories: response.data.data.productCategories,
                    yarns: response.data.data.yarns },()=>{
            
                        TTCEapi.getEnquiryMoq(params.code).then((response)=>{
                            var nextProgressid = 0;
                            var progressid = 0;
                            
                            if(response.data.data[0].openEnquiriesResponse.historyProductId == null )
                            {
                                if(response.data.data[0].openEnquiriesResponse.productStatusId == 2)
                                {
                                        if(response.data.data[0].openEnquiriesResponse.enquiryStageId == 3)
                                        {
                                            nextProgressid = 7;
                                        }
                                        else{
                                            nextProgressid =response.data.data[0].openEnquiriesResponse.enquiryStageId + 1;
                                        }
                                        progressid=response.data.data[0].openEnquiriesResponse.enquiryStageId
                                }
                                else{
                                    if(response.data.data[0].openEnquiriesResponse.enquiryStageId == 5 && response.data.data[0].openEnquiriesResponse.innerEnquiryStageId < 5)
                                    {
                                        nextProgressid =response.data.data[0].openEnquiriesResponse.enquiryStageId;
                                        progressid= 4

                                    }
                                    else{
                                        nextProgressid =response.data.data[0].openEnquiriesResponse.enquiryStageId + 1;
                                        progressid= response.data.data[0].openEnquiriesResponse.enquiryStageId
                                    }
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
                                progressid= response.data.data[0].openEnquiriesResponse.enquiryStageId
                            }
                            
                            this.setState({openEnquiries : response.data.data,
                                progressid: progressid,
                                Progressidnext : nextProgressid,
                                userid : response.data.data[0].userId,
                                dataload:true},()=>{
                                if(localStorage.getItem("piShow") === "1") {
                                    this.viewPI();
                                    localStorage.removeItem("piShow");
                                }
                           
                            });
                        });
                    });
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
                                   {this.props.t("Pages.object.Enquiry id")} : {this.state.openEnquiries[0].openEnquiriesResponse.enquiryCode}
                                       </Col>
                               </Row>
                          </Col>                            
                </Row>
                <br></br>
                    <>
                    {this.state.openEnquiries.map((item)=> 
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
                                           item.openEnquiriesResponse.productImages !=null?
                                        item.openEnquiriesResponse.productType === "Product"
                                        ?
                                        <a href={"/showArtisanProduct?ProductId="+item.openEnquiriesResponse.productId }><img  src={TTCEapi.ImageUrl +"Product/" + item.openEnquiriesResponse.productId + "/" + item.openEnquiriesResponse.productImages.split(",")[0]} className="enquiryimage"></img>
                                        </a>
                                        :
                                        <a href={"/showBuyerProduct?productId="+item.openEnquiriesResponse.productId }><img  src={TTCEapi.ImageUrl +"CustomProduct/" + item.openEnquiriesResponse.productId + "/" + item.openEnquiriesResponse.productImages.split(",")[0]} className="enquiryimage"></img>
                                        </a>
                                        :
                                        <img  src={logos.Smile} className="enquiryimage"></img>
                                    }

                                    </div>
                                    
                                    <a href={"/showArtisanProduct?ProductId="+item.openEnquiriesResponse.productId } className="leEnqprodName">{item.openEnquiriesResponse.productName}</a>
                                    {/* <span ></span> */}
                                </div>
                                <div>
                                
                                  <div noGutters={true} >
                                      <Col >
                                      <span className="leEnqtype bold ">{this.state.productCategories[item.openEnquiriesResponse.productCategoryId - 1]?
                                      this.state.productCategories[item.openEnquiriesResponse.productCategoryId - 1].productDesc:""} </span> 
                                    <span className="leEnqspun"> / {item.openEnquiriesResponse.warpYarnId ? this.state.yarns[item.openEnquiriesResponse.warpYarnId - 1 ].yarnDesc : "NA"}  X  {item.openEnquiriesResponse.weftYarnId ? this.state.yarns[item.openEnquiriesResponse.weftYarnId - 1 ].yarnDesc : "NA"}  
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
                                          {this.props.t("Pages.object.Product Code")} : {item.openEnquiriesResponse.productCode}   
                                          </>
                                          :
                                          <>
                                          {this.props.t("Pages.object.Product Code")} : NA  
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
                                  
                                </div>
                            </Col>
                            <Col sm="3" className="text-right">
                                <div noGutters={true} >
                                      <Col className="leEnqOrderAmount ">
                                      {this.props.t("Pages.object.Order Amount")}
                                      </Col>
                                </div>
                                <div noGutters={true} >
                                      <Col className="leEnqAmount bold">
                                        {item.openEnquiriesResponse.totalAmount > 0 ? "₹"+ item.openEnquiriesResponse.totalAmount : "NA"} 
                                      </Col>
                                </div>
                                <div noGutters={true} >
                                      <Col className="leEnqidDateStarted">
                                      {this.props.t("Pages.object.Date started")} : 
                                      <Moment format="DD-MM-YYYY">
                                        {item.openEnquiriesResponse.startedOn}
                                        </Moment>
                                      </Col>
                                </div>
                                <div noGutters={true} >
                                      <Col className="leEnqidLastUpdated">
                                      {this.props.t("Pages.object.Last updated")} : 
                                      <Moment format="DD-MM-YYYY">
                                     {item.openEnquiriesResponse.lastUpdated}
                                        </Moment>
                                        
                                      </Col>
                                </div>
                                <div noGutters={true} >
                                      <Col className="leEnqidEstDelivery">
                                      {this.props.t("Pages.object.Est Date of delivery")} : 
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
                           {this.props.t("Pages.object.Enquiry Status")}

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
                            {this.state.enquiryStagesAvailable.map((item1) => <li key={item1.orderStages.id} className={item.openEnquiriesResponse.enquiryStageId == item1.orderStages.id ? "is-active": " "} >{item1.orderStages.desc}</li> )     }
                    
                            </ul>
                            :
                            <>
                            { (item.openEnquiriesResponse.changeRequestStatus == 1) || (item.openEnquiriesResponse.changeRequestStatus == 3)
                                    ?
                                    <img src={logos.cricon} className="cricon"></img>
 
                                    :
                                    null
 
                                }
                            { item.isBlue== 1
                                ?
                                <>
                                 <ul className="list-unstyled multi-steps">
                            {this.state.enquiryStagesMTO.map((item1) => 
                            <li key={item1.id} className={item.openEnquiriesResponse.enquiryStageId + 1 == item1.id ? "is-active wait": " "} >{}{item.openEnquiriesResponse.enquiryStageId == 5 && item1.id == 5 && item.openEnquiriesResponse.innerEnquiryStageId < 5 ? <> Work in Progress<br></br>
                            {this.state.innerEnquiryStages[item.openEnquiriesResponse.innerEnquiryStageId - 1].stage}
                            <br></br>
                            <span className="seemore" onClick={()=>{this.ToggleDelete22(item.openEnquiriesResponse.enquiryId)}}>see more</span>
                            </> : item1.desc}</li>
                             )     }
                            <li >Completed</li>
                            </ul>
                                </>
                                :
                                <ul className="list-unstyled multi-steps">
                                {this.state.enquiryStagesMTO.map((item1) => 
                                <li key={item1.id} className={item.openEnquiriesResponse.enquiryStageId == item1.id ? "is-active": " "} >{}{item.openEnquiriesResponse.enquiryStageId == 5 && item1.id == 5 && item.openEnquiriesResponse.innerEnquiryStageId < 5 ? <> Work in Progress<br></br>
                                {this.state.innerEnquiryStages[item.openEnquiriesResponse.innerEnquiryStageId - 1].stage}
                                <br></br>
                                <span className="seemore" onClick={()=>{this.ToggleDelete22(item.openEnquiriesResponse.enquiryId)}}>see more</span>
                                </> : item1.desc}</li>
                                 )     }
                                <li >Completed</li>
                                </ul>
                            
                            }
                           
                            </>
                                }

                            </div>
                                                                                
                    <div id={"id09"+item.openEnquiriesResponse.enquiryId} class="w3-modal">
                        <div class="w3-modal-content w3-animate-top modalBoxSizeCS">
                            <div>
                            <Row noGutters={true}>
                                <Col className="col-xs-12 CSheading">
                                   
                                </Col>
                            </Row>
                            </div>
                        <div class="w3-container">
                            <span 
                            onClick={()=>{this.ToggleDeleteClose22(item.openEnquiriesResponse.enquiryId)}} 
                            class="w3-button w3-display-topright cWhite">x</span>
                            <br></br>
                            <Row noGutters={true}>
                                {item.openEnquiriesResponse.productStatusId === 2
                                ?
                                <>  
                                {item.openEnquiriesResponse.enquiryCode}
                                </>
                                :
                                <>
                                 {this.state.innerEnquiryStages.map((item1) => 
                                   
                                    <Col className="col-xs-12 mb7">
                                        {item1.id <= (item.openEnquiriesResponse.innerEnquiryStageId) ?  <div className="greenButtonstatus"></div> :<div className="greyButtonstatus"></div> } 
                            
                                    {item1.stage }
                                    </Col>
                                    
                                    )} 
                                </>
                                }
                                
                               
                                </Row>
                              
                                <br></br>
                                
                            </div>
                            </div>
                        </div>
 
                           
                           </Col>
                       </Row>
                    </Col>
                </Row>
                    <Row noGutters={true} className="text-center">
                   {this.state.progressid < 3 || this.state.progressid == 10 ||this.state.progressid == 6 ||this.state.progressid == 7||this.state.progressid == 6 ||this.state.progressid == 7||(this.state.progressid == 10 && item.openEnquiriesResponse.productStatusId == 2)
                   ||(this.state.progressid == 3 && item.openEnquiriesResponse.productStatusId == 2)
                    ? 
                     <></>
                   :
                   <button
                     className="blackButton"
                     onClick={this.ToggleDelete}
                    >
                     {this.props.t("Pages.object.change status")}
                   </button>
                     }   
                   
                    <div id="id01" class="w3-modal">
                        <div class="w3-modal-content w3-animate-top modalBoxSizeCSCR">
                            <div>
                            <Row noGutters={true}>
                                <Col className="col-xs-12 CSheading">
                                {this.props.t("Pages.object.change status")}
                                </Col>
                            </Row>
                            </div>
                        <div class="w3-container">
                            <span 
                            onClick={this.ToggleDeleteClose} 
                            class="w3-button w3-display-topright cWhite">x</span>
                            <br></br>
                            <Row noGutters={true}>
                                {item.openEnquiriesResponse.productStatusId === 2
                                ?
                                <>
                                 {this.state.enquiryStagesAvailable.map((item1) => 
                                    item1.orderStages.id > 3 
                                    ?
                                    <>
                                    <Col className="col-xs-7 mb7 text-left">
                                        {item1.orderStages.id < this.state.Progressidnext ?  <div className="greenButtonstatus"></div> :<></> }
                                        {item1.orderStages.id > (this.state.Progressidnext) ?  <div className="greyButtonstatus"></div> :<></> }
                                        {item1.orderStages.id == (this.state.Progressidnext) ?  <div className="blueButtonstatus"></div> :<></> }
                                 {" "}{item1.orderStages.desc}
                                    </Col>
                                     <Col className="col-xs-5 mb7">
                                      {item1.orderStages.id == (this.state.Progressidnext) ?  <button className="markCompletedButton" onClick={this.stateupdate}> Mark Completed</button> :<></> }
                                    </Col>
                                 </>
                                    :
                                    <>
                                    </>
                                 )}   
                                </>
                                :
                                <>
                                 {this.state.enquiryStagesMTO.map((item1) => 
                                    item1.id > 3
                                    ?
                                        <>
                                        {item1.id == 5 && item.openEnquiriesResponse.enquiryStageId == 5
                                        ?
                                            <>
                                                {this.state.innerEnquiryStages.map((item2) => 
                                                    <>
                                                    <Col className="col-xs-7 mb7 text-left">
                                                    {item2.id <=  item.openEnquiriesResponse.innerEnquiryStageId  ?  <div className="greenButtonstatus"></div> :<></> }
                                                    {item2.id > (item.openEnquiriesResponse.innerEnquiryStageId+1) ?  <div className="greyButtonstatus"></div> :<></> }
                                                    {item2.id == (item.openEnquiriesResponse.innerEnquiryStageId+1) ?  <div className="blueButtonstatus"></div> :<></> }
                                                    {item2.stage}
                                                    </Col>
                                                    <Col className="col-xs-5 mb7 h20">
                                                    {item2.id == (item.openEnquiriesResponse.innerEnquiryStageId+1) ?  <button className="markCompletedButtonprogress" onClick={this.inprogresss}>In Progress</button> :<></> }
                                                    {item2.id == (item.openEnquiriesResponse.innerEnquiryStageId+2) ?  <button className="markCompletedButton" onClick={this.stateupdate}>Start Stage</button> :<></> }

                                                    </Col>
                                                    </>
                                                )}
                                            </>
                                        :
                                        <>
                                        {item1.id == 5
                                        ?
                                        <>
                                    {
                                        this.state.innerEnquiryStages.map((item2) => 
                                        <>
                                            <Col className="col-xs-7 mb7 text-left">
                                        {item.openEnquiriesResponse.enquiryStageId == 4 && item2.id == 1 ?  <div className="blueButtonstatus"></div> :<></> }
                                        {item.openEnquiriesResponse.enquiryStageId == 4 && item2.id != 1 ?  <div className="greyButtonstatus"></div> :<></> }
                                        {item.openEnquiriesResponse.enquiryStageId > 5 ?  <div className="greenButtonstatus"></div> :<></> }
                                        {item.openEnquiriesResponse.enquiryStageId < 4 ?  <div className="greyButtonstatus"></div> :<></> }
                                        {item2.stage}
                                        </Col>
                                        <Col className="col-xs-5 mb7 h20">
                                        {item.openEnquiriesResponse.enquiryStageId == 4 && item2.id == 1 ?  <button className="markCompletedButton" onClick={this.stateupdate}>Mark Completed</button> :<></> }
                                        {item.openEnquiriesResponse.enquiryStageId == 5 && item2.id == 1 ?  <button className="markCompletedButton" onClick={this.stateupdate}>Mark Completed</button> :<></> }

                                        </Col>
                                        </>
                                        )
                                        }
                                    </>
                                        :
                                        <>
                                            <Col className="col-xs-7 mb7 text-left">

                                                {item1.id <= this.state.progressid ?  <div className="greenButtonstatus"></div> :<></> }
                                                {item1.id > (this.state.progressid+1) ?  <div className="greyButtonstatus"></div> :<></> }
                                                {item1.id == (this.state.progressid+1) ?  <div className="blueButtonstatus"></div> :<></> }
                                                    {item1.desc}
                                            </Col>
                                            <Col className="col-xs-5 mb7 h20">
                                                {}
                                                {item1.id == 6 && item.openEnquiriesResponse.enquiryStageId == 5 && item.openEnquiriesResponse.innerEnquiryStageId == 4 ? <button className="markCompletedButton" onClick={this.stateupdate}>Complete</button>:<></>}
                                                {item1.id == (this.state.progressid+1) ?<button className="markCompletedButton" onClick={this.stateupdate}>Mark Completed</button> :<></> }

                                            </Col>
                                        </>

                                         }
                                   
                                    </>
                                    }
                                    </>
                                
                                         
                                    :
                                    <>
                                    </>
                                 )} 
                                </>
                                }
                                
                               
                            </Row>
                            <br></br>
                         
                            
                        </div>
                        </div>
                    </div>

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
                                 
                                  <div noGutters={true} >
                                  <Col >
                                      <span className="leEnqtype bold ">{this.state.productCategories[item.openEnquiriesResponse.productCategoryHistoryId - 1]?
                                      this.state.productCategories[item.openEnquiriesResponse.productCategoryHistoryId - 1].productDesc:""} </span> 
                                      <span className="leEnqspun"> / {item.openEnquiriesResponse.warpYarnHistoryId ? this.state.yarns[item.openEnquiriesResponse.warpYarnHistoryId - 1 ].yarnDesc : "NA"}  X  {item.openEnquiriesResponse.weftYarnHistoryId ? this.state.yarns[item.openEnquiriesResponse.weftYarnHistoryId - 1 ].yarnDesc : "NA"}  
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
                                          {this.props.t("Pages.object.Product Code")} : {item.openEnquiriesResponse.productHistoryCode}   
                                          </>
                                          :
                                          <>
                                          {this.props.t("Pages.object.Product Code")} : NA  
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
                                 
                                </div>
                            </Col>
                            <Col sm="3" className="text-right">
                                <div noGutters={true} >
                                      <Col className="leEnqOrderAmount ">
                                      {this.props.t("Pages.object.Order Amount")}
                                      </Col>
                                </div>
                                <div noGutters={true} >
                                      <Col className="leEnqAmount bold">
                                        {item.openEnquiriesResponse.totalAmount > 0 ? "₹"+ item.openEnquiriesResponse.totalAmount : "NA"} 
                                      </Col>
                                </div>
                                <div noGutters={true} >
                                      <Col className="leEnqidDateStarted">
                                      {this.props.t("Pages.object.Date started")} : 
                                      <Moment format="DD-MM-YYYY">
                                        {item.openEnquiriesResponse.startedOn}
                                        </Moment>
                                      </Col>
                                </div>
                                <div noGutters={true} >
                                      <Col className="leEnqidLastUpdated">
                                      {this.props.t("Pages.object.Last updated")} : 
                                      <Moment format="DD-MM-YYYY">
                                     {item.openEnquiriesResponse.lastUpdated}
                                        </Moment>
                                        
                                      </Col>
                                </div>
                                <div noGutters={true} >
                                      <Col className="leEnqidEstDelivery">
                                      {this.props.t("Pages.object.Est Date of delivery")} : 
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
                           {this.props.t("Pages.object.Enquiry Status")}

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
                            {this.state.enquiryStagesAvailable.map((item1) => <li key={item1.orderStages.id} className={item.openEnquiriesResponse.enquiryStageId == item1.orderStages.id ? "is-active": " "} >{item1.orderStages.desc}</li> )     }
                    
                            </ul>
                            :
                            <>
                            {
                               (item.openEnquiriesResponse.changeRequestStatus == 1) || (item.openEnquiriesResponse.changeRequestStatus == 3)
                                    ?
                                    <img src={logos.cricon} className="cricon"></img>
 
                                    :
                                    null
 
                                }
                            { item.isBlue== 1
                                ?
                                <>
                                 <ul className="list-unstyled multi-steps">
                            {this.state.enquiryStagesMTO.map((item1) => 
                            <li key={item1.id} className={item.openEnquiriesResponse.enquiryStageId + 1 == item1.id ? "is-active wait": " "} >{}{item.openEnquiriesResponse.enquiryStageId == 5 && item1.id == 5 && item.openEnquiriesResponse.innerEnquiryStageId < 5 ? <> Work in Progress<br></br>
                            {this.state.innerEnquiryStages[item.openEnquiriesResponse.innerEnquiryStageId - 1].stage}
                            <br></br>
                            <span className="seemore" onClick={()=>{this.ToggleDelete22(item.openEnquiriesResponse.enquiryId)}}>see more</span>
                            </> : item1.desc}</li>
                             )     }
                            <li >Completed</li>
                            </ul>
                                </>
                                :
                                <ul className="list-unstyled multi-steps">
                                {this.state.enquiryStagesMTO.map((item1) => 
                                <li key={item1.id} className={item.openEnquiriesResponse.enquiryStageId == item1.id ? "is-active": " "} >{}{item.openEnquiriesResponse.enquiryStageId == 5 && item1.id == 5 && item.openEnquiriesResponse.innerEnquiryStageId < 5 ? <> Work in Progress<br></br>
                                {this.state.innerEnquiryStages[item.openEnquiriesResponse.innerEnquiryStageId - 1].stage}
                                <br></br>
                                <span className="seemore" onClick={()=>{this.ToggleDelete22(item.openEnquiriesResponse.enquiryId)}}>see more</span>
                                </> : item1.desc}</li>
                                 )     }
                                <li >Completed</li>
                                </ul>
                            
                            }
                           
                            </>
                                }

                            </div>
                                                                                
                    <div id={"id09"+item.openEnquiriesResponse.enquiryId} class="w3-modal">
                        <div class="w3-modal-content w3-animate-top modalBoxSizeCS">
                            <div>
                            <Row noGutters={true}>
                                <Col className="col-xs-12 CSheading">
                                   
                                </Col>
                            </Row>
                            </div>
                        <div class="w3-container">
                            <span 
                            onClick={()=>{this.ToggleDeleteClose22(item.openEnquiriesResponse.enquiryId)}} 
                            class="w3-button w3-display-topright cWhite">x</span>
                            <br></br>
                            <Row noGutters={true}>
                                {item.openEnquiriesResponse.productStatusHistoryId === 2
                                ?
                                <>  
                                {item.openEnquiriesResponse.enquiryCode}
                                </>
                                :
                                <>
                                 {this.state.innerEnquiryStages.map((item1) => 
                                   
                                    <Col className="col-xs-12 mb7">
                                        {item1.id <= (item.openEnquiriesResponse.innerEnquiryStageId) ?  <div className="greenButtonstatus"></div> :<div className="greyButtonstatus"></div> } 
                            
                                    {item1.stage }
                                    </Col>
                                    
                                    )} 
                                </>
                                }
                                
                               
                                </Row>
                              
                                <br></br>
                                
                            </div>
                            </div>
                        </div>
 
                           
                           </Col>
                       </Row>
                    </Col>
                </Row>
                    <Row noGutters={true} className="text-center">
                   {this.state.progressid < 3 || this.state.progressid == 10 ||this.state.progressid == 6 ||this.state.progressid == 7||(this.state.progressid == 10 && item.openEnquiriesResponse.productStatusId == 2)
                   ||(this.state.progressid == 3 && item.openEnquiriesResponse.productStatusId == 2)
                    ? 
                     <></>
                   :
                   <button
                     className="blackButton"
                     onClick={this.ToggleDelete}
                    >
                     {this.props.t("Pages.object.change status")}
                   </button>
                     }   
                   
                    <div id="id01" class="w3-modal">
                        <div class="w3-modal-content w3-animate-top modalBoxSizeCSCR">
                            <div>
                            <Row noGutters={true}>
                                <Col className="col-xs-12 CSheading">
                                {this.props.t("Pages.object.change status")}
                                </Col>
                            </Row>
                            </div>
                        <div class="w3-container">
                            <span 
                            onClick={this.ToggleDeleteClose} 
                            class="w3-button w3-display-topright cWhite">x</span>
                            <br></br>
                            <Row noGutters={true}>
                                {item.openEnquiriesResponse.productStatusHistoryId === 2
                                ?
                                <>
                                 {this.state.enquiryStagesAvailable.map((item1) => 
                                    item1.orderStages.id > 3 
                                    ?
                                    <>
                                    <Col className="col-xs-7 mb7 text-left">
                                        {item1.orderStages.id < this.state.Progressidnext ?  <div className="greenButtonstatus"></div> :<></> }
                                        {item1.orderStages.id > (this.state.Progressidnext) ?  <div className="greyButtonstatus"></div> :<></> }
                                        {item1.orderStages.id == (this.state.Progressidnext) ?  <div className="blueButtonstatus"></div> :<></> }
                                 {" "}{item1.orderStages.desc}
                                    </Col>
                                     <Col className="col-xs-5 mb7">
                                      {item1.orderStages.id == (this.state.Progressidnext) ?  <button className="markCompletedButton" onClick={this.stateupdate}> Mark Completed</button> :<></> }
                                    </Col>
                                 </>
                                    :
                                    <>
                                    </>
                                 )}   
                                </>
                                :
                                <>
                                 {this.state.enquiryStagesMTO.map((item1) => 
                                    item1.id > 3
                                    ?
                                        <>
                                        {item1.id == 5 && item.openEnquiriesResponse.enquiryStageId == 5
                                        ?
                                            <>
                                                {this.state.innerEnquiryStages.map((item2) => 
                                                    <>
                                                    <Col className="col-xs-7 mb7 text-left">
                                                    {item2.id <=  item.openEnquiriesResponse.innerEnquiryStageId  ?  <div className="greenButtonstatus"></div> :<></> }
                                                    {item2.id > (item.openEnquiriesResponse.innerEnquiryStageId+1) ?  <div className="greyButtonstatus"></div> :<></> }
                                                    {item2.id == (item.openEnquiriesResponse.innerEnquiryStageId+1) ?  <div className="blueButtonstatus"></div> :<></> }
                                                    {item2.stage}
                                                    </Col>
                                                    <Col className="col-xs-5 mb7 h20">
                                                    {item2.id == (item.openEnquiriesResponse.innerEnquiryStageId+1) ?  <button className="markCompletedButtonprogress" onClick={this.inprogresss}>In Progress</button> :<></> }
                                                    {item2.id == (item.openEnquiriesResponse.innerEnquiryStageId+2) ?  <button className="markCompletedButton" onClick={this.stateupdate}>Start Stage</button> :<></> }

                                                    </Col>
                                                    </>
                                                )}
                                            </>
                                        :
                                        <>
                                        {item1.id == 5
                                        ?
                                        <>
                                    {
                                        this.state.innerEnquiryStages.map((item2) => 
                                        <>
                                            <Col className="col-xs-7 mb7 text-left">
                                        {item.openEnquiriesResponse.enquiryStageId == 4 && item2.id == 1 ?  <div className="blueButtonstatus"></div> :<></> }
                                        {item.openEnquiriesResponse.enquiryStageId == 4 && item2.id != 1 ?  <div className="greyButtonstatus"></div> :<></> }
                                        {item.openEnquiriesResponse.enquiryStageId > 5 ?  <div className="greenButtonstatus"></div> :<></> }
                                        {item.openEnquiriesResponse.enquiryStageId < 4 ?  <div className="greyButtonstatus"></div> :<></> }
                                        {item2.stage}
                                        </Col>
                                        <Col className="col-xs-5 mb7 h20">
                                        {item.openEnquiriesResponse.enquiryStageId == 4 && item2.id == 1 ?  <button className="markCompletedButton" onClick={this.stateupdate}>Mark Completed</button> :<></> }
                                        {item.openEnquiriesResponse.enquiryStageId == 5 && item2.id == 1 ?  <button className="markCompletedButton" onClick={this.stateupdate}>Mark Completed</button> :<></> }

                                        </Col>
                                        </>
                                        )
                                        }
                                    </>
                                        :
                                        <>
                                            <Col className="col-xs-7 mb7 text-left">

                                                {item1.id <= this.state.progressid ?  <div className="greenButtonstatus"></div> :<></> }
                                                {item1.id > (this.state.progressid+1) ?  <div className="greyButtonstatus"></div> :<></> }
                                                {item1.id == (this.state.progressid+1) ?  <div className="blueButtonstatus"></div> :<></> }
                                                    {item1.desc}
                                            </Col>
                                            <Col className="col-xs-5 mb7 h20">
                                                {}
                                                {item1.id == 6 && item.openEnquiriesResponse.enquiryStageId == 5 && item.openEnquiriesResponse.innerEnquiryStageId == 4 ? <button className="markCompletedButton" onClick={this.stateupdate}>Complete</button>:<></>}
                                                {item1.id == (this.state.progressid+1) ?<button className="markCompletedButton" onClick={this.stateupdate}>Mark Completed</button> :<></> }

                                            </Col>
                                        </>

                                         }
                                   
                                    </>
                                    }
                                    </>
                                
                                         
                                    :
                                    <>
                                    </>
                                 )} 
                                </>
                                }
                                
                               
                            </Row>
                            <br></br>
                         
                            
                        </div>
                        </div>
                    </div>

                </Row>
                </>
                 }
                 {item.openEnquiriesResponse.productStatusId==2 || item.openEnquiriesResponse.productStatusHistoryId === 2?
                <>
                    <Row >
                    <Col className="col-xs-12 text-center">
                {item.openEnquiriesResponse.enquiryStageId>=3?
                                                    <button className="gotoordernewbtn" onClick={()=>{this.gotoOrders()}}>
                                                         <img
                                                    style={{marginRight:"4px",height:"20px",marginBottom:"2px"}}
                                                    src={logos.receipticon}
                                                  ></img> Go to order</button>
                                                    :
                                                    ""
                }
                </Col>
                </Row>
                </>
                :
                                <Row >

                                    <Col className="col-xs-12 text-center">
                                    {
                                    // item.openEnquiriesResponse.enquiryStageId===4?
                                    item.isBlue==1 && item.openEnquiriesResponse.enquiryStageId<5 || item.openEnquiriesResponse.isPaymentRejected==1?
                                    <button className="gototrannewbtn" onClick={()=>{this.gotoTransaction()}}>Go to Transactions</button>
                                    :
                                    item.openEnquiriesResponse.enquiryStageId >=4?
                                    <button className="gotoordernewbtn" onClick={()=>{this.gotoOrders()}}> <img
                                    style={{marginRight:"4px",height:"20px",marginBottom:"2px"}}
                                    src={logos.receipticon}
                                  ></img> Go to Order</button>
                                    :
                                    ""
                                    }
                                    </Col>

                                </Row>
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
                                           <div ref={this.scrollPI}>Proforma Invoice</div>
                                            </Col>
                                            
                                    </Row>
                                    <br></br>

                                                       <Row noGutters={true}>
                                                           <Col sm={1}></Col>
                                                                    <Col sm={10}>
           {/* --------------------------------Buyer Detail----------------------------------------------  */}
                                                                {this.state.buyersDetail ? 
                                                                <>
                                                                
                                                                  {this.state.openEnquiries ? ( ( this.state.openEnquiries.map((data) => (
                                                                
                                                                 <>
                                                               <Row noGutters={true}>
                                                                   <Col sm={12} className="col-xs-12 BdImgCol">
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
                                                                        Min Order Qnty <strong className="requiredStar">*</strong> :
                                                                    </Col>
                                                                    <Col sm={6} className="Moqh2">
                                                                       <input 
                                                                       id="moq"
                                                                        className="width200 alignbox" 
                                                                         type="number"
                                                                       disabled={this.state.isMoqdetail} 
                                                                        value={this.state.moq }
                                                                        name="moq"
                                                                        onChange={this.handleChange}
                                                                        /> 
                                                                    </Col>
                                                                </Row>

                                                                 <Row noGutters={true} className="moqdetailCard Allenqlistbtnmt">
                                                                 <Col sm={6} className="Moqh1">
                                                                     Price/unit <strong className="requiredStar">*</strong> :
                                                                 </Col>
                                                                 <Col sm={6} className="Moqh2">
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
                                                                    Estimated delivery date <strong className="requiredStar">*</strong> :
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
                                            <span className="bg-danger">{this.state.message}</span>
                                            
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
                                                                onkeypress='validate(event)'
                                                                    onClick={() => this.saveMoqDetails()} >Save</button>}
                                                                    
                                                                 </Col>
                                                                 <Col sm={6} className="">
                                                                 {this.state.isSend== 1?
                                                                 <button className="sendmoqbtn"                    
                                                                  disabled >Send</button>
                                                                   : 
                                                                   <button className="sendmoqbtn" disabled={this.state.sendButtonClick}
                                                                   onClick={() => this.sendMoqDetails()}
                                                                   onkeypress='validate(event)'
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
                                        enquiryCode={this.state.openEnquiries[0].openEnquiriesResponse.enquiryCode}
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
                                                            <label>Quantity <strong className="requiredStar">*</strong></label>
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
                                                        <label >Rate per unit(or metre) <strong className="requiredStar">*</strong></label>
                                                        <br/>
                                                       
                                                    ₹ <input type="number"  className="PIinput  rsinputboxwidth"
                                                        disabled={this.state.isPidetail}
                                                        value={this.state.rpu }
                                                        name="rpu"
                                                        onChange={this.handleChange} />
                                                        </Col>
                                                    </Row>
                                                    <Row noGutters={true} className="PIcol2mt BdImgCol">
                                                    <Col sm={6}>
                                                    <label>Expected date of delivery <strong className="requiredStar">*</strong></label>
                                                    <br/>
                                                        {/* <input className="PIinput" type="date"
                                                        disabled={this.state.isPidetail}
                                                        value={this.state.dod}
                                                        name="dod"
                                                        onChange={this.handleChange}
                                                        placeholder="YYYY-MM-DD"
                                                        /> */}
                                                       {this.state.isPidetail?
                                                       <input className="PIinput" type="date"
                                                       disabled={this.state.isPidetail}
                                                       value={this.state.dod}
                                                       name="dod"
                                                       placeholder={this.state.dod?this.state.dod:"Select a date"}
                                                       />
                                                       :
                                                        <ModernDatepicker
                                                         className="PIinput"
                                                        date={this.state.dod}
                                                        format={'YYYY-MM-DD'}
                                                        showBorder
                                                        value={this.state.dod}
                                                        name="dod"
                                                        onChange={date => this.handleChangeDate(date)}
                                                        // placeholder={'Select a date'}
                                                    />
                                                       }
                                                       

                                                    </Col>
                                                    <Col sm={6}>
                                                    <label>HSN Code <strong className="requiredStar">*</strong></label>
                                                    <br/>
                                                        <input className="PIinput" type="number"
                                                        disabled={this.state.isPidetail}
                                                        value={this.state.hsncode }
                                                        maxlength="1"
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
                                                enquiryCode={this.state.openEnquiries[0].openEnquiriesResponse.enquiryCode}
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
                                                MOQ details are not submitted/accepted yet
                                                 </Col>
                                                </Row>
                                     
                                     </>}

                                        </>
                                        }
                                                        

                                                             </>
                                                             :null
                                                             }
 {/* ----------------------------------------------------------------------------------------------                   */}
                                                            {this.state.changeRequest ?  <div>
                                                               
                                                            </div>:null}

                                                            {this.state.qualityCheck ?  <div>
                                                            <h6>qualityCheck...</h6>
                                                            </div>:null}
                                                            
                                                            </Col>
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
    const { user } = state
    return { user };
}

const connectedLoginPage = connect(mapStateToProps)(SingleEnquiry);
export default withTranslation()(connectedLoginPage);

