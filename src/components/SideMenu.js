import React, { Component } from 'react';
import { Animated, Dimensions } from 'react-native';
import { connect } from 'react-redux';


class SideMenu extends Component {
  
  state = {
    _sideMenuOpen: null
  };

  static getDerivedStateFromProps(props, state) {
    if(state._sideMenuOpen === null) {
      state._sideMenuOpen = props.sideMenuOpen;
      return state;
    }
    
    if(props.sideMenuOpen !== state._sideMenuOpen) {
      if(props.sideMenuOpen) {
        Animated.timing(props.sideMenuValue, {
          toValue: 0, duration: 500
        }).start();
      } else {
        Animated.timing(props.sideMenuValue, {
          toValue: -200, duration: 500
        }).start();
      }
      state._sideMenuOpen = props.sideMenuOpen;
        return state;
    }
    return null;
  }
  
  render() {
    return (
      <Animated.View style={{
        right:this.props.sideMenuValue,
        backgroundColor:'black',
        maxWidth:200,
        minWidth:200,
        minHeight: Dimensions.get('window').height - 100,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position:'absolute',
        backgroundColor:'white',
        top:100
      }}>
        {this.props.children}
      </Animated.View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sideMenuValue: state.application.sideMenuValue,
    sideMenuOpen: state.application.sideMenuOpen
  }
};

export default connect(mapStateToProps, {})(SideMenu);