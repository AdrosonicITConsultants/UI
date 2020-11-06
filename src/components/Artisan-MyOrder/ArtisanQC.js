import React, {Component} from 'react';
import logos from "../../assets";
import TTCEapi from "../../services/API/TTCEapi";
import "./ArtisanQC.css";
import { Row, Col } from 'reactstrap';
import customToast from "../../shared/customToast";
import { toast } from "react-toastify";
import Moment from 'react-moment';

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

    handleChangeFunction = (e, questionId, stageId) => {
        var answer = e.target.value;
        var object = {
            "answer": answer,
            "questionId": questionId
        }
        this.state.arrayObject.push(object);
    }

    saveORsendQCFunction = (id, stageId, stageName) => {

        this.setState({
            QCsaveButton: true,
            QCsendButton: true,
        });

        var dummy = "";
        if(stageId === 2) {
            var checkedArray = this.state.naturalCheckArray;
            var dataArray = this.state.naturalArray;
            for(var i in checkedArray) {
                if(checkedArray[i].checked === true) {
                    dummy += dataArray[i] + ",";
                }
            }
            dummy = dummy.substring(0, dummy.length - 1);
            console.log(dummy);
        }

        console.log(this.state.arrayObject);

        var currentArray = this.state.arrayObject;
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

        var questionArray = this.state.questionsData[stageId - 1];
        var updatedArray = [];
        for (var i in questionArray) {
            var object = "";
            if(stageId === 2 && questionArray[i].answerType === "1") {
                object = {
                    "answer": dummy,
                    "questionId": questionArray[i].questionNo,
                }
            }
            else {
                object = {
                    "answer": "",
                    "questionId": questionArray[i].questionNo,
                }
            }
            updatedArray.push(object);
        }
        console.log(updatedArray);

        var res = updatedArray.map(obj => newArray.find(o => o.questionId === obj.questionId) || obj);
        console.log(res);

        var finalData = {
            "enquiryId": parseInt(this.props.enquiryId),
            "questionAnswers": res,
            "saveOrSend": id,
            "stageId": stageId
        }
        console.log(finalData);

        TTCEapi.sendOrSaveQcForm(finalData).then((response)=>{
            if(response.data.valid)
            { 
                this.componentDidMount();
                if(id === 0) {
                    customToast.success("QC saved successfully for " + stageName, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: true,
                    });
                }
                else {
                    customToast.success("QC sent successfully for " + stageName, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: true,
                    });
                }
            }
            console.log(response.data.data);
        });
    }

    onlySendQCFunction = (id, stageId, stageName) => {

        this.setState({
            QCsendButton1: true,
        });
        
        var responseArray = this.state.artisanQcResponses[stageId - 1];
        var newArray = [];    
        for(var i  in responseArray) {
            var object = {
                "answer": responseArray[i].answer,
                "questionId": responseArray[i].questionId,
            }
            newArray.push(object); 
        }
        console.log(newArray);

        var finalData = {
            "enquiryId": parseInt(this.props.enquiryId),
            "questionAnswers": newArray,
            "saveOrSend": id,
            "stageId": stageId
        }
        console.log(finalData);

        TTCEapi.sendOrSaveQcForm(finalData).then((response)=>{
            if(response.data.valid)
            { 
                this.componentDidMount();
                customToast.success("QC sent successfully for " + stageName, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true,
                });
            }
            console.log(response.data.data);
        });        
    }

    handleMultiselect = (e, id, key) => {
        var checked = document.getElementById("natural" + id + key).checked;
        this.state.naturalCheckArray[key].checked = checked;
        console.log(this.state.naturalCheckArray);
    }

    handleYesNo = (e, key, questionId, id) => {
        var value = document.getElementById("yesNo" + key + id).value;
        var object = {
            "answer": value,
            "questionId": questionId,
        }
        this.state.arrayObject.push(object);
        console.log(this.state.arrayObject);
    }

    handledropdown = (e, id, questionId) => {
        var value = document.getElementById("dropdown" + id).value;
        var object = {
            "answer": value,
            "questionId": questionId,
        }
        this.state.arrayObject.push(object);
        console.log(this.state.arrayObject);
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
        this.setState({
            arrayObject: [], 
            QCsaveButton: false,
            QCsendButton: false,
            QCsendButton1: false,
        });
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
            if(this.state.artisanQcResponses[1]) {
                var data = this.state.artisanQcResponses[1][0].answer;
                console.log(data);
                var result = data.split(",");
                console.log(result);
                this.setState({
                    naturalSelectedArray: result,
                });
            }
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

            var data = this.state.questionsData[1][0].optionValue;
            console.log(data);
            var result = data.split(",");
            console.log(result);
            this.setState({
                naturalArray: result,
            });

            var yesNo = this.state.questionsData[3][3].optionValue;
            var yesNoresult = yesNo.split(";");
            console.log(yesNoresult);
            this.setState({
                yesNoArray: yesNoresult,
            });

            var dropDown = this.state.questionsData[3][4].optionValue;
            var dropDownresult = dropDown.split(";");
            console.log(dropDownresult);
            this.setState({
                dropDownArray: dropDownresult,
            });

            var yesNo1 = this.state.questionsData[4][0].optionValue;
            var yesNoresult1 = yesNo1.split(";");
            console.log(yesNoresult1);
            this.setState({
                yesNoArray1: yesNoresult1,
            });

            
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="artisanQCBg">
                    {this.props.data.oldQcExists === 1 ?
                    <div className="text-right">
                        <a href={"/viewOldQC?enquiryId="+ this.props.enquiryId} target="_blank">
                        Click to view old QC form
                        </a>
                    </div>
                    : 
                    null }
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

                    {this.state.stagesData ? this.state.stagesData.map((stage) => {
                        if((stage.id === 1 && this.state.currentStageId === null) || (this.state.currentStageId === stage.id - 1 && this.state.currentSeenStatus === 1)) {
                            // Stage active card 
                        return <div className="artisanQCCardStyle">
                            <div className="artisanQCCardHeader">{stage.stage}</div>

                            {this.state.questionsData[stage.id - 1] ? this.state.questionsData[stage.id - 1].map((data) => {
                            
                                return <div>
                                    <div className="QCquestionsTitle">{data.question}</div>
                                    {data.answerType === "1" ? 
                                    <div>
                                        {this.state.naturalArray ? this.state.naturalArray.map((natural, key) => [
                                            <label className="QCLabelTitle">
                                                <input type="checkbox" className="QCLabelInput" id={"natural" + data.id + key} 
                                                onChange={(e) => this.handleMultiselect(e, data.id, key)}/>
                                                {natural}
                                            </label>
                                        ]) : null}
                                    </div>
                                    : 
                                    data.answerType === "2" ?
                                    (data.questionNo === 1 || data.questionNo === 2 || data.questionNo === 3 || data.questionNo === 6 || data.questionNo === 8) && (stage.id === 5)?
                                    <div>
                                         {this.state.yesNoArray1 ? this.state.yesNoArray1.map((yesNo, key) => [
                                            <label className="QCLabelTitle">
                                                <input type="radio" className="QCLabelInput" name={"yes_no"+data.id} id={"yesNo" + data.id + key} value={yesNo}
                                                onChange={(e) => this.handleYesNo(e, data.id, data.questionNo, key)}/>
                                                {yesNo}
                                            </label>
                                         ]) : null }
                                    </div>
                                    :
                                    <div>
                                         {this.state.yesNoArray ? this.state.yesNoArray.map((yesNo, key) => [
                                            <label className="QCLabelTitle">
                                                <input type="radio" className="QCLabelInput" name={"yes_no"+data.id} id={"yesNo" + data.id + key} value={yesNo}
                                                onChange={(e) => this.handleYesNo(e, data.id, data.questionNo, key)}/>
                                                {yesNo}
                                            </label>
                                         ]) : null }
                                    </div>
                                    :
                                    data.answerType === "3" ?
                                    <div>
                                        <select className="QCquestionsInputBox" onChange={(e) => this.handledropdown(e, data.id, data.questionNo)}
                                        id={"dropdown"+ data.id} >
                                            <option value="">Select option</option>
                                            {this.state.dropDownArray ? this.state.dropDownArray.map((dropdown, key) => [
                                                <option id={"dropdown"+ data.id} value={dropdown}>{dropdown}</option>
                                            ]) : null}
                                        </select>
                                    </div>
                                    :
                                    data.stageId === 7 && data.questionNo === 12 ?
                                    <textarea onChange={(e) => this.handleChangeFunction(e, data.questionNo, data.stageId)} 
                                    id={data.id} maxLength="100" className="QCTextareaBoxStyle"></textarea>
                                    :
                                    <input type="text" className="QCquestionsInputBox" stageId={data.stageId} questionId={data.questionNo}
                                    onChange={(e) => this.handleChangeFunction(e, data.questionNo, data.stageId)} id={data.id} maxLength="25"/>
                                    }
                                    </div>
                            
                            }) : null}

                            {stage.id === 7 ?
                            <div className="QCdeclarationTop">
                                Declaration by AE- I, hereby certify from my end that all the processes have been Monitored & Supervised 
                                under my guidence and any issue in Quality Certified by me in person or my staff in charge is liable to be 
                                discussed with me directly on mail. Once the goods received at your doorsteps, we will not be liable for 
                                quality issue if informed after 72 hrs of receipts. 
                            </div>
                            : null }

                            <Row noGutters={true}>
                                <Col sm={12} className="text-center QCsaveSendCol">
                                    {this.state.QCsaveButton ?
                                    <button className="QCsaveDisableButton">Save</button>
                                    :
                                    <button className="QCsaveButton" onClick={() => this.saveORsendQCFunction(0, stage.id, stage.stage)}>Save</button>
                                    }
                                    {this.state.QCsendButton ?
                                    <button className="QCsendDisableButton">Send</button>
                                    :
                                    <button className="QCsendButton" onClick={() => this.saveORsendQCFunction(1, stage.id, stage.stage)}>Send</button>
                                    }
                                </Col>
                            </Row>
                            </div>
                        }
                        else if(stage.id === this.state.currentStageId && this.state.currentSeenStatus === 0) {
                            // Stage disabled card 
                        return  this.state.QCenableEditFlag === true ?
                            <div className="artisanQCCardStyle">
                            <div className="artisanQCCardHeader">{stage.stage}</div>

                            {this.state.questionsData[stage.id - 1] ? this.state.questionsData[stage.id - 1].map((data) => {
                            return this.state.artisanQcResponses[stage.id - 1] ? this.state.artisanQcResponses[stage.id - 1].map((item) => {
                                if(data.questionNo === item.questionId) {
                                return <div>
                                    <div className="QCquestionsTitle">{data.question}</div>
                                    {data.answerType === "1" ? 
                                    <div>
                                        {this.state.naturalArray ? this.state.naturalArray.map((natural, key) => [
                                            <label className="QCLabelTitle">
                                                <input type="checkbox" className="QCLabelInput" id={"natural" + data.id + key} 
                                                onChange={(e) => this.handleMultiselect(e, data.id, key)}/>
                                                {natural}
                                            </label>
                                        ]) : null}
                                    </div>
                                    : 
                                    data.answerType === "2" ?
                                    (data.questionNo === 1 || data.questionNo === 2 || data.questionNo === 3 || data.questionNo === 6 || data.questionNo === 8) && (stage.id === 5)?
                                    <div>
                                         {this.state.yesNoArray1 ? this.state.yesNoArray1.map((yesNo, key) => [
                                            <label className="QCLabelTitle">
                                                <input type="radio" className="QCLabelInput" name={"yes_no"+data.id} id={"yesNo" + data.id + key} value={yesNo}
                                                onChange={(e) => this.handleYesNo(e, data.id, data.questionNo, key)}/>
                                                {yesNo}
                                            </label>
                                         ]) : null }
                                    </div>
                                    :
                                    <div>
                                         {this.state.yesNoArray ? this.state.yesNoArray.map((yesNo, key) => [
                                            <label className="QCLabelTitle">
                                                <input type="radio" className="QCLabelInput" name={"yes_no"+data.id} id={"yesNo" + data.id + key} value={yesNo}
                                                onChange={(e) => this.handleYesNo(e, data.id, data.questionNo, key)}/>
                                                {yesNo}
                                            </label>
                                         ]) : null }
                                    </div>
                                    :
                                    data.answerType === "3" ?
                                    <div>
                                        <select className="QCquestionsInputBox" onChange={(e) => this.handledropdown(e, data.id, data.questionNo)}
                                        id={"dropdown"+ data.id} >
                                            <option value="">Select option</option>
                                            {this.state.dropDownArray ? this.state.dropDownArray.map((dropdown, key) => [
                                                <option id={"dropdown"+ data.id} value={dropdown}>{dropdown}</option>
                                            ]) : null}
                                        </select>
                                    </div>
                                    :
                                    data.stageId === 7 && data.questionNo === 12 ?
                                    <textarea onChange={(e) => this.handleChangeFunction(e, data.questionNo, data.stageId)} 
                                    id={data.id} maxLength="100" className="QCTextareaBoxStyle" value={item.answer}></textarea>
                                    :
                                    <input type="text" value={item.answer} className="QCquestionsInputBox" stageId={data.stageId} questionId={data.questionNo} 
                                    onChange={(e) => this.handleChangeFunction(e, data.questionNo, data.stageId)} id={data.id} maxLength="25"/>
                                    }
                                    </div>                            
                                    }
                                }) : null
                            }) : null}

                            {stage.id === 7 ?
                            <div className="QCdeclarationTop">
                                Declaration by AE- I, hereby certify from my end that all the processes have been Monitored & Supervised 
                                under my guidence and any issue in Quality Certified by me in person or my staff in charge is liable to be 
                                discussed with me directly on mail. Once the goods received at your doorsteps, we will not be liable for 
                                quality issue if informed after 72 hrs of receipts. 
                            </div>
                            : null }

                            <Row noGutters={true}>
                                <Col sm={12} className="text-center QCsaveSendCol">
                                    {this.state.QCsaveButton ?
                                    <button className="QCsaveDisableButton">Save</button>
                                    :
                                    <button className="QCsaveButton" onClick={() => this.saveORsendQCFunction(0, stage.id, stage.stage)}>Save</button>
                                    }
                                    {this.state.QCsendButton ?
                                    <button className="QCsendDisableButton">Send</button>
                                    :
                                    <button className="QCsendButton" onClick={() => this.saveORsendQCFunction(1, stage.id, stage.stage)}>Send</button>
                                    }
                                </Col>
                            </Row>
                            </div>
                            :
                            <div className="artisanQCCardStyle">
                            <div className="artisanQCCardHeader">{stage.stage}</div>

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
                            }) : null}

                            {stage.id === 7 ?
                            <div>
                                Declaration by AE- I, hereby certify from my end that all the processes have been Monitored & Supervised 
                                under my guidence and any issue in Quality Certified by me in person or my staff in charge is liable to be 
                                discussed with me directly on mail. Once the goods received at your doorsteps, we will not be liable for 
                                quality issue if informed after 72 hrs of receipts. 
                            </div>
                            : null }

                            <Row noGutters={true}>
                                <Col sm={12} className="text-center QCsaveSendCol">
                                    
                                    <button className="QCsaveDisableButton" onClick={this.QCenableEdit}>Edit</button>
                                    
                                    {this.state.QCsendButton1 ?
                                    <button className="QCsendDisableButton">Send</button>
                                    :
                                    <button className="QCsendButton" onClick={() => this.onlySendQCFunction(1, stage.id, stage.stage)}>Send</button>
                                    }
                                </Col>
                            </Row>
                            </div>
                        }                      
                        
                    }) : null}

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