import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>🍽️ Waste Not</Text>
        <Text style={styles.tagline}>Smart Leftover Food Matcher</Text>
      </View>

      {/* Main Actions */}
      <View style={styles.actions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.donateButton]}
          onPress={() => router.push('/donate')}
        >
          <Text style={styles.actionIcon}>📸</Text>
          <Text style={styles.actionTitle}>Donate Food</Text>
          <Text style={styles.actionSubtitle}>Share your leftovers</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, styles.findButton]}
          onPress={() => router.push('/find')}
        >
          <Text style={styles.actionIcon}>🔍</Text>
          <Text style={styles.actionTitle}>Find Food</Text>
          <Text style={styles.actionSubtitle}>Discover nearby donations</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Stats */}
      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>1,247</Text>
          <Text style={styles.statLabel}>Meals Saved</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>89</Text>
          <Text style={styles.statLabel}>Active Donors</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>156</Text>
          <Text style={styles.statLabel}>Recipients</Text>
        </View>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/map')}
        >
          <Text style={styles.navIcon}>🗺️</Text>
          <Text style={styles.navLabel}>Map</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/profile')}
        >
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: 50,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2d5016',
  },
  tagline: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 15,
    marginVertical: 30,
  },
  actionButton: {
    flex: 1,
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  donateButton: {
    backgroundColor: '#4CAF50',
  },
  findButton: {
    backgroundColor: '#2196F3',
  },
  actionIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  actionSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  stats: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    marginHorizontal: 5,
    borderRadius: 10,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d5016',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 5,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  navLabel: {
    fontSize: 12,
    color: '#666',
  },
});