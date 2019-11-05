import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {iOSColors, robotoWeights} from 'react-native-typography';
import {NavigationEvents} from 'react-navigation';
import {FlatGrid} from 'react-native-super-grid';
import Modal from 'react-native-modalbox';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

import Loading from '../components/Loading';

// Redux
import {connect} from 'react-redux';
import {findAllRooms, addRoom, updateRoom} from '../redux/actions/room';

export class Room extends Component {
  state = {
    roomName: '',
    isOpen: false,
    isDisable: false,
    roomItem: null,
    showError: false,
  };

  fetchRoom = () => {
    const {token, dispatch} = this.props;
    dispatch(findAllRooms(token));
  };

  handleAddRoom = () => {
    const {token, dispatch} = this.props;
    if (this.state.roomName !== '') {
      dispatch(addRoom(this.state.roomName, token));
    } else {
      this.setState({showError: true});
    }
  };

  clearState = () => {
    this.setState({
      roomName: '',
      showError: false,
    });
  };

  handleEditRoom = id => {
    const {token, dispatch} = this.props;
    if (this.state.roomName !== '') {
      dispatch(updateRoom(id, this.state.roomName, token));
    } else {
      this.setState({showError: true});
    }
  };

  _renderModal() {
    return (
      <Modal
        style={styles.modalBox}
        position={'center'}
        ref={'add_room'}
        isDisabled={this.state.isDisable}
        onClosed={() => this.clearState()}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add Room</Text>

          <Text style={styles.modalLabel}>Room Name</Text>
          <TextInput
            onChangeText={input => this.setState({roomName: input})}
            style={styles.modalInput}
            placeholder="Enter room name..."
          />
          {this.state.showError && (
            <Text style={styles.errorMsg}>Name is required</Text>
          )}
          <View
            style={{
              flex: 2,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.handleAddRoom()}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  _renderModalEdit() {
    const {roomItem} = this.state;
    return (
      <Modal
        style={styles.modalBox}
        position={'center'}
        ref={'edit_room'}
        isDisabled={this.state.isDisable}
        onClosed={() => this.setState({showError: false})}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Edit Room</Text>

          <Text style={styles.modalLabel}>Room Name</Text>
          <TextInput
            value={this.state.roomName}
            style={styles.modalInput}
            onChangeText={input => this.setState({roomName: input})}
          />
          {this.state.showError && (
            <Text style={styles.errorMsg}>Name is required</Text>
          )}
          <View
            style={{
              flex: 2,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.handleEditRoom(roomItem.id)}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    const {isLoading, rooms} = this.props;
    if (isLoading) return <Loading />;
    return (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={this.fetchRoom} />
        <FlatGrid
          itemDimension={90}
          items={rooms}
          style={styles.gridView}
          renderItem={({item, index}) => {
            if (index == rooms.length - 1) {
              return (
                <TouchableWithoutFeedback
                  onPress={() => this.refs.add_room.open()}>
                  <View
                    style={[
                      styles.itemContainer,
                      {borderColor: iOSColors.white},
                    ]}>
                    <View style={{flex: 2, justifyContent: 'flex-end'}}>
                      <Icon name="plus" size={30} color={iOSColors.blue} />
                    </View>
                    <View style={{flex: 1, justifyContent: 'flex-end'}}>
                      <Text style={styles.itemSubtitle}>Add Room</Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              );
            }
            return (
              <TouchableWithoutFeedback
                onPress={() => {
                  this.setState({
                    roomName: item.name,
                    roomItem: item,
                  });
                  this.refs.edit_room.open();
                }}>
                <View style={styles.itemContainer}>
                  <Text style={styles.itemName}>{item.name}</Text>
                </View>
              </TouchableWithoutFeedback>
            );
          }}
        />
        {this._renderModal()}
        {this._renderModalEdit()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: iOSColors.white,
  },
  gridView: {
    marginTop: 20,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: iOSColors.white,
    borderColor: iOSColors.blue,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    height: 110,
  },
  itemName: {
    ...robotoWeights.medium,
    fontSize: 20,
    color: iOSColors.black,
    fontWeight: '600',
  },
  itemSubtitle: {
    ...robotoWeights.thin,
    fontWeight: 'bold',
    fontSize: 12,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    height: 240,
    width: 300,
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
  },
  modalTitle: {
    ...robotoWeights.light,
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalLabel: {
    ...robotoWeights.light,
    fontSize: 15,
  },
  modalInput: {
    paddingHorizontal: 5,
    marginTop: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: iOSColors.midGray,
    height: 40,
  },
  button: {
    width: '100%',
    padding: 10,
    borderRadius: 5,
    backgroundColor: iOSColors.blue,
  },
  buttonText: {
    color: iOSColors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorMsg: {
    ...robotoWeights.thin,
    marginTop: 5,
    color: iOSColors.red,
    fontSize: 13,
    fontWeight: 'bold',
  },
});

Room.propTypes = {
  token: PropTypes.string,
  rooms: PropTypes.array,
  isLoading: PropTypes.bool,
};

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    rooms: state.room.rooms,
    isLoading: state.room.isLoading,
  };
};

export default connect(mapStateToProps)(Room);
