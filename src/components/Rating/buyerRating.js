import React, {Component} from 'react';
import logos from "../../assets";
import TTCEapi from "../../services/API/TTCEapi";
import { Row, Col, Container } from 'reactstrap';
import Moment from 'react-moment';
import NavbarComponent from "../navbar/navbar";
import Footer from "../footer/footer";
import queryString from 'query-string';
import { browserHistory } from "../../helpers/history";
import "./buyerRating.css";
import ReactStars from "react-rating-stars-component";
import customToast from "../../shared/customToast";
import { toast } from "react-toastify";


export default class BuyerRating extends Component {

    constructor(props) {
        super(props);
    
        this.state = {  
            enquiryId: "",
            enquiryCode: "",
            buyerQuestionsComments : [],
            buyerQuestionsRatings: [],
            getClosedOrder:[],
            ratingArray: [],
            newRatingId: 0,
            userData: [],
            submitReviewButton: false,
            averageRate: 0,
            loading: false,
            isBuyerRatingDone: 0
        };   
    
    }

    foundUnsual(id){
        console.log('clicked')
        browserHistory.push("/completedorderfaulty?orderid="+id)
    }

    backoperation(){
        localStorage.setItem("ratingBack", 1);
        browserHistory.push("/buyerOrders"); 
    }

    getRatingId = (id) => {
        this.state.newRatingId = id;
        console.log(id);
    }

    daysleftrating(name,days)
    {
      console.log(name,days);
        var someDate = new Date(name);
                                console.log(someDate);
                                var numberOfDaysToAdd =parseInt(days);
                                someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
                                console.log(someDate); 
                                var todayDate= new Date();
                                const diffTime =  someDate - todayDate ;
                                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                                console.log(diffDays); 
                                return(diffDays);
    }
    ratingFunction = (newValue) => {
        console.log(newValue * 2);
        var rating = newValue * 2;
        var object = {
            enquiryId: this.state.enquiryId,
            givenBy: this.state.userData.id,
            givenTo: 9,
            questionId: this.state.newRatingId,
            response: rating,
            responseComment: "",
        }
        this.state.ratingArray.push(object);
        console.log(this.state.ratingArray);

        var currentArray = this.state.ratingArray;
        var newArray = [];      
        var uniqueObject = {}; 
        for (let i in currentArray) { 
            var objTitle = currentArray[i]['questionId']; 
            uniqueObject[objTitle] = currentArray[i]; 
        } 
        for (var i in uniqueObject) { 
            newArray.push(uniqueObject[i]); 
        }
        console.log(newArray);
        
        var addRate = 0;
        for(var i in newArray) {
            addRate += newArray[i].response;
        }
        console.log(addRate/newArray.length);
        var averageRate = (addRate/newArray.length).toFixed(1);
        this.setState({
            averageRate: averageRate,
        })
    }

    handleChangeComment = (e, id) => {
        var data = e.target.value;
        var object = {
            enquiryId: this.state.enquiryId,
            givenBy: this.state.userData.id,
            givenTo: 9,
            questionId: id,
            response: 0,
            responseComment: data,
        }
        this.state.ratingArray.push(object);
    }

