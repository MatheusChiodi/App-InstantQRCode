import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const baseWidth = 360;
const scaleFactor = width / baseWidth;

export default scaleFactor;
