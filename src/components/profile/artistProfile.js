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

class ArtistProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
          firstName : this.props.user.firstName,
          lastName : this.props.user.lastName,
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
          mobile:this.props.user.mobile,
          email:this.props.user.email,
          ratingclass: "p10",
          prodsel : "",
          selectedFile: [],
          profilePic : "",
          selectedBrandFile: [],
          brandPic : "",
          removedprofile : 0,
          removedlogo : 0,
          

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
                                    gpayupi : parseInt(response.data.data.user.paymentAccountDetails[items].accNo_UPI_Mobile), 
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
            
            this.setState({
                line1 : response.data.data.user.addressses[0].line1,
                district : response.data.data.user.addressses[0].district,
                pincode : response.data.data.user.addressses[0].pincode,
                state :response.data.data.user.addressses[0].state ,

            })
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
         TTCEapi.updatePersonalDetails(this.state.line1,this.state.district,this.state.pincode,this.state.state,this.state.selectedFile,this.state.removedprofile).then((response)=>{

         })
        this.setState({
            isPdetail:!this.state.isPdetail
        })
     }
      handlebdetEdit(){
        this.setState({
            isDetailsEdit:!this.state.isDetailsEdit
        })
    }
    handlebdetEdit2(){
        this.setState({
            isDetailsEdit:!this.state.isDetailsEdit
        })
        TTCEapi.updateBankDetails(this.state.accountno,this.state.bankname,
            this.state.branch,this.state.ifsccode,this.state.benificiaryname,
            this.state.gpayupi,this.state.paytmupi,this.state.phonepeupi).then((response) => {

            });
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
            this.setState({
                prodsel : productSelected
            });
            // document.getElementById("prodselected").innerHTML = productSelected;
        }); 
        this.setState({
            prodsel : productSelected
        },()=>{
            console.log(this.state.selectedprods) ;
            TTCEapi.updateBrandDetails(this.state.brandname,this.state.branddesc,this.state.selectedprods,this.state.selectedBrandFile,this.state.removedlogo);

        });

        // ()=>{
        //     console.log("Brand APi called");

        //     console.log(this.state);
        //    
        // }
        this.setState({
            isBdetail:!this.state.isBdetail
        })
    }
    
      handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        this.setState({
            ischanged : true
        });
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
            if (/[^0-9a-zA-Z\-\_\.\(\)]/.test(filename.name)) {
              customToast.error("Image name contains special characters.", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: true,
              });
              return;
            }
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
            if (/[^0-9a-zA-Z\-\_\.\(\)]/.test(filename.name)) {
              customToast.error("Image name contains special characters.", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: true,
              });
              return;
            }
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
                           Welcome,{ " " +this.state.firstName + " " + this.state.lastName }
                        </Row>
                        <Row noGutters={true} className="text-center ">
                           Manage your info,brand and bank details 
                        </Row>
                        <Row noGutters={true} className="text-center ">
                           Artist Rating : {this.state.rating} / 10
                        </Row>
                        <Row noGutters={true} className="mt30 ">
                            <Col sm = {{size: "6"}} className="text-right">
                               {this.state.isProfile 
                               ?
                               <u className="selected">My Details</u> 
                                :
                                <span className="notSelected" style={{"cursor":"pointer" }}  onClick={this.handleDetail}>My Details</span>
                                }
                            </Col>
                            <Col sm = {{size: "6"}} className="text-left">
                            {this.state.isProfile
                               ?
                               <span className="notSelected" style={{"cursor":"pointer" }} onClick={this.handleDetail}>Bank Details</span>
                                :
                                <u className="selected">Bank Details</u> 
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
                                                      Personal Details
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
                                                        Name:
                                                    </div>
                                                    <div className="font14  mt7">
                                                        {this.props.user.firstName + " " + this.props.user.lastName}                                               
                                                    </div>
                                                <div className="fw700 font14 mt7">
                                                   Email Id:
                                                </div>
                                                <div className="font14  mt7">
                                                   <p>{this.props.user.email}</p> 
                                                </div>
                                                <div className="fw700 font14 mt7">
                                                    Mobile:
                                                </div>
                                                <div className="font14  mt7">
                                                {this.props.user.mobile}
                                                </div>
                                                <div className="fw700 font14 mt7">
                                                    Address:
                                                </div>
                                                {this.state.isPdetail
                                                ? 
                                                    <div className="font14  mt7">
                                                        {this.state.line1}
                                                        {" " + this.state.district },
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
                                                                    ></img>    Brand Details
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
                                                    Name:
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
                                                    Cluster:
                                                </div>
                                                <div className="font14  mt7" >
                                                    {this.props.user.cluster.desc}
                                                    
                                                </div>
                                                <div className="fw700 font14 mt7">
                                                    Product Category:
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
                                                   Description:
                                                </div>
                                                <div>
                                                {this.state.isBdetail 
                                                ?   <div className="font14  mt7">
                                                    {this.state.branddesc}
                                                    </div>
                                                :<div>
                                                <textarea
                                                        id="branddesc"
                                                        className="form-control bgdis3  BuyerLogin212"
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
                                                            Bank and Digital Payment Options
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
                                                                Bank Details
                                                            </div>
                                                            <br></br>
                                                                                                        
                                                            <div className="fw700 font14">
                                                                Account Number
                                                            </div>
                                                <div>
                                                <input
                                                        type="number"
                                                        id="accountno"
                                                        className="form-control bgdis3  BuyerLogin21"
                                                        value= {this.state.accountno}
                                                        placeholder = "Account no."
                                                        disabled={this.state.isDetailsEdit} 
                                                        name="accountno"
                                                        onChange={(e) => this.handleChange(e)}
                                                        /> 
                                                
                                                </div>
                                                <div className="fw700 font14">
                                                    Bank Name
                                                </div>
                                                <div>
                                                <input
                                                        type="text"
                                                        id="bankname"
                                                        className="form-control bgdis3  BuyerLogin21"
                                                        value= {this.state.bankname}
                                                        placeholder = "Bank Name"
                                                        disabled={this.state.isDetailsEdit} 
                                                        name="bankname"
                                                        onChange={(e) => this.handleChange(e)}
                                                        /> 
                                                    
                                                </div>
                                                <div className="fw700 font14">
                                                    Benificiary Name
                                                </div>
                                                <div>
                                                <input
                                                        type="text"
                                                        id="benificiaryname"
                                                        className="form-control bgdis3  BuyerLogin21"
                                                        value= {this.state.benificiaryname}
                                                        placeholder = "Benificiary Name"
                                                        disabled={this.state.isDetailsEdit} 
                                                        name="benificiaryname"
                                                        onChange={(e) => this.handleChange(e)}
                                                        /> 
                                                    
                                                </div>
                                                <div className="fw700 font14">
                                                    Branch
                                                </div>
                                                <div>
                                                <input
                                                        type="text"
                                                        id="branch"
                                                        className="form-control bgdis3  BuyerLogin21"
                                                        value= {this.state.branch}
                                                        placeholder = "Branch"
                                                        disabled={this.state.isDetailsEdit} 
                                                        name="branch"
                                                        onChange={(e) => this.handleChange(e)}
                                                        /> 
                                                    
                                                </div>
                                                <div className="fw700 font14">
                                                    IFSC Code
                                                </div>
                                                <div>
                                                <input
                                                        type="text"
                                                        id="ifsccode"
                                                        className="form-control bgdis3  BuyerLogin21"
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
                                                                Digital Payment Details
                                                            </div>
                                                            <br></br>
                                                            <Row>

                                                                <Col sm = {{size: "2"}}>
                                                                
                                                                <img src={logos.gpay} className="gpayicon"></img>

                                                                </Col>
                                                                <Col sm = {{size: "9"}} className="digitalbank">
                                                                <div className="fw700 font14">
                                                                    Google Pay UPI Id
                                                                </div>
                                                                <div>
                                                                <input
                                                                        type="text"
                                                                        id="gpayupi"
                                                                        className="form-control bgdis3  BuyerLogin21 borderRadius0"
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
                                                                    Paytm Registered Mobile Number
                                                                </div>
                                                                <div>
                                                                <input
                                                                        type="text"
                                                                        id="paytmupi"
                                                                        className="form-control bgdis3  BuyerLogin21 borderRadius0"
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
                                                                    Registered Number for PhonePe
                                                                </div>
                                                                <div>
                                                                <input
                                                                        type="text"
                                                                        id="phonepeupi"
                                                                        className="form-control bgdis3  BuyerLogin21 borderRadius0"
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
                                                    </div>
                                                    
                                            </Col>
                                            
                                        </Row>
                                                }
                       <Row noGutters={true}><Col className="letsbuildtext">Let's build the strong future!</Col></Row>                

</Container>

</div>
{console.log(this.props.user)}
                </div>
                <Footer></Footer>


            </React.Fragment>
            // <div>
            //      {console.log("user data")}
            //      {console.log(this.props.user)}
            //      {"this is my profile page check console for variable"}
            // </div>
        )
    }
}

function mapStateToProps(state) {
    // debugger;
    const { user } = state
    return { user };
}

const connectedLoginPage = connect(mapStateToProps)(ArtistProfile);
export default connectedLoginPage;