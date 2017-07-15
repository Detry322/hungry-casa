import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/auth';

export function NotFound() {
    return (
        <div className="col-md-8">
            <h1>Not Found</h1>
        </div>
    );
}
