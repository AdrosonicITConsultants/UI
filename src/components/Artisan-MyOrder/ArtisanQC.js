import React, {Component} from 'react';
import logos from "../../assets";
import TTCEapi from "../../services/API/TTCEapi";
import "./ArtisanQC.css";
import { Row, Col } from 'reactstrap';
import customToast from "../../shared/customToast";
import { toast } from "react-toastify";

export default class ArtisanQC extends Component {

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
        };   
    
    }

    handleChangeFunction = (e, questionId, stageId) => {

        var answer = e.target.value;
        var object = {
            "answer": answer,
            "enquiryId": parseInt(this.props.enquiryId),
            "questionId": questionId,
            "saveOrSend": 0,
            "stageId": stageId
        }
        
        this.state.arrayObject.push(object);
    }

    saveORsendQCFunction = (id) => {
        console.log(this.state.arrayObject);

        var currentArray = this.state.arrayObject;

        let newArray = [];      
        let uniqueObject = {}; 
              
        for (let i in currentArray) { 
            var objTitle = currentArray[i]['questionId']; 
            uniqueObject[objTitle] = currentArray[i]; 
        } 
            
        for (var i in uniqueObject) { 
            newArray.push(uniqueObject[i]); 
        }

        for (var i in newArray) {
            newArray[i].saveOrSend = id;
        }
        console.log(newArray); 

        // TTCEapi.sendOrSaveQcForm(newArray).then((response)=>{
        //     if(response.data.valid)
        //     { 
        //         this.componentDidMount();
        //         if(id === 0) {
        //             customToast.success("QC saved successfully", {
        //                 position: toast.POSITION.TOP_RIGHT,
        //                 autoClose: true,
        //             });
        //         }
        //         else {
        //             customToast.success("QC sent successfully", {
        //                 position: toast.POSITION.TOP_RIGHT,
        //                 autoClose: true,
        //             });
        //         }
        //     }
        //     console.log(response.data.data);
        // });
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
                })
            }
            console.log(response.data.data);
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
            console.log(response.data.data);
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="artisanQCBg">
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

                    {/* Stage 1 card */}
                    <div className="artisanQCCardStyle">
                        <div className="artisanQCCardHeader">Yarn Procurement</div>

                        {this.state.questionsData ? this.state.questionsData.map((data) => {
                            if(data.stageId === 1) {
                            return <div>
                                <div className="QCquestionsTitle">{data.question}</div>
                                <input type="text" className="QCquestionsInputBox" stageId={data.stageId} questionId={data.questionNo}
                                onChange={(e) => this.handleChangeFunction(e, data.questionNo, data.stageId)} id={data.id}/>
                                </div>
                            }
                        }) : null}

                        <Row noGutters={true}>
                            <Col sm={12} className="text-center QCsaveSendCol">
                                <button className="QCsaveButton" onClick={() => this.saveORsendQCFunction(0)}>Save</button>
                                <button className="QCsendButton" onClick={() => this.saveORsendQCFunction(1)}>Send</button>
                            </Col>
                        </Row>
                        
                    </div>

                    <div className="artisanQCCardStyle">
                        <div className="artisanQCCardHeader">Yarn Dyed</div>

                        {this.state.questionsData ? this.state.questionsData.map((data) => {
                            if(data.stageId === 2) {
                            return <div>
                                <div className="QCquestionsTitle">{data.question}</div>
                                
                                {data.questionNo === 1 ? 
                                <div>
                                    <label className="QCLabelTitle">
                                        <input type="checkbox" className="QCLabelInput"/>
                                        Acid
                                    </label>
                                    <label className="QCLabelTitle">
                                        <input type="checkbox" className="QCLabelInput"/>
                                        Azo Free
                                    </label>
                                    <label className="QCLabelTitle">
                                        <input type="checkbox" className="QCLabelInput"/>
                                        Natural Dye
                                    </label>
                                </div>
                                : 
                                <input type="text" className="QCquestionsInputBox" stageId={data.stageId} questionId={data.questionNo}
                                onChange={(e) => this.handleChangeFunction(e, data.questionNo, data.stageId)} id={data.id}/>
                                }
                                </div>
                            }
                        }) : null}

                        <Row noGutters={true}>
                            <Col sm={12} className="text-center QCsaveSendCol">
                                <button className="QCsaveButton" onClick={() => this.saveORsendQCFunction(0)}>Save</button>
                                <button className="QCsendButton" onClick={() => this.saveORsendQCFunction(1)}>Send</button>
                            </Col>
                        </Row>
                        
                    </div>

                    





                    
                </div>

            </React.Fragment>

        )
    }
}