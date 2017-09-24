import React from 'react';
import keyIndex from 'react-key-index';
import config from 'config';
import dateFormat from 'dateformat';
import Clipboard from 'clipboard';
import $ from 'jquery';
import printf from 'printf';

export default class VideoAnalytics extends React.Component {
    constructor(props) {
        super(props);

        this.state = {rows: {}, headers: {}};

        this.state = { analytics_headers : config.analytics_headers };
    }

    componentWillMount() {
      const from = this.props.data.from.split('-');
      const start = new Date(from[0], from[1], from[2]);
      const str_start = dateFormat(start, "dddd mmmm dS, yyyy");

      this.state.start_date = str_start;

      let seed = 0;
      let rows;
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

      let title = this.props.data.title;
      if(this.props.data.title.length > 35) {
          let a = title.split(" ");
          let t = 0;
          let b = [], set = false;
          let l = 1;
          a.forEach((o,i)=> {
              t = t + String(o).length;
              if(t > (35 * l)) {
                  l = l + 1;
              }

              if(typeof b[l] === 'undefined') b[l] = new String();
              b[l] += a[i]+" ";
          });

          this.props.data.title = b;
      }

    }
    componentDidMount() {
      const i = setInterval(function() {
              const h = window.location.href;

              if(h) {
              const f = "<iframe src='%s' style='width: 680; border: none;' seamless></iframe>";

              const s = printf(f, h);

              const e = document.getElementsByClassName("copy")[0];
              const b = document.getElementById("ccButton");

              b.setAttribute("data-clipboard-text", s)

              const cb = new Clipboard('.btn');

              cb.on("success", function(e) {
                    const ccb = document.getElementById("ccButton");
                    const n = document.createElement("p");
                    n.setAttribute("class", "message");
                    const t = document.createTextNode("Copied to clipboard");

                    n.appendChild(t);

                    $(".btn").get(0).before(n);
                    $("p.message").fadeOut(1500);
              });
              cb.on("error", function(e) {
                  console.error("ERROR!");
                  console.error('Action:', e.action);
                  console.error('Trigger:', e.trigger);
              });

              clearInterval(i);
              $(".instructions, .btn").fadeIn(1000);
              }

            }, 100);
    }
    render() {

        return <div id="container">
            <div id="heading">
                <h3>{

                    (typeof this.props.data.title === 'array') ?
                      this.props.data.title.map((title)=>
                          <span>{title}<br></br> </span>
                      ) :
                      this.props.data.title
                    }
                </h3>
                <p>This data is from {this.state.start_date}<br></br> through to today.</p>
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
            : <div id="loading"></div>}
        </div>

    }


}
