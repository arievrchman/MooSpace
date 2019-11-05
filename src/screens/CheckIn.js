import React, {PureComponent} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
  Picker,
} from 'react-native';
import {iOSColors, robotoWeights} from 'react-native-typography';
import {NavigationEvents} from 'react-navigation';
import {FlatGrid} from 'react-native-super-grid';
import Modal from 'react-native-modalbox';
import Loading from '../components/Loading';

// Redux
import {connect} from 'react-redux';
import {findAllOrders, checkIn, checkOut} from '../redux/actions/order';
import {findAllCustomers} from '../redux/actions/customer';

export class CheckIn extends PureComponent {
  state = {
    isOpen: false,
    isDisable: false,
    dataRoom: {},
    customer: null,
    duration: '',
    isDone: true,
    showError: false,
    showErrorDuration: false,
  };

  fetchCheckIn = () => {
    const {token, dispatch} = this.props;
    dispatch(findAllOrders(token));
    dispatch(findAllCustomers(token));
  };

  handleSubmit = val => {
    const {duration, customer, dataRoom} = this.state;
    const {token, dispatch} = this.props;
    const data = {
      customerId: customer && customer.id,
      duration: +duration,
      roomId: dataRoom.id,
    };
    if (val) {
      if (!data.customerId && !data.duration) {
        this.setState({
          showError: true,
          showErrorDuration: true,
        });
      } else {
        if (!data.customerId) {
          this.setState({
            showError: true,
            showErrorDuration: false,
          });
        } else if (!data.duration) {
          this.setState({
            showError: false,
            showErrorDuration: true,
          });
        } else {
          this.setState({
            showError: false,
            showErrorDuration: false,
          });
          dispatch(checkIn(data, token));
          this.setState({
            customer: null,
            duration: '',
          });
        }
      }
    } else {
      const orderId = dataRoom.order.id;
      dispatch(checkOut(orderId, token));
    }
  };

  handleAutomate = id => {
    const {token, dispatch} = this.props;
    dispatch(checkOut(id, token));
  };

  updateCust = customer => {
    this.setState({customer});
  };

  clearState = () => {
    this.setState({
      showError: false,
      showErrorDuration: false,
    });
  };

  _renderModal() {
    const {dataRoom, isDone} = this.state;
    const {customers} = this.props;
    const duration = !isDone
      ? String(dataRoom.order.duration)
      : this.state.duration;
    return (
      <Modal
        style={styles.modalBox}
        position={'center'}
        ref={'modal_checkin'}
        isDisabled={this.state.isDisabled}
        onClosed={() => this.clearState()}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            {isDone ? 'Checkin' : 'Checkout'}
          </Text>
          <Text style={styles.modalLabel}>Room Name</Text>
          <TextInput
            style={[styles.modalInput, {backgroundColor: iOSColors.midGray}]}
            value={dataRoom.name}
            editable={false}
          />
          <View>
            <Text style={styles.modalLabel}>Customer</Text>
          </View>
          {isDone ? (
            <>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: iOSColors.midGray,
                  borderRadius: 5,
                  marginTop: 10,
                }}>
                <Picker
                  style={{
                    height: 40,
                    width: '103%',
                  }}
                  selectedValue={this.state.customer}
                  onValueChange={this.updateCust}
                  enabled={isDone}>
                  <Picker.Item label="Select Customer" />
                  {customers.map(item => {
                    return (
                      <Picker.Item
                        key={String(item.id)}
                        label={`${item.name} - ${item.phoneNumber}`}
                        value={item}
                      />
                    );
                  })}
                </Picker>
              </View>
              {this.state.showError && (
                <Text style={styles.errorMsg}>Please select customer.</Text>
              )}
            </>
          ) : (
            <TextInput
              style={[styles.modalInput, {backgroundColor: iOSColors.midGray}]}
              value={`${dataRoom.customer.name} - ${dataRoom.customer.phoneNumber}`}
              editable={false}
            />
          )}

          <Text style={[styles.modalLabel, {marginTop: 10}]}>
            Duration (minutes)
          </Text>
          <TextInput
            style={
              isDone
                ? [styles.modalInput, {marginBottom: 0}]
                : [styles.modalInput, {backgroundColor: iOSColors.midGray}]
            }
            value={duration}
            placeholder="Enter duration..."
            onChangeText={input => this.setState({duration: input})}
            editable={isDone}
          />
          {this.state.showErrorDuration && (
            <Text style={styles.errorMsg}>Duration is required.</Text>
          )}

          <View
            style={{
              flex: 2,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.handleSubmit(isDone)}>
              <Text style={styles.buttonText}>
                {isDone ? 'Checkin' : 'Checkout'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  toggleValue = item => {
    this.setState({dataRoom: item});
    if (item.order !== null) {
      this.setState({isDone: false});
    } else {
      this.setState({isDone: true});
    }
    this.refs.modal_checkin.open();
  };

  render() {
    const {isLoading, orders} = this.props;
    if (isLoading) return <Loading />;
    return (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={this.fetchCheckIn} />
        <FlatGrid
          itemDimension={90}
          items={orders}
          style={styles.gridView}
          renderItem={({item}) => {
            if (item.isDone !== null && item.customer !== null) {
              const endtime = new Date(item.order.orderEndTime).toISOString();

              const interval = setInterval(() => {
                const now = Date.parse(endtime) - Date.parse(new Date());
                if (now <= 0) {
                  clearInterval(interval);
                  this.handleAutomate(item.order.id);
                } else if (now >= 0) {
                  const seconds = Math.floor((now / 1000) % 60);
                  const minutes = Math.floor((now / 1000 / 60) % 60);
                  // const hours = Math.floor((now / (1000 * 60 * 60)) % 24);
                  // const days = Math.floor(now / (1000 * 60 * 60 * 24));
                  console.log(minutes, seconds);
                }
              }, 1000);
            }
            return (
              <TouchableWithoutFeedback onPress={() => this.toggleValue(item)}>
                <View
                  style={[
                    styles.itemContainer,
                    {
                      backgroundColor:
                        item.order !== null && !item.order.isDone
                          ? iOSColors.midGray
                          : iOSColors.green,
                    },
                  ]}>
                  <Text style={styles.itemName}>{item.name}</Text>
                </View>
              </TouchableWithoutFeedback>
            );
          }}
        />
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
  header: {
    height: 50,
    backgroundColor: iOSColors.blue,
    justifyContent: 'center',
  },
  headerText: {
    ...robotoWeights.medium,
    fontSize: 25,
    color: iOSColors.white,
    textAlign: 'center',
  },
  gridView: {
    marginTop: 20,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: iOSColors.white,
    borderColor: iOSColors.midGray,
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
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    height: 430,
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
    color: iOSColors.black,
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
  errorMsg: {
    ...robotoWeights.thin,
    marginTop: 5,
    color: iOSColors.red,
    fontSize: 13,
    fontWeight: 'bold',
  },
});

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    orders: state.order.orders,
    customers: state.customer.customers,
    isLoading: state.order.isLoading,
  };
};

export default connect(mapStateToProps)(CheckIn);
