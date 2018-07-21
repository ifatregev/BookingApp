import React, { Component } from 'react';
import styles from './App.module.scss';
import HotelReport from './HotelReport';
import EmployeeStats from './EmployeeStats';
import LoadingPage from './LoadingPage';

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            hotelStatus:{},
            hotelBookings: [],
            isLoading: false,
            error: null,
            numTopEmployees: 3
        };
        this.getHotelData = this.getHotelData.bind(this);
    }

    getHotelData(){
        const urls = ["https://interview-booking-api.herokuapp.com/api/bookings", "https://interview-booking-api.herokuapp.com/api/booking-snapshot"];
        let promises = urls.map(url => fetch(url));

        Promise.all(promises)
        .then(responses => {
            let hotelBookingsResponse = responses[0];
            let hotelStatusResponse = responses[1];
            if (!hotelBookingsResponse.ok){
                throw Error("Invalid page request - " + hotelBookingsResponse.statusText);
            }
            if (!hotelStatusResponse.ok){
                throw Error("Invalid page request - " + hotelStatusResponse.statusText);
            }
            return Promise.all([hotelBookingsResponse.json(), hotelStatusResponse.json()]);
        }).then((responseJsons) => {
            this.setState({
                hotelBookings: responseJsons[0],
                hotelStatus: responseJsons[1],
                isLoading: true
            });
        }).catch((error) => {
            console.log(error);
            this.setState({
              isLoading: false,
              error: error
            });
        });
    }

    componentDidMount(){
        //Setting time out for visualization purposes, presenting the loading-page content.
        setTimeout(() => {
            this.getHotelData();
        }, 1000);  
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if (this.state !== prevState) {
            setTimeout(() => {
                this.getHotelData();
            }, 60000);
        }
    }

    render() {
        return (
            <div className={styles.app}>
                <div className="page-content">
                    {this.state.isLoading ? (
                        <div className="hotel-info">
                            <HotelReport hotelStatus={this.state.hotelStatus}   />
                            <EmployeeStats hotelBookings={this.state.hotelBookings} numTopEmployees={this.state.numTopEmployees}    />
                        </div>
                    ):(
                        <LoadingPage  error={this.state.error}  />
                    )}
                </div>
            </div>
        );
    }
}
