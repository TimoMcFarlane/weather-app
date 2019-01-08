import React, {Component} from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, TouchableHighlight, FlatList, Dimensions, Modal, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import Header from './Header';
import { toggleDataTab, toggleModal } from '../data/application/actions';
import SideMenu from './SideMenu';
import _ from 'lodash';
// Sidemenu
// Title
// Flatlist of locations
// add + button to bottom of menu

// Include error view between Header and Content
// If error happens when fetching data, only display error message under header

// TODO: ADD onRefresh method to weather flatlists

const weather = 'Weather';
const forecast = 'Forecast';

class Container extends Component {
  
  toggleTab = (val) => {
    let { weatherActive, forecastActive } = this.props;

    switch(val) {
      case weather:
        weatherActive ? null : this.props.toggleDataTab();      
      break;
      case forecast:
        forecastActive ? null : this.props.toggleDataTab();
      break;
      default:
        return null;
    }
  };

  render() {
    let { 
      weatherActive, forecastActive, 
      locations, modalVisible, 
      weatherData, forecastData 
    } = this.props;
    
    return (
      <View style={[styles.container]}>
        <Header title={weatherActive ? weather : forecast} />
        
        {
          !_.isEmpty(forecastData) && forecastActive &&
          <FlatList 
            style={styles.flatlist}
            data={forecastData.list}
            renderItem={({item}) => (
              <View style={styles.itemWrapper}>
                <Text style={styles.item}>{item.weather[0].main}</Text>
              </View>
            )}
            keyExtractor={(item, index) => `forecast-${index}`}
          />
        }
          
        {
          !_.isEmpty(weatherData) && weatherActive &&
          <FlatList 
            style={styles.flatlist}
            data={weatherData.weather}
            renderItem={({item}) => (
              <View style={styles.itemWrapper}>
                <Text style={styles.item}>{item.main}</Text>
              </View>
            )}
            keyExtractor={(item, index) => `weather-${index}`}
          />
        }

        {
          _.isEmpty(weatherData) && weatherActive 
          ||
          _.isEmpty(forecastData) && forecastActive
          &&
          <View style={[styles.flatList, {"minHeight": Dimensions.get("window").height - 170}]} />
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
                renderItem={({location}) => (
                  <View style={styles.itemWrapper}>
                    <Text style={styles.item}>{location}</Text>
                  </View>
                )}
                keyExtractor={(item, index) => `location-${index}`}
                />
            ||
            locations.length < 1 &&
            <View style={[styles.flatList, {"minHeight": Dimensions.get("window").height - 170}]} />
          }
          <View style={[styles.tabWrapper, {"backgroundColor":"#305080", "borderTopColor":"#406090"}]}>
          <TouchableOpacity style={styles.btn} onPress={() => {this.props.toggleModal()}}>
            <Text style={[styles.btnText]}>+</Text>
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
                  onChange={() => console.log('heyaa')}
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
    locations: state.application.locations,
    modalVisible: state.application.modalVisible
  }
};

export default connect(mapStateToProps, { toggleDataTab, toggleModal })(Container);

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
    minHeight: 50,
    maxHeight: 50
  },
  item: {

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
    fontSize: 18,
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
  }
})