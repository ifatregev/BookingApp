import React, { Component } from 'react';
import TopSellers from './TopSellers';
import PropTypes from 'prop-types';

export default class EmployeeStats extends Component {
    render() {
        return (
            <div className="employee-stats">
                <span className="sub-header"> Employee stats </span>
                <TopSellers hotelBookings={this.props.hotelBookings} numTopEmployees={this.props.numTopEmployees}   />
            </div>
        );
    }
}

EmployeeStats.propTypes = {
    hotelBookings: PropTypes.array,
    numTopEmployees: PropTypes.number
};
