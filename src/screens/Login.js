import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {iOSColors, robotoWeights} from 'react-native-typography';
import axios from '../services/api';

// Redux
import {connect} from 'react-redux';
import {login} from '../redux/actions/auth';

export class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  componentDidMount() {
    const {isLogin, navigation} = this.props;
    if (isLogin) navigation.navigate('Room');
  }

  handleLogin = async () => {
    const {dispatch, navigation} = this.props;
    try {
      const objInput = {
        email: this.state.email,
        password: this.state.password,
      };
      const response = await axios({
        method: 'POST',
        url: '/auth/login',
        data: objInput,
      });
      dispatch(login(response.data));
      navigation.navigate('Room');
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  render() {
    return (
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <Text style={styles.moo}>Moo Spaces</Text>
            <Text style={styles.subMoo}>
              Rent desk space in a shared office environment.
            </Text>
          </View>
          <View style={styles.bottomContainer}>
            <Text style={styles.textTitle}>Email</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Email"
              onChangeText={input => this.setState({email: input})}
            />

            <Text style={styles.textTitle}>Password</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={input => this.setState({password: input})}
            />
            <View style={{alignItems: 'center', marginTop: 40}}>
              <TouchableOpacity
                style={styles.button}
                onPress={this.handleLogin}>
                <Text style={styles.textButton}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: iOSColors.blue,
  },
  bottomContainer: {
    flex: 1,
  },
  moo: {
    ...robotoWeights.light,
    marginTop: 20,
    fontSize: 25,
    color: iOSColors.white,
    letterSpacing: 0.8,
    fontWeight: 'bold',
  },
  subMoo: {
    ...robotoWeights.thin,
    color: iOSColors.white,
    marginVertical: 5,
  },
  textTitle: {
    fontSize: 15,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  textInput: {
    paddingHorizontal: 5,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: iOSColors.midGray,
    height: 40,
  },
  button: {
    padding: 10,
    width: '50%',
    height: 40,
    marginHorizontal: 10,
    backgroundColor: iOSColors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  textButton: {
    ...robotoWeights.light,
    fontWeight: 'bold',
    color: iOSColors.white,
  },
});

const mapStateToProps = state => {
  return {
    isLogin: state.auth.isLogin,
  };
};

export default connect(mapStateToProps)(Login);
