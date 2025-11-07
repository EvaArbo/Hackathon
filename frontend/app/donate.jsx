import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert, Image, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useState, useRef, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { takePhoto } from '../services/camera';
import { storageService } from '../services/storage';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import AnimatedButton from '../components/AnimatedButton';
import GradientCard from '../components/GradientCard';
import Loading from '../components/Loading';

export default function DonateScreen() {
  const router = useRouter();
  const [foodType, setFoodType] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState('');
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const photoCounter = useRef(0);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const handleImageUpload = async () => {
    try {
      const result = await takePhoto();
      if (result) {
        setPhoto(result);
        setAnalyzing(true);

        // Mock AI analysis - cycles through drinks
        setTimeout(() => {
          const mockResults = [
            { foodType: 'Bottle of Water', description: 'Fresh bottled water', quantity: '1 bottle' },
            { foodType: 'Cup of Soda', description: 'Refreshing soda drink', quantity: '1 cup' },
            { foodType: 'Blackcurrant Soda', description: 'Sweet blackcurrant flavored soda', quantity: '1 can' },
          ];
          const index = photoCounter.current % mockResults.length;
          photoCounter.current += 1;
          const aiResult = mockResults[index];
          setFoodType(aiResult.foodType);
          setDescription(aiResult.description);
          setQuantity(aiResult.quantity);
          setAnalyzing(false);
          Alert.alert('AI Analysis Complete', `Detected: ${aiResult.foodType}`);
        }, 2000);
      }
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Error', 'Failed to capture photo');
    }
  };

  const handleSubmit = async () => {
    if (!foodType || !description || !quantity || !location) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      const donation = await storageService.saveDonation({
        foodType,
        description,
        quantity,
        location,
        photo: photo?.uri,
      });
      await storageService.updateStats(donation);
      Alert.alert('Success', 'Food donation posted!');
      router.back();
    } catch (error) {
      Alert.alert('Error', 'Failed to post donation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <LinearGradient
        colors={[COLORS.primary, COLORS.primaryDark]}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Donate Food</Text>
          <View style={styles.placeholder} />
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* AI Camera Section */}
        <Animated.View 
          style={[
            styles.cameraSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <GradientCard 
            colors={analyzing ? [COLORS.accent, '#E67E22'] : photo ? [COLORS.success, COLORS.primary] : [COLORS.secondary, '#2980B9']}
            style={styles.cameraCard}
          >
            <TouchableOpacity 
              style={styles.cameraContent}
              onPress={handleImageUpload} 
              disabled={analyzing}
            >
              {analyzing ? (
                <>
                  <View style={styles.loadingContainer}>
                    <Text style={styles.cameraIcon}>🤖</Text>
                  </View>
                  <Text style={styles.cameraText}>AI Analyzing...</Text>
                  <Text style={styles.cameraSubtext}>Identifying food type & freshness</Text>
                </>
              ) : photo ? (
                <>
                  <Image source={{ uri: photo.uri }} style={styles.photoPreview} />
                  <Text style={styles.photoText}>Tap to retake photo</Text>
                </>
              ) : (
                <>
                  <View style={styles.cameraIconContainer}>
                    <Text style={styles.cameraIcon}>📷</Text>
                  </View>
                  <Text style={styles.cameraText}>Smart Food Recognition</Text>
                  <Text style={styles.cameraSubtext}>AI will identify food type & estimate freshness</Text>
                </>
              )}
            </TouchableOpacity>
          </GradientCard>
        </Animated.View>

        {/* Form Section */}
        <Animated.View style={[styles.formSection, { opacity: fadeAnim }]}>
          <View style={styles.formCard}>
            <Text style={styles.sectionTitle}>🍽️ Food Details</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Food Type</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Pizza, Sandwiches, Salad"
                placeholderTextColor={COLORS.gray500}
                value={foodType}
                onChangeText={setFoodType}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Describe ingredients, allergens, etc."
                placeholderTextColor={COLORS.gray500}
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.inputRow}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.label}>Quantity</Text>
                <TextInput
                  style={styles.input}
                  placeholder="4 servings"
                  placeholderTextColor={COLORS.gray500}
                  value={quantity}
                  onChangeText={setQuantity}
                />
              </View>
              <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.label}>Pickup Location</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Address"
                  placeholderTextColor={COLORS.gray500}
                  value={location}
                  onChangeText={setLocation}
                />
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Freshness Card */}
        <Animated.View style={[styles.freshnessSection, { opacity: fadeAnim }]}>
          <GradientCard 
            colors={[COLORS.warning, '#E67E22']}
            style={styles.freshnessCard}
          >
            <View style={styles.freshnessContent}>
              <Text style={styles.freshnessIcon}>🕒</Text>
              <View style={styles.freshnessInfo}>
                <Text style={styles.freshnessTitle}>Estimated Freshness</Text>
                <Text style={styles.freshnessTime}>Good for next 4-6 hours</Text>
                <Text style={styles.freshnessNote}>Based on AI analysis</Text>
              </View>
            </View>
          </GradientCard>
        </Animated.View>

        {/* Recipients Section */}
        <Animated.View style={[styles.recipientsSection, { opacity: fadeAnim }]}>
          <Text style={styles.sectionTitle}>🎯 Suggested Recipients</Text>
          <View style={styles.recipientsCard}>
            <View style={styles.recipientItem}>
              <View style={styles.recipientIcon}>
                <Text style={styles.recipientEmoji}>🏠</Text>
              </View>
              <View style={styles.recipientInfo}>
                <Text style={styles.recipientName}>Community Shelter</Text>
                <Text style={styles.recipientDistance}>0.8 miles away</Text>
              </View>
              <Text style={styles.recipientArrow}>›</Text>
            </View>
            
            <View style={styles.recipientDivider} />
            
            <View style={styles.recipientItem}>
              <View style={styles.recipientIcon}>
                <Text style={styles.recipientEmoji}>🍽️</Text>
              </View>
              <View style={styles.recipientInfo}>
                <Text style={styles.recipientName}>Food Bank Central</Text>
                <Text style={styles.recipientDistance}>1.2 miles away</Text>
              </View>
              <Text style={styles.recipientArrow}>›</Text>
            </View>
          </View>
        </Animated.View>

        {/* Submit Button */}
        <Animated.View style={[styles.submitSection, { opacity: fadeAnim }]}>
          <AnimatedButton
            title={loading ? 'Posting Donation...' : 'Share Food 🎆'}
            onPress={handleSubmit}
            disabled={loading}
            style={styles.submitButton}
          />
        </Animated.View>
      </ScrollView>

      {loading && <Loading message="Posting your generous donation..." />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray100,
  },
  headerGradient: {
    paddingTop: 50,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.padding,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 20,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  title: {
    fontSize: SIZES.title1,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  cameraSection: {
    paddingHorizontal: SIZES.padding,
    paddingTop: 20,
  },
  cameraCard: {
    marginBottom: 24,
  },
  cameraContent: {
    alignItems: 'center',
    minHeight: 160,
    justifyContent: 'center',
  },
  cameraIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  loadingContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  cameraIcon: {
    fontSize: 36,
  },
  cameraText: {
    fontSize: SIZES.title3,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 8,
  },
  cameraSubtext: {
    fontSize: SIZES.subhead,
    color: COLORS.white,
    opacity: 0.8,
    textAlign: 'center',
    lineHeight: 20,
  },
  photoPreview: {
    width: '100%',
    height: 120,
    borderRadius: SIZES.radius,
    marginBottom: 12,
  },
  photoText: {
    fontSize: SIZES.subhead,
    color: COLORS.white,
    opacity: 0.8,
  },
  formSection: {
    paddingHorizontal: SIZES.padding,
  },
  formCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: 24,
    ...SHADOWS.light,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: SIZES.title3,
    fontWeight: 'bold',
    color: COLORS.gray800,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  freshnessSection: {
    paddingHorizontal: SIZES.padding,
  },
  freshnessCard: {
    marginBottom: 24,
  },
  freshnessContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  freshnessIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  freshnessInfo: {
    flex: 1,
  },
  freshnessTitle: {
    fontSize: SIZES.headline,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 4,
  },
  freshnessTime: {
    fontSize: SIZES.callout,
    color: COLORS.white,
    opacity: 0.9,
    marginBottom: 2,
  },
  freshnessNote: {
    fontSize: SIZES.caption1,
    color: COLORS.white,
    opacity: 0.7,
  },
  recipientsSection: {
    paddingHorizontal: SIZES.padding,
  },
  recipientsCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    ...SHADOWS.light,
    marginBottom: 24,
  },
  recipientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  recipientIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.gray100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  recipientEmoji: {
    fontSize: 24,
  },
  recipientInfo: {
    flex: 1,
  },
  recipientName: {
    fontSize: SIZES.callout,
    fontWeight: '600',
    color: COLORS.gray800,
    marginBottom: 2,
  },
  recipientDistance: {
    fontSize: SIZES.caption1,
    color: COLORS.gray600,
  },
  recipientArrow: {
    fontSize: 20,
    color: COLORS.gray400,
  },
  recipientDivider: {
    height: 1,
    backgroundColor: COLORS.gray200,
    marginHorizontal: 20,
  },
  submitSection: {
    paddingHorizontal: SIZES.padding,
  },
  submitButton: {
    paddingVertical: 18,
  },
});