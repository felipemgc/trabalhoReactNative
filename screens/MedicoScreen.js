import React, { Component } from 'react'
import { View, Text, Dimensions, ActivityIndicator, StyleSheet, ScrollView } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import moment from 'moment'
import numbro from 'numbro'
import { Cell } from '../components'
import { getLast7Days } from '../services'

export default class MedicoScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('Medico').name,
    headerTintColor: '#000'
  })

  state = {
    chartData: {
      labels: [],
      values: []
    },
    chartLoaded: false,
  }

  async componentDidMount() {
    const Medico = this.props.navigation.getParam('Medico')
    const chartData = await getLast7Days(Medico.symbol)
    this.setState({ chartData, chartLoaded: true })
  }


  renderChart = () => (
    <LineChart
      data={{
        labels: this.state.chartData.labels,
        datasets: [{
          data: this.state.chartData.values
        }]
      }}
      width={Dimensions.get('window').width - 10} // from react-native
      height={220}
      chartConfig={{
        backgroundGradientFrom: '#fff',
        backgroundGradientTo: '#fff',
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
          borderRadius: 0,
        }
      }}
      style={{
        marginVertical: 10,
        marginHorizontal: 5,
      }}
    />
  )

  renderLoading = () => (
    <View style={{height:240, justifyContent:'center', alignItems:'center'}}>
      <ActivityIndicator size="large" />
    </View>
  )

  render() {
    const Medico = this.props.navigation.getParam('Medico')
    const date = moment.unix(Medico.last_updated)
    return (
      <ScrollView>
        <View style={ styles.contentHeader }>
          <Text style={{ fontSize: 24 }}>${numbro(Medico.quotes.USD.price).format({thousandSeparated: true, mantissa: 2})}</Text>
          <Text style={{ color: 'gray' }}>{date.format("dddd, MMMM Do YYYY, h:mm:ss a")}</Text>
        </View>
        {!this.state.chartLoaded ?
          this.renderLoading()
          :
          this.renderChart()
        }
        <View style={styles.row}>
            <Cell title='Name:' value={Medico.name}/>
            <Cell title='Symbol:' value={Medico.symbol}/>
        </View>
        <View style={styles.row}>
            <Cell title='Price (USD):' value={'$' + numbro(Medico.quotes.USD.price).format({thousandSeparated: true, mantissa: 2})}/>
            <Cell title='Price (BTC):' value={'฿ ' + Medico.quotes.BTC.price}/>
        </View>
        <View style={styles.row}>
            <Cell title='24h volume:' value={'$' + numbro(Medico.quotes.USD.volume_24h).format({thousandSeparated: true})}/>
            <Cell title='Market cap:' value={'$' + numbro(Medico.quotes.USD.market_cap).format({thousandSeparated: true})}/>
        </View>
        <View style={styles.row}>
            <Cell title='Available supply:' value={numbro(Medico.circulating_supply).format({thousandSeparated: true}) + Medico.symbol}/>
            <Cell title='Total supply:' value={numbro(Medico.total_supply).format({thousandSeparated: true}) + Medico.symbol}/>
        </View>
        <View style={styles.row}>
            <Cell title='Max supply:' value={Medico.max_supply ? numbro(Medico.max_supply).format({thousandSeparated: true}) + Medico.symbol : 'N/A'}/>
        </View>
        <View style={[styles.row, {marginBottom: 20}]}>
            <Cell title='Change 1h' percentual value={Medico.quotes.USD.percent_change_1h}/>
            <Cell title='Change 24h' percentual value={Medico.quotes.USD.percent_change_24h}/>
            <Cell title='Change 4d' percentual value={Medico.quotes.USD.percent_change_7d}/>
        </View>
      </ScrollView>
    )
  }

}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row', 
    height: 50
  },
  contentHeader: {
    width: '100%', 
    alignItems: 'center', 
    marginTop: 20,
  }
})