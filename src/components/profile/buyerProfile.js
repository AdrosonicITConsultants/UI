import React, { Component } from 'react'
import logos from "../../assets";
import { Row, Col , Container, Button} from 'reactstrap';
import isEmail from "validator/lib/isEmail";
import '../navbar/navbar.css';
import NavbarComponent from "../navbar/navbar";
import { connect } from "react-redux";
import * as Actions from "../../redux/action/action";
import './buyerProfile.css';
import TTCEapi from '../../services/API/TTCEapi';
import Footer from "../footer/footer";
import customToast from "../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";



class BuyerProfile extends Component {
    constructor(props) {
        super(props);
debugger;
        this.state = {
          isDesc: true,
          ischanged: false,
          isButtonDisabled: true,
          isAcon: true,
          isBdetail: true,
          isPod: true,
          isDaddress : true,
           designation: this.props.user.designation,
           alternatemobno: this.props.user.alternateMobile,
           gstno: this.props.user.companyDetails.gstNo,
           cinno: this.props.user.companyDetails.cin,
           panno: this.props.user.pancard,
           pocname : this.props.user.pointOfContact.firstName,
           pocemail : this.props.user.pointOfContact.email,
           pocmobile : this.props.user.pointOfContact.contactNo,
           line1 : this.props.user.addressses[1].line1,
           line2 : this.props.user.addressses[1].line2,
           street :this.props.user.addressses[1].street,
           city : this.props.user.addressses[1].city,
           pincode : this.props.user.addressses[1].pincode,
           state : this.props.user.addressses[1].state, 
          countrydata : [],
           countryid : this.props.user.addressses[1].country.id,
           country : this.props.user.addressses[1].country.name,
           companyname : this.props.user.companyDetails.companyName,
           landmark : this.props.user.addressses[1].landmark,
           showValidationconfirmpass : false,
           showValidationBdetail : false,
           showValidationPOCdetail : false,

           message : "enter correct details",
           selectedBrandFile: [],
           brandPic : "",
           removedlogo : 0 ,
                                                         
         
        };
        
        this.handleEdit = this.handleEdit.bind(this);
        this.handleconEdit = this.handleconEdit.bind(this);
        this.handledetEdit = this.handledetEdit.bind(this);
        this.handledetEdit2 = this.handledetEdit2.bind(this);

        this.handleaddEdit = this.handleaddEdit.bind(this);
        this.handlepocEdit = this.handlepocEdit.bind(this);
        this.handlepocEdit2 = this.handlepocEdit2.bind(this);

        this.checkSave = this.checkSave.bind(this);
        this.handleCountry = this.handleCountry.bind(this);




        
      }
      componentDidMount(){
       
         TTCEapi.getCountries().then((response)=>{
          this.setState({countrydata : response.data.data},()=>{
          });
          TTCEapi.getProfile().then((response) => {
            if(response.data.data.user.companyDetails != null){
                if(response.data.data.user.companyDetails.logo != null){
                    var brandPic = TTCEapi.ImageUrl + 'User/' + response.data.data.user.id + "/CompanyDetails/Logo/" + response.data.data.user.companyDetails.logo ;
                    this.setState({
                        brandPic : brandPic,
                    });
                    console.log(brandPic);

                }
            }

          });

      });
      }
      handleCountry(e) {
        // console.log(e.target.id);
        var index = e.target.selectedIndex;
        var optionElement = e.target.childNodes[index];
        var option =  optionElement.getAttribute('countryid');
        console.log(option);
        
        this.setState({ [e.target.name]: e.target.value , countryid : option}, ()=> {
          console.log(this.state);  
          
        });
        this.setState({
            ischanged : true
        });
        // this.setState({
        //     showValidationpass: false,
        // });
      }
    handleEdit(){
          this.setState({
              isDesc:!this.state.isDesc
          },()=>{
            this.checkSave();
        });
    }
    handleaddEdit(){
        this.setState({
            isDaddress:!this.state.isDaddress
        },()=>{
            this.checkSave();
        });
    }
    handlepocEdit(){
        this.setState({
            isPod:!this.state.isPod
        },()=>{
            this.checkSave();
        });
    }
    handlepocEdit2(){
        const emailcheck = isEmail;

        if (this.state.pocemail != "" && !emailcheck(this.state.pocemail))
                     {
                      this.setState({
                        showValidationPOCdetail: true,
                        message : "POC Email not valid."

                      });
                    }
                     else if((parseFloat(this.state.pocmobile)>9999999999 || parseFloat(this.state.pocmobile)<1000000000) && this.state.pocmobile !="" )
                     {
                      this.setState({
                        showValidationPOCdetail: true,
                        message : "POC mobile number should be of 10 digits."
                    });
                    }else{
                        this.setState({
                            isPod:!this.state.isPod
                        },()=>{
                            this.checkSave();
                        });
                    }
      
    }
    handleconEdit(){
        this.setState({
            isAcon:!this.state.isAcon
        },()=>{
            this.checkSave();
        });
        
    }
    handledetEdit(){
        this.setState({
            isBdetail:!this.state.isBdetail
            
        },()=>{
            this.checkSave();
        });
        
    }
    handledetEdit2(){
        var regex=/([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
        var alpha=/([A-Z]){1}([0-9]){5}([A-Z]){2}([0-9]){4}([A-Z]){3}([0-9]){6}$/;
        var gstval=/([0-9]){2}([A-Z0-9]){10}([0-9]){1}([A-Z]){1}([0-9]){1}$/;
        

                    if(!regex.test(this.state.panno.toUpperCase()))
                          {                      
                            this.setState({
                                showValidationBdetail: true,
                              message : "Invalid PAN Number"
                          });
                
                          
                    }
                    
                    else if((this.state.gstno.length > 15 || this.state.gstno.length < 15 || !gstval.test(this.state.gstno.toUpperCase()))  &&  this.state.gstno != "")
                          { 
                            this.setState({
                                showValidationBdetail: true,
                              message : "Invalid GST Number"
                          });
                
                          
                    } else if((this.state.cinno.length > 21 || this.state.cinno.length < 21 || !alpha.test(this.state.cinno.toUpperCase())) && this.state.cinno != "")
                          {                     

                            this.setState({
                                showValidationBdetail: true,
                                message : "Invalid CIN Number"
                          });
                    }else{

                            this.setState({
                                isBdetail:!this.state.isBdetail
                                
                            },()=>{
                                this.checkSave();
                            });
                          }
          
        
    }
    handleChange(e) {
        if (e.target.id =="gstno"){
            var stripped = e.target.value.replace(/[^A-Z0-9\sg\-]+/i, '')
            e.target.value = stripped;
            this.setState({ [e.target.name]: e.target.value });
            this.setState({
                ischanged : true,
                showValidationBdetail : false,     
                showValidationPOCdetail :false       });
          }
          else if (e.target.id =="panno"){
             var stripped = e.target.value.replace(/[^A-Z0-9\sg]+/i, '')
             e.target.value = stripped;
             this.setState({ [e.target.name]: e.target.value });
             this.setState({
                ischanged : true,
                showValidationBdetail : false,   
                showValidationPOCdetail :false         });
               
          }
          else if (e.target.id =="cinno"){
            var stripped = e.target.value.replace(/[^A-Z0-9\sg]+/i, '')
            e.target.value = stripped;
            this.setState({ [e.target.name]: e.target.value });
            this.setState({
                ischanged : true,
                showValidationBdetail : false,  
                showValidationPOCdetail :false          });
          }
          else{
    this.setState({ [e.target.name]: e.target.value });
    this.setState({
        ischanged : true,
        showValidationBdetail : false,
        showValidationPOCdetail :false
    });
}
    }
    checkSave(){
        if(this.state.isDaddress && this.state.isDesc && this.state.isPod && this.state.isBdetail && this.state.ischanged && this.state.isAcon)
        {
            this.setState({
                isButtonDisabled : false
            });

        }
        else{
            this.setState({
                isButtonDisabled : true
            });
        }
        
    }
    SaveDetails(){
        // alert("saveclicked");
        console.log(this.state);
        // debugger;
        TTCEapi.updateBuyerProfile(this.state.companyname, this.state.gstno, 
            this.state.cinno, this.state.panno, this.state.line1,
            this.state.line2, this.state.street, this.state.city, this.state.state, 
            this.state.country, this.state.pincode, this.state.landmark, this.state.alternatemobno,
            this.state.designation, this.state.pocmobile, this.state.pocemail, this.state.pocname,
            this.state.countryid,this.state.selectedBrandFile,this.state.removedlogo).then((response) => {
                this.setState({
                    isButtonDisabled : true,
                });
                customToast.success("Details updated successfully", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true,
                  });


            });
    }
    fileChangedHandler2 = (event) => {
        let filename = event.target.files[0];

        if (filename != undefined) {
          //  filename.name = filename.name.replace(/\s/g, '');
            if (filename.size / 1024 / 1024 > 1) {    
                customToast.error("Please upload product Image below 1MB.", {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: true,
                });
              return ;
            }
            if (/[^0-9a-zA-Z\-\_\.\(\)]/.test(filename.name)) {
              customToast.error("Image name contains special characters.", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: true,
              });
              return;
            }
         this.setState({
           selectedBrandFile: event.target.files[0],
           removedlogo : 2,

           isButtonDisabled : false
         },()=>{
            console.log("change brand img");
           console.log(this.state);
         });

         let reader = new FileReader();

         reader.onloadend = () => {
         let imagebytes = reader.result;               
           this.setState({
            //  selectedFile: { ...this.state.selectedFile },
             imagePreviewUrl2: imagebytes,
           },()=>{
                console.log(this.state);
           });
         };
         if (event.target.files[0]) {
         reader.readAsDataURL(event.target.files[0]);

         }
        }
       }
       resertImage2(){
        this.setState({
          selectedFile : [],
          removedlogo : 1,
          imagePreviewUrl2: logos.uploadphoto,
          isButtonDisabled : false
        });
      }
    render() {
        let  $imagePreview2 = (
            <img
                onClick={() => {
                this.refs.fileUploader2.click();
                }}
                className="profileImage2"
                src={this.state.brandPic == "" ? logos.uploadphoto : this.state.brandPic}
            ></img>
            );
            if (this.state.imagePreviewUrl2) {
                $imagePreview2 = (
                  <div className="image-container img_wrp">
                    <img
                      className="profileImage2"
                      onClick={() => {
                        this.refs.fileUploader2.click();
                      }}
                      src={this.state.imagePreviewUrl2}
                      alt="icon"
                      width="200"
                    />{" "}
                 
                      <img
                        style={{ margin: "2px -7px 1px 1px", width:"21px" ,opacity : "1"}}
                        type="button"
                        className="close"
                        aria-label="Close"
                        onClick={() => {
                          this.resertImage2();
                        }}
                        
                        src={logos.closelogo}
                        aria-hidden="true"
                      >
                        
                      </img>
                 
                  </div>
                );
              }
              else{
               
               
                $imagePreview2 = (
                    <div>                    <img
                      onClick={() => {
                        this.refs.fileUploader2.click();
                      }}
                      style={{
                        width: "100px",
                        cursor: "pointer",
                      }}
                      className = "profileImage2"

                      src={this.state.brandPic == "" ? logos.uploadphoto : this.state.brandPic}                    ></img>
                      {this.state.brandPic == ""  
                      ?
                    <div/>
                        :
                        <img
                        style={{ margin: "2px 13px 1px 1px", width:"21px" ,opacity : "1"}}
                        type="button"
                        className="close"
                        aria-label="Close"
                        onClick={() => {
                          this.resertImage2();
                        }}
                        
                        src={logos.closelogo}
                        aria-hidden="true"
                      >
                        
                      </img>
                        
                        }
                     
                      </div>

                  );
    
                
                
              }
        return (

            <React.Fragment>
                   <NavbarComponent/>
                <Container>
                <div className="profilebackground">
                    <br></br>
                    
                   <div className="profileheading fontplay">My Profile</div>
                   <br></br>
                   <Row noGutters={true}>
                        <Col sm = {{size: "1"}}></Col>

                            <Col sm = {{size: "10"}}>
                           <div className="profilelogo">
                           {$imagePreview2}
                                                        <input
                                                            accept="image/png, image/jpeg"
                                                            onChange={this.fileChangedHandler2}
                                                            type="file"
                                                            ref="fileUploader2"
                                                            style={{ display: "none" }}
                                                        ></input>
                               
                           </div>
                           <div className= "databackground">
                               <Row noGutters={true}>
                                    <Col sm = {{size: "1"}}></Col>
                                    <Col sm = {{size: "10"}}>
                                        <Row noGutters={true}>
                                                    {/* <Col sm = {{size: "1"}}></Col> */}
                                                    <Col sm = {{size: "8"}} className= "profilename">{this.props.user.firstName}<br></br>{this.props.user.lastName}</Col>
                                                    <Col sm = {{size: "4"}} className="ratingBuyer">
                                                   {/* <div class="circle small" data-notfill="40" data-fill="60" hour style={{"--color":"black ","---color":"white"}}>
                                                        <span><b>3.7</b></span>
                                                        <div class="bar"></div>
                                                    </div> */}
                                                     <div class="wrapper">
  <div class="c100 p40 blue">
      <span><b>3.7</b></span>
      <div class="slice">
        <div class="bar"></div>
        <div class="fill"></div>
      </div>
  </div></div>
                                                    <p className="Ratingtext">Rating by Artisans</p></Col> 
                                        </Row>
                                        <Row noGutters={true}>
                                                    {/* <Col sm = {{size: "1"}}></Col> */}
                                        
                                                    <Col sm = {{size: "10"}} className= "profiledesig fw600">
                                                    
                                                        <input
                                                        type="text"
                                                        id="designation"
                                                        className="form-control bgdis  BuyerLogin2"
                                                        value= {this.state.designation}
                                                        placeholder = "designation"
                                                        disabled={this.state.isDesc} 
                                                        name="designation"
                                                        onChange={(e) => this.handleChange(e)}
                                                        />

                                                        {this.state.isDesc ? <img
                                                                src={logos.edit}
                                                                className="editdesc editbutton"
                                                                style={{"cursor":"pointer"}}
                                                                onClick={this.handleEdit}
                                                        ></img> : 
                                                        <img
                                                                src={logos.done}
                                                                className="checkdesc editbutton"
                                                                style={{"cursor":"pointer"}}
                                                                onClick={this.handleEdit}
                                                        ></img>}
                                                        
                                                        {/* {this.props.user.designation}</Col> */}
                                                        </Col>
                                        </Row>
                                        <Row noGutters={true}>
                                                    
                                                    <Col sm = {{size: "6"}} >
                                                        <div  className= "companyname fw600">
                                                        <input
                                                        type="text"
                                                        id="companyname"
                                                        className="form-control bgdis  BuyerLogin2"
                                                        value= {this.state.companyname}
                                                        placeholder = "company name"
                                                        disabled={this.state.isDesc} 
                                                        name="companyname"
                                                        onChange={(e) => this.handleChange(e)}
                                                        />
                                                        {/* {this.props.user.companyDetails.companyName} */}

                                                        </div>
                                                        <hr className="profileline"></hr>
                                                        <div className="font16 fw600">
                                                                Registered Address
                                                        </div>
                                                        <div className="font14 fw600 mt7">
                                                            {this.props.user.addressses[0].line1}
                                                            {this.props.user.addressses[0].line2 != "" ? ", " + this.props.user.addressses[0].line2 : " "}
                                                            {this.props.user.addressses[0].street != "" ? ", " + this.props.user.addressses[0].street : " "}
                                                            {this.props.user.addressses[0].city != "" ? ", " + this.props.user.addressses[0].city : " "}
                                                            {this.props.user.addressses[0].pincode != "" ? ", " + this.props.user.addressses[0].pincode : " "}
                                                            {this.props.user.addressses[0].state != "" ? ", " + this.props.user.addressses[0].state : " "}
                                                          

                                                            
                                                        </div>
                                                        <div className="font14 fw600 mt7">
                                                        {this.props.user.addressses[0].country.name}
                                                        </div>
                                                    </Col>
                                                    <Col sm = {{size: "6"}} className="pr0">
                                                        <div className="pcontactbg ">
                                                            <div className= "" >
                                                            <img
                                                                src={logos.maillogo}
                                                                className ="mr10 iconsw"
                                                                ></img>
                                                                {this.props.user.email}

                                                            </div>
                                                            <div>
                                                            <img
                                                                src={logos.call}
                                                                className ="mr15 iconsw" ></img>
                                                                {this.props.user.mobile}
                                                                (primary)
                                                            </div>
                                                        </div>

                                                        <div  className="pcontactbg mt7">
                                                        <img
                                                                src={logos.call}
                                                                className ="mr15 iconsw" ></img>
                                                                <input
                                                                    type="number"
                                                                    id="alternatemobno"
                                                                    className="form-control bgdis2  BuyerLogin2"
                                                                    value= {this.state.alternatemobno}
                                                                    placeholder = "alternate mobile"
                                                                    disabled={this.state.isAcon} 
                                                                    name="alternatemobno"
                                                                    onChange={(e) => this.handleChange(e)}
                                                                    />

                                                                    {this.state.isAcon ? <img
                                                                            src={logos.edit}
                                                                            className="editbutton"
                                                                            style={{"cursor":"pointer"}}
                                                                            onClick={this.handleconEdit}
                                                                    ></img> : 
                                                                    <img
                                                                            src={logos.done}
                                                                            className="editbutton"
                                                                            style={{"cursor":"pointer"}}
                                                                            onClick={this.handleconEdit}
                                                                    ></img>}
                                                        </div>
                                                    </Col>
                                        </Row>
                                        <hr className="hrlinep2"></hr>
                                        <Row noGutters={true} className="text-center bdetail fw600">
                                          
                                                <div className="text-center font22 fw700">Brand Details 
                                                &nbsp; {this.state.isBdetail ? <img
                                                                            src={logos.edit}
                                                                            className="editbutton"
                                                                            style={{"cursor":"pointer" ,
                                                                            "position" : "absolute",
                                                                            "left " : "282px"}}
                                                                            onClick={this.handledetEdit}
                                                                    ></img> : 
                                                                    <img
                                                                            src={logos.done}
                                                                            className="editbutton"
                                                                            style={{"cursor":"pointer",
                                                                            "position" : "absolute",
                                                                            "left " : "282px"}}
                                                                            onClick={this.handledetEdit2}
                                                                    ></img>}
                                            </div>
                                            <Col sm = {{size: "4"}} className="bdetailsheading"> 
                                            GST N0.<br></br>
                                            <input
                                                        type="text"
                                                        id="gstno"
                                                        className="form-control bgdis3  BuyerLogin2"
                                                        value = {this.state.gstno.toUpperCase()}
                                                        placeholder = "GST no"
                                                        disabled={this.state.isBdetail} 
                                                        name="gstno"
                                                        onChange={(e) => this.handleChange(e)}
                                                        />

                                            
                                            </Col>
                                            <Col sm = {{size: "5"}} className="bdetailsheading"> 
                                            CIN N0.<br></br>

                                            <input
                                                        type="text"
                                                        id="cinno"
                                                        className="form-control bgdis3  BuyerLogin2"
                                                        value= {this.state.cinno.toUpperCase()}
                                                        placeholder = "CIN no"
                                                        disabled={this.state.isBdetail} 
                                                        name="cinno"
                                                        onChange={(e) => this.handleChange(e)}
                                                        />
                                            </Col>
                                            <Col sm = {{size: "3"}} className="bdetailsheading">
                                            PAN N0.<br></br>

                                            <input
                                                        type="text"
                                                        id="panno"
                                                        className="form-control bgdis3  BuyerLogin2"
                                                        value= {this.state.panno.toUpperCase()}
                                                        placeholder = "PAN no"
                                                        disabled={this.state.isBdetail} 
                                                        name="panno"
                                                        onChange={(e) => this.handleChange(e)}
                                                        /> 
                                            </Col>
                                            <Row noGutters={true} className="ml20">
                                            {this.state.showValidationBdetail ? (
                                                            <span className="bg-danger2 text-center">
                                                            {this.state.message}
                                                            </span>
                                                        ) : (
                                                            <br />
                                                        )}

                                            </Row>

                                        </Row>
                                        <hr className="hrlinep2"></hr>
                                        <Row noGutters={true}>
                                            <Col sm = {{size: "6"}} className="pocbg1" >
                                                <div className="fw600 bdetailsheading">
                                                    Point of Contact
                                                </div>
                                                {this.state.isPod ? <img
                                                                            src={logos.edit}
                                                                            className="poctick editbutton"
                                                                            style={{"cursor":"pointer" ,
                                                                        "position" : "absolute"}}
                                                                            onClick={this.handlepocEdit}
                                                                    ></img> : 
                                                                    <img
                                                                            src={logos.done}
                                                                            className="poctick editbutton"
                                                                            style={{"cursor":"pointer",
                                                                            "position" : "absolute"}}
                                                                            onClick={this.handlepocEdit2}
                                                                    ></img>}
                                                
                                                <hr className="hrlinep3"></hr>
                                                <div className="fw700 font14">
                                                    Name
                                                </div>
                                                <div>
                                                <input
                                                        type="text"
                                                        id="pocname"
                                                        className="form-control bgdis3  BuyerLogin2"
                                                        value= {this.state.pocname}
                                                        placeholder = "Name"
                                                        disabled={this.state.isPod} 
                                                        name="pocname"
                                                        onChange={(e) => this.handleChange(e)}
                                                        /> 
                                                
                                                </div>
                                                <div className="fw700 font14">
                                                    Mobile No.
                                                </div>
                                                <div>
                                                <input
                                                        type="number"
                                                        id="pocmobile"
                                                        className="form-control bgdis3  BuyerLogin2"
                                                        value= {this.state.pocmobile}
                                                        placeholder = "Mobile"
                                                        disabled={this.state.isPod} 
                                                        name="pocmobile"
                                                        onChange={(e) => this.handleChange(e)}
                                                        /> 
                                                    
                                                </div>
                                                <div className="fw700 font14">
                                                    Email Id
                                                </div>
                                                <div>
                                                <input
                                                        type="email"
                                                        id="pocemail"
                                                        className="form-control bgdis3  BuyerLogin2"
                                                        value= {this.state.pocemail}
                                                        placeholder = "Email"
                                                        disabled={this.state.isPod} 
                                                        name="pocemail"
                                                        onChange={(e) => this.handleChange(e)}
                                                        /> 
                                                    
                                                </div>
                                                <Row noGutters={true} className="ml20">
                                            {this.state.showValidationPOCdetail ? (
                                                            <span className="bg-danger2 text-center">
                                                            {this.state.message}
                                                            </span>
                                                        ) : (<div></div>) }

                                            </Row>
                                            </Col>
                                            
                                            <Col sm = {{size: "6"}} className="pocbg2">
                                                <div className="fw600 bdetailsheading">
                                                    Delivery Address
                                                </div>
                                                {this.state.isDaddress ? <img
                                                                            src={logos.edit}
                                                                            className="poctick editbutton"
                                                                            style={{"cursor":"pointer" ,
                                                                        "position" : "absolute"}}
                                                                            onClick={this.handleaddEdit}
                                                                    ></img> : 
                                                                    <img
                                                                            src={logos.done}
                                                                            className="poctick editbutton"
                                                                            style={{"cursor":"pointer",
                                                                            "position" : "absolute"}}
                                                                            onClick={this.handleaddEdit}
                                                                    ></img>}
                                                
                                                <hr className="hrlinep3"></hr>
                                                <div className="font16 fw600">
                                                    {this.state.companyname}
                                                </div>
                                                {this.state.isDaddress 
                                                ? <div>
                                                    <div className="font14 fw600 mt7">
                                                        {this.state.line1}
                                                        {this.state.line2 != "" ? ", " + this.state.line2 : ""}
                                                        {this.state.street != "" ? ", " + this.state.street : ""}
                                                        {this.state.city != "" ? ", " + this.state.city : ""}
                                                        {this.state.pincode != "" ? ", " + this.state.pincode : ""}
                                                        {this.state.state != "" ? ", " + this.state.state : ""}
                                                        <br>
                                                        </br>
                                                        {this.state.landmark}
                                                    </div>
                                                    <div className="font14 fw600 mt7">
                                                    {this.state.country}
                                                    </div>
                                                    </div>
                                                :
                                                <div>
                                                    <input
                                                        type="text"
                                                        id="line1"
                                                        className="form-control bgdis3  BuyerLogin2"
                                                        value= {this.state.line1}
                                                        placeholder = "line1"
                                                        name="line1"
                                                        onChange={(e) => this.handleChange(e)}
                                                        />
                                                    <input
                                                        type="text"
                                                        id="line2"
                                                        className="form-control bgdis3  BuyerLogin2"
                                                        value= {this.state.line2}
                                                        placeholder = "line2"
                                                        name="line2"
                                                        onChange={(e) => this.handleChange(e)}
                                                        />
                                                    <input
                                                        type="text"
                                                        id="street"
                                                        className="form-control bgdis3  BuyerLogin2"
                                                        value= {this.state.street}
                                                        placeholder = "street"     
                                                        name="street"
                                                        onChange={(e) => this.handleChange(e)}
                                                        />
                                                    <input
                                                        type="text"
                                                        id="city"
                                                        className="form-control bgdis3  BuyerLogin2"
                                                        value= {this.state.city}
                                                        placeholder = "city"         
                                                        name="city"
                                                        onChange={(e) => this.handleChange(e)}
                                                        />
                                                    <input
                                                        type="number"
                                                        id="pincode"
                                                        className="form-control bgdis3  BuyerLogin2"
                                                        value= {this.state.pincode}
                                                        placeholder = "pincode"   
                                                        name="pincode"
                                                        onChange={(e) => this.handleChange(e)}
                                                        />
                                                    <input
                                                        type="text"
                                                        id="state"
                                                        className="form-control bgdis3  BuyerLogin2"
                                                        value= {this.state.state}
                                                        placeholder = "state"
                                                        name="state"
                                                        onChange={(e) => this.handleChange(e)}
                                                        />
                                                    <input
                                                    type="text"
                                                    id="landmark"
                                                    className="form-control bgdis3  BuyerLogin2"
                                                    value= {this.state.landmark}
                                                    placeholder = "landmark"
                                                    name="landmark"
                                                    onChange={(e) => this.handleChange(e)}
                                                    />
                                                    <select id="country"
                                                        className="form-control bgdis3  BuyerLogin2"
                                                        name="country"
                                                        value = {this.state.country}
                                                        onChange={(e) => this.handleCountry(e)}  >
                                                            {/* <option key = '0' clusterid = '-1'  value='Select Country'>Select Country</option> */}
                                                        {this.state.countrydata.map((item) => <option key =  {item.id} countryid={item.id} value={item.name}>{item.name}</option>)}
                                                    </select>

                                                </div>
                                                }
                                                
                                            </Col>
                                        
                                        
                                        </Row>
                                        {this.state.showValidationconfirmpass ? (
                                            <span className="bg-danger">Enter mandatory fields</span>
                                        ) : (
                                            <br />
                                        )}
                                        <Row noGutters={true} className="text-center ">
                                            <button
                                                id ="savebutton"
                                                disabled={this.state.isButtonDisabled}
                                                className="blackButton profilebutton"
                                                onClick={() => this.SaveDetails()}
                                            >
                                                <img
                                                                            src={logos.save}
                                                                            className=" saveimg mr10"
                                                                            style={{"cursor":"pointer" ,
                                                                            }}
                                                ></img>
                                                Save Details
                                            </button>
                                        </Row>
                                        
                                        <Row noGutters={true}>
                                            <div className="noteprofile">
                                                Please Note In case of change of non editable field, please feel free <span className = " ">to reach out to our support team.</span>
                                            </div>
                                        </Row>
                                         <Row noGutters={true} className="text-center">
                                            <img className="spinimage" src = {logos.spin}></img>
                                        </Row>
                                    </Col>
                                </Row>
                          </div>
                       </Col>
                   </Row>
                   <Row>
                    <div>
                    <img
                        className="HomeBg3 internaldiv"
                        src={logos.background3}
                    ></img>
                    </div>
                </Row>

                   {console.log(this.props.user)}
                </div>

                </Container>
                <Footer></Footer>

            </React.Fragment>
            // <div>
             
               
            //      {"this is my buyerprofile page check console for variable"}
            
            // </div>
        )
    }
}

function mapStateToProps(state) {
//  debugger;
    const { user } = state
    return { user };
}

const connectedLoginPage = connect(mapStateToProps)(BuyerProfile);
export default connectedLoginPage;

