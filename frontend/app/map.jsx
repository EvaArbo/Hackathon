import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { getCurrentLocation } from '../services/location';

export default function MapScreen() {
  const router = useRouter();
  const [userLocation, setUserLocation] = useState(null);
  const [region, setRegion] = useState({
    latitude: 40.7128,
    longitude: -74.0060,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    loadUserLocation();
  }, []);

  const loadUserLocation = async () => {
    const location = await getCurrentLocation();
    if (location) {
      setUserLocation(location);
      setRegion({
        ...location,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  const mapLocations = [
    { id: 1, type: 'donation', name: 'Pizza Available', distance: '0.3 mi', lat: 40.7128, lng: -74.0060 },
    { id: 2, type: 'fridge', name: 'Community Fridge', distance: '0.5 mi', lat: 40.7589, lng: -73.9851 },
    { id: 3, type: 'shelter', name: 'Food Shelter', distance: '0.8 mi', lat: 40.7505, lng: -73.9934 },
    { id: 4, type: 'donation', name: 'Sandwiches Ready', distance: '1.1 mi', lat: 40.7282, lng: -73.7949 },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Food Map</Text>
        <TouchableOpacity style={styles.locationButton} onPress={loadUserLocation}>
          <Text style={styles.locationIcon}>📍</Text>
        </TouchableOpacity>
      </View>

      {/* Real Map */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={region}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          {mapLocations.map((location) => (
            <Marker
              key={location.id}
              coordinate={{ latitude: location.lat, longitude: location.lng }}
              title={location.name}
              description={location.distance}
              pinColor={location.type === 'donation' ? '#4CAF50' : location.type === 'fridge' ? '#2196F3' : '#FF9800'}
            />
          ))}
        </MapView>
      </View>

      {/* Map Legend */}
      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Map Legend</Text>
        <View style={styles.legendItems}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#4CAF50' }]} />
            <Text style={styles.legendText}>Food Donations</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#2196F3' }]} />
            <Text style={styles.legendText}>Community Fridges</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#FF9800' }]} />
            <Text style={styles.legendText}>Shelters & Food Banks</Text>
          </View>
        </View>
      </View>

      {/* Nearby Locations List */}
      <ScrollView style={styles.locationsList}>
        <Text style={styles.listTitle}>Nearby Locations</Text>
        {mapLocations.map((location) => (
          <TouchableOpacity key={location.id} style={styles.locationItem}>
            <View style={styles.locationInfo}>
              <Text style={styles.locationName}>
                {location.type === 'donation' && '🍽️'} 
                {location.type === 'fridge' && '🏠'} 
                {location.type === 'shelter' && '🏢'} 
                {location.name}
              </Text>
              <Text style={styles.locationDistance}>{location.distance} away</Text>
            </View>
            <TouchableOpacity style={styles.directionsButton}>
              <Text style={styles.directionsText}>Directions</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionBtn}>
          <Text style={styles.actionText}>🔍 Find Nearest</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Text style={styles.actionText}>📍 Add Location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 50,
  },
  backButton: {
    fontSize: 18,
    color: '#2196F3',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d5016',
  },
  locationButton: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 8,
  },
  locationIcon: {
    fontSize: 20,
  },
  mapContainer: {
    height: 250,
    margin: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  legend: {
    backgroundColor: 'white',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  legendItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 5,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
  locationsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  locationItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  locationDistance: {
    fontSize: 14,
    color: '#666',
  },
  directionsButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  directionsText: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
  quickActions: {
    flexDirection: 'row',
    padding: 20,
    gap: 10,
  },
  actionBtn: {
    flex: 1,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
});