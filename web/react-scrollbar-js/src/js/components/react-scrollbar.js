
// import React from 'react';

// import VerticalScrollbar from './vertical-scrollbar.js';
// import HorizontalScrollbar from './horizontal-scrollbar.js';

// require('../../sass/_Scrollbar.sass')



class VerticalScrollbar extends React.Component {

  constructor() {
    super();
    this.state = {
      height: 0,
      dragging: false,
      start: 0
    }
  }

  render(){
    if(this.state.height < 100) return(
      <div
        className="react-scrollbar__scrollbar-vertical"
        ref="container"
        onClick={ this.jump.bind(this) }>

        <div
          className={ "scrollbar" + ( this.state.dragging || this.props.draggingFromParent ? '' : ' react-scrollbar-transition') }
          ref="scrollbar"
          onTouchStart={ this.startDrag.bind(this) }
          onMouseDown={ this.startDrag.bind(this) }
          style={{
            height: this.state.height+'%',
            top: this.props.scrolling + '%'
          }} />

      </div>
    )

    else return null
  }


  startDrag(e){

    e.preventDefault()
    e.stopPropagation()

    e = e.changedTouches ? e.changedTouches[0] : e

    // Prepare to drag
    this.setState({
      dragging: true,
      start: e.clientY
    })
  }

  onDrag(e){

    if(this.state.dragging){

      // Make The Parent being in the Dragging State
      this.props.onDragging()

      e.preventDefault()
      e.stopPropagation()

      e = e.changedTouches ? e.changedTouches[0] : e

      let yMovement = e.clientY - this.state.start
      let yMovementPercentage = yMovement / this.props.wrapper.height * 100

      // Update the last e.clientY
      this.setState({ start: e.clientY }, () => {

        // The next Vertical Value will be
        let next = this.props.scrolling + yMovementPercentage

        // Tell the parent to change the position
        this.props.onChangePosition(next, 'vertical')
      })



    }

  }

  stopDrag(e){
    if(this.state.dragging){
      // Parent Should Change the Dragging State
      this.props.onStopDrag()
      this.setState({ dragging: false })
    }
  }

  jump(e){

    let isContainer = e.target === this.refs.container

    if(isContainer){

      // Get the Element Position
      let position = this.refs.scrollbar.getBoundingClientRect()

      // Calculate the vertical Movement
      let yMovement = e.clientY - position.top
      let centerize = (this.state.height / 2)
      let yMovementPercentage = yMovement / this.props.wrapper.height * 100 - centerize

      // Update the last e.clientY
      this.setState({ start: e.clientY }, () => {

        // The next Vertical Value will be
        let next = this.props.scrolling + yMovementPercentage

        // Tell the parent to change the position
        this.props.onChangePosition(next, 'vertical')

      })

    }
  }

  calculateSize(source){
    // Scrollbar Height
    this.setState({ height: source.wrapper.height / source.area.height * 100 })
  }

  componentWillReceiveProps(nextProps) {
    if( nextProps.wrapper.height !== this.props.wrapper.height ||
        nextProps.area.height !== this.props.area.height ) this.calculateSize(nextProps)
  }

  componentDidMount() {
    this.calculateSize(this.props)

    // Put the Listener
    document.addEventListener("mousemove", this.onDrag.bind(this))
    document.addEventListener("touchmove", this.onDrag.bind(this))
    document.addEventListener("mouseup", this.stopDrag.bind(this))
    document.addEventListener("touchend", this.stopDrag.bind(this))
  }

  componentWillUnmount() {
    // Remove the Listener
    document.removeEventListener("mousemove", this.onDrag.bind(this))
    document.removeEventListener("touchmove", this.onDrag.bind(this))
    document.removeEventListener("mouseup", this.stopDrag.bind(this))
    document.removeEventListener("touchend", this.stopDrag.bind(this))
  }

}


class HorizontalScrollbar extends React.Component {

  constructor() {
    super();
    this.state = {
      width: 0,
      dragging: false,
      start: 0
    }
  }

  render(){
    if(this.state.width < 100) return(
      <div
        className="react-scrollbar__scrollbar-horizontal"
        ref="container"
        onClick={ this.jump.bind(this) }>

        <div
          className={ "scrollbar" + ( this.state.dragging || this.props.draggingFromParent ? '' : ' react-scrollbar-transition') }
          ref="scrollbar"
          onTouchStart={ this.startDrag.bind(this) }
          onMouseDown={ this.startDrag.bind(this) }
          style={{
            width: this.state.width+'%',
            left: this.props.scrolling + '%'
          }} />

      </div>
    )

    else return null
  }


  startDrag(e){

    e.preventDefault()
    e.stopPropagation()

    e = e.changedTouches ? e.changedTouches[0] : e

    // Prepare to drag
    this.setState({
      dragging: true,
      start: e.clientX
    })
  }

