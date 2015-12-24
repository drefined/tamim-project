import React from 'react';

export default React.createClass({
  render () {
    return (
      <div>
        <div>Root</div>
        {this.props.children}
      </div>
    )
  }
})
