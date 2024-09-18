import { StyleSheet, Dimensions, Platform, StatusBar } from "react-native";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;


// Function to get the status bar height

export default StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    zIndex: 1,
  },
  header: {
    paddingTop: 20,
    marginTop: 20,
    paddingHorizontal: 16,
  },
  header1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  viewInput: {
    borderRadius: 12,
    width: deviceWidth - 32,
    height: 40,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 10,
  },
  inputSearch: {
    flex: 1,
    marginRight: 8,
    fontFamily: "Poppins",
    fontSize: 14,
    lineHeight: 21,
    color: "#000",
  },
  iconBack: {
    height: 14,
    width: 14,
    resizeMode: "contain",
    tintColor: "#000",
  },
  imgBanner: {
    width: (276 / 375) * deviceWidth,
    height: (209 / 375) * deviceWidth,
    resizeMode: "contain",
    position: "absolute",
    left: -100,
    top: 0,
    zIndex: -1,
  },
  title: {
    fontFamily: "Poppins-Medium",
    fontWeight: "500",
    fontSize: 24,
    lineHeight: 36,
    flex: 1,
    textAlign: "center",
  },
  viewSearch: {
    backgroundColor: "#fff",
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 0,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 10,
  },

  iconSearch: {
    height: 14,
    width: 14,
    resizeMode: "contain",
    tintColor: "#000",
  },
  viewFilter: {
    backgroundColor: "#fff",
    // width: 64,
    paddingHorizontal: 16,
    height: 24,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 10,
  },
  txtFilter: {
    fontFamily: "Poppins",
    fontSize: 10,
    lineHeight: 15,
    marginRight: 4,
  },
  viewUpdateRole: {
    zIndex: 1000,
    flex: 1,
    position: "absolute",
    // backgroundColor: 'rgba(0,0,0,0.5)',
    width: deviceWidth,
    height: deviceHeight,
  },
  viewModalFilter: {
    width: 107,
    // height: 131,
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderRadius: 6,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 10,
  },
  txtFilterItem: {
    marginBottom: 10,
    fontFamily: "Poppins",
    fontSize: 12,
    lineHeight: 18,
    color: "#A9A9A9",
  },
});
