import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import {iOSColors, robotoWeights} from 'react-native-typography';
import {NavigationEvents} from 'react-navigation';
import Modal from 'react-native-modalbox';
import Icon from 'react-native-vector-icons/FontAwesome';

// Components
import Loading from '../components/Loading';
import {StretchCard} from '../components/Card';

// Redux
import {connect} from 'react-redux';
import {findAllCustomers, submitCustomer} from '../redux/actions/customer';

export class Customer extends Component {
  state = {
    isOpen: false,
    isDisabled: false,
    customerId: 0,
    name: '',
    identityNumber: '',
    phoneNumber: '',
    isEdit: false,
  };

  fetchData = () => {
    const {token, dispatch} = this.props;
    dispatch(findAllCustomers(token));
  };

  handleOnPress = () => {
    const {token, dispatch} = this.props;
    const {name, identityNumber, phoneNumber, customerId, isEdit} = this.state;
    const data = {
      customerId,
      name,
      identityNumber,
      phoneNumber,
    };
    // method that will be send to server
    const method = isEdit ? 'PUT' : 'POST';
    dispatch(submitCustomer(data, token, method));

    // clear state after dispatching event
    this.setState({
      name: '',
      identityNumber: '',
      phoneNumber: '',
      image: '',
      isEdit: false,
    });
  };

  toggleEdit = customer => {
    this.setState({
      isEdit: true,
      customerId: customer.id,
      name: customer.name,
      identityNumber: customer.identityNumber,
      phoneNumber: customer.phoneNumber,
      image: customer.image,
    });
    this.refs.modal_customer.open();
  };

  toggleClose = () => {
    const {isEdit} = this.state;
    if (isEdit) {
      // clear the state if modal closed
      this.setState({
        customerId: 0,
        name: '',
        identityNumber: '',
        phoneNumber: '',
        isEdit: false,
      });
    }
  };

  _renderModal() {
    const {isEdit} = this.state;
    return (
      <Modal
        style={styles.modalBox}
        position={'center'}
        ref={'modal_customer'}
        isDisabled={this.state.isDisabled}
        onClosed={this.toggleClose}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            {isEdit ? 'Edit' : 'Add'} Customer
          </Text>

          <Text style={styles.modalLabel}>Name*</Text>
          <TextInput
            onChangeText={input => this.setState({name: input})}
            value={this.state.name}
            style={styles.modalInput}
            placeholder="Enter name..."
          />

          <Text style={styles.modalLabel}>Identity Number*</Text>
          <TextInput
            onChangeText={input => this.setState({identityNumber: input})}
            value={this.state.identityNumber}
            style={styles.modalInput}
            placeholder="Enter identity number..."
          />

          <Text style={styles.modalLabel}>Phone Number</Text>
          <TextInput
            onChangeText={input => this.setState({phoneNumber: input})}
            value={this.state.phoneNumber}
            style={styles.modalInput}
            placeholder="Enter phone number..."
          />
          <Text style={styles.modalLabel}>Photo (optional)</Text>
          <View
            style={{
              marginTop: 10,
              width: 110,
              height: 100,
              borderWidth: 1,
              borderColor: iOSColors.midGray,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
              overflow: 'hidden',
            }}>
            {isEdit ? (
              <Image
                source={{uri: this.state.image}}
                style={{width: 110, height: 110}}
                resizeMode="cover"
              />
            ) : (
              <Icon name="photo" size={30} />
            )}
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={styles.button}
              onPress={this.handleOnPress}>
              <Text style={styles.buttonText}>
                {isEdit ? 'Update' : 'Save'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    const {customers, isLoading} = this.props;
    if (isLoading) return <Loading />;
    return (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={this.fetchData} />
        <View
          style={{
            height: 50,
            borderBottomStartRadius: 10,
            borderBottomEndRadius: 10,
            borderColor: iOSColors.white,
            justifyContent: 'center',
            backgroundColor: iOSColors.blue,
            paddingHorizontal: 5,
          }}>
          <View
            style={{
              height: 40,
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: iOSColors.white,
              borderRadius: 5,
              padding: 5,
              backgroundColor: iOSColors.white,
              alignItems: 'center',
            }}>
            <Icon
              name="search"
              size={28}
              style={{marginHorizontal: 5}}
              color={iOSColors.blue}
            />
            <TextInput
              style={{
                width: '90%',
                height: 40,
                paddingBottom: 10,
                justifyContent: 'flex-end',
              }}
              placeholder="Search Customer"
              placeholderTextColor={iOSColors.midGray}
            />
          </View>
        </View>
        <FlatList
          data={customers}
          renderItem={({item}) => (
            <StretchCard
              data={item}
              role="customer"
              eventTrigger={this.toggleEdit}
            />
          )}
          keyExtractor={item => String(item.id)}
        />
        <View style={styles.iconContainer}>
          <Icon
            name="plus-circle"
            size={60}
            color={iOSColors.blue}
            onPress={() => this.refs.modal_customer.open()}
          />
        </View>
        {this._renderModal()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: iOSColors.white,
  },
  iconContainer: {
    alignItems: 'center',
    width: 60,
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    height: 510,
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
    marginBottom: 10,
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
});

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    customers: state.customer.customers,
    isLoading: state.customer.isLoading,
  };
};

export default connect(mapStateToProps)(Customer);
