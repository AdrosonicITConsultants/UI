import React, { Component } from 'react';
import { Row, Col , Container, Button , Card,CardTitle,CardBody} from 'reactstrap';
import logos from "../../assets";
import '../navbar/navbar.css';
import NavbarComponent from "../navbar/navbar";
import { connect } from "react-redux";
import * as Actions from "../../redux/action/action";
import './ArtisanselfDesign.css';
import TTCEapi from '../../services/API/TTCEapi';
import Footer from "../footer/footer";
import { browserHistory } from "../../helpers/history";
import CMSApi from '../../services/API/CMSApi';

export default class ArtistSelfdesignRegions extends Component {
  constructor(props) {
    super(props);

    this.state = {
     
      cluster : [],
      value : false,
      visible: 6,   
      regionData : [],                              
     
    };
    
    this.loadMore = this.loadMore.bind(this);
    }
  
    loadMore() {
      this.setState((prev) => {
        return {visible: prev.visible + 6};
      });
    }
    // ProductCatalog = (cluster)=>{
    //   debugger;
    //     console.log(cluster);
    //   browserHistory.push("/Artisianself/regions/ProductRegions?clusterid=" + this.props.data.id )
    // }
  
  componentDidMount(){
     
    CMSApi.getRegions().then((response)=>{
      if(response)
      {
        console.log(response.data);
        this.setState({
          regionData : response.data
        })
      }
    });
   
     TTCEapi.getClusters().then((response)=>{
      this.setState({cluster : response.data.data},()=>{
          console.log(this.state.cluster);
      });
  });
  }
    render() {
      // const { clusterid } = this.props;

        return (
         
           <Container>
                <Row noGutters="true">
                {/* Card1 */}
               
             {this.state.cluster ? this.state.cluster.slice(0,this.state.visible).map((data) => {
            return  this.state.regionData ? this.state.regionData.map((regionData) => {
                  
              if(data.id === parseInt(regionData.acf.cluster_id)) {

            return  <Col xs={12} sm={6} md={4}>
              <div className="card Cardlayout">
                <div class="card-block">
                  <h4 class="card-title">{regionData.acf.header}</h4>
                  <p class="card-text"> 
                  {regionData.title.rendered}
                 </p>
                </div>
                <img className="card-img-top" src={regionData.acf.image}  alt="Card image cap"/>
                <div class="effect-text">
                    <div class="effect-btn">
                      <h2>EXPLORE MORE</h2>
                      <a class="btn" href={"/Artisianself/regions/ProductRegions?clusterid=" + data.id}><i class="fa fa-angle-right fa-2x" aria-hidden="true"></i></a>
                    
                    </div>
                  </div>
              </div>
              </Col>

                }
               }) : <h2 className="text-center">Loading.....</h2>  
              }) : null }
                
              </Row>

        {this.state.visible < this.state.cluster.length &&
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
       


 
</Container> 

 )
    }
}

