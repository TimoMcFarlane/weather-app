import React from 'react';
import { StyleSheet, View, ActivityIndicator, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import Container from './Container';
import { fetchWeather, WEATHER, FORECAST } from '../data/api/actions';

class ViewWrapper extends React.Component {
  
  componentWillMount() {
    this.props.fetchWeather("Tampere", WEATHER);
  }

  render() {
    let { loading } = this.props;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
        { !loading && <Container /> }
        {
          loading &&
          <View style={styles.loaderWrapper}><ActivityIndicator size="large" color="#ff00dc" /></View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderWrapper: {
    flex: 1,
    justifyContent: 'center',
    position:'absolute',
    top:0,
    left:0,
    width: '100%',
    height:'100%',
    backgroundColor: 'rgba(0,0,0,0.85)'
  }
});

const mapStateToProps = (state) => {
  return {
    loading: state.application.loading,
  };
};

export default connect(mapStateToProps, { fetchWeather })(ViewWrapper);