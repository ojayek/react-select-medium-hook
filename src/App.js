import React, { Component } from 'react';
import Select from 'react-select';
import axios from 'axios';
import Multi from './multi';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectOptions: [],
      Title: '',
      InnerParticipators: '',
    };
  }

  async getOptions(formData) {
    // const res = await axios.get('')
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.get(
      'http://localhost:88/api/Meeting/GetPersons',
      formData,
      config
    );
    const data = res.data;
    console.log(data);
    const options = data.map((d) => ({
      value: d.Nam,
      label: d.NamKhanevadegi,
    }));

    this.setState({ selectOptions: options });
  }

  handleChange(e) {
    console.log(e);
    this.setState({ Title: e.value, Id: e.label });
  }

  componentDidMount() {
    this.formData = {};
    this.getOptions();
  }

  render() {
    console.log(this.state.selectOptions);
    return (
      <div>
        {/* <Select options={this.state.selectOptions} onChange={this.handleChange.bind(this)}/>
    <p>You have selected <strong>{this.state.Title}</strong> whose id is <strong>{this.state.Id}</strong></p> */}
        <Multi />
      </div>
    );
  }
}
