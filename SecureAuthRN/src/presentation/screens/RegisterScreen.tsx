import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRegister } from '@presentation/hooks/useAuth';

const schema = Yup.object({
  name: Yup.string().min(2),
  email: Yup.string().email('Email inválido').required('Requerido'),
  password: Yup.string().min(6).required('Requerido'),
});

export default function RegisterScreen({ navigation }: any){
  const reg = useRegister();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear cuenta</Text>
      <Formik
        initialValues={{ name:'', email: '', password: '' }}
        validationSchema={schema}
        onSubmit={async (v) => {
          await reg.mutateAsync(v);
          navigation.replace('Login');
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput placeholder="Nombre" style={styles.input}
              onChangeText={handleChange('name')} onBlur={handleBlur('name')} value={values.name}/>
            {touched.name && !!errors.name && <Text style={styles.err}>{errors.name}</Text>}
            <TextInput placeholder="Email" autoCapitalize='none' style={styles.input}
              onChangeText={handleChange('email')} onBlur={handleBlur('email')} value={values.email}/>
            {touched.email && !!errors.email && <Text style={styles.err}>{errors.email}</Text>}
            <TextInput placeholder="Password" secureTextEntry style={styles.input}
              onChangeText={handleChange('password')} onBlur={handleBlur('password')} value={values.password}/>
            {touched.password && !!errors.password && <Text style={styles.err}>{errors.password}</Text>}
            <Button title={reg.isPending ? 'Creando…' : 'Crear cuenta'} onPress={() => handleSubmit()} />
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
