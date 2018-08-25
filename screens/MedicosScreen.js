import React, { Component } from 'react'
import { FlatList, View, RefreshControl, Text } from 'react-native'
import { ListItem } from '../components'


export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Medicos',
    headerTintColor: '#841584'
  }

  state = {
    
    isLoading: false,
    
  }

  async componentDidMount() {

    this.loadData()

  }

  loadData = async () => {

    let nome = this.props.navigation.getParam('nome')
    let especialidade = this.props.navigation.getParam('especialidade')
    let convenio = this.props.navigation.getParam('convenio')
    let local = this.props.navigation.getParam('local')


    this.setState({isLoading: true})
    var url = 'https://app.tisaude.com/api/rest/agenda/profissionais?busca='+nome+'&convenio='+convenio+'&especialidade='+especialidade+'&uf=PE&cidade='+local;
    
    return fetch(url)
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

  onRefresh = () => {
    () => this.loadData()
  }

  onLoadMoreData = () => {
    () => this.loadData()
  }

  onItemPress = (Medico) => {
    alert("O doutor(a) " + Medico.nome + ". Tem especialidade: " + Medico.especialidade + " trabalha na clinica: " + Medico.cliente.nome + " em "+ Medico.cliente.estado + "/" +Medico.cliente.cidade );
  }

  renderItem = ({item}) => (
    <ListItem item={item} onPress={this.onItemPress} />
  )

  render() {
    return (
      <FlatList style={{flex:1}}
        data={this.state.dataSource}
        renderItem={this.renderItem}
        refreshing={this.state.isLoading}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isLoading}
            onRefresh={this.onRefresh}
          />
        }
        removeClippedSubviews
        onEndReached={this.onLoadMoreData}
        onEndReachedThreshold={0.5}
        ItemSeparatorComponent={()=><View style={{height: 2, backgroundColor:'#fff'}} />}
        keyExtractor={(item) => item.id.toString()}
      />
      // <View><Text>aeaeae</Text></View>
    )
  }
}