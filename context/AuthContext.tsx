// // context/AuthContext.tsx

// "use client";

// import { createContext, useContext, useEffect, useState, ReactNode } from "react";
// import { supabaseBrowserClient } from "../utils/supabase/client";
// import { Session } from "@supabase/supabase-js";

// interface AuthContextType {
//   session: Session | null;
//   signIn: (email: string, password: string) => Promise<void>;
//   signUp: (email: string, password: string) => Promise<void>;
//   signOut: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [session, setSession] = useState<Session | null>(null);

//   useEffect(() => {
//     const currentSession = supabaseBrowserClient.auth.session();
//     setSession(currentSession);

//     const { data: authListener } = supabaseBrowserClient.auth.onAuthStateChange(
//       (event, newSession) => {
//         setSession(newSession);
//       }
//     );

//     return () => {
//       authListener?.unsubscribe();
//     };
//   }, []);

//   const signIn = async (email: string, password: string) => {
//     const { error } = await supabaseBrowserClient.auth.signIn({ email, password });
//     if (error) throw error;
//   };

//   const signUp = async (email: string, password: string) => {
//     const { error } = await supabaseBrowserClient.auth.signUp({ email, password });
//     if (error) throw error;
//   };

//   const signOut = async () => {
//     const { error } = await supabaseBrowserClient.auth.signOut();
//     if (error) throw error;
//   };

//   return (
//     <AuthContext.Provider value={{ session, signIn, signUp, signOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used within an AuthProvider");
//   return context;
// };
