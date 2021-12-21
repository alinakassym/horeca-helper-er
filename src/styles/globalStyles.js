import {Dimensions, StyleSheet} from 'react-native';
import {Platform} from 'react-native';
import {PrimaryColors} from './colors';

const dimensions = Dimensions.get('screen');

export const globalStyles = StyleSheet.create({
  fullScreenSection: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: PrimaryColors.background,
  },
  card: {
    marginTop: 8,
    padding: 20,
    width: dimensions.width,
    backgroundColor: PrimaryColors.white,
  },
  modalTopBar: {
    marginTop: Platform.OS === 'ios' ? 40 : 0,
  },
  label: {
    marginBottom: 8,
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
  },
  positionTitle: {
    marginBottom: 8,
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
  },
  primaryInput: {
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#000000',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  multiline: {
    height: 100,
    textAlignVertical: 'top',
  },
  select: {
    marginBottom: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#000000',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },

  // --- start of Filters TopBar --- //
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#F6F6F6',
  },
  filterBtn: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterApplied: {
    position: 'absolute',
    top: 1,
    left: 22,
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#E74C3C',
  },
  filterBtnRightText: {
    marginLeft: 6,
    fontSize: 14,
  },
  filterBtnLeftText: {
    marginRight: 4,
    fontSize: 14,
  },
  // --- end of Filters TopBar --- //
});
