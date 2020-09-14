import React, { Component } from 'react'

export class DaysRemaining extends Component {
    constructor(props) {
        super(props);
        this.state = {
           date : this.props.startday,
           daysleft : 0,
        }
    }
    componentDidMount(){
        var someDate = new Date(this.state.date);
                                console.log(someDate);
                                var numberOfDaysToAdd = 3;
                                someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
                                console.log(someDate); 
                                var todayDate= new Date();
                                const diffTime = Math.abs(todayDate - someDate);
                                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                                console.log(diffDays); 
                                this.setState({daysleft:diffDays}) 
    }
    render() {
        return (
            <span>                {this.state.daysleft}
            </span>
            
        )
    }
}

export default DaysRemaining
