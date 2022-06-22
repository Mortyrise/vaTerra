import { StyleSheet, Text, View, TextInput, Platform } from 'react-native';
import React from 'react';
import { useState, useEffect } from 'react';
import { getPlants } from '../utils/service';
import SelectDropdown from 'react-native-select-dropdown';

const PlantSearchBar = ({ setPlantObject }) => {
  const [search, setSearch] = useState('');
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [allPlants, setAllPlants] = useState(null);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [plantName, setPlantName] = useState('');

  const data = async () => {
    try {
      const filteredData = await getPlants();
      setFilteredPlants(filteredData);
      setAllPlants(filteredData);
    } catch (error) {
      console.log('ErrorData:', error);
    }
  };
  useEffect(() => {
    data();
  }, []);

  const searchFilterFunction = (textInput) => {
    if (textInput) {
      const newData = allPlants.filter(function (item) {
        const itemData = item.common[0]
          ? item.common[0].toLowerCase()
          : ''.toLowerCase();
        return itemData.indexOf(textInput.toLowerCase()) > -1;
      });
      setFilteredPlants(newData);
      setSearch(textInput);
    } else {
      setFilteredPlants(allPlants);
      setSearch(textInput);
    }
  };

  return (
    <View style={styles.searchBarContainer}>
      {!allPlants ? (
        <Text>Loading Plant Database...</Text>
      ) : (
        <View>
          {/* <TextInput
            style={styles.searchBar}
            onChangeText={(text) => searchFilterFunction(text)}
            placeholder="Search plant by it's name"
            value={plantName}
          /> */}
          <View style={styles.dropdownCont}>
            <SelectDropdown
              buttonStyle={styles.dropdown}
              data={filteredPlants}
              onSelect={(selectedItem) => {
                setPlantObject(selectedItem);
                setPlantName(selectedItem);
              }}
              defaultButtonText={`Select plant (${
                filteredPlants ? filteredPlants.length : ''
              })`}
              buttonTextStyle={styles.buttonText}
              buttonTextAfterSelection={(selectedItem) => {
                setSelectedPlant(selectedItem);
                return `Selected plant:`;
              }}
              rowTextForSelection={(item) => {
                return item.common[0];
              }}
            />
          </View>
          {selectedPlant && (
            <View style={styles.newPlantCont}>
              <Text style={styles.plantTextTitle}>Welcome to the family!</Text>
              <Text style={styles.plantText}>
                Your new Plant is a:{' '}
                <Text style={styles.underline}>{selectedPlant.common[0]}</Text>
              </Text>
              <Text style={styles.plantText}>
                ☀️ It's ideal Lighting is :{' '}
                <Text style={styles.underline}>{selectedPlant.ideallight}</Text>
              </Text>
              <Text style={styles.plantText}>
                🌱 It Belongs to the{' '}
                <Text style={styles.underline}>{selectedPlant.category}</Text>{' '}
                family
              </Text>
              <Text style={styles.plantText}>
                🌡 It's happiest when the temperature is between{' '}
                <Text style={styles.underline}>
                  {selectedPlant.tempmax.celsius}°C
                </Text>{' '}
                and{' '}
                <Text style={styles.underline}>
                  {selectedPlant.tempmin.celsius}°C
                </Text>
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default PlantSearchBar;

const styles = StyleSheet.create({
  plantTextTitle: {
    marginTop: 10,
    fontFamily: Platform.OS === 'ios' ? 'AppleSDGothicNeo-Thin' : 'Roboto',
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  plantText: {
    marginTop: 17,
    fontFamily: Platform.OS === 'ios' ? 'AppleSDGothicNeo-Thin' : 'Roboto',
    fontSize: 18,
    fontWeight: 'normal',
  },
  underline: {
    textDecorationLine: 'underline',
    textDecorationColor: '#009c97',
  },
  dropdownCont: {
    alignItems: 'center',
    borderRadius: 10,
  },
  dropdown: {
    backgroundColor: '#009c97',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
  },
  searchButton: {
    backgroundColor: '#009c97',
  },
  newPlantCont: {
    margin: 10,
    alignItems: 'flex-start',
    borderColor: '#009c97',
    backgroundColor: '#fff',
    borderWidth: 3,
    borderRadius: 10,
    padding: 10,
  },
  searchBar: {
    height: 50,
    margin: 12,
    borderWidth: 3,
    borderColor: '#009c97',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 300,
    textAlign: 'right',
  },
  icon: {
    marginRight: 5,
    width: 18,
    height: 18,
  },
  searchBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
