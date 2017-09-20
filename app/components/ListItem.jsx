import React from 'react';
import ReactDOM from 'react-dom';
import VideoAnalytics from 'components/VideoAnalytics'
import video_api from 'util/video_api'
import dateFormat from 'dateformat';

export default class ListItem extends React.Component {
    constructor(props) {
        super(props);

        const now = new Date();
        now.setMonth(now.getMonth() - 3)
        const str_now = dateFormat(now, "yyyy-mm-dd");

        this.state = {"url" : '/?v='+this.props.videoId+'&c='+this.props.channelId+"&t="+str_now};
    }

    render() {
        return <li><a href={this.state.url}>{this.props.name}</a></li>
    }


}
