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
import Modal from "react-modal";
import AlertRemoveItem from './AlertRemoveItem';


class AddWishlist extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            getProductsInWishlist:[],
            ImageUrl:TTCEapi.ImageUrl+'Product/',
            deleteProductsInWishlist:[],
            pageLoad:false,
            modalIsOpen: false,
   
        };
        this.handleDeleteItem = this.handleDeleteItem.bind(this);   
     this.handleDeleteAllItem = this.handleDeleteAllItem.bind(this);
     this.openModal = this.openModal.bind(this);
   
    }

    backoperation(){
        browserHistory.push("/home"); 
    }  
    openModal() {
        this.setState({ modalIsOpen: true });
      }
    
      cancelItem() {
        browserHistory.push("/wishlist");
      }
      closeModal() {
        this.setState({ modalIsOpen: false });
      }
    productopen(id){
        browserHistory.push("/Product-Details?productId=" + id);
        window.location.reload();
    }
    handleDeleteItem(item){
        // this.setState({ modalIsOpen: true });
        // if(window.confirm("Remove this item from wishlist?")){
        TTCEapi.deleteProductsInWishlist(this.state.getProductsInWishlist[0].product.id).then((response)=>{
            this.setState({deleteProductsInWishlist : response.data},()=>{
                console.log(this.state.deleteProductsInWishlist);
                window.location.reload();
            
         
            });
        
        });
    // }
      
    }

    handleDeleteAllItem(){
        if(window.confirm("Remove this item from wishlist?")){
            
            TTCEapi.deleteAllProductsInWishlist().then((response)=>{
                this.setState({deleteAllProductsInWishlist : response.data},()=>{
                    console.log(this.state.deleteAllProductsInWishlist);
                    window.location.reload();
                });
            });
        }
      
    }

      componentDidMount(){
   
     TTCEapi.getProductsInWishlist().then((response)=>{
      this.setState({getProductsInWishlist : response.data.data},()=>{
          console.log(this.state.getProductsInWishlist);
         
         
          // console.log(this.props.user);
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
                  <body onload="window.location.reload()"></body>
                <Container className="wishlistbg">
              <Row noGutters={true}>
          
              
              <Col md = "1">
                        <img
                                    src={logos.backarrowicon}
                                    className="margin-cparrow cparrowsize glyphicon"
                                    //  onClick={() => this.backoperation()}
                                    //  onClick={() => this.props.history.go(-1)}
                                ></img>
                       
                       </Col>
                <Col md='10'className="addedwishlist">
                    <h1 > Your Wish list</h1>
                     <Row noGutter={true}>
                         <Col md ="6" >
                  <p style={{float:"left"}} className="Totalitemsinwishlist" id="pageNumbers">Total Items: {this.state.getProductsInWishlist.length}</p> 
                         </Col>
                         <Col md ="6"  onClick={() => this.openModal()} >
                             <p style={{float:"right"}}>
                             <button className="clearmywishlist"><img className="homeiconwishlist" src={logos.clearmywishlist}/>
                              <span className="spanhome">Clear my wishlist</span></button>

                             </p>
                         </Col>
                         <hr className="hrlineasd "></hr>
                     </Row>
            
                     {this.state.getProductsInWishlist ? ( ( this.state.getProductsInWishlist.map((data) => ( 
              <>
      
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
                                {data.product.madeWithAnthran==0? 
                                <img className="wishlistitembrand" src={logos.artisianSelfLogo}/>
                                :
                                <img className="wishlistitembrand" src={logos.antaranCoDesignLogo}/>
                                }
                           

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
                         <Col sm={12}  className="Removefromwishlist" onClick={() => this.openModal()}>
                            Remove from wish list <img src={logos.removefromwishlist}/>
                            </Col>
                             </Row>  
                        <Row noGutters={true}>
                            <Col sm={12} >
                            <div class="buttons">
                        <button class="bpdbutton -bg-yellow" style={{marginTop:"10px",height:"43px",width:"195px"}} >
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