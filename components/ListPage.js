import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import {
  View,
  TouchableHighlight,
  ListView,
  Modal,
  StyleSheet,
  Text
} from 'react-native'

const allMatchesQuery = gql`
  query {
    allMatches(orderBy: createdAt_DESC) {
      id,
      firstPlayer {username},
      game {title},
      winner {username},
      players {username}
      }
  }`

class ListPage extends React.Component {

  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows([]),
      modalVisible: false,
      user: undefined,
    }

  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.allMatchesQuery.loading && !nextProps.allMatchesQuery.error) {
      const {dataSource} = this.state
      this.setState({
        dataSource: dataSource.cloneWithRows(nextProps.allMatchesQuery.allMatches),
      })
    }
  }

  render () {
    if (this.props.allMatchesQuery.loading) {
      return (<Text>Loading</Text>)
    }

    return (
      <View style={styles.container}>

        <ListView
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData.id}</Text>}
        />
      </View>
    )
  }
 }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  }
})

export default graphql(allMatchesQuery, {name: 'allMatchesQuery'})(ListPage)