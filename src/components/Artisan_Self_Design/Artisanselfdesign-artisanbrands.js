import React, { Component } from 'react'
import logos from "../../assets";
import { Row, Col , Container, Button} from 'reactstrap';
import '../navbar/navbar.css';
import NavbarComponent from "../navbar/navbar";
import { connect } from "react-redux";
import * as Actions from "../../redux/action/action";
import './ArtisanselfDesign.css';
import TTCEapi from '../../services/API/TTCEapi';
import Footer from "../footer/footer";

 class ArtistSelfDesignBrands extends Component {
      constructor(props){
      super(props);
      this.state = {
        clicked : false,
        cluster :[],
        filterArtisian:[],
        visible:6,
        clusterid : -1,
      }
      this.loadMore = this.loadMore.bind(this);
    }
  
    loadMore() {
      this.setState((prev) => {
        return {visible: prev.visible + 6};
      });
    }
  
  
  
  
    // imageClick = () => {
    //   console.log('Click');
    //   this.setState({
    //     clicked: true
    //   })
    // }       

    handleCluster(e) {
      
      // console.log(e.target.id);
      var index = e.target.selectedIndex;
      var optionElement = e.target.childNodes[index];
      var option =  optionElement.getAttribute('clusterid');
      console.log(option);
      
      this.setState({ [e.target.name]: e.target.value,clusterid:option }, ()=> {
        console.log(this.state.clusterid);
        // console.log(this.state.clusterid);
        
      });
    }
    componentDidMount(){
   
      TTCEapi.getClusters().then((response)=>{
       this.setState({cluster : response.data.data},()=>{
           console.log(this.state.cluster);
      
           // console.log(this.props.user);
       });
   });
   TTCEapi.getFilteredArtisans().then((response)=>{
    this.setState({filterArtisian : response.data.data},()=>{
        console.log(this.state.filterArtisian);
   
        // console.log(this.props.user);
    });
});
   }
  
    render () {
      
      return (
        
        <React.Fragment>
          <Row noGutters="true">
         
            <Col sm={{size:"12"}}>
            <select  className="SelectCategory"  onChange={(e) => this.handleCluster(e)}>
           <option key = '0' clusterid = '-1' selected > All Cluster</option>
         {this.state.cluster.map((data) => <option key =  {data.id} clusterid={data.id} value={data.desc}>{data.desc}</option>)}
           
            </select>  
           </Col>
   
          </Row>

          
        {/* Row 1 */}
           <div class="row">
      {/* Card1 */}
      {this.state.filterArtisian ?

      
         ( ( this.state.filterArtisian.slice(0,this.state.visible).map((data) => (
      
        <div class="col-xs-12  col-sm-4 col-md-4 col-lg-4">
         
         <div className="card Cardlayout">
         <div class="card-block">
         <p class="card-text">{data.companyName ? <p>{data.companyName}</p>:<p>{data.firstName}</p>}</p>
         </div>
        
         {data.logo ? <img className="card-img-top-brand" src={data.logo}  alt="Logo"/>:
         data.profilePic ? <img className="card-img-top-brand" src={data.profilePic}  alt="Profile Img"/>  : 
         <img className="card-img-top-brand" src={logos.panda}  alt="Default Img"/>
         }
         
         <div class="effect-text">
             <div class="effect-btn">
               <h2>EXPLORE MORE</h2>
               <a class="btn" href="#"><i class="fa fa-angle-right fa-2x" aria-hidden="true"></i></a>
             </div>
           </div>
       </div> 
       </div>
    
    
   ))
   )): null
   }
        </div>
    
    {/* load more */}
    {this.state.visible < this.state.filterArtisian.length &&
 <Row noGutters="true" >
 <Col sm={{size:"5"}}>
 <hr className="hrlineasd "></hr>
 </Col>
 <Col sm={{size:"2"}} className="asdseemore">
 <input type="button" onClick={this.loadMore} value="See More" style={{"border":"none"}}></input>
 </Col>
 <Col sm={{size:"5"}}>
 <hr className="hrlineasd "></hr> </Col>
</Row>          }
       
        </React.Fragment>
      );
    }
  
  
  
    }
export default ArtistSelfDesignBrands;