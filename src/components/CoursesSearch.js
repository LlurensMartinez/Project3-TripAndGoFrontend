import React, { Component } from 'react';

class CoursesSearch extends Component {

    state = {
        search: "",
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
        console.log(this.state)
        this.props.onSearch(this.state.search)
      }
    
    //   handleOnFilter(filter, data){
    
    //   }

    render() {
        return (
            <form>
                <input type="search" id="search" name="search" onChange={(e) => {
                    this.handleChange(e)
                    
                    } } placeholder="Introduce el nombre del viaje" />
                <label htmlFor="search">
                </label>
            </form>
        )
    }
}

export default CoursesSearch;