import React, {Component} from 'react';
import logos from "../../assets";
import TTCEapi from "../../services/API/TTCEapi";
import "./ArtisanQC.css";
import { Row, Col } from 'reactstrap';
import customToast from "../../shared/customToast";
import { toast } from "react-toastify";
import Moment from 'react-moment';
import queryString from 'query-string';

export default class ViewOldQC extends Component {

    constructor(props) {
        super(props);
    
        this.state = {  
            artisanBrand: "",
            buyerBrand: "",
            productCategory: "",
            artisanQcResponses: [],
            stagesData: [],
            questionsData: [], 
            arrayObject: [], 
            currentStageId: 0,
            currentSeenStatus: 0,
            naturalArray: [],
            naturalCheckArray: [
                {
                    checked: false
                },
                {
                    checked: false
                },
                {
                    checked: false
                },
            ],
            naturalSelectedArray: [],
            yesNoArray: [],
            dropDownArray: [],
            handleYesNoArray: [],
            yesNoArray1: [],
            collapse: false,
            show: false,
            collapseId: -1,
            QCsaveButton: false,
            QCsendButton: false,
            QCsendButton1: false,
            QCenableEditFlag: false,
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

    QCenableEdit = () => {
        this.setState({
            QCenableEditFlag: true,
        })
    }

    componentDidMount() {
        let params = queryString.parse(this.props.location.search);
        var code = parseInt(params.enquiryId);
        this.setState({
            arrayObject: [], 
            QCsaveButton: false,
            QCsendButton: false,
            QCsendButton1: false,
        });
        TTCEapi.getOldQc(code).then((response)=>{
             if(response){
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
           }
                      else{
                          browserHistory.push("/404error")
                      }
            if(this.state.artisanQcResponses[1]) {
                var data = this.state.artisanQcResponses[1][0].answer;
                var result = data.split(",");
                this.setState({
                    naturalSelectedArray: result,
                });
            }
        });

        TTCEapi.getQCStages().then((response)=>{
             if(response){
            if(response.data.valid)
            {
                this.setState({
                    stagesData: response.data.data,
                })
            }}
                      else{
                          browserHistory.push("/404error")
                      }
        });

        TTCEapi.getAllQCQuestions().then((response)=>{
             if(response){
            if(response.data.valid)
            {
                this.setState({
                    questionsData: response.data.data,
                })
            }}
                      else{
                          browserHistory.push("/404error")
                      }

            var data = this.state.questionsData[1][0].optionValue;
            var result = data.split(",");
            this.setState({
                naturalArray: result,
            });

            var yesNo = this.state.questionsData[3][3].optionValue;
            var yesNoresult = yesNo.split(";");
            this.setState({
                yesNoArray: yesNoresult,
            });

            var dropDown = this.state.questionsData[3][4].optionValue;
            var dropDownresult = dropDown.split(";");
            this.setState({
                dropDownArray: dropDownresult,
            });

            var yesNo1 = this.state.questionsData[4][0].optionValue;
            var yesNoresult1 = yesNo1.split(";");
            this.setState({
                yesNoArray1: yesNoresult1,
            });

            
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="artisanQCBg" style={{margin: "30px"}}>
                    <div className="artisanQCHeader">Quality Check</div>
                    <div className="artisanQCSubHeader">This form is required to be filled during manufacturing of the product to avoid any defects.</div>
                    <Row noGutters={true} className="artisanQCNameHeaderRow">
                        <Col sm={4} className="text-center">
                            Artisan Brand: {this.state.artisanBrand ? this.state.artisanBrand : "NA"}
                        </Col> 
                        <Col sm={4} className="text-center">
                            Buyer Brand: {this.state.buyerBrand ? this.state.buyerBrand : "NA"}
                        </Col> 
                        <Col sm={4} className="text-center">
                            Product Category: {this.state.productCategory ? this.state.productCategory : "NA"}
                        </Col> 
                    </Row>

                    {/* toggle sent stages */}

                    {this.state.stagesData ? this.state.stagesData.map((stage) => {
                        if((stage.id <= this.state.currentStageId && this.state.currentSeenStatus === 1) || (stage.id < this.state.currentStageId)) {
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
                                        return <div>
                                        <div className="QCquestionsTitle">{data.question}</div>
                                        {data.answerType === "1" ? 
                                         <div>
                                         {this.state.naturalArray ? this.state.naturalArray.map((natural, key) => [
                                            this.state.naturalSelectedArray ? this.state.naturalSelectedArray.map((selected, key1) => [
                                                natural === selected ?
                                                <label className="QCLabelTitle">
                                                    <input type="checkbox" checked disabled className="QCLabelInput" />
                                                    {natural}
                                                </label> 
                                                : null 
                                                ]) : null
                                            ]) : null}
                                        </div>
                                        : 
                                        data.answerType === "2" ?
                                        (data.questionNo === 1 || data.questionNo === 2 || data.questionNo === 3 || data.questionNo === 6 || data.questionNo === 8) && (stage.id === 5) ?
                                        <div>
                                            {this.state.yesNoArray1 ? this.state.yesNoArray1.map((yesNo, key) => [
                                                yesNo === item.answer ? 
                                                <label className="QCLabelTitle">
                                                    <input type="radio" className="QCLabelInput" checked disabled/>
                                                    {yesNo}
                                                </label>
                                                : 
                                                <label className="QCLabelTitle">
                                                    <input type="radio" className="QCLabelInput" disabled/>
                                                    {yesNo}
                                                </label>
                                            ]) : null }
                                        </div>
                                        :
                                        <div>
                                            {this.state.yesNoArray ? this.state.yesNoArray.map((yesNo, key) => [
                                                yesNo === item.answer ? 
                                                <label className="QCLabelTitle">
                                                    <input type="radio" className="QCLabelInput" checked disabled/>
                                                    {yesNo}
                                                </label>
                                                : 
                                                <label className="QCLabelTitle">
                                                    <input type="radio" className="QCLabelInput" disabled/>
                                                    {yesNo}
                                                </label>
                                            ]) : null }
                                        </div>
                                        :
                                        data.answerType === "3" ?
                                        <div>
                                            <select className="QCquestionsInputBox" disabled>
                                                <option value="" disabled selected>{item.answer}</option>
                                            </select>
                                        </div>
                                        :
                                        data.stageId === 7 && data.questionNo === 12 ?
                                        <textarea disabled value={item.answer} className="QCTextareaBoxStyle"></textarea>
                                        :
                                        <input type="text" className="QCquestionsInputBox" disabled value={item.answer}/>
                                        }
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

            </React.Fragment>

        )
    }
}