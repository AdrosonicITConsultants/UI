import React, { Component } from 'react'
import logos from "../../assets";
import { Row, Col , Container, Card,CardBody} from 'reactstrap';
import '../navbar/navbar.css';
import { memoryHistory, browserHistory } from "../../helpers/history";
import TTCEapi from '../../services/API/TTCEapi';
import NavbarComponent from "../navbar/navbar";
import Customprod from './Customprod';
import Footer from "../footer/footer";
import Moment from 'react-moment';
import HoldPopup from '../ModalComponent/ModalHold';
import Popup from '../ModalComponent/EnguiryModal';
import SuccessPopup from '../ModalComponent/SuccessModal';
class AddCustomprod extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            buyergetAllProducts:[],
            ImageUrl:TTCEapi.ImageUrl+'CustomProduct/',
            deleteAllProductsInbuyerCustom:[],
            pageLoad:false,
            showPopup: false,
            dataload : false,
          header:"Welcome",
          generateEnquiry:null,
          isLoadingEnquiry:false,
          modalIsOpen: false,
          isCustom:true,
          enqgen:false,
        };
        this.handleDeleteAllItem = this.handleDeleteAllItem.bind(this);
        this.generateEnquiry = this.generateEnquiry.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    closeModal() {
        this.setState({ modalIsOpen: false });

      }
   
      generateEnquiry(item){
        this.setState({ modalIsOpen: true });
          TTCEapi.ifEnquiryExists(item,true).then((response)=>{
        this.setState({ifEnquiryExists : response.data.data},()=>{
          // this.setState({ modalIsOpen: false });
            console.log(this.state.ifEnquiryExists);
            if(this.state.ifEnquiryExists.ifExists ==false){
              TTCEapi.generateEnquiry(item,true).then((response)=>{
                this.setState({generateEnquiry : response.data.data,modalIsOpen: false,enqgen:true },()=>{
                               console.log(this.state.generateEnquiry);
                              });
              });
            }
        });
        
      });
      }

    backoperation(){
        browserHistory.push("/home"); 
    }  
    handleDeleteAllItem(){
        // if(window.confirm("Remove this item from wishlist?")){
            TTCEapi.deleteAllProductsInbuyerCustom().then((response)=>{
                this.setState({deleteAllProductsInbuyerCustom : response.data},()=>{
                    console.log(this.state.deleteAllProductsInbuyerCustom);
                    document.getElementById('id01').style.display='none';
                    window.location.reload();
                });
            });
            
        // }
      
    }
    componentDidMount(){
   
        TTCEapi.buyergetAllProducts().then((response)=>{
         this.setState({ dataload : true,buyergetAllProducts : response.data.data},()=>{
          
             console.log(this.state.buyergetAllProducts);
          
             // console.log(this.props.user);
         });
     });
     }

     ToggleDelete = () => {
        document.getElementById('id01').style.display='block';
       }

       ToggleDeleteClose = () => {
        document.getElementById('id01').style.display='none';
       }
    render() {
        return (
   
            <React.Fragment>
             
             {this.state.dataload == true 
                  
                   ? 
                   <> 
     
                  <NavbarComponent />
                  
                  {this.state.buyergetAllProducts.length==0?
              <Customprod />  :
               
                 <>
                  <body onload="window.location.reload()"></body>
                <Container className="wishlistbg">
              <Row  >
          
              
              <Col md = "1">
                        <img
                                    src={logos.backarrowicon}
                                     className="margin-cparrow cparrowsize glyphicon"
                                     onClick={() => this.backoperation()}
                                    //  onClick={() => this.props.history.go(-1)}
                                ></img>
                       
                       </Col>
                <Col md='10'className="addedwishlist">
                    <h1 > Your custom products</h1>
                     <Row noGutter={true}>
                         <Col md ="6" >
                  <p style={{float:"left"}} className="Totalitemsinwishlist" id="pageNumbers">Total Items:{this.state.buyergetAllProducts.length} </p> 
                         </Col>
                       
                         <Col md ="6"   onClick={this.ToggleDelete}>
                             <p style={{float:"right"}}>
                             <button className="clearmywishlist"><img className="homeiconwishlist" src={logos.clearmywishlist}/>
                              <span className="spanhome">Clear my designs</span></button>

                             </p>
                         </Col>
                         <div id="id01" class="w3-modal">
                            <div class="w3-modal-content w3-animate-top modalBoxSize">
                            <div class="w3-container">
                                <h3 className="deleteModalHeader">Are you sure you want to clear designs ?</h3>
                                <p className="deleteModalPara">You can keep the changes or can go back to update.</p>
                                <div className="deleteModalButtonOuterDiv">
                                <span onClick={this.ToggleDeleteClose} className="deleteModalCancelButton">Cancel</span>
                                <span onClick={() => this.handleDeleteAllItem()} className="deleteModalOkayButton">Clear</span>
                                </div>
                            </div>
                            </div>
                            </div>
                      
                         <hr className="hrlineasd "></hr>
                     </Row>
                     {this.state.buyergetAllProducts ? ( ( this.state.buyergetAllProducts.map((data) => ( 
              <>
              
                    
               <div>
                    <Card className="wishlistcardbody">
                        <Row  >
                            <Col sm={12} className="srno">
                            <p></p>
                            </Col>
                        </Row>
                    <Row  >
                        
{/* Col 1                         */}
                    <Col sm={2} >
                        
                  <div className="Wishlistitemimgdiv">
                        {data.productImages[0].productId? 
                  <img className="Wishlistitemimg" src={this.state.ImageUrl + data.productImages[0].productId + '/' + data.productImages[0].lable }/>
                            :
                            <img className="Wishlistitemimg" src={logos.Smile} />
                        }
                      
                      {/* <img className="Wishlistitemimg" src={logos.Vengtikari}/> */}

                     </div>
                    </Col>
{/* col 2 */}
                     <Col sm={6} className="secondcolmargin"> 
                     <Row  >
                            <Col sm={12} className="">
                           <h1 className="addedcustom">{data.productCategory.productDesc}/
                           <span style={{color:"grey",fontWeight:"400",fontSize:"15px"}}>  {data.warpYarn? data.warpYarn.yarnDesc:null} 
                           {data.weftYarn?
                           " X":null}  <span></span>
                           {data.weftYarn?
                            data.weftYarn.yarnDesc:null}  {data.extraWeftYarn? " X":null} <span></span>
                           {data.extraWeftYarn? data.extraWeftYarn.yarnDesc:null}</span></h1> 
                          
                            </Col>
                     </Row>
                     <Row   > 
                         <Col sm={12}>
                             <p className="Descriptionipara regular"  numberOfLines={2}  >{data.product_spec}
                           </p>
                         </Col>
                     </Row>
                     <Row   >
                        
                         <Col sm={12} className="Wishlistpcode">
                     <span>Date created :</span> <span><b>
                     <Moment format="YYYY-MM-DD">
                            {data.createdOn}
                             </Moment>
                          </b></span>
                    
                         </Col>
                     </Row>
                       </Col> 
{/* Col 3 */}
                       <Col sm={3} className="Colfloatri">
                         <Row  >
                         <Col sm={12}  className="Editprodmodify">
                            <a href = {"/editBuyerProduct?productId=" + data.id}>
                            View & modify product <img className="editimgicon" src={logos.Iconfeatheredit3}/>
                            </a>
                            </Col>
                             </Row>  
                        <Row  >
                            <Col sm={12} >
                            <div class="buttons">
                        <button class="bpdbutton -bg-yellow" style={{marginTop:"10px",height:"43px",width:"195px"}}  onClick={() => this.generateEnquiry(data.id)}>
                      {console.log(data.id)}
              
                            <span>Enquiry Now</span>
                                <div class="arrowPacman">
                            <div class="arrowPacman-clip">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.10081 0L5.88245 1.23617L10.7016 6.12576H0V7.87423H10.7016L5.88245 12.7638L7.10081 14L14 7L7.10081 0Z" fill="white"/>
                                </svg>
                                
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.10081 0L5.88245 1.23617L10.7016 6.12576H0V7.87423H10.7016L5.88245 12.7638L7.10081 14L14 7L7.10081 0Z" fill="white"/>
                                </svg>
                            </div>
                            </div>
                        </button>

                            </div>
                            </Col>
                            </Row>
                            <Row  >
                                <Col sm={12} >
                               
                               {/* <p className="Wishlistpcode margintopcss"><b>Available in </b>Stock</p> */}
 
                            
{/*                             
                            <p className="Wishlistpcode margintopcss">     
                            <b style={{color:"purple"}}>Exclusively </b>made to order
                            </p> */}
                            
                                </Col>
                            </Row>
                       </Col>

                       </Row>
          
                    </Card>
                    </div>
       
                    {this.state.modalIsOpen?
                  <HoldPopup isOpen={this.state.modalIsOpen}/>
                :null}

                { this.state.ifEnquiryExists ?
                <>
                   { this.state.ifEnquiryExists.ifExists== true ? 
                <Popup
                EnquiryCode={this.state.ifEnquiryExists.code}
                productName={this.state.ifEnquiryExists.productName}
                productId={data.id}
                isCustom={this.state.isCustom}
                enquiryId={this.state.ifEnquiryExists.enquiryId}

                />
                 :
                        (
                            // this.state.isLoadingEnquiry ?
                //    <HoldPopup/>
                   
                this.state.enqgen ? 
                 <SuccessPopup
                 EnquiryCode={this.state.generateEnquiry.enquiry.code}
                 productName={this.state.generateEnquiry.productName}
                 productId={data.id}
                 enquiryId={this.state.generateEnquiry.enquiry.id}
                 />
                 : null
                         ) } </>
             
               
                :
              null
                }


                    </>  ) ) 
                 )): null
                 }
                </Col>
               
                  </Row> 
                  <Row>
                      <div className="timelessstorybg">

                      </div>
                  </Row>
              
                 
     
                  </Container>
                  <Footer/>
                     </>
                     }
                    </>
                   
                   :null}
                </React.Fragment>
              
        )
    }
}
export default AddCustomprod;