import { Stack, router } from 'expo-router'
import { StyleSheet, TextInput, Button, Alert } from 'react-native'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { useAuthContext } from '@/hooks/use-auth-context'

export default function SignUpScreen() {
  const [email, setEmail] = useState('')
  const [cemail, setConfirmEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  
  const signUp = async () => {
    setLoading(true)
    if (email !== cemail) {
      Alert.alert('Sign Up failed', 'Emails do not match')
      setLoading(false)
      return
    }
    
    console.log(email, password)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    console.log(data)
    setLoading(false)

    if (error) {
      Alert.alert('Sign Up failed', error.message)
      return
    }

    router.replace('/home') // go to home after signing up
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Sign Up' }} />

      <ThemedView style={styles.container}>
        <ThemedText type="title">Sign Up</ThemedText>

        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Confirm Email"
          autoCapitalize="none"
          value={cemail}
          onChangeText={setConfirmEmail}
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
        <Button
          title={loading ? 'Signing up...' : 'Sign Up'}
          onPress={signUp}
          disabled={loading}
        />
        <Button
          title={loading ? 'Switching...' : 'Login'}
          onPress={() => router.replace('/login')}
          disabled={loading}
        />
      </ThemedView>
    </>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  input: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginVertical: 8,
    color: 'white',
  },
})