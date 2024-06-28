import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

/**
 * Function to generate cash payment options.
 * @returns {Array<number>} Array of cash payment options.
 */
function generateCashOptions() {
  const cashOptions = [];

  // Define common cash denominations
  const denominations = [100000, 50000, 20000, 10000, 5000, 2000];
  // Add denominations to the cash options list
  denominations.forEach(denomination => {
    cashOptions.push(denomination);
  });

  // Return the list of cash payment options
  return cashOptions;
}

const CashOptionsComponent = ({total, setJumlah}) => {
  const cashOptions = generateCashOptions();
  const [active, setActive] = useState();

  const setJumlahFunc = (option, i) => {
    setActive(i);
    setJumlah(option);
  };

  return (
    <View style={styles.scrollView}>
      <View style={styles.gridContainer}>
        {cashOptions.map((option, index) => (
          <TouchableOpacity
            onPress={() =>
              parseInt(total) <= parseInt(option)
                ? setJumlahFunc(option, index)
                : setActive(null)
            }
            key={index}
            style={{
              ...styles.gridItem,
              backgroundColor:
                active == index ? styles.hoverColor : styles.normalColor,
            }}>
            <Text
              style={{
                ...styles.optionText,
                color:
                  parseInt(total) >= parseInt(option) ? styles.disColor : 'grey',
              }}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginTop: 30,
    // height: Dimensions.get('window').height / 2 - 200,
    // backgroundColor: 'red',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: Dimensions.get('window').width / 3 - 40, // Adjust width for grid
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 14,
  },
  normalColor: '#f0f0f0',
  hoverColor: '#d0d0d0',
  disColor: '#d0d0d0',
});

export default CashOptionsComponent;
