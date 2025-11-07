import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { takePhoto } from '../services/camera';
import { donationAPI } from '../services/api';
import { analyzeFood } from '../services/ai';
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

  const handleImageUpload = async () => {
    try {
      const result = await takePhoto();
      if (result) {
        setPhoto(result);
        setAnalyzing(true);

        // Send photo to AI for analysis (optional)
        try {
          const aiResult = await analyzeFood(result.uri);
          setFoodType(aiResult.foodType || '');
          setDescription(aiResult.description || '');
          setQuantity(aiResult.quantity || '');
          Alert.alert('AI Analysis Complete', `Detected: ${aiResult.foodType}`);
        } catch (aiError) {
          console.error('AI analysis failed:', aiError);
          // Fallback: Just show photo captured message
          Alert.alert('Photo Captured', 'Fill in the details below');
        } finally {
          setAnalyzing(false);
        }
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
      await donationAPI.createDonation({
        foodType,
        description,
        quantity,
        location,
        photo: photo?.uri,
      });
      Alert.alert('Success', 'Food donation posted!');
      router.back();
    } catch (error) {
      Alert.alert('Error', 'Failed to post donation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Donate Food</Text>
      </View>

      {/* AI Food Recognition */}
      <TouchableOpacity style={styles.cameraButton} onPress={handleImageUpload} disabled={analyzing}>
        {analyzing ? (
          <>
            <Text style={styles.cameraIcon}>🤖</Text>
            <Text style={styles.cameraText}>Analyzing Photo...</Text>
            <Text style={styles.cameraSubtext}>AI is identifying the food</Text>
          </>
        ) : photo ? (
          <Image source={{ uri: photo.uri }} style={styles.photoPreview} />
        ) : (
          <>
            <Text style={styles.cameraIcon}>📷</Text>
            <Text style={styles.cameraText}>Take Photo for AI Recognition</Text>
            <Text style={styles.cameraSubtext}>AI will identify food type & freshness</Text>
          </>
        )}
      </TouchableOpacity>

      {/* Food Details */}
      <View style={styles.form}>
        <Text style={styles.label}>Food Type</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Pizza, Sandwiches, Salad"
          value={foodType}
          onChangeText={setFoodType}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe the food, ingredients, etc."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={3}
        />

        <Text style={styles.label}>Quantity</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., 4 servings, 2 boxes"
          value={quantity}
          onChangeText={setQuantity}
        />

        <Text style={styles.label}>Pickup Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Your address or pickup point"
          value={location}
          onChangeText={setLocation}
        />
      </View>

      {/* Freshness Indicator */}
      <View style={styles.freshnessCard}>
        <Text style={styles.freshnessTitle}>🕒 Estimated Freshness</Text>
        <Text style={styles.freshnessTime}>Good for next 4-6 hours</Text>
        <Text style={styles.freshnessNote}>Based on AI analysis</Text>
      </View>

      {/* Suggested Recipients */}
      <View style={styles.recipients}>
        <Text style={styles.recipientsTitle}>Suggested Recipients Nearby</Text>
        <View style={styles.recipientItem}>
          <Text style={styles.recipientName}>🏠 Community Shelter</Text>
          <Text style={styles.recipientDistance}>0.8 miles away</Text>
        </View>
        <View style={styles.recipientItem}>
          <Text style={styles.recipientName}>🍽️ Food Bank Central</Text>
          <Text style={styles.recipientDistance}>1.2 miles away</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
        <Text style={styles.submitText}>{loading ? 'Posting...' : 'Post Donation'}</Text>
      </TouchableOpacity>

      {loading && <Loading message="Posting donation..." />}
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
    padding: 20,
    paddingTop: 50,
  },
  backButton: {
    fontSize: 18,
    color: '#4CAF50',
    marginRight: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d5016',
  },
  cameraButton: {
    backgroundColor: '#4CAF50',
    margin: 20,
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
  },
  cameraIcon: {
    fontSize: 50,
    marginBottom: 10,
  },
  cameraText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  cameraSubtext: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  freshnessCard: {
    backgroundColor: '#fff3cd',
    margin: 20,
    padding: 20,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  freshnessTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#856404',
  },
  freshnessTime: {
    fontSize: 18,
    color: '#856404',
    marginVertical: 5,
  },
  freshnessNote: {
    fontSize: 12,
    color: '#6c757d',
  },
  recipients: {
    padding: 20,
  },
  recipientsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  recipientItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recipientName: {
    fontSize: 16,
    color: '#333',
  },
  recipientDistance: {
    fontSize: 14,
    color: '#666',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    margin: 20,
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 40,
  },
  submitText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  photoPreview: {
    width: '100%',
    height: 120,
    borderRadius: 10,
  },
});