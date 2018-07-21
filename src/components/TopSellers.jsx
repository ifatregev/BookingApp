import React, { Component } from 'react';
import $ from 'jquery';
import TopSeller from './TopSeller';
import { Grid } from 'react-flexbox-grid';
import PropTypes from 'prop-types';

class Employee {

    constructor(id, firstName, lastName, profileImageUrl, sumHours){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.profileImageUrl = profileImageUrl;
        this.sumHours = sumHours;
    }
}

export default class TopSellers extends Component {

    constructor(props){
        super(props);       
        this.state = {
            sellerStats: {},
            topSellers: [new Employee(), new Employee(), new Employee()]
        };
        this.calculateTopSellers = this.calculateTopSellers.bind(this);
    }

    componentDidMount(){
        this.calculateTopSellers(this.props.hotelBookings);
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if (this.props !== prevProps) {
            this.calculateTopSellers(this.props.hotelBookings);
        }
    }

    formatDate(dateToFormat){
        let parts = dateToFormat.split("-");
        return parts[1]+"/"+parts[0]+"/"+parts[2];
    }

    calculateReservationHours(checkInDate, checkOutDate){
        let date1 = new Date(this.formatDate(checkInDate));
        let date2 = new Date(this.formatDate(checkOutDate));
        let timeDiff = date2.getTime() - date1.getTime();
        let diffHours = Math.ceil(timeDiff / (1000 * 3600));
        return diffHours;
    }

    calculateTopSellers(hotelBookings){
        if (hotelBookings.length === 0){
            return;
        }

        let sellerStats = {};
        $.each(hotelBookings, $.proxy(function(index, reservation){
            let employee = reservation.employee;
            if (!employee){
                return;
            }
            
            let sumHours = this.calculateReservationHours(reservation.checkInDate, reservation.checkOutDate);
            if (sellerStats[employee.id]){
                sellerStats[employee.id].sumHours += sumHours;
            }
            else{
                sellerStats[employee.id] = new Employee(employee.id, employee.firstName, employee.lastName, employee.profileImageUrl, sumHours);
            }
        }, this));

        let sortedSellerStats = Object.values(sellerStats);
        sortedSellerStats.sort(function(a, b){
            return b.sumHours-a.sumHours;
        });

        this.setState({
            topSellers: sortedSellerStats.slice()
        });
    }

    render() {
        let TopSellerStats = [];
        for(let i = 0; i < this.props.numTopEmployees; i++){
            TopSellerStats.push( <TopSeller sellerStats={this.state.topSellers[i]} key={i} index={i} /> )
        }
        
        return (
            <Grid fluid className="top-sellers-grid">
                {TopSellerStats}
            </Grid>
        );
    }
}

TopSellers.propTypes = {
    hotelBookings: PropTypes.array,
    numTopEmployees: PropTypes.number
};

