import {useColorScheme, StyleSheet, StatusBar} from 'react-native';

export const Colors = {
  primary: '#55B950',
  semiPrimary: '#C6E8C5',
  secondary: '#3F923A',
  lightgrey: '#E9E9E9',
  orange: '#FFB340',
  darkOrange: '#B86E00',
  semiOrange: '#FFDEAD',
  yellow: '#FFC670',
  red: '#B80000',
  semiRed: '#FF9999',
  blue: '#328AFD',
  semiBlue: '#9AC5FE',
  lightblue: '#C2DCFE',
  black: '#282828',
  dimgrey: '#707070',
  grey: '#A9A9A9',
  semiGray: '#e5e5e55c',
  shadeGrey: '#E4E4E4',
  white: '#FFFFFF',
};

export const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  bgGrey: {
    backgroundColor: '#292e30',
  },
  bg: {
    backgroundColor: '#1d2225',
  },
  chatBg: {
    backgroundColor: '#fff',
  },
  chatText: {
    color: '#1d2225',
  },
  fieldsBg:{
    backgroundColor: '#030303',
  },
  MsgOutBg: {
    backgroundColor: Colors.primary,
  },
  MsgInBg: {
    backgroundColor: '#000000',
  },
  icobg: {
    backgroundColor: '#fff',
    borderColor: '#292e301f',
  },
  inputbg: {
    backgroundColor: '#292e30',
    borderColor: '#292e30',
  },
  bgText: {
    color: Colors.white,
  },
  headingText: {
    color: Colors.black,
  },
  welcometext: {
    color: '#000',
  },
});

