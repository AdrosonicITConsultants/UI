import React from "react";
import { Col, Collapse, Row } from "reactstrap";
class TeamToggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          collapse: this.props.key === 0 ? true : false,
          
        };
      }
      toggleArrow = () => {
        this.setState({ collapse: !this.state.collapse }, () => {
          this.props.getcollapseId(this.props.data.id);
          this.setState({ show: !this.state.show });
          //console.log(this.props.data.id);
        });
      };
    
   
      render() {
      
          return (
            <React.Fragment>
              <Col lg={4} md={6} sm={12} xs={12}>
            
                    <Collapse toggler="togglerinner" isOpen={this.state.collapse}>
                      <div className="Scrollablediv">
                        <p
                          style={{ textAlign: "justify" }}
                          className="DescBox fade-in "
                        >
                         
                        </p>
                      </div>
                    </Collapse>
    
              </Col>
            </React.Fragment>
          );
        }
      }
    
    
    export default TeamToggle;
    