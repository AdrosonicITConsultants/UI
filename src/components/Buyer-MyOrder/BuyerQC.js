import React, {Component} from 'react';
import logos from "../../assets";
import TTCEapi from "../../services/API/TTCEapi";
import "../Artisan-MyOrder/ArtisanQC.css";
import { Row, Col } from 'reactstrap';
import Moment from 'react-moment';

export default class BuyerQC extends Component {

    constructor(props) {
        super(props);
    
        this.state = {  
            artisanBrand: "",
            buyerBrand: "",
            productCategory: "",
            artisanQcResponses: [],
            stagesData: [],
            questionsData: [], 
            currentStageId: 0,
            currentSeenStatus: 0,
            collapse: false,
            show: false,
            collapseId: -1,
        };   
    
    }

    getcollapseId = activecollapse => {
        if (activecollapse !== this.state.collapseId) {
          this.setState({
            collapseId: activecollapse
          });
        } else {
          this.setState({
            collapseId: -1
          });
        }
    }
    
    toggleArrow = (id) => {
    this.setState({ collapse: !this.state.collapse }, () => {
        this.getcollapseId(id);
        this.setState({ show: !this.state.show });
    });
    }

    componentDidMount() {
        console.log(this.props.enquiryId);
        TTCEapi.getArtisanQcResponse(this.props.enquiryId).then((response)=>{
            if(response.data.valid)
            {
                this.setState({
                    artisanBrand: response.data.data.artisanCompanyName,
                    buyerBrand: response.data.data.buyerCompanyName,
                    productCategory: response.data.data.category,
                    artisanQcResponses: response.data.data.artisanQcResponses,
                    currentStageId: response.data.data.stageId,
                    currentSeenStatus: response.data.data.isSend,
                })
            }
            console.log(response.data.data);
            console.log(this.state.currentStageId);
            console.log(this.state.currentSeenStatus);
        });

        TTCEapi.getQCStages().then((response)=>{
            if(response.data.valid)
            {
                this.setState({
                    stagesData: response.data.data,
                })
            }
            console.log(response.data.data);
        });

        TTCEapi.getAllQCQuestions().then((response)=>{
            if(response.data.valid)
            {
                this.setState({
                    questionsData: response.data.data,
                })
            }
            console.log(this.state.questionsData);            
        });
    }

    render() {
        return (
            <React.Fragment>
                {this.props.data.oldQcExists ? this.props.data.oldQcExists === 1 ?
                    <div className="text-right">
                        <a href={"/viewOldQC?enquiryId="+ this.props.enquiryId} target="_blank">
                        Click to view old QC form
                        </a>
                    </div>
                    : null
                : null }
                {this.state.artisanQcResponses.length !== 0 ?
                <div className="artisanQCBg">
                    <div className="artisanQCHeader">Quality Check</div>
                    <div className="artisanQCSubHeader">This form is filled by artisan during the course of manufacturing the product.</div>

                    {/* toggle sent stages */}

                    {this.state.stagesData ? this.state.stagesData.map((stage) => {
                        if(stage.id <= this.state.currentStageId && this.state.currentSeenStatus === 1) {
                            return <div className="artisanQCCardStyleFilled">
                            <div className="artisanQCCardHeaderFilled" onClick={() => this.toggleArrow(stage.id)}>
                                <Row noGutters={true}>
                                    <Col sm={6} className="text-left noPaddingQC">
                                        <img src={logos.greenTick} className="greenTickQc"/>
                                        {stage.stage}
                                    </Col>
                                    <Col sm={6} className="text-right noPaddingQC">
                                        <span className="sharedDateQC">
                                            Shared on <Moment format="DD-MM-YYYY">
                                            {this.state.artisanQcResponses[stage.id - 1][0].modifiedOn}
                                        </Moment>    
                                        </span>
                                        {this.state.collapseId == stage.id ?
                                        <img src={logos.dropDownQC} className="dropDownQCImgReverse"/>
                                        :
                                        <img src={logos.dropDownQC} className="dropDownQCImg"/>
                                        }
                                    </Col>
                                </Row>
                            </div>

                            {this.state.collapseId == stage.id ?
                            <div className="QCCollapseInnerMargin">
                            {this.state.questionsData[stage.id - 1] ? this.state.questionsData[stage.id - 1].map((data) => {
                                return this.state.artisanQcResponses[stage.id - 1] ? this.state.artisanQcResponses[stage.id - 1].map((item) => {
                                    if(data.questionNo === item.questionId) {
                                        return <div className="BuyerQCquestionsBox">
                                        <div className="BuyerQCquestionsTitle">{data.question}</div>
                                        <div className="BuyerQCanswer">{item.answer ? item.answer : "NA"}</div>                                        
                                        </div>
                                    }
                                }) : null
                            }) : null }
                             </div>
                            : null }
                        
                           </div>
                        }
                    
                    }) : null}

                    
                </div>
                : 
                <Row noGutters={true}>
                <Col className="col-xs-12 bold font20 text-center">
                <br></br>
                 Quality Check Not Available.
                  <br></br>
                  </Col>
                   </Row>
                }

            </React.Fragment>

        )
    }
}