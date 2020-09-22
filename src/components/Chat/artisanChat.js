import React, {Component} from 'react';
import logos from "../../assets";
import TTCEapi from "../../services/API/TTCEapi";
import { Row, Col, Container } from 'reactstrap';
import Moment from 'react-moment';
import NavbarComponent from "../navbar/navbar";
import Footer from "../footer/footer";
import queryString from 'query-string';
import { browserHistory } from "../../helpers/history";
import customToast from "../../shared/customToast";
import { toast } from "react-toastify";
import "./artisanChat.css";

export default class ArtisanChat extends Component {

    constructor(props) {
        super(props);
    
        this.state = {  
            onLoadChatList: [],
            loading: false,
            defaultChatWindow: true,
            selectedKey: -1,
        };   
    
    }

    openConversationfunction = (key) => {
        this.setState({
            selectedKey: key,
            defaultChatWindow: false,
        })
    }

    componentDidMount() {

        this.setState({
            loading: true,
        })

        var searchedString = "";
        TTCEapi.getEnquiryMessageChatList(searchedString).then((response)=>{
            if(response.data.valid)
            {
                console.log(response.data.data);
                this.setState({
                    onLoadChatList: response.data.data,
                    loading: false,
                })
            }
        });
    }

    render() {

    return (
        <React.Fragment>
            <NavbarComponent/>
            {this.state.loading === true ?
            <Row noGutters={true}>
            <Col className="col-xs-12 font20 text-center rateLoadingTopBottom">
            Loading Please Wait....
            </Col>
            </Row>
            :
            <Container>
                <Row noGutters={true}>
                    <Col md={4} sm={12} className="col-xs-12 chatRemovePadding">
                        <div className="artisanChatOnLoadBar">
                            <Row noGutters={true}>
                                <Col className="chatRemovePadding col-xs-10">
                                    <div className="artisanChatSearchBoxOuter">
                                        <img src={logos.artisanChatSearchIcon}/>
                                        <input placeholder="Search by enquiry/ order id/ buyer's name"></input>
                                    </div>
                                </Col>
                                <Col className="col-xs-1 chatRemovePadding">
                                    <img  src={logos.artisanChatDropDownIcon} className="artisanChatDropDownIcon"/>
                                </Col>
                            </Row>
                            <div className="chatLeftHeight">
                            {this.state.onLoadChatList ? this.state.onLoadChatList.map((data, key) => {
                            return <Row noGutters={true} 
                                    className={(this.state.defaultChatWindow === false) && (this.state.selectedKey === key) ? 
                                    "chatEnquiryRow chatEnquiryRowGreen chatEnquirySelectedBG" : "chatEnquiryRow chatEnquiryRowGreen"}
                                    onClick={() => this.openConversationfunction(key)} id={key}>
                                    <Col className="col-xs-2 chatEnquiryImgCol">
                                        <img src={logos.Smile} className="chatEnquiryImg"/>
                                    </Col>
                                    <Col className="col-xs-8">
                                        <div className="chatEnquiryBrandName">{data.buyerCompanyName}</div>
                                        <div className="chatEnquiryId">E/O Id: {data.enquiryNumber}</div>
                                    </Col>
                                    <Col className="col-xs-2 chatRemovePadding">
                                        <div className="chatEnquiryBrandName">
                                            <Moment format="DD-MM-YY">{data.lastChatDate}</Moment>
                                        </div>
                                        {data.unreadMessages ? 
                                        <div className="chatEnquiryNotifyNo">{data.unreadMessages}</div>
                                        : null }
                                    </Col>
                                </Row>
                            }) : null} 
                            
                            {/* <Row noGutters={true} className="chatEnquiryRow chatEnquiryRowBlack">
                                <Col className="col-xs-2 chatEnquiryImgCol">
                                    <img src={logos.Smile} className="chatEnquiryImg"/>
                                </Col>
                                <Col className="col-xs-8">
                                    <div className="chatEnquiryBrandName">AIR BNB Fashion House Mumbai</div>
                                    <div className="chatEnquiryId">E/O Id: AS-ES-TY-5654654</div>
                                </Col>
                                <Col className="col-xs-2 chatRemovePadding">
                                    <div className="chatEnquiryBrandName">21/09/20</div>
                                    <div className="chatEnquiryNotifyNo">4</div>
                                </Col>
                            </Row> */}
                            </div>	    	    
                        </div> 
                    </Col>

                    {this.state.defaultChatWindow === true ?
                    <Col md={8} sm={12} className="col-xs-12 chatRemovePadding">
                        <div className="artisanChatOnLoadBar chatBarBorderLeft"></div>
                        <div className="chatRightHeight">
                            <div className="artisanChatTalkMoreText">Talk more, sell more !</div>
                            <div className="artisanChatTalkMoreText1">Select the chat to view conversation here !</div>
                            <img  src={logos.artisanChatChatIcon} className="artisanChatChatIcon"/>
                        </div>                        
                    </Col>
                    : 
                    <Col md={8} sm={12} className="col-xs-12 chatRemovePadding">
                        <div className="artisanChatOnLoadBar chatBarBorderLeft"></div>
                        <div className="chatRightHeight">
                            <div>test</div>
                        </div>                        
                    </Col>
                    }
                </Row>
            </Container> 
            }              
            <Footer/>
        </React.Fragment>
    )
    }
}