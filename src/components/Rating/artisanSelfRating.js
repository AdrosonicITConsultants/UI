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

export default class ArtisanSelfRating extends Component {

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
            isBuyerRatingDone: 0,
            buyerRatingAnswers: [],
            averageRating: 0,
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
        for(var i in newArray) {
            addRate += newArray[i].response;
        }
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

        TTCEapi.submitRatingToUser(newArray).then((response)=>{
            if(response){ 
            if(response.data.valid)
            { 
                this.componentDidMount();
                customToast.success("Review sent successfully", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true,
                });
            }
        }
        else{
          browserHistory.push("/404error");
        }
        });
    }

    reviewPageButton = (id) => {
        browserHistory.push("/artisanRating?code=" + id);
    }

    calculateAverage = () => {
        var array1 = this.state.buyerQuestionsRatings;
        var array2 = this.state.buyerRatingAnswers;
        var value = 0;
        for(var i in array1) {
            for(var j in array2) {
                if(array1[i].id === array2[j].questionId) {
                    value += array2[j].response;
                }
            }
        }
        var averageValue = (value/array1.length).toFixed(1);

        this.setState({
            averageRating: averageValue,
        })
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
            if(response){ 
            if(response.data.valid)
            {
                this.setState({
                    buyerQuestionsComments: response.data.data.buyerQuestions.commentQuestions,
                    buyerQuestionsRatings: response.data.data.buyerQuestions.ratingQuestions,
                    loading: false,
                });
                this.calculateAverage();
            }
        }
        else{
          browserHistory.push("/404error");
        }
        });

        TTCEapi.getRatingsForUser(this.state.enquiryId, this.state.userData.id).then((response)=>{
            if(response){ 
            if(response.data.valid)
            {
                this.setState({
                    isArtisanRatingDone: response.data.data.isArtisanRatingDone,
                    isBuyerRatingDone: response.data.data.isBuyerRatingDone,
                    buyerRatingAnswers: response.data.data.buyerRating,
                    loading: false,
                });
                this.calculateAverage();
            }
        }
        else{
          browserHistory.push("/404error");
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
                            Buyer Reviewed Order Id : {this.state.enquiryCode}
                        </div>
                    </Col>                          
                </Row>
                <Row noGutters={true}>
                    <Col className="col-xs-12 text-center">
                    <img src={logos.rateWeatherStar} className="rateWeatherStarImg"/>
                    <div className="ratingQs" style={{marginTop: "10px"}}>Buyer's rating</div>
                    <div className="averageRate">{this.state.averageRating}</div>
                    <div className="ratingSubheader">
                        Average Score                               
                    </div> 
                    </Col>
                </Row>
                <Row noGutters={true} className="ratingQuestionStartTop">
                    <Col md={10} sm={12} className="col-xs-12 col-md-offset-1">
                        {this.state.buyerQuestionsRatings ? this.state.buyerQuestionsRatings.map((data) => {
                        return this.state.buyerRatingAnswers ? this.state.buyerRatingAnswers.map((item) => {
                                if(data.id === item.questionId) {
                            return <div>
                                    <Row noGutters={true}>
                                        <Col sm={8} className="col-xs-6">
                                            <div className="ratingQs">{data.question}</div>
                                        </Col>
                                        <Col sm={4} className="col-xs-6 text-right ratingRemovePadding" id={data.id} onFocus={() => this.getRatingId(data.id)}>
                                            <ReactStars size={60} 
                                                        count={5}
                                                        color={"#EFEFEF"}
                                                        activeColor={"#F2BF17"}
                                                        value={item.response/2}
                                                        edit={false}
                                                        a11y={false}
                                                        isHalf={true}/> 
                                        </Col>
                                    </Row>
                                    <hr/>
                                    </div>
                                }
                            }) : null
                        }) : null}
                    </Col>
                </Row>
                <hr className="ratingHr"/>
                <Row noGutters={true}>
                    <Col className="col-xs-12 text-center">
                        {this.state.buyerQuestionsComments ? this.state.buyerQuestionsComments.map((data) => {
                        return this.state.buyerRatingAnswers ? this.state.buyerRatingAnswers.map((item) => {
                                if(data.id === item.questionId) {
                        return <div>
                                    <div className="rateSubSubHeader">
                                    {data.question}
                                    </div>
                                    <textarea className="ratingTextareaStyle" disabled>{item.responseComment}</textarea>
                                </div>
                                }
                            }) : null
                        }) : null}                  
                    </Col>
                </Row>
                {this.state.isBuyerRatingDone === 1 ?
                null :
                <Row noGutters={true} style={{marginTop: "40px"}}>
                    <Col className="col-xs-12" style={{textAlign:"center"}}>
                    <button
                        style={{fontSize:"15px"}}
                        onClick={() => this.reviewPageButton(this.state.enquiryId)}
                        className="buyerMOQAcceptModalOkayButton raterevbtn">
                            <img src={logos.ratereview} className="raterevbtnimg"/>
                        Rate & Review Buyer
                    </button>
                    </Col>
                 </Row> }
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