import React, { useState } from 'react';
import {
  TextInput,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

let male = { 'bg': '#007bff', 'color': '#FFF'};
let female = { 'bg' : 'transparent', 'color' : '#007bff' };

const App = () => {

  const [isMale, setIsMale] = useState(true);
  const [height, setHeight] = useState('');
  const [idealWeight, setIdealWeight] = useState(0);

  function handleGenderClick(gender){
    if(gender === 'male') {

      male.bg = '#007bff';
      male.color = '#FFF';

      female.bg = 'transparent';
      female.color = '#007bff';

      setIsMale(true);
    }else {

      female.bg = '#007bff';
      female.color = '#FFF';

      male.bg = 'transparent';
      male.color = '#007bff';

      setIsMale(false);
    }
  }

  function handleCalculateClick() {
    if(height === '') {alert("Digite sua Altura!"); return}

    let result, hReplaced, hNumber;

    hReplaced = height.replace(',', '.');
    hNumber = parseFloat(hReplaced);

    if(isMale) {      
      result = (72.7 * hNumber) - 58;
      setIdealWeight(result.toFixed(2));
    }else {
      result = (62.1 * hNumber) - 44.7;
      setIdealWeight(result.toFixed(2));
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#FFF'} barStyle={'dark-content'} />

      <View style={styles.buttonsContainer}>

        <TouchableOpacity 
          style={[styles.genderButtons, {backgroundColor: male.bg}]} 
          onPress={() => handleGenderClick('male')} 
        >
          <Text style={[styles.genderButtonsText, {color: male.color}]}>Homem</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.genderButtons, {backgroundColor: female.bg}]}
          onPress={() => handleGenderClick('female')}
        >
          <Text style={[styles.genderButtonsText, {color: female.color}]}>Mulher</Text>
        </TouchableOpacity>

      </View>

      <TextInput 
        style={styles.input} 
        placeholder='Digite sua altura aqui...'
        value={height}
        onChangeText={heightTxt => setHeight(heightTxt)}  
      />

      <TouchableOpacity 
        style={styles.button}
        onPress={() => handleCalculateClick()}
      >
        <Text style={styles.buttonText}>Calcular</Text>
      </TouchableOpacity>

      <Text style={styles.idealWeightText}>
        Seu peso ideal é: {idealWeight}kg
      </Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#FFF'
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 65
  },
  genderButtons: {
    flex: 1,
    padding: 15,
    margin: 10,
    borderColor: '#007bff',
    borderWidth: 1,
    borderRadius: 6
  },
  genderButtonsText: {
    textAlign: 'center',
    fontWeight: '700'
  },
  input: {
    borderBottomColor: '#007bff',
    borderBottomWidth: 1,
    width: '100%'
  },
  button: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    marginTop: 35,
    backgroundColor: '#007bff',
    borderRadius: 6
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    fontWeight: 'bold'
  },
  idealWeightText: {
    fontSize: 23,
    marginTop: 25
  }
});

export default App;
