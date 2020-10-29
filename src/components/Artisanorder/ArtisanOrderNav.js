import React, { Component } from 'react'
import { memoryHistory, browserHistory } from "../../helpers/history";
import { Row, Col , Container, Button} from 'reactstrap';
import { connect } from "react-redux";
import NavbarComponent from "../navbar/navbar";
import logos from "../../assets";
import "../ArtistEnquiries/AllEnquiryList.css"
import TTCEapi from '../../services/API/TTCEapi';
import "../BuyerEnquiries/buyerenquiry.css";
import Footer from "../footer/footer";
import ArtisanOngoingOrder from './ArtisanOngoingOrder';
import ArtisanCompletedOrder from './ArtisanCompletedOrder';


export class ArtisanOrderNav extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            ongoingEnquiry:true,

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

    componentDidMount() {
        var data1 = localStorage.getItem("ratingBack1");

        if(data1) {
            this.setState({ongoingEnquiry:false});
        }

        localStorage.removeItem("ratingBack1");
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
                                        My Orders
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
                    {/* <hr className="enquiryoptionhr"></hr> */}
                </Row>
                {
                    this.state.ongoingEnquiry
                    ?
                    <>
                    {/* <OngoingList></OngoingList> */}
                    <ArtisanOngoingOrder></ArtisanOngoingOrder>
                    </>
                    :
                    <>
                    {/* <CompletedList></CompletedList> */}
                   <ArtisanCompletedOrder/>
                    {/* <div className="text-center font20">
                        No Completed Order
                    </div> */}
                    </>
                }
                <div>
              <img
                className="notifyFooterBanner internaldiv"
                src={logos.notifyFooterBanner}
              ></img>
            </div>
                </Container>
                <Footer></Footer>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    // debugger;
    const { user } = state
    return { user };
}

const connectedLoginPage = connect(mapStateToProps)(ArtisanOrderNav);
export default connectedLoginPage;
