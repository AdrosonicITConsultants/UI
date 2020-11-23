import React, { Component } from 'react';
import { Row, Col , Container} from 'reactstrap';
import "./artistRegister.css"
// import Buyerlogin from "../../buyer/buyeruser";
import Artreg1 from "./artreg1";
import Artreg2 from "./artreg2";
import Artreg3 from "./artreg3";
import Artreg4 from "./artreg4";
import Artreg5 from "./artreg5";
import TTCEapi from '../../../services/API/TTCEapi';
import customToast from "../../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { memoryHistory, browserHistory } from "../../../helpers/history"
import { useTranslation, withTranslation } from "react-i18next";


class artistRegister extends Component {
                 constructor(props) {
                   super(props);

                   this.state = {
                     userpage: 3,
                     weaverid: "",
                     emailid: "",
                     password: "",
                     firstname: "",
                     lastname: "",
                     pincode: "",
                     cluster: -1,
                     district: "",
                     state: "",
                     mobileno: "",
                     panno: "",
                     address: "",
                     clustername : "",
                     selectedprods :[],
                     selectedFile : [],

                    //  weaverid,emailid,password,firstname,lastname,pincode,cluster,district,state,mobileno,panno,address

                   };
                   this.handler = this.handler.bind(this);
                   this.checkweaverid = this.checkweaverid.bind(this);
                   this.sendotp = this.sendotp.bind(this);
                   this.verifyOtp = this.verifyOtp.bind(this);
                   this.storepassword = this.storepassword.bind(this);
                   this.storedetails1 = this.storedetails1.bind(this);
                   this.completeRegister = this.completeRegister.bind(this);
                 }

                 renderSection(num) {
                   switch (num) {
                     case 0:
                       return (
                         <Artreg1
                           handler={this.handler}
                           cwi={this.checkweaverid}
                         />
                       );
                       break;
                     case 1:
                       return (
                         <Artreg2
                           handler={this.handler}
                           so={this.sendotp}
                           vo={this.verifyOtp}
                         />
                       );
                       break;
                     case 2:
                       return (
                         <Artreg3
                           handler={this.handler}
                           sp={this.storepassword}
                           password = {this.state.password}
                         />
                       );
                       break;
                     case 3:
                       return (
                         <Artreg4
                           handler={this.handler}
                           sd1={this.storedetails1}
                           weaverid={this.state.weaverid}
                           emailid = {this.state.emailid}
                           firstname = {this.state.firstname}
                           lastname = {this.state.lastname}
                           pincode = {this.state.pincode}
                           cluster = {this.state.cluster}
                           district = {this.state.district}
                           state = {this.state.state}
                           mobileno = {this.state.mobileno}
                           panno = {this.state.panno}
                           address = {this.state.address}
                           clustername = {this.state.clustername}
                         />
                       );
                       break;
                     case 4:
                       return <Artreg5 handler={this.handler} 
                       cr = {this.completeRegister} />;
                       break;
                     default:
                       break;
                   }
                 }
                 completeRegister(selectedprods,selectedFile){
                   this.setState({selectedprods : selectedprods , selectedFile : selectedFile},() => {
                     debugger;
                    TTCEapi.registerArtist(this.state.weaverid,this.state.emailid,this.state.password,
                      this.state.firstname,this.state.lastname,this.state.pincode,this.state.cluster,
                      this.state.district,this.state.state,this.state.mobileno,this.state.panno,
                      this.state.address,this.state.selectedprods,this.state.selectedFile).then((response) => {
                         //  debugger;
                       if (response.data.valid) {
                        customToast.success(this.props.t("Pages.object.regRegistrationSuccess"), {
                          position: toast.POSITION.TOP_RIGHT,
                          autoClose: true,
                        });
                        localStorage.setItem("homepageredirect", 3);
                          setTimeout(
                            () => {browserHistory.push("/");},
                         2000
                          );
                          
                        
                       } else {
                           customToast.error(response.data.errorMessage, {
                             position: toast.POSITION.TOP_RIGHT,
                             autoClose: true,
                           });
                         // alert("please enter valid OTP.");
                       }

                    } );

                   })
                 }
                 storedetails1(
                   firstname,
                   lastname,
                   pincode,
                   cluster,
                   district,
                   state,
                   mobileno,
                   panno,
                   address,
                   clustername
                 ) {
                   this.setState({
                     firstname: firstname,
                     lastname: lastname,
                     pincode: pincode,
                     cluster: cluster,
                     district: district,
                     state: state,
                     mobileno: mobileno,
                     panno: panno,
                     address: address,
                     clustername : clustername
                   },() => {
                     
                   });
                  //  console.log(
                  //    firstname,
                  //    lastname,
                  //    pincode,
                  //    cluster,
                  //    district,
                  //    state,
                  //    mobileno,
                  //    panno,
                  //    address
                  //  );
                 }
                 storepassword(password){
                  this.setState(
                    { password: password } , () => {
                      console.log(this.state.password);

                    });


                 }
                 checkweaverid(weaverid) {
                   // console.log(weaverid , weaverpin);
                   this.setState(
                     { weaverid: weaverid },
                     () => {
                       TTCEapi.checkWeaverId(
                         this.state.weaverid                    
                       ).then((response) => {
                         if (response.data.valid) {
                           this.handler(1);
                         } else {
                           // alert("Wrong credentials");
                           customToast.error(response.data.message ? response.data.message : "Please enter valid Artisan ID.", {
                             position: toast.POSITION.TOP_RIGHT,
                             autoClose: true,
                           });
                         }
                       });
                     }
                   );
                 }

                 sendotp(emailid) {
                   console.log(emailid);
                 
                  //  debugger;
                   this.setState({ emailid: emailid }, () => {
                     TTCEapi.sendOtp(emailid).then((response) => {
                       debugger;
                       if (response.data.valid) {
                         customToast.success(response.data.data, {
                           position: toast.POSITION.TOP_RIGHT,
                           autoClose: true,
                         });
                       } else {
                         customToast.error(response.data.errorMessage, {
                           position: toast.POSITION.TOP_RIGHT,
                           autoClose: true,
                         });
                       }
                     });
                   });
                 }

                 verifyOtp(emailid, otppin) {
                  //  debugger;
                   this.setState({ emailid: emailid }, () => {
                     TTCEapi.verifyOtp(emailid, otppin).then((response) => {
                      //  debugger;
                       if (response.data.valid) {
                         this.handler(2);
                       } else {
                         customToast.error("please enter valid OTP", {
                           position: toast.POSITION.TOP_RIGHT,
                           autoClose: true,
                         });
                         // alert("please enter valid OTP.");
                       }
                     });
                   });
                 }

                 handler(num) {
                   this.setState({ userpage: num }, () => {
                     console.log(this.state.userpage);
                   });
                 }

                 render() {
                   return (
                     <React.Fragment>
                       <div className="registerimg">
                         <Container>
                           <Row   className="mt-5">
                             {this.renderSection(this.state.userpage)}
                           </Row>
                         </Container>
                       </div>
                     </React.Fragment>
                   );
                 }
               }

               export default withTranslation()(artistRegister);