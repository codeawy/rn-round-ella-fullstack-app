# Authentication Implementation Roadmap

## Overview

This document outlines the implementation plan for the Authentication module in the Elite React Native + Expo application, backed by Supabase Auth.

## Tech Stackdd

| Layer      | Technology                                                                          |
| ---------- | ----------------------------------------------------------------------------------- |
| Framework  | React Native + Expo SDK 56                                                          |
| Navigation | Expo Router (file-system routing)                                                   |
| Language   | TypeScript (strict mode)                                                            |
| Backend    | Supabase (PostgreSQL + Auth)                                                        |
| Forms      | React Hook Form + Zod                                                               |
| State      | Zustand (auth state)                                                                |
| Session    | `expo-sqlite` localStorage (current) or `@react-native-async-storage/async-storage` |

## Current State

- Supabase client configured at `src/utils/supabase.ts` with `localStorage` persistence
- Zod schemas defined at `src/schema/auth.ts` (login + signup)
- Stub login/signup screens exist at `src/app/(tabs)/login.tsx` and `src/app/signup.tsx`
- Deep linking scheme `elite` configured in `app.json`
- Typed routes enabled via `experiments.typedRoutes`

## Phase Overview

| Phase | Name               | Dependencies | Est. Effort |
| ----- | ------------------ | ------------ | ----------- |
| 1     | Sign Up            | None         | 1-2 days    |
| 2     | Email Verification | Phase 1      | 1 day       |
| 3     | Login              | Phase 1      | 1-2 days    |
| 4     | Google OAuth       | Phase 3      | 1-2 days    |

## Phase Dependencies

```
Phase 1 (Sign Up)
  ├── Phase 2 (Email Verification)
  └── Phase 3 (Login)
        └── Phase 4 (Google OAuth)
```

## Shared Infrastructure

### Zustand Auth Store

A centralized auth store will be created to manage:

```ts
// stores/auth-store.ts
interface AuthState {
  user: User | null;
  session: Session | null;
  initialized: boolean;
  loading: boolean;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setInitialized: (initialized: boolean) => void;
  setLoading: (loading: boolean) => void;
  signOut: () => Promise<void>;
}
```

### Auth Context Provider

Wraps the app root and:

1. Calls `supabase.auth.onAuthStateChange()` on mount
2. Updates Zustand store on auth events
3. Handles initial session restoration
4. Provides `initialized` flag to gate rendering

### Recommended Folder Structure

```
src/
├── app/
│   ├── _layout.tsx              # Root layout (AuthProvider wrapper)
│   ├── signup.tsx               # Sign Up screen
│   ├── verify-email.tsx         # Email verification pending screen (Phase 2)
│   ├── login.tsx                # Login screen (inside tabs or standalone)
│   └── (tabs)/
│       └── _layout.tsx          # Tab layout (conditional tabs based on auth)
├── components/
│   └── auth/
│       ├── auth-divider.tsx     # Existing
│       ├── auth-provider.tsx    # Auth context/listener
│       └── protected-route.tsx  # Auth guard component
├── hooks/
│   ├── use-auth.ts              # Auth hook (reads from Zustand)
│   └── use-session.ts           # Session helper hook
├── stores/
│   └── auth-store.ts            # Zustand auth store
├── schema/
│   └── auth.ts                  # Existing (Zod schemas)
├── utils/
│   ├── supabase.ts              # Existing (Supabase client)
│   └── auth.ts                  # Auth helper functions
└── types/
    └── auth.ts                  # Auth-related TypeScript types
```

## Supabase Configuration Checklist

- [ ] **Email provider**: Enabled in Supabase Dashboard → Authentication → Providers
- [ ] **Site URL**: Set to your app's deep link scheme (`elite://`)
- [ ] **Redirect URLs**: Add `elite://` and any additional callback URLs
- [ ] **Email templates**: Customize confirmation and recovery email templates
- [ ] **Password policy**: Configure minimum length and complexity
- [ ] **RLS policies**: Ensure auth-dependent policies reference `auth.uid()`
- [ ] **Google OAuth** (Phase 4): Configure Google Cloud Console credentials in Supabase

## Expo Configuration Checklist

- [x] `scheme: "elite"` in `app.json` (deep linking)
- [x] `experiments.typedRoutes: true` (type-safe navigation)
- [ ] `expo-auth-session` package (Phase 4 — OAuth)
- [ ] `expo-web-browser` package (Phase 4 — OAuth)
- [ ] `expo-linking` package (Phase 2 — deep link handling)
- [ ] `@react-native-google-signin/google-signin` (Phase 4 — Google)

## Security Considerations

1. **Never store sensitive keys in client code** — use `EXPO_PUBLIC_*` env vars
2. **Use `signInWithPassword` not `signIn`** — explicit API for email/password auth
3. **Validate email format** — both client-side (Zod) and server-side (Supabase)
4. **Enforce password strength** — min 8 chars, mixed case, numbers recommended
5. **Rate limit auth attempts** — Supabase handles this by default
6. **Handle token refresh** — Supabase auto-refreshes with `autoRefreshToken: true`
7. **Use `signOut()` properly** — clear local state and navigate to login
8. **Don't store passwords** — Supabase hashes them; never log or persist plaintext
9. **CSRF protection** — OAuth flows use PKCE by default in Supabase
10. **Deep link validation** — validate redirect URLs to prevent open redirect attacks

## Common Pitfalls

- **Session not persisting**: Ensure `storage` is configured in Supabase client (`localStorage` or `AsyncStorage`)
- **`onAuthStateChange` not firing**: Must be called before any navigation renders
- **Stale user state**: Always read from Zustand store, not local component state
- **Missing `detectSessionInUrl: false`**: Required for React Native (no browser URL bar)
- **OAuth redirect not working**: Ensure scheme matches in `app.json` and Supabase dashboard
- **Email verification loop**: Handle `email_confirmed_at` field to detect verified users
