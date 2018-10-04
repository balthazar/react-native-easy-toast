/**
 * react-native-easy-toast
 * https://github.com/crazycodeboy/react-native-easy-toast
 * Email:crazycodeboy@gmail.com
 * Blog:http://jiapenghui.com
 * @flow
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  Animated,
  Dimensions,
  Text,
  ViewPropTypes as RNViewPropTypes,
} from 'react-native'

const ViewPropTypes = RNViewPropTypes || View.propTypes
const DURATION = { LENGTH_SHORT: 500, FOREVER: 0 }

export default class Toast extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isShow: false,
      text: '',
      opacityValue: new Animated.Value(this.props.opacity),
    }
  }

  show(text, duration, callback) {
    this.duration = typeof duration === 'number' ? duration : DURATION.LENGTH_SHORT
    this.callback = callback
    this.setState({ isShow: true, text })

    Animated.timing(this.state.opacityValue, {
      toValue: this.props.opacity,
      duration: this.props.fadeInDuration,
    }).start(() => {
      this.isShow = true
      if (duration !== DURATION.FOREVER) {
        this.close()
      }
    })
  }

  close(duration) {
    let delay = typeof duration === 'undefined' ? this.duration : duration

    if (delay === DURATION.FOREVER) {
      delay = this.props.defaultCloseDelay || 250
    }

    if (!this.isShow && !this.state.isShow) {
      return
    }

    if (this.timer) {
      clearTimeout(this.timer)
    }

    this.timer = setTimeout(() => {
      Animated.timing(this.state.opacityValue, {
        toValue: 0.0,
        duration: this.props.fadeOutDuration,
      }).start(() => {
        this.setState({ isShow: false })
        this.isShow = false
        if (typeof this.callback === 'function') {
          this.callback()
        }
      })
    }, delay)
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer)
  }

  render() {
    if (!this.state.isShow) {
      return null
    }

    const { position, positionValue, style, textStyle } = this.props
    const { text, opacityValue } = this.state
    const { height } = Dimensions.get('window')

    const posStyle = {
      top: { top: positionValue },
      center: { top: height / 2 },
      bottom: { bottom: positionValue },
    }

    return (
      <View style={[styles.container, posStyle[position]]} pointerEvents="none">
        <Animated.View style={[styles.content, { opacity: opacityValue }, style]}>
          {React.isValidElement(text) ? text : <Text style={textStyle}>{text}</Text>}
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    elevation: 999,
    alignItems: 'center',
    zIndex: 10000,
  },
  content: {
    backgroundColor: 'black',
    borderRadius: 5,
    padding: 10,
  },
  text: {
    color: 'white',
  },
})

Toast.propTypes = {
  style: ViewPropTypes.style,
  position: PropTypes.oneOf(['top', 'center', 'bottom']),
  textStyle: Text.propTypes.style,
  positionValue: PropTypes.number,
  fadeInDuration: PropTypes.number,
  fadeOutDuration: PropTypes.number,
  opacity: PropTypes.number,
}

Toast.defaultProps = {
  position: 'bottom',
  textStyle: styles.text,
  positionValue: 120,
  fadeInDuration: 500,
  fadeOutDuration: 500,
  opacity: 1,
}
