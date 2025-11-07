import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';

export default function GradientCard({ 
  children, 
  colors = [COLORS.primary, COLORS.primaryDark],
  style,
  ...props 
}) {
  return (
    <View style={[styles.container, style]} {...props}>
      <LinearGradient
        colors={colors}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {children}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: SIZES.radius,
    ...SHADOWS.medium,
  },
  gradient: {
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
  },
});