  onDrag(e){

    if(this.state.dragging){

      // Make The Parent being in the Dragging State
      this.props.onDragging()

      e.preventDefault()
      e.stopPropagation()

      e = e.changedTouches ? e.changedTouches[0] : e

      let xMovement = e.clientX - this.state.start
      let xMovementPercentage = xMovement / this.props.wrapper.width * 100

      // Update the last e.clientX
      this.setState({ start: e.clientX }, () => {

        // The next Horizontal Value will be
        let next = this.props.scrolling + xMovementPercentage

        // Tell the parent to change the position
        this.props.onChangePosition(next, 'horizontal')
      })



    }

  }

  stopDrag(e){
    if(this.state.dragging){
      // Parent Should Change the Dragging State
      this.props.onStopDrag()
      this.setState({ dragging: false })
    }
  }

  jump(e){

    let isContainer = e.target === this.refs.container

    if(isContainer){

      // Get the Element Position
      let position = this.refs.scrollbar.getBoundingClientRect()

      // Calculate the horizontal Movement
      let xMovement = e.clientX - position.left
      let centerize = (this.state.width / 2)
      let xMovementPercentage = xMovement / this.props.wrapper.width * 100 - centerize

      // Update the last e.clientX
      this.setState({ start: e.clientX }, () => {

        // The next Horizontal Value will be
        let next = this.props.scrolling + xMovementPercentage

        // Tell the parent to change the position
        this.props.onChangePosition(next, 'horizontal')

      })

    }
  }

  calculateSize(source){
    // Scrollbar Width
    this.setState({ width: source.wrapper.width / source.area.width * 100 })
  }

  componentWillReceiveProps(nextProps) {
    if( nextProps.wrapper.width !== this.props.wrapper.width ||
        nextProps.area.width !== this.props.area.width ) this.calculateSize(nextProps)
  }

  componentDidMount() {
    this.calculateSize(this.props)

    // Put the Listener
    document.addEventListener("mousemove", this.onDrag.bind(this))
    document.addEventListener("touchmove", this.onDrag.bind(this))
    document.addEventListener("mouseup", this.stopDrag.bind(this))
    document.addEventListener("touchend", this.stopDrag.bind(this))
  }

  componentWillUnmount() {
    // Remove the Listener
    document.removeEventListener("mousemove", this.onDrag.bind(this))
    document.removeEventListener("touchmove", this.onDrag.bind(this))
    document.removeEventListener("mouseup", this.stopDrag.bind(this))
    document.removeEventListener("touchend", this.stopDrag.bind(this))
  }

}


class ScrollWrapper extends React.Component {

  constructor() {
    super();
    this.state = {
      ready: false,
      scrollY: null,
      scrollX: null,
      top: 0,
      left: 0,
      scrollAreaHeight: null,
      scrollAreaWidth: null,
      scrollWrapperHeight: null,
      scrollWrapperWidth: null,
      verticalHeight: null,
      vMovement: 0,
      hMovement: 0,
      dragging: false,
      start: { y: 0, x: 0}
    }
  }

  render(){

    return(

      <div
        onClick={ this.calculateSize.bind(this) }
        className={ "react-scrollbar__wrapper" + ( this.props.className ? " " + this.props.className : "" ) }
        ref="scrollWrapper">

        <div
          className={ "react-scrollbar__area" + ( this.state.dragging ? ' ' : ' react-scrollbar-transition') }
          ref="scrollArea"
          onWheel={ this.scroll.bind(this) }
          onTouchStart={ this.startDrag.bind(this) }
          onTouchMove={ this.onDrag.bind(this) }
          onTouchEnd={ this.stopDrag.bind(this) }
          style={{ marginTop: this.state.top * -1 +'px', marginLeft: this.state.left * -1 +'px' }} >

          { this.props.children }

          { this.state.ready ?

            <VerticalScrollbar
              area={{ height: this.state.scrollAreaHeight }}
              wrapper={{ height: this.state.scrollWrapperHeight }}
              scrolling={ this.state.vMovement }
              draggingFromParent={ this.state.dragging }
              onChangePosition={ this.handleChangePosition.bind(this) }
              onDragging={ this.handleScrollbarDragging.bind(this) }
              onStopDrag={ this.handleScrollbarStopDrag.bind(this) } />

          : null }


          { this.state.ready ?

            <HorizontalScrollbar
              area={{ width: this.state.scrollAreaWidth }}
              wrapper={{ width: this.state.scrollWrapperWidth }}
              scrolling={ this.state.hMovement }
              draggingFromParent={ this.state.dragging }
              onChangePosition={ this.handleChangePosition.bind(this) }
              onDragging={ this.handleScrollbarDragging.bind(this) }
              onStopDrag={ this.handleScrollbarStopDrag.bind(this) } />

          : null }

        </div>
      </div>

    )

  }



  scroll(e){
    e.preventDefault()

    // Make sure the content height is not changed
    this.calculateSize(() => {
      // Set the wheel step
      let num = this.props.speed

      // DOM events
      let shifted = e.shiftKey
      let scrollY = e.deltaY > 0 ? num : -(num)
      let scrollX = e.deltaX > 0 ? num : -(num)

      // Fix Mozilla Shifted Wheel~
      if(shifted && e.deltaX == 0) scrollX = e.deltaY > 0 ? num : -(num)

      // Next Value
      let nextY = this.state.top + scrollY
      let nextX = this.state.left + scrollX

      // Is it Scrollable?
      let canScrollY = this.state.scrollAreaHeight > this.state.scrollWrapperHeight
      let canScrollX = this.state.scrollAreaWidth > this.state.scrollWrapperWidth

      // Vertical Scrolling
      if(canScrollY && !shifted) this.normalizeVertical(nextY)

      // Horizontal Scrolling
      if(shifted && canScrollX) this.normalizeHorizontal(nextX)
    })

  }

