import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const App = () => {

  const [hoursValue, setHoursValue] = useState('');
  const [hoursWorked, setHoursWorked] = useState('');
  const [hasPaid, setHasPaid] = useState({ INSS: 0, UNION: 0 });
  const [salaries, setSalaries] = useState({ grossSalary: 0, netSalary: 0 });

  function handleCalculatePress() {
    if(!hoursWorked || !hoursValue) {alert('Preencha todos os campos!'); return}

    let grossSalary = calculateGrossSalary();

    let discounts = calculateDiscounts(grossSalary);

    let netSalary = grossSalary - discounts;    

    setSalaries({grossSalary, netSalary});
    setHoursValue('');
    setHoursWorked('');

  }

  function calculateGrossSalary() {

    let replacedHoursValue = hoursValue.replace(',', '.');
    let replacedHoursWorked = hoursWorked.replace(',', '.');

    let finalHoursValue = parseFloat(replacedHoursValue);
    let finalHoursWorked = parseFloat(replacedHoursWorked);

    let grossSalary = finalHoursValue * finalHoursWorked;

    return grossSalary;
  }

  function calculateDiscounts(grossSalary) {
    let IR = grossSalary * (11 / 100);
    let INSS = grossSalary * (8 / 100);
    let UNION = grossSalary * (5 / 100);

    let discounts = IR + INSS + UNION;

    setHasPaid({INSS, UNION});

    return discounts;
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#0F0F0F' barStyle='light-content'/>      

      <TextInput 
        keyboardType='number-pad'
        placeholder='Digite aqui o valor da sua hora...'
        placeholderTextColor= '#333'
        style={styles.textInput} 
        value={hoursValue}
        onChangeText={ hoursValueText=> setHoursValue(hoursValueText) }
      />

      <TextInput 
        keyboardType='number-pad'
        placeholder='Digite aqui as horas trabalhadas no mês...'
        placeholderTextColor= '#333'
        style={styles.textInput} 
        value={hoursWorked}
        onChangeText={ hoursWorkedText=> setHoursWorked(hoursWorkedText) }
      />

      <TouchableOpacity 
        style={styles.calculateBtn} 
        onPress={handleCalculatePress}
      >
        <Text style={styles.calculateBtnText}>CALCULAR</Text>
      </TouchableOpacity>

      <KeyboardAvoidingView style={{width: '100%'}} behavior='height'>
        <View style={styles.display}>
          <Text style={styles.displayText}>
            Sálario Bruto: <Text style={styles.highlitedText}>R${salaries.grossSalary}</Text>
          </Text>

          <Text style={styles.displayText}>
            INSS:  <Text style={styles.highlitedText}>R${hasPaid.INSS.toFixed(2)}
                    </Text>
          </Text>

          <Text style={styles.displayText}>
            Sindicato:  <Text style={styles.highlitedText}>R${hasPaid.UNION.toFixed(2)}</Text>
          </Text>

          <Text style={styles.displayText}>
            Sálario Líquido:  <Text style={styles.highlitedText}>R${salaries.netSalary}</Text>
          </Text>
        </View>        
      </KeyboardAvoidingView>
      
    </View>     
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0F0F0F',
    display: 'flex',
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: 25
  },
  textInput: {
    width: '100%',
    borderBottomColor: '#00FF00',
    borderBottomWidth: 1,
    color: '#EEE',
    paddingHorizontal: 10,
    marginVertical: 10,
    fontSize: 18
  },
  calculateBtn: {
    width: '100%',
    padding: 20,
    marginVertical: 20,
    borderColor: '#00FF00',
    borderRadius: 8,
    borderWidth: 1
  },
  calculateBtnText: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '600',
    color: '#00FF00'
  },
  display: {
    width: '100%',
    paddingVertical: 20
  },
  displayText: {
    color: '#EEE',
    fontSize: 22,
    marginVertical: 8
  },
  highlitedText: {
    color: '#00FF00'
  }
});

export default App;
