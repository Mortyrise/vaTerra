import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { firebase } from '../utils/config';
import * as ImagePicker from 'expo-image-picker';
import SearchBar from '../components/SearchBar';
import { addPlantToUser } from '../utils/service';
import Slider from '@react-native-community/slider';
import addDaystoDate from '../utils/helperFunctions';

function AddPlant() {
  const [nickNameText, onChangeNickNameText] = React.useState('');
  const [plantImgURI, setPlantImgURI] = React.useState(null);
  const [uploading, setUploading] = useState(false);
  const [plantUri, setPlantUri] = useState(null);
  const [plantObject, setPlantObject] = useState(null);
  const [waterReminder, setWaterReminder] = useState(5);

  const submitPlant = () => {
    if (!plantUri) {
      Alert.alert(
        'please upload an Image before adding the plant to your hibernacle :)'
      );
    } else {
      if (!plantObject) {
        Alert.alert(
          'Please select a Plant before adding it to your hibernacle :)'
        );
      } else {
        const plantSchema = {
          ...plantObject,
          imagePath: plantUri,
          nickName: nickNameText,
          wateringReminderInterval: waterReminder,
          nextReminderDate: addDaystoDate(waterReminder),
        };

        addPlantToUser(plantSchema);
        Alert.alert('Your plant has been added to your hibernacle :)');
        setPlantUri(null);
        setPlantObject({});
        setWaterReminder(null);
      }
    }
  };

  const hasMediaLibraryPermissionGranted = async () => {
    let granted = false;
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.canAskAgain || permission.status === 'denied') {
      granted = false;
    }
    if (permission.granted) {
      granted = true;
    }
    return granted;
  };
  const pickImage = async () => {
    const storagePermissionGranted = await hasMediaLibraryPermissionGranted();
    if (!storagePermissionGranted) return plantImgURI;
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });
    if (!result.cancelled) {
      const source = { uri: result.uri };
      setPlantImgURI(source);
    }
    return plantImgURI;
  };

  const uploadImage = async () => {
    setUploading(true);
    const response = await fetch(plantImgURI.uri);
    const blob = await response.blob();
    const filename = plantImgURI.uri.substring(
      plantImgURI.uri.lastIndexOf('/') + 1
    );
    try {
      let snapshot = await firebase.storage().ref().child(filename).put(blob);
      let url = await snapshot.ref.getDownloadURL();
      setUploading(false);
      Alert.alert('Your photo has been updated');
      setPlantUri(url);
      setPlantImgURI(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text
          style={{
            marginTop: 70,
            fontSize: 16,
            fontWeight: 'bold',
            fontFamily: 'Roboto',
            color: '#009c97',
            letterSpacing: 3,
          }}
        >
          Add a new plant to your hibernacle
        </Text>
        <TextInput
          placeholder="Add your new plant nickname"
          onChangeText={onChangeNickNameText}
          value={nickNameText}
          style={styles.input}
        ></TextInput>
        <SearchBar setPlantObject={setPlantObject} />
        <View style={{ width: 280 }}>
          {plantObject && <Text>Watering advice: {plantObject.watering}</Text>}
        </View>
        <View>
          <Text style={{}}>
            Depending on your local weather, set the interval of the reminders
            for this plant
          </Text>
          <Slider
            style={{ width: 300, height: 40 }}
            minimumValue={1}
            maximumValue={15}
            minimumTrackTintColor={'#009c97'}
            onValueChange={(value) => {
              setWaterReminder(Math.floor(value));
            }}
            thumbTintColor={'#009c97'}
          />
          <Text>{waterReminder}</Text>
        </View>
        <View style={styles.uploadimage}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Pressable
              title="Pick an image from camera roll"
              onPress={pickImage}
              style={styles.imgButton}
            >
              <Text
                style={{ color: 'white', fontSize: 16, textAlign: 'center' }}
              >
                Pick an Image from your gallery
              </Text>
            </Pressable>
            <Pressable onPress={uploadImage} style={styles.imgButton}>
              <Text
                style={{ color: 'white', fontSize: 16, textAlign: 'center' }}
              >
                Upload Image
              </Text>
            </Pressable>
          </View>
          {plantImgURI && (
            <Image
              source={{ uri: plantImgURI.uri }}
              style={styles.plantImage}
            />
          )}
        </View>
        <Pressable onPress={submitPlant} style={styles.imgButton}>
          <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>
            ADD PLANT
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imgButton: {
    padding: 5,
    backgroundColor: '#009c97',
    marginTop: 20,
    borderRadius: 5,
    width: 160,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 13,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: '100%',
  },
  searchBar: {
    borderRadius: 80,
    height: 40,
    width: 280,
    fontSize: 12,
  },
  input: {
    width: 300,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    alignContent: 'center',
    textAlign: 'right',
    borderColor: '#009c97',
    marginTop: 60,
  },
  plantImage: {
    height: 213,
    width: 160,
    borderWidth: 1,
    padding: 5,
    marginTop: 10,
    borderRadius: 60,
  },
  uploadimage: { alignItems: 'center', justifyContent: 'center', flex: 1 },
});
export default AddPlant;
