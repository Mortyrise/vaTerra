import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  VariantsBox,
} from 'react-native';
import React from 'react';
import { useState, useEffect } from 'react';
import { getPlants } from '../utils/service';
import SelectDropdown from 'react-native-select-dropdown';

const PlantSearchBar = ({ setPlantObject }) => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [allPlants, setAllPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);

  const data = async () => {
    try {
      const filteredData = await getPlants();
      setFilteredDataSource(filteredData);
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
        const itemData = item.common[0] ? item.common[0].toLowerCase() : ''.toLowerCase();
        return itemData.indexOf(textInput.toLowerCase()) > -1;
      });
      // console.log('filteredData', newData);
      setFilteredDataSource(newData);
      setSearch(textInput);
    } else {
      setFilteredDataSource(allPlants);
      setSearch(textInput);
    }
  };

  return (
    <View style={styles.searchBarContainer}>
      <TextInput
        round
        style={styles.searchBar}
        onChangeText={(text) => searchFilterFunction(text)}
        onClear={(text) => searchFilterFunction('')}
        placeholder="Search plant by it's common name"
        value={search}
      />
      <SelectDropdown
        data={filteredDataSource}
        onSelect={(selectedItem, index) => {
          setPlantObject(selectedItem);
        }}
        defaultButtonText={'Search plant'}
        buttonTextAfterSelection={(selectedItem, index) => {
          setSelectedPlant(selectedItem);
          return 'Search Plant';
        }}
        rowTextForSelection={(item, index) => {
          return item.common[0];
        }}
        // dropdownBackgroundColor="#009c97"
        style={styles.searchButton}
      />
      {selectedPlant && (
        <View style={{ marginTop: 10 }}>
          <Text style={styles.plantText}>Plant selected: {selectedPlant.common[0]}</Text>
          <Text style={styles.plantText}>Family: {selectedPlant.family}</Text>
          <Text style={styles.plantText}>Latin name: {selectedPlant.latin}</Text>
        </View>
      )}
    </View>
  );
};

export default PlantSearchBar;

const styles = StyleSheet.create({
  plantText: {
    marginTop: 10,
    fontFamily: 'Roboto',
    fontSize: 15,
  },
  searchButton: {
    backgroundColor: '#009c97',
  },
  searchBar: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: '#009c97',
    padding: 10,
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
