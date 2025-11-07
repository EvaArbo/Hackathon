import { View, Text, StyleSheet, TextInput, Alert, Animated, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useState, useRef, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import AnimatedButton from '../components/AnimatedButton';
import GradientCard from '../components/GradientCard';

export default function SignupScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  const validatePassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert('Error', 'Password must be at least 8 characters with uppercase, lowercase, and number');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true);
    // Simulate signup
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', 'Welcome to Waste Not!');
      router.replace('/');
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <LinearGradient
        colors={[COLORS.secondary, COLORS.primary, COLORS.primaryDark]}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
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
            <Text style={styles.tagline}>Join the Food Hero Community</Text>
            <Text style={styles.subtitle}>Help reduce food waste, one meal at a time</Text>
          </View>

          {/* Signup Form */}
          <GradientCard 
            colors={[COLORS.white, COLORS.gray100]}
            style={styles.formCard}
          >
            <Text style={styles.formTitle}>Create Account</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                placeholderTextColor={COLORS.gray500}
                value={name}
                onChangeText={setName}
              />
            </View>

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
                  placeholder="Create a password"
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

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Confirm Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Confirm your password"
                  placeholderTextColor={COLORS.gray500}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Text style={styles.eyeIcon}>{showConfirmPassword ? '🙈' : '👁️'}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <AnimatedButton
              title={loading ? 'Creating Account...' : 'Sign Up'}
              onPress={handleSignup}
              disabled={loading}
              style={styles.signupButton}
            />

            <AnimatedButton
              title="Already have an account? Sign In"
              onPress={() => router.push('/login')}
              variant="ghost"
              style={styles.loginLink}
            />
          </GradientCard>

          {/* Benefits */}
          <Animated.View style={[styles.benefitsSection, { opacity: fadeAnim }]}>
            <Text style={styles.benefitsTitle}>Why Join Waste Not?</Text>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitIcon}>🌍</Text>
              <Text style={styles.benefitText}>Help reduce food waste globally</Text>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitIcon}>🤝</Text>
              <Text style={styles.benefitText}>Connect with your community</Text>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitIcon}>📊</Text>
              <Text style={styles.benefitText}>Track your positive impact</Text>
            </View>
          </Animated.View>
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
    bottom: 0,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  content: {
    paddingHorizontal: SIZES.padding,
    paddingTop: 60,
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
    marginBottom: 4,
  },
  subtitle: {
    fontSize: SIZES.subhead,
    color: COLORS.white,
    opacity: 0.7,
    textAlign: 'center',
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
  signupButton: {
    marginTop: 10,
    marginBottom: 20,
  },
  loginLink: {
    marginTop: 10,
  },
  benefitsSection: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: SIZES.radius,
    padding: 24,
  },
  benefitsTitle: {
    fontSize: SIZES.title3,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 20,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  benefitIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  benefitText: {
    fontSize: SIZES.callout,
    color: COLORS.white,
    opacity: 0.9,
  },
});