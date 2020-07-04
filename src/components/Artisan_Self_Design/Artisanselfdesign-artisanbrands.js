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
import ArtisanCard from './ArtisanCard';

 class ArtistSelfDesignBrands extends Component {
      constructor(props){
      super(props);
      this.state = {
        clicked : false,
        cluster :[],
        filterArtisian:[],
        visible:3,
        clusterid : -1,
      }
      this.loadMore = this.loadMore.bind(this);
    }
  
    loadMore() {
      this.setState((prev) => {
        return {visible: prev.visible + 3};
      });
    }
  
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
<<<<<<< HEAD
          <Row noGutters="true">
            <Col sm={{size:"12"}}>
            <select  className="SelectCategory" >
                <option value="1" selected disabled>All Cluster</option>
                <option value="2" >Maniabandhan</option>
                <option value="3">Gopalpur</option>
                <option value="4">Kamrup</option>
                <option value="5">Nalbari</option>
          </select>
  
  
        </Col>
          </Row>
        {/* Row 1 */}
           <div class="row">
      {/* Card1 */}
    <div class="col-xs-12  col-sm-4 col-md-4 col-lg-4">
      <div className="card Cardlayout">
      <div class="card-block">
        <p class="card-text">Boat</p>
      </div>
      <img className="card-img-top-brand" src={logos.Boat}  alt="Card image cap"/>
      <div class="effect-text">
          <div class="effect-btn">
            <h2>EXPLORE MORE</h2>
            <a class="btn" href="#"><i class="fa fa-angle-right fa-2x" aria-hidden="true"></i></a>
          </div>
        </div>
    </div>
    </div>
  {/* Card2 */}
    <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
      <div className="card Cardlayout">
      <div class="card-block">
        <p class="card-text">Rose</p>
      </div>
      <img className="card-img-top-brand" src={logos.Flower}  alt="Card image cap"/>
      <div class="effect-text">
          <div class="effect-btn">
            <h2>EXPLORE MORE</h2>
            <a class="btn" href="#"><i class="fa fa-angle-right fa-2x" aria-hidden="true"></i></a>
          </div>
        </div>
    </div>
    </div>
  {/* Card3 */}
  <div class="col-xs-12  col-sm-4 col-md-4 col-lg-4">
      <div className="card Cardlayout">
      <div class="card-block">
        <p class="card-text">Sun</p>
      </div>
      <img className="card-img-top-brand" src={logos.Sun}  alt="Card image cap"/>
      <div class="effect-text">
          <div class="effect-btn">
            <h2>EXPLORE MORE</h2>
            <a class="btn" href="#"><i class="fa fa-angle-right fa-2x" aria-hidden="true"></i></a>
          </div>
        </div>
    </div>
    </div>
    </div>
    {/* Row 2 */}
    <div class="row rowmargintop">
          {/* Card1 */}
        <div class="col-xs-12  col-sm-4 col-md-4 col-lg-4 mt-5">
          <div className="card Cardlayout">
          <div class="card-block">
            <p class="card-text">Smile</p>
          </div>
          <img className="card-img-top-brand" src={logos.Smile}  alt="Card image cap"/>
          <div class="effect-text">
          <div class="effect-btn">
            <h2>EXPLORE MORE</h2>
            <a class="btn" href="#"><i class="fa fa-angle-right fa-2x" aria-hidden="true"></i></a>
          </div>
        </div>
        </div>
        </div>
      {/* Card2 */}
        <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
          <div className="card Cardlayout">
          <div class="card-block">
            <p class="card-text">Sunshine</p>
          </div>
          <img className="card-img-top-brand" src={logos.Sun2}  alt="Card image cap"/>
          <div class="effect-text">
          <div class="effect-btn">
            <h2>EXPLORE MORE</h2>
            <a class="btn" href="#"><i class="fa fa-angle-right fa-2x" aria-hidden="true"></i></a>
          </div>
        </div>
        </div>
        </div>
      {/* Card3 */}
      <div class="col-xs-12  col-sm-4 col-md-4 col-lg-4">
          <div className="card Cardlayout">
          <div class="card-block">
            <p class="card-text">Panda</p>
          </div>
          <img className="card-img-top-brand" src={logos.Panda}  alt="Card image cap"/>
          <div class="effect-text">
          <div class="effect-btn">
            <h2>EXPLORE MORE</h2>
            <a class="btn" href="#"><i class="fa fa-angle-right fa-2x" aria-hidden="true"></i></a>
          </div>
        </div>
        </div>
        </div>
        </div>
=======
       <Row noGutters="true">
         
         <Col sm={{size:"12"}}>
         <select  className="SelectCategory"  onChange={(e) => this.handleCluster(e)}>
        <option key = '0' clusterid = '-1' selected > All Cluster</option>
      {this.state.cluster.map((data) => <option key =  {data.id} clusterid={data.id} value={data.desc}>{data.desc}</option>)}
        
         </select>  
        </Col>

       </Row>

    {this.state.cluster ?
this.state.filterArtisian.slice(0,this.state.visible).map((data,index) => {
  {console.log(data)}
  if (this.state.clusterid==data.clusterId)
  return (
    <ArtisanCard
    key={index}
    companyName={data.companyName}
    firstName={data.firstName}
    logo={data.logo}
    profilePic={data.profilePic}
    />
  );
 })

:null}
{this.state.cluster? this.state.filterArtisian.slice(0,this.state.visible).map((data,index) => {
 if(this.state.clusterid==-1)
 return(
    <ArtisanCard
    key={index}
    companyName={data.companyName}
    firstName={data.firstName}
    logo={data.firstName}
    profilePic={data.profilePic}
    />
 )
}):null
}
  
>>>>>>> eb93b95a86d05fd4c33ba018259ae0a5460ad44d
    
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