// Setting up the auth context for the entire app
// This allows us to check access of the user from any component
// The last line allows us to shorten the statement to useAuthContext() instead of useContext(AuthContext)

import { Session } from '@supabase/supabase-js'
import { createContext, useContext } from 'react'
export type AuthData = {
  session?: Session | null
  profile?: any | null
  isLoading: boolean
  isLoggedIn: boolean
}
export const AuthContext = createContext<AuthData>({
  session: undefined,
  profile: undefined,
  isLoading: true,
  isLoggedIn: false,
})
export const useAuthContext = () => useContext(AuthContext)