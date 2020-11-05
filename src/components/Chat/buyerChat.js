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

export default class BuyerChat extends Component {

    constructor() {
        super();
        this.artisanChatShareFileFunction= this.artisanChatShareFileFunction.bind(this);
        this.artisanChatShareAudioFunction = this.artisanChatShareAudioFunction.bind(this);
        this.artisanChatShareVideoFunction = this.artisanChatShareVideoFunction.bind(this);
        this.artisanChatSharePhotoFunction = this.artisanChatSharePhotoFunction.bind(this);
        this.state = {  
            onLoadChatList: [],
            loading: false,
            defaultChatWindow: true,
            selectedKey: -1,
            userData: "",
            selectedEnquiryData: "",
            selectedChatList: [],
            sendButtonActive: false,
            todayDate: "",
            selectedFile: "",
            selectedFileName: "",
            selectedFileSize: 0,
            showEscalationScreen: false,
            getEscalationsList: [],
            chatSelectedEscalationValue: "",
            getEscalationsDataArray: [],
            enableRaiseEscButton: false,
            dropdownChatList: [],
            showDropDown: false,
            filter: null,
            showNoResultsMsg: false,
            filter1: null,
            showNoResultsMsg1: false,
            escalationButtonOkDisable: false,
            markResolvedButtonDisable: false,
            enableRaiseErrorMsg: "",
            enableRaiseErrorFlag: false,
        };   
    
    }

    scrollToBottom = () => {
        var element = document.getElementById("scrollBottomDiv");
        if(element) {
            element.scrollIntoView({
                block: "end",
                behavior: "smooth"
            });
        }        
    }

    openConversationfunction = (key, enquiryId, data) => {
        var input = document.getElementById("chatTextInput");
        if(input !== null) {
            input.value = '';
        }
        this.setState({
            selectedKey: enquiryId,
            selectedEnquiryData: data,
            defaultChatWindow: false,
        }); 

        TTCEapi.getAndReadChatMessageForEnquiry(enquiryId).then((response)=>{
            if(response.data.valid)
            {
                console.log(response.data.data);
                this.setState({
                    selectedChatList: response.data.data,
                    loading: false,
                });
                this.scrollToBottom();
            }
        });

        var searchedString = "";
        TTCEapi.getEnquiryMessageChatList(searchedString).then((response)=>{
            if(response.data.valid)
            {
                console.log(response.data.data);
                this.setState({
                    onLoadChatList: response.data.data,
                    loading: false,
                });
            }
        });

        TTCEapi.getEscalationSummaryForEnquiry(enquiryId).then((response)=>{
            if(response.data.valid)
            {
                console.log(response.data.data);
                this.setState({
                    getEscalationsDataArray: response.data.data,
                    loading: false,
                });
            }
        });
    }

    showUpdatedConversation = (enquiryId) => {
        var input = document.getElementById("chatTextInput");
        if(input !== null) {
            input.value = '';
        }
        
        TTCEapi.getAndReadChatMessageForEnquiry(enquiryId).then((response)=>{
            if(response.data.valid)
            {
                console.log(response.data.data);
                this.setState({
                    selectedChatList: response.data.data,
                    loading: false,
                });
                this.scrollToBottom();
            }
        });
    }

    handleChatTextInput = (e) => {
       var data = e.target.value;

       if(data) {
           this.setState({
               sendButtonActive: true
           });
       }
       else {
            this.setState({
                sendButtonActive: false
            });
       }
    }

    artisanSendChatFunction = (mediaTypeId) => {
        var chatData = document.getElementById("chatTextInput").value;
        console.log(chatData);

        this.setState({
            sendButtonActive: false
        });

        var messageJson = {
            enquiryId: this.state.selectedEnquiryData.enquiryId,
            messageFrom: this.state.userData.id,
            messageTo: this.state.selectedEnquiryData.buyerId,
            messageString: chatData,
            mediaType: mediaTypeId,
        }

        var stringData = JSON.stringify(messageJson);
        var formData = new FormData();
        formData.append("messageJson", stringData);
        formData.append("file", this.state.selectedFile);

        TTCEapi.sendChatboxMessage(formData).then((response)=>{
            if(response.data.valid)
            {
                console.log(response.data.data);
                document.getElementById('artisanChatShareFile1').style.display='none';
                document.getElementById('artisanChatShareAudio1').style.display='none';
                document.getElementById('artisanChatShareVideo1').style.display='none';
                document.getElementById('artisanChatSharePhoto1').style.display='none';
                this.showUpdatedConversation(this.state.selectedEnquiryData.enquiryId);
                this.componentDidMount();
            }
        });     
    }

    artisanChatAttachFunction = () => {
        document.getElementById('artisanChatAttachModal').style.display='block';
    }

    artisanChatAttachClose = () => {
        document.getElementById('artisanChatAttachModal').style.display='none';
    }

    artisanChatShareFileFunction (e) {
        console.log(e);
        this.setState({
            selectedFile: e.target.files[0],
        },()=>{
            if(this.state.selectedFile) {
                var size = Math.ceil((this.state.selectedFile.size / 1024));  
                console.log(size);  
                this.setState({
                    selectedFileName: this.state.selectedFile.name,
                    selectedFileSize: size,
                });
                console.log(this.state.selectedFile);
                console.log(this.state.selectedFileName);
                console.log(this.state.selectedFileSize);
                document.getElementById('artisanChatAttachModal').style.display='none';
                document.getElementById('artisanChatShareFile').style.display='block';
            }
        });
    }

    artisanChatShareFileClose = () => {
        document.getElementById('artisanChatShareFile').style.display='none';
        document.getElementById('artisanChatAttachModal').style.display='block';
    }

    artisanUploadFile = () => {
        document.getElementById('artisanChatShareFile').style.display='none';
        document.getElementById('artisanChatShareFile1').style.display='block';
        this.artisanSendChatFunction(2);
    }

    artisanChatShareFileClose1 = () => {
        document.getElementById('artisanChatAttachModal').style.display='none';
        document.getElementById('artisanChatShareFile').style.display='none';
        document.getElementById('artisanChatShareFile1').style.display='none';
    }

    artisanChatShareAudioFunction (e) {
        console.log(e);
        this.setState({
            selectedFile: e.target.files[0],
        },()=>{
            if(this.state.selectedFile) {
                var size = Math.ceil((this.state.selectedFile.size / 1024));  
                console.log(size);  
                this.setState({
                    selectedFileName: this.state.selectedFile.name,
                    selectedFileSize: size,
                });
                console.log(this.state.selectedFile);
                console.log(this.state.selectedFileName);
                console.log(this.state.selectedFileSize);
                document.getElementById('artisanChatAttachModal').style.display='none';
                document.getElementById('artisanChatShareAudio').style.display='block';
            }
        });
    }

    artisanChatShareAudioClose = () => {
        document.getElementById('artisanChatShareAudio').style.display='none';
        document.getElementById('artisanChatAttachModal').style.display='block';
    }

    artisanUploadAudio = () => {
        document.getElementById('artisanChatShareAudio').style.display='none';
        document.getElementById('artisanChatShareAudio1').style.display='block';
        this.artisanSendChatFunction(4);
    }

    artisanChatShareAudioClose1 = () => {
        document.getElementById('artisanChatAttachModal').style.display='none';
        document.getElementById('artisanChatShareAudio').style.display='none';
        document.getElementById('artisanChatShareAudio1').style.display='none';
    }

    artisanChatShareVideoFunction (e) {
        console.log(e);
        this.setState({
            selectedFile: e.target.files[0],
        },()=>{
            if(this.state.selectedFile) {
                var size = Math.ceil((this.state.selectedFile.size / 1024));  
                console.log(size);  
                this.setState({
                    selectedFileName: this.state.selectedFile.name,
                    selectedFileSize: size,
                });
                console.log(this.state.selectedFile);
                console.log(this.state.selectedFileName);
                console.log(this.state.selectedFileSize);
                document.getElementById('artisanChatAttachModal').style.display='none';
                document.getElementById('artisanChatShareVideo').style.display='block';
            }
        });
    }

