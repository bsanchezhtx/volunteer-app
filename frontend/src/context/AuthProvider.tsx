import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type User = {
  username: string;
  password: string;
  role: string;
  accessToken: string;
};

type AuthProps = {
  user: User | undefined;
  setUser: Dispatch<SetStateAction<User | undefined>>;
};

const AuthContext = createContext<AuthProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw Error("Must be used within context");
  }
}

export default AuthContext;
