import AsyncStorage from '@react-native-async-storage/async-storage';

const authHeaders = async () => {
  const hhToken = await AsyncStorage.getItem('hhToken')
  console.log('Utils auth hhToken:', hhToken)
  return Promise.resolve({'Authorization': `Bearer ${hhToken || ''}`});
}

export default authHeaders();
