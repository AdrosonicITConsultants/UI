
  
import React, { Component } from 'react'
import ReactDOM from "react-dom";
import ReactToPdf from "react-to-pdf";
import { memoryHistory, browserHistory } from "../../helpers/history";
import { Row, Col , Container, Button} from 'reactstrap';
import { connect } from "react-redux";
import NavbarComponent from "../navbar/navbar";
import logos from "../../assets";
// import "./Buyermyorder.css";
import queryString from 'query-string';
import TTCEapi from '../../services/API/TTCEapi';
import customToast from "../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import moment from 'moment';
import Footer from '../footer/footer';



export class ArtisanChangeRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            enquiryId:0,
            rejected:false,
            trueCount:0,
            falseCount:0,
            getChangeRequestForArtisan:[],
            getChangeRequestItemTable:[],
            getOrder:[],
            getPi:[],
            raiseCRFinalArray:[],
            dataload:false,
            selectedId:-1,
            count:0,
            status:0,
            counter: 0,
            submitdisabled:false,
            sendCRdisabled:false,
            accepted:[
                {   
                    id: 1,
                    option: false,
                    reject:false,
                },
                {
                    id: 2,
                    option: false,
                    reject:false,
                },
                {
                    id: 3,
                    option: false,
                    reject:false,
                },
                {
                    id: 4,
                    option: false,
                    reject:false,
                },
                {
                    id: 5,
                    option: false,
                    reject:false,
                }
            ]
            
        };
        this.AcceptChange = this.AcceptChange.bind(this);
        this.RejectChange = this.RejectChange.bind(this);
        this.sendCR = this.sendCR.bind(this);
      }

      AcceptChange(id){
         
        const typeElements = this.state;
        const updatedHeaders = [...typeElements.accepted];
        updatedHeaders[parseInt(id)-1] = {
            id: parseInt(id),
            reject: false,
            option:true
                };
        var that = this;
        that.setState({
            accepted: updatedHeaders,
            count:true,
            trueCount:this.state.trueCount >=0 ? this.state.trueCount + 1:""
        });
        var arr = this.state.accepted
        
        console.log(arr);

        // console.log(this.state.trueCount)
      }

     RejectChange(id){
        const typeElements = this.state;
        const updatedHeaders = [...typeElements.accepted];
        updatedHeaders[parseInt(id)-1] = {
            id: parseInt(id),
            reject: true,
            option:false
        };
        var that = this;
        that.setState({
            accepted: updatedHeaders,
            count:true,
            trueCount:this.state.trueCount > 0? this.state.trueCount - 1:0,
            falseCount:this.state.falseCount >= 0?this.state.falseCount + 1 :""
        });
        // console.log(this.state.falseCount)
    }


   
    Modal1Show = () => {
        this.setState({
            raiseCRFinalArray:[],
            // submitdisabled:true
        })
      
                var array = this.state.accepted;
                var array1 = this.state.getChangeRequestForArtisan;
                for(var j = 0; j < array1.length; j++){
                    for(var i = 0; i < array.length; i ++) {
                        if(array[i].id==array1[j].requestItemsId){
                            if(array[i].option === true || array[i].reject === true) {
                                var id = array1[j].requestItemsId;
                                var data = array1[j].requestText;
                                var status=0;
                                if (array[i].option===true){
                                    status=1;
                                    
                                }
                                else if (array[i].reject===true){
                                    status=2;
                                    
                                }
                               
                                var object = {
                                    requestItemsId: id,
                                    requestText: data,
                                    requestStatus:status,
                                }
                                
                                this.state.raiseCRFinalArray.push(object);
                              
                                console.log(this.state.raiseCRFinalArray);
                                var Finalarray= this.state.raiseCRFinalArray
                                this.setState({
                                    raiseCRFinalArray:Finalarray,
                                    // submitdisabled:true
                                })
                                                   }
                        }
                     
                    }
                }
                      
                document.getElementById('Modal1').style.display='block';
            }
       
    
   

