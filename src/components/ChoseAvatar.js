import React, { Component } from 'react'

class ChoseAvatar extends Component {
constructor(props) {
  super(props)

  this.avatars = new this.round(9, 5, this.props) 
  this.state = {
    pointer: this.avatars
  }
}

round(end, cut, props) {
  var iterator =  (+props.avatar > 2 ? +props.avatar - 2 : +props.avatar + end - 2)

  this.iterator = () => iterator
  this.point = () => (iterator + 2) % end || end
  this.next = () => (iterator === end) ? iterator = 1 : iterator++ && props.chose(this.point())
  this.back = () => iterator === 1 ? iterator = end : iterator-- && props.chose(this.point())
  this.cut = () => Array(cut).fill(true).map((x, i) => {return { index: (i + iterator) % end || end, style: -Math.abs(i - 2) + 2 } })
  this.change = value => {
    iterator = value > 2 ? value - 2 : value + end - 2
    props.chose(this.point())
    return 1
  }
}

wheel(e) {
  e.deltaY < 0 ? this.state.pointer.back() : this.state.pointer.next()
  this.setState({pointer: this.state.pointer})
}



  render() {
    return (
      <div className = {this.props.className} onWheel = {e => this.wheel.bind(this, e)() } style = {(this.state.pointer >= 0) ? {} : {justifyContent: 'flex-end'} } >
        {this.state.pointer.cut().map(avatar => {
          return (
            <div 
              key = {avatar.index} 
              style = { {background: `url('/avatars/${avatar.index}.jpg') 0% 0% / cover`} }
              className = {`round round__${avatar.style}` } 
              onClick = {() => this.state.pointer.change(avatar.index) && this.setState({pointer: this.state.pointer})}>
            </div>
          )
        })}
      </div>
    )
  }
}

export default ChoseAvatar