export const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  bgGrey: {
    backgroundColor: '#f2f2f2',
  },
  bg: {
    backgroundColor: Colors.white,
  },
  fieldsBg:{
    backgroundColor: '#f5f5f5',
  },
  chatBg: {
    backgroundColor: '#1d2225',
  },
  chatText: {
    color: '#fff',
  },
  MsgOutBg: {
    backgroundColor: Colors.primary,
  },
  MsgInBg: {
    backgroundColor: '#ebebeb',
  },
  inputbg: {
    backgroundColor: '#fff',
    borderColor: '#292e301f',
  },
  icobg: {
    backgroundColor: '#292e30',
    borderColor: '#292e30',
  },
  bgText: {
    color: Colors.black,
  },
  headingText: {
    color: Colors.white,
  },
  welcometext: {
    color: '#fff',
  },
  // ... (other dark mode specific styles)
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  modalContent: {
    height: '90%',
    justifyContent: 'flex-end',
    backgroundColor: 'white', // You can set a background color if needed
  },
  justifiedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  justifyCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  togglebtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  justifyBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
    justifyContent: 'space-between',
  },
  customHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    headerIcons: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignContent: 'center',
      gap: 6,
      textAlign: 'center',
      alignItems: 'center',
    },
    headerIcon: {
      flexDirection: 'column',
      width: 40,
      height: 40,
      borderRadius: 40,
      justifyContent: 'center',
      alignContent: 'center',
      textAlign: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: 100,
    },
  },
  logoContainer: {
    marginBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcometext: {
    fontSize: 23,
    color: Colors.black,
    fontWeight: '500',
    justifyContent: 'center',
    marginBottom: 20,
    textAlign: 'center',
    textTransform: 'capitalize',
    lineHeight: 33,
  },
  dottedDivider: {
    borderBottomColor: Colors.grey, // Change color as needed
    borderBottomWidth: 1,
    borderStyle: 'dotted',
    marginTop: 10, // Adjust margin as needed
  },
  normalText: {
    fontSize: 18,
    fontWeight: '400',
  },
  logo: {
    width: 120,
    height: 120,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  handleBackBtn: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  toggleClose: {
    position: 'absolute',
    right: 5,
    padding: 5,
    zIndex: 10,
  },
  // Tab Menu Styling
  MenuItem: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  MenuIcon: {
    fontSize: 20,
  },
  MenuLabel: {
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: '500',
  },
  userDrawerContainer: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: Colors.black,
  },
  buttonContainer: {
    flexDirection: 'row', // Display buttons in a row
    justifyContent: 'center', // Center buttons horizontally
    gap: 30,
    //marginBottom:50
  },

  // Drawer Help Center Style
  menuHelpCenter: {
    flexDirection: 'column',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 30,
    Items: {
      flexDirection: 'row',
      padding: 10,
      backgroundColor: Colors.lightgrey,
      width: '90%',
      marginVertical: 2,
      alignItems: 'center',
      gap: 10,
      borderRadius: 10,
    },
    Text: {
      color: Colors.black,
    },
  },

  langBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    margin: 3,
    borderRadius: 5,
  },
  langBtn1: {
    borderColor: Colors.secondary,
  },
  langBtn2: {
    backgroundColor: Colors.black,
    borderColor: Colors.black,
  },
  BookBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 40,
    right: 20,
  },
  ChatInput:{
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.dimgrey,
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.dimgrey,
    paddingHorizontal: 15,
    paddingVertical: 7,
    marginVertical: 5,
  },
  inputWidth100: {
    width: '100%',
  },
  inputWidth50: {
    width: '48.5%',
  },

  passContainer: {
    postition: 'relative',
    width: '48.5%',
  },
  iconContainer: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  column: {
    flexDirection: 'column',
  },
  headingNormal: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  headingMedium: {
    fontSize: 22,
   fontWeight: '700',
    fontFamily:'Ubuntu-Italic'
  },
  headingLarge: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  headingBig: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  headingSmall: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  para: {
    fontSize: 15,
    color: '#444454',
    fontWeight: '400',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 8,
    color: Colors.dimgrey,
    fontWeight: 'normal',
  },
  centered: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cropImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  cropName: {
    fontSize: 15,
    color: Colors.primary,
    fontWeight: '400',
  },
  customCheckbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkedBox: {
    backgroundColor: Colors.white,
  },
  checkBoxText: {
    fontSize: 16,
    color: Colors.black,
    fontWeight: '500',
  },

  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 20,
    padding: 12,
    width: 300,
  },
  rowWithGap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
  },
  sectionText: {
    fontSize: 16,
    fontWeight: '400',
  },

  //   Top Spacing Style
  mt1: {
    marginTop: 4,
  },
  mt2: {
    marginTop: 8,
  },
  mt3: {
    marginTop: 12,
  },
  mt4: {
    marginTop: 16,
  },
  mt5: {
    marginTop: 20,
  },
  mt6: {
    marginTop: 30,
  },
  mt7: {
    marginTop: 35,
  },
  mt8: {
    marginTop: 40,
  },
  mt10: {
    marginTop: 55,
  },
  mt11: {
    marginTop: 100,
  },
  // Bottom Spacing
  mb1: {
    marginBottom: 10,
  },
  mb2: {
    marginBottom: 20,
  },
  mb3: {
    marginBottom: 30,
  },
  mb4: {
    marginBottom: 40,
  },
  mb5: {
    marginBottom: 50,
  },
  mb6: {
    marginBottom: 60,
  },
  plr1: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  plr1: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  plr2: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  plr3: {
    paddingLeft: 30,
    paddingRight: 30,
  },
  plr4: {
    paddingLeft: 40,
    paddingRight: 40,
  },
  plr5: {
    paddingLeft: 50,
    paddingRight: 50,
  },
  // Buttons Styles
  // Universal Buttons styling
  btn: {
    fontSize: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  btnSmall: {
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
  btnMedium: {
    paddingHorizontal: 30,
    paddingVertical: 12,
  },
  btnLarge: {
    paddingHorizontal: 35,
    paddingVertical: 15,
  },
  btn100: {
    width: 100,
  },
  btn200: {
    width: 200,
  },
  btnHalf: {
    width: '50%',
  },
  btnFull: {
    width: '100%',
  },
  btnPrimary: {
    backgroundColor: '#58a633',
    color: '#fff',
  },
  
  btnSecondary: {
    backgroundColor: Colors.primary,
    // color: '#fff',
  },
  btnRound: {
    borderRadius: 5,
  },
  btnCircle: {
    borderRadius: 100,
  },
  btnSquare50: {
    width: 50,
    height: 50,
    lineHeight: 30,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSquare70: {
    width: '65%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 10,
  },
  btnRight: {
    alignItems: 'flex-end',
  },

  btn1: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 30,
  },
  btn2: {
    paddingHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 7,
  },
  btnText: {
    //color: Colors.white,
    alignItems: 'center',
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center',
  },
  btnCont: {
    backgroundColor: Colors.black,
    width: '100%',
    padding: 12,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },

  skipBtnCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  skipBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    borderRadius: 5,
  },
  googleSocial: {
    backgroundColor: '#DD4D44',
    width: '48.5%',
    padding: 10,
    alignItems: 'center',
    margin: 0,
    borderRadius: 5,
    marginTop: 20,
  },
  facebookSocial: {
    backgroundColor: '#3b5998',
    width: '48.5%',
    padding: 10,
    alignItems: 'center',
    margin: 0,
    borderRadius: 5,
    marginTop: 20,
  },
  themeColor: {
    color: '#aac949',
    backgroundColor: '#449243',
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: 150,
    margin: 'auto',
  },
  imagePicker: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    padding: 2,
  },
  ProfileImage: {
    width: 100,
    height: 100,
    borderRadius: 80,
    backgroundColor: 'transparent',
  },
  cameraIcon: {
    position: 'absolute',
    top: -2,
    right: -2,
    borderRadius: 20,
    zIndex: 9999,
    backgroundColor: Colors.lightgrey,
    padding: 7,
  },
  col1: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  col2: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 15,
  },
  col3: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    gap: 25,
  },
  col4: {
    gap:20,
    paddingHorizontal:5,
    borderRadius:10
  },
  col5: {
    backgroundColor: Colors.lightblue,
    paddingVertical: 40,
    paddingHorizontal: 40,
  },
  col6:{
    paddingHorizontal:10,
    paddingVertical:6,
    borderRadius:10
  },
  categoryChip:{
    paddingHorizontal:16,
    paddingVertical:10,
    marginRight:5,
    borderRadius:5,
  },
  productCard:{
    width: 165,
    borderRadius: 5,
    padding:5,
  },
  productName:{
    fontWeight:'500',
    fontSize:16,
    marginTop:10
  },
  productImage:{
    height:140,
    width:'100%',
    alignItems:'center',
    borderRadius: 5,
  },
  productDetails:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  offPercentage:{
    fontSize:15,
    fontWeight:'500',
    color:Colors.secondary
  },
  productPrice:{
    fontSize:15,
    fontWeight:'500',
  },
  addToCartContainer:{
    position:'absolute',
    top:10,
    right:10,
    padding:5,
    borderRadius:30,
    backgroundColor:'#eefaed'
  },
  ratingContainer:{
    flexDirection:'row'
  },
  imageSlider:{
    width:'100%',
    height:200,
  },
  bottomSheetContainer: {
    width: '100%', // Occupies full width of the parent container
    height: '84%', // Occupies 70% of the screen height
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  dateBox: {
    borderRadius: 5, // Rounded corners
    backgroundColor: 'lightgrey',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  textArea: {
    padding: 10,
    borderRadius: 5,
    
  },
  weathercoltext: {
    fontSize: 13,
  },
  weathercolimage: {
    width: 70,
    height: 70,
    objectFit: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherEntryContainer:{
    alignItems: 'center',
  },
  weatherLabel:{
    fontSize: 15,
    fontWeight: 'bold',
  },
  weatherIcon:{
    height:35,
    width: 35,
  },
  weatherValue:{
    fontSize: 12,
  },

  // Consultation Screen
  cardContainer: {
    borderRadius: 10,
    width: '100%',
  },
  cardHeader: {
    flexDirection: 'row',
    position: 'relative',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    color: Colors.grey,
    borderColor: Colors.dimgrey,
    padding: 12,
  },
  cardToggle: {
    position: 'relative',
    zIndex: 10,
    toggle: {
      position: 'absolute',
      flexDirection: 'column',
      top: 46,
      right: 0,
      backgroundColor: Colors.semiPrimary,
      zIndex: 100,
      item: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        color: Colors.white,
      },
    },
  },
  cardContent: {
    padding: 20,
    iconShape: {
      width: 35,
      height: 35,
      lineHeight: 33,
      borderRadius: 50,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.lightgrey,
      color: Colors.grey,
      textAlign: 'center',
      fontSize: 18,
      gap: 10,
      zIndex: -1,
    },
    status: {
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 30,
      zIndex: -1,
    },
    Scheduled: {
      backgroundColor: Colors.semiOrange,
      color: Colors.darkOrange,
    },
    Completed: {
      backgroundColor: Colors.semiPrimary,
      color: Colors.secondary,
    },
    Cancelled: {
      backgroundColor: Colors.semiRed,
      color: Colors.red,
    },
    Expired: {
      backgroundColor: Colors.grey,
      color: Colors.black,
    },
  },

  // Weather Styling
  activityLoader: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    zIndex: 999,
    position: 'absolute',
    Image: {
      width: 80,
      height: 80,
    },
  },
  superscript: {
    position: 'absolute',
    flex: 1,
    bottom: 10,
    fontSize: 12,
    textTransform: 'lowercase',
  },

  smallCont: {
    width: 100,
    height: 100,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contImage: {
    width: 60,
    height: 60,
  },
  catCont: {
    width: 80,
    height: 80,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  catImage: {
    width: 40,
    height: 40,
  },
  // Chat Box UI
  chatLists: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
  },
  chatUserImg: {
    height: 45,
    width: 45,
    borderRadius: 100,
  },
  ChatNumber: {
    height: 20,
    width: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 10,
    borderRadius: 30,
    position: 'absolute',
    right: 3,
  },
  messageTime: {
    fontSize: 12,
    marginTop: 4,
  },
  unreadMessages: {
    backgroundColor: 'green',
    color: 'white',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 4,
  },
  pickerContainer: {
    width: '100%',
    position: 'relative',
    padding:12,
    borderRadius:5
  },
  optionsContainer: {
    position: 'absolute',
    top: 42,
    right: 0,
    left: 0,
    borderRadius: 5
  },
  option: {
    padding: 10,
  },
});

export default styles;
