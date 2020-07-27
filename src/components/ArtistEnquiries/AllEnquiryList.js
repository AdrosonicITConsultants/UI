import React, { Component } from 'react'
import { memoryHistory, browserHistory } from "../../helpers/history";
import { Row, Col , Container, Button} from 'reactstrap';
import { connect } from "react-redux";
import NavbarComponent from "../navbar/navbar";
import logos from "../../assets";
import "./AllEnquiryList.css"
import TTCEapi from '../../services/API/TTCEapi';


export class AllEnquiryList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            ongoingEnquiry:true,
            enquiryStagesMTO :[],
            stage: 3,

        }
        this.completed = this.completed.bind(this);
        this.ongoing = this.ongoing.bind(this);


    }      
    completed(){
        this.setState({ongoingEnquiry:false})
    }  
    ongoing(){
        this.setState({ongoingEnquiry:true})
    }        
    backoperation(){
        browserHistory.push("/home"); 
    }
    componentDidMount(){
        TTCEapi.getEnquirStages().then((response)=>{
            if(response.data.valid)
            {
                console.log(response.data.data);
                this.setState({enquiryStagesMTO:response.data.data})
            }
        })
    } 
    render() {
        return (
            <React.Fragment>
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
                               <Row noGutters={true} className ="cp1heading bold fontplay ">
                                   <Col md="12" className="col-xs-12">
                                        All Enquiries
                                       </Col>
                               </Row>
                               <Row noGutters={true} className="mt20">
                                   {this.state.ongoingEnquiry
                                   ?
                                    <>
                                     <Col className="navoncon oncoselected bold">
                                       <span onClick={this.ongoing }>Ongoing</span> 
                                       <hr className="selctedoptionhr"></hr>
                                    </Col>
                                    <Col className="navoncon onconotselected light">
                                       <span onClick={this.completed }>Completed</span> 
                                    </Col>
                                    </>
                                    :
                                    <>
                                     <Col className="navoncon onconotselected light">
                                     <span onClick={this.ongoing }>Ongoing</span> 
                                    </Col>
                                    <Col className="navoncon oncoselected bold">
                                    <span onClick={this.completed }>Completed</span> 
                                    <hr className="selctedoptionhr2"></hr>

                                    </Col>
                                    </>
                                    }
                                   
                               </Row>
                               
                          </Col>                            
                </Row>
                <Row>
                    <hr className="enquiryoptionhr"></hr>
                </Row>
                <>
                <hr></hr>
                <Row noGutters={true}>
                    <Col className="col-xs-1"></Col>
                    <Col className="col-xs-10">
                        <Row noGutters={true}>
                            <Col sm="9">
                                <div className="imageinlist"> 
                                    <div className="imageinlist1"> 
                                    <img src={logos.dupatta} className="enquiryimage"></img>

                                    </div>
                                    <a href="/" className="leEnqprodName">Crimson Red Ikat Silk Fabrics</a>
                                    {/* <span ></span> */}
                                    
                                </div>
                                <div>
                                  <div noGutters={true} >
                                      <Col className="leEnqid bold">
                                      Enquiry Id : AN-23-GH-778
                                      </Col>
                                  </div>
                                  <div noGutters={true} >
                                      <Col >
                                      <span className="leEnqtype bold ">Fabric </span> 
                                       <span className="leEnqspun"> / Natura Dye  X  Natura Dye   X  Natura Dye</span> 
                                      </Col>
                                  </div>
                                  <div noGutters={true} className="" >
                                      <Col className="leEnqprodcode ">
                                          Product Code : AWE2 - 2345                                      
                                      </Col>
                                  </div>
                               
                                  <div noGutters={true} className="" >
                                      <Col className="leEnqprodtype ">
                                          Made to order                                
                                      </Col>
                                  </div>
                                  <div noGutters={true} className="" >
                                      <Col className="leEnqprodcode ">
                                          <span className="leEnqprodbn ">Brand Name : </span>
                                          <span className="leEnqbrandname ">A & B Fashion House</span>                                   
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
                                      ₹ 280000
                                      </Col>
                                </div>
                                <div noGutters={true} >
                                      <Col className="leEnqidDateStarted">
                                      Date Started : 12-07-2020
                                      </Col>
                                </div>
                                <div noGutters={true} >
                                      <Col className="leEnqidLastUpdated">
                                      Last Updated : 12-07-2020
                                      </Col>
                                </div>
                                <div noGutters={true} >
                                      <Col className="leEnqidEstDelivery">
                                      Est. Date of delivery : 12-07-2020
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
                            <ul className="list-unstyled multi-steps">
                            {this.state.enquiryStagesMTO.map((item) => <li key={item.id} className={this.state.stage == item.id ? "is-active": " "} >{item.desc}</li> )     }
                            </ul>
                            </div>
                           </Col>
                       </Row>
                    </Col>
                </Row>
                <div className="colorbardiv">      
                          <img src={logos.colorbar} className="colorbarimg"></img>
                </div>
                </>
                </Container>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    // debugger;
    const { user } = state
    return { user };
}

const connectedLoginPage = connect(mapStateToProps)(AllEnquiryList);
export default connectedLoginPage;