Show(){
    console.log(this.state.accepted)
}
componentDidMount(){
    TTCEapi.getPi(this.props.enquiryId).then((response)=>{
        if(response.data.valid)
        {
            // console.log(response.data.data);
            this.setState({getPi:response.data.data,
                // dataload:true
            })
        }
    })
    TTCEapi.getOrder(this.props.enquiryId).then((response)=>{
        if(response.data.valid)
        {
            this.setState({getOrder:response.data.data,
               
                           })
        }
        console.log(this.state.getOrder[0].openEnquiriesResponse.changeRequestStatus)
    })
    TTCEapi.getChangeRequestItemTable().then((response)=>{
        if(response.data.valid)
        {
           
            this.setState({getChangeRequestItemTable:response.data.data},()=>{
                TTCEapi.getChangeRequestForArtisan(this.props.enquiryId).then((response)=>{
                    if(response.data.valid)
                    {
                        // console.log(response.data.data);
                        this.setState({getChangeRequestForArtisan:response.data.data.changeRequestItemList,
                            dataload:true})
                            var array = this.state.getChangeRequestForArtisan;
        var count = 0;
        for(var i = 0; i < array.length; i ++) {
          if(array[i].requestStatus === 1) {
            count = count + 1;
          }
        }
        this.setState({
          counter: count,
        })
                    }
                    console.log(this.state.getChangeRequestForArtisan)
                })

                       }
                
                
                )
        }
    })
   
  
}
 
sendCR = () => {
    this.setState({
        sendCRdisabled:true
    })
    console.log(parseInt(this.props.enquiryId),this.state.raiseCRFinalArray,this.state.trueCount===this.state.getChangeRequestForArtisan.length?1:
        this.state.falseCount===this.state.getChangeRequestForArtisan.length?2:
        this.state.trueCount!=this.state.getChangeRequestForArtisan?3:"");
                  TTCEapi.changeRequestStatusUpdate(parseInt(this.props.enquiryId),
                  this.state.raiseCRFinalArray,
                  this.state.trueCount===this.state.getChangeRequestForArtisan.length?1:
           this.state.falseCount===this.state.getChangeRequestForArtisan.length?2:
           this.state.trueCount!=this.state.getChangeRequestForArtisan?3:"").then((response)=>{
        if(response.data.valid)
        {
        
            document.getElementById('Modal1').style.display='none';
            document.getElementById('Modal2').style.display='none';
            document.getElementById('Modal3').style.display='block';
        }
    });
}

// Modal1Show = () => {
//     document.getElementById('Modal1').style.display='block';
// }

Modal1Close = () => {
    document.getElementById('Modal1').style.display='none';
}

Modal2Show = () => {
 this.setState({
    // submitdisabled:true
 })


        var array = this.state.accepted;
        var array1 = this.state.getChangeRequestForArtisan;
        for(var j = 0; j < array1.length; j++){
            for(var i = 0; i < array.length; i ++) {
                if(array[i].id==array1[j].requestItemsId){
                    if(array[i].option === true || array[i].reject === true) {
                        var id = array1[j].requestItemsId;
                        var data = array1[j].requestText;
                        var status=0;
                        if (array[i].option===true){
                            status=1;
                            
                        }
                        else if (array[i].reject===true){
                            status=2;
                            
                        }
                       
                        var object = {
                            requestItemsId: id,
                            requestText: data,
                            requestStatus:status,
                        }
                        console.log(object);
                        this.state.raiseCRFinalArray.push(object);
                        console.log(object.requestStatus==1?"true":false);
                        var Finalarray= this.state.raiseCRFinalArray
                        this.setState({
                            raiseCRFinalArray:Finalarray,
                            // submitdisabled:true
                        })
                    }
                }
             
            }
        }
              
        document.getElementById('Modal2').style.display='block';
    }



Modal2Close = () => {
    document.getElementById('Modal2').style.display='none';
}
Modal3Show = () => {
    document.getElementById('Modal3').style.display='block';
}

