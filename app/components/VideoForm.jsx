import React from 'react';
//import keyIndex from 'react-key-index';
import config from 'config';
import dateFormat from 'dateformat';

export default class VideoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {start: "", end: ""}
         this.handleSubmit = this.handleSubmit.bind(this);
         this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
          let start = new Date();
          start.setMonth(start.getMonth()-3);
          this.state.start = dateFormat(start, "yyyy-mm-dd");

          let end = new Date();
          this.state.end = dateFormat(end, "yyyy-mm-dd");
     }
     handleChange(e) {
          this.state.start = e.target.t.value;
          this.state.end = e.target.e.value;
     }
    handleSubmit(e) {
          e.preventDefault();

          if(!e.target.v.value) {
                e.target.v.classList.add('error');
          } else {
              const va = e.target.v.value.split('/');
              const val = va[va.length-1];

              document.location = "?v="+val+"&c="+e.target.c.value+"&t="+e.target.t.value+"&e="+e.target.e.value;
          }
    }
    render() {

      return this.state.start ?
       (    <form action="/" onSubmit={ this.handleSubmit }>
            <label>Share Link: <input type="text" name="v"/></label>
            <input type="hidden" name="c" value={config.channelID} onChange={this.handleChange}/>
            <label>Start Date: <input type="date" name="t" value={this.state.start} onChange={this.handleChange}/></label>
            <label>End Date:  <input type="date" name="e" value={this.state.end} onChange={this.handleChange} /> </label>
            <input type='submit' value="Search"/>
          </form> )
      : (<div id='loading'></div>);

    }

}
