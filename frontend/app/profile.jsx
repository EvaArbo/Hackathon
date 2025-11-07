import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();

  const badges = [
    { id: 1, name: 'First Donation', icon: '🥇', earned: true },
    { id: 2, name: 'Meal Saver', icon: '🍽️', earned: true },
    { id: 3, name: 'Community Hero', icon: '🦸', earned: true },
    { id: 4, name: 'Weekly Warrior', icon: '⚡', earned: false },
    { id: 5, name: 'Eco Champion', icon: '🌱', earned: false },
  ];

  const recentActivity = [
    { id: 1, action: 'Donated 4 pizzas', time: '2 hours ago', impact: '+12 meals saved' },
    { id: 2, action: 'Claimed sandwiches', time: '1 day ago', impact: 'Helped local shelter' },
    { id: 3, action: 'Added community fridge', time: '3 days ago', impact: 'New pickup point' },
  ];

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* User Info */}
      <View style={styles.userCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>👤</Text>
        </View>
        <Text style={styles.userName}>Food Hero</Text>
        <Text style={styles.userType}>Community Donor</Text>
        <Text style={styles.joinDate}>Member since Oct 2024</Text>
      </View>

      {/* Impact Stats */}
      <View style={styles.impactCard}>
        <Text style={styles.impactTitle}>🌟 Your Impact</Text>
        <View style={styles.impactStats}>
          <View style={styles.impactItem}>
            <Text style={styles.impactNumber}>47</Text>
            <Text style={styles.impactLabel}>Meals Saved</Text>
          </View>
          <View style={styles.impactItem}>
            <Text style={styles.impactNumber}>12</Text>
            <Text style={styles.impactLabel}>Donations Made</Text>
          </View>
          <View style={styles.impactItem}>
            <Text style={styles.impactNumber}>8</Text>
            <Text style={styles.impactLabel}>People Helped</Text>
          </View>
        </View>
        <View style={styles.carbonSaved}>
          <Text style={styles.carbonText}>🌱 Carbon Footprint Reduced: 23.5 kg CO₂</Text>
        </View>
      </View>

      {/* Badges */}
      <View style={styles.badgesSection}>
        <Text style={styles.sectionTitle}>🏆 Achievements</Text>
        <View style={styles.badgesGrid}>
          {badges.map((badge) => (
            <View key={badge.id} style={[styles.badge, !badge.earned && styles.badgeDisabled]}>
              <Text style={styles.badgeIcon}>{badge.icon}</Text>
              <Text style={[styles.badgeName, !badge.earned && styles.badgeNameDisabled]}>
                {badge.name}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.activitySection}>
        <Text style={styles.sectionTitle}>📋 Recent Activity</Text>
        {recentActivity.map((activity) => (
          <View key={activity.id} style={styles.activityItem}>
            <View style={styles.activityInfo}>
              <Text style={styles.activityAction}>{activity.action}</Text>
              <Text style={styles.activityTime}>{activity.time}</Text>
            </View>
            <Text style={styles.activityImpact}>{activity.impact}</Text>
          </View>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>📊</Text>
          <Text style={styles.actionText}>View Full Stats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>📤</Text>
          <Text style={styles.actionText}>Share Impact</Text>
        </TouchableOpacity>
      </View>

      {/* Settings Menu */}
      <View style={styles.settingsMenu}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>🔔 Notifications</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>📍 Location Settings</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>🤝 Invite Friends</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>ℹ️ About Waste Not</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    color: '#4CAF50',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d5016',
  },
  settingsIcon: {
    fontSize: 24,
  },
  userCard: {
    backgroundColor: 'white',
    margin: 20,
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 2,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarText: {
    fontSize: 40,
    color: 'white',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userType: {
    fontSize: 16,
    color: '#4CAF50',
    marginBottom: 5,
  },
  joinDate: {
    fontSize: 14,
    color: '#666',
  },
  impactCard: {
    backgroundColor: 'white',
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 15,
    elevation: 2,
  },
  impactTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  impactStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  impactItem: {
    alignItems: 'center',
  },
  impactNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  impactLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  carbonSaved: {
    backgroundColor: '#e8f5e8',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  carbonText: {
    fontSize: 14,
    color: '#2d5016',
    fontWeight: 'bold',
  },
  badgesSection: {
    margin: 20,
    marginTop: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  badge: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '30%',
    elevation: 1,
  },
  badgeDisabled: {
    opacity: 0.5,
  },
  badgeIcon: {
    fontSize: 30,
    marginBottom: 8,
  },
  badgeName: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  badgeNameDisabled: {
    color: '#999',
  },
  activitySection: {
    margin: 20,
    marginTop: 0,
  },
  activityItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
  },
  activityInfo: {
    flex: 1,
  },
  activityAction: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  activityTime: {
    fontSize: 12,
    color: '#666',
  },
  activityImpact: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  actionIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  settingsMenu: {
    backgroundColor: 'white',
    margin: 20,
    marginTop: 0,
    borderRadius: 15,
    elevation: 2,
    marginBottom: 40,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  menuArrow: {
    fontSize: 20,
    color: '#666',
  },
});