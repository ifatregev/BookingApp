import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';

export default class TopSeller extends Component {

    nameFormatter(firstName, lastName){
        if(lastName){
            lastName = lastName.substring(0,1);
        }
        return (firstName + " " + lastName + ".");
    }

    retrieveImage(imageUrl){
        return(
            <img src={imageUrl} alt="Employee profile pic" />
        );
    }

    render() {
        return (
            <Row className="top-employee" index={this.props.index} >
                <Col xs={4} md={1} className="employee-img"> {this.retrieveImage(this.props.sellerStats.profileImageUrl)} </Col>
                <Col xs={4} md={1} className="employee-name"> {this.nameFormatter(this.props.sellerStats.firstName, this.props.sellerStats.lastName)} </Col>
                <Col xs={4} md={1} className="employee-sumHours"> {this.props.sellerStats.sumHours} hours </Col>
            </Row>
        );
    }
}

TopSeller.propTypes = {
    index: PropTypes.number,
    sellerStats: PropTypes.object,
};