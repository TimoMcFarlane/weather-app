import React from 'react';
import { StyleSheet, View, ActivityIndicator, StatusBar, Text } from 'react-native';
import { connect } from 'react-redux';
import Container from './Container';
import { fetchWeather, WEATHER, FORECAST } from '../data/api/actions';
import { loadLocations, clearLocations } from '../data/location/actions';

class ViewWrapper extends React.Component {
  
  componentWillMount() {
    //this.props.clearLocations();
    this.props.loadLocations();
  }

  render() {
    let { loading, selectedLocation } = this.props;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
        {
          selectedLocation !== null && <Container /> 
        }
        {
          loading &&
          <View style={styles.loaderWrapper}><ActivityIndicator size="large" color="#406090" /></View>
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
    backgroundColor: 'rgba(255,255,255,0.85)'
  },
  
});

const mapStateToProps = (state) => {
  return {
    loading: state.application.loading,
    locations: state.location.locations,
    selectedLocation: state.location.selectedLocation,
    weatherActive: state.application.weatherActive,
    error: state.api.error
  };
};

export default connect(mapStateToProps, { fetchWeather, loadLocations, clearLocations })(ViewWrapper);