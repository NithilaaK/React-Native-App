import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import axios from 'axios';
export default class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
      imagePath: '',
      url: `http://localhost:5000/star?name=${this.props.navigation.getParam(
        'star_name'
      )}`,
    };
  }

  componentDidMount() {
    this.getDetails();
  }
  getDetails = () => {
    const { url } = this.state;
    axios
      .get(url)
      .then((response) => {
        this.setDetails(response.data.data);
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  setDetails = (starDetails) => {
    this.setState({
      details: starDetails,
    });
  };

  render() {
    const { details, imagePath } = this.state;
    //if (details.specifications) {
    return (
      <View style={styles.container}>
        <Card
          style={{ marginBottom: 10, borderRadius: 101 }}
          backgroundColor="#6F367D">
          <View style={styles.upperContainer}>
            <Text style={styles.starName}>{details.name}</Text>
          </View>
          <Text style={styles.text}></Text>
          <Text style={styles.text}>Mass: {details.mass} M☉</Text>
          <Text style={styles.text}>
            Gravity: {Math.round(details.gravity)} G
          </Text>
          <Text style={styles.text}>Radius: {details.radius} R☉</Text>
          <Text style={styles.text}>
            Distance from Earth: {details.distance} ly
          </Text>
        </Card>
      </View>
    );
  }
  //return null;
  //}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#404BE3',
  },
  starName: {
    fontFamily: 'Verdana',
    fontSize: 25,
    textAlign: 'center',
    marginBottom:5,
  },
});
