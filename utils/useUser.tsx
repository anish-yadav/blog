import { Provider, Session, User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { UserDetails } from "../types";
import { supabase } from "./supabase-client";

type UserContextType = {
  session: Session;
  user: User;
  userDetails: UserDetails;
  userLoaded: boolean;

  signIn: (options: SignInOptions) => Promise<{
    session: Session | null;
    user: User | null;
    provider?: Provider;
    url?: string | null;
    error: Error | null;
    data: Session | null;
  }>;
  signUp: (options: SignUpOptions) => Promise<{
    user: User | null;
    session: Session | null;
    error: Error | null;
    data: Session | User | null;
  }>;
  signOut: () => void;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserContextProvider = (props: any) => {
  const [userLoaded, setUserLoaded] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  useEffect(() => {
    const session = supabase.auth.session();
    setSession(session);
    setUser(session?.user ?? null);
    const { data: authListner } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListner?.unsubscribe();
    };
  }, []);

  const getUserDetails = () =>
    supabase.from<UserDetails>("users").select("*").single();

  useEffect(() => {
    if (user) {
      Promise.allSettled([getUserDetails()]).then((results) => {
        const userDetailsPromise = results[0];

        if (userDetailsPromise.status == "fulfilled")
          setUserDetails(userDetailsPromise.value.data);
        setUserLoaded(true);
      });
    }
  }, [user]);

  const value = {
    session,
    user,
    userDetails,
    userLoaded,
    signIn: (options: SignInOptions) => supabase.auth.signIn(options),
    signUp: (options: SignUpOptions) => supabase.auth.signUp(options),
    singOut: () => {
      setUserDetails(null);
      return supabase.auth.signOut();
    },
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be using withing a UserContextProvider.`);
  }
  return context;
};

type SignInOptions = {
  email?: string;
  password?: string;
  provider?: Provider;
};

type SignUpOptions = {
  email: string;
  password: string;
};
