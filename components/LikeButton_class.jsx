import { Component } from 'react';


export class LikeButton extends Component {
  constructor(...params){
    super(...params);
    this.state = {
      likes: +this.props.start || 0,
      border : !!this.props.border  
      };
  }
    
  render() {
    const 
      classList=['like'],
      step = +this.props.step || 1;
    if (this.props.big) classList.push('big');
    if (this.state.border) classList.push('border');
    if ('green' === this.props.color) classList.push('green');
    return <button 
      className={classList.join(' ')}
      onClick={()=>this.setState(({likes})=>({likes: step+likes }))}
      onContextMenu ={event=>{event.preventDefault();this.setState(({border})=>({border:!border}))}}
      >
      Likes:{this.state.likes}
    </button>;
  }
}