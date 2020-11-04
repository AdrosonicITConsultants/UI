

import React, { Component } from 'react'
import { memoryHistory, browserHistory } from "../../helpers/history";
import { Row, Col , Container, Button} from 'reactstrap';
import { connect } from "react-redux";
import NavbarComponent from "../navbar/navbar";
import logos from "../../assets";
import queryString from 'query-string';
import TTCEapi from '../../services/API/TTCEapi';
import customToast from "../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Moment from 'react-moment';
import Footer from "../footer/footer";
import { BuyerPreviewInvoice } from './BuyerPreviewInvoice';
import "./BuyerSingleEnquiry.css";
import { BuyerPIPrintTable } from './BuyerPIPrintTable';


export class BuyerSingleEnquiry extends Component {
    constructor() {
        super();
        this.scrollPI = React.createRef();
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
            getMoqs:[],
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
             getMoqs:[],
             acceptingmoq:false,
             acceptingmoqtext:true,
             visiblecardmoq:false,
             moqavailable:false,
             collapseId: -1,
             collapseIdNew: -1,
             disableCheckId: "",
             enquiryCode: "",
             MoqSelected : [],
             selectedArtisanId: 0,
             selectedMOQId: 0,
             modalOksend:false,
             innerEnquiryStages:[],
             clickedAccept:false

        }
    }
   
    ToggleSave = () => {
        document.getElementById('id02').style.display='block';
       }

       ToggleSaveClose = () => {
        document.getElementById('id02').style.display='none';
       }
    getcollapseId = activecollapse => {
        if (activecollapse !== this.state.collapseId) {
          this.setState({
            collapseId: activecollapse
          });
        } else {
          this.setState({
            collapseId: -1
          });
        }
    }
    ToggleDelete22 = (id) => {
        document.getElementById('id09'+ id).style.display='block';
       }

       ToggleDeleteClose22 = (id) => {
        document.getElementById('id09'+ id).style.display='none';
       }
    getcollapseIdNew = activecollapse => {
        if (activecollapse !== this.state.collapseIdNew) {
          this.setState({
            collapseIdNew: activecollapse
          });
        } else {
          this.setState({
            collapseIdNew: -1
          });
        }
    }

    toggleArrow = (id) => {
        this.setState({ collapse: !this.state.collapse }, () => {
          this.getcollapseId(id);
          this.setState({ show: !this.state.show });
          //console.log(this.props.data.id);
        });
    };

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
        browserHistory.goBack();
    } 

    handleCluster(e) {
        var index = e.target.selectedIndex;
        var optionElement = e.target.childNodes[index];
        var option =  optionElement.getAttribute('moqId');
        
      }

      handleMoqEdit(){
        
            this.setState({
                isMoqdetail:!this.state.isMoqdetail
                
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
        console.log(value);
        this.setState({ [name]: value}, () => {
        //   console.log(this.state.moq);
        });
    }
   
       ToggleDelete1 = () => {
        document.getElementById('id02').style.display='block';
       }

       ToggleDeleteClose1 = () => {
        document.getElementById('id02').style.display='none';
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
      });
      
      }
    } 
    handleDeleteItem(id){
        TTCEapi.deleteMoq(id).then((response)=>{
            console.log(id);
            if (response.data.valid) {
                customToast.success("MOQ removed!", {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: true,
                });
                this.setState({deleteMoq : response.data},()=>{
                    console.log(this.state.deleteMoq);
                    document.getElementById('DeleteMoQ').style.display='none';
                    this.componentDidMount();        
             
                });
            }
            else{
                customToast.error(response.data.errorMessage, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true,
                  });
            }
           
        
        });    
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
            customToast.success("MOQ Details sent successfully", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: true,
              });
        });
      
    } 
    else{
        this.setState({
            showValidationMoq: true,
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
        console.log(params);
        this.state.enquiryCode = params.code;
        TTCEapi.getMoq(params.code).then((response)=>{
            console.log(response)
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
                moq:response.data.data.moq,
                ppu:response.data.data.ppu,
                deliveryDesc:response.data.data.deliveryTimeId,
                additionalInfo:response.data.data.additionalInfo,
                isSend:response.data.data.isSend,
          },()=>{
        
            });
        }
           
        });
        
        TTCEapi.getMoqDeliveryTimes().then((response)=>{
         this.setState({getMoqDeliveryTimes : response.data.data},()=>{
             console.log(this.state.getMoqDeliveryTimes);
            TTCEapi.getMoqs(params.code).then((response)=>{
                if(response.data.valid)
                {
                    console.log("bhabhkkkk");
                    console.log(response.data.data.length);
                    if(response.data.data.length==0)
                    {
                        this.setState({getMoqs:response.data.data,moqavailable:false})
    
                    }
                  else{
                    this.setState({getMoqs:response.data.data,moqavailable:true})
                  }
                    console.log(this.state.getMoqs);
                    
    
                }
            })
        
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
                                                    gpayupi : response.data.data[0].paymentAccountDetails[items].accNo_UPI_Mobile, 
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
                                console.log(this.state.getEnquiryMoq);
                                if(localStorage.getItem("piShow") === "1") {
                                    this.viewPI();
                                    localStorage.removeItem("piShow");
                                }
                            });
                        });
                    });
            }
        })
        TTCEapi.getEnquirStages().then((response)=>{
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
                console.log(response.data.data);
                this.setState({innerEnquiryStages:response.data.data})
            }
        })
     }

