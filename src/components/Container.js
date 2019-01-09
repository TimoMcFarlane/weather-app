import React, {Component} from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, TouchableHighlight, FlatList, Dimensions, Modal, KeyboardAvoidingView, Image } from 'react-native';
import { connect } from 'react-redux';
import Header from './Header';
import { toggleDataTab, toggleModal, toggleSideMenu } from '../data/application/actions';
import { newLocationOnChange, addNewLocation, loadLocations } from '../data/location/actions';
import { fetchWeather, WEATHER, FORECAST } from '../data/api/actions';
import SideMenu from './SideMenu';
import { ICON_BASE_URL } from 'react-native-dotenv';
import _ from 'lodash';

const weather = 'Weather';
const forecast = 'Forecast';

class Container extends Component {
  
  componentWillMount() {
    let { selectedLocation, weatherActive } = this.props;
    this.props.fetchWeather(selectedLocation, weatherActive ? WEATHER : FORECAST);
  }

  toggleTab = (val) => {
    let { weatherActive, forecastActive, selectedLocation } = this.props;

    switch(val) {
      case weather:
        if(!weatherActive) {
          this.props.fetchWeather(selectedLocation, WEATHER);
          this.props.toggleDataTab();
        }    
      break;
      case forecast:
        if(!forecastActive) {
          this.props.fetchWeather(selectedLocation, FORECAST);
          this.props.toggleDataTab();
        }
      break;
      default:
        return null;
    }
  };

  removeLocation = (location) => {
    let { locations } = this.props;
    let index = locations.findIndex(loc => loc.name === location.item.name);
    if(index >= 0) {
      let newLocations = locations.filter(loc => loc.name !== location.item.name)
      this.props.addNewLocation([...newLocations]);
      this.props.loadLocations();
    }
  }

  setLocationAsSelected = (location) => {
    let { locations, weatherActive, error } = this.props;
    location.item.selected = true;
    let index = locations.findIndex(loc => {return loc.name == location.item.name})
    locations.splice(index, 1, location.item);
    index = locations.findIndex(loc => loc.name !== location.item.name && loc.selected)
    index >= 0 ? locations[index].selected = false : null;
    
    this.props.addNewLocation(locations);
    this.props.loadLocations();
    this.props.fetchWeather(location.item.name, weatherActive ? WEATHER : FORECAST);
    this.props.toggleSideMenu();
  };

  convertDtToDate = (dt) => {
    return (
      new Date(dt*1000).toLocaleString('en-GB', { timeZone: 'UTC' })
    );
  }

  render() {
    let { 
      weatherActive, forecastActive, 
      locations, modalVisible, 
      weatherData, forecastData,
      error, selectedLocation
    } = this.props;
    
    return (
      <View style={[styles.container]}>
        <Header title={selectedLocation} />
        
        {
          !_.isEmpty(forecastData) && forecastActive &&
          <FlatList 
            style={styles.flatlist}
            data={forecastData.list}
            renderItem={({item}) => (
              <View style={styles.itemWrapper}>
                <View style={{flexDirection:'column', justifyContent:'space-evenly', paddingTop:20}}>
                  <Text style={styles.item}>{item.weather[0].main}</Text>
                  <Text style={styles.item}>
                    {
                      this.convertDtToDate(item.dt)
                    }
                  </Text>
                </View>
                <View style={{flexDirection:'column', alignItems:'center'}}>
                  <Image style={{width:50, height:50}} source={{uri: `${ICON_BASE_URL}${item.weather[0].icon}.png`}} />
                  <Text style={styles.item}>{item.main.temp}°C</Text>
                </View>
              </View>
            )}
            extraData={this.props.selectedLocation}
            keyExtractor={(item, index) => `forecast-${index}`}
          />
        }
          
        {
          !_.isEmpty(weatherData) && weatherActive &&
          <View style={[styles.flatlist, {justifyContent:'center', alignItems:'center'}]}>
            <Text style={{fontSize:30}}>{weatherData.weather[0].main}</Text>
            <Image style={{width:200, height:200}} source={{uri: `${ICON_BASE_URL}${weatherData.weather[0].icon}.png`}} />
            <Text style={{fontSize:25}}>{weatherData.main.temp}</Text>            
          </View>
        }

        {
          _.isEmpty(forecastData) && forecastActive
          &&
          <View style={[styles.flatList, {"minHeight": Dimensions.get("window").height - 170}]} />
        }

        {
          _.isEmpty(weatherData) && weatherActive 
          &&
          <View style={[styles.flatList, {"minHeight": Dimensions.get("window").height - 170}]} />
        }

        {
          error &&
          <View style={styles.errorWrapper}>
            <Text style={styles.errorText}>Error fetching data...</Text>
          </View>
        }

        <View style={styles.tabWrapper}>
          <TouchableOpacity style={styles.btn} onPress={() => {this.toggleTab(weather)}}>
            <Text style={[styles.btnText, weatherActive && styles.active]}>Weather</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => {this.toggleTab(forecast)}}>
            <Text style={[styles.btnText, forecastActive && styles.active]}>Forecast</Text>
          </TouchableOpacity>
        </View>
       
        <SideMenu>
          {
            locations.length > 0 && 
              <FlatList 
                styles={styles.flatlist}
                data={locations}
                renderItem={(location) => (
                  <View style={styles.menuItemWrapper}>
                    <TouchableOpacity 
                      onPress={() => {
                        this.setLocationAsSelected(location);
                      }} >
                      <Text style={[styles.menuItem, location.item.selected && styles.activeMenuItem]}>{location.item.name}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                      this.removeLocation(location);
                    }}>
                      <View style={styles.removeLocation}><Text style={{color:'white'}}>X</Text></View>
                    </TouchableOpacity>
                  </View>
                  
                )}
                keyExtractor={(location, index) => `location-${index}`}
                />
            ||
            locations.length < 1 &&
            <View style={[styles.flatList, {"minHeight": Dimensions.get("window").height - 170}]} />
          }
          <View style={[styles.tabWrapper, {"backgroundColor":"#305080", "borderTopColor":"#406090"}]}>
          <TouchableOpacity style={styles.btn} onPress={() => {this.props.toggleModal()}}>
            <Text style={[styles.btnText]}>Add location</Text>
          </TouchableOpacity>
          </View>
        </SideMenu>
        

          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}>
            <KeyboardAvoidingView behavior={'padding'} style={styles.modalWrapper}>
              <View style={styles.modal}>
                <Text style={{'fontSize':20}}>Add new location</Text>
                <TextInput 
                  style={styles.modalInput} 
                  placeholder={'City name...'}
                  returnKeyType={'done'}
                  onChangeText={(val) => this.props.newLocationOnChange(val)}
                />
                <View style={styles.modalBtnWrapper}>
                  <TouchableOpacity
                    style={styles.modalBtn}
                    onPress={() => {
                      this.props.toggleModal();
                    }}>
                    <Text style={{"color":"white"}}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalBtn}
                    onPress={() => {
                      this.props.addNewLocation([{name:this.props.locationToBeAdded, selected: false}, ...locations]);
                      this.props.loadLocations();
                      this.props.toggleModal();
                    }}>
                    <Text style={{"color":"white"}}>Ok</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </Modal>
        </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    weatherData: state.api.weather,
    forecastData: state.api.forecast,
    weatherActive: state.application.weatherActive,
    forecastActive: state.application.forecastActive,
    locations: state.location.locations,
    locationToBeAdded: state.location.locationToBeAdded,
    modalVisible: state.application.modalVisible,
    selectedLocation: state.location.selectedLocation,
    error: state.api.error
  }
};

