import React, { PureComponent } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import numbro from 'numbro'

export default class ListItem extends PureComponent {
 
  
  render() {
    const { item, onPress} = this.props
    return (
      <TouchableOpacity style={styles.row} onPress={() => onPress(item) }>
        
        <Image
          style={styles.MedicoImage}
          source={{ uri: item.cliente.img_logo }}
        />
        <View >
          <Text>{item.nome}</Text>
          <Text>({item.especialidade})</Text>
        </View>
        
      </TouchableOpacity>
    )    
  }
} 

const styles = StyleSheet.create({
  row: { 
    height: 60, 
    flexDirection: 'row', 
    alignItems: 'center'
  },
  MedicoImage: { 
    height: 32, 
    width: 32, 
    marginHorizontal:10 
  }
  
})