    artisanChatShareVideoClose = () => {
        document.getElementById('artisanChatShareVideo').style.display='none';
        document.getElementById('artisanChatAttachModal').style.display='block';
    }

    artisanUploadVideo = () => {
        document.getElementById('artisanChatShareVideo').style.display='none';
        document.getElementById('artisanChatShareVideo1').style.display='block';
        this.artisanSendChatFunction(5);
    }

    artisanChatShareVideoClose1 = () => {
        document.getElementById('artisanChatAttachModal').style.display='none';
        document.getElementById('artisanChatShareVideo').style.display='none';
        document.getElementById('artisanChatShareVideo1').style.display='none';
    }

    artisanChatSharePhotoFunction (e) {
        console.log(e);
        this.setState({
            selectedFile: e.target.files[0],
        },()=>{
            if(this.state.selectedFile) {
                var size = Math.ceil((this.state.selectedFile.size / 1024));  
                console.log(size);  
                this.setState({
                    selectedFileName: this.state.selectedFile.name,
                    selectedFileSize: size,
                });
                console.log(this.state.selectedFile);
                console.log(this.state.selectedFileName);
                console.log(this.state.selectedFileSize);
                document.getElementById('artisanChatAttachModal').style.display='none';
                document.getElementById('artisanChatSharePhoto').style.display='block';
            }
        });
    }

    artisanChatSharePhotoClose = () => {
        document.getElementById('artisanChatSharePhoto').style.display='none';
        document.getElementById('artisanChatAttachModal').style.display='block';
    }

    artisanUploadPhoto = () => {
        document.getElementById('artisanChatSharePhoto').style.display='none';
        document.getElementById('artisanChatSharePhoto1').style.display='block';
        this.artisanSendChatFunction(3);
    }

    artisanChatSharePhotoClose1 = () => {
        document.getElementById('artisanChatAttachModal').style.display='none';
        document.getElementById('artisanChatSharePhoto').style.display='none';
        document.getElementById('artisanChatSharePhoto1').style.display='none';
    }

    goToEscalationFunction = () => {
        TTCEapi.getEscalationSummaryForEnquiry(this.state.selectedEnquiryData.enquiryId).then((response)=>{
            if(response.data.valid)
            {
                console.log(response.data.data);
                this.setState({
                    getEscalationsDataArray: response.data.data,
                    loading: false,
                    showEscalationScreen: true,
                });
            }
        });
    }

    goToChatFunction = () => {
        this.scrollToBottom();
        this.setState({
            showEscalationScreen: false,
        });
    }

    openChatEscalationModal = () => {
        var data1 = "";
        document.getElementById('chatEscalationSelectId').value = data1;
        var data2 = "";
        document.getElementById('chatEscalationTextareaId').value = data2;

        document.getElementById('raiseEscalationModal').style.display='block';
    }

    openChatEscalationModalClose = () => {
        document.getElementById('raiseEscalationModal').style.display='none';
    }

    escalationSelectFunction = () =>  {
        var data = document.getElementById("chatEscalationSelectId").value;
        var textData = document.getElementById("chatEscalationTextareaId").value;

        this.setState({
            chatSelectedEscalationValue: data,           
        });
        console.log(this.state.chatSelectedEscalationValue);

        if(data !== "" && textData !== "") {
            this.setState({
                enableRaiseEscButton: true,
            });
        }
        else {
            this.setState({
                enableRaiseEscButton: false,
                enableRaiseErrorMsg: "",
                enableRaiseErrorFlag: false,
            });
        }
    }

    raiseEscalationFunction = () => {

        var textValue = document.getElementById("chatEscalationTextareaId").value;
        console.log(textValue);

        var data = this.state.chatSelectedEscalationValue;
        var array = this.state.getEscalationsList;
        var categoryId = 0;
        for(var i in array) { 
            if(array[i].category === data) {
                categoryId = array[i].id;
            }
        }

        var object = {
            category: categoryId,
            enquiryId: this.state.selectedEnquiryData.enquiryId,
            escalationFrom: this.state.userData.id,
            escalationTo: this.state.selectedEnquiryData.buyerId,
            text: textValue
        }
        console.log(object);

        this.setState({
            raiseEscalationFinalData: object,
        });
        console.log(this.state.raiseEscalationFinalData);

        document.getElementById('raiseEscalationModal').style.display='none';
        document.getElementById('raiseEscalationConfirmModal').style.display='block';
    }

    chatEscalationConfirmModalClose = () => {
        document.getElementById('raiseEscalationConfirmModal').style.display='none';
        document.getElementById('raiseEscalationModal').style.display='block';
    }

