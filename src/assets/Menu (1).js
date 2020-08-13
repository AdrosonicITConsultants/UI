import React, { Component } from "react";
import { Row, Col, Container } from "reactstrap";
import "./Menu.css";
import Toggleswitch from "../components/Toggleswitch";
import MenuCard from "../components/MenuCard";
import menuDynamitefries from "../assets/menuDynamiteFries.png";
import menuNonveg from "../assets/menuNonveg.png";
import menuVeg from "../assets/menuVeg.png";
import MenuNavbar from "../components/MenuNavbar";
import Filters from "../assets/Filters.png";
import OFKlogo from "../assets/OFKlogo.png";

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false
    };
  }
  getVegisChecked = isCheckedfilter => {
    this.setState(
      {
        isChecked: isCheckedfilter
      },
      () => {
        console.log("hey " + this.state.isChecked);
      }
    );
  };

  render() {
    return (
      <div className="menuBg">
        <Row noGutters={true}>
          <Col sm={{ size: "3" }} xs={{ size: "3" }} className="menuHeader ">
            Menu
          </Col>
          <Col
            sm={{ size: "6" }}
            xs={{ size: "6" }}
            className="menuHeader "
          ></Col>
          <Col
            sm={{ size: "2" }}
            xs={{ size: "2" }}
            className=" text-right mt-3"
          >
            <img src={OFKlogo} className=" ofklogo"></img>
          </Col>
        </Row>
        <Row noGutters>
          <Col sm={{ size: "12" }} className="text-center">
            <MenuNavbar />
          </Col>
        </Row>

        <Row noGutters={true}>
          <Col
            sm={{ size: "2" }}
            xs={{ size: "2" }}
            className="menuVegtext text-center"
          >
            Veg Only
          </Col>
          <Col sm={{ size: "1" }} xs={{ size: "2" }} className="">
            <Toggleswitch
              VegisChecked={this.getVegisChecked.bind(this)}
            ></Toggleswitch>
          </Col>
          <Col
            sm={{ size: "2" }}
            xs={{ size: "3" }}
            className="menuFilterstext  text-center"
          >
            More Filters
          </Col>

          <Col sm={{ size: "2" }} xs={{ size: "2" }} className="filterimg">
            <img src={Filters}></img>
          </Col>
        </Row>

        <div className="menuItemContainer">
          <div className="menuCardContainer">
            <div>
              <Row noGutters={true}>
                {this.state.isChecked
                  ? menucards.map((menucard, index) => {
                      if (menucard.veg)
                        return (
                          <MenuCard
                            key={index}
                            image={menucard.image}
                            title={menucard.title}
                            subtitle={menucard.subtitle}
                            logo={menucard.logo}
                            price={menucard.price}
                            veg={menucard.veg}
                          />
                        );
                    })
                  : menucards.map((menucard, index) => (
                      <MenuCard
                        key={index}
                        image={menucard.image}
                        title={menucard.title}
                        subtitle={menucard.subtitle}
                        logo={menucard.logo}
                        price={menucard.price}
                        veg={menucard.veg}
                      />
                    ))}
              </Row>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const menucards = [
  {
    image: menuDynamitefries,
    title: "Dynamite Fries",
    logo: menuVeg,
    subtitle: "Thai",
    price: 20,
    veg: true
  },
  {
    image: menuDynamitefries,
    title: "Dynamite Fries ",
    logo: menuNonveg,
    subtitle: "Indian",
    price: 22,
    veg: false
  },
  {
    image: menuDynamitefries,
    title: "Dynamite Fries",
    logo: menuVeg,
    subtitle: "Mexican",
    price: 2,
    veg: true
  },
  {
    image: menuDynamitefries,
    title: "Dynamite Fries",
    logo: menuNonveg,
    subtitle: "Italian",
    price: 15,
    veg: false
  },
  {
    image: menuDynamitefries,
    title: "Design ",
    logo: menuVeg,
    subtitle: "Chinese",
    price: 30,
    veg: true
  },
  {
    image: menuDynamitefries,
    title: "Design ",
    logo: menuNonveg,
    subtitle: "Thai",
    price: 5,
    veg: false
  },
  {
    image: menuDynamitefries,
    title: "Design ",
    logo: menuVeg,
    subtitle: "Russian",
    price: 6,
    veg: true
  },
  {
    image: menuDynamitefries,
    title: "Dynamite Fries",
    logo: menuVeg,
    subtitle: "Thai",
    price: 20,
    veg: true
  },
  {
    image: menuDynamitefries,
    title: "Dynamite Fries ",
    logo: menuNonveg,
    subtitle: "Indian",
    price: 22,
    veg: false
  },
  {
    image: menuDynamitefries,
    title: "Dynamite Fries",
    logo: menuVeg,
    subtitle: "Mexican",
    price: 2,
    veg: true
  },
  {
    image: menuDynamitefries,
    title: "Dynamite Fries",
    logo: menuNonveg,
    subtitle: "Italian",
    price: 15,
    veg: false
  },
  {
    image: menuDynamitefries,
    title: "Design ",
    logo: menuVeg,
    subtitle: "Chinese",
    price: 30,
    veg: true
  },
  {
    image: menuDynamitefries,
    title: "Design ",
    logo: menuNonveg,
    subtitle: "Thai",
    price: 5,
    veg: false
  }
];
