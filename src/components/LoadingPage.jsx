import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class LoadingPage extends Component {
    render() {
        console.log(this.props.error);
        return (
            <div className="loading-page">
                 {this.props.error ? ( this.props.error.toString().substring(7) ) : ( "loading..." )}      
            </div>
        );
    }
}

LoadingPage.propTypes = {
    error: PropTypes.object
};