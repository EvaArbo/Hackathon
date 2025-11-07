import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  DONATIONS: 'donations',
  USER_PROFILE: 'userProfile',
  STATS: 'stats',
};

export const storageService = {
  // Donations
  async saveDonation(donation) {
    try {
      const donations = await this.getDonations();
      const newDonation = {
        id: Date.now().toString(),
        ...donation,
        createdAt: new Date().toISOString(),
      };
      donations.push(newDonation);
      await AsyncStorage.setItem(KEYS.DONATIONS, JSON.stringify(donations));
      return newDonation;
    } catch (error) {
      console.error('Error saving donation:', error);
      throw error;
    }
  },

  async getDonations() {
    try {
      const donations = await AsyncStorage.getItem(KEYS.DONATIONS);
      return donations ? JSON.parse(donations) : [];
    } catch (error) {
      console.error('Error getting donations:', error);
      return [];
    }
  },

  async claimDonation(id) {
    try {
      const donations = await this.getDonations();
      const updated = donations.map(d => 
        d.id === id ? { ...d, claimed: true, claimedAt: new Date().toISOString() } : d
      );
      await AsyncStorage.setItem(KEYS.DONATIONS, JSON.stringify(updated));
    } catch (error) {
      console.error('Error claiming donation:', error);
      throw error;
    }
  },

  // User Profile
  async saveUserProfile(profile) {
    try {
      await AsyncStorage.setItem(KEYS.USER_PROFILE, JSON.stringify(profile));
    } catch (error) {
      console.error('Error saving profile:', error);
      throw error;
    }
  },

  async getUserProfile() {
    try {
      const profile = await AsyncStorage.getItem(KEYS.USER_PROFILE);
      return profile ? JSON.parse(profile) : {
        name: 'Food Hero',
        type: 'Community Donor',
        joinDate: 'Oct 2024',
        mealsSaved: 47,
        donationsMade: 12,
        peopleHelped: 8,
        carbonReduced: 23.5
      };
    } catch (error) {
      console.error('Error getting profile:', error);
      return null;
    }
  },

  // Stats
  async updateStats(newDonation) {
    try {
      const profile = await this.getUserProfile();
      profile.donationsMade += 1;
      profile.mealsSaved += parseInt(newDonation.quantity) || 1;
      profile.peopleHelped += Math.floor(Math.random() * 3) + 1;
      profile.carbonReduced += Math.random() * 2 + 0.5;
      await this.saveUserProfile(profile);
    } catch (error) {
      console.error('Error updating stats:', error);
    }
  }
};