Modal3Close = () => {
    document.getElementById('Modal3').style.display='none';
    this.componentDidMount();
}
    render(){
    return(
            
<React.Fragment>

{this.state.dataload?
<>
            {this.state.getOrder[0].openEnquiriesResponse.changeRequestStatus==0 ?
            <>
            <Row noGutters={true}>
                        <Col className="col-xs-12 bold" style={{textAlign:"center"}}>
                            <b>Please Note:</b> <br/>
                            <p>Change request is only one time facility to buyer for their ongoing order with you.
                                <br/>Do consider with smile if able to accept the request.
                            </p>
                            <p style={{color:"orangered"}}>If you accept this change request, the buyer shall not be able to raise another change request.</p>
                        </Col>
                </Row>
                <Row noGutters={true}>
                    <Col className="col-xs-12" style={{textAlign:"center"}}>
                    <button className="enqreqbtn mbcr" 
                    onClick={()=>{this.Modal3Show()}}><img src={logos.chatwhite} style={{marginRight:"10px"}}/>Go to this Enquiry chat</button>
            
                    </Col>
                </Row>
                <div className="craccbox">
              <h3 className="CRAcceptedh3 " style={{color:"goldenrod"}}>Change Request Details</h3>
              {this.state.getChangeRequestForArtisan.map((item)=> 
            
            <>
            <Row noGutters={true} className="innerboxcr">
            <Col className="col-xs-1"></Col>
                <Col className="col-xs-6">
                <p className="Crh">
                    {/* Motif Size */}
                   
                    {this.state.getChangeRequestItemTable[item.requestItemsId-1]?this.state.getChangeRequestItemTable[item.requestItemsId-1].item:""}
                    </p>
                    {item.requestItemsId==this.state.getChangeRequestItemTable[item.requestItemsId-1].id
                                ?
                                item.requestItemsId == 3 ? 
                                <p className="changereqcolor">
                 <span><b style={{color:"darkgrey"}}>{this.state.getPi.quantity}--------------</b><b>{item.requestText}</b></span>
                 </p>
                                :
                               
                                <p className="changereqcolor">
                                {item.requestText}
                                </p>
                        :
                        ""}
                <p className="changereqcolor marginminus">
                   
                </p>
                </Col>
                <Col className="col-xs-2">
                <b style={{color:"green"}}>Accepted</b> 
                   <p><button  className="buttoncssnone">
                            {this.state.accepted[item.requestItemsId-1].option?
                             <img src={logos.acceptgreen} className="acceptrejimh"  />
                            :
                            <img src={logos.happygrey} className="acceptrejimh" 
                            onClick={()=>{this.AcceptChange(item.requestItemsId)}} />
                }
            
            
                       </button>
                 </p>
                </Col>
               
                <Col className="col-xs-2">
                <b style={{color:"red"}}>Rejected</b> 
                   <p><button className="buttoncssnone">
                       {this.state.accepted[item.requestItemsId-1].reject?
                         <img src={logos.sadred} className="acceptrejimh"/>
                       :
                       <img src={logos.sadgrey} className="acceptrejimh"  id={item.requestItemsId}
                       onClick={()=>{this.RejectChange(item.requestItemsId)}}
                       />
            
                }
                       </button> </p>
                </Col>
                     
            </Row>
            </>  
            
            )}
            <p style={{textAlign:"center"}}>
            You have accepted <b style={{color:"green"}}>{this.state.trueCount} </b>
            out of <b style={{color:"green"}}> {this.state.getChangeRequestForArtisan.length}</b> requests</p>
            
                      {/* {console.log(this.state.count)}
                      {console.log(this.state.getChangeRequestForArtisan.length)} */}
                      
                      <>
                     <Row noGutters={true}>
                      <Col className="col-xs-12" style={{textAlign:"center"}}>
    
                          {/* {this.state.count ?  
                                this.state.trueCount ==0?
                            <button className="submitCRart" disabled={this.state.submitdisabled} onClick={()=>{this.Modal2Show()}}>Submit</button>
                            :
                            <button className="submitCRart" disabled={this.state.submitdisabled} onClick={()=>{this.Modal1Show()}}>Submit</button>
                             :
                         <button className="submitCRart">Submit</button>
    
                          } */}
                          {this.state.trueCount==0?
                           <button className="submitCRart" disabled={this.state.submitdisabled} onClick={()=>{this.Modal2Show()}}>Submit</button>
                           :
                           <button className="submitCRart" disabled={this.state.submitdisabled} onClick={()=>{this.Modal1Show()}}>Submit</button>
                            
                          }
                      </Col>
                  </Row>

                      </> 
                     
                    
      
              </div>
            
                 {/* _________________________________________Modal_1________________________________________________ */}
                                                      
                 <div id="Modal1" class="w3-modal">
                <div class="w3-modal-content w3-animate-top modalBoxSize">
                    <div class="w3-container buyerMOQAcceptModalContainer">
                    <Row noGutters={true} className="buyerMOQAcceptModalOuter uploadingreceiptheading ">
                        <Col className="col-xs-12 ">
                            <h1 className="areyousurecrh1 fontplay">Are you sure ?</h1> 
                            <br/>
                            <b className="CRare ">You are about to accept the changes on <br/>
                        {this.state.accepted ?
                        
                        this.state.accepted.map((data)=>  
                        <>
                       {data.option==true?
                        this.state.getChangeRequestItemTable[data.id-1].id == 1?" weft Yarn ":""||
                        this.state.getChangeRequestItemTable[data.id-1].id == 2?" Color ":"" ||
                        this.state.getChangeRequestItemTable[data.id-1].id == 3?" Quantity ":"" ||
                        this.state.getChangeRequestItemTable[data.id-1].id == 4?" Motif size ":"" ||
                        this.state.getChangeRequestItemTable[data.id-1].id == 5?" Motif Placement ":"" 
                       :""
                    
                        }
                        </>
                                ):""}</b> 
                                <br/>
                            <img src={logos.crgreeninpopup} />
                        </Col>
                    </Row>
                    
                       
                  
                    
                    <Row noGutters={true}>
                    <Col className="col-xs-12" style={{textAlign:"center"}}>
                        <p className="crmnote crnote4">Want to discuss more ?</p>
                        <Row noGutters={true}>
                    <Col className="col-xs-12" style={{textAlign:"center"}}>
                    <button className="enqreqbtn mbcr" ><img src={logos.chatwhite} style={{marginRight:"10px"}}/>Go to this Enquiry chat</button>
            
                    </Col>
                </Row>
                            <div className="buyerMOQAcceptModalButtonOuter">
                        <span onClick={this.Modal1Close} className="buyerMOQAcceptModalCancelButton">Cancel</span>
                        <span >
                            <button
                            disabled={this.state.sendCRdisabled}
                            onClick={()=>{this.sendCR()}}
                            className="buyerMOQAcceptModalOkayButton">Ok</button></span>
                    </div>
                        
                    </Col>
                    </Row>
                                                                                        
                    
                </div>
                </div>
            </div>
            
            {/* ----------------------------------------------------Modal2------------------------------------- */}
            <div id="Modal2" class="w3-modal">
                <div class="w3-modal-content w3-animate-top modalBoxSize">
                    <div class="w3-container buyerMOQAcceptModalContainer">
                    <Row noGutters={true} className="buyerMOQAcceptModalOuter uploadingreceiptheading ">
                        <Col className="col-xs-12 ">
                            <h1 className="areyousurecrh1 fontplay">Are you sure ?</h1> 
                            <br/>
                            <b className="CRare ">You are about to reject the complete request! </b> 
                            <img src={logos.Sadpopup} className="popuprejimg" />
                        </Col>
                    </Row>
                    
                       
                  
                    
                    <Row noGutters={true}>
                    <Col className="col-xs-12" style={{textAlign:"center"}}>
                        <p className="crmnote crnote4">Want to discuss more ?</p>
                        <p className="crmnote crnote4p">Consider discussing over chat for changes and feasibility before taking any action.</p>
                    
                        <Row noGutters={true}>
                    <Col className="col-xs-12" style={{textAlign:"center"}}>
                    <button className="enqreqbtn mbcr" ><img src={logos.chatwhite} style={{marginRight:"10px"}}/>Go to this Enquiry chat</button>
            
                    </Col>
                </Row>
                            <div className="buyerMOQAcceptModalButtonOuter">
                        <span onClick={this.Modal2Close} className="buyerMOQAcceptModalCancelButton">Cancel</span>
                        <span >
                            <button
                              onClick={()=>{this.sendCR()}}
                            className="buyerMOQAcceptModalOkayButton">Ok</button></span>
                    </div>
                        
                    </Col>
                    </Row>
                                                                                        
                    
                </div>
                </div>
            </div>
            
            {/* ----------------------------------------------------Modal3------------------------------------- */}
            <div id="Modal3" class="w3-modal">
                <div class="w3-modal-content w3-animate-top modalBoxSize modalBoxTop">
                    <div class="w3-container buyerMOQAcceptModalContainer">
                    <Row noGutters={true} className="buyerMOQAcceptModalOuter uploadingreceiptheading ">
                        <Col className="col-xs-12 ">
                            <h1 className="areyousurecrh1 fontplay" style={{fontSize:"16px"}}>
                                <img src={logos.postchangerequesticon} style={{height:"20px",marginRight:"10px"}}/>
                                Post change request Process</h1> 
                            <br/>
                            <h1 className="areyousurecrh1 fontplay" style={{fontSize:"29px"}}>
                                 Update the pro forma invoice ?</h1> 
                               <br/>
                               <p className="updateinvday">You have <b>2</b> days remaining to update your invoice after change request.</p>
                        </Col>
                    </Row>
                    <Row noGutters={true}>
                    <Col className="col-xs-12" style={{textAlign:"center"}}>
                    <button className="makechangenowbtn mbcr"  >Make changes now</button>
            
                    </Col>
                </Row>
                   
                    <Row noGutters={true}>
                    <Col className="col-xs-12" style={{textAlign:"center"}}>
                        <p onClick={this.Modal3Close} className="crmnote crnote4" style={{cursor:"pointer"}}>Skip,I'll do it later!</p>
                                           
                    </Col>
                    </Row>
                                                                                        
                    
                </div>
                </div>
            </div>
            </>
            
            :
            this.state.getOrder[0].openEnquiriesResponse.changeRequestStatus==1 || this.state.getOrder[0].openEnquiriesResponse.changeRequestStatus==3?
            <><div className="craccbox">
            <h3 className="CRAcceptedh3">Change Request Details</h3>
          
            {this.state.getChangeRequestForArtisan ? this.state.getChangeRequestForArtisan.map((data) => {
              return this.state.getChangeRequestItemTable ? this.state.getChangeRequestItemTable.map((item) => {
              return data.requestItemsId === item.id ?
                <Row noGutters={true} className="innerboxcr">
                <Col className="col-xs-1"></Col>
                    <Col className="col-xs-5">
                    <p className="Crh">{item.item}</p>
                    <p className="changereqcolor marginminus">{data.requestText}</p>
                    </Col>
                    <Col className="col-xs-3"></Col>
                    {data.requestStatus === 1 ?
                    <Col className="col-xs-3">
                      <b style={{color:"green"}}>Accepted</b> 
                      <p> <img src={logos.acceptgreen} className="acceptrejimh"/></p>
                    </Col>
                    :
                    <>
                    <Col className="col-xs-3">
                      <b style={{color:"red"}}>Rejected</b> 
                      <p> <img src={logos.sadred} className="acceptrejimh"/></p>
                    </Col>
                    </>
                    }
                </Row>
                : null
                  }) : null
                }) : null
              }
              
          
          <p style={{textAlign:"center"}}>You have accepted <b style={{color:"green"}}>
            {this.state.counter}</b> out of <b style={{color:"green"}}>
            {this.state.getChangeRequestForArtisan.length}</b> requests</p>
            </div>
             {/* <Row noGutters={true} className="buyerMOQAcceptModalOuter uploadingreceiptheading ">
            <Col className="col-xs-12 " style={{border:"2px solid green"}}>
                <br/>
                <b className="CRare playfair " >You have accepted the changes on:</b> <br/>
           
            
            {this.state.getChangeRequestForArtisan.map((data)=>  
            
          
            this.state.getChangeRequestItemTable[data.requestItemsId-1].id == 1?
            <p>
                weft Yarn: {data.requestText}
            </p>:""
            ||
            this.state.getChangeRequestItemTable[data.requestItemsId-1].id == 2?
            <p>
                Color: {data.requestItemsId==this.state.getChangeRequestItemTable[data.requestItemsId-1].id ?
                data.requestText:""
                }
            </p>:"" ||
            this.state.getChangeRequestItemTable[data.requestItemsId-1].id == 3? <p>
            Quantity: {data.requestItemsId==this.state.getChangeRequestItemTable[data.requestItemsId-1].id ?
                data.requestText:""
                }
        </p>:"" ||
            this.state.getChangeRequestItemTable[data.requestItemsId-1].id == 4? <p>
            Motif Size: {data.requestItemsId==this.state.getChangeRequestItemTable[data.requestItemsId-1].id ?
                data.requestText:""
                }
        </p>:""||
            this.state.getChangeRequestItemTable[data.requestItemsId-1].id == 5? <p>
            Motif Placement: {data.requestItemsId==this.state.getChangeRequestItemTable[data.requestItemsId-1].id ?
                data.requestText:""
                }
        </p>:""
           
            
                    )} 
                    <br/>
                <img src={logos.crgreeninpopup} />
            </Col>
        </Row> */}
            </>
            :
            this.state.getOrder[0].openEnquiriesResponse.changeRequestStatus==2?
            <>
            <Row noGutters={true} className="buyerMOQAcceptModalOuter uploadingreceiptheading ">
            <Col className="col-xs-12 " style={{border:"2px solid palevioletred"}}>
                <b className="CRare ">You have rejected the complete request! </b> 
                <img src={logos.Sadpopup} className="popuprejimg" />
            </Col>
        </Row>
            </>
            :"No Data"}
</>
:
<p style={{textAlign:"center"}}>
<Row noGutters={true}>
                                                                             {console.log("mine1")}
                                                                            <Col className="col-xs-12 bold font20 text-center">
                                                                                <br></br>
                                                                                Change request Not Available
                                                                                <br></br>
                                                                            </Col>
                                                                        </Row>
                                                                        
</p>
}

</React.Fragment>
        )
    }
    
}
function mapStateToProps(state) {
    // debugger;
    const { user } = state
    return { user };
}

const connectedLoginPage = connect(mapStateToProps)(ArtisanChangeRequest);
export default connectedLoginPage;

