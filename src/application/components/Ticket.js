import React, {Component} from 'react';
import axios from 'axios';

import QRCode from 'react-qr-code';

import { MainPlate, Table, Center, SectionHeader, SubmitButton, CancelButton, Loading } from "../library";

//import {formatEpoch} from '../functions/formatting';

import {getCookie} from '../functions/cookies';

export class Ticket extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            loading: true,
            ticket: null
        }

        this.getProfile();

        this.handleChange = this.handleChange.bind(this);
        this.getProfile = this.getProfile.bind(this);
    }

    getProfile() { 
        axios.get('http://10.33.69.132:3000/ticket?id=' + getCookie('id'), {withCredentials: false})
        .then(res => {
            console.log('Status: ' + res.status)
            if (res.status === 200) {
                console.log(res.data)
                this.setState({ticket: res.data, loading: false}, function(){this.forceUpdate()});
            } else {
                //this.setState({loading: false}, function(){this.forceUpdate()});
                //alert('Ticket lookup failed!');
                //this.setState({ticket: null, loading: false}, function(){this.forceUpdate()});
                window.location.href='/logout';
            }
        })
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        if (this.state.loading === true) {
            return (
                <Loading />
            )
        } else {
            var leftColumnStyle = {width: '35%'};
            var rightColumnStyle = {maxWidth: '300px'};
            var ticket = this.state.ticket;
            return (
                <MainPlate title="My Ticket" subTitle="My Boarding Information">
                    <SectionHeader>Boarding Pass</SectionHeader>
                    <Center>
                        <QRCode value={String(ticket.id)} />
                    </Center>

                    <SectionHeader>Personal Information</SectionHeader>

                    <Table>
                        <tbody>
                            <tr><td style={leftColumnStyle}>Name</td><td style={rightColumnStyle}>{ticket.firstname + ' ' + ticket.lastname}</td></tr>
                            <tr><td style={leftColumnStyle}>Ticket</td><td style={rightColumnStyle}>{ticket.id}</td></tr>
                            <tr><td style={leftColumnStyle}>Phone</td><td style={rightColumnStyle}>{ticket.phone}</td></tr>
                            <tr><td style={leftColumnStyle}>Bags</td><td style={rightColumnStyle}>{ticket.bags}</td></tr>
                            <tr><td style={leftColumnStyle}>Class</td><td style={rightColumnStyle}>{ticket.class}</td></tr>
                            <tr><td style={leftColumnStyle}>Seat</td><td style={rightColumnStyle}>{ticket.seat}</td></tr>
                        </tbody>
                    </Table>

                    <SectionHeader>Flight Information</SectionHeader>

                    <Table>
                        <tbody>
                            <tr><td style={leftColumnStyle}>Flight</td><td style={rightColumnStyle}>AA 2090</td></tr>
                            <tr><td style={leftColumnStyle}>From</td><td style={rightColumnStyle}>Orlando (MCO)</td></tr>
                            <tr><td style={leftColumnStyle}>To</td><td style={rightColumnStyle}>Dayton (DAY)</td></tr>
                            <tr><td style={leftColumnStyle}>Departure</td><td style={rightColumnStyle}>5:00 AM</td></tr>
                            <tr><td style={leftColumnStyle}>Arrival</td><td style={rightColumnStyle}>6:38 AM</td></tr>
                            <tr><td style={leftColumnStyle}>Length</td><td style={rightColumnStyle}>1h 38min</td></tr>
                            <tr><td style={leftColumnStyle}>Status</td><td style={rightColumnStyle}>On-time</td></tr>
                        </tbody>
                    </Table>

                    <Center>
                        <CancelButton onClick={() => window.location.href="/logout"}>Close Ticket</CancelButton>
                    </Center>
                    
                </MainPlate>
            )
        }
    }
}