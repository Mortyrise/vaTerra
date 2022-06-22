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
      // console.log('filteredData', newData);
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
        <Text>Loading...</Text>
      ) : (
        <View>
          <TextInput
            style={styles.searchBar}
            onChangeText={(text) => searchFilterFunction(text)}
            placeholder="Search plant by it's common name"
            value={search}
          />
          <View style={styles.dropdownCont}>
            <SelectDropdown
              buttonStyle={styles.dropdown}
              data={filteredPlants}
              onSelect={(selectedItem) => {
                setPlantObject(selectedItem);
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
              // dropdownBackgroundColor="#009c97"
              // style={styles.searchButton}
            />
          </View>
          {selectedPlant && (
            <View style={{ marginTop: 10 }}>
              <Text style={styles.plantText}>
                Plant selected: {selectedPlant.common[0]}
              </Text>
              <Text style={styles.plantText}>
                Family: {selectedPlant.family}
              </Text>
              <Text style={styles.plantText}>
                Latin name: {selectedPlant.latin}
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
  plantText: {
    marginTop: 10,
    fontFamily: Platform.OS === 'ios' ? 'AppleSDGothicNeo-Thin' : 'Roboto',
    fontSize: 15,
  },
  dropdownCont: {
    alignItems: 'center',
  },
  dropdown: {
    backgroundColor: '#009c97',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
  },
  searchButton: {
    backgroundColor: '#009c97',
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
