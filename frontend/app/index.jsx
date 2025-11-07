import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import AnimatedButton from '../components/AnimatedButton';
import GradientCard from '../components/GradientCard';

export default function HomeScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <LinearGradient
        colors={[COLORS.primary, COLORS.primaryDark, COLORS.secondary]}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Animated Header */}
        <Animated.View 
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Text style={styles.logo}>🍽️ Waste Not</Text>
          <Text style={styles.tagline}>Transform leftovers into hope</Text>
          <Text style={styles.subtitle}>Join the movement to end food waste</Text>
        </Animated.View>

        {/* Hero Stats Card */}
        <Animated.View style={{ opacity: fadeAnim }}>
          <GradientCard 
            colors={[COLORS.white, COLORS.gray100]}
            style={styles.heroCard}
          >
            <Text style={styles.heroTitle}>🌟 Community Impact</Text>
            <View style={styles.heroStats}>
              <View style={styles.heroStatItem}>
                <Text style={styles.heroStatNumber}>2,847</Text>
                <Text style={styles.heroStatLabel}>Meals Saved</Text>
              </View>
              <View style={styles.heroStatDivider} />
              <View style={styles.heroStatItem}>
                <Text style={styles.heroStatNumber}>156</Text>
                <Text style={styles.heroStatLabel}>Active Heroes</Text>
              </View>
              <View style={styles.heroStatDivider} />
              <View style={styles.heroStatItem}>
                <Text style={styles.heroStatNumber}>89</Text>
                <Text style={styles.heroStatLabel}>Communities</Text>
              </View>
            </View>
          </GradientCard>
        </Animated.View>

        {/* Main Action Cards */}
        <Animated.View style={[styles.actions, { opacity: fadeAnim }]}>
          <GradientCard 
            colors={[COLORS.success, COLORS.primary]}
            style={styles.actionCard}
          >
            <TouchableOpacity 
              style={styles.actionContent}
              onPress={() => router.push('/donate')}
            >
              <View style={styles.actionIconContainer}>
                <Text style={styles.actionIcon}>📸</Text>
              </View>
              <Text style={styles.actionTitle}>Donate Food</Text>
              <Text style={styles.actionSubtitle}>Share your leftovers with those in need</Text>
              <View style={styles.actionArrow}>
                <Text style={styles.arrowText}>→</Text>
              </View>
            </TouchableOpacity>
          </GradientCard>

          <GradientCard 
            colors={[COLORS.secondary, '#2980B9']}
            style={styles.actionCard}
          >
            <TouchableOpacity 
              style={styles.actionContent}
              onPress={() => router.push('/find')}
            >
              <View style={styles.actionIconContainer}>
                <Text style={styles.actionIcon}>🔍</Text>
              </View>
              <Text style={styles.actionTitle}>Find Food</Text>
              <Text style={styles.actionSubtitle}>Discover fresh donations nearby</Text>
              <View style={styles.actionArrow}>
                <Text style={styles.arrowText}>→</Text>
              </View>
            </TouchableOpacity>
          </GradientCard>
        </Animated.View>

        {/* Quick Access */}
        <Animated.View style={[styles.quickAccess, { opacity: fadeAnim }]}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <View style={styles.quickButtons}>
            <AnimatedButton
              title="Map View"
              icon="🗺️"
              variant="outline"
              style={styles.quickButton}
              onPress={() => router.push('/map')}
            />
            <AnimatedButton
              title="Profile"
              icon="👤"
              variant="outline"
              style={styles.quickButton}
              onPress={() => router.push('/profile')}
            />
          </View>
        </Animated.View>

        {/* Recent Activity */}
        <Animated.View style={[styles.recentActivity, { opacity: fadeAnim }]}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityCard}>
            <View style={styles.activityItem}>
              <Text style={styles.activityIcon}>🍕</Text>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Pizza donated nearby</Text>
                <Text style={styles.activityTime}>2 minutes ago</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <Text style={styles.activityIcon}>🥪</Text>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Sandwiches available</Text>
                <Text style={styles.activityTime}>15 minutes ago</Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray100,
  },
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 400,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: SIZES.padding,
  },
  logo: {
    fontSize: SIZES.largeTitle,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 8,
  },
  tagline: {
    fontSize: SIZES.title3,
    color: COLORS.white,
    opacity: 0.9,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: SIZES.subhead,
    color: COLORS.white,
    opacity: 0.7,
    textAlign: 'center',
  },
  heroCard: {
    marginHorizontal: SIZES.padding,
    marginBottom: 24,
  },
  heroTitle: {
    fontSize: SIZES.title2,
    fontWeight: 'bold',
    color: COLORS.gray800,
    textAlign: 'center',
    marginBottom: 20,
  },
  heroStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroStatItem: {
    flex: 1,
    alignItems: 'center',
  },
  heroStatNumber: {
    fontSize: SIZES.title1,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  heroStatLabel: {
    fontSize: SIZES.caption1,
    color: COLORS.gray600,
    marginTop: 4,
  },
  heroStatDivider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.gray300,
  },
  actions: {
    paddingHorizontal: SIZES.padding,
    marginBottom: 32,
  },
  actionCard: {
    marginBottom: 16,
  },
  actionContent: {
    alignItems: 'center',
    position: 'relative',
  },
  actionIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  actionIcon: {
    fontSize: 28,
  },
  actionTitle: {
    fontSize: SIZES.title2,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 8,
  },
  actionSubtitle: {
    fontSize: SIZES.subhead,
    color: COLORS.white,
    opacity: 0.8,
    textAlign: 'center',
    lineHeight: 20,
  },
  actionArrow: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  arrowText: {
    fontSize: 24,
    color: COLORS.white,
    opacity: 0.7,
  },
  quickAccess: {
    paddingHorizontal: SIZES.padding,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: SIZES.title3,
    fontWeight: 'bold',
    color: COLORS.gray800,
    marginBottom: 16,
  },
  quickButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  quickButton: {
    flex: 1,
  },
  recentActivity: {
    paddingHorizontal: SIZES.padding,
  },
  activityCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: 20,
    ...SHADOWS.light,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  activityIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: SIZES.callout,
    fontWeight: '600',
    color: COLORS.gray800,
  },
  activityTime: {
    fontSize: SIZES.caption1,
    color: COLORS.gray600,
    marginTop: 2,
  },
});