import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';

export default class HotelReport extends Component {
    constructor(props){
        super(props);       
        this.state = {
            roomsAvailable: "",
            reservedRooms: "",
            checkedIn: ""
        };
    }

    componentDidMount(){
        this.setState({
            roomsAvailable: this.props.hotelStatus.availableRooms,
            reservedRooms:  this.props.hotelStatus.reservedRooms,
            checkedIn:  this.props.hotelStatus.checkedIn  
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if (this.props !== prevProps) {
            this.setState({
                roomsAvailable: this.props.hotelStatus.availableRooms,
                reservedRooms:  this.props.hotelStatus.reservedRooms,
                checkedIn: this.props.hotelStatus.checkedIn  
            });
        }
    }

    render() {
        return (
            <Grid fluid className="hotel-report-grid">
                <Row className="hotel-report">
                    <Col xs={8} md={4} className="rooms-available"> {this.state.roomsAvailable} <br />
                        <span className="status-subtitle"> Rooms available </span>
                    </Col>
                    <Col xs={8} md={4} className="reserved-rooms"> {this.state.reservedRooms} <br />
                        <span className="status-subtitle"> Reserved rooms </span>
                    </Col>
                    <Col xs={8} md={4} className="checked-in"> {this.state.checkedIn} <br />
                        <span className="status-subtitle"> Checked in </span>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

HotelReport.propTypes = {
    availableRooms: PropTypes.number,
    reservedRooms: PropTypes.number,
    checkedIn: PropTypes.number
};