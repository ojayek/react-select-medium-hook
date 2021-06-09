import React, { Component, useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import "@fontsource/vazir"; // Defaults to weight 400.
import './Font.css';
const Multi = () => {
  //   this.state = {
  //     selectOptions: [],
  //     value: [],
  //     Nam:'',
  //     NamKhanevadegi:''
  //   };
  // }

  const [Nam, setNam] = useState('');
  const [NamKhanevadegi, setNamKhanevadegi] = useState('');
  const [selectOptions, setSelectOptions] = useState([]);
  const [value, setValue] = useState([]);

  const getOptions = async () => {
    //

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Nam: Nam,
        NamKhanevadegi: NamKhanevadegi,
      },
    };
    // const frmdata = {
    //   Nam: this.state.Nam,
    //   NamKhanevadegi: this.state.NamKhanevadegi,
    // };
    const res = await axios.get(
      'http://localhost:88/api/Meeting/GetPersons',
      // frmdata,
      config
    );

    //
    // const res = await axios.get('http://localhost:58148/api/Meeting/GetPersons')
    const data = res.data;

    const options = data.map((d) => ({
      value: d.Nam,
      label: d.NamKhanevadegi,
    }));
    console.log(data);
    setSelectOptions(options);
  };

  const handleChange = (e) => {
    console.log(e[0]);
    setNam(e[0].value);
    setNamKhanevadegi(e[0].label);
  };

  // componentDidMount() {
  //   this.getOptions();
  // }

  useEffect(() => {
    getOptions();
  }, []);
  var divStyle = {
    fontSize: {fontFamily :'vazir'},
    innerWidth :400
};
  return (
    <div >
      <Select styles={divStyle} options={selectOptions} onChange={handleChange} isMulti />
      {value === null ? '' : value.map((v) => <h4>{v.label}</h4>)}
    </div>
  );
};

export default Multi;
