import React, { Component } from 'react'
import logos from "../../assets";
import { Row, Col , Container, Button} from 'reactstrap';
import '../navbar/navbar.css';
// import './ArtisanselfDesign.css';
import Footer from "../footer/footer";
import { Switch, Route, Router,Link } from "react-router-dom";
import PrivateRoute from "../../services/utils/PrivateRoute";
import { memoryHistory, browserHistory } from "../../helpers/history";
// import ArtistSelfDesignCategories from './Artisanselfdesign-Categories';
// import ArtistSelfDesignBrands from './Artisanselfdesign-artisanbrands';
// import ArtisanselfdesignNavbar from "./Artisanselfdesign-Navbar";
import TTCEapi from '../../services/API/TTCEapi';
// import "./ProductCategories.css"
import customToast from "../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import HoldPopup from '../ModalComponent/ModalHold';
import Popup from '../ModalComponent/EnguiryModal';
import SuccessPopup from '../ModalComponent/SuccessModal';
export class ProductsOfSearch extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            
            proddata : this.props.productData,
            imagename :this.props.productData.images.split(",")[0],
            isfavHovered :false,
            imageurl : logos.dupatta,
            imageUrl : TTCEapi.ImageUrl +"Product/",
            isAddedtoWishlist: this.props.productIdsInWishlist,
            addToWishlist:null,
            deleteProductsInWishlist:[],
            isLoadingEnquiry:false,
            modalIsOpen: false,
            isCustom:false,
            ifEnquiryExists:null,
        };
        this.handleAddtoWishlist = this.handleAddtoWishlist.bind(this);
    //   console.log(this.props);
    this.generateEnquiry = this.generateEnquiry.bind(this);
        // this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    closeModal() {
      this.setState({ modalIsOpen: false });
    }
    handleAddtoWishlist(id){
      TTCEapi.addToWishlist(id).then((response)=>{
        if (response.data.valid) {
          customToast.success("Product added to wishlist!", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: true,
          });
          this.setState({isAddedtoWishlist : response.data.valid},()=>{
              console.log(this.state.isAddedtoWishlist);
       
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

//   generateEnquiry(item){
//     this.setState({ modalIsOpen: true });
//     TTCEapi.generateEnquiry(item,false).then((response)=>{
//   this.setState({generateEnquiry : response.data.data},()=>{
//     this.setState({ modalIsOpen: false });
//       console.log(this.state.generateEnquiry);
      
//   });
// });
// }

generateEnquiry(item){
  this.setState({ modalIsOpen: true });
    TTCEapi.ifEnquiryExists(item).then((response)=>{
  this.setState({ifEnquiryExists : response.data.data},()=>{
    // this.setState({ modalIsOpen: false });
      console.log(this.state.ifEnquiryExists);
      
  });
  if(this.state.ifEnquiryExists.ifExists ==false){
    TTCEapi.generateEnquiry(item,false).then((response)=>{
      this.setState({generateEnquiry : response.data.data},()=>{
        this.setState({ modalIsOpen: false });
          console.log(this.state.generateEnquiry);
          
      });
    });
  }
});
}
    productDescription(id){
      console.log("Product Descriptiony " + id);
      browserHistory.push("/Product-Details?productId=" + id); 

    }
    handleRemovefromWishlist(id){
      TTCEapi.deleteProductsInWishlist(id).then((response)=>{
          console.log(response);   
          if(response.data.data=="Successfull"){
            this.setState({isAddedtoWishlist:false})
            customToast.success("Product removed from wishlist!", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: true,
            })
              }
              else{
                customToast.error(response.data.errorMessage, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true,
                  });
            }
           
        });
        }
    
    componentDidMount(){
        // console.log(this.state);
    }


    toggleHover(name) {      
        switch (name) {
          case "isfavHovered":
            this.setState({
              isfavHovered: !this.state.isfavHovered,
            });
            break;
          case "isnotificationHovered":
            this.setState({
              isnotificationHovered: !this.state.isnotificationHovered,
            });
            break;
          
          default:
            break;
        }
      
    }
    
    render() {
        return (
          <React.Fragment>
            <div className="card cpCardlayout ">
                    <div className="cpimagediv" style={{cursor:"pointer"}} onClick={()=>{this.productDescription(this.state.proddata.id)}}>
                    {this.state.imagename != "" 
                                  ?
                                  <img className="cpimage " src={this.state.imageUrl + this.state.proddata.id + '/' + this.state.imagename }  alt="Card image cap"/>

                                :
                                <img className="cpimage" src={this.state.imageurl}  alt="Card image cap"/>

                                
                                }

                    <div className="cpyellowdiv">
                       <div className="descriptionbox">
                         {this.state.proddata.productDesc}
                        </div>
                        <div className="bold">
                          Explore More.
                        </div>
                    </div>
                    </div>
                 
                    <Row    className="cpdetails" style={{"cursor":"pointer"}} onClick={()=>{this.productDescription(this.state.proddata.id)}} >
                        <Col  className=" bold fontplay col-xs-8">
                          <div className="productname">{this.state.proddata.tag}</div> 
                        </Col>
                        <Col className="col-xs-4">
                          {this.state.proddata.productStatusId == 2 
                          ?
                          <Row    className="stockmargin">
                                <Col className="Available">
                                Available 
                                </Col>
                                <Col className="in_stock">
                                In Stock
                                </Col>
                                <Col className="text-center">
                          
                                <img className="logoincard " src={logos.artisianSelfLogo}  alt="Card image cap"/>

                                
                            
                                </Col>
                                
                                </Row>
                        
                        :
                        <Row    className="stockmargin exclusive">
                        <Col className="Exclusively">
                        Exclusively
                        </Col>
                        <Col className=" Made_to_order">
                        Made to order
                        </Col>
                        <Col className="text-center">
                        <img className="logoincard " src={logos.artisianSelfLogo}  alt="Card image cap"/>
                        </Col>
                        
                        </Row>
                        }
                         
                       
                            
                        </Col>
                        </Row>
                 
               
                 <div>
                       <hr className="cpline"></hr>
                     <Col style={{"paddingLeft":"0px"}} className = "col-xs-10">
                            <button className="generateEnquiry"
                             onClick={() => this.generateEnquiry(this.state.proddata.id)}
                            >
                            Generate enquiry
                         <a href={"/generateEnquiry"}>
                              <img className="cpwhitearrow" src={logos.whitearrow}></img></a>

                            </button>
                     </Col>

                     <Col  className="cpwishlist col-xs-2">
                       
                     {(this.state.isAddedtoWishlist )? ( 
                       
                  <img
                    onMouseEnter={() => this.toggleHover("isfavHovered")}
                    onMouseLeave={() => this.toggleHover("isfavHovered")}
                    className="navButtonImg2"
                    src={logos.heariconfilled}
                    onClick={() => this.handleRemovefromWishlist(this.state.proddata.id)}
                    // onClick={() => this.handleRemovefromWishlist(this.state.proddata.id)}
                  ></img>
                  
                ) : (
                  
                  <img
                    onMouseEnter={() => this.toggleHover("isfavHovered")}
                    onMouseLeave={() => this.toggleHover("isfavHovered")}
                    className="navButtonImg2"
                    src={logos.favoriteicon}
                    onClick={() => this.handleAddtoWishlist(this.state.proddata.id)}
                  ></img>
                )}
                  </Col>
                 </div>
                 {/* {console.log(this.state.proddata)} */}
                
                </div> 
                {this.state.modalIsOpen?
                  <HoldPopup    isOpen={this.state.modalIsOpen}/>
                :null}
              
                { this.state.generateEnquiry ?
               
                  <>
                     { this.state.generateEnquiry.ifExists== true ? 
                     
                     <Popup 
                         closeModal={this.closeModal}
                         EnquiryCode={this.state.ifEnquiryExists.code}
                         productName={this.state.generateEnquiry.productName}
                        productId={this.state.proddata.id}
                        isCustom={this.state.isCustom}
                     /> :
                          (
                      
                     <SuccessPopup 
                     EnquiryCode={this.state.generateEnquiry.code}
                     productName={this.state.generateEnquiry.productName}
                     productId={this.state.proddata.id}
                     />
  
                           ) } </>
               
                 
                  :
                null
                  }
                   </React.Fragment>
        )
    }
}

export default ProductsOfSearch
