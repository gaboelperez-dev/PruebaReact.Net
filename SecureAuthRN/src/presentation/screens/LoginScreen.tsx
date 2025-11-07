import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useLogin } from '@presentation/hooks/useAuth';

const schema = Yup.object({
  email: Yup.string().email('Email inválido').required('Requerido'),
  password: Yup.string().min(6).required('Requerido'),
});

export default function LoginScreen({ navigation }: any){
  const login = useLogin();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={schema}
        onSubmit={(v) => login.mutate(v)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              placeholder="Email"
              autoCapitalize='none'
              style={styles.input}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {touched.email && !!errors.email && <Text style={styles.err}>{errors.email}</Text>}
            <TextInput
              placeholder="Password"
              secureTextEntry
              style={styles.input}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {touched.password && !!errors.password && <Text style={styles.err}>{errors.password}</Text>}
            <Button title={login.isPending ? 'Entrando…' : 'Entrar'} onPress={() => handleSubmit()} />
            <Text style={{marginTop:16}}>¿No tienes cuenta? <Text style={{color:'blue'}} onPress={() => navigation.navigate('Register')}>Regístrate</Text></Text>
            {login.isError && <Text style={styles.err}>Credenciales inválidas</Text>}
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:20, gap:12, justifyContent:'center' },
  title: { fontSize:22, fontWeight:'700', marginBottom:8 },
  input: { borderWidth:1, borderColor:'#ddd', borderRadius:8, padding:12 },
  err: { color:'crimson' }
});
