

export default class ListItem extends React.Component {
    constructor(props) {
        super(props);

        //this.handleClick = this.handleClick.bind(this);
    }

    render() {
      return <li onClick={this.handleClick}>{this.props.name}</li>
    }


}
