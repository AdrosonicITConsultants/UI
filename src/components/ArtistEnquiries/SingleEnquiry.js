
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


export class SingleEnquiry extends Component {
    constructor() {
        super();

        this.buyersDetailsbtn = this.buyersDetailsbtn.bind(this);
        this.moqDetailsbtn = this.moqDetailsbtn.bind(this);
        this.proformaDetailsbtn = this.proformaDetailsbtn.bind(this);
        this.changeRequestbtn = this.changeRequestbtn.bind(this);
        this.qualityCheckbtn = this.qualityCheckbtn.bind(this);
        this.handleMoqEdit = this.handleMoqEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            selected:"BuyerDetails",
            buyersDetail: true,
            moqDetail: false,
            proformaDetails: false,
            qualityCheck:false,
            changeRequest:false, 
            getMoqDeliveryTimes:[],
            showValidationMoq:false,
            isMoqdetail:true,
            moq:0,
            ppu:0,
            deliveryDesc:-1,
            additionalInfo:"",
            getMoq:[],
            dataload : false,
            isSend:-1,
            ImageUrl:TTCEapi.ImageUrl+'Product/',
            progressid:5,
            // <img src={this.state.ImageUrl + data.productId + '/' + data.lable } />
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

    sendMoqDetails(){
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
                isMoqdetail:!this.state.isMoqdetail},()=>{
            // console.log(this.state);
           
            });
            customToast.success("MOQ Details send successfully", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: true,
              });
        });
    } 
    componentDidMount(){
        let params = queryString.parse(this.props.location.search);
        console.log(params);
        TTCEapi.getMoq(params.code).then((response)=>{
            console.log(response)
            if(response.data.data==null){
                this.setState({
                moq:0,
                ppu:0,
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

     
       TTCEapi.getProductUploadData().then((response)=>{
            if(response.data.valid)
            {
                console.log(response);
                this.setState({productCategories: response.data.data.productCategories,
                    yarns: response.data.data.yarns },()=>{
                        TTCEapi.getEnquiryMoq(params.code).then((response)=>{
                            this.setState({getEnquiryMoq : response.data.data,progressid: response.data.data[0].enquiryStageId,dataload:true},()=>{
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
                                        Enquiry Id : {this.state.getEnquiryMoq[0].enquiryCode}
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
                                        item.productType === "Product"
                                        ?
                                        <a href={"/showArtisanProduct?ProductId="+item.productId }><img  src={TTCEapi.ImageUrl +"Product/" + item.productId + "/" + item.productImages.split(",")[0]} className="enquiryimage"></img>
                                        </a>
                                        :
                                        <a href={"/showBuyerProduct?productId="+item.productId }><img  src={TTCEapi.ImageUrl +"CustomProduct/" + item.productId + "/" + item.productImages.split(",")[0]} className="enquiryimage"></img>
                                        </a>

                                    }

                                    </div>
                                    
                                    <a href={"/showArtisanProduct?ProductId="+item.productId } className="leEnqprodName">{item.productName}</a>
                                    {/* <span ></span> */}
                                </div>
                                <div>
                                  {/* <div noGutters={true} >
                                      <Col className="leEnqid bold">
                                      Enquiry Id : {item.enquiryCode}
                                      </Col>
                                  </div> */}
                                  <div noGutters={true} >
                                      <Col >
                                      <span className="leEnqtype bold ">{this.state.productCategories[item.productCategoryId - 1].productDesc} </span> 
                                       <span className="leEnqspun"> / {this.state.yarns[item.warpYarnId - 1 ].yarnDesc}  X  {this.state.yarns[item.weftYarnId - 1 ].yarnDesc}  
                                        {item.extraWeftYarnId > 0 
                                        ?
                                        <>
                                        X  {this.state.yarns[item.extraWeftYarnId - 1 ].yarnDesc}
                                        </>
                                        :
                                            <></>
                                        }</span> 
                                      </Col>
                                  </div>
                                  <div noGutters={true} className="" >
                                      <Col className="leEnqprodcode ">
                                          {item.productType === "Product"
                                          ?
                                          <>
                                          Product Code : {item.productCode}   
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
                                          {item.productStatusId==2? "Available in stock"   : "Made to order"   }
                                                                  
                                      </Col>

                                  </div>
                                  <div noGutters={true} className="" >
                                      <Col className="leEnqprodcode ">
                                          <span className="leEnqprodbn ">Brand Name : </span>
                                          <span className="leEnqbrandname ">{item.companyName}</span>                                   
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
                                        {item.totalAmount > 0 ? "₹"+ item.totalAmount : "NA"} 
                                      </Col>
                                </div>
                                <div noGutters={true} >
                                      <Col className="leEnqidDateStarted">
                                      Date Started : 
                                      <Moment format="YYYY-MM-DD">
                                        {item.startedOn}
                                        </Moment>
                                      </Col>
                                </div>
                                <div noGutters={true} >
                                      <Col className="leEnqidLastUpdated">
                                      Last Updated : 
                                      <Moment format="YYYY-MM-DD">
                                     {item.lastUpdated}
                                        </Moment>
                                        
                                      </Col>
                                </div>
                                <div noGutters={true} >
                                      <Col className="leEnqidEstDelivery">
                                      Est. Date of delivery : 
                                      {item.excpectedDate != null 
                                      ?
                                      <Moment format="YYYY-MM-DD">
                                        {item.excpectedDate}
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
                            {item.productStatusId === 2
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
                                            Buyer's Detail
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
                                                                       <img className="BdImg" src={this.state.ImageUrl + data.productId + '/' + data.productImages } />
                                                                       </Col>
                                                               </Row>
                                                               <Row noGutters={true} className="BdImgCol">
                                                                    <Col sm={6} className="BuyerDetailsh1">
                                                                    Brand Name:
                                                                    </Col>
                                                                    <Col sm={6} className="">
                                                                    {data.companyName ? data.companyName : "NA"}   
                                                                    </Col>
                                                                </Row>
                                                                <Row noGutters={true} className="BdImgCol">
                                                                    <Col sm={6} className="BuyerDetailsh1">
                                                                   Name:
                                                                    </Col>
                                                                    <Col sm={6} className="">
                                                                       {data.firstName} <span></span> {data.lastName ? data.lastName :"" }
                                                                    </Col>
                                                                </Row>
                                                                <Row noGutters={true} className="BdImgCol">
                                                                    <Col sm={6} className="BuyerDetailsh1">
                                                                    Email Id:
                                                                    </Col>
                                                                    <Col sm={6} className="">
                                                                    {data.email}
                                                                    </Col>
                                                                </Row>
                                                                <Row noGutters={true} className="BdImgCol">
                                                                    <Col sm={6} className="BuyerDetailsh1">
                                                                      Phone No:
                                                                    </Col>
                                                                    <Col sm={6} className="">
                                                                    {data.mobile}
                                                                    </Col>
                                                                </Row>
                                                                <Row noGutters={true} className="BdImgCol">
                                                                    <Col sm={6} className="BuyerDetailsh1">
                                                                    Alternate Phone Number:
                                                                    </Col>
                                                                    <Col sm={6} className="">
                                                                    {data.alternateMobile ? data.alternateMobile : "NA"}
                                                                    </Col>
                                                                    <hr className="hrlineasd "></hr>
                                                                </Row>
                                                                <Row noGutters={true} className="BdImgCol">
                                                                    <Col sm={4} className="">
                                                                   <h1 className="BDh1">Delivery address</h1>
                                                                   <p  className="BDp" style={{width:"95%",lineHeight:"25px"}}>
                                                                   {data.line1}
                                                                    {data.line2 != "" ? ", " + data.line2 : ""}
                                                                    {data.street != "" ? ", " + data.street : ""}
                                                                    {data.city != "" ? ", " + data.city : ""}
                                                                    {data.pincode != "" ? ", " + data.pincode : ""}
                                                                    {data.state != "" ? ", " + data.state : ""}
                                                                    <br>
                                                                    </br>
                                                                       {data.landmark}
                                                                       </p>
                                                                    </Col>
                                                                    <Col sm={5} className="">
                                                                    <h1 className="BDh1">POC details</h1>
                                                                  <p className="BDp">Name : {data.pocFirstName} {data.pocLastName ? data.pocLastName :""}</p>
                                                                  <p  className="BDp">Email Id : {data.pocEmail ? data.pocEmail:""}</p>
                                                                  <p  className="BDp">Phone Number : {data.pocContact ?data.pocContact:"" }</p>
                                                                    </Col>
                                                                    <Col sm={3} className="">
                                                                    <h1 className="BDh1">GST Number</h1>
                                                                    <p  className="BDp" style={{overflow:"visible"}}>{data.gst}</p>
                                                                    </Col>
                                                                   
                                                                </Row>
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

                                                                 <Row noGutters={true} className="moqdetailCard Allenqlistbtnmt2">
                                                                 <Col sm={6} className="Moqh1">
                                                                     Price/unit:
                                                                 </Col>
                                                                 <Col sm={6} className="Moqh2">
                                                                 <i class="fa fa-inr" aria-hidden="true"></i> 
                                                                 <input 
                                                                 id="ppu"
                                                                 className="width200 alignbox2"
                                                                  type="number"
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
                                                                 <Col sm={12} className="Moqh1">
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
                                                                 onClick={() => this.saveMoqDetails()} disabled >Save</button>
                                                                
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
                                                             </>

                                                                :null}
                     {/* -------------------MOQ------------------------------------------------------------------------------ */}

                                                            {this.state.proformaDetails ? 
                                                            <>
                                                           <Row noGutters={true} className="PIcolmt">
                                                               <Col sm={6} >
                                                                   <label>Quantity</label>
                                                                   <br/>
                                                               <input className="PIinput" type="number"/>
                                                               </Col>
                                                               <Col sm={6}>
                                                               <label>Rate per unit(or metre)</label>
                                                               <br/>
                                                               {/* <input className="PIinput" type="number"/> */}
                                                             <span className="rssymbol"><i class="fa fa-inr" aria-hidden="true"></i></span><input type="text" name="currency" className="PIinput" />
                                                               </Col>
                                                           </Row>

                                                           <Row noGutters={true} className="PIcol2mt">
                                                           <Col sm={6}>
                                                           <label>Expected date of delivery</label>
                                                           <br/>
                                                               <input className="PIinput" type="date"/>
                                                        
                                                           </Col>
                                                           <Col sm={6}>
                                                           <label>HSN Code</label>
                                                           <br/>
                                                               <input className="PIinput" type="text"/>
                                                           </Col>
                                                       </Row>

                                                       <Row noGutters={true} className="PIcol2mt">
                                                           <Col sm={12}>
                                                           <input type="checkbox" name="checkbox" value="check" id="agree" style={{marginRight:"5px"}} /> 
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

                                                       <Row noGutters={true}>
                                                           <Col sm={12} className="text-center">
                                                                <button className="previewandpi">Preview and send PI</button>
                                                           </Col>
                                                       </Row>
                                                            </>:null}
                                                           
                                                            {this.state.changeRequest ?  <div>
                                                            <h6>change....</h6>
                                                            </div>:null}

                                                            {this.state.qualityCheck ?  <div>
                                                            <h6>qualityCheck...</h6>
                                                            </div>:null}
                                                            
                                                            </Col>
                                                            <Col sm={2}></Col>
                                                     </Row>
  
  
                               </Row>
                         
                </Container>
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

