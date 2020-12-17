import React, { Component } from 'react'
import logos from "../../assets";
import { Row, Col , Container, Button} from 'reactstrap';
import '../navbar/navbar.css';
import Footer from "../footer/footer";
import { Switch, Route, Router,Link } from "react-router-dom";
import PrivateRoute from "../../services/utils/PrivateRoute";
import { memoryHistory, browserHistory } from "../../helpers/history";
import TTCEapi from '../../services/API/TTCEapi';
import customToast from "../../shared/customToast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import HoldPopup from '../ModalComponent/ModalHold';
import Popup from '../ModalComponent/EnguiryModal';
import SuccessPopup from '../ModalComponent/SuccessModal';
export class ProductsOfSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
            proddata : this.props.productData,
            imagename :this.props.productData.images ? this.props.productData.images.split(",")[0] : "abc.jpg",
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
            enqgen:false,
        };
        this.handleAddtoWishlist = this.handleAddtoWishlist.bind(this);
    this.generateEnquiry = this.generateEnquiry.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    closeModal() {
      this.setState({ modalIsOpen: false });
    }
    handleAddtoWishlist(id){
      TTCEapi.addToWishlist(id).then((response)=>{
        if(response){ 
        if (response.data.valid) {
          customToast.success("Product added to wishlist!", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: true,
          });
          this.setState({isAddedtoWishlist : response.data.valid},()=>{
     
          });
        }
        else{
            customToast.error(response.data.errorMessage, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: true,
              });
        }
      }
      else{
        browserHistory.push("/404error");
      }
      });
  }

generateEnquiry(item){
  this.setState({ modalIsOpen: true });
    TTCEapi.ifEnquiryExists(item,false).then((response)=>{
      if(response){ 
  this.setState({ifEnquiryExists : response.data.data},()=>{
    if(this.state.ifEnquiryExists.ifExists ==false){
        TTCEapi.generateEnquiry(item,false).then((response)=>{
          if(response){ 
          this.setState({generateEnquiry : response.data.data,modalIsOpen: false,enqgen:true },()=>{
                        });
                      }
                      else{
                        browserHistory.push("/404error");
                      }
        });
      }
  });
}
else{
  browserHistory.push("/404error");
}
  
});

}
    productDescription(id){
      browserHistory.push("/Product-Details?productId=" + id); 

    }
    handleRemovefromWishlist(id){
      TTCEapi.deleteProductsInWishlist(id).then((response)=>{
        if(response){ 
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
          }
          else{
            browserHistory.push("/404error");
          }
           
        });
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
                          {this.state.proddata.status == 2 
                          ?
                          <Row    className="stockmargin">
                                <Col className="Available">
                                Available 
                                </Col>
                                <Col className="in_stock">
                                In Stock
                                </Col>
                                <Col className="text-center">
                          
                                <img className="logoincard " src={this.state.proddata.madeWithAnthran == 0 ? logos.artisianSelfLogo : logos.antaranCoDesignLogo}  alt="Card image cap"/>

                                
                            
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
                        <img className="logoincard " src={this.state.proddata.madeWithAnthran == 0 ? logos.artisianSelfLogo : logos.antaranCoDesignLogo}  alt="Card image cap"/>
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
            
                </div> 
                {this.state.modalIsOpen?
                  <HoldPopup    isOpen={this.state.modalIsOpen}/>
                :null}
              
                { this.state.ifEnquiryExists ?
               
                  <>
                     { this.state.ifEnquiryExists.ifExists== true ? 
                     
                     <Popup 
                         closeModal={this.closeModal}
                         EnquiryCode={this.state.ifEnquiryExists.code}
                         productName={this.state.ifEnquiryExists.productName}
                        productId={this.state.proddata.id}
                        isCustom={this.state.isCustom}
                        enquiryId={this.state.ifEnquiryExists.enquiryId}
                     /> :
                          (
                            this.state.enqgen ? 
                     <SuccessPopup 
                     EnquiryCode={this.state.generateEnquiry.enquiry.code}
                     productName={this.state.generateEnquiry.productName}
                     productId={this.state.proddata.id}
                     enquiryId={this.state.generateEnquiry.enquiry.id}
                     />
                     : null
                           ) } </>
               
                 
                  :
                null
                  }
                   </React.Fragment>
        )
    }
}

export default ProductsOfSearch
