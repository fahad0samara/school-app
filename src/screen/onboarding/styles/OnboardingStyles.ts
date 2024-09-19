import { StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../../../constants";



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  illustration: {
    height: SIZES.width * 0.96,
    width: SIZES.width * 0.96,
    position: "absolute",
    bottom: 360,
  },
  ornament: {
    position: "absolute",
    bottom: 372,
    zIndex: -99,
    width: SIZES.width * 0.7,
  },
  titleContainer: {
    alignItems: "center",
  },
  title: {
    fontSize:25,
    fontWeight:"bold",
    
    color: COLORS.black,
    textAlign: "center",
  
  },
  subTitle: {
    ...FONTS.h2,
    color: COLORS.primary,
    textAlign: "center",
 
  },
  description: {
    ...FONTS.body3,
    color: COLORS.black,
    textAlign: "center",
    marginBottom: 10,
  },
  dotsContainer: {
    marginBottom: 3,
    marginTop: 8,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    padding: 22,
    borderTopLeftRadius: SIZES.radius,
    borderTopRightRadius: SIZES.radius,
    height: 360,
  },
  nextButton: {
    width: SIZES.width - 44,
    marginBottom: SIZES.padding,
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    marginTop: 22,
  },
  skipButton: {
    width: SIZES.width - 44,
    marginBottom: SIZES.padding,
    backgroundColor: "transparent",
    borderColor: COLORS.primary,
  },
});

export default styles;