  // DRAG EVENT JUST FOR TOUCH DEVICE~
  startDrag(e){
    e.preventDefault()
    e.stopPropagation()

    e = e.changedTouches ? e.changedTouches[0] : e

    // Make sure the content height is not changed
    this.calculateSize(() => {
      // Prepare to drag
      this.setState({
        dragging: true,
        start: { y: e.pageY, x: e.pageX }
      })
    })

  }

  onDrag(e){

    if(this.state.dragging){

      e.preventDefault()
      e = e.changedTouches ? e.changedTouches[0] : e

      // Invers the Movement
      let yMovement = this.state.start.y - e.pageY
      let xMovement = this.state.start.x - e.pageX

      // Update the last e.page
      this.setState({ start: { y: e.pageY, x: e.pageX } })

      // The next Vertical Value will be
      let nextY = this.state.top + yMovement
      let nextX = this.state.left + xMovement

      this.normalizeVertical(nextY)
      this.normalizeHorizontal(nextX)

    }

  }

  stopDrag(e){
    this.setState({ dragging: false })
  }

  normalizeVertical(next){

    // Vertical Scrolling
    let lowerEnd = this.state.scrollAreaHeight - this.state.scrollWrapperHeight

    // Max Scroll Down
    if(next > lowerEnd) next = lowerEnd

    // Max Scroll Up
    else if(next < 0) next = 0

    // Update the Vertical Value
    this.setState({
      top: next,
      vMovement: next / this.state.scrollAreaHeight * 100
    })
  }

  normalizeHorizontal(next){
    // Horizontal Scrolling
    let rightEnd = this.state.scrollAreaWidth - this.state.scrollWrapperWidth

    // Max Scroll Right
    if(next > rightEnd) next = rightEnd;

    // Max Scroll Right
    else if(next < 0) next = 0

    // Update the Horizontal Value
    this.setState({
      left: next,
      hMovement: next / this.state.scrollAreaWidth * 100
    })
  }

  handleChangePosition(movement, orientation){
    // Make sure the content height is not changed
    this.calculateSize(() => {
      // Convert Percentage to Pixel
      let next = movement / 100
      if( orientation == 'vertical' ) this.normalizeVertical( next * this.state.scrollAreaHeight )
      if( orientation == 'horizontal' ) this.normalizeHorizontal( next * this.state.scrollAreaWidth )
    })
  }

  handleScrollbarDragging(){
    this.setState({ dragging: true })
  }

  handleScrollbarStopDrag(){
    this.setState({ dragging: false })
  }

  getSize(){
    // The Elements
    let $scrollArea = this.refs.scrollArea
    let $scrollWrapper = this.refs.scrollWrapper

    // Get new Elements Size
    let elementSize = {
      // Scroll Area Height and Width
      scrollAreaHeight: $scrollArea.children[0].clientHeight,
      scrollAreaWidth: $scrollArea.children[0].clientWidth,

      // Scroll Wrapper Height and Width
      scrollWrapperHeight: $scrollWrapper.clientHeight,
      scrollWrapperWidth: $scrollWrapper.clientWidth,
    }

    return elementSize
  }

  calculateSize(cb){
    let elementSize = this.getSize()

    if( elementSize.scrollWrapperHeight != this.state.scrollWrapperHeight ||
        elementSize.scrollWrapperWidth != this.state.scrollWrapperWidth ||
        elementSize.scrollAreaHeight != this.state.scrollAreaHeight ||
        elementSize.scrollAreaWidth != this.state.scrollAreaWidth )
    {
      // Set the State!
      this.setState({

        // Scroll Area Height and Width
        scrollAreaHeight: elementSize.scrollAreaHeight,
        scrollAreaWidth: elementSize.scrollAreaWidth,

        // Scroll Wrapper Height and Width
        scrollWrapperHeight: elementSize.scrollWrapperHeight,
        scrollWrapperWidth: elementSize.scrollWrapperWidth,

        // Make sure The wrapper is Ready, then render the scrollbar
        ready: true
      }, () => cb ? cb() : false)
    }

    else return cb ? cb() : false
  }

  componentDidMount() {
    this.calculateSize()

    // Attach The Event for Responsive View~
    window.addEventListener('resize', this.calculateSize.bind(this))
  }

  componentWillUnmount(){
    // Remove Event
    window.removeEventListener('resize', this.calculateSize.bind(this))
  }

}

// The Props
ScrollWrapper.propTypes = {
  speed: React.PropTypes.number,
  className: React.PropTypes.string
}

ScrollWrapper.defaultProps = {
  speed: 53,
  className: ""
}


