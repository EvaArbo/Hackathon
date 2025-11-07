import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function FindScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const foodListings = [
    {
      id: 1,
      type: 'Pizza',
      description: '4 large pizzas from office party',
      quantity: '16 slices',
      distance: '0.3 miles',
      freshness: '2-3 hours',
      donor: 'Tech Office',
      time: '30 min ago'
    },
    {
      id: 2,
      type: 'Sandwiches',
      description: 'Assorted deli sandwiches',
      quantity: '8 sandwiches',
      distance: '0.7 miles',
      freshness: '4-5 hours',
      donor: 'Cafe Downtown',
      time: '1 hour ago'
    },
    {
      id: 3,
      type: 'Salad & Soup',
      description: 'Fresh garden salads and tomato soup',
      quantity: '6 servings',
      distance: '1.1 miles',
      freshness: '3-4 hours',
      donor: 'Restaurant',
      time: '45 min ago'
    }
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Find Food</Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by food type or location..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Filters */}
      <ScrollView horizontal style={styles.filters} showsHorizontalScrollIndicator={false}>
        <TouchableOpacity style={styles.filterChip}>
          <Text style={styles.filterText}>🍕 Pizza</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterChip}>
          <Text style={styles.filterText}>🥪 Sandwiches</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterChip}>
          <Text style={styles.filterText}>🥗 Salads</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterChip}>
          <Text style={styles.filterText}>🍜 Hot Meals</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Food Listings */}
      <ScrollView style={styles.listings}>
        {foodListings.map((item) => (
          <TouchableOpacity key={item.id} style={styles.listingCard}>
            <View style={styles.listingHeader}>
              <Text style={styles.foodType}>{item.type}</Text>
              <Text style={styles.timePosted}>{item.time}</Text>
            </View>
            
            <Text style={styles.description}>{item.description}</Text>
            
            <View style={styles.listingDetails}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Quantity:</Text>
                <Text style={styles.detailValue}>{item.quantity}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Distance:</Text>
                <Text style={styles.detailValue}>{item.distance}</Text>
              </View>
            </View>

            <View style={styles.freshnessBar}>
              <Text style={styles.freshnessLabel}>🕒 Fresh for: {item.freshness}</Text>
              <View style={styles.freshnessIndicator}>
                <View style={[styles.freshnessFill, { width: '70%' }]} />
              </View>
            </View>

            <View style={styles.listingFooter}>
              <Text style={styles.donorName}>From: {item.donor}</Text>
              <TouchableOpacity style={styles.claimButton}>
                <Text style={styles.claimText}>Claim</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Emergency Request */}
      <TouchableOpacity style={styles.emergencyButton}>
        <Text style={styles.emergencyText}>🚨 Emergency Food Request</Text>
      </TouchableOpacity>
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
    padding: 20,
    paddingTop: 50,
  },
  backButton: {
    fontSize: 18,
    color: '#2196F3',
    marginRight: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d5016',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 10,
  },
  filterButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
  },
  filterIcon: {
    fontSize: 20,
  },
  filters: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterChip: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filterText: {
    fontSize: 14,
    color: '#333',
  },
  listings: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listingCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  listingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  foodType: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d5016',
  },
  timePosted: {
    fontSize: 12,
    color: '#666',
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },
  listingDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  freshnessBar: {
    marginBottom: 15,
  },
  freshnessLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  freshnessIndicator: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
  },
  freshnessFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 3,
  },
  listingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  donorName: {
    fontSize: 14,
    color: '#666',
  },
  claimButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  claimText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  emergencyButton: {
    backgroundColor: '#ff4444',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  emergencyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});