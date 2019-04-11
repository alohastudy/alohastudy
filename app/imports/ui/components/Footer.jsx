import React from 'react';
import { Divider } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px' };
    const dividerStyle = { width: '500px', margin: 'auto' };
    return (
        <footer>
          <div style={divStyle} className="ui center aligned container">
            <hr />
              Created by <br/>
              Isaac Lee, David Liang and Andrew Millard <br />
              <Divider style={dividerStyle} className="ui center aligned"/>
              Department of Information and Computer Sciences <br />
              University of Hawaii<br />
              Honolulu, HI 96822
          </div>
        </footer>
    );
  }
}

export default Footer;
