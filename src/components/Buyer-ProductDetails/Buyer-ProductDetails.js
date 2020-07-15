import React, { Component } from 'react'
import logos from "../../assets";
import { Row, Col , Container, Button} from 'reactstrap';
import '../navbar/navbar.css';
import NavbarComponent from "../navbar/navbar";
import { connect } from "react-redux";
import TTCEapi from '../../services/API/TTCEapi';
import * as Actions from "../../redux/action/action";
import './Buyer-ProductDetails.css';
import Footer from "../footer/footer";
import { memoryHistory, browserHistory } from "../../helpers/history";
import BPCarousel from './Buyers-Productcarousel';
import queryString from 'query-string';
import SeeMoreProduct from './Seemoreproduct';
class BuyersProductDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isfavHovered :false,
      ProductData : [],
      getProductCategoryAndClusterProducts:[],
      value : false,
      filterArtisian:[],
      clicked: true  ,
      logo:this.props.logo,
      profilePic:this.props.profilePic,
      logoUrl:[],
      profilePicUrl:TTCEapi.ImageUrl+'User/'+this.props.artisanId+'/ProfilePics/'+this.props.profilePic,
      defaultimgUrl:logos.Smile,             
      visible:5,
      Artisiandata:[],
      getProductIdsInWishlist:[],
      isAddedtoWishlist:false,
      addToWishlist:null,
      deleteProductsInWishlist:[]
    };
    this.handleAddtoWishlist = this.handleAddtoWishlist.bind(this);
    }
    handleAddtoWishlist(id){
      TTCEapi.addToWishlist(id).then((response)=>{
        
          this.setState({isAddedtoWishlist : response.data.valid,clicked: !this.state.clicked},()=>{
              console.log(this.state.isAddedtoWishlist);
       
          });
      });
  }
  handleRemovefromWishlist(id){
    TTCEapi.deleteProductsInWishlist(id).then((response)=>{
        console.log(response);   
        if(response.data.data=="Successfull"){
          this.setState({isAddedtoWishlist:false})
        }
             
  
  });
  }
  componentDidMount(){
    let params = queryString.parse(this.props.location.search);
     
    TTCEapi.getProduct(parseInt(params.productId)).then((response)=>{
      this.setState({ProductData :response.data.data},()=>{
      console.log(this.state.ProductData);

      
                  TTCEapi.getArtisianProducts(this.state.ProductData.artitionId).then((response)=>{
                    this.setState({Artisiandata:response.data.data.artisanDetails,dataload : true},()=>{
                      console.log(this.state)
                    })
                    
                  })
                  TTCEapi.getProductCategoryAndClusterProducts(this.state.ProductData.productType.productCategoryId,this.state.ProductData.clusterId,this.state.ProductData.productImages[0].productId).then((response)=>{
                   
                 this.setState({getProductCategoryAndClusterProducts : response.data.data.products},()=>{
                        console.log(this.state.getProductCategoryAndClusterProducts);
                        

                        // console.log(this.props.user);
                    });
                  });
                  
                  TTCEapi.getProductIdsInWishlist().then((response)=>{
                    var item=this.state.getProductIdsInWishlist
                    this.setState({getProductIdsInWishlist : response.data.data},()=>{
                        console.log(this.state.getProductIdsInWishlist);
                        console.log(this.state.ProductData.id);
                        if(this.state.getProductIdsInWishlist){
                          if(this.state.getProductIdsInWishlist.indexOf(this.state.ProductData.id)!=-1)
                          // {console.log(this.state.getProductIdsInWishlist.id!=-1)}
                          {
                            this.setState({
                              isAddedtoWishlist:true,
                              
                            })
                          }
                         }
                    
                        // console.log(this.state.getProductIdsInWishlist.indexOf(12))
                  
                    });
                  });
  });
});
    
  // console.log(this.state.productIdsInWishlist.indexOf(this.state.getProductIdsInWishlist.id)!=-1);
  
  TTCEapi.getFilteredArtisans().then((response)=>{
    this.setState({filterArtisian : response.data.data},()=>{
        console.log(this.state.filterArtisian);
        this.state.filterArtisian.map((data)=>{
          this.setState({logoUrl:TTCEapi.ImageUrl+'User/'+data.artisanId+'/CompanyDetails/Logo/'+data.logo})
          // logoUrl:TTCEapi.ImageUrl+'User/'+this.state.ProductData.artitionId+'/CompanyDetails/Logo/'+this.state.filterArtisian.logo,
                    
        })
        // console.log(this.props.user);
    });
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
               {this.state.dataload == true 
                   
                   ? 
                   <>
              <NavbarComponent/>
            
             <Container>
<Row noGutters="true" id="#Top">
  <Col md={6} lg={6}sm={12} xs={12} style={{marginTop:"27px"}}>
{/* 
{this.state.ProductData.productImages ?this.state.ProductData.productImages.map((data)=>
{
  return(
  <BPCarousel
    
  Image={data}
   />
  )
}):null
} */}
   

    <BPCarousel
  Image={this.state.ProductData.productImages?this.state.ProductData.productImages:null}
    />
  </Col>
  <Col  md={6} lg={6}sm={12} xs={12} className="BPDCol2">
  {this.state.ProductData.tag ?   <h1>{this.state.ProductData.tag}</h1>:null}
  {this.state.ProductData.productCategory ?  <h1>{this.state.ProductData.productCategory.productDesc}</h1> :null}
  
  {this.state.ProductData.product_spe ?
<p>{this.state.ProductData.product_spe}</p>
    :null}
     {this.state.ProductData.madeWithAnthran==0?
     <Row noGutters="true">
     <Col sm={2}>  <img className="BPDAntaranlogo" src={logos.artisianSelfLogo}  alt="Card image cap"/></Col>
     <Col sm={10} className="BPDBrandname">Artisian Co-Design Collection</Col>
     <hr className="hrlineBPD "></hr>
   </Row>
     :
     <Row noGutters="true">
     <Col sm={2}>  <img className="BPDAntaranlogo" src={logos.AntaranCodesignIcon}  alt="Card image cap"/></Col>
     <Col sm={10} className="BPDBrandname">Antaran Co-Design Collection</Col>
     <hr className="hrlineBPD "></hr>
   </Row>
     }
  
    
   <Row noGutters="true" >
      <Col sm={12} className="BPDartisianame">
        Artisan Brand : 
        {this.state.ProductData.brand ? <span className="brandcolor">
          {this.state.ProductData.brand}</span>: this.state.ProductData.artistName}
         
      </Col>
    </Row>
    <Row noGutters="true">
  
    <Col sm={3} className="BPDartisianame">
  {this.state.Artisiandata[0].logo==null?
  <>
  {this.state.Artisiandata[0].profilePic==null?
             <>
             <img className="Logobpdimg" src={logos.Smile}/>
             </> 
      :
            <>
            <img className="Logobpdimg" src={TTCEapi.ImageUrl+'User/'+this.state.Artisiandata[0].artisanId+'/ProfilePics/'+this.state.Artisiandata[0].profilePic}/>
          </>  
  }         
  </>
    :
   <>
               <img className="Logobpdimg" src={TTCEapi.ImageUrl+'User/'+this.state.Artisiandata[0].artisanId+'/CompanyDetails/Logo/'+this.state.Artisiandata[0].logo}/>

   </>

} 
 
  </Col>
 
   </Row>
   <hr className="hrlineBPD "></hr>
   

  
 
  


    <Row noGutters="true">
     <Col sm={12} className="BDPdetailscol">
     <p >Region of origin :
     {this.state.ProductData.clusterName ? 
     <span>{this.state.ProductData.clusterName}</span>
     :null}
      </p>
     <p>Material Used :<span> {this.state.ProductData.warpDye?this.state.ProductData.warpDye.dyeDesc:null},
    
{this.state.ProductData.weftDye?this.state.ProductData.weftDye.dyeDesc:null},
    
{this.state.ProductData.extraWeftDye?this.state.ProductData.extraWeftDye.dyeDesc:null}</span></p>
               <p>Product Category :
               {this.state.ProductData.productCategory?
                 <span>{this.state.ProductData.productCategory.productDesc}</span>
                :null}
               </p>
               <p>Weight :
               {this.state.ProductData.weight ?
                <span> {this.state.ProductData.weight}g</span>
                :null
               }
                </p>
     </Col>
     <p className="BPDSeemorelink">
     <a href="#productdetail">See all product details</a>
     <hr className="hrlineBPD "></hr>
     </p>
   
   </Row>
   <Row noGutters="true">
     {this.state.ProductData.productStatusId=="2" ?
      <Col sm={12} className="BPDStockstatus">
    Available <b>In Stock</b>
     </Col> :
     <Col sm={12} className="BPDStockstatus" >
      <b style={{color:"purple"}}>Exclusively </b>made to order
      </Col>
     }
     
      </Row>

      <Row noGutters="true">
     <Col sm={6} >
     <div class="buttons">
  <button class="bpdbutton -bg-yellow">
    <span>Generate Enquiry</span>
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
     <Col sm={6} >
    
 
    {(this.state.isAddedtoWishlist )? ( 
       <div class="buttons">
                       <button  onClick={() => this.handleRemovefromWishlist(this.state.ProductData.id)}>
                         <span>{!this.state.isAddedtoWishlist? 'Add to Wishlist' : 'Wishlisted'}</span>
                           <span  className="onclickwish">
                           <img
                         onMouseEnter={() => this.toggleHover("isfavHovered")}
                         onMouseLeave={() => this.toggleHover("isfavHovered")}
                         className="navButtonImg21"
                         src={logos.heariconfilled}
                        
                        
                       ></img>
                              </span>
                       </button>
                      </div>
                       
                     ) : (
                      <div class="buttons">
                      <button  onClick={() => this.handleAddtoWishlist(this.state.ProductData.id)}>
                      <span>{!this.state.isAddedtoWishlist? 'Add to Wishlist' : 'Wishlisted'}</span>
                        <span  className="onclickwish">
                        <img
                      onMouseEnter={() => this.toggleHover("isfavHovered")}
                      onMouseLeave={() => this.toggleHover("isfavHovered")}
                      className="navButtonImg21"
                      src={logos.favoriteicon}
                     
                     
                    ></img>
                           </span>
                    </button>
                       </div>
                     )}
     
 
  


    

     </Col>
      </Row>

<Row noGutters="true">
  <Col xs={12} className="">
   <p style={{marginLeft:"15px", marginTop:"10px"}} id="productdetail">Product Code : {this.state.ProductData.code ?this.state.ProductData.code:null}</p> 
  </Col>
</Row>
</Col>
</Row>


<Row noGutters="true">
  <Col sm={12}>
  <h2 className="Productdetailsh2" id="productdetail">Product Details</h2>
  <hr className="hrproductBPD "></hr>
  </Col>
</Row>


<Row noGutters="true" >
  <Col sm={12} className="BPDCol2">
  <h2 className="DescheadingBPD">Description</h2>
  {this.state.ProductData.product_spe ?
<p>{this.state.ProductData.product_spe}</p>
    :null}
  </Col>
  <hr className="hrlineBPD "></hr>
</Row>

<Row noGutters="true">
  <h2 className="DescheadingBPD" style={{marginLeft:"10px" , fontFamily:"auto"}}>General Details</h2>
  <Col sm={4} >
    <h3 className="GeneralDetailsh3">Name of Product</h3>
    <p className="GeneralDetailsp">{this.state.ProductData.tag?this.state.ProductData.tag:null}</p>
  </Col>
  <Col sm={4}>
  <h3 className="GeneralDetailsh3">Product Category</h3>
    <p className="GeneralDetailsp">{this.state.ProductData.productCategory?this.state.ProductData.productCategory.productDesc:null}</p>
  </Col>
  <Col sm={4}>
  <h3 className="GeneralDetailsh3">Region</h3>
 <p className="GeneralDetailsp" style={{color:"#23527c"}}>{this.state.ProductData.clusterName?this.state.ProductData.clusterName:null}</p>
  </Col>
</Row>
<Row noGutters="true">
    <Col sm={4} >
    <h3 className="GeneralDetailsh3">Product Code</h3>
    <p className="GeneralDetailsp">{this.state.ProductData.code?this.state.ProductData.code:null}</p>
  </Col>
  <Col sm={4}>
  <h3 className="GeneralDetailsh3">Product Type</h3>
    <p className="GeneralDetailsp">{this.state.ProductData.productType?this.state.ProductData.productType.productDesc:null}</p>
  </Col>
  <Col sm={4}>
  <h3 className="GeneralDetailsh3">Artisan Brand</h3>
    <p className="GeneralDetailsp" style={{color:"#23527c"}}>{this.state.ProductData.brand?this.state.ProductData.brand:null}</p>
   
  </Col>
  <hr className="hrlineBPD "></hr>
</Row>
{/* -----------------------specification--------------------- */}
<Row noGutters="true" >
  <h2 className="DescheadingBPD" style={{marginLeft:"10px" , fontFamily:"auto"}}>Specifications</h2>
  <Col sm={4} className="">
    <h3 className="GeneralDetailsh3">Weave types used</h3>
    <p className="GeneralDetailsp">Weft Ikat</p>
    <p className="GeneralDetailsp">Loinloom Weaving</p>
    <p className="GeneralDetailsp">Extra weft by Jacquard</p>
    <p className="GeneralDetailsp">Plain weave</p>
  </Col>
  <Col sm={2} className="BPDmarginright">
  <h3 className="GeneralDetailsh3 text-center" >Weave used</h3>
    <p className="GeneralDetailsp text-center"> <img
                                         className=" weaveimgheight"
                                         src={logos.warpicon}
                                       ></img></p><br/>
    <p className="GeneralDetailsp text-center"> <img
                                         className=" weaveimgheight "
                                         src={logos.wefticon}
                                       ></img></p><br/>
    <p className="GeneralDetailsp text-center"> <img
                                         className=" weaveimgheight"
                                         src={logos.extraWefticon}
                                       ></img></p>
  </Col>
  <Col sm={2} className="BPDmarginright">
  <h3 className="GeneralDetailsh3 text-center">Yarn</h3>
    <p className="GeneralDetailsp text-center bpdmgbt" >{this.state.ProductData.warpYarnCount?this.state.ProductData.warpYarnCount:null}</p>
    <p className="GeneralDetailsp text-center bpdmgbt" >{this.state.ProductData.weftYarnCount?this.state.ProductData.weftYarnCount:null}</p>
    <p className="GeneralDetailsp text-center bpdmgbt" >{this.state.ProductData.extraWeftYarnCount?this.state.ProductData.extraWeftYarnCount:null}</p>
  </Col>
  <Col sm={2} className="BPDmarginright">
    <h3 className="GeneralDetailsh3 text-center">Yarn Count</h3>
               <p className="GeneralDetailsp text-center bpdmgbt" >{this.state.ProductData.warpYarnCount?this.state.ProductData.warpYarnCount:null}</p>
               <p className="GeneralDetailsp text-center bpdmgbt" >{this.state.ProductData.weftYarnCount?this.state.ProductData.weftYarnCount:null}</p>
               <p className="GeneralDetailsp text-center bpdmgbt" >{this.state.ProductData.extraWeftYarnCount?this.state.ProductData.extraWeftYarnCount:null}</p>
  </Col>
  <Col sm={2} className="" >
    <h3 className="GeneralDetailsh3 text-center">Dye used</h3>
               <p className="GeneralDetailsp text-center bpdmgbt" >{this.state.ProductData.warpDye?this.state.ProductData.warpDye.dyeDesc:null}</p>
    <p className="GeneralDetailsp text-center bpdmgbt" >{this.state.ProductData.weftDye?this.state.ProductData.weftDye.dyeDesc:null}</p>
    <p className="GeneralDetailsp text-center bpdmgbt" >{this.state.ProductData.extraWeftDye?this.state.ProductData.extraWeftDye.dyeDesc:null}</p>
  </Col>
</Row>

<Row noGutters="true" style={{marginTop:"86px"}}>
  <Col xs={12} md={3} className="BPDmarginright" style={{textAlign:"center"}}>
  <img src={logos.reedcount} className="specificationicon"/>
  <h3 className="GeneralDetailsh3 text-center" style={{color:"black"}}>Reed Count</h3>
               <p>{this.state.ProductData.reedCount?this.state.ProductData.reedCount.count:null}</p>
  </Col>
  <Col xs={12} md={3} className="BPDmarginright BDPdetailscol" style={{textAlign:"center"}}>
  <img src={logos.weight} className="specificationicon"/>
  <h3 className="GeneralDetailsh3 text-center" style={{color:"black"}}>Weight</h3>
               <p>{this.state.ProductData.productCategory?this.state.ProductData.productCategory.productDesc:null} <span  style={{marginLeft:"22px"}}>{this.state.ProductData.weight}</span></p>
               {this.state.ProductData.productCategory ? <hr className="hrspecBPD "></hr>:null} 
               {this.state.ProductData.relProduct[0] ?
               <p style={{marginTop:"-10px"}}>{this.state.ProductData.relProduct[0].productTypeDesc} <span  style={{marginLeft:"22px" , marginTop:"-10px"}}>{this.state.ProductData.weight}</span></p>
  
               :null} 
 
 </Col>
  <Col xs={12} md={3} className="BPDmarginright"style={{textAlign:"center"}}>
  <img src={logos.dimensions} className="specificationicon"/>
  <h3 className="GeneralDetailsh3 text-center" style={{color:"black"}}>Dimensions L x W</h3>
  <p>{this.state.ProductData.productCategory?this.state.ProductData.productCategory.productDesc:null} <span  style={{marginLeft:"22px"}}>
    {this.state.ProductData.relProduct[0] ? this.state.ProductData.relProduct[0].length:null} x {this.state.ProductData.relProduct[0]?this.state.ProductData.relProduct[0].width:null}
    </span></p>
    {this.state.ProductData.relProduct[0] ? 
    <hr className="hrspecBPD "></hr>:null}

{this.state.ProductData.relProduct[0] ? 

 <p style={{marginTop:"-10px"}}>
   {this.state.ProductData.relProduct?this.state.ProductData.relProduct[0].productTypeDesc:null}
   <span  style={{marginLeft:"22px" , marginTop:"-10px"}}>{this.state.ProductData.relProduct?this.state.ProductData.relProduct[0].length:null} x {this.state.ProductData.relProduct?this.state.ProductData.relProduct[0].width:null}</span>
   </p>
:null}
 
  </Col>
  {this.state.ProductData.gsm=="false"? 
   null
  :<Col xs={12} md={3} className=""style={{textAlign:"center"}}>
  <img src={logos.GsmIcon} className="specificationicon"/>
  <h3 className="GeneralDetailsh3 text-center" style={{color:"black"}}>GSM (Gram per square meter)</h3>
               <p>Fabric:{this.state.ProductData.gsm} gsm</p>
  
  </Col>}
 
  
</Row>
<hr className="hrlineBPD "></hr>
{/* -----------------Washcareinst--------------------- */}
<Row noGutters="true">
<h2 className="DescheadingBPD" style={{marginLeft:"10px" , fontFamily:"auto"}}>Wash and Care Instructions</h2>
          <Col sm={1}></Col>
            <Col sm={2} style={{textAlign:"center"}}>
            <img
                                         className="unselectedWareandCare"
                                         src={logos.washAndCare1}
                                       ></img>
                                       <p
                                         className="BDPWashcare"
                                       >
                                         Gentle Hand Wash with soft liquid
                                         detergent
                                       </p>
            </Col>
            <Col sm={2} style={{textAlign:"center"}}>
            <img
                                         className="unselectedWareandCare"
                                         src={logos.washAndCare2}
                                       ></img>
                                       <p
                                         className="BDPWashcare">
                                         Machine wash with cold water
                                       </p>
            </Col>
            <Col sm={2} style={{textAlign:"center"}}>
            <img
                                         className="unselectedWareandCare"
                                         src={logos.washAndCare3}
                                       ></img>
                                       <p
                                         className="BDPWashcare"
                                       >
                                         Do not bleach
                                       </p>
            </Col>
            <Col sm={2} style={{textAlign:"center"}}>
            <img
                                         className="unselectedWareandCare"
                                         src={logos.washAndCare4}
                                       ></img>
                                       <p
                                         className="BDPWashcare"
                                       >
                                         Machine wash with 40 Degree water level
                                       </p>
            </Col>
            <Col sm={2} style={{textAlign:"center"}}>
            <img
                                         className="unselectedWareandCare"
                                         src={logos.washAndCare5}
                                       ></img>
                                       <p
                                         className="BDPWashcare"
                                       >
                                         Dry Clean Only
                                       </p>
            </Col>
            <Col sm={1}></Col>
            </Row>  
            {/* ------------------like it ------------------ */}
         

            <Row noGutters="true" className="likeitbg text-center">
            <h3>Like it ?</h3>
               <Row noGutters="true">
                 <Col xs={12}>
                 <div class="buttons" style={{ color:"black" , border:"none", marginBottom:"10px"}} >
  <button class="bpdbutton -bg-white" style={{width:"198px" , color:"black"}}>
    <span style={{ color:"black"}}>Generate Enquiry</span>
        <div class="arrowPacman">
      <div class="arrowPacman-clip">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.10081 0L5.88245 1.23617L10.7016 6.12576H0V7.87423H10.7016L5.88245 12.7638L7.10081 14L14 7L7.10081 0Z" fill="black"/>
        </svg>
        
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.10081 0L5.88245 1.23617L10.7016 6.12576H0V7.87423H10.7016L5.88245 12.7638L7.10081 14L14 7L7.10081 0Z" fill="black"/>
        </svg>
      </div>
    </div>
  </button>

</div>               </Col>
               </Row>
                  
               
           
            </Row>
{/* -------------------More saree--------------------------- */}

<Row noGutters={true}>
  <Col sm={12}>
    <h3 className="MoresareeBPD">More Sarees From {this.state.ProductData.clusterName}</h3>
  </Col>
</Row>

<Row noGutter={true} >

<div className="col-sm-1 "></div>
{console.log(this.state.getProductCategoryAndClusterProducts)}
 {this.state.getProductCategoryAndClusterProducts.length > 0 ?
  this.state.getProductCategoryAndClusterProducts.map((data) => {
    return(
    <>
   
    <Col md={2} xs={12} sm={2} >
      <SeeMoreProduct
     product={data}
      />
  </Col>
  
   </>)
   }):null
  
  }
</Row>













                        
<Row noGutters="true">
  <Col xs={12}  className="backtotopbdp">
  <a href="#Top">Go back to Top <i class="fa fa-angle-up fa-lg" aria-hidden="true"></i></a>
  <hr className="hrlineBPD "></hr>
  </Col>
  
</Row>
<Row noGutters={true}>
                  <div className="artistbg2" style={{marginBottom:"-152px"}}></div>
                </Row>
                <Row noGutters={true} className="mt160">
                  <Col
                    sm={{ size: "4" }}
                    xs={{ size: "4" }}
                    md={{ size: "4" }}
                    className="col-4 text-center"
                  ></Col>
                  <Col
                    sm={{ size: "4" }}
                    md={{ size: "4" }}
                    xs={{ size: "4" }}
                    className="artistbg3 col-4 text-center"
                  ></Col>

                  <Col
                    sm={{ size: "4" }}
                    md={{ size: "4" }}
                    xs={{ size: "4" }}
                    className="col-4 text-center"
                  ></Col>
                </Row>
</Container>
<Footer></Footer>
</>:
<> </>}
           </React.Fragment>)
    }
}

export default BuyersProductDetails;