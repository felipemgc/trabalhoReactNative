import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, Button, Picker, ActivityIndicator } from 'react-native'

class App extends Component {
  static navigationOptions = {
    title: 'Busca de médicos',
    headerTintColor: '#841584'
  }

  constructor(props) {
    super(props);
    this.state = {isLoading: true, 
                  text: '' , 
                  especialidade: '',
                  convenio: '',
                  local: '',
                };
    }

    componentDidMount() {
      this.loadData()
      
  }

  loadData = async () => {
    
    return fetch(`https://app.tisaude.com/api/rest/agenda/especialidades`)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            isLoading: false,
            dataSource: responseJson
          }, function() {
            // In this block you can do something with new state.
          });
        })
        .catch((error) => {
          
          this.setState({isLoading: false});
          console.error(error);
        });
        
  }


  render() {

        if (this.state.isLoading) {
          return (
            <View style={{flex: 1, paddingTop: 20}}>
              <ActivityIndicator />
            </View>
          );
        }
        return (
          <View style={styles.containerStyle}>

          
                
                
                <Text style={{ marginTop:30, marginHorizontal:10, height: 40, fontSize: 20}}> Nome do médico: </Text>
                <TextInput
                  style={{ paddingLeft : 10, marginHorizontal:10, height: 40}}
                  placeholder = 'Digite o nome'
                  onChangeText={(text) => this.setState({text})}
                  value={this.state.text}
                  />
                  <Text style={styles.text}> Especialidade: </Text>
                  <Picker
                    style={styles.Picker}
                    selectedValue={this.state.especialidade}
                    onValueChange={(itemValue, itemIndex) => this.setState({especialidade: itemValue})}>
                    
                    <Picker.Item label="Selecione" value="" />
                    { this.state.dataSource.map((item, key)=>(
                      <Picker.Item label={item.nome} value={item.nome} key={key} />)
                      )}
                    </Picker>
                  <Text style={styles.text}> Plano de saúde: </Text>
                  <Picker
                  style={styles.Picker}
                  selectedValue={this.state.convenio}
                  
                  onValueChange={(itemValue, itemIndex) => this.setState({convenio:
                  itemValue})}>
                  <Picker.Item label="Selecione" value="" />
                  <Picker.Item label="PARTICULAR" value="PARTICULAR" />
                  <Picker.Item label="AMIL" value="AMIL" />
                  <Picker.Item label="BRADESCO" value="BRADESCO" />
                  <Picker.Item label="CAIXA" value="CAIXA" />
                  <Picker.Item label="CASSI" value="CASSI" />
                  <Picker.Item label="GEAP" value="GEAP" />
                  <Picker.Item label="HAPVIDA" value="HAPVIDA" />
                  <Picker.Item label="SULAMÉRICA" value="SULAMÉRICA" />
                  <Picker.Item label="SUS" value="SUS" />
                  <Picker.Item label="UNIMED" value="UNIMED" />

                  
                  
                  </Picker>
                  <Text style={styles.text}> Localização: </Text>
                  <Picker
                  style={styles.Picker}
                  selectedValue={this.state.local}
                  
                  onValueChange={(itemValue, itemIndex) => this.setState({local:
                  itemValue})}>
                  <Picker.Item label="Selecione" value="" />
                  <Picker.Item label="CABO DE SANTO AGOSTINHO" value="CABO DE SANTO AGOSTINHO" />
                  <Picker.Item label="CARPINA" value="CARPINA" />
                  <Picker.Item label="CARUARU" value="CARUARU" />
                  <Picker.Item label="GARANHUNS" value="GARANHUNS" />
                  <Picker.Item label="JABOATÃO DOS GUARARAPES" value="JABOATÃO DOS GUARARAPES" />
                  <Picker.Item label="JOÃO PESSOA" value="JOÃO PESSOA" />
                  <Picker.Item label="OLINDA" value="OLINDA" />
                  <Picker.Item label="RECIFE" value="RECIFE" />
                  </Picker>
                  <View style={{paddingTop: 30 }}>
                  <Button
                     
                    onPress={() => this.props.navigation.navigate('Medicos', {  nome: this.state.text,
                                                                                especialidade: this.state.especialidade, 
                                                                                convenio: this.state.convenio, 
                                                                                local: this.state.local })}
                      
                    title="Buscar"
                    color="#841584"
                    accessibilityLabel="Buscar profissionais"
                  />
                  </View>
                
          </View>
      )
  }
}
const styles = StyleSheet.create({
    containerStyle: {
      flex: 1,
      flexDirection: 'column', 
      alignItems: 'stretch'
    },
    
    text: {
      paddingTop: 10,
      fontSize: 20,
      alignItems: 'center',

      
    },
    Picker: {
      paddingTop: 10
    }
});

export default App