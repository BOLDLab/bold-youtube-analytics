import React from 'react';
import keyIndex from 'react-key-index';
import config from 'config';
import dateFormat from 'dateformat';

export default class VideoAnalytics extends React.Component {
    constructor(props) {
        super(props);

        this.state = {rows: {}, headers: {}};



        this.state = { analytics_headers : config.analytics_headers };
    }

    componentWillMount() {
      const from = this.props.data.from.split('-');
    //  console.log(from);
      const start = new Date(from[0], from[1], from[2]);
      const str_start = dateFormat(start, "dddd mmmm dS, yyyy");
    //  console.log(str_start);
      this.state.start_date = str_start;

      let seed = 0;
      var rows;
      if(typeof this.props.data.rows !== 'undefined') {
          rows = keyIndex(this.props.data.rows, 1);
          this.state.rows = rows;

          this.state.rows.forEach(function(o,i) {
              o.forEach(function(v, i) {
                  v = Math.round(v * 10) / 10;
                  o[i] = v;
              })
          });
      }

      const headers = keyIndex(this.props.data.columnHeaders, 2);

      this.state.headers = headers;

    }

    render() {
        return <div id="content">
            <div id="heading">
                <h3>{this.props.data.title}</h3>
                <p>This data is from {this.state.start_date} through to today.</p>
            </div>
            {this.state.headers ?
            <table className="analytics">
                <thead>
                  <tr>
                    {
                      this.state.headers.map((header) =>
                        <th key={header._nameId}>
                            <p>{this.state.analytics_headers[header.name].title} </p>
                            <em>{this.state.analytics_headers[header.name].description}</em>
                        </th>
                      )
                    }
                  </tr>
                </thead>
                <tbody>
                { typeof this.state.rows !== 'undefined' ? this.state.rows.map((row) =>
                      <tr key={row._rowId}>
                        <td key={row._0Id}>{row[0]} <br /> <span>seconds</span></td>
                        <td key={row._1Id}>{row[1]} <br /> <span>{row[1]<2?"person":"people"} viewed</span></td>
                        <td key={row._2Id}>{row[2]}% </td>
                        <td key={row._3Id}>{row[3]} <span>minutes</span></td>
                    </tr>)
                    :
                    <tr><td colSpan='4' className='message'>No data is available for this video</td></tr>
                  }
                </tbody>
            </table>
            : <h3>Loading...</h3>}
        </div>

    }


}
