import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth-store";
import { supabase } from "@/utils/supabase";

export function useAuth() {
  return useAuthStore();
}

export function useAuthInit() {
  const { setUser, setSession, setInitialized } = useAuthStore();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setInitialized(true);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setInitialized(true);
    });

    return () => subscription.unsubscribe();
  }, [setUser, setSession, setInitialized]);
}
