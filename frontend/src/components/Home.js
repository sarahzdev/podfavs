import React, { Component } from "react";
import "../App.css";
import FeaturedPodcasts from "./FeaturedPodcasts";
import { Container, Row, Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import SearchBar from "./SearchBar";

// Landing page with a search bar and default list of podcasts.
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      podcastList: [],
      userInput: "",
      title: "Featured podcasts",
      isLoading: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch("api/")
      .then(response => response.json())
      .then(data =>
        this.setState({ podcastList: data.content, isLoading: false })
      );
  }

  handleChange(userInput) {
    this.setState({ userInput: userInput });
  }

  handleSubmit() {
    var url = "api/search/" + encodeURI(this.state.userInput);
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(data =>
        this.setState({ podcastList: data, title: "Podcasts you might like" })
      );
  }

  render() {
    if (this.state.isLoading) {
      return <p>Loading...</p>;
    }
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">reactstrap</NavbarBrand>
          <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
              </NavItem>
          </Nav>
        </Navbar>
        
          <SearchBar
            userInput={this.state.userInput}
            onHandleChange={this.handleChange}
            onHandleSubmit={this.handleSubmit}
          />
          <Container>
            <h2 style={{ textDecoration: "underline #EA638C" }}>
              {this.state.title}
            </h2>
            <Row>
              <FeaturedPodcasts podcastList={this.state.podcastList} />
            </Row>
          </Container>
        
      </div>
    );
  }
}

const divStyle = {
  backgroundColor: "#B8D5B8",
  color: "#2B303A",
  fontFamily: "houschka-rounded, sans-serif",
  maxWidth: "100%",
  maxHeight: "100%"
};

export default Home;
