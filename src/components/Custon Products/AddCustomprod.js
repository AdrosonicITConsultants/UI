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
class AddCustomprod extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            buyergetAllProducts:[],
            ImageUrl:TTCEapi.ImageUrl+'CustomProduct/',
            deleteAllProductsInbuyerCustom:[]
   
        };
        this.handleDeleteAllItem = this.handleDeleteAllItem.bind(this);
    }

    backoperation(){
        browserHistory.push("/home"); 
    }  
    handleDeleteAllItem(){
        if(window.confirm("Remove this item from wishlist?")){
            TTCEapi.deleteAllProductsInbuyerCustom().then((response)=>{
                this.setState({deleteAllProductsInbuyerCustom : response.data},()=>{
                    console.log(this.state.deleteAllProductsInbuyerCustom);
                    window.location.reload();
                });
            });
        }
      
    }
    componentDidMount(){
   
        TTCEapi.buyergetAllProducts().then((response)=>{
         this.setState({buyergetAllProducts : response.data.data},()=>{
             console.log(this.state.buyergetAllProducts);
          
             // console.log(this.props.user);
         });
     });
     }
    render() {
        return (
   
            <React.Fragment>
             
         
     
                  <NavbarComponent />
                  
                  {this.state.buyergetAllProducts.length==0?
              <Customprod />  :
               
                 <>
                  <body onload="window.location.reload()"></body>
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
                    <h1 > Your custom products</h1>
                     <Row noGutter={true}>
                         <Col md ="6" >
                  <p style={{float:"left"}} className="Totalitemsinwishlist" id="pageNumbers">Total Items:{this.state.buyergetAllProducts.length} </p> 
                         </Col>
                         <Col md ="6"  onClick={() => this.handleDeleteAllItem()}>
                             <p style={{float:"right"}}>
                             <button className="clearmywishlist"><img className="homeiconwishlist" src={logos.clearmywishlist}/>
                              <span className="spanhome">Clear my designs</span></button>

                             </p>
                         </Col>
                         <hr className="hrlineasd "></hr>
                     </Row>
                     {this.state.buyergetAllProducts ? ( ( this.state.buyergetAllProducts.map((data) => ( 
              <>
              
                    
               <div>
                    <Card className="wishlistcardbody">
                        <Row noGutters={true}>
                            <Col sm={12} className="srno">
                            <p></p>
                            </Col>
                        </Row>
                    <Row noGutters={true}>
                        
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
                     <Row noGutters={true}>
                            <Col sm={12} className="">
                           <h1 className="addedcustom">{data.productCategory.productDesc}/
                           <span style={{color:"grey"}}>  {data.weftDye? data.weftDye.dyeDesc:null} X <span></span>
                           {data.warpDye?
                            data.warpDye.dyeDesc:null} X <span></span>
                           {data.extraWeftDye? data.extraWeftDye.dyeDesc:null}</span></h1> 
                          
                            </Col>
                     </Row>
                     <Row  noGutters={true}> 
                         <Col sm={12}>
                             <p className="Descriptionitemp"  numberOfLines={1}  >{data.product_spec}
                           </p>
                         </Col>
                     </Row>
                     <Row  noGutters={true}>
                        
                         <Col sm={12} className="Wishlistpcode">
                     <span>Date created :</span> <span><b>
                     <Moment format="YYYY/MM/DD">
                            {data.createdOn}
                             </Moment>
                          </b></span>
                    
                         </Col>
                     </Row>
                       </Col> 
{/* Col 3 */}
                       <Col sm={3} className="Colfloatri">
                         <Row noGutters={true}>
                         <Col sm={12}  className="Editprodmodify">
                            View & modify product <img className="editimgicon" src={logos.Iconfeatheredit3}/>
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
                 
                     </>}
                     <Footer/>
                </React.Fragment>
              
        )
    }
}
export default AddCustomprod;