    submitReviewFunction = () => {
        this.setState({
            submitReviewButton: true
        });
        var currentArray = this.state.ratingArray;
        var newArray = [];      
        var uniqueObject = {}; 
        for (let i in currentArray) { 
            var objTitle = currentArray[i]['questionId']; 
            uniqueObject[objTitle] = currentArray[i]; 
        } 
        for (var i in uniqueObject) { 
            newArray.push(uniqueObject[i]); 
        }
        console.log(newArray);

        TTCEapi.submitRatingToUser(newArray).then((response)=>{
            if(response.data.valid)
            { 
                this.componentDidMount();
                customToast.success("Review sent successfully", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true,
                });
            }
            console.log(response.data.data);
        });
    }

    componentDidMount() {

        this.setState({
            loading: true,
        });

        let params = queryString.parse(this.props.location.search);
        this.state.enquiryId = parseInt(params.code);

        var userData = [];
        userData = JSON.parse(localStorage.getItem('user'));
        this.state.userData = userData;

        var enquiryCode = localStorage.getItem("ratingEnquiryCode");
        this.state.enquiryCode = enquiryCode;

        console.log(this.state.enquiryId);
        console.log(this.state.enquiryCode);

        TTCEapi.getRatingQuestions().then((response)=>{
            if(response.data.valid)
            {
                console.log(response.data.data);
                this.setState({
                    buyerQuestionsComments: response.data.data.buyerQuestions.commentQuestions,
                    buyerQuestionsRatings: response.data.data.buyerQuestions.ratingQuestions,
                    loading: false,
                });
            }
        });
        TTCEapi.getClosedOrder(this.state.enquiryId).then((response)=>{
            if(response.data.valid)
            {
            this.setState({
                 getClosedOrder : response.data.data[0].openEnquiriesResponse,
                },()=>{
                console.log(this.state.getClosedOrder);
            });
        }
        });

        TTCEapi.getRatingsForUser(this.state.enquiryId, this.state.userData.id).then((response)=>{
            if(response.data.valid)
            {
                console.log(response.data.data);
                this.setState({
                    isBuyerRatingDone: response.data.data.isBuyerRatingDone,
                    loading: false,
                });
            }
        });
       
    }

    render() {

    const secondExample = {
        size: 40,
        count: 5,
        color: "#EFEFEF",
        activeColor: "#F2BF17",
        value: 0,
        a11y: true,
        isHalf: true,
        emptyIcon: <i className="far fa-star ratingStarDisplayMargin" />,
        halfIcon: <i className="fa fa-star-half-alt ratingStarDisplayMargin" />,
        filledIcon: <i className="fa fa-star ratingStarDisplayMargin" />,
        onChange: (newValue) => this.ratingFunction(newValue)
    };

    return (
        <React.Fragment>
            <NavbarComponent/>
          
                {this.state.loading ? 
                <Row noGutters={true}>
                <Col className="col-xs-12 font20 text-center rateLoadingTopBottom">
                Loading Please Wait....
                </Col>
                </Row>
                :
                this.state.isBuyerRatingDone === 1 ?
                <Container>
                <Row noGutters={true} className="ratingRowTop">
                    <Col sm={1} className="col-xs-2">
                    <img
                        src={logos.backarrowicon}
                        className="margin-cparrow cparrowsize glyphicon"
                        onClick={() => this.backoperation()}
                    ></img>
                    </Col>
                    <Col sm={8} className="col-xs-9">
                        <div className ="ratingCodeStyle bold">
                            Review your Order Id : {this.state.enquiryCode}
                        </div>
                        <div className="ratingSubheader">
                            Thank you for the review !
                        </div>
                    </Col>  
                    <Col sm={3} className="col-xs-12 text-right">
                        <button className="rateUnusualButton" onClick={()=>this.foundUnsual(this.state.enquiryId)}>
                            <img src={logos.rateSadFace} className="raterevbtnimg"/> 
                            Found something unusual ?
                        </button>
                        {this.daysleftrating(this.state.getClosedOrder.orderReceiveDate,3)>0 &&
                          this.daysleftrating(this.state.getClosedOrder.orderReceiveDate,3)<4 
                          ?
                          
                        <div className="ratingSubheader">
                        {this.daysleftrating(this.state.getClosedOrder.orderReceiveDate,3)} days left to report a problem
                        </div>
                        :
                        ""
                         }
                    </Col>                          
                </Row>
                <div className="envelopeBgImg">
                    <Row noGutters={true}>
                        <Col className="col-xs-12 text-center">
                            <div className="envelopeHeartTextLine1">With <img src={logos.envelopeHeart} className="envelopeHeart"/></div>
                            <div className="envelopeHeartTextLine2">from Tata Trusts</div>
                            <div className="envelopeDear">Dear {this.state.userData.firstName} {this.state.userData.lastName}</div>
                            <div className="envelopeThank">Thank you !</div>
                            <div className="envelopePart">For being a part of this timeless story.</div>
                            <img src={TTCEapi.ImageUrl+'User/'+this.state.userData.id+'/CompanyDetails/Logo/'+this.state.userData.companyDetails.logo} 
                            className="envelopeBrandlogo" />
                        </Col>
                    </Row>
                </div>
                <Row noGutters={true}>
                    <Col className="col-xs-12 text-center">
                        <a href="/home">
                        <button className="rateGoHomeButton">
                            Go to home
                        </button>
                        </a>
                    </Col>
                </Row>
                
                </Container>
                :
                <div>
                <div className="buyerRatingBG">
                <Container>
                <Row noGutters={true} className="ratingRowTop">
                    <Col sm={1} className="col-xs-2">
                    <img
                        src={logos.backarrowicon}
                        className="margin-cparrow cparrowsize glyphicon"
                        onClick={() => this.backoperation()}
                    ></img>
                    </Col>
                    <Col sm={8} className="col-xs-9">
                        <div className ="ratingCodeStyle bold">
                            Review your Order Id : {this.state.enquiryCode}
                        </div>
                        <div className="ratingSubheader">
                            We'll just take 2 minutes to review this order to let the artisan help you serve better in future
                        </div>
                    </Col>  
                    <Col sm={3} className="col-xs-12 text-right">
                       
                        {this.daysleftrating(this.state.getClosedOrder.orderReceiveDate,3)>0 &&
                          this.daysleftrating(this.state.getClosedOrder.orderReceiveDate,3)<4 
                          ?
                          <>
                          <button className="rateUnusualButton"  onClick={()=>this.foundUnsual(this.state.enquiryId)}>
                          <img src={logos.rateSadFace} className="raterevbtnimg"/> 
                          Found something unusual ?
                      </button>
                        <div className="ratingSubheader">
                        {this.daysleftrating(this.state.getClosedOrder.orderReceiveDate,3)} days left to report a problem
                        </div>
                        </>
                        :
                        ""
                         }
                    </Col>                          
                </Row>

                <Row noGutters={true}>
                    <Col sm={12} className="col-xs-12 text-center">
                        <img src={logos.rateWeatherStar} className="rateWeatherStarImg"/>
                        <div className="ratingSubheader">
                            Rate stars below from 1st being poor to 5th as best.                                
                        </div> 
                        <div className="rateSubSubHeader">
                            Thankyou for helping an artisan bring some confidence & smile !
                        </div>
                    </Col>
                </Row>
                <Row noGutters={true} className="ratingQuestionStartTop">
                    <Col md={9} sm={12} className="col-xs-12">
                        {this.state.buyerQuestionsRatings ? this.state.buyerQuestionsRatings.map((data) => {
                        return <div>
                            <Row noGutters={true}>
                                <Col sm={7} className="col-xs-6">
                                    <div className="ratingQs">{data.question}</div>
                                </Col>
                                <Col sm={5} className="col-xs-6 text-right ratingRemovePadding" id={data.id} onFocus={() => this.getRatingId(data.id)}>
                                    <ReactStars {...secondExample}/> 
                                </Col>
                            </Row>
                            <hr/>
                            </div>
                        }) : null}
                    </Col>
                    <Col md={2} sm={12} className="col-xs-12 text-center col-md-offset-1">
                        {this.state.averageRate === 0 ?
                        <i className="far fa-star starColorInactive" /> :
                        this.state.averageRate === "10.0" ?
                        <i className="fa fa-star starColorActive" /> :
                        <i className="fa fa-star-half-alt starColorActive" />
                        }
                        <div className="averageRate">{this.state.averageRate}</div>
                        <div className="ratingSubheader">
                            Average Score                               
                        </div> 
                    </Col>
                </Row>
                <hr className="ratingHr"/>
                <Row noGutters={true}>
                    <Col className="col-xs-12 text-center">
                        <img src={logos.ratingEditIcon} className="ratingEditIcon"/>
                        <div className="ratingSubheader">
                            Because your words matter !!                               
                        </div>
                        {this.state.buyerQuestionsComments ? this.state.buyerQuestionsComments.map((data) => {
                        return <div>
                                <div className="rateSubSubHeader">
                                   {data.question}
                                </div>
                                <textarea placeholder="Type here....." className="ratingTextareaStyle" 
                                onChange={(e) => this.handleChangeComment(e, data.id)}></textarea>
                            </div>
                        }) : null}  
                        {this.state.submitReviewButton === true ?
                        <button className="rateSendButtonDisable">
                            Send Review
                        </button>  
                        :
                        <button className="rateSendButton" onClick={this.submitReviewFunction}>
                            Send Review
                        </button>
                        }                 
                    </Col>
                </Row>
                </Container>
                </div>
                <Row noGutters={true}>
                <img className="ratingFooterImg internaldiv" src={logos.ratingFooterImg} />
                </Row>
                </div>
                }
               
            <Footer/>
        </React.Fragment>
    )
    }
}