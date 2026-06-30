# Phase 3 — Login

## Objective

Implement email and password login with session persistence, automatic session restoration on app launch, loading and error states, and preparation for forgot password (to be implemented later).

## Features to Implement

- [ ] Email and password login form
- [ ] Form validation using React Hook Form + Zod
- [ ] Loading states during authentication
- [ ] Error handling for invalid credentials
- [ ] Session persistence (already configured via `localStorage`)
- [ ] Session restoration on app launch
- [ ] "Forgot password?" link (placeholder, implemented later)
- [ ] "Don't have an account? Sign Up" navigation
- [ ] Auto-redirect if already authenticated

## Technical Approach

### 1. Login Flow

```
User enters credentials → validates (Zod) → supabase.auth.signInWithPassword() →
  ├─ Success → Store session → Redirect to /(tabs)
  └─ Error → Display error message inline
```

### 2. Supabase Call

```ts
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
});
```

### 3. Session Restoration

Already handled by Supabase client configuration:

```ts
// src/utils/supabase.ts
export const supabase = createClient(url, key, {
  auth: {
    storage: localStorage,      // persists session
    autoRefreshToken: true,     // auto-refreshes expired tokens
    persistSession: true,       // saves session to storage
    detectSessionInUrl: false,  // disabled for React Native
  },
});
```

On app launch, calling `supabase.auth.getSession()` restores the session from storage.

### 4. Auth State Listener

```ts
useEffect(() => {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (event, session) => {
      authStore.setUser(session?.user ?? null);
      authStore.setSession(session);
      authStore.setInitialized(true);
    }
  );

  return () => subscription.unsubscribe();
}, []);
```

## UI Screens Involved

### Login Screen (`src/app/(tabs)/login.tsx` or `src/app/login.tsx`)

**Already exists** as a full implementation. Needs to be updated to:

1. Wire form to `react-hook-form` with Zod resolver
2. Add `onSubmit` handler calling `supabase.auth.signInWithPassword()`
3. Show loading state on button during submission
4. Display inline field errors
5. Handle "Forgot Password?" navigation (placeholder)
6. Handle "Sign Up" navigation
7. Handle "Continue with Google" (placeholder for Phase 4)

**Layout (matching existing design):**
- "ELITE" brand text (centered)
- "Sign In" title
- "Welcome back. Sign in to continue." subtitle
- Email field
- Password field
- "Forgot Password?" link (top-right of password field)
- "Sign In" button (primary)
- "OR CONTINUE WITH" divider
- Social login buttons (Google/Apple)
- "Don't have an account? Sign Up" footer link

### Auth Gate Component

A wrapper component that checks authentication status:

```ts
// components/auth/protected-route.tsx
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, initialized } = useAuth();

  if (!initialized) return <LoadingScreen />;
  if (!user) return router.replace("/login");

  return <>{children}</>;
}
```

## Navigation Flow

```
App Launch
  └─ Auth listener fires → check session
      ├─ Session exists → /(tabs) (authenticated)
      └─ No session → /(tabs)/login (or /login)

login.tsx
  ├─ "Sign In" → supabase.auth.signInWithPassword() → /(tabs)
  ├─ "Forgot Password?" → (Phase 5, not implemented)
  ├─ "Sign Up" → /signup
  └─ "Continue with Google" → (Phase 4)

signup.tsx
  └─ "Already have an account? Sign In" → /login
```

### Tab Layout Auth Logic

Update `src/app/(tabs)/_layout.tsx` to conditionally show/hide tabs based on auth state:

```ts
// Only show Login tab when not authenticated
<Tabs.Screen
  name="login"
  options={{
    href: user ? null : undefined,  // hide tab if authenticated
  }}
/>
```

## Supabase Configuration

### Required Settings

1. **Authentication → Providers → Email**:
   - Ensure Email provider is enabled
   - "Confirm email" setting affects whether unverified users can log in

2. **Authentication → Settings**:
   - "Allow new sign ups": **ON**
   - "JWT expiry time": Default (3600 seconds / 1 hour)
   - "Enable refresh token rotation": **ON** (recommended)

### Session Behavior

| Setting | Effect |
|---------|--------|
| `persistSession: true` | Session saved to `localStorage` |
| `autoRefreshToken: true` | Token refreshed before expiry |
| `detectSessionInUrl: false` | Required for React Native |

## State Management

### Zustand Auth Store

```ts
interface AuthState {
  user: User | null;
  session: Session | null;
  initialized: boolean;
  loading: boolean;
  // ... actions
}
```

### Auth Provider Integration

The auth provider (created in Phase 1 infrastructure) wraps the root layout and:

1. Initializes auth state on mount
2. Listens for `onAuthStateChange`
3. Updates Zustand store
4. Provides `initialized` flag to gate rendering

### Local Component State

```ts
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
```

## Validation Requirements

### Field-Level Validation (Zod)

| Field | Rules |
|-------|-------|
| `email` | Required, valid email format |
| `password` | Required, min 6 characters |

### Validation Mode

- **onSubmit**: Validate on form submission

## Error Handling

### Error Mapping

| Error Code | User Message |
|-----------|-------------|
| `auth/invalid_login_credentials` | "Invalid email or password" |
| `auth/email_not_confirmed` | "Please verify your email first" |
| `auth/too_many_requests` | "Too many attempts. Please try again later" |
| `auth/invalid_email` | "Please enter a valid email address" |
| `network_error` | "Network error. Please check your connection" |

### Security: Don't Leak User Existence

Use "Invalid email or password" (not "User not found") to prevent email enumeration attacks.

## Edge Cases

1. **User opens app with valid session** → Auto-restore session, skip login
2. **User opens app with expired session** → Attempt token refresh; if fails, show login
3. **User taps "Sign In" multiple times** → Disable button during loading
4. **User enters wrong password** → Show generic error (don't reveal if email exists)
5. **User has unverified email** → Show "Please verify your email" with resend option
6. **User navigates to login while authenticated** → Redirect to home
7. **Network timeout** → Show retry option
8. **App backgrounded during login** → Handle auth state change when foregrounded
9. **Password manager autofill** → Ensure form handles pre-filled values

## Testing Checklist

- [ ] Form validates email and password on submit
- [ ] Invalid email shows error
- [ ] Empty password shows error
- [ ] Loading state disables button and shows spinner
- [ ] Successful login redirects to home
- [ ] Invalid credentials show friendly error
- [ ] Unverified email shows verification prompt
- [ ] "Sign Up" link navigates to signup
- [ ] "Forgot Password?" link is present (placeholder)
- [ ] Social login buttons are present (placeholder)
- [ ] Session persists after app close/reopen
- [ ] Session refreshes automatically before expiry
- [ ] Already authenticated user skips login
- [ ] Works on iOS and Android
- [ ] Works after app update (session preserved)

## Definition of Done (DoD)

- [ ] Form uses `react-hook-form` with Zod resolver
- [ ] All fields have validation rules
- [ ] `supabase.auth.signInWithPassword()` is called on valid submission
- [ ] Loading state is shown during API call
- [ ] Error messages are user-friendly and displayed inline
- [ ] Successful login creates session and redirects to home
- [ ] Session persists across app restarts
- [ ] Session auto-refreshes before expiry
- [ ] Auth state listener updates Zustand store
- [ ] No TypeScript errors
- [ ] Works on iOS and Android

## Dependencies

- **Required packages**: All already installed
- **Blocks**: Phase 4 (Google OAuth)
- **Depends on**: Phase 1 (Sign Up — for account creation)
- **Note**: Forgot Password will be a separate Phase 5
