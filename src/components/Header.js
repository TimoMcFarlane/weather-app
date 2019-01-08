import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { toggleSideMenu } from '../data/application/actions';

class Header extends Component {
  
  render() {
    let { menuOpen, toggleSideMenu, title } = this.props;
  
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{title}</Text>
        </View>
        <TouchableOpacity onPress={() => toggleSideMenu(!menuOpen)} style={styles.menuWrapper}>
          <View style={styles.menuItem} />
          <View style={styles.menuItem} />
          <View style={styles.menuItem} />
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    menuOpen: state.application.sideMenuOpen
  }
}

export default connect(mapStateToProps, { toggleSideMenu })(Header)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    minHeight: 100,
    maxHeight:100,
    flexDirection:'column',
    justifyContent:'center',
    borderBottomWidth: 1,
    borderBottomColor: '#305080',
    backgroundColor: '#406090'
  },
  header: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    minWidth:'100%',
    minHeight: '100%'
  },
  headerText: {
    fontSize: 26,
    color: 'white'
  },
  menuWrapper: {
    flex:1,
    position:'absolute',
    width:60,
    height:'100%',
    alignSelf:'flex-end',
    alignItems:'center',
    justifyContent:'center',
    paddingTop:5
  },
  menuItem: {
    flex: 1,
    width: '60%',
    maxHeight: 5,
    backgroundColor: 'white',
    marginBottom:5
  }
});