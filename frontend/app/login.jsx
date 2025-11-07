import { View, Text, StyleSheet, TextInput, Alert, Animated, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useState, useRef, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import AnimatedButton from '../components/AnimatedButton';
import GradientCard from '../components/GradientCard';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setLoading(true);
    // Simulate login
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', 'Welcome back!');
      router.replace('/');
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <LinearGradient
        colors={[COLORS.primary, COLORS.primaryDark, COLORS.secondary]}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <Text style={styles.logo}>🍽️ Waste Not</Text>
          <Text style={styles.tagline}>Welcome back, Food Hero!</Text>
        </View>

        {/* Login Form */}
        <GradientCard 
          colors={[COLORS.white, COLORS.gray100]}
          style={styles.formCard}
        >
          <Text style={styles.formTitle}>Sign In</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor={COLORS.gray500}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter your password"
                placeholderTextColor={COLORS.gray500}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <AnimatedButton
            title={loading ? 'Signing In...' : 'Sign In'}
            onPress={handleLogin}
            disabled={loading}
            style={styles.loginButton}
          />

          <AnimatedButton
            title="Don't have an account? Sign Up"
            onPress={() => router.push('/signup')}
            variant="ghost"
            style={styles.signupLink}
          />
        </GradientCard>

        {/* Quick Stats */}
        <Animated.View style={[styles.statsSection, { opacity: fadeAnim }]}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>2,847</Text>
            <Text style={styles.statLabel}>Meals Saved</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>156</Text>
            <Text style={styles.statLabel}>Heroes</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>89</Text>
            <Text style={styles.statLabel}>Communities</Text>
          </View>
        </Animated.View>
      </Animated.View>
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
    bottom: 0,
  },
  content: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
    justifyContent: 'center',
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    fontSize: SIZES.largeTitle,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 8,
  },
  tagline: {
    fontSize: SIZES.headline,
    color: COLORS.white,
    opacity: 0.9,
  },
  formCard: {
    padding: 32,
    marginBottom: 30,
  },
  formTitle: {
    fontSize: SIZES.title1,
    fontWeight: 'bold',
    color: COLORS.gray800,
    textAlign: 'center',
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: SIZES.subhead,
    fontWeight: '600',
    color: COLORS.gray700,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.gray100,
    padding: 16,
    borderRadius: SIZES.radius,
    fontSize: SIZES.callout,
    color: COLORS.gray800,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray100,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  passwordInput: {
    flex: 1,
    padding: 16,
    fontSize: SIZES.callout,
    color: COLORS.gray800,
  },
  eyeButton: {
    padding: 16,
  },
  eyeIcon: {
    fontSize: 18,
  },
  loginButton: {
    marginTop: 10,
    marginBottom: 20,
  },
  signupLink: {
    marginTop: 10,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: SIZES.radius,
    padding: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: SIZES.title1,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  statLabel: {
    fontSize: SIZES.caption1,
    color: COLORS.white,
    opacity: 0.8,
    marginTop: 4,
  },
});