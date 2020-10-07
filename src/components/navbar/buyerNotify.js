import React, { Component } from "react";
import logos from "../../assets";
import { Row, Col, Container, Card, CardBody } from "reactstrap";
import "../navbar/navbar.css";
import { memoryHistory, browserHistory } from "../../helpers/history";
import TTCEapi from "../../services/API/TTCEapi";
import NavbarComponent from "../navbar/navbar";
import "./navbar.css";
import Footer from "../footer/footer";
import customToast from "../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import './buyerNotify.css';

class BuyerNotifications extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notificationData: [],
      notificationTypeId: [],
      loading: true,
      newCount: 0,
      userRoleId: 0
    };
  }

  backoperation() {
    browserHistory.push("/home");
  }

  componentDidMount(){

    TTCEapi.getAllNotificationTypes().then((response)=>{
      if(response.data.valid)
      {
        this.setState({
          notificationTypeId: response.data.data,
          loading: false
        });
        console.log(response.data.data);
      }
    });

    TTCEapi.getAllNotifications().then((response)=>{
        if(response.data.valid)
        {
          // var count = 0;
          // for(var i = 0; i < response.data.data.getAllNotifications.length; i++) {
          //   if(response.data.data.getAllNotifications[i].seen === 0) {
          //     count = count + 1;
          //   }
          // }
          // console.log(count);
          this.setState({
            notificationData: response.data.data.getAllNotifications,
            newCount: response.data.data.count,
            loading: false
          });
          console.log(this.state.notificationData);
        }
    });

    var userData = [];
    userData = JSON.parse(localStorage.getItem('user'));

    this.setState({
      userRoleId: userData.refRoleId
    })

  }

  notificationSeenfunction = (id) => {
    console.log(id);

    TTCEapi.updateNotificationSeen(id).then((response)=>{
      if(response.data.valid)
      {
        window.location.reload();
        console.log(response.data.data);
      }
    });
  }

  markAllReadFunction = () => {
    TTCEapi.markAllReadNotification().then((response)=>{
      if(response.data.valid)
      {
        window.location.reload();
        console.log(response.data.data);
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <NavbarComponent />
        {/* {this.state.getProductsInWishlist.length==0? */}

        <>
          {/* <body onload="window.location.reload()"></body> */}
          <Container className="wishlistbg">
            <Row noGutters={true}>
              <Col md="1">
                <img
                  src={logos.backarrowicon}
                  className="margin-cparrow cparrowsize glyphicon"
                   onClick={() => this.backoperation()}
                  //  onClick={() => this.props.history.go(-1)}
                ></img>
              </Col>
              <Col md="10" className="addedwishlist">
                <h1> Your Notifications</h1>
                <p> {this.state.newCount} New Notifications</p>
                {this.state.newCount === 0 ? null : 
                <p style={{ float: "right" }}>
                  {/* <button className="clearmywishlist"> */}
                  <span className="notifyCircleRed">O</span>
                    <span className="spanhome notifyReadRed" onClick={this.markAllReadFunction}>
                    Mark all as read
                    </span>
                  {/* </button> */}
                </p> }
                <Row noGutter={true}>
                  <Col md="6">
                    <p
                      style={{ float: "left" }}
                      className="Totalitemsinwishlist"
                      id="pageNumbers"
                    ></p>
                    
                  </Col>
                  <hr className="hrBuyerNotify"></hr>
                </Row>
                </Col>
            </Row>
            
            {this.state.loading === true ? <div class="loader">Loading...</div> : 
             
             this.state.notificationData.length !== 0 ?
            <Row noGutters={true}>
              <Col md="12"> 
                <Card className="notificationCardbody">

                  {/* <Row noGutters={true} className="notifyRowOuter">
                    <Col md={1} className="notifyRemoveColRight">
                    <img  className="notifyImage1" src={logos.notifyImage1}/>
                    </Col>
                    <Col md={9} className="notifyRemoveColPadding">
                      <div>
                        <span className="notifyEnquiryNo">Enquiry ID : AS-VB-BU-234563</span>
                        <span className="notifyProductName">RED-BLUE KATAN SILK SAREE</span>
                      </div>
                      <div>
                        <span className="notifyResponse">RESPONSE</span>
                        <span className="notifyBrand">Artisan Brand : <span className="notifyBrandName">Titli</span></span>
                      </div>
                    </Col>
                    <Col md={2} className="notifyRemoveColLeft text-right">
                      <span className="notifyCircle">O</span>
                      <span className="spanhome notifyRead">Mark as read</span>
                    </Col>

                  </Row>   

                  <Row noGutters={true} className="notifyRowOuter">
                    <Col md={1} className="notifyRemoveColRight">
                    <img  className="notifyImage1" src={logos.notifyImage2}/>
                    </Col>
                    <Col md={9} className="notifyRemoveColPadding">
                      <div>
                        <span className="notifyEnquiryNo">Enquiry ID : AS-VB-BU-234563</span>
                        <span className="notifyEnquiryCustom">CUSTOM DESIGN</span>
                        <span className="notifyProductName">RED-BLUE KATAN SILK SAREE</span>
                      </div>
                      <div>
                        <span className="notifyResponse">RESPONSE</span>
                        <span className="notifyBrand">Artisan Brand : <span className="notifyBrandName">Titli</span></span>
                      </div>
                    </Col>
                    <Col md={2} className="notifyRemoveColLeft text-right">
                      <span className="notifyCircle">O</span>
                      <span className="spanhome notifyRead">Mark as read</span>
                    </Col>

                  </Row> 

                  <Row noGutters={true} className="notifyRowOuter">
                    <Col md={1} className="notifyRemoveColRight">
                    <img  className="notifyImage3" src={logos.notifyImage3}/>
                    </Col>
                    <Col md={9} className="notifyRemoveColPadding">
                      <div>
                        <span className="notifyEnquiryNo">Enquiry ID : AS-VB-BU-234563</span>
                        <span className="notifyEnquiryCustom">CUSTOM DESIGN</span>
                        <span className="notifyBrand">Artisan Brand : <span className="notifyBrandName">Titli</span></span>
                        <span className="notifyProductName">RED-BLUE KATAN SILK SAREE</span>
                      </div>
                      <div>
                        <span className="notifyResponse">Pro Forma Invoice : <span className="notifyGreenColor">Received</span></span>                        
                      </div>
                    </Col>
                    <Col md={2} className="notifyRemoveColLeft text-right">
                      <span className="notifyCircle">O</span>
                      <span className="spanhome notifyRead">Mark as read</span>
                    </Col>

                  </Row>

                  <Row noGutters={true} className="notifyRowOuter">
                    <Col md={1} className="notifyRemoveColRight">
                    <img  className="notifyImage1" src={logos.notifyImage4}/>
                    </Col>
                    <Col md={9} className="notifyRemoveColPadding">
                      <div>
                        <span className="notifyEnquiryNo">Enquiry ID : AS-VB-BU-234563</span>
                        <span className="notifyEnquiryCustom">CUSTOM DESIGN</span>
                        <span className="notifyBrand">Artisan Brand : <span className="notifyBrandName">Titli</span></span>
                        <span className="notifyProductName">RED-BLUE KATAN SILK SAREE</span>
                      </div>
                      <div>
                        <span className="notifyResponse">MOQ <span className="notifyBrand">80 Minimum</span></span>                        
                      </div>
                    </Col>
                    <Col md={2} className="notifyRemoveColLeft text-right">
                      <span className="notifyCircle">O</span>
                      <span className="spanhome notifyRead">Mark as read</span>
                    </Col>

                  </Row>

                  <Row noGutters={true} className="notifyRowOuter">
                    <Col md={1} className="notifyRemoveColRight">
                    <img  className="notifyImage3" src={logos.notifyImage5}/>
                    </Col>
                    <Col md={9} className="notifyRemoveColPadding">
                      <div>
                        <span className="notifyEnquiryNo">Enquiry ID : AS-VB-BU-234563</span>
                        <span className="notifyEnquiryCustom">CUSTOM DESIGN</span>
                        <span className="notifyBrand">Artisan Brand : <span className="notifyBrandName">Titli</span></span>
                        <span className="notifyProductName">RED-BLUE KATAN SILK SAREE</span>
                      </div>
                      <div>
                        <span className="notifyResponse">Transaction : Advance Payment : <span className="notifyGreenColor">Approved</span></span>                        
                      </div>
                    </Col>
                    <Col md={2} className="notifyRemoveColLeft text-right">
                      <span className="notifyCircle">O</span>
                      <span className="spanhome notifyRead">Mark as read</span>
                    </Col>

                  </Row>

                  <Row noGutters={true} className="notifyRowOuter">
                    <Col md={1} className="notifyRemoveColRight">
                    <img  className="notifyImage3" src={logos.notifyImage6}/>
                    </Col>
                    <Col md={9} className="notifyRemoveColPadding">
                      <div>
                        <span className="notifyEnquiryNo">Enquiry ID : AS-VB-BU-234563</span>
                        <span className="notifyProductName1">Artisan Brand : <span className="notifyBrandName1">Titli</span></span>
                        <span className="notifyProductName1">Product : <span className="notifyBrandName1">Ikat Weave Red and White Saree</span></span>
                      </div>
                      <div>
                        <span className="notifyStatusCircleWhite"></span><span className="notifyResponse notifyStatusLeft">Status Update : In Packing</span>                        
                      </div>
                    </Col>
                    <Col md={2} className="notifyRemoveColLeft text-right">
                      <span className="notifyCircle">O</span>
                      <span className="spanhome notifyRead">Mark as read</span>
                    </Col>

                  </Row> */}

                  { 
                  this.state.notificationData ? this.state.notificationData.map((data) => {
                  return this.state.notificationTypeId ? this.state.notificationTypeId.map((typeData) => {
            
                   if(typeData.id === data.notificationTypeId) {
                      if(data.seen === 0) {
                       
                            return  <Row noGutters={true} className="notifyRowOuter">
                            <Col md={1} className="notifyRemoveColRight">
                            {
                            data.notificationTypeId === 1 || data.notificationTypeId === 5 ? 
                            <img  className="notifyImage3" src={logos.notifyImage6}/> :
                            data.notificationTypeId === 4 || data.notificationTypeId === 14 ? 
                            <img  className="notifyImage1" src={logos.notifyImage3}/> :
                            data.notificationTypeId === 2 ||  data.notificationTypeId === 3 ? 
                            <img  className="notifyImage1" src={logos.notifyImage4}/> : 
                            data.notificationTypeId === 6 ||  data.notificationTypeId === 7 || data.notificationTypeId === 8 || 
                            data.notificationTypeId === 26 ||  data.notificationTypeId === 27 || data.notificationTypeId === 28 ?
                            <img  className="notifyImage3" src={logos.notifyImage5}/> :
                            data.notificationTypeId === 9 ||  data.notificationTypeId === 10 || data.notificationTypeId === 11 ?
                            <img  className="notifyImage1" src={logos.crNotify}/> :
                            data.notificationTypeId === 25 ?
                            <img  className="notifyImage1" src={logos.notifyQC}/> :
                            data.notificationTypeId === 16 ||  data.notificationTypeId === 17 || data.notificationTypeId === 18 || data.notificationTypeId === 19 ||
                            data.notificationTypeId === 20 || data.notificationTypeId === 21 ?
                            <img  className="notifyImage1" src={logos.progressNotifyIcon}/> :
                            data.notificationTypeId === 23 || data.notificationTypeId === 24 ?
                            <img  className="notifyEscIcon" src={logos.notifyEscIcon}/> :
                            data.notificationTypeId === 22 ?
                            <img  className="notifyChatIcon" src={logos.notifyChatIcon}/> :
                            <img  className="notifyImage1" src={logos.notifyImage3}/> 
                            }
                            </Col>
                            <Col md={9} className="notifyRemoveColPadding">
                              <div>
                                <span className="notifyEnquiryNo">Enquiry ID : {data.code}</span>
                                {data.customProduct === "Custom Product" ? 
                                <span className="notifyEnquiryCustom">CUSTOM DESIGN</span> : null }
                                {this.state.userRoleId === 1 ? 
                                data.companyName !== "" ? 
                                <span className="notifyProductName1">Buyer Brand : <span className="notifyBrandName1">{data.companyName}</span></span>
                              : <span className="notifyProductName1">Buyer Brand : <span className="notifyBrandName1">NA</span></span> 
                              : 
                              data.companyName !== "" ? 
                              <span className="notifyProductName1">Artisan Brand : <span className="notifyBrandName1">{data.companyName}</span></span>
                              : <span className="notifyProductName1">Artisan Brand : <span className="notifyBrandName1">NA</span></span>  }

                                <span className="notifyProductName1">Product : <span className="notifyBrandName1">{data.productDesc}</span></span>
                              </div>
                              <div>
                                <span className="notifyStatusCircleWhite"></span><span className="notifyResponse notifyStatusLeft">Status Update : 
                                {data.notificationTypeId === 25 ? 
                                data.details === "Off loom Process" ?
                                <span>{data.type} for Off loom Process & Quality Check before delivery completed</span> :
                                <span>{data.type} for {data.details}</span> :
                                data.notificationTypeId === 16 ||  data.notificationTypeId === 17 || data.notificationTypeId === 18 || data.notificationTypeId === 19 ||
                                data.notificationTypeId === 20 || data.notificationTypeId === 21 ? 
                                <span>{data.type} {data.details}</span> :
                                data.type}</span>                        
                              </div>
                            
                            </Col>
                            <Col md={2} className="notifyRemoveColLeft text-right">
                              <span className="notifyCircle">O</span>
                              <span className="spanhome notifyRead" onClick={() => this.notificationSeenfunction(data.notificationId)}>Mark as read</span>
                            </Col>
        
                          </Row> 
                       
                          // else {
                          //   return <Row noGutters={true} className="notifyRowOuter">
                          //   <Col md={1} className="notifyRemoveColRight">
                          //   {data.notificationTypeId === 1 || data.notificationTypeId === 5 ? 
                          //   <img  className="notifyImage3" src={logos.notifyImage6}/> :
                          //   data.notificationTypeId === 4 ? 
                          //   <img  className="notifyImage1" src={logos.notifyImage3}/> :
                          //   <img  className="notifyImage1" src={logos.notifyImage4}/> }
                          //   </Col>
                          //   <Col md={9} className="notifyRemoveColPadding">
                          //     <div>
                          //       <span className="notifyEnquiryNo">Enquiry ID : {data.code}</span>
                          //       <span className="notifyProductName1">Artisan Brand : <span className="notifyBrandName1">{data.companyName}</span></span>
                          //       <span className="notifyProductName1">Product : <span className="notifyBrandName1">{data.productDesc}</span></span>
                          //     </div>
                          //     <div>
                          //       <span className="notifyStatusCircleWhite"></span><span className="notifyResponse notifyStatusLeft">Status Update : {data.type}</span>                        
                          //     </div>
                          //   </Col>
                          //   <Col md={2} className="notifyRemoveColLeft text-right">
                          //     <span className="notifyCircle">O</span>
                          //     <span className="spanhome notifyRead" onClick={() => this.notificationSeenfunction(data.notificationId)}>Mark as read</span>
                          //   </Col>
        
                          // </Row> 
                          // }
                        
                     
                        // if(data.customProduct === "Custom Product") {
                        // return  <Row noGutters={true} className="notifyRowOuter">
                        //     <Col md={1} className="notifyRemoveColRight">
                        //     <img  className="notifyImage1" src={logos.notifyImage4}/>
                        //     </Col>
                        //     <Col md={9} className="notifyRemoveColPadding">
                        //       <div>
                        //         <span className="notifyEnquiryNo">Enquiry ID : {data.code}</span>
                        //         <span className="notifyEnquiryCustom">CUSTOM DESIGN</span>
                        //         <span className="notifyBrand">Artisan Brand : <span className="notifyBrandName">{data.companyName}</span></span>
                        //         <span className="notifyProductName">{data.productDesc}</span>
                        //       </div>
                        //       <div>
                        //         <span className="notifyResponse">{data.type}</span>                        
                        //       </div>
                        //     </Col>
                        //     <Col md={2} className="notifyRemoveColLeft text-right">
                        //       <span className="notifyCircle">O</span>
                        //       <span className="spanhome notifyRead" onClick={() => this.notificationSeenfunction(data.notificationId)}>Mark as read</span>
                        //     </Col>
  
                        //   </Row>
                        // }
                        // else {
                        //   return  <Row noGutters={true} className="notifyRowOuter">
                        //     <Col md={1} className="notifyRemoveColRight">
                        //     <img  className="notifyImage1" src={logos.notifyImage4}/>
                        //     </Col>
                        //     <Col md={9} className="notifyRemoveColPadding">
                        //       <div>
                        //         <span className="notifyEnquiryNo">Enquiry ID : {data.code}</span>
                        //         <span className="notifyBrand">Artisan Brand : <span className="notifyBrandName">{data.companyName}</span></span>
                        //         <span className="notifyProductName">{data.productDesc}</span>
                        //       </div>
                        //       <div>
                        //         <span className="notifyResponse">{data.type}</span>                        
                        //       </div>
                        //     </Col>
                        //     <Col md={2} className="notifyRemoveColLeft text-right">
                        //       <span className="notifyCircle">O</span>
                        //       <span className="spanhome notifyRead" onClick={() => this.notificationSeenfunction(data.notificationId)}>Mark as read</span>
                        //     </Col>
  
                        //   </Row>
                        // }
                      
                      //   if(typeData.id === 4) {
                      //   return  <Row noGutters={true} className="notifyRowOuter">
                      //       <Col md={1} className="notifyRemoveColRight">
                      //       <img  className="notifyImage1" src={logos.notifyImage4}/>
                      //       </Col>
                      //       <Col md={9} className="notifyRemoveColPadding">
                      //         <div>
                      //           <span className="notifyEnquiryNo">Enquiry ID : AS-VB-BU-234563</span>
                      //           <span className="notifyEnquiryCustom">CUSTOM DESIGN</span>
                      //           <span className="notifyBrand">Artisan Brand : <span className="notifyBrandName">Titli</span></span>
                      //           <span className="notifyProductName">RED-BLUE KATAN SILK SAREE</span>
                      //         </div>
                      //         <div>
                      //           <span className="notifyResponse">MOQ <span className="notifyBrand">80 Minimum</span></span>                        
                      //         </div>
                      //       </Col>
                      //       <Col md={2} className="notifyRemoveColLeft text-right">
                      //         <span className="notifyCircle">O</span>
                      //         <span className="spanhome notifyRead" onClick={() => this.notificationSeenfunction(data.notificationId)}>Mark as read</span>
                      //       </Col>
  
                      //     </Row>
                      //  }
                      }
                    //   else {
                    //   if(typeData.id === 1) {
                    //     if(data.customProduct === "Custom Product") {
                    //       return <Row noGutters={true} className="notifyRowWhiteOuter">
                    //       <Col md={1} className="notifyRemoveColRight">
                    //       <img  className="notifyImage3" src={logos.notifyImage7}/>
                    //       </Col>
                    //       <Col md={9} className="notifyRemoveColPadding">
                    //         <div>
                    //           <span className="notifyEnquiryNowhite">Enquiry ID : {data.code}</span>
                    //           <span className="notifyEnquiryCustomwhite">CUSTOM DESIGN</span>
                    //           <span className="notifyProductName1white">Artisan Brand : <span className="notifyBrandName1white">{data.companyName}</span></span>
                    //           <span className="notifyProductName1white">Product : <span className="notifyBrandName1white">{data.productDesc}</span></span>
                    //         </div>
                    //         <div>
                    //           <span className="notifyStatusCircleBlack"></span><span className="notifyResponsewhite notifyStatusLeft">Status Update : {data.type}</span>                        
                    //         </div>
                    //       </Col>
                    //       <Col md={2} className="notifyRemoveColLeft text-right">
                    //         <span className="notifyCirclewhite">O</span>
                    //         <span className="spanhome notifyReadwhite" onClick={() => this.notificationSeenfunction(data.notificationId)}>Mark as unread</span>
                    //       </Col>
      
                    //     </Row> 
                    //     }
                    //     else {
                    //       return <Row noGutters={true} className="notifyRowWhiteOuter">
                    //       <Col md={1} className="notifyRemoveColRight">
                    //       <img  className="notifyImage3" src={logos.notifyImage7}/>
                    //       </Col>
                    //       <Col md={9} className="notifyRemoveColPadding">
                    //         <div>
                    //           <span className="notifyEnquiryNowhite">Enquiry ID : {data.code}</span>
                    //           <span className="notifyProductName1white">Artisan Brand : <span className="notifyBrandName1white">{data.companyName}</span></span>
                    //           <span className="notifyProductName1white">Product : <span className="notifyBrandName1white">{data.productDesc}</span></span>
                    //         </div>
                    //         <div>
                    //           <span className="notifyStatusCircleBlack"></span><span className="notifyResponsewhite notifyStatusLeft">Status Update : {data.type}</span>                        
                    //         </div>
                    //       </Col>
                    //       <Col md={2} className="notifyRemoveColLeft text-right">
                    //         <span className="notifyCirclewhite">O</span>
                    //         <span className="spanhome notifyReadwhite" onClick={() => this.notificationSeenfunction(data.notificationId)}>Mark as unread</span>
                    //       </Col>
      
                    //     </Row> 
                    //     }
                    //   }
                    //   else if(typeData.id === 2 || typeData.id === 3) {
                    //   return  <Row noGutters={true} className="notifyRowOuter">
                    //       <Col md={1} className="notifyRemoveColRight">
                    //       <img  className="notifyImage1" src={logos.notifyImage4}/>
                    //       </Col>
                    //       <Col md={9} className="notifyRemoveColPadding">
                    //         <div>
                    //           <span className="notifyEnquiryNo">Enquiry ID : AS-VB-BU-234563</span>
                    //           <span className="notifyEnquiryCustom">CUSTOM DESIGN</span>
                    //           <span className="notifyBrand">Artisan Brand : <span className="notifyBrandName">Titli</span></span>
                    //           <span className="notifyProductName">RED-BLUE KATAN SILK SAREE</span>
                    //         </div>
                    //         <div>
                    //           <span className="notifyResponse">MOQ <span className="notifyBrand">80 Minimum</span></span>                        
                    //         </div>
                    //       </Col>
                    //       <Col md={2} className="notifyRemoveColLeft text-right">
                    //         <span className="notifyCircle">O</span>
                    //         <span className="spanhome notifyRead" onClick={() => this.notificationSeenfunction(data.notificationId)}>Mark as read</span>
                    //       </Col>

                    //     </Row>
                    //   }
                    //   else if(typeData.id === 4) {
                    //   return  <Row noGutters={true} className="notifyRowOuter">
                    //       <Col md={1} className="notifyRemoveColRight">
                    //       <img  className="notifyImage1" src={logos.notifyImage4}/>
                    //       </Col>
                    //       <Col md={9} className="notifyRemoveColPadding">
                    //         <div>
                    //           <span className="notifyEnquiryNo">Enquiry ID : AS-VB-BU-234563</span>
                    //           <span className="notifyEnquiryCustom">CUSTOM DESIGN</span>
                    //           <span className="notifyBrand">Artisan Brand : <span className="notifyBrandName">Titli</span></span>
                    //           <span className="notifyProductName">RED-BLUE KATAN SILK SAREE</span>
                    //         </div>
                    //         <div>
                    //           <span className="notifyResponse">MOQ <span className="notifyBrand">80 Minimum</span></span>                        
                    //         </div>
                    //       </Col>
                    //       <Col md={2} className="notifyRemoveColLeft text-right">
                    //         <span className="notifyCircle">O</span>
                    //         <span className="spanhome notifyRead" onClick={() => this.notificationSeenfunction(data.notificationId)}>Mark as read</span>
                    //       </Col>

                    //     </Row>
                    //  }
                    // }
                    }
              
              }) : <div class="loader">Loading...</div> 
                }) : <div class="loader">Loading...</div> }

                  {/* <Row noGutters={true} className="notifyRowWhiteOuter">
                    <Col md={1} className="notifyRemoveColRight">
                    <img  className="notifyImage3" src={logos.notifyImage7}/>
                    </Col>
                    <Col md={9} className="notifyRemoveColPadding">
                      <div>
                        <span className="notifyEnquiryNowhite">Enquiry ID : AS-VB-BU-234563</span>
                        <span className="notifyProductName1white">Artisan Brand : <span className="notifyBrandName1white">Titli</span></span>
                        <span className="notifyProductName1white">Product : <span className="notifyBrandName1white">Ikat Weave Red and White Saree</span></span>
                      </div>
                      <div>
                        <span className="notifyStatusCircleBlack"></span><span className="notifyResponsewhite notifyStatusLeft">Status Update : In Packing</span>                        
                      </div>
                    </Col>
                    <Col md={2} className="notifyRemoveColLeft text-right">
                      <span className="notifyCirclewhite">O</span>
                      <span className="spanhome notifyReadwhite">Mark as unread</span>
                    </Col>

                  </Row>

                  <Row noGutters={true} className="notifyRowWhiteOuter">
                    <Col md={1} className="notifyRemoveColRight">
                    <img  className="notifyImage3" src={logos.notifyImage7}/>
                    </Col>
                    <Col md={9} className="notifyRemoveColPadding">
                      <div>
                        <span className="notifyEnquiryNowhite">Enquiry ID : AS-VB-BU-234563</span>
                        <span className="notifyProductName1white">Artisan Brand : <span className="notifyBrandName1white">Titli</span></span>
                        <span className="notifyProductName1white">Product : <span className="notifyBrandName1white">Ikat Weave Red and White Saree</span></span>
                      </div>
                      <div>
                        <span className="notifyStatusCircleBlack"></span><span className="notifyResponsewhite notifyStatusLeft">Status Update : Stopped</span>                        
                      </div>
                    </Col>
                    <Col md={2} className="notifyRemoveColLeft text-right">
                      <span className="notifyCirclewhite">O</span>
                      <span className="spanhome notifyReadwhite">Mark as unread</span>
                    </Col>

                  </Row> */}




                </Card>
              
              </Col>
            </Row>
            : <div className="noNotificationStyle">No new notifications</div>}
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
        </>
      </React.Fragment>
    );
  }
}

export default BuyerNotifications;
