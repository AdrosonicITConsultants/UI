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

export default class ArtisanRating extends Component {

    constructor(props) {
        super(props);
    
        this.state = {  
            enquiryId: "",
            enquiryCode: "",
            buyerQuestionsComments : [],
            buyerQuestionsRatings: [],
            ratingArray: [],
            newRatingId: 0,
            userData: [],
            submitReviewButton: false,
            averageRate: 0,
            loading: false,
            isArtisanRatingDone: 0,
            artisanGivenRatingResponse: [],
            artisanGivenRatingAverageValue: 0,
            commentBoxId: 0,
            ratingValidationFlag: false,
            newArrayLength: 0,
        };   
    
    }

    backoperation(){
        localStorage.setItem("ratingBack1", 1);
        browserHistory.push("/artisanOrders"); 
    }

    getRatingId = (id) => {
        this.state.newRatingId = id;
    }

    ratingFunction = (newValue) => {
        var rating = newValue * 2;
        var object = {
            enquiryId: this.state.enquiryId,
            givenBy: this.state.userData.id,
            questionId: this.state.newRatingId,
            response: rating,
            responseComment: "",
        }
        this.state.ratingArray.push(object);

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
        
        var addRate = 0;
        var newArrayLength = 0;
        for(var i in newArray) {
            if(newArray[i].response !== 0) {
                addRate += newArray[i].response;
                newArrayLength = newArrayLength + 1;
            }            
        }
        this.setState({
            newArrayLength: newArrayLength,
        });
        var averageRate = (addRate/newArrayLength).toFixed(1);
        this.setState({
            averageRate: averageRate,
        })
    }

    handleChangeComment = (e, id) => {
        var data = e.target.value;
        var object = {
            enquiryId: this.state.enquiryId,
            givenBy: this.state.userData.id,
            questionId: id,
            response: 0,
            responseComment: data,
        }
        this.setState({
            commentBoxId: id
        });
        this.state.ratingArray.push(object);
    }

    submitReviewFunction = () => {
        
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

        var ratingValidationFlag = false;        
        if(this.state.newArrayLength !== this.state.buyerQuestionsRatings.length) {
            this.setState({
                ratingValidationFlag: true
            });
            ratingValidationFlag = true;            
        }
        else {
            this.setState({
                ratingValidationFlag: false
            });
            ratingValidationFlag = false;
        }

        if(ratingValidationFlag === false) {
            this.setState({
                submitReviewButton: true
            });

            TTCEapi.submitRatingToUser(newArray).then((response)=>{
                if(response.data.valid)
                { 
                    this.componentDidMount();
                    customToast.success("Review sent successfully", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: true,
                    });
                }
            });
        } 
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


        TTCEapi.getRatingQuestions().then((response)=>{
            if(response.data.valid)
            {
                this.setState({
                    buyerQuestionsComments: response.data.data.artisanQuestions.commentQuestions,
                    buyerQuestionsRatings: response.data.data.artisanQuestions.ratingQuestions,
                    loading: false,
                });
            }
        });

        TTCEapi.getRatingsForUser(this.state.enquiryId, this.state.userData.id).then((response)=>{
            if(response.data.valid)
            {
                this.setState({
                    isArtisanRatingDone: response.data.data.isArtisanRatingDone,
                    artisanGivenRatingResponse: response.data.data.artisanRating,
                    loading: false,
                });
                var array = response.data.data.artisanRating;
                var value = 0;
                var count = 0;
                for(var i in array) {
                    if(array[i].response > 0) {
                        value += array[i].response;
                        count = count + 1;
                    }
                }

                var averageValue = (value/count).toFixed(1);

                this.setState({
                    artisanGivenRatingAverageValue: averageValue,
                })
            }
        });
    }

    faulty(id){
        browserHistory.push("artisanfaultreportCompleted?orderid=" +id)
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
        emptyIcon: <i className="far fa-star ratingStarDisplayMargin nohover" />,
        halfIcon: <i className="fa fa-star-half-alt ratingStarDisplayMargin nohover" />,
        filledIcon: <i className="fa fa-star ratingStarDisplayMargin nohover" />,
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
                this.state.isArtisanRatingDone === 1 ?
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
                    {/* <Col sm={3} className="col-xs-12 text-right">
                        <button className="rateUnusualButton"
                        onClick={()=>this.faulty(this.state.enquiryId)}
                        >
                            <img src={logos.rateSadFace} className="raterevbtnimg"/> 
                            Check faulty order
                        </button>
                        <div className="ratingSubheader">
                            2 days left to report a problem
                        </div>
                    </Col>                           */}
                </Row>
                <div className="envelopeBgImg">
                    <Row noGutters={true}>
                        <Col className="col-xs-12 text-center">
                            {/* <div className="envelopeHeartTextLine1">With <img src={logos.envelopeHeart} className="envelopeHeart"/></div>
                            <div className="envelopeHeartTextLine2">from Tata Trusts</div> */}
                            <div className="envelopeHeartTextLine1">From Antaran</div>
                            <div className="envelopeHeartTextLine2">Transforming Crafts</div>
                            <div className="envelopeHeartTextLine2">Rating provided = {this.state.artisanGivenRatingAverageValue}</div>
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
                            We'll just take 2 minutes to review this order
                        </div>
                    </Col>  
                </Row>

                <Row noGutters={true}>
                    <Col sm={12} className="col-xs-12 text-center">
                        <img src={logos.rateWeatherStar} className="rateWeatherStarImg"/>
                        <div className="ratingSubheader">
                            Rate stars below from 1st being poor to 5th as best.                                
                        </div> 
                        <div className="rateSubSubHeader">
                            Thankyou for helping an buyer bring some confidence & smile !
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
                                onChange={(e) => this.handleChangeComment(e, data.id)} maxLength="500"></textarea>
                            </div>
                        }) : null} 

                        {this.state.ratingValidationFlag === true ?
                        <div className="ratingValidationFlagError">Please provide your ratings for all questions</div>
                        : null }

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