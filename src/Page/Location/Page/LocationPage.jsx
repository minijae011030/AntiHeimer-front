import {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView, RefreshControl} from 'react-native';

import RegisterButton from '../Component/RegisterButton';
import Map from '../Component/Map';

import GetGeoLocationFunction from '../Function/GetGeolocationFunction';
import PostGeolocationFunction from '../Function/PostGeolocationFunction';

function LocationPage({navigation}) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [location, setLocation] = useState(null);

  async function getGeoLocationFunction() {
    const res = await GetGeoLocationFunction();
    setLocation(res);
  }

  async function handleRefresh() {
    setIsRefreshing(true);
    getGeoLocationFunction();
    // PostGeolocationFunction({location: location});
    setIsRefreshing(false);
  }

  useEffect(() => {
    getGeoLocationFunction();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
        style={styles.scrollViewContent}>
        <View style={styles.subContainer}>
          <RegisterButton navigation={navigation} />
          <Map location={location} />
        </View>
      </ScrollView>
    </View>
  );
}

export default LocationPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  subContainer: {
    alignItems: 'center',
    paddingTop: 30,
  },
});