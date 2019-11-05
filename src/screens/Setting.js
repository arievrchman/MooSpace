import React, {PureComponent} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {iOSColors, robotoWeights} from 'react-native-typography';
import {connect} from 'react-redux';
import {StretchCard} from '../components/Card';
import {logout} from '../redux/actions/auth';

const admin_image =
  'http://blog.hepdata.com/wp-content/uploads/2016/07/Admin-icon.png';

export class Setting extends PureComponent {
  handleLogout = () => {
    const {dispatch, navigation} = this.props;
    dispatch(logout());
    navigation.navigate('Login');
  };
  render() {
    const {user} = this.props;
    const data = {
      user,
      image: admin_image,
    };

    return (
      <View style={styles.mainContainer}>
        <StretchCard data={data} />
        <View style={{alignItems: 'center', marginTop: 20}}>
          <TouchableOpacity style={styles.button} onPress={this.handleLogout}>
            <Icon name="power-off" size={25} />
            <Text style={styles.text}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  button: {
    flexDirection: 'row',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: iOSColors.gray,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    marginTop: 20,
  },
  text: {
    ...robotoWeights.light,
    marginLeft: 10,
    fontWeight: 'bold',
  },
});

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(Setting);
