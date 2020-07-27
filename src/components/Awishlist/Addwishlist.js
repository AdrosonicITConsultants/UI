import React, { Component } from 'react'
import logos from "../../assets";
import { Row, Col , Container, Card,CardBody} from 'reactstrap';
import '../navbar/navbar.css';
import { memoryHistory, browserHistory } from "../../helpers/history";
import TTCEapi from '../../services/API/TTCEapi';
import NavbarComponent from "../navbar/navbar";
import "./Awishlist.css"
import Wishlist from './Wishlist';
import Footer from "../footer/footer";
import customToast from "../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import HoldPopup from '../ModalComponent/ModalHold';
import Popup from '../ModalComponent/EnguiryModal';
import SuccessPopup from '../ModalComponent/SuccessModal';
// import Popup from './EnguiryModal';

class AddWishlist extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            getProductsInWishlist:[],
            ImageUrl:TTCEapi.ImageUrl+'Product/',
            deleteProductsInWishlist:[],
            pageLoad:false,
            showPopup: false,
          header:"Welcome",
          generateEnquiry:null,
          isLoadingEnquiry:false,
          modalIsOpen: false,
          isCustom:false,
   
        };
    //     this.handleDeleteItem = this.handleDeleteItem.bind(this);   
    //  this.handleDeleteAllItem = this.handleDeleteAllItem.bind(this);
     this.generateEnquiry = this.generateEnquiry.bind(this);
     this.closeModal = this.closeModal.bind(this);
    }

    backoperation(){
        browserHistory.push("/home"); 
    }  
    closeModal() {
        this.setState({ modalIsOpen: false });
      }
    productopen(id){
        browserHistory.push("/Product-Details?productId=" + id);
        window.location.reload();
    }
    togglePopup() {
        this.setState({
          showPopup: !this.state.showPopup
        });
      }

    generateEnquiry(item){
        this.setState({ modalIsOpen: true });
              TTCEapi.generateEnquiry(item,false).then((response)=>{
            this.setState({generateEnquiry : response.data.data},()=>{
                this.setState({ modalIsOpen: false });
                console.log(this.state.generateEnquiry);
                
            });
        });
    }
  
    handleDeleteItem(id){
        // if(window.confirm("Remove this item from wishlist?")){
        TTCEapi.deleteProductsInWishlist(id).then((response)=>{
            if (response.data.valid) {
                customToast.success("Product removed from wishlist!", {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: true,
                });
                this.setState({deleteProductsInWishlist : response.data},()=>{
                    console.log(this.state.deleteProductsInWishlist);
                    document.getElementById('id02').style.display='none';
                    window.location.reload();
                    // this.componentDidMount();
                
             
                });
            }
            else{
                customToast.error(response.data.errorMessage, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true,
                  });
            }
           
        
        });
    // }
      
    }

    handleDeleteAllItem(){
        // if(window.confirm("Remove this item from wishlist?")){
            TTCEapi.deleteAllProductsInWishlist().then((response)=>{
                this.setState({deleteAllProductsInWishlist : response.data},()=>{
                    console.log(this.state.deleteAllProductsInWishlist);
                    document.getElementById('id01').style.display='none';
                    window.location.reload();
                });
            });
        // }
      
    }

    ToggleDelete = () => {
        document.getElementById('id01').style.display='block';
       }

       ToggleDeleteClose = () => {
        document.getElementById('id01').style.display='none';
       }

       ToggleDelete1 = () => {
        document.getElementById('id02').style.display='block';
       }

       ToggleDeleteClose1 = () => {
        document.getElementById('id02').style.display='none';
       }

      componentDidMount(){
   
     TTCEapi.getProductsInWishlist().then((response)=>{
      this.setState({getProductsInWishlist : response.data.data},()=>{
          console.log(this.state.getProductsInWishlist);
         
      });
  }); 

  }

    render() {
        return (
   
            <React.Fragment>
             
         
     
                  <NavbarComponent />
                  {this.state.getProductsInWishlist.length==0?
                  <Wishlist></Wishlist>:
                  <>
                  {/* <body onload="window.location.reload()"></body> */}
                  
                <Container className="wishlistbg">
            
              <Row noGutters={true}>
          
              
              <Col md = "1">
                        <img
                                    src={logos.backarrowicon}
                                    className="margin-cparrow cparrowsize glyphicon"
                                     onClick={() => this.backoperation()}
                                    //  onClick={() => this.props.history.go(-1)}
                                ></img>
                       
                       </Col>
                <Col md='10'className="addedwishlist">
                    <h1 > Your Wish list</h1>
                     <Row noGutter={true}>
                         <Col md ="6" >
                  <p style={{float:"left"}} className="Totalitemsinwishlist" id="pageNumbers">Total Items: {this.state.getProductsInWishlist.length}</p> 
                         </Col>
                         <Col md ="6" onClick={this.ToggleDelete}>
                             <p style={{float:"right"}}>
                             <button className="clearmywishlist"><img className="homeiconwishlist" src={logos.clearmywishlist}/>
                              <span className="spanhome">Clear my wishlist</span></button>

                             </p>
                         </Col>
                         <div id="id01" class="w3-modal">
                            <div class="w3-modal-content w3-animate-top modalBoxSize">
                            <div class="w3-container">
                                <h3 className="deleteModalHeader">Are you sure you want to clear wishlist ?</h3>
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
            
                     {this.state.getProductsInWishlist ? ( ( this.state.getProductsInWishlist.map((data) => ( 
              <>
        {/* {console.log(data)} */}
               <div>
                    <Card className="wishlistcardbody" >
                        <Row noGutters={true}>
                            <Col sm={12} className="srno">
                            <p></p>
                            </Col>
                        </Row>
                    <Row noGutters={true}>
                        
{/* Col 1                         */}
                    <Col sm={2} >
                        
                  <div className="Wishlistitemimgdiv">
                      {data.product.productImages[0]?
                      <img className="Wishlistitemimg"  onClick={()=>{ this.productopen(data.product.id)}} src={this.state.ImageUrl + data.product.productImages[0].productId + '/' + data.product.productImages[0].lable }/>
                        :null}
                      {/* <img className="Wishlistitemimg" src={logos.Vengtikari}/> */}

                     </div>
                    </Col>
{/* col 2 */}
                     <Col sm={6} className="secondcolmargin"> 
                     <Row noGutters={true}>
                            <Col sm={12}>
                           <h1 className="wishlistitemcardtitle">{data.product.tag}</h1> 
                            </Col>
                     </Row>
                     <Row  noGutters={true}> 
                         <Col sm={12}>
                             <p className="Descriptionitemp">
                            {data.product.product_spe}</p>
                         </Col>
                     </Row>
                     <Row  noGutters={true}>
                         <Col sm={6} className="colalign" style={{borderRight:"1px solid gray"}}>
                             <span>
                                {data.product.madeWithAnthran==0? 
                                <img className="wishlistitembrand" src={logos.artisianSelfLogo}/>
                                :
                                <img className="wishlistitembrand" src={logos.antaranCoDesignLogo}/>
                                }
                           </span>

                            <span className="wishlistbrand">{data.product.clusterName} //</span>
                            <span className="wishlistbrand2">{data.product.brand}</span>
                         </Col>
                         <Col sm={6} className="Wishlistpcode">
                           <span>Product Code :</span> <span><b>{data.product.code}</b></span>
                         </Col>
                     </Row>
                       </Col> 
{/* Col 3 */}
                       <Col sm={3} className="Colfloatri">
                         <Row noGutters={true}>
                         <Col sm={12}  className="Removefromwishlist" onClick={this.ToggleDelete1} >
                            Remove from wish list <img src={logos.removefromwishlist} />
                            </Col>
                            <div id="id02" class="w3-modal">
                            <div class="w3-modal-content w3-animate-top modalBoxSize">
                            <div class="w3-container">
                                <h3 className="deleteModalHeader">Are you sure you want to remove from wishlist ?</h3>
                                <p className="deleteModalPara">You can keep the changes or can go back to update.</p>
                                <div className="deleteModalButtonOuterDiv">
                                <span onClick={this.ToggleDeleteClose1} className="deleteModalCancelButton">Cancel</span>
                                <span onClick={() => this.handleDeleteItem(data.product.id)} className="deleteModalOkayButton">Remove</span>
                                </div>
                            </div>
                            </div>
                            </div>

                             </Row>  
                        <Row noGutters={true}>
                            <Col sm={12} >
                            <div class="buttons" >
                        <button class="bpdbutton -bg-yellow" style={{marginTop:"10px",height:"43px",width:"195px"}} 
                        onClick={() => this.generateEnquiry(data.product.id)}>
                            
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
                            <Row noGutters={true}>
                                <Col sm={12} >
                                {data.product.productStatusId==2?
                               <p className="Wishlistpcode margintopcss"><b>Available in </b>Stock</p>
                                         :
                                <p className="Wishlistpcode margintopcss">     
                            <b style={{color:"purple"}}>Exclusively </b>made to order
                            </p>
                            }
                                </Col>
                            </Row>
                       </Col>

                       </Row>
          
                    </Card>
                    </div>
                    {this.state.modalIsOpen?
                  <HoldPopup isOpen={this.state.modalIsOpen}/>
                :null}

                { this.state.generateEnquiry ?
                <>
                   { this.state.generateEnquiry.ifExists== true ? 
                <Popup
                EnquiryCode={this.state.generateEnquiry.enquiry.code}
                productName={this.state.generateEnquiry.productName}
                productId={data.product.id}
                />
                 :
                        (
                            // this.state.isLoadingEnquiry ?
                //    <HoldPopup/>
                   

                 <SuccessPopup
                 EnquiryCode={this.state.generateEnquiry.enquiry.code}
                 productName={this.state.generateEnquiry.productName}
                 productId={data.product.id}
                 />
                         ) } </>
             
               
                :
              null
                }
                    </>  ) ) 
                 )): null
                 }
                </Col>
               
                  </Row> 
                 
            
                
                  </Container>
                  {/* <Footer/> */}
                  </>}
                 
                 
     
                </React.Fragment>
              
        )
    }
}
export default AddWishlist;