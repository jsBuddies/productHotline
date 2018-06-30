import React from 'react';

class From extends React.Component{
  constructor() {
    super();
  }

  render(){
    return (
    <React.Fragment>
      <form action="">
        <input type="text" placeholder="Name" required />
        <input type="text" placeholder='Price' required />
        <input type="text" placeholder='Brand' required />
        <input type="text" placeholder='Camera' />
        <input type="text" placeholder='Battery' />
        <input type="text" placeholder='Weight' />
        <input type="text" placeholder='Size' />
        <input type="text" placeholder='Weight' />
      </form>
    </React.Fragment>
    )
  }
}

export default From;
