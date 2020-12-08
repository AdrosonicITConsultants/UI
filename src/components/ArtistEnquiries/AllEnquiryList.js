import React, { Component } from 'react'
import { memoryHistory, browserHistory } from "../../helpers/history";
import { Row, Col , Container, Button} from 'reactstrap';
import { connect } from "react-redux";
import NavbarComponent from "../navbar/navbar";
import logos from "../../assets";
import "./AllEnquiryList.css"
import TTCEapi from '../../services/API/TTCEapi';
import OngoingList from './OngoingList';
import CompletedList from './CompletedList';
import Footer from "../footer/footer";
import { useTranslation, withTranslation } from "react-i18next";
 class AllEnquiryList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            ongoingEnquiry: parseInt(localStorage.getItem("completed")) === 1 ? false : true,
            enquiryStagesMTO :[],
            stage: 3,
            openEnquiries: [],

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
                                   {this.props.t("Pages.object.All enquiries")}
                                       </Col>
                               </Row>
                               <Row noGutters={true} className="mt20">
                                   {this.state.ongoingEnquiry
                                   ?
                                    <>
                                     <Col className="navoncon oncoselected bold">
                                       <span onClick={this.ongoing }>{this.props.t("Pages.object.Ongoing")}</span> 
                                       <hr className="selctedoptionhr"></hr>
                                    </Col>
                                    <Col className="navoncon onconotselected light">
                                       <span onClick={this.completed }>{this.props.t("Pages.object.Completed")}</span> 
                                    </Col>
                                    </>
                                    :
                                    <>
                                     <Col className="navoncon onconotselected light">
                                     <span onClick={this.ongoing }>{this.props.t("Pages.object.Ongoing")}</span> 
                                    </Col>
                                    <Col className="navoncon oncoselected bold">
                                    <span onClick={this.completed }>{this.props.t("Pages.object.Completed")}</span> 
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
                {
                    this.state.ongoingEnquiry
                    ?
                    <>
                    <OngoingList></OngoingList>
                    </>
                    :
                    <>
                    {localStorage.removeItem("completed")}
                    <CompletedList></CompletedList>
                    </>
                }
                 <Row>
            <div>
              <img
                className="notifyFooterBanner internaldiv"
                src={logos.notifyFooterBanner}
              ></img>
            </div>
          </Row> 
                </Container>
                <Footer></Footer>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    // 
    const { user } = state
    return { user };
}

const connectedLoginPage = connect(mapStateToProps)(AllEnquiryList);
export default withTranslation()(connectedLoginPage);