export default connect(mapStateToProps, { toggleDataTab, toggleModal, toggleSideMenu, newLocationOnChange, addNewLocation, loadLocations, fetchWeather })(Container);

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    minWidth:'100%',
    backgroundColor:'#eee',
    flex: 1,
    flexDirection: 'column'
  },
  flatlist: {
    flex:9,
    minWidth: '100%'
  },
  itemWrapper: {
    minWidth: '100%',
    minHeight: 100,
    maxHeight: 100,
    flexDirection:'row',
    justifyContent:'space-evenly',
    padding:20
  },
  item: {
    fontSize:16
  },
  removeLocation: {
    minWidth:30,
    maxWidth:30,
    maxHeight:30,
    minHeight:30,
    borderRadius:5,
    backgroundColor: 'red',
    justifyContent:'center',
    alignItems:'center',
  },
  menuItemWrapper: {
    flex:1,
    minWidth: '100%',
    maxWidth:200,
    minHeight: 50,
    maxHeight: 50,
    alignItems:'center',
    justifyContent:'space-between',
    padding:10,
    flexDirection: 'row'
  },
  menuItem: {
    fontSize: 18,
  },
  activeMenuItem: {
    textDecorationLine:'underline',
  },
  tabWrapper: {
    flex:1,
    minWidth: '100%',
    minHeight: 70,
    maxHeight: 70,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-evenly',
    borderTopColor: '#305080',
    backgroundColor: '#406090'
  },
  btn: {
    height: '100%',
    width: '50%',
    color:'white',
    textAlign:'center',
    justifyContent: 'center',
    alignItems:'center'
  },
  btnText: {
    fontSize: 14,
    color:'white'
  },
  active: {
    textDecorationLine:'underline'
  },
  modalWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'rgba(0,0,0,0.6)'
  },
  modal: {
    flex:1,
    maxWidth:'80%',
    minWidth:'80%',
    maxHeight:'40%',
    backgroundColor:'white',
    borderRadius:5,
    padding:20,
    position:'relative'
  },
  modalInput: {
    height: 50,
    borderBottomWidth:2,
    borderBottomColor: '#305080',
    padding: 0,
    marginTop:15
  },
  modalBtnWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems:'flex-end',
    minWidth:'100%'
  },
  modalBtn: {
    width: '30%',
    backgroundColor:'#305080',
    maxHeight:40,
    minHeight:40,
    justifyContent:'center',
    alignItems:'center'
  },
  errorWrapper: {
    flex: 1,
    justifyContent: 'center',
    position:'absolute',
    top:100,
    left:0,
    width: '100%',
    height: Dimensions.get('window').height - 100,
    backgroundColor: 'rgba(255,255,255,0.85)',
    alignItems: 'center'
  },
  errorText: {
    fontSize:24,
  }
})