AcceptMoq(moqId,artisanId){
    let params = queryString.parse(this.props.location.search);
        console.log(params);
    this.setState({ 
        collapse: !this.state.collapse,
        clickedAccept:true,
        // collapse:false,
        collapseNew: !this.state.collapseNew,
        disableCheckId: artisanId,
        selectedArtisanId: artisanId,
        selectedMOQId: moqId,
    }, () => {
        this.getcollapseIdNew(artisanId);
        this.setState({ showNew: !this.state.showNew });
        //console.log(this.props.data.id);
    });
       
    this.setState({acceptingmoq:true});
    TTCEapi.MoqSelected(params.code,moqId,artisanId).then((response)=>
    {
        if(response.data.valid)
        {
            this.setState({MoqSelected:response.data.data,acceptingmoqtext:false })
            setTimeout(function() { //Start the timer
                this.setState({render: true})
                 //After 3 second, set render to true
                 this.componentDidMount()
            }.bind(this), 3000)
            console.log(this.state.MoqSelected);



        }
    })
}     


MoqSimpleProductSelected(moqId){
    this.setState({ modalOksend:true})
    let params = queryString.parse(this.props.location.search);
        console.log(params);
    TTCEapi.MoqSimpleProductSelected(params.code,moqId).then((response)=>{
        if(response.data.valid)
        {
            this.setState({MoqSimpleProductSelected:response.data.data })
            document.getElementById('acceptMOQModal').style.display='none';
              document.getElementById('confirmMOQModal').style.display='block';

            console.log(this.state.MoqSimpleProductSelected);

        }
        else{
            this.setState({
                modalOksend:true
            })
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
        this.componentDidMount()
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
                    {/* for no change in product data */}
                    <hr></hr>
                <Row noGutters={true} >
                    <Col className="col-xs-1"></Col>
                    <Col className="col-xs-10">
                        <Row noGutters={true}>
                            <Col sm="9">
                                <div className="imageinlist" > 
                                <div className="imageinlist1"> 
                                {
                                 item.openEnquiriesResponse.productType === "Product"
                                 ?
                                <a href={"/showBArtisanProduct?productId="+item.openEnquiriesResponse.productId }><img  src={TTCEapi.ImageUrl +"Product/" + item.openEnquiriesResponse.productId + "/" + item.openEnquiriesResponse.productImages.split(",")[0]} className="enquiryimage"></img>
                                </a>
                                 :
                                 <a href={"/showBuyerProduct?productId="+item.openEnquiriesResponse.productId }><img  src={TTCEapi.ImageUrl +"CustomProduct/" + item.openEnquiriesResponse.productId + "/" + item.openEnquiriesResponse.productImages.split(",")[0]} className="enquiryimage"></img>
                                 </a>

                                    }

                                    </div>
                                        
                                <a href={"/showBArtisanProduct?productId="+item.openEnquiriesResponse.productId } className="leEnqprodName">{item.openEnquiriesResponse.productName}</a>
                                </div>
                                <div>
                                <div noGutters={true} >
                                    <Col className="leEnqid bold">
                                    Enquiry Id : {item.openEnquiriesResponse.enquiryCode}
                                    </Col>
                                </div>
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
                    <Col className="col-xs-12">
                    <Row noGutters={true}>
                        <Col className="col-xs-12 ">
                        <div className="progressbarfont">
                            <br /><br />
                            {item.openEnquiriesResponse.productStatusId === 2
                            ?
                            <ul className="list-unstyled multi-steps">
                            {this.state.enquiryStagesAvailable.map((item1) => <li key={item1.id} className={item.openEnquiriesResponse.enquiryStageId == item1.orderStages.id ? "is-active": " "} >{item1.orderStages.desc}</li> )     }
                            <li >Completed</li>
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
                            {console.log(item.openEnquiriesResponse.productStatusId)}
                            {item.openEnquiriesResponse.productStatusId === 2
                            ?
                            <>  
                            {item.openEnquiriesResponse.enquiryCode}
                            </>
                            :
                            <>
                             {this.state.innerEnquiryStages.map((item1) => 
                               
                                <Col className="col-xs-12 mb7">
                                     {/* {console.log(item1.id  , item.openEnquiriesResponse.innerEnquiryStageId)}  */}
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
              
                </>
                :
                <>
                
                  <hr></hr>
                <Row noGutters={true}>
                    <Col className="col-xs-1"></Col>
                    <Col className="col-xs-10">
                        <Row noGutters={true}>
                            <Col sm="9">
                                <div className="imageinlist" > 
                                <div className="imageinlist1"> 
                                {
                                    item.openEnquiriesResponse.productType === "Product"
                                    ?
                                    <a href={"/showBArtisanProduct?ProductHistoryId="+item.openEnquiriesResponse.historyProductId }><img  src={TTCEapi.ImageUrl +"HistoryProduct/" + item.openEnquiriesResponse.historyProductId + "/" + item.openEnquiriesResponse.productHistoryImages.split(",")[0]} className="enquiryimage"></img>
                                    </a>
                                    :
                                    <a href={"/showBuyerProduct?ProductHistoryId="+item.openEnquiriesResponse.historyProductId }><img  src={TTCEapi.ImageUrl +"HistoryCustomProduct/" + item.openEnquiriesResponse.historyProductId + "/" + item.openEnquiriesResponse.productHistoryImages.split(",")[0]} className="enquiryimage"></img>
                                    </a>

                                }

                                </div>
                                
                                <a href={"/showBArtisanProduct?ProductHistoryId="+item.openEnquiriesResponse.historyProductId } className="leEnqprodName">{item.openEnquiriesResponse.productHistoryName}</a>
                                {/* <span ></span> */}
                                   
                                </div>
                                <div>
                                <div noGutters={true} >
                                    <Col className="leEnqid bold">
                                    Enquiry Id : {item.openEnquiriesResponse.enquiryCode}
                                    </Col>
                                </div>
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
                            {this.state.enquiryStagesAvailable.map((item1) => <li key={item1.id} className={item.openEnquiriesResponse.enquiryStageId == item1.orderStages.id ? "is-active": " "} >{item1.orderStages.desc}</li> )     }
                            <li >Completed</li>
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
                            {/* {this.state.innerEnquiryStages[item.openEnquiriesResponse.innerEnquiryStageId -1].stage} */}
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
                                {/* {this.state.innerEnquiryStages[item.openEnquiriesResponse.innerEnquiryStageId -1].stage} */}
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
           
                </>
                }

                 <br></br>
                <Row>
                    <Col className="col-xs-6">
                    <button className=" closedEnquirybtn"
                     onClick={this.ToggleSave}
                    
                                       >
                                <img src={logos.cancelenq} className="closeenqimg"></img>
                                Close Enquiry
                                </button>
                                    <div id="id02" class="w3-modal">
                                      <div class="w3-modal-content w3-animate-top modalBoxSize">
                                        <div class="w3-container">
                                          <h3 className="deleteModalHeadermoq">Are you sure you want to close this enquiry ?</h3>
                                          <p className="deleteModalPara"></p>
                                          <div className="deleteModalButtonOuterDiv">
                                            <span onClick={this.ToggleSaveClose} className="deleteModalCancelButton">Cancel</span>
                                            <span onClick={()=>{this.markcompleted()}} className="saveModalOkayButton">Yes</span>
                                          </div>
                                        </div>
                                      </div>
                                     </div>
                                    
                    </Col>
                    <Col className="col-xs-6">
                    <button className="completedenqButton"
                                       onClick={()=>{this.markcompleted()}}
                                       disabled = {this.state.progressid != 10}

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
                                            <Col sm={3}  
                                            className={
                                                (this.state.selected == "BuyerDetails"
                                                     ? "Allenqlistbtn2 ml60"
                                                         : "Allenqlistbtn ml60")
                                                     }
                                            onClick={this.buyersDetailsbtn}>
                                            Artisan's Detail
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
{/* ------------------------------------------------MOQ start--------------------------------------------------- */}

                            {this.state.moqDetail? 
                            <>
                            {this.state.getMoqs.length > 0 ?
                            <>
                           
                            {this.state.getEnquiryMoq[0].openEnquiriesResponse.productType=="Custom Product"?
                                <>
                                  { this.state.getEnquiryMoq[0].openEnquiriesResponse.isMoqSend == null ?
                                        <>
                                            {this.state.moqavailable?
                                                <>
                                                {console.log("Moq available")}
                                                  {console.log(this.state.moqavailable)}
                      <>
                                            <Row noGutters={true}>
                                                <Col sm={1}></Col>
                                                <Col sm={10}>
                                                <h1 className="receivedmoqh1">Received MOQ</h1>
                                                </Col>
                                            </Row>
                                            <Col sm={1}></Col>
                                 <Col sm={10}>
                                 
                                 {this.state.getMoqs  ? ( ( this.state.getMoqs.map((data,key) => ( 
                                      <> 
   

                            
                                 <Row noGutters={true} style={{overflow:"auto"}}>
                                 <table className="MOqtable" style={{width:"100%",marginTop:"15px"}}>
                                        <tr className="borderleftblue rowmaxheight">
                                        <td className="recmoqcol1">
                                            <Row noGutters={true} >
                                              
                                                 <Col className="col-xs-12 " sm={12} md={4} >
                                                 {data.logo?
                                                <img className="Receivemoqbrandimg" src={TTCEapi.ImageUrl+'User/'+data.artisanId+'/CompanyDetails/Logo/'+data.logo}/>
                                                    :
                                                    <img className="BdImg profileImage" src={logos.Smile} />
                                                   }
                                                  
                                                </Col>

                                                <Col className="col-xs-12 colright" sm={12} md={8}>
                                          <p className="Artisianbrandh">Artisian Brand :<span style={{color:"cornflowerblue"}}> 
                                          {data.brand}
                                          </span> </p>
                                                    <span className="regionmoq"> 
                                                    {data.clusterName}
                                                    </span>
                                                </Col>
                                            </Row>
                                        </td>
                                        <td className="recmoqcol2">
                                        <Row noGutters={true}>
                                                 <Col className="col-xs-12 tdclasscss">
                                                    <p className="theading">MOQ</p>
                                                       {data.moq.moq}
                                                </Col>
                                            </Row>
                                        </td>
                                        <td>
                                        <Row noGutters={true}>
                                        <Col className="col-xs-12 tdclasscss">
                                        <p className="theading">Price/unit(or m)</p>
                                      
                                        {data.moq.ppu}
                                                </Col>
                                            </Row>
                                         </td>
                                        <td>
                                        <Row noGutters={true}>
                                        <Col className="col-xs-12 tdclasscss">
                                        <p className="theading">ETA Delivery</p>
                                        {this.state.getMoqDeliveryTimes[data.moq.deliveryTimeId-1].days} Days
                                                </Col>
                                            </Row>
                                        </td>
                                        <td>
                                        <Row noGutters={true} onClick={() => {  }}>
                                        <Col className="col-xs-12 readmored" >

                                          <p className="recheading"  >Received
                                          <Moment format=" DD-MM-YYYY">
                                          {data.moq.createdOn}
                                            </Moment> :
                                          <Moment format=" h:mm a">
                                          {data.moq.createdOn}
                                            </Moment>
                                          </p>
                                        {this.state.collapseId == data.artisanId  ?
                                            this.state.clickedAccept?
                                            <div >  
                                            Read More <i class="fa fa-angle-down fa-lg" aria-hidden="true"></i>  
                                            </div> 
                                            :
                                        <div onClick={() => this.toggleArrow(data.artisanId)}>
                                        Collapse <i class="fa fa-angle-up fa-lg" aria-hidden="true"></i>  
                                        </div> 
                                        : 
                                        this.state.clickedAccept?
                                        <div >  
                                         Read More <i class="fa fa-angle-down fa-lg" aria-hidden="true"></i>  
                                         </div> 
                                        :

                                        <div onClick={() => this.toggleArrow(data.artisanId)} >  
                                       
                                       Read More <i class="fa fa-angle-down fa-lg" aria-hidden="true"></i>  
                                        </div> }
                                        

                                        </Col>
                                    </Row>
                                        </td>
                                        {this.state.collapseId == data.artisanId?
                                        ""
                                        :
                                        <td>
                                        <Row noGutters={true}>
                                        <Col className="col-xs-12 tdclasscss">
                                       
                                        <i class="fa fa-minus-circle" aria-hidden="true" style={{color:"red"}}
                                        onClick={this.ToggleDelete1}></i>
                                                </Col>
                                            </Row>

                                          
                                        </td>
                                        }
                                       
                                       {this.state.disableCheckId == ""? 
                                    
                                        <td className={this.state.collapseId == data.artisanId? "acceptmoqbtnlg":"acceptmoqbtn"} 
                                         onClick={() => this.AcceptMoq(data.moq.id,data.artisanId)}
                                       
                                         >
                                        <Row noGutters={true} >
                                                <Col className="col-xs-12 ">
                                               <img src={logos.acceptsmall} style={{height:"15px",marginRight:"5px"}}/>

                                                    Accept
                                            </Col>
                                        </Row>
                                       </td> :
                                       <td className={this.state.collapseId == data.artisanId? "acceptmoqbtnlg":"acceptmoqbtnDisable"}>
                                       <Row noGutters={true} >
                                               <Col className="col-xs-12 ">
                                         <img src={logos.acceptsmall} style={{height:"15px",marginRight:"5px"}}/>
                                                   Accept
                                           </Col>
                                       </Row>
                                       </td>  }
                                    </tr>
                                   
                                    </table>

                                    {this.state.collapseId == data.artisanId ?
                                           <>
                                           {this.state.clickedAccept?"":
                                           <>
                                           <div className="readmorediv">
                                              <p><b>Note from Artisan</b></p>
                                              {data.moq.additionalInfo?data.moq.additionalInfo:""}
                                              </div>
                                           </>}
                                              </>
                                             :null}
                                         {/* ----------------Accepting Readmore------------------    */}
                                         {this.state.collapseIdNew == data.artisanId ? 
                                           <>
                                             <div 
                                             className={this.state.acceptingmoqtext?"acceptingloader" : "acceptedloader"}>
                                             <img src={logos.acceptsmall} style={{height:"15px",marginRight:"5px"}}/>
                                            {this.state.acceptingmoqtext ?  "Accepting..." : "Accepted"} 
                                             </div>
                                              <div className="readmorediv">
                                              <p><b>Note from Artisan</b></p>
                                              {data.moq.additionalInfo?data.moq.additionalInfo:""}
                                              </div>
                                              </>
                                             :null }

                                     {/* ----------------Accepting Readmore ends------------------    */}
                                          
                                     </Row>
                               
                                 </>
        
                                      ) )  )): 
                                      null}
                                      </Col>
                                                    </>
                                               </>
                                                :
                                                  <>
                                                                <Row>
                                                                    <br></br>
                                                                    <br></br>
                                                                    <br></br>   
                                                                    <Col className="col-xs-12 text-center font14">
                                                                        MOQ not finalised for this Custom Product yet.
                                                                    </Col>
                                                                </Row>
                                                </>
                                                }
                                        </>
                                        :
                                        <>
                                        {this.state.getMoqs  ? this.state.getMoqs.map((data,key) => {
                                         return   data.accepted === true ?
                                       
                                              <Row noGutters={true} >  
                                                    {/* <Col sm={1}></Col>                                         */}
                                                <Col sm={10}>
                                                <Row noGutters={true} className="moqdetailCard Allenqlistbtnmt">
                                                <Col sm={6} className="Moqh1 Moqbuyerh1">
                                                    Min Order Qnty:
                                                </Col>
                                                <Col sm={6} className="Moqh2 ">
                                                <input 
                                                id="moq"
                                                className="width200 alignbox" 
                                                type="number"
                                                disabled={this.state.isMoqdetail} 
                                                    value={data.moq.moq}
                                                    name="moq"
                                                    onChange={this.handleChange}/> 
                                                </Col>
                                                </Row>

                                                <Row noGutters={true} className="moqdetailCard Allenqlistbtnmt2">
                                                <Col sm={6} className="Moqh1 Moqbuyerh1">
                                                Price/unit:
                                                </Col>
                                                <Col sm={6} className="Moqh2">
                                                {/* <i class="fa fa-inr" aria-hidden="true"></i>  */}
                                                <input 
                                                id="ppu"
                                                className="width200 alignbox2"
                                                type="text"
                                                disabled={this.state.isMoqdetail} 
                                                value={data.moq.ppu}
                                                name="ppu"
                                                onChange={this.handleChange}
                                                /> 

                                                </Col>
                                                </Row>

                                                <Row noGutters={true} className="moqdetailCard Allenqlistbtnmt2">
                                                <Col sm={6} className="Moqh1 Moqbuyerh1">
                                                Estimated delivery date:
                                                </Col>
                                                 <Col sm={6} className="Moqh2select">
                                                    <select
                                                    id="productCategorie"
                                                    className="Moqh2selectheight" 
                                                    name="deliveryDesc"
                                                    value={data.moq.deliveryTimeId}
                                                    disabled={this.state.isMoqdetail} 
                                                    onChange={this.handleChange}
                                                    style={{opacity:"1"}}
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
                                                        <Col sm={12} className="Moqh1 Moqbuyerh1">
                                                        Additional Note:
                                                        </Col>
                                                        <p className="Moqh1p">
                                                        <textarea id="additionalInfo " 
                                                        name="additionalInfo"
                                                        value={data.moq.additionalInfo}
                                                        disabled={this.state.isMoqdetail} 
                                                        onChange={this.handleChange}
                                                        className="width100p "></textarea>
                                                        </p>

                                                        </Row>
                                                        </Col>    
                                                        {/* <Col sm={1}></Col>   */}
                                                        </Row>

                                                   : null  } ) : null}
                                        </>   
                                        }
                                </>
                                :
                                <> 
                                {/* if not a custom product if statement */}
                                {this.state.getMoqs.length==0?
                                <>
                                
                                <Row>
                                                                    <br></br>
                                                                    <br></br>
                                                                    <br></br>   
                                                                    <Col className="col-xs-12 text-center font14">
                                                                    No Moq is Available
                                                                    </Col>
                                                                </Row>
                                </>
                            :<>
                            
                            { this.state.getMoqs[0].accepted == false ?
                                      <>
                                       {console.log("single not accept ")}
                                             {this.state.moqavailable?
                                                <>
                                                {console.log("single not accept available")}
                                     
                                     <Row noGutters={true}>
                                    <Col sm={1}></Col>
                                    <Col sm={10}>
                                    <h1 className="receivedmoqh1">Received MOQ</h1>
                                    </Col>
                                </Row>
                                <Col sm={1}></Col>
                                <Col sm={10}>
                                    {this.state.getMoqs  ? ( ( this.state.getMoqs.map((data) => ( 
                                       <> 


                             

                                <Row noGutters={true} style={{overflow:"auto"}}>
                                <table className="MOqtable" style={{width:"100%",marginTop:"15px"}}>
                                    <tr className="borderleftblue rowmaxheight">
                                    <td className="recmoqcol1">
                                        <Row noGutters={true} >
                                        
                                            <Col className="col-xs-12 " sm={12} md={4} >
                                            {data.logo?
                                            <img className="Receivemoqbrandimg" src={TTCEapi.ImageUrl+'User/'+data.artisanId+'/CompanyDetails/Logo/'+data.logo}/>
                                                :
                                                <img className="BdImg profileImage" src={logos.Smile} />
                                            }
                                            
                                            </Col>

                                        <Col className="col-xs-12 colright" sm={12} md={8}>
                                <p className="Artisianbrandh">Artisian Brand :<span style={{color:"cornflowerblue"}}> 
                                {data.brand}
                                </span> </p>
                                            <span className="regionmoq"> 
                                            {data.clusterName}
                                            </span>
                                        </Col>
                                    </Row>
                                </td>
                                <td className="recmoqcol2">
                                <Row noGutters={true}>
                                        <Col className="col-xs-12 tdclasscss">
                                            <p className="theading">MOQ</p>
                                            {data.moq.moq}
                                        </Col>
                                        </Row>
                                    </td>
                                    <td>
                                    <Row noGutters={true}>
                                    <Col className="col-xs-12 tdclasscss">
                                    <p className="theading">Price/unit(or m)</p>
                                
                                    {data.moq.ppu}
                                            </Col>
                                        </Row>
                                    </td>
                                    <td>
                                    <Row noGutters={true}>
                                    <Col className="col-xs-12 tdclasscss">
                                    <p className="theading">ETA Delivery</p>
                                    {this.state.getMoqDeliveryTimes[data.moq.deliveryTimeId-1].days} Days
                                            </Col>
                                        </Row>
                                    </td>
                                    <td>
                                    <Row noGutters={true}>
                                    <Col className="col-xs-12 readmored" >

                                    <p className="recheading"  >Received
                                    <Moment format=" DD-MM-YYYY">
                                    {data.moq.createdOn}
                                        </Moment> :
                                    <Moment format=" h:mm a">
                                    {data.moq.createdOn}
                                        </Moment>
                                    </p>
                                    {this.state.collapseId == data.artisanId ?
                                        <div onClick={() => this.toggleArrow(data.artisanId)}>  
                                       
                                        Collapse <i class="fa fa-angle-up fa-lg" aria-hidden="true"></i>  
                                        </div> : 
                                        <div onClick={() => this.toggleArrow(data.artisanId)}>  
                                       
                                       Read More <i class="fa fa-angle-down fa-lg" aria-hidden="true"></i>  
                                        </div> }          

                                        </Col>
                                    </Row>
                                </td>
                                {this.state.collapseId == data.artisanId?
                                ""
                                :
                                <td>
                                <Row noGutters={true}>
                                <Col className="col-xs-12 tdclasscss">
                            
                                <i class="fa fa-minus-circle" aria-hidden="true" style={{color:"red"}}
                                        onClick={this.ToggleDelete1}></i>
                                                </Col>
                                            </Row>

                                            <div id="id02" class="w3-modal">
                            <div class="w3-modal-content w3-animate-top modalBoxSize">
                            <div class="w3-container">
                                <h3 className="deleteModalHeader">Are you sure you want to delete MOQ ?</h3>
                                <div className="deleteModalButtonOuterDiv">
                                <span onClick={this.ToggleDeleteClose1} className="deleteModalCancelButton">Cancel</span>
                                <span 
                                onClick={() => this.handleDeleteItem(data.moq.id)}
                                 className="deleteModalOkayButton">Delete</span>
                                </div>
                            </div>
                            </div>
                            </div>
                                </td>
                                }
                            
                            <td className={this.state.collapseId == data.artisanId? "acceptmoqbtnlg":"acceptmoqbtn"} onClick={this.acceptMOQModalShow}>
                                                            <Row noGutters={true} >
                                                                <Col className="col-xs-12 ">
                                                                {/* <i class="fa fa-handshake-o accepticon" aria-hidden="true"></i> */}
                                                               <img src={logos.acceptsmall} style={{height:"15px",marginRight:"5px"}}/>

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
                                                                            <span className="buyerMOQAcceptModalEnquiryId"> {this.state.getEnquiryMoq[0].openEnquiriesResponse.enquiryCode}</span>
                                                                        </div>
                                                                        <div className="buyerMOQAcceptModalTerms">Terms Decided</div>
                                                                        <table className="buyerMOQAcceptModalTable">
                                                                            <tr>
                                                                                <td>
                                                                                    <p className="buyerMOQAcceptModalTableContent">MOQ</p>
                                                                                    <p className="buyerMOQAcceptModalpBottom"> {data.moq.moq}</p>
                                                                                </td>
                                                                                <td>
                                                                                    <p className="buyerMOQAcceptModalTableContent">Price/unit(or m)</p>
                                                                                    <p className="buyerMOQAcceptModalpBottom"> {data.moq.ppu}</p>
                                                                                </td>
                                                                                <td>
                                                                                    <p className="buyerMOQAcceptModalTableContent">ETA Delivery</p>
                                                                                    <p className="buyerMOQAcceptModalpBottom">{this.state.getMoqDeliveryTimes[data.moq.deliveryTimeId-1].days} Days</p>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                        <div className="buyerMOQAcceptModalEnquiryDiv">
                                                                            <span className="buyerMOQAcceptModalBrand">Artisan Brand: </span>
                                                                            <span className="buyerMOQAcceptModalBrandName"> {data.brand}</span>
                                                                        </div>
                                                                        <div className="buyerMOQAcceptModalState">{data.clusterName}</div>
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
                                                                    <span >
                                                                        <button
                                                                        disabled={this.state.modalOksend}
                                                                    onClick={() => this.MoqSimpleProductSelected(data.moq.id)}
                                                                    className="buyerMOQAcceptModalOkayButton">Ok</button></span>
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
                                                                            <span className="buyerMOQAcceptModalEnquiryId">{this.state.getEnquiryMoq[0].openEnquiriesResponse.enquiryCode}</span>
                                                                        </div>
                                                                        <div className="buyerMOQAcceptModalTerms">Terms Decided</div>
                                                                        <table className="buyerMOQAcceptModalTable">
                                                                            <tr>
                                                                                <td>
                                                                                    <p className="buyerMOQAcceptModalTableContent">MOQ</p>
                                                                                    <p className="buyerMOQConfirmModalpBottom"> {data.moq.moq}</p>
                                                                                </td>
                                                                                <td>
                                                                                    <p className="buyerMOQAcceptModalTableContent">Price/unit(or m)</p>
                                                                                    <p className="buyerMOQConfirmModalpBottom">{data.moq.ppu}</p>
                                                                                </td>
                                                                                <td>
                                                                                    <p className="buyerMOQAcceptModalTableContent">ETA Delivery</p>
                                                                                    <p className="buyerMOQConfirmModalpBottom">{this.state.getMoqDeliveryTimes[data.moq.deliveryTimeId-1].days} Days</p>
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
                                                                        <div className="buyerMOQConfirmModalButtonOuter" style={{textAlign:"center"}}>
                                                                            {/* <span onClick={this.buyerMOQAcceptClose} className="buyerMOQConfirmModalCancelButton">Close</span> */}
                                                                            {/* <span className="buyerMOQConfirmModalOkayButton">View Enquiry</span> */}
                                                                            <span onClick={this.buyerMOQAcceptClose}  className="buyerMOQConfirmModalCancelButton">Close</span>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                                </div>
                                                            </div>
                                                            </div>
                                                </tr>

                                                </table>

                                {this.state.collapseId == data.artisanId ? 
                                    <>
                                        <div className="readmorediv">
                                        <p><b>Note from Artisan</b></p>
                                        {data.moq.additionalInfo?data.moq.additionalInfo:""}

                                        </div>
                                        </>
                                        :null}

                      
                                    </Row>
                                    
                                    </>

                                    ) )  )): 
                                    null}
                                    </Col>
                                                 </>
                                                  :
                                                  
                                                  <>     
                                                   {console.log("single not accept Not available")}                              
                                                     <Row>
                                                        <br></br>
                                                        <br></br>
                                                         <br></br>   
                                                        <Col className="col-xs-12 text-center font14">
                                                         MOQ Details not Received for this product.
                                                        </Col>
                                                         </Row>
                                       
                                    </>
                                    }
                                      </>
                                      :
                                      
                                      <>
                                       {console.log("single accept available")}
                                {/* if not a custom product else statement */}
                                <Row noGutters={true} >  
                                                    {/* <Col sm={1}></Col>                                         */}
                                                <Col sm={10}>
                                                <Row noGutters={true} className="moqdetailCard Allenqlistbtnmt">
                                                <Col sm={6} className="Moqh1 Moqbuyerh1">
                                                    Min Order Qnty:
                                                </Col>
                                                <Col sm={6} className="Moqh2 ">
                                                <input 
                                                id="moq"
                                                className="width200 alignbox" 
                                                type="number"
                                                disabled={this.state.isMoqdetail} 
                                                value={this.state.getMoqs[0].moq.moq}
                                                    name="moq"
                                                    onChange={this.handleChange}/> 
                                                </Col>
                                                </Row>

                                                <Row noGutters={true} className="moqdetailCard Allenqlistbtnmt2">
                                                <Col sm={6} className="Moqh1 Moqbuyerh1">
                                                Price/unit:
                                                </Col>
                                                <Col sm={6} className="Moqh2">
                                                {/* <i class="fa fa-inr" aria-hidden="true"></i>  */}
                                                <input 
                                                id="ppu"
                                                className="width200 alignbox2"
                                                type="text"
                                                disabled={this.state.isMoqdetail} 
                                                value={this.state.getMoqs[0].moq.ppu}
                                                name="ppu"
                                                onChange={this.handleChange}
                                                /> 

                                                </Col>
                                                </Row>

                                                <Row noGutters={true} className="moqdetailCard Allenqlistbtnmt2">
                                                <Col sm={6} className="Moqh1 Moqbuyerh1">
                                                Estimated delivery date:
                                                </Col>
                                                 <Col sm={6} className="Moqh2select">
                                                    <select
                                                    id="productCategorie"
                                                    className="Moqh2selectheight" 
                                                    name="deliveryDesc"
                                                    value={this.state.getMoqs[0].moq.deliveryTimeId}
                                                    disabled={this.state.isMoqdetail} 
                                                    onChange={this.handleChange}
                                                    style={{opacity:"1"}}
                                                >
                                                    <option
                                                    key="0"
                                                    deliveryDesc = '-1'
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
                                                        <Col sm={12} className="Moqh1 Moqbuyerh1">
                                                        Additional Note:
                                                        </Col>
                                                        <p className="Moqh1p">
                                                        <textarea id="additionalInfo " 
                                                        name="additionalInfo"
                                                        value={this.state.getMoqs[0].moq.additionalInfo}
                                                        disabled={this.state.isMoqdetail} 
                                                        onChange={this.handleChange}
                                                        className="width100p "></textarea>
                                                        </p>

                                                        </Row>
                                                        </Col>    
                                                        {/* <Col sm={1}></Col>   */}
                                                        </Row>
                                      </>
                                         }
                                
                            </>}  
                                  
                             
                                </>
                                    }


                            </>
                            :
                            <>
                            <Row>
                                                        <br></br>
                                                        <br></br>
                                                         <br></br>   
                                                        <Col className="col-xs-12 text-center font14">
                                                         MOQ Details not Received for this product.
                                                        </Col>
                                                         </Row>
                            </>}
                            </>
                            :
                            <>
                            </>
                            }
     
{/* ---------------------------------------------------MOQ ends----------------------------------------------------------------- */}

                                                            {this.state.proformaDetails ? 
                                                            <>
                                                            {/* <Col sm={1}></Col> */}
                                                            <Col sm={10}>
                                                                <BuyerPIPrintTable 
                                                                enquiryCode={this.state.enquiryCode} 
                                                                enquiryId={this.state.getEnquiryMoq[0].openEnquiriesResponse.enquiryCode}/>
                                                            </Col>
                                                         
                                                            </>:null}
{/* ----------------------------------------------------------------------------------------------                   */}
                                                            {this.state.changeRequest ?  
                                                            <>
                                                            <Col sm={1}></Col>
                                                            <Col sm={8}>
                                                               
                                                           

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
