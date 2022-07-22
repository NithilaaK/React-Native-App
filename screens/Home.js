import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Text,
  ScrollView,
} from 'react-native';
import { Card } from 'react-native-elements';
import { Header, SearchBar } from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';
import axios from 'axios';

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      dataSource: [],
      search: '',
    };
  }

  componentDidMount() {
    this.getData();
  }

  updateSearch = (search) => {
    this.setState({ search });
  };

  getData = async () => {
    const url = 'http://localhost:5000/';
    axios
      .get(url)
      .then((response) => {
        this.setState({ data: response.data.data });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  searchFilterFunction(text) {
    const newData = this.state.data.filter((item) => {
      const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      search: text,
    });
    console.log(this.state.dataSource)
  }

  renderItems = ({ item, index }) => (
    <View>
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('Details', { star_name: item.name })
        }
        style={{ backgroundColor: '#404BE3', padding: 10, margin: 9 }}>
        <Text
          style={{
            fontFamily: 'Verdana',
            fontSize: RFValue(25),
            textAlign: 'center',
            color: 'white',
          }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    </View>
  );

  keyExtractor = (item, index) => index.toString();

  render() {
    const { data } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Header
            centerComponent={{
              text: 'Stars',
              style: styles.headerTitle,
            }}
            backgroundColor={'#421A92'}
          />
          <SearchBar 
          round
          placeholder="Search"
          onChangeText={(text) => this.searchFilterFunction(text)}
          onClear={(text) => this.searchFilterFunction('')}
          value={this.state.search}
          containerStyle={{backgroundColor: '#062951', top:-1}}/>
        </View>
        <View style={styles.upperContainer}>
        <Text style={{
            fontFamily: 'Verdana',
            fontSize: RFValue(16),
            textAlign: 'center',
            color: 'white',
            padding: 10,
          }}>Click on a star's name to learn more about it!!!</Text>
          <FlatList
            scrollEnabled={false}
            data={this.state.search === "" ?  this.state.data: this.state.dataSource}
            renderItem={this.renderItems}
            keyExtractor={this.keyExtractor}
            bounces={false}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 0.1,
    backgroundColor: '#151531',
  },
  headerTitle: {
    color: '#fff',
    fontSize: RFValue(28),
    fontWeight: 'bold',
    fontFamily: 'Verdana',
  },
  upperContainer: {
    flex: 1,
    backgroundColor: '#062951',
    paddingTop: 2,
    position: 'absolute',
    top: 108,
    width:316.5,
  },
});
