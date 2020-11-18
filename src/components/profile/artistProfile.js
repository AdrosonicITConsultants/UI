import React, { Component } from 'react'
import logos from "../../assets";
import { Row, Col , Container, Button} from 'reactstrap';
import '../navbar/navbar.css';
import NavbarComponent from "../navbar/navbar";
import { connect } from "react-redux";
import * as Actions from "../../redux/action/action";
import "./artistProfile.css";
import "./buyerProfile.css"
import TTCEapi from '../../services/API/TTCEapi';
import Footer from "../footer/footer";
import customToast from "../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useTranslation, withTranslation } from "react-i18next";

class ArtistProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
          firstName : JSON.parse(localStorage.getItem("user")).firstName,
          lastName : JSON.parse(localStorage.getItem("user")).lastName,
          isProfile : true,
          isDetailsEdit : true,
          isPdetail : true,
          isBdetail: true,
          products : [{id: 0 , productDesc :""},{id: 0 , productDesc :""},{id: 0 , productDesc :""},{id: 0 , productDesc :""},{id: 0 , productDesc :""},{id: 0 , productDesc :""}],
          selectedprods :[],          
          accountno : "",
          bankname : "" ,
          branch : "" ,
          ifsccode : "",
          benificiaryname : "",
          gpayupi : "",
          paytmupi : "",
          phonepeupi  : "",
          line1 : "",
          district : "",
          pincode: "",
          state : "",
          rating : 1,   
          brandname : "",
          branddesc : "",
          paymentAccountDetails : [],
          mobile:JSON.parse(localStorage.getItem("user")).mobile,
          email:JSON.parse(localStorage.getItem("user")).email,
          ratingclass: "p10",
          prodsel : "",
          selectedFile: [],
          profilePic : "",
          selectedBrandFile: [],
          brandPic : "",
          removedprofile : 0,
          removedlogo : 0,
          showValidationbank : false, 
          showValidationaddress :false,
          message : ""
          

        };
        this.handleDetail = this.handleDetail.bind(this);
        this.handlebdetEdit = this.handlebdetEdit.bind(this);
        this.handlebdetEdit2 = this.handlebdetEdit2.bind(this);
        this.handlePdetailEdit = this.handlePdetailEdit.bind(this);
        this.handlePdetailEdit2 = this.handlePdetailEdit2.bind(this);
        this.handlebEdit = this.handlebEdit.bind(this);
        this.handlebEdit2 = this.handlebEdit2.bind(this);
  
      }
      componentDidMount(){
        console.log("dsds");
        TTCEapi.getProducts().then((response)=>{
            this.setState({products : response.data.data},() => {
            });
        });
        TTCEapi.getProfile().then((response) => {
            TTCEapi.getProducts().then((response1)=>{
                this.setState({products : response1.data.data},() => {
                    if(response.data.data.userProductCategories.length != 0)
                    {   var prodselected = "";
                      for (var  items in response.data.data.userProductCategories)
                      {     console.log(response.data.data.userProductCategories[items]);
                        // document.getElementById(response.data.data.userProductCategories[items].productCategoryId).checked = true;
                        prodselected = prodselected + this.state.products[response.data.data.userProductCategories[items].productCategoryId - 1].productDesc + ", "
                      }
                      this.setState({
                        prodsel : prodselected
                    })
                  }

                });
    
            });
            
            if(response.data.data.user.profilePic != null && response.data.data.user.profilePic != ""){
                var profilePic = TTCEapi.ImageUrl + 'User/' + response.data.data.user.id + "/ProfilePics/" + response.data.data.user.profilePic ;
                this.setState({
                    profilePic : profilePic,
                });
                console.log(profilePic);
            }
            if(response.data.data.user.rating != null){
                this.setState({ rating : parseFloat(response.data.data.user.rating) },()=>{

                    var percentage = "p" + this.state.rating*10;
                    this.setState({ratingclass : percentage});
                });
            }
            
            if(response.data.data.user.paymentAccountDetails.length != 0)
            {

                for (var  items in response.data.data.user.paymentAccountDetails)
                {
                    console.log(response.data.data.user.paymentAccountDetails[items].accountType.id);
                    switch(response.data.data.user.paymentAccountDetails[items].accountType.id){
                        case 1:
                            console.log("bank");   
                            this.setState({
                                accountno : parseInt(response.data.data.user.paymentAccountDetails[items].accNo_UPI_Mobile),
                                bankname : response.data.data.user.paymentAccountDetails[items].bankName ,
                                branch : response.data.data.user.paymentAccountDetails[items].branch ,
                                ifsccode : response.data.data.user.paymentAccountDetails[items].ifsc,
                                benificiaryname : response.data.data.user.paymentAccountDetails[items].name
                            }); 
                            break;
                        case 2:
                            console.log("gpayy");
                            if(response.data.data.user.paymentAccountDetails[items].accNo_UPI_Mobile != ''){
                            
                                this.setState({
                                    gpayupi : response.data.data.user.paymentAccountDetails[items].accNo_UPI_Mobile, 
                                }); 
                            }
                            
                            break;
                        case 3:
                            // console.log(response.data.data.user.paymentAccountDetails[items].accNo_UPI_Mobile);
                            if(response.data.data.user.paymentAccountDetails[items].accNo_UPI_Mobile != ''){
                            
                            this.setState({
                                phonepeupi : parseInt(response.data.data.user.paymentAccountDetails[items].accNo_UPI_Mobile), 
                            }); 
                        }
                            break;
                        case 4:
                            console.log("paytm");
                            if(response.data.data.user.paymentAccountDetails[items].accNo_UPI_Mobile != ''){
                                                          
                                this.setState({
                                    paytmupi : parseInt(response.data.data.user.paymentAccountDetails[items].accNo_UPI_Mobile), 
                                }); 
                            }
                            
                            break;
                    }
                }
                

            }
            // console.log("hfjdfink");
            // console.log(response.data.data.user.companyDetails != null)
            if(response.data.data.user.companyDetails != null){
                if(response.data.data.user.companyDetails.logo != null){
                    var brandPic = TTCEapi.ImageUrl + 'User/' + response.data.data.user.id + "/CompanyDetails/Logo/" + response.data.data.user.companyDetails.logo ;
                    this.setState({
                        brandPic : brandPic,
                    });
                    console.log(brandPic);

                }
                this.setState({
                    brandname : response.data.data.user.companyDetails.companyName ,
                    branddesc :  response.data.data.user.companyDetails.desc,


                })
            }
            
            // this.setState({
            //     line1 : response.data.data.user.addressses[0].line1,
            //     district : response.data.data.user.addressses[0].district,
            //     pincode : response.data.data.user.addressses[0].pincode,
            //     state :response.data.data.user.addressses[0].state ,

            // })
            if(response.data.data.user.addressses[0].district != null)
            {
              this.setState({
                district : response.data.data.user.addressses[0].district,
            })
            }
            if(response.data.data.user.addressses[0].line1 != null)
            {
              this.setState({
                line1 : response.data.data.user.addressses[0].line1,            })
            }
            if(response.data.data.user.addressses[0].pincode != null)
            {
              this.setState({
                pincode : response.data.data.user.addressses[0].pincode,
            })
            }
            if(response.data.data.user.addressses[0].state != null)
            {
              this.setState({
                state :response.data.data.user.addressses[0].state ,
            })
            }
            // console.log(response.data.data.user.addressses[0].district);

          }, () =>{
            //   console.log("hdsdj");
            // console.log(this.state);
            
          })
      }
      handlePdetailEdit(){
        this.setState({
            isPdetail:!this.state.isPdetail
        })
      }
      handlePdetailEdit2(){
       if((parseFloat(this.state.pincode)>999999 || parseFloat(this.state.pincode)<100000 )&& this.state.pincode!= "")
      {
        this.setState({
          showValidationaddress: true,
          message : "pincode should be of 6 digits."
      });
      }
      else{
        TTCEapi.updatePersonalDetails(this.state.line1,this.state.district,this.state.pincode,this.state.state,this.state.selectedFile,this.state.removedprofile).then((response)=>{
          if (response.data.valid) {
            customToast.success("Personal data updated !", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: true,
            });
          }
          else{
            customToast.error(response.data.errorMessage, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: true,
            });
          }
        })
       this.setState({
           isPdetail:!this.state.isPdetail
       });
      }
      }
      handlebdetEdit(){
        this.setState({
            isDetailsEdit:!this.state.isDetailsEdit
        });

      }
      handlebdetEdit2(){
        
        var alpha=/([A-Za-z0-9])$/;
        var char=/([A-Za-z])+$/;
        var gpayvalidation=/^[ A-Za-z0-9_@./#&+-]*$/;
        var numeric=/([0-9])$/;


                    if(!alpha.test(this.state.benificiaryname))
                          {                      
                            this.setState({
                              showValidationbank: true,
                              message : "Invalid Beneficiary Name"
                          });
                                      
                    }
                    
                  else if(!char.test(this.state.bankName))
                    {                      
                      this.setState({
                          showValidationbank: true,
                        message : "Invalid Bank Name"
                    });
          
                    
              }
              else if(!char.test(this.state.branch))
              {                      
                this.setState({
                  showValidationbank: true,
                  message : "Invalid Branch Name"
              });
    
              
        }
        else if(!alpha.test(this.state.ifsccode))
        {                      
          this.setState({
            showValidationbank: true,
            message : "Invalid Bank Name"
        });

        
  }
          if((parseFloat(this.state.paytmupi)>9999999999 || parseFloat(this.state.paytmupi)<1000000000 ) ||!numeric.test(this.state.paytmupi) && this.state.paytmupi != "")
            {
              this.setState({
                showValidationbank: true,
                message : "Invalid paytm number"
            });
            }
            else if((parseFloat(this.state.phonepeupi)>9999999999 || parseFloat(this.state.phonepeupi)<1000000000 ) || !numeric.test(this.state.phonepeupi) && this.state.phonepeupi != "" )
            {
              this.setState({
                showValidationbank: true,
                message : "Invalid phonepe number"
            });
            }
            else if(!gpayvalidation.test(this.state.gpayupi))
                    {                      
                      this.setState({
                          showValidationbank: true,
                        message : "Invalid GPay number"
                    });
          
                    
              }
            else{
              this.setState({
                isDetailsEdit:!this.state.isDetailsEdit
            });
              TTCEapi.updateBankDetails(this.state.accountno,this.state.bankname,
                this.state.branch,this.state.ifsccode,this.state.benificiaryname,
                this.state.gpayupi,this.state.paytmupi,this.state.phonepeupi).then((response) => {
                  if (response.data.valid) {
                    customToast.success("Bank details updated !", {
                      position: toast.POSITION.TOP_RIGHT,
                      autoClose: true,
                    });
                  }
                  else{
                    
                    customToast.error(response.data.errorMessage, {
                      position: toast.POSITION.TOP_RIGHT,
                      autoClose: true,
                    });
                    
                  }

    
                });
            }
        
      }
      handlebEdit(){
  
          this.setState({
              isBdetail:!this.state.isBdetail,
              productSelected : []

          },()=>{
            TTCEapi.getProfile().then((response)=>{
              for (var  items in response.data.data.userProductCategories)
                        {     console.log(response.data.data.userProductCategories[items]);
                          document.getElementById(response.data.data.userProductCategories[items].productCategoryId).checked = true;
                          // prodselected = prodselected + this.state.products[response.data.data.userProductCategories[items].productCategoryId - 1].productDesc + ", "
                        }

            })
          })
      }
      handlebEdit2(){
          var productSelected = "";
          this.state.products.map((item) => { 
              if(document.getElementById(item.id).checked){
                  this.state.selectedprods.push(item.id)
                  productSelected = productSelected + item.productDesc + ", "; 
                  }  
              // console.log(this.state.selectedprods) ;
              // this.setState({
              //     prodsel : productSelected
              // });
              // document.getElementById("prodselected").innerHTML = productSelected;
          }); 
          
            
              this.setState({
                prodsel : productSelected
            },()=>{
                console.log(this.state.selectedprods) ;
                TTCEapi.updateBrandDetails(this.state.brandname,this.state.branddesc,this.state.selectedprods,this.state.selectedBrandFile,this.state.removedlogo).then((response)=>{
                  if (response.data.valid) {
                    customToast.success("Brand data updated !", {
                      position: toast.POSITION.TOP_RIGHT,
                      autoClose: true,
                    });
                  }
                  else{
                    
                    customToast.error(response.data.errorMessage, {
                      position: toast.POSITION.TOP_RIGHT,
                      autoClose: true,
                    });
                    
                  }
                });
    
            });
    
            this.setState({
                isBdetail:!this.state.isBdetail
            });

            
        
      }
      handleChange(e) {
        if (e.target.id =="ifsccode" ){
          var stripped = e.target.value.replace(/[^A-Z0-9\sg]+/i, '')
          e.target.value = stripped;
          this.setState({ [e.target.name]: e.target.value ,
            ischanged : true,
            showValidationbank: false,
            showValidationaddress :false,
          });
        }else if (e.target.id =="state"){
          var stripped = e.target.value.replace(/[^A-Z\sg]+/i, '')
          e.target.value = stripped;
          this.setState({ [e.target.name]: e.target.value ,
            ischanged : true,
            showValidationbank: false,
            showValidationaddress :false,
          });
        }
        else if (e.target.id =="bankname"){
          var stripped = e.target.value.replace(/[^A-Z\sg]+/i, '')
          e.target.value = stripped;
          this.setState({ [e.target.name]: e.target.value ,
            ischanged : true,
            showValidationbank: false,
            showValidationaddress :false,
          });
        }else if (e.target.id =="benificiaryname"){
          var stripped = e.target.value.replace(/[^A-Z0-9\sg]+/i, '')
          e.target.value = stripped;
          this.setState({ [e.target.name]: e.target.value ,
            ischanged : true,
            showValidationbank: false,
            showValidationaddress :false,
          });
        }else if (e.target.id =="branch"){
          var stripped = e.target.value.replace(/[^A-Z\sg]+/i, '')
          e.target.value = stripped;
          this.setState({ [e.target.name]: e.target.value ,
            ischanged : true,
            showValidationbank: false,
            showValidationaddress :false,
          });
        }else {
          this.setState({ [e.target.name]: e.target.value });
        this.setState({
            ischanged : true,
            showValidationbank: false,
            showValidationaddress :false,
        });
        }
        
      }
      handleDetail(){
        console.log("hdsdj");
        console.log(this.state);
        this.setState({
            isProfile:!this.state.isProfile
        })
      }
      fileChangedHandler = (event) => {
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
              // if (/[^0-9a-zA-Z\-\_\.\(\)]/.test(filename.name)) {
              //   customToast.error("Image name contains special characters.", {
              //     position: toast.POSITION.TOP_RIGHT,
              //     autoClose: true,
              //   });
              //   return;
              // }
          this.setState({
            selectedFile: event.target.files[0],
            removedprofile :2 ,
            
          },()=>{
            console.log(this.state);
          });

          let reader = new FileReader();

          reader.onloadend = () => {
          let imagebytes = reader.result;               
            this.setState({
              //  selectedFile: { ...this.state.selectedFile },
              imagePreviewUrl: imagebytes,
            },()=>{
                  console.log(this.state);
            });
          };
          if (event.target.files[0]) {
          reader.readAsDataURL(event.target.files[0]);

          }
          }
      };
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
          // if (/[^0-9a-zA-Z\-\_\.\(\)]/.test(filename.name)) {
          //   customToast.error("Image name contains special characters.", {
          //     position: toast.POSITION.TOP_RIGHT,
          //     autoClose: true,
          //   });
          //   return;
          // }
        this.setState({
          selectedBrandFile: event.target.files[0],
          removedlogo: 2
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
      };
      resertImage(){
      this.setState({
        selectedFile : [],
        removedprofile : 1,
        imagePreviewUrl: logos.uploadphoto,
      });
      }
      resertImage2(){
        this.setState({
          selectedFile : [],
          removedlogo : 1,
          imagePreviewUrl2: logos.uploadphoto,
        });
      }
    render() {
      let user = JSON.parse(localStorage.getItem("user"));
        let  $imagePreview = (
                <img
                  // onClick={() => {
                  //   this.refs.fileUploader.click();
                  // }}
                  className="profileImage"
                  src={this.state.profilePic == "" ? logos.uploadphoto : this.state.profilePic}
                ></img>
              );
        let  $imagePreview2 = (
        <img
            // onClick={() => {
            // this.refs.fileUploader2.click();
            // }}
            className="profileImage"
            src={this.state.brandPic == "" ? logos.uploadphoto : this.state.brandPic}
        ></img>
        );
              if (this.state.imagePreviewUrl) {
                $imagePreview = (
                  <div className="image-container img_wrp">
                    <img
                      className="profileImage"
                      onClick={() => {
                        this.refs.fileUploader.click();
                      }}
                      src={this.state.imagePreviewUrl}
                      alt="icon"
                      width="200"
                    />{" "}
                  {this.state.isPdetail 
                      
                      ?
                      <div/>
                     
                    :
                      <img
                        style={{ margin: "-3px", width:"14px" }}
                        type="button"
                        className="close"
                        aria-label="Close"
                        onClick={() => {
                          this.resertImage();
                        }}
                        
                        src={logos.closelogo}
                        aria-hidden="true"
                      >
                        
                      </img>}
                 
                  </div>
                );
              }
              else{
                {this.state.isPdetail
                
                ?
                $imagePreview = (
                    <img
                      // onClick={() => {
                      //   this.refs.fileUploader.click();
                      // }}
                      style={{
                        width: "100px"
                        // cursor: "pointer",
                      }}
                      className = "profileImage"
                      src={this.state.profilePic == "" ? logos.uploadphoto : this.state.profilePic}
                    ></img>
                  )
                :
                $imagePreview = (
                    <div><img
                      onClick={() => {
                        this.refs.fileUploader.click();
                      }}
                      style={{
                        width: "100px",
                        cursor: "pointer",
                      }}
                      className = "profileImage"

                      src={this.state.profilePic == "" ? logos.uploadphoto : this.state.profilePic}  
                      ></img>

                      <img
                        style={{ margin: "22px 43px -3px -3px", width:"14px" }}
                        type="button"
                        className="close"
                        aria-label="Close"
                        onClick={() => {
                          this.resertImage();
                        }}
                        
                        src={logos.closelogo}
                        aria-hidden="true"
                      >
                        
                      </img>
                      </div>
                  );
    
                }
                
              }
        
              if (this.state.imagePreviewUrl2) {
                $imagePreview2 = (
                  <div className="image-container img_wrp">
                    <img
                      className="profileImage"
                      // onClick={() => {
                      //   this.refs.fileUploader2.click();
                      // }}
                      src={this.state.imagePreviewUrl2}
                      alt="icon"
                      width="200"
                    />
                    {" "}
                      {this.state.isBdetail 
                      
                      ?
                      <div/>
                     
                    :
                    <img
                    style={{ margin: "-3px", width:"14px" }}
                    type="button"
                    className="close"
                    aria-label="Close"
                    onClick={() => {
                      this.resertImage2();
                    }}
                    
                    src={logos.closelogo}
                    aria-hidden="true"
                  >
                    
                  </img> }
                      
                 
                  </div>
                );
              }
              else{
                {this.state.isBdetail
                
                ?
                $imagePreview2 = (
                    <img
                    //   onClick={() => {
                    //     this.refs.fileUploader.click();
                    //   }}
                      style={{
                        width: "100px"
                      }}
                      className = "profileImage"
                      src={this.state.brandPic == "" ? logos.uploadphoto : this.state.brandPic}
                    ></img>
                  )
                :
                $imagePreview2 = (
                    <div><img
                      onClick={() => {
                        this.refs.fileUploader2.click();
                      }}
                      style={{
                        width: "100px",
                        cursor: "pointer",
                      }}
                      className = "profileImage"

                      src={this.state.brandPic == "" ? logos.uploadphoto : this.state.brandPic}            
                              ></img>
                              <img
                                         style={{ margin: "22px 43px -3px -3px", width:"14px" }}
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
                
              }
              

       
        
        return (
            <React.Fragment>
                <NavbarComponent/>
            
                <div className="Aopbg2">
                <div className="Aopbg">

                    <Container >
                        <br></br>
                        <Row noGutters={true}>
                        <div className="wrapper">
                            <div className={"c100 " + this.state.ratingclass + " blue artistrating"}  >
                                <span><div className="aprofilelogo">
                                  <img src=
                                  {user.profilePic == "" || user.profilePic == null ?  logos.Smile : TTCEapi.ImageUrl + "User/" + user.id + "/ProfilePics/" + user.profilePic }
                                   className="profileImage21"></img>
                           </div></span>
                                <div className="slice">
                                    <div className="bar"></div>
                                    <div className="fill"></div>
                                </div>
                            </div></div>
                        {/* <div className="aprofilelogo">
                           </div> */}
                        </Row>
                        <Row noGutters={true} className="text-center welcome">
                           {this.props.t("Pages.object.profileWelcome")},{ " " +this.state.firstName + " " + this.state.lastName }
                        </Row>
                        <Row noGutters={true} className="text-center ">
                        {this.props.t("Pages.object.profileHeaderDesc")}
                        </Row>
                        <Row noGutters={true} className="text-center ">
                        {this.props.t("Pages.object.profileArtistRating")} : {this.state.rating} / 10
                        </Row>
                        <Row noGutters={true} className="mt30 ">
                            <Col sm = {{size: "6"}} className="text-right">
                               {this.state.isProfile 
                               ?
                               <u className="selected fontplay">{this.props.t("Pages.object.profileMyDetails")}</u> 
                                :
                                <span className="notSelected fontplay" style={{"cursor":"pointer" }}  onClick={this.handleDetail}>{this.props.t("Pages.object.profileMyDetails")}</span>
                                }
                            </Col>
                            <Col sm = {{size: "6"}} className="text-left">
                            {this.state.isProfile
                               ?
                               <span className="notSelected fontplay" style={{"cursor":"pointer" }} onClick={this.handleDetail}>{this.props.t("Pages.object.profileBankDetails")}</span>
                                :
                                <u className="selected fontplay">{this.props.t("Pages.object.profileBankDetails")}</u> 
                                }
                            </Col>
                        </Row>
                        <br>
                        </br>
                        {this.state.isProfile 
                        ?

                <Row noGutters={true} className="detailsheight">
                                            <Col sm = {{size: "6"}} className="aocbg1" >
                                                <div className="fw600 bdetailsheading">
                                                    <img
                                                                                src={logos.personalicon}
                                                                                className="iconcss"
                                                    ></img>
                                                      {this.props.t("Pages.object.profilePersonal")}
                                                </div>
                                                {this.state.isPdetail ? <img
                                                                            src={logos.apedit}
                                                                            className="aoctick"
                                                                            style={{"cursor":"pointer" ,
                                                                        "position" : "absolute"}}
                                                                            onClick={this.handlePdetailEdit}
                                                                    ></img> : 
                                                                    <img
                                                                            src={logos.done}
                                                                            className="poctick"
                                                                            style={{"cursor":"pointer",
                                                                            "position" : "absolute"}}
                                                                            onClick={this.handlePdetailEdit2}
                                                                    ></img>}
                                                
                                                <hr className="hrlineaop3 "></hr>
                                                <Col sm = {{size: "7"}} className="cardtextfield" >
                                                    <div className="fw700 font14 mt7">
                                                    {this.props.t("Pages.object.profileName")}:
                                                    </div>
                                                    <div className="font14  mt7">
                                                        {user.firstName + " " + user.lastName}                                               
                                                    </div>
                                                <div className="fw700 font14 mt7">
                                                {this.props.t("Pages.object.regEmailId")}:
                                                </div>
                                                <div className="font14  mt7">
                                                   <p>{user.email}</p> 
                                                </div>
                                                <div className="fw700 font14 mt7">
                                                {this.props.t("Pages.object.profileMobile")}:
                                                </div>
                                                <div className="font14  mt7">
                                                {user.mobile}
                                                </div>
                                                <div className="fw700 font14 mt7">
                                                {this.props.t("Pages.object.regAddress")}:
                                                </div>
                                                {this.state.isPdetail
                                                ? 
                                                    <div className="font14  mt7">
                                                        {this.state.line1}
                                                        {" " + this.state.district }
                                                        {" " + this.state.pincode }
                                                        {" " + this.state.state }

                                                       
                                                    </div>
                                                :
                                                <div>
                                                    <input
                                                        type="text"
                                                        id="line1"
                                                        className="form-control bgdis3  BuyerLogin21"
                                                        value= {this.state.line1}
                                                        disabled={this.state.isPdetail} 
                                                        placeholder = "line1"
                                                        name="line1"
                                                        onChange={(e) => this.handleChange(e)}
                                                        />
                                                        <input
                                                        type="text"
                                                        id="district"
                                                        className="form-control bgdis3  BuyerLogin21 mt7"
                                                        value= {this.state.district}
                                                        disabled={this.state.isPdetail} 
                                                        placeholder = "district"
                                                        name="district"
                                                        onChange={(e) => this.handleChange(e)}
                                                        />
                                                        <input
                                                        type="number"
                                                        id="pincode"
                                                        className="form-control bgdis3  BuyerLogin21 mt7"
                                                        value= {this.state.pincode}
                                                        disabled={this.state.isPdetail} 
                                                        placeholder = "pincode"
                                                        name="pincode"
                                                        onChange={(e) => this.handleChange(e)}
                                                        />
                                                        <input
                                                        type="text"
                                                        id="state"
                                                        className="form-control bgdis3  BuyerLogin21 mt7"
                                                        value= {this.state.state}
                                                        disabled={this.state.isPdetail} 
                                                        placeholder = "state"
                                                        name="state"
                                                        onChange={(e) => this.handleChange(e)}
                                                        />
                                                        <Row noGutters={true} className="ml20">
                                                        {this.state.showValidationaddress ? (
                                                                      <span className="bg-danger text-center">
                                                                        {this.state.message}
                                                                      </span>
                                                                    ) : (
                                                                      <br />
                                                                    )}

                                                        </Row>
                                                        
                                                 </div>
                                                        }
                                              </Col>
                                              <Col sm={{size:"5"}}>
                                              <div class="Profilecontainer">

                                            <div class="card Profilecard">
                                            {$imagePreview}
                                            <input
                                                accept="image/png, image/jpeg"
                                                onChange={this.fileChangedHandler}
                                                type="file"
                                                ref="fileUploader"
                                                style={{ display: "none" }}
                                            ></input>
                                                                    
                                                </div>


                                            </div>
                                              </Col>
                                            </Col>
                                            <Col sm = {{size: "6"}} className="aocbg2" >
                                                <div className="fw600 bdetailsheading">
                                                <img
                                                                            src={logos.brandicon}
                                                                            className="iconcss"
                                                                    ></img>    {this.props.t("Pages.object.profileBrandDetails")}
                                                </div>
                                                {this.state.isBdetail ? <img
                                                                            src={logos.apedit}
                                                                            className="aoctick"
                                                                            style={{"cursor":"pointer" ,
                                                                            "position" : "absolute"}}
                                                                            onClick={this.handlebEdit}
                                                                            
                                                                    ></img> : 
                                                                    <img
                                                                            src={logos.done}
                                                                            className="poctick"
                                                                            style={{"cursor":"pointer",
                                                                            "position" : "absolute"}}
                                                                            onClick={this.handlebEdit2}
                                                                    ></img>}
                                                
                                                <hr className="hrlineaop3"></hr>
                                                <Col sm={{size:7}} className="cardtextfield">
                                                <div className="fw700 font14 mt7">
                                                {this.props.t("Pages.object.profileName")}:
                                                </div>
                                                <div>
                                                <input
                                                        type="text"
                                                        id="brandname"
                                                        className=" font14 form-control   BuyerLogin21 Margintopcss"
                                                        value= {this.state.brandname}
                                                        disabled={this.state.isBdetail} 
                                                        placeholder = "brandname"
                                                        name="brandname"
                                                        onChange={(e) => this.handleChange(e)}
                                                        
                                                        />
                                                
                                                </div>
                                                <div className="fw700 font14 mt7">
                                                {this.props.t("Pages.object.regCluster")}:
                                                </div>
                                                <div className="font14  mt7" >
                                                    {user.cluster.desc}
                                                    
                                                </div>
                                                <div className="fw700 font14 mt7">
                                                {this.props.t("Pages.object.profileProductCategory")}:
                                                </div>
                                                <div>
                                                    {this.state.isBdetail
                                                    ?
                                                    <div className="font14  mt7">
                                                    {this.state.prodsel}
                                                    </div>
                                                
                                                :
                                                <div>
                                                     <div id="ck-button m00">
                                                    <label>
                                                        <input type="checkbox" value="1" id={this.state.products[0].id}/>
                                                        <span>{this.state.products[0].productDesc}</span>
                                                    </label>
                                                    </div>
                                                    <div id="ck-button m00">
                                                    <label>
                                                        <input type="checkbox" value="2" id={this.state.products[1].id}/>
                                                        <span>{this.state.products[1].productDesc}</span>
                                                    </label>
                                                    </div>
                                                    <div id="ck-button m00">
                                                    <label>
                                                        <input type="checkbox" value="3" id={this.state.products[2].id}/>
                                                        <span>{this.state.products[2].productDesc}</span>
                                                    </label>
                                                    </div>
                                                    <div id="ck-button m00">
                                                    <label>
                                                        <input type="checkbox" value="1" id={this.state.products[3].id}/>
                                                        <span>{this.state.products[3].productDesc}</span>
                                                    </label>
                                                    </div>
                                                    <div id="ck-button m00">
                                                    <label>
                                                        <input type="checkbox" value="2" id={this.state.products[4].id}/>
                                                        <span>{this.state.products[4].productDesc}</span>
                                                    </label>
                                                    </div>
                                                    <div id="ck-button m00">
                                                    <label>
                                                        <input type="checkbox" value="3" id={this.state.products[5].id}/>
                                                        <span>{this.state.products[5].productDesc}</span>
                                                    </label>
                                                    </div>

                                                    </div>
                                                }
                                                                                                       
                                                </div>
                                                <div className="fw700 font14 mt7">
                                                {this.props.t("Pages.object.profileDescription")}:
                                                </div>
                                                <div>
                                                {this.state.isBdetail 
                                                ?   <div className="font14  mt7 widthdesc">
                                                    {this.state.branddesc}
                                                    </div>
                                                :<div>
                                                <textarea
                                                        id="branddesc"
                                                        className="form-control bgdis34  BuyerLogin212"
                                                        value= {this.state.branddesc}
                                                        placeholder = "branddesc"
                                                        disabled={this.state.isBdetail} 
                                                        name="branddesc"
                                                        onChange={(e) => this.handleChange(e)}
                                                        /> 
                                                       </div>

                                                }
                                                    
                                                </div>
                                                </Col>
                                                <Col sm={{size:5}}>
                                                <div class="Profilecontainer">

                                                        <div class="card Profilecard">
                                                        {$imagePreview2}
                                                        <input
                                                            accept="image/png, image/jpeg"
                                                            onChange={this.fileChangedHandler2}
                                                            type="file"
                                                            ref="fileUploader2"
                                                            style={{ display: "none" }}
                                                        ></input>
                                                            </div>


                                                        </div>
                                                </Col>
                                            </Col>
                                         
                                        
                                        </Row>
                                        :
                                        <Row noGutters={true}>
                                            <Col sm = {{size: "1"}} ></Col>
                                            <Col sm = {{size: "10"}}>
                                                    <div className="bankdetails">
                                                        <div className="bankheading">
                                                        <img src={logos.bankicon} className="bankicon ">

                                                        </img>
                                                        {this.props.t("Pages.object.bankDigitalOptionHeader")}
                                                            {this.state.isDetailsEdit ? <img
                                                                    src={logos.editblack}
                                                                    className="poctick2 "
                                                                    style={{"cursor":"pointer" ,
                                                                    "position" : "absolute"}}
                                                                    onClick={this.handlebdetEdit}
                                                            ></img> : 
                                                            <img
                                                                    src={logos.done}
                                                                    className="poctick2 "
                                                                    style={{"cursor":"pointer",
                                                                    "position" : "absolute"}}
                                                                    onClick={this.handlebdetEdit2}
                                                            ></img>}
                                                

                                                        </div>
                                                        <hr className="hrlineaop3 "></hr>
                                                        <Row noGutters={true} className="bankcontent">
                                                            <Col sm = {{size: "6"}}>
                                                            <div className="font20">
                                                            {this.props.t("Pages.object.profileBankDetails")}
                                                            </div>
                                                            <br></br>
                                                                                                        
                                                            <div className="fw700 font14">
                                                            {this.props.t("Pages.object.profileAccNo")}
                                                            </div>
                                                <div>
                                                <input
                                                        type="number"
                                                        id="accountno"
                                                        className="form-control bgdis33  BuyerLogin21"
                                                        value= {this.state.accountno}
                                                        placeholder = "Account no."
                                                        disabled={this.state.isDetailsEdit} 
                                                        name="accountno"
                                                        onChange={(e) => this.handleChange(e)}
                                                        /> 
                                                
                                                </div>
                                                <div className="fw700 font14">
                                                {this.props.t("Pages.object.profileBankName")}
                                                </div>
                                                <div>
                                                <input
                                                        type="text"
                                                        id="bankname"
                                                        className="form-control bgdis33 BuyerLogin21"
                                                        value= {this.state.bankname}
                                                        placeholder = "Bank Name"
                                                        disabled={this.state.isDetailsEdit} 
                                                        name="bankname"
                                                        onChange={(e) => this.handleChange(e)}
                                                        /> 
                                                    
                                                </div>
                                                <div className="fw700 font14">
                                                {this.props.t("Pages.object.proflieBeneName")}
                                                </div>
                                                <div>
                                                <input
                                                        type="text"
                                                        id="benificiaryname"
                                                        className="form-control bgdis33  BuyerLogin21"
                                                        value= {this.state.benificiaryname}
                                                        placeholder = "Benificiary Name"
                                                        disabled={this.state.isDetailsEdit} 
                                                        name="benificiaryname"
                                                        onChange={(e) => this.handleChange(e)}
                                                        /> 
                                                    
                                                </div>
                                                <div className="fw700 font14">
                                                {this.props.t("Pages.object.profileBranch")}
                                                </div>
                                                <div>
                                                <input
                                                        type="text"
                                                        id="branch"
                                                        className="form-control bgdis33  BuyerLogin21"
                                                        value= {this.state.branch}
                                                        placeholder = "Branch"
                                                        disabled={this.state.isDetailsEdit} 
                                                        name="branch"
                                                        onChange={(e) => this.handleChange(e)}
                                                        /> 
                                                    
                                                </div>
                                                <div className="fw700 font14">
                                                {this.props.t("Pages.object.profileIFSC")}
                                                </div>
                                                <div>
                                                <input
                                                        type="text"
                                                        id="ifsccode"
                                                        className="form-control bgdis33  BuyerLogin21"
                                                        value= {this.state.ifsccode}
                                                        placeholder = "IFSC Code"
                                                        disabled={this.state.isDetailsEdit} 
                                                        name="ifsccode"
                                                        onChange={(e) => this.handleChange(e)}
                                                        /> 
                                                    
                                                </div>
                                                

                                                            </Col>
                                                            <Col sm = {{size: "6"}}>
                                                            <div className="font20">
                                                            {this.props.t("Pages.object.profileDigiDetails")}
                                                            </div>
                                                            <br></br>
                                                            <Row>

                                                                <Col sm = {{size: "2"}}>
                                                                
                                                                <img src={logos.gpay} className="gpayicon"></img>

                                                                </Col>
                                                                <Col sm = {{size: "9"}} className="digitalbank">
                                                                <div className="fw700 font14">
                                                                {this.props.t("Pages.object.profileGoogleId")}
                                                                </div>
                                                                <div>
                                                                <input
                                                                        type="text"
                                                                        id="gpayupi"
                                                                        className="form-control bgdis33  BuyerLogin21 borderRadius0"
                                                                        value= {this.state.gpayupi}
                                                                        placeholder = "Gpay UPI."
                                                                        disabled={this.state.isDetailsEdit} 
                                                                        name="gpayupi"
                                                                        onChange={(e) => this.handleChange(e)}
                                                                        /> 
                                                                
                                                                </div>
                                                                </Col>
                                                                </Row>
                                                            <Row>

                                                                <Col sm = {{size: "2"}}>
                                                                
                                                                <img src={logos.paytm} className="gpayicon"></img>

                                                                </Col>
                                                                <Col sm = {{size: "9"}} className="digitalbank">
                                                                <div className="fw700 font14">
                                                                {this.props.t("Pages.object.profilePaytm")}
                                                                </div>
                                                                <div>
                                                                <input
                                                                        type="number"
                                                                        id="paytmupi"
                                                                        className="form-control bgdis33  BuyerLogin21 borderRadius0"
                                                                        value= {this.state.paytmupi}
                                                                        placeholder = "Paytm No."
                                                                        disabled={this.state.isDetailsEdit} 
                                                                        name="paytmupi"
                                                                        onChange={(e) => this.handleChange(e)}
                                                                        /> 
                                                                
                                                                </div>
                                                                </Col>
                                                                </Row>
                                                                <Row>

                                                                <Col sm = {{size: "2"}}>
                                                                
                                                                <img src={logos.phonepe} className="gpayicon"></img>

                                                                </Col>
                                                                <Col sm = {{size: "9"}} className="digitalbank">
                                                                <div className="fw700 font14">
                                                                {this.props.t("Pages.object.profilePhonepe")}
                                                                </div>
                                                                <div>
                                                                <input
                                                                        type="number"
                                                                        id="phonepeupi"
                                                                        className="form-control bgdis33  BuyerLogin21 borderRadius0"
                                                                        value= {this.state.phonepeupi}
                                                                        placeholder = "PhonePe No."
                                                                        disabled={this.state.isDetailsEdit} 
                                                                        name="phonepeupi"
                                                                        onChange={(e) => this.handleChange(e)}
                                                                        /> 
                                                                
                                                                </div>
                                                                </Col>
                                                              
                                                                </Row>
                                                            

                                                             
                                                
                                                                
                                                            </Col>
                                                            <div className="vrlinebank"></div>
                                                           
                                                            
                                                        </Row>   
                                                        <Row noGutters={true} className="text-center">
                                                        {this.state.showValidationbank ? (
                                                                      <span className="bg-danger text-center">
                                                                        {this.state.message}
                                                                      </span>
                                                                    ) : (
                                                                      <br />
                                                                    )}

                                                        </Row>

                                                        
                                                        
                                                    </div>
                                                    
                                            </Col>
                                           
                                        </Row>
                                                }
                       <Row noGutters={true}><Col className="letsbuildtext">{this.props.t("Pages.object.profileLetsBuildStrong")}</Col></Row>                

</Container>

</div>

                </div>
                <Footer></Footer>


            </React.Fragment>
           
        )
    }
}

function mapStateToProps(state) {
    // debugger;
    const { user } = state
    return { user };
}

const connectedLoginPage = connect(mapStateToProps)(ArtistProfile);
export default withTranslation()(connectedLoginPage);