    chatEscConfirmModalOkButton = () => {
        this.setState({
            escalationButtonOkDisable: true,
        });
        console.log(this.state.raiseEscalationFinalData);
        var finalData = this.state.raiseEscalationFinalData;

        TTCEapi.raiseEscalaton(finalData).then((response)=>{
            if(response.data.valid)
            {
                console.log(response.data.data);
                document.getElementById('raiseEscalationConfirmModal').style.display='none';
                this.goToEscalationFunction();
                this.updateEscNoFunction();
                this.setState({
                    escalationButtonOkDisable: false,
                    enableRaiseEscButton: false,
                });
                customToast.success("Escalation raised successfully", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true,
                });
            }
            else {
                document.getElementById('raiseEscalationConfirmModal').style.display='none';
                this.setState({
                    escalationButtonOkDisable: false,
                    enableRaiseEscButton: false,
                });
                customToast.error("Escalation not raised", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true,
                });
            }
        });
    }

    updateEscNoFunction = () => {
        var searchedString = "";
        TTCEapi.getEnquiryMessageChatList(searchedString).then((response)=>{
            if(response.data.valid)
            {
                console.log(response.data.data);
                this.setState({
                    onLoadChatList: response.data.data,
                    loading: false,
                });
                var array = response.data.data;
                for(var i in array) {
                    if(array[i].enquiryId === this.state.selectedEnquiryData.enquiryId) {
                        this.setState({
                            selectedEnquiryData: array[i],
                        });
                    }
                }
            }
        });
    }

    markResolveEscFunction = (escId) => {
        this.setState({
            markResolvedButtonDisable: true,
        });
        TTCEapi.resolveEscalation(escId).then((response)=>{
            if(response.data.valid)
            {
                console.log(response.data.data);
                this.goToEscalationFunction();
                this.updateEscNoFunction();
                this.setState({
                    markResolvedButtonDisable: false,
                });
                customToast.success("Escalation resolved successfully", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true,
                });
            }
            else {
                this.setState({
                    markResolvedButtonDisable: false,
                });
                customToast.error("Escalation not resolved", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true,
                });
            }
        });
    }

    openDropdownChatList = () => {
        this.setState({
            showDropDown: true,
        });
    }

    showDropDownClose = () => {
        this.setState({
            showDropDown: false,
        });
    }

    initiateNewChatFunction = (key, enquiryId, data) => {
        this.setState({
            showDropDown: false,
        });
        TTCEapi.goToEnquiryChat(enquiryId).then((response)=>{
            if(response.data.valid)
            {
                console.log(response.data.data);
                this.setState({
                    selectedKey: enquiryId,
                    selectedEnquiryData: data,
                    defaultChatWindow: false,
                    loading: false,
                });
                var searchedString = "";
                TTCEapi.getEnquiryMessageChatList(searchedString).then((response)=>{
                    if(response.data.valid)
                    {
                        console.log(response.data.data);
                        this.setState({
                            onLoadChatList: response.data.data,
                            loading: false,
                        });
                    }
                });
                TTCEapi.getNewEnquiryMessageChatList(searchedString).then((response)=>{
                    if(response.data.valid)
                    {
                        console.log(response.data.data);
                        this.setState({
                            dropdownChatList: response.data.data,
                            loading: false,
                        });
                    }
                });
                TTCEapi.getAndReadChatMessageForEnquiry(enquiryId).then((response)=>{
                    if(response.data.valid)
                    {
                        console.log(response.data.data);
                        this.setState({
                            selectedChatList: response.data.data,
                            loading: false,
                        });
                        this.scrollToBottom();
                    }
                });
            }
        });
        
    }

    updateSearch = (inputValue) => {
        let filter = this.state.filter;
    
        this.setState({
            filter: inputValue
        });
    }

    handleSearchChange = (event) => {
        this.updateSearch(event.target.value);
    }

    filter = (data) => {
        if (!this.state.filter) {
            return data;
        }

        let result = data.filter((data) => data.enquiryNumber.toLowerCase().indexOf(this.state.filter.toLowerCase()) >= 0 ||
                                        (data.buyerCompanyName !== "" && data.buyerCompanyName !== null && data.buyerCompanyName.toLowerCase().indexOf(this.state.filter.toLowerCase()) >= 0) 
        )

        if(result.length !== 0) {
            this.state.showNoResultsMsg = false;
        }
        else if(result.length === 0) {
            this.state.showNoResultsMsg = true;
        }
        return result;
    }

    updateSearch1 = (inputValue) => {
        let filter = this.state.filter1;
    
        this.setState({
            filter1: inputValue
        });
    }

    handleSearchChange1 = (event) => {
        this.updateSearch1(event.target.value);
    }

    filter1 = (data) => {
        if (!this.state.filter1) {
            return data;
        }

        let result = data.filter((data) => data.enquiryNumber.toLowerCase().indexOf(this.state.filter1.toLowerCase()) >= 0 ||
                                        (data.buyerCompanyName !== "" && data.buyerCompanyName !== null && data.buyerCompanyName.toLowerCase().indexOf(this.state.filter1.toLowerCase()) >= 0) 
        )

        if(result.length !== 0) {
            this.state.showNoResultsMsg1 = false;
        }
        else if(result.length === 0) {
            this.state.showNoResultsMsg1 = true;
        }

        return result;
    }

    daysLeftChatEsc(name, days) {
        var someDate = new Date(name);
        var numberOfDaysToAdd =parseInt(days);
        someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
        var todayDate= new Date();
        const diffTime =  someDate - todayDate ;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60)); 
        return(diffDays);
    }

    chathandleKeyDown = (e) => {
        if (e.key === 'Enter') {
            console.log('do validate');
            this.artisanSendChatFunction(1);
        }
    }

    raiseEscalationError = () => {
        var data = document.getElementById("chatEscalationSelectId").value;
        var textData = document.getElementById("chatEscalationTextareaId").value;

        if(data === "" && textData === "") {
            this.setState({
                enableRaiseErrorFlag: true,
                enableRaiseErrorMsg: "Please select escalation type & enter detailed description",
            });
        }
        else if(data === "") {
            this.setState({
                enableRaiseErrorFlag: true,
                enableRaiseErrorMsg: "Please select escalation type",
            });
        }
        else if(textData === "") {
            this.setState({
                enableRaiseErrorFlag: true,
                enableRaiseErrorMsg: "Please enter detailed description",
            });
        }
    }

    componentDidMount() {

        var today = new Date(); 
        var currentDate = today.getDate();
        var currentMonth = today.getMonth();
        var currentYear = today.getFullYear();
        var onLoadChatListArray = [];
        var dropdownChatListArray = [];

        var finalDate = currentYear + "-" + ((currentMonth+1) > 9 ? (currentMonth+1) : "0"+(currentMonth+1)) + "-" + ((currentDate > 9) ? currentDate : "0"+(currentMonth));
        console.log(finalDate);

        let userData = JSON.parse(localStorage.getItem("user"));
        
        this.setState({
            loading: true,
            userData: userData,
            todayDate: finalDate,
        });

        var searchedString = "";
        TTCEapi.getEnquiryMessageChatList(searchedString).then((response)=>{
            if(response.data.valid)
            {
                console.log(response.data.data);
                this.setState({
                    onLoadChatList: response.data.data,
                    loading: false,
                });
                onLoadChatListArray = response.data.data;
            }
            TTCEapi.getNewEnquiryMessageChatList(searchedString).then((response)=>{
                if(response.data.valid)
                {
                    console.log(response.data.data);
                    this.setState({
                        dropdownChatList: response.data.data,
                        loading: false,
                    });
                    dropdownChatListArray = response.data.data;
                }
                if(onLoadChatListArray.length !== 0 || dropdownChatListArray.length !== 0) {
                    var enquiryId = parseInt(localStorage.getItem("goToChatButtonEnquiryId"));
                    localStorage.removeItem("goToChatButtonEnquiryId");
                    var array1 = onLoadChatListArray;
                    var array2 = dropdownChatListArray;
                    
                    if(enquiryId) {
                        for(var i in array1) {
                            if(enquiryId === array1[i].enquiryId) {
                                this.openConversationfunction(0, array1[i].enquiryId, array1[i]);
                            }
                        }
            
                        for(var i in array2) {
                            if(enquiryId === array2[i].enquiryId) {
                                this.initiateNewChatFunction(0, array2[i].enquiryId, array2[i]);
                            }
                        }        
                    }            
                }
            });
        });        

        TTCEapi.getEscalations().then((response)=>{
            if(response.data.valid)
            {
                console.log(response.data.data);
                this.setState({
                    getEscalationsList: response.data.data,
                    loading: false,
                });
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
                         
                        {this.state.showDropDown === true ? 
                        <div className="showDropdownListClass">
                        <div className="artisanChatOnLoadBarNewValue">
                            <Row noGutters={true}>
                                <Col className="chatRemovePadding col-xs-10">
                                    <div className="artisanChatSearchBoxOuter">
                                        <img src={logos.artisanChatSearchIcon}/>
                                        <input value={this.state.filter} onChange={(e) => this.handleSearchChange(e)} placeholder="Search by enquiry/ order id/ artisan's name"></input>
                                    </div>
                                </Col>
                                <Col className="col-xs-2 text-right" onClick={this.showDropDownClose}>
                                    <img src={logos.closelogo} className="chatAttachCloseIcon" style={{marginTop: "20px"}}/>
                                </Col>
                            </Row>
                        </div> 
                        {/* {this.state.showNoResultsMsg === true ?  
                            <Row noGutters={true}>
                            <Col sm={12} className="text-center">
                                <div className="chatNoResultsClass">No results found</div>
                            </Col>
                            </Row>
                        : null } */}
                            
                        <div className="chatLeftScrollStyle">
                        <div className="chatLeftHeight chatLeftScrollStyle">
                        {this.state.dropdownChatList ? this.filter(this.state.dropdownChatList).map((data, key) => {
                        return <Row noGutters={true} 
                                className={(this.state.defaultChatWindow === false) && (this.state.selectedKey === data.enquiryId) ?
                                data.orderStatusId === 10 && data.orderReceiveDate !== null ? 
                                "chatEnquiryRow chatEnquiryRowBlack chatEnquirySelectedBG" : 
                                "chatEnquiryRow chatEnquiryRowGreen chatEnquirySelectedBG" :
                                data.orderStatusId === 10 && data.orderReceiveDate !== null ? 
                                "chatEnquiryRow chatEnquiryRowBlack" :
                                "chatEnquiryRow chatEnquiryRowGreen"}
                                onClick={() => this.initiateNewChatFunction(key, data.enquiryId, data)} id={key}>
                                <Col className="col-xs-2 chatEnquiryImgCol">
                                    {data.buyerLogo ? 
                                    <img src={ TTCEapi.ImageUrl + 'User/' + data.buyerId + "/CompanyDetails/Logo/" + data.buyerLogo} 
                                            className="chatEnquiryImg"/> 
                                    :
                                    <img src={logos.defaultChatProfilePlaceholder} className="chatEnquiryImg"/>
                                    }
                                </Col>
                                <Col className="col-xs-8">
                                    <div className="chatEnquiryBrandName">{data.buyerCompanyName ? data.buyerCompanyName : "NA"}</div>
                                    <div className="chatEnquiryId">E/O Id: {data.enquiryNumber}</div>
                                </Col>
                                <Col className="col-xs-2 chatRemovePadding">
                                    <div className="chatEnquiryBrandName">
                                        <Moment format="DD-MM-YY">{data.lastUpdatedOn}</Moment>
                                    </div>
                                    <Row noGutters={true}>
                                        <Col className="col-xs-6 chatRemovePadding">
                                            {data.escalation > 0 ? 
                                                <img src={logos.Iconioniciosalert1} className="chatEscalationIcon"/>
                                            : null }
                                        </Col>
                                        <Col className="col-xs-6 chatRemovePadding">
                                            {data.unreadMessage ? 
                                                <div className="chatEnquiryNotifyNo">{data.unreadMessage}</div>
                                            : null }
                                        </Col>
                                    </Row>
                                    
                                </Col>
                            </Row>
                        }) : null} 
                        </div>	
                        </div> 
                        </div>
                        : 
                        <>
                        <div className="artisanChatOnLoadBar">
                            <Row noGutters={true}>
                                <Col className="chatRemovePadding col-xs-10">
                                    <div className="artisanChatSearchBoxOuter">
                                        <img src={logos.artisanChatSearchIcon}/>
                                        <input value={this.state.filter1} onChange={(e) => this.handleSearchChange1(e)} placeholder="Search by enquiry/ order id/ artisan's name"></input>
                                    </div>
                                </Col>
                                <Col className="col-xs-1 chatRemovePadding" onClick={this.openDropdownChatList}>
                                    <img  src={logos.artisanChatDropDownIcon} className="artisanChatDropDownIcon"/>
                                </Col>
                            </Row>
                        </div>
                        {/* {this.state.showNoResultsMsg1 === true ?  
                        <Row noGutters={true}>
                        <Col sm={12} className="text-center">
                            <div className="chatNoResultsClass">No results found</div>
                        </Col>
                        </Row>
                        : null } */}
                        <div className="chatLeftScrollStyle">
                        <div className="chatLeftHeight chatLeftScrollStyle">
                        {this.state.onLoadChatList ? this.filter1(this.state.onLoadChatList).map((data, key) => {
                        return <Row noGutters={true} 
                                className={(this.state.defaultChatWindow === false) && (this.state.selectedKey === data.enquiryId) ?
                                data.orderStatusId === 10 && data.orderReceiveDate !== null ? 
                                "chatEnquiryRow chatEnquiryRowBlack chatEnquirySelectedBG" : 
                                "chatEnquiryRow chatEnquiryRowGreen chatEnquirySelectedBG" :
                                data.orderStatusId === 10 && data.orderReceiveDate !== null ? 
                                "chatEnquiryRow chatEnquiryRowBlack" :
                                "chatEnquiryRow chatEnquiryRowGreen"}
                                onClick={() => this.openConversationfunction(key, data.enquiryId, data)} id={key}>
                                <Col className="col-xs-2 chatEnquiryImgCol">
                                    {data.buyerLogo ? 
                                    <img src={ TTCEapi.ImageUrl + 'User/' + data.buyerId + "/CompanyDetails/Logo/" + data.buyerLogo} 
                                            className="chatEnquiryImg"/> 
                                    :
                                    <img src={logos.defaultChatProfilePlaceholder} className="chatEnquiryImg"/>
                                    }
                                </Col>
                                <Col className="col-xs-8">
                                    <div className="chatEnquiryBrandName">{data.buyerCompanyName ? data.buyerCompanyName : "NA"}</div>
                                    <div className="chatEnquiryId">E/O Id: {data.enquiryNumber}</div>
                                </Col>
                                <Col className="col-xs-2 chatRemovePadding">
                                    <div className="chatEnquiryBrandName text-right chatLeftDate">
                                        <Moment format="DD-MM-YY">{data.lastChatDate}</Moment>
                                    </div>
                                    <div className="chatEnquiryBrandName text-right chatLeftTime">
                                        <Moment format="HH:mm">{data.lastChatDate}</Moment>
                                    </div>
                                    <Row noGutters={true}>
                                        <Col className="col-xs-6 chatRemovePadding">
                                            {data.escalation > 0 ? 
                                                <img src={logos.Iconioniciosalert1} className="chatEscalationIcon"/>
                                            : null }
                                        </Col>
                                        <Col className="col-xs-6 chatRemovePadding">
                                            {data.unreadMessage ? 
                                                <div className="chatEnquiryNotifyNo">{data.unreadMessage}</div>
                                            : null }
                                        </Col>
                                    </Row>
                                    
                                </Col>
                            </Row>
                        }) : null} 
                        </div>	
                        </div> 
                        </>
                        } 
                    </Col>

                    {this.state.defaultChatWindow === true ?
                    <Col md={8} sm={12} className="col-xs-12 chatRemovePadding">
                        <div className="artisanChatOnLoadBar chatBarBorderLeft"></div>
                        <div className="chatRightHeight">
                            <div className="artisanChatTalkMoreText">Talk more & buy with confidence !</div>
                            <div className="artisanChatTalkMoreText1">Select the chat to view conversation here !</div>
                            <img  src={logos.artisanChatChatIcon} className="artisanChatChatIcon"/>
                        </div>                        
                    </Col>
                    : 
                    <Col md={8} sm={12} className="col-xs-12 chatRemovePadding">
                        <div className="artisanChatOnLoadBar1 chatBarBorderLeft">
                            {this.state.selectedEnquiryData ? 
                            <Row noGutters={true}>
                                <Col className="col-xs-4 chatPadding6Pixel">
                                    <Row noGutters={true} className="chatUpperBoxBorderRight">
                                        <Col className="col-xs-2 chatRemovePadding chatEnquiryImgCol">
                                        {this.state.selectedEnquiryData.buyerLogo ? 
                                        <img src={ TTCEapi.ImageUrl + 'User/' + this.state.selectedEnquiryData.buyerId + "/CompanyDetails/Logo/" + this.state.selectedEnquiryData.buyerLogo} 
                                             className="chatEnquiryImg1"/> 
                                        :
                                        <img src={logos.defaultChatProfilePlaceholder} className="chatEnquiryImg1"/>
                                        }
                                        </Col>
                                        <Col className="col-xs-10 chatRemovePadding">
                                            <div className="chatEnquiryBrandName chatEnquiryBrandNameUpperBox">{this.state.selectedEnquiryData.buyerCompanyName ? this.state.selectedEnquiryData.buyerCompanyName : "NA"}</div>
                                            <div className="chatEnquiryId chatEnquiryIdUpperBox">E/O Id: {this.state.selectedEnquiryData.enquiryNumber}</div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col className="col-xs-4 chatPadding6Pixel">
                                    <div className="artisanChatDateStart">Date Started: <Moment format="DD-MM-YY">
                                        {this.state.selectedEnquiryData.enquiryGeneratedOn}
                                    </Moment></div>
                                    <div className="artisanChatConvertDate">Converted to order on: {this.state.selectedEnquiryData.convertedToOrderDate ?
                                    <Moment format="DD-MM-YY">
                                        {this.state.selectedEnquiryData.convertedToOrderDate}
                                    </Moment>
                                    :  "NA" }
                                    </div>
                                    <div className="artisanChatProductType">{this.state.selectedEnquiryData.productTypeId}</div>
                                </Col>
                                <Col className="col-xs-4 chatPadding6Pixel text-right">
                                    <div className="artisanChatLastUpdate">
                                        <span className="chatUpperBoxOrderStatus">{this.state.selectedEnquiryData.orderStatus}</span> 
                                        <span className="chatUpperBoxOrderStatusCircle"></span>
                                    </div>
                                    <div className="artisanChatLastUpdate">Last updated on: <Moment format="DD-MM-YY">
                                        {this.state.selectedEnquiryData.lastUpdatedOn}
                                    </Moment></div>
                                </Col>
                            </Row>
                            : null }
                        </div>
                        {this.state.showEscalationScreen === true ?
                        <>
                        <div className="chatGradientBgReverse">
                            <Row noGutters={true}>
                                <Col className="col-xs-6 chatRemovePadding chatRightGoToEsc">
                                    <span onClick={this.goToChatFunction} className="goToChatFunction">{"<"} Go back to chat</span>
                                </Col>
                                <Col className="col-xs-6 chatRemovePadding text-right">
                                    {this.state.selectedEnquiryData.escalation !== 0 ?
                                    <>
                                        <img src={logos.Iconioniciosalert1} className="chatRightGoToEscImgNew"/>
                                        {this.state.selectedEnquiryData.escalation === 1 ? 
                                        <span className="chatRightGoToEscTextNew">{this.state.selectedEnquiryData.escalation} Escalation Pending</span>
                                        :
                                        <span className="chatRightGoToEscTextNew">{this.state.selectedEnquiryData.escalation} Escalations Pending</span>
                                        }
                                    </>
                                    : null }
                                </Col>
                            </Row>
                        </div>
                        <div className="chatRightHeight artisanChatBG artisanChatEscPadding">
                        <div className="chatEscDataShowOverflow">
                        {this.state.getEscalationsDataArray ? this.state.getEscalationsDataArray.map((data) => {
                            if(data.escalationFrom === this.state.userData.id) {
                                if(data.isResolve === 1) {
                                return <Row noGutters={true} className="chatEscRow1Data1">
                                <Col className="col-xs-1">
                                    <div>
                                        <img src={logos.buyerEscLogo} className="buyerEscLogo"/>
                                    </div>
                                    <div>
                                        <img src={logos.chatEscGreenAlert} className="chatEscRedIconSelf"/>
                                    </div>
                                </Col>
                                <Col className="col-xs-8">
                                    <div className="chatEscShowCenterColTop1">
                                    <span className="chatEscShowCenterColText1">Raised by you on <Moment format="DD-MM-YY">
                                            {data.createdOn}</Moment> at <Moment format="HH:mm">
                                            {data.createdOn}</Moment></span>
                                    </div>
                                    <div className="chatEscShowCenterColContent1">{data.text}</div>
                                </Col>
                                <Col className="col-xs-3">
                                    <div className="chatEscShowEndColOuter1">
                                        <div className="text-center">
                                            <img src={logos.chatEscGreenCircleTick} className="chatEscGreenCircleTick"/>
                                        </div>
                                        <div className="chatEscShowEndColText1">Mark as resolved by you</div>
                                    </div>
                                </Col>
                            </Row>
                                }
                                else {
                                return <Row noGutters={true} className="chatEscRow1Data1">
                                <Col className="col-xs-1">
                                    <div>
                                        <img src={logos.buyerEscLogo} className="buyerEscLogo"/>
                                    </div>
                                    <div>
                                        <img src={logos.chatEscGreenAlert} className="chatEscRedIconSelf"/>
                                    </div>
                                </Col>
                                <Col className="col-xs-9">
                                    <div className="chatEscShowCenterColTop1">
                                    <span className="chatEscShowCenterColText1">Raised by you on <Moment format="DD-MM-YY">
                                            {data.createdOn}</Moment> at <Moment format="HH:mm">
                                            {data.createdOn}</Moment></span>
                                            <span className="chatEscShowCenterColText2">Awaiting resolution. {this.daysLeftChatEsc(data.createdOn, 2) > 0 ? this.daysLeftChatEsc(data.createdOn, 2) : "0"} hrs left to auto escalate</span>
                                    </div>
                                    <div className="chatEscShowCenterColContent1">{data.text}</div>
                                </Col>
                                {this.daysLeftChatEsc(data.createdOn, 2) > 0 ?
                                <Col className="col-xs-2">
                                    {this.state.markResolvedButtonDisable === true ? 
                                    <div className="chatEscShowEndColOuter">
                                        <div className="chatEscShowEndColText">Mark <br/> Resolved</div>
                                        <div className="text-center">
                                            <img src={logos.chatEscGreenTick} className="chatEscShowEndColImg"/>
                                        </div>
                                    </div>
                                    : 
                                    <div className="chatEscShowEndColOuter" onClick={() => this.markResolveEscFunction(data.id)}>
                                        <div className="chatEscShowEndColText">Mark <br/> Resolved</div>
                                        <div className="text-center">
                                            <img src={logos.chatEscGreenTick} className="chatEscShowEndColImg"/>
                                        </div>
                                    </div>
                                    }
                                </Col>
                                : null }
                            </Row>
                                }
                            }
                            else {
                                if(data.isResolve === 1) {
                                return <Row noGutters={true} className="chatEscRow1Data">
                                <Col className="col-xs-1">
                                    <div>
                                        <img src={logos.artisanEscLogo} className="artisanEscLogo"/>
                                    </div>
                                    <div>
                                        <img src={logos.chatEscGreenAlert} className="chatEscRedIconSelf"/>
                                    </div>
                                </Col>
                                <Col className="col-xs-8">
                                    <div className="chatEscShowCenterColTop">
                                        <span className="chatEscShowCenterColText1">Raised by Artisan on <Moment format="DD-MM-YY">
                                            {data.createdOn}</Moment> at <Moment format="HH:mm">
                                            {data.createdOn}</Moment></span>
                                    </div>
                                    <div className="chatEscShowCenterColContent">{data.text}</div>
                                </Col>
                                <Col className="col-xs-3">
                                    <div className="chatEscShowEndColOuter1"> 
                                        <div className="text-center">
                                            <img src={logos.chatEscGreenCircleTick} className="chatEscGreenCircleTick"/>
                                        </div>
                                        <div className="chatEscShowEndColText">Mark as resolved by artisan</div>
                                    </div>
                                </Col>
                            </Row>
                                }
                                else {
                                return <Row noGutters={true} className="chatEscRow1Data">
                                <Col className="col-xs-1">
                                    <div>
                                        <img src={logos.artisanEscLogo} className="artisanEscLogo"/>
                                    </div>
                                    <div>
                                        <img src={logos.Iconioniciosalert1} className="chatEscRedIconSelf"/>
                                    </div>
                                </Col>
                                <Col className="col-xs-8">
                                    <div className="chatEscShowCenterColTop">
                                    <span className="chatEscShowCenterColText1">Raised by Artisan on <Moment format="DD-MM-YY">
                                            {data.createdOn}</Moment> at <Moment format="HH:mm">
                                            {data.createdOn}</Moment></span>
                                    </div>
                                    <div className="chatEscShowCenterColContent">{data.text}</div>
                                </Col>
                                <Col className="col-xs-3">
                                    <div className="chatEscShowEndColOuter1">
                                        <div className="chatEscShowEndColText">Awaiting response from artisan</div>
                                    </div>
                                </Col>
                            </Row>
                                }
                            }
                        }) : null}
                       </div>
                        <Row noGutters={true}>
                            <Col className="col-xs-12 text-center">
                                <div className="escalationButtonOuter" onClick={this.openChatEscalationModal}> 
                                    <img src={logos.esc} className="escalationButtonImg"/>
                                    <span>New escalation</span>
                                </div>
                            </Col>
                        </Row>
                        </div>
                        </>
                        :
                        <>
                        <div className="chatGradientBg">
                            <Row noGutters={true}>
                                <Col className="col-xs-3 chatRemovePadding chatRightOrderAmount">
                                    Order Amount: ₹ {this.state.selectedEnquiryData.orderAmount ? this.state.selectedEnquiryData.orderAmount : "0"}
                                    {this.state.selectedEnquiryData.changeRequestDone === 1 ?
                                    <div>
                                        <img src={logos.artisanChatCRIcon} className="artisanChatCRIcon"/>
                                        <span className="artisanChatCRIconText">Change Requested</span>
                                    </div>
                                    : null }
                                </Col>
                                <Col className="col-xs-6 chatRemovePadding">
                                Chat will be open against an enquiry ID during full process of enquiry execution and even 30 days after enquiry closure
                                </Col>
                                <Col className="col-xs-3 chatRemovePadding text-right chatRightGoToEsc">
                                    {this.state.selectedEnquiryData.escalation !== 0 ?
                                    <>
                                        <img src={logos.esc} className="chatRightGoToEscImg"/>
                                        {this.state.selectedEnquiryData.escalation === 1 ? 
                                        <span className="chatRightGoToEscText">{this.state.selectedEnquiryData.escalation} Escalation Pending</span>
                                        :
                                        <span className="chatRightGoToEscText">{this.state.selectedEnquiryData.escalation} Escalations Pending</span>
                                        }
                                    </>
                                    : null }
                                    <span onClick={this.goToEscalationFunction} className="goToChatFunction">Go to escalations &gt;</span>
                                </Col>
                            </Row>
                        </div>
                        <div className="chatRightHeight artisanChatBG">
                            <div className="artisanChatWindowDisplayChatsOuter">
                            {this.state.selectedChatList ? this.state.selectedChatList.map((data) => {
                            return <div>
                                <div>
                                <hr className="chatBoxWindowDateShowHr"/>
                                <div className="text-center chatBoxWindowDateShow">{this.state.todayDate ?
                                this.state.todayDate === data.date ?
                                "Today" : data.date : data.date}
                                </div>
                                </div>
                                {data.chatBoxList ? data.chatBoxList.map((item) => {
                                    if(this.state.userData.id === item.messageFrom) {
                                        return <Row noGutters={true}>
                                            <Col className="col-xs-12 text-right">
                                            {item.mediaType === 1 ?
                                            <div className="artisanChatBoxWindowRightText">{item.messageString} 
                                            <span className="artisanChatBoxWindowRightTime">
                                                <Moment format="HH:mm">
                                                    {item.createdOn}
                                                </Moment>
                                            </span>
                                            </div>
                                            : 
                                            item.mediaType === 2 ?
                                            <div className="artisanChatBoxWindowRightText">
                                                <img src={logos.chatPinkDocImg} className="chatmediaNameAudio" />
                                                {item.path} 
                                            <span className="artisanChatBoxWindowRightTime">
                                                <Moment format="HH:mm">
                                                    {item.createdOn}
                                                </Moment>
                                            </span>
                                            <div className="viewDataFromChat">
                                            <a href={TTCEapi.ChatMediaUrl + this.state.selectedEnquiryData.enquiryId + "/" + item.mediaName} 
                                            target="_blank">View document</a>
                                            </div>
                                            </div>
                                            :
                                            item.mediaType === 3 ?
                                            <div className="artisanChatBoxWindowRightText">
                                                <img src={logos.artisanChatPhotoNew} className="chatmediaNameAudio" />
                                                {item.path}
                                            <span className="artisanChatBoxWindowRightTime">
                                                <Moment format="HH:mm">
                                                    {item.createdOn}
                                                </Moment>
                                            </span>
                                            <div className="viewDataFromChat">
                                            <a href={TTCEapi.ChatMediaUrl + this.state.selectedEnquiryData.enquiryId + "/" + item.mediaName} 
                                            target="_blank">View photo</a>
                                            </div>
                                            </div>
                                            : 
                                            item.mediaType === 4 ?
                                            <div className="artisanChatBoxWindowRightText">
                                                <img src={logos.artisanChatAudioNew} className="chatmediaNameAudio" />
                                                {item.path}
                                            <span className="artisanChatBoxWindowRightTime">
                                                <Moment format="HH:mm">
                                                    {item.createdOn}
                                                </Moment>
                                            </span>
                                            <div className="viewDataFromChat">
                                            <a href={TTCEapi.ChatMediaUrl + this.state.selectedEnquiryData.enquiryId + "/" + item.mediaName} 
                                            target="_blank">View audio</a>
                                            </div>
                                            </div>
                                            : item.mediaType === 5 ?
                                            <div className="artisanChatBoxWindowRightText">
                                                <img src={logos.artisanChatVideoNew} className="chatmediaNameVideo" />
                                                {item.path} 
                                            <span className="artisanChatBoxWindowRightTime">
                                                <Moment format="HH:mm">
                                                    {item.createdOn}
                                                </Moment>
                                            </span>
                                            <div className="viewDataFromChat">
                                            <a href={TTCEapi.ChatMediaUrl + this.state.selectedEnquiryData.enquiryId + "/" + item.mediaName} 
                                            target="_blank">View video</a>
                                            </div>
                                            </div>
                                            : null }
                                            </Col>
                                        </Row>
                                        }
                                    else {
                                        return <Row noGutters={true}>
                                            <Col className="col-xs-12 text-left">
                                            {item.mediaType === 1 ?
                                            <div className="artisanChatBoxWindowLeftText">{item.messageString} 
                                            <span className="artisanChatBoxWindowRightTime">
                                                <Moment format="HH:mm">
                                                    {item.createdOn}
                                                </Moment>
                                            </span>
                                            </div>
                                            : 
                                            item.mediaType === 2 ?
                                            <div className="artisanChatBoxWindowLeftText">
                                                <img src={logos.chatPinkDocImg} className="chatmediaNameAudio" />
                                                {item.path} 
                                            <span className="artisanChatBoxWindowRightTime">
                                                <Moment format="HH:mm">
                                                    {item.createdOn}
                                                </Moment>
                                            </span>
                                            <div className="viewDataFromChat">
                                            <a href={TTCEapi.ChatMediaUrl + this.state.selectedEnquiryData.enquiryId + "/" + item.mediaName} 
                                            target="_blank">View document</a>
                                            </div>
                                            </div>
                                            :
                                            item.mediaType === 3 ?
                                            <div className="artisanChatBoxWindowLeftText">
                                                <img src={logos.artisanChatPhotoNew} className="chatmediaNameAudio" />
                                                {item.path}
                                            <span className="artisanChatBoxWindowRightTime">
                                                <Moment format="HH:mm">
                                                    {item.createdOn}
                                                </Moment>
                                            </span>
                                            <div className="viewDataFromChat">
                                            <a href={TTCEapi.ChatMediaUrl + this.state.selectedEnquiryData.enquiryId + "/" + item.mediaName} 
                                            target="_blank">View photo</a>
                                            </div>
                                            </div>
                                            : 
                                            item.mediaType === 4 ?
                                            <div className="artisanChatBoxWindowLeftText">
                                                <img src={logos.artisanChatAudioNew} className="chatmediaNameAudio" />
                                                {item.path}
                                            <span className="artisanChatBoxWindowRightTime">
                                                <Moment format="HH:mm">
                                                    {item.createdOn}
                                                </Moment>
                                            </span>
                                            <div className="viewDataFromChat">
                                            <a href={TTCEapi.ChatMediaUrl + this.state.selectedEnquiryData.enquiryId + "/" + item.mediaName} 
                                            target="_blank">View audio</a>
                                            </div>
                                            </div>
                                            : item.mediaType === 5 ?
                                            <div className="artisanChatBoxWindowLeftText">
                                                <img src={logos.artisanChatVideoNew} className="chatmediaNameVideo" />
                                                {item.path} 
                                            <span className="artisanChatBoxWindowRightTime">
                                                <Moment format="HH:mm">
                                                    {item.createdOn}
                                                </Moment>
                                            </span>
                                            <div className="viewDataFromChat">
                                            <a href={TTCEapi.ChatMediaUrl + this.state.selectedEnquiryData.enquiryId + "/" + item.mediaName} 
                                            target="_blank">View video</a>
                                            </div>
                                            </div>
                                            : null }
                                            </Col>
                                        </Row>
                                    }
                                }) : null}
                                </div>
                            }) : null}
                            <div style={{marginTop: "60px"}}></div>
                            <div id="scrollBottomDiv"></div>
                            </div>

                            <div className="artisanChatSendBoxOuter">
                                <div className="artisanChatSendSearchBoxOuter">
                                    <input type="text" placeholder="Type your message here" onChange={(e) => this.handleChatTextInput(e)}
                                    id="chatTextInput" onKeyDown={(e) => this.chathandleKeyDown(e)}></input>
                                    <img src={logos.artisanChatAttachIcon} className="artisanChatAttachIcon" onClick={this.artisanChatAttachFunction}/>
                                    {this.state.sendButtonActive ? 
                                    <img  src={logos.artisanChatActiveSend} className="artisanChatActiveSend" 
                                          onClick={() => this.artisanSendChatFunction(1)} />
                                    :
                                    <img  src={logos.artisanChatNonActiveSend} className="artisanChatNonActiveSend" />
                                    }
                                </div>
                            </div>
                        </div>  
                        </> 
                        }                     
                    </Col>
                    }
                </Row>

                <div id="artisanChatAttachModal" class="w3-modal">
                    <div class="w3-modal-content w3-animate-top modalBoxSize">
                        <div class="w3-container chatAttachModalOuter">
                            <div className="chatAttachModalBg">
                                <div className="text-right">
                                    <img src={logos.closelogo} className="chatAttachCloseIcon" onClick={this.artisanChatAttachClose}/>
                                </div>
                                <h3 className="artisanChatModalTitle text-center">Upload to share</h3>
                                <p className="artisanChatModalSubTitle text-center">Select the type you want to share.</p>
                                <Row noGutters={true} className="artisanChatModalIconsRow">
                                    <Col className="col-xs-2 col-xs-offset-2 text-center chatInputFileClass">
                                        <input type="file" id="file" accept=".pdf .txt .doc" onChange={this.artisanChatShareFileFunction}/>
                                        <label for="file">
                                        <img src={logos.artisanChatFile} className="artisanChatFile" />
                                        <div className="artisanChatFileText">File</div>
                                        </label>
                                    </Col>
                                    <Col className="col-xs-2 text-center chatInputFileClass">
                                        <input type="file" id="audio" accept=".wav .mp3" onChange={this.artisanChatShareAudioFunction}/>
                                        <label for="audio">
                                        <img src={logos.artisanChatAudio} className="artisanChatAudio"/>
                                        <div className="artisanChatAudioText">Audio</div>
                                        </label>
                                    </Col>
                                    <Col className="col-xs-2 text-center chatInputFileClass">
                                        <input type="file" id="video" accept=".mp4" onChange={this.artisanChatShareVideoFunction}/>
                                        <label for="video">
                                        <img src={logos.artisanChatVideo} className="artisanChatVideo"/>
                                        <div className="artisanChatVideoText">Video</div>
                                        </label>
                                    </Col>
                                    <Col className="col-xs-2 text-center chatInputFileClass">
                                        <input type="file" id="photo" accept=".png, .jpg, .jpeg .raw" onChange={this.artisanChatSharePhotoFunction}/>
                                        <label for="photo">
                                        <img src={logos.artisanChatPhoto} className="artisanChatPhoto"/>
                                        <div className="artisanChatPhotoText">Photo</div>
                                        </label>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>

                {/* for file */}
                <div id="artisanChatShareFile" class="w3-modal">
                    <div class="w3-modal-content w3-animate-top modalBoxSize">
                        <div class="w3-container chatAttachModalOuter">
                            <div className="chatAttachModalBg">
                                <div className="text-right">
                                    <img src={logos.closelogo} className="chatAttachCloseIcon" onClick={this.artisanChatShareFileClose}/>
                                </div>
                                <h3 className="artisanChatModalTitle text-center">Upload to share</h3>
                                <p className="artisanChatModalSubTitle text-center">Select the document</p>
                                <div className="text-center artisanChatSelectedFileData">
                                    <span>{this.state.selectedFileSize} KB</span>
                                    <img src={logos.chatPinkDocImg} className="artisanChatFile artisanChatFileMargin" />
                                    <span>{this.state.selectedFileName}</span>
                                </div>
                                <div className="text-center chatInputFileClass">
                                    <input type="file" id="fileNew" accept=".pdf .txt .doc" onChange={this.artisanChatShareFileFunction}/>
                                    <label for="fileNew">
                                    <img src={logos.artisanChatChooseAnotherIcon} className="artisanChatFile" />
                                    <span className="artisanChatChooseFileText">Choose another</span>
                                    </label>
                                </div>
                                <div className="text-center artisanChatUploadButton" onClick={this.artisanUploadFile}>
                                    <img src={logos.chatIconUploadImg} className="chatIconUploadImg"/>
                                    Upload Document
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="artisanChatShareFile1" class="w3-modal">
                    <div class="w3-modal-content w3-animate-top modalBoxSize">
                        <div class="w3-container chatAttachModalOuter">
                            <div className="chatAttachModalBg">
                                <div className="text-right">
                                    <img src={logos.closelogo} className="chatAttachCloseIcon" onClick={this.artisanChatShareFileClose1}/>
                                </div>
                                <h3 className="artisanChatModalTitle text-center">Uploading...</h3>
                                <div className="text-center artisanChatSelectedFileData">
                                    <span>{this.state.selectedFileSize} KB</span>
                                    <img src={logos.artisanChatFile} className="artisanChatFile artisanChatFileMargin" />
                                    <span>{this.state.selectedFileName}</span>
                                </div>
                                <div className="chatLoadingBar">
                                    <div className="chatUploadProgressBar"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* for audio */}
                <div id="artisanChatShareAudio" class="w3-modal">
                    <div class="w3-modal-content w3-animate-top modalBoxSize">
                        <div class="w3-container chatAttachModalOuter">
                            <div className="chatAttachModalBg">
                                <div className="text-right">
                                    <img src={logos.closelogo} className="chatAttachCloseIcon" onClick={this.artisanChatShareAudioClose}/>
                                </div>
                                <h3 className="artisanChatModalTitle text-center">Upload to share</h3>
                                <p className="artisanChatModalSubTitle text-center">Select the audio</p>
                                <div className="text-center artisanChatSelectedFileData">
                                    <span>{this.state.selectedFileSize} KB</span>
                                    <img src={logos.artisanChatAudioNew} className="artisanChatFile artisanChatFileMargin" />
                                    <span>{this.state.selectedFileName}</span>
                                </div>
                                <div className="text-center chatInputFileClass">
                                    <input type="file" id="audioNew" accept=".wav .mp3" onChange={this.artisanChatShareAudioFunction}/>
                                    <label for="audioNew">
                                    <img src={logos.artisanChatChooseAnotherIcon} className="artisanChatFile" />
                                    <span className="artisanChatChooseFileText">Choose another</span>
                                    </label>
                                </div>
                                <div className="text-center artisanChatUploadButton" onClick={this.artisanUploadAudio}>
                                <img src={logos.chatIconUploadImg} className="chatIconUploadImg"/>
                                    Upload Audio
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="artisanChatShareAudio1" class="w3-modal">
                    <div class="w3-modal-content w3-animate-top modalBoxSize">
                        <div class="w3-container chatAttachModalOuter">
                            <div className="chatAttachModalBg">
                                <div className="text-right">
                                    <img src={logos.closelogo} className="chatAttachCloseIcon" onClick={this.artisanChatShareAudioClose1}/>
                                </div>
                                <h3 className="artisanChatModalTitle text-center">Uploading...</h3>
                                <div className="text-center artisanChatSelectedFileData">
                                    <span>{this.state.selectedFileSize} KB</span>
                                    <img src={logos.artisanChatAudioNew} className="artisanChatFile artisanChatFileMargin" />
                                    <span>{this.state.selectedFileName}</span>
                                </div>
                                <div className="chatLoadingBar">
                                    <div className="chatUploadProgressBar"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* for video */}
                <div id="artisanChatShareVideo" class="w3-modal">
                    <div class="w3-modal-content w3-animate-top modalBoxSize">
                        <div class="w3-container chatAttachModalOuter">
                            <div className="chatAttachModalBg">
                                <div className="text-right">
                                    <img src={logos.closelogo} className="chatAttachCloseIcon" onClick={this.artisanChatShareVideoClose}/>
                                </div>
                                <h3 className="artisanChatModalTitle text-center">Upload to share</h3>
                                <p className="artisanChatModalSubTitle text-center">Select the video</p>
                                <div className="text-center artisanChatSelectedFileData">
                                    <span>{this.state.selectedFileSize} KB</span>
                                    <img src={logos.artisanChatVideoNew} className="artisanChatVideoNew artisanChatFileMargin" />
                                    <span>{this.state.selectedFileName}</span>
                                </div>
                                <div className="text-center chatInputFileClass">
                                    <input type="file" id="videoNew" accept=".mp4" onChange={this.artisanChatShareVideoFunction}/>
                                    <label for="videoNew">
                                    <img src={logos.artisanChatChooseAnotherIcon} className="artisanChatFile" />
                                    <span className="artisanChatChooseFileText">Choose another</span>
                                    </label>
                                </div>
                                <div className="text-center artisanChatUploadButton" onClick={this.artisanUploadVideo}>
                                <img src={logos.chatIconUploadImg} className="chatIconUploadImg"/>
                                    Upload Video
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="artisanChatShareVideo1" class="w3-modal">
                    <div class="w3-modal-content w3-animate-top modalBoxSize">
                        <div class="w3-container chatAttachModalOuter">
                            <div className="chatAttachModalBg">
                                <div className="text-right">
                                    <img src={logos.closelogo} className="chatAttachCloseIcon" onClick={this.artisanChatShareVideoClose1}/>
                                </div>
                                <h3 className="artisanChatModalTitle text-center">Uploading...</h3>
                                <div className="text-center artisanChatSelectedFileData">
                                    <span>{this.state.selectedFileSize} KB</span>
                                    <img src={logos.artisanChatVideoNew} className="artisanChatVideoNew artisanChatFileMargin" />
                                    <span>{this.state.selectedFileName}</span>
                                </div>
                                <div className="chatLoadingBar">
                                    <div className="chatUploadProgressBar"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* for photo */}
                <div id="artisanChatSharePhoto" class="w3-modal">
                    <div class="w3-modal-content w3-animate-top modalBoxSize">
                        <div class="w3-container chatAttachModalOuter">
                            <div className="chatAttachModalBg">
                                <div className="text-right">
                                    <img src={logos.closelogo} className="chatAttachCloseIcon" onClick={this.artisanChatSharePhotoClose}/>
                                </div>
                                <h3 className="artisanChatModalTitle text-center">Upload to share</h3>
                                <p className="artisanChatModalSubTitle text-center">Select the photo</p>
                                <div className="text-center artisanChatSelectedFileData">
                                    <span>{this.state.selectedFileSize} KB</span>
                                    <img src={logos.artisanChatPhotoNew} className="artisanChatFile artisanChatFileMargin" />
                                    <span>{this.state.selectedFileName}</span>
                                </div>
                                <div className="text-center chatInputFileClass">
                                    <input type="file" id="photoNew" accept=".png, .jpg, .jpeg .raw" onChange={this.artisanChatSharePhotoFunction}/>
                                    <label for="photoNew">
                                    <img src={logos.artisanChatChooseAnotherIcon} className="artisanChatFile" />
                                    <span className="artisanChatChooseFileText">Choose another</span>
                                    </label>
                                </div>
                                <div className="text-center artisanChatUploadButton" onClick={this.artisanUploadPhoto}>
                                <img src={logos.chatIconUploadImg} className="chatIconUploadImg"/>
                                    Upload Photo
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="artisanChatSharePhoto1" class="w3-modal">
                    <div class="w3-modal-content w3-animate-top modalBoxSize">
                        <div class="w3-container chatAttachModalOuter">
                            <div className="chatAttachModalBg">
                                <div className="text-right">
                                    <img src={logos.closelogo} className="chatAttachCloseIcon" onClick={this.artisanChatSharePhotoClose1}/>
                                </div>
                                <h3 className="artisanChatModalTitle text-center">Uploading...</h3>
                                <div className="text-center artisanChatSelectedFileData">
                                    <span>{this.state.selectedFileSize} KB</span>
                                    <img src={logos.artisanChatPhotoNew} className="artisanChatFile artisanChatFileMargin" />
                                    <span>{this.state.selectedFileName}</span>
                                </div>
                                <div className="chatLoadingBar">
                                    <div className="chatUploadProgressBar"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* escalation modal */}
                <div id="raiseEscalationModal" class="w3-modal">
                    <div class="w3-modal-content w3-animate-top modalBoxSize">
                        <div class="w3-container chatAttachModalOuter">
                            <div className="text-right">
                                <img src={logos.closelogo} className="chatAttachCloseIcon" onClick={this.openChatEscalationModalClose}/>
                            </div>
                            <h3 className="artisanChatModalTitle text-center">
                                <img src={logos.Iconioniciosalert1} className="escalationChatModalIcon"/>
                                New Escalation
                            </h3>
                            <hr/>
                            <div className="chatEscalationBg">
                                <Row noGutters={true}>
                                    <Col className="col-xs-12 text-center">
                                        <p className="chatEscalationModalSubTitle text-center">Select category</p>
                                        <select className="chatEscalationSelectOption" onChange={this.escalationSelectFunction} id="chatEscalationSelectId">
                                            <option value="">Select escalation type</option>
                                            {this.state.getEscalationsList ? this.state.getEscalationsList.map((data, key) => [
                                                <option id={"dropdown"+ data.id} value={data.category}>{data.category}</option>
                                            ]) : null}
                                        </select>
                                        <textarea placeholder="Your detailed description here" onChange={this.escalationSelectFunction} 
                                        className="chatEscalationTextarea" id="chatEscalationTextareaId" maxlength="500"></textarea>

                                        {this.state.enableRaiseErrorFlag === true ?
                                            <div className="enableRaiseErrorMsg">{this.state.enableRaiseErrorMsg}</div>
                                        : null}

                                        {this.state.enableRaiseEscButton === true ?
                                        <div className="chatEscalationModalButtonOuter" onClick={this.raiseEscalationFunction}> 
                                            <span>Raise escalation</span>
                                        </div>
                                        : 
                                        <div className="chatEscalationModalDisableButtonOuter" onClick={this.raiseEscalationError}> 
                                            <span>Raise escalation</span>
                                        </div>
                                        }
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="raiseEscalationConfirmModal" class="w3-modal">
                    <div class="w3-modal-content w3-animate-top modalBoxSize">
                        <div class="w3-container chatAttachModalOuter">
                            <div className="text-right">
                                <img src={logos.closelogo} className="chatAttachCloseIcon" onClick={this.chatEscalationConfirmModalClose}/>
                            </div>
                            <h3 className="artisanChatModalTitle text-center">
                                <img src={logos.Iconioniciosalert1} className="escalationChatModalIcon"/>
                                New Escalation
                            </h3>
                            <hr/>
                            <div className="chatEscalationBg">
                                <Row noGutters={true}>
                                    <Col className="col-xs-12 text-center">
                                        <p className="chatEscalationModalSubTitle text-center">Are you sure ?</p>
                                        <p className="chatEscalationConfimrPara">The time limit for this escalation to be resolved <br/>
                                        is 48 hrs after you escalate. Else it will be highlighted <br/>
                                        to the Tata Trusts Management Team.</p>
                                        <img src={logos.escalationConfirmImg} className="escalationConfirmImg"/>
                                        <div className="chatEscConfirmModalButtonDiv">
                                            <span onClick={this.chatEscalationConfirmModalClose} className="chatEscConfirmModalGoButton">Go back</span>
                                            {this.state.escalationButtonOkDisable === true ?
                                            <span className="chatEscalationModalDisableButtonOuter">Ok</span>
                                            : 
                                            <span className="chatEscConfirmModalOkButton" onClick={this.chatEscConfirmModalOkButton}>Ok</span>
                                            }
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>

            </Container> 
            }              
            <Footer/>
        </React.Fragment>
    )
    }
} 