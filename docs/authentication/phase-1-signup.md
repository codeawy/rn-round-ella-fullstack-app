# Phase 1 — Sign Up

## Objective

Implement email and password registration with form validation, loading states, error handling, and a success state that triggers Supabase email verification.

## Features to Implement

- [ ] Name, email, password, confirm password form fields
- [ ] Real-time form validation using React Hook Form + Zod
- [ ] Loading indicator during API call
- [ ] Success state after registration (prompt to check email)
- [ ] Error handling for duplicate emails, weak passwords, network errors
- [ ] Navigation to login screen for existing users
- [ ] Store user session on successful sign up (Supabase returns session if auto-confirm is enabled)

## Technical Approach

### 1. Sign Up Flow

```
User fills form → validates (Zod) → supabase.auth.signUp() →
  ├─ Success + no session → Show "Check your email" screen
  ├─ Success + session (auto-confirm) → Redirect to home
  └─ Error → Display error message inline
```

### 2. Supabase Call

```ts
const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    data: {
      name,  // stored in user.user_metadata
    },
  },
});
```

### 3. Form Validation Schema

Reuse existing `signupSchema` from `src/schema/auth.ts`:

```ts
const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});
```

> **Note**: Current schema uses min 6; recommend upgrading to min 8 for security.

### 4. Error Mapping

Map Supabase error codes to user-friendly messages:

| Error Code | User Message |
|-----------|-------------|
| `auth/email_already_registered` | "An account with this email already exists" |
| `auth/weak_password` | "Password is too weak. Use at least 8 characters" |
| `auth/invalid_email` | "Please enter a valid email address" |
| `network_error` | "Network error. Please check your connection" |
| `unexpected_error` | "Something went wrong. Please try again" |

## UI Screens Involved

### Sign Up Screen (`src/app/signup.tsx`)

**Already exists** as a stub. Needs to be updated to:

1. Wire form to `react-hook-form` with Zod resolver
2. Add `onSubmit` handler calling `supabase.auth.signUp()`
3. Show loading state on button during submission
4. Display inline field errors
5. Show success toast/screen after registration
6. Handle "Already have an account? Sign In" navigation

**Layout (matching existing design):**
- Back button (top-left)
- "ELITE" brand text
- "Create Account" title
- "Join us to discover exclusive collections." subtitle
- Name field
- Email field
- Password field
- Confirm password field
- Terms checkbox (existing)
- "Create Account" button (primary)
- "OR CONTINUE WITH" divider (existing)
- Social login buttons (placeholder for Phase 4)
- "Already have an account? Sign In" footer link

### Success State

After successful sign up (when email confirmation is required):

- Replace form with a success message
- Show email icon/illustration
- "Check your email" heading
- "We sent a verification link to {email}" message
- "Resend email" button
- "Back to Sign In" link

## Navigation Flow

```
signup.tsx
  ├─ "Already have an account? Sign In" → /login (or /(tabs)/login)
  ├─ Back button → router.back()
  ├─ Success (no session) → Show success state (stay on screen)
  └─ Success (with session) → router.replace("/(tabs)")
```

## Supabase Configuration

### Required Settings

1. **Authentication → Providers → Email**:
   - Enable Email provider
   - "Confirm email" toggle: **ON** (recommended for production)
   - If OFF: user gets session immediately, no verification needed

2. **Authentication → Settings → User Signups**:
   - Enable sign ups: **ON**
   - Double confirm email: **OFF** (unless required)

3. **Site URL**: Set to `elite://` or leave blank

### User Metadata

After sign up, `user.user_metadata` will contain:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "email_verified": false
}
```

## State Management

### Zustand Auth Store

```ts
// After successful signUp:
authStore.setUser(data.user);
authStore.setSession(data.session);  // null if email confirmation required
authStore.setInitialized(true);
```

### Local Component State

```ts
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
const [success, setSuccess] = useState(false);
const [verifiedEmail, setVerifiedEmail] = useState<string>("");
```

## Validation Requirements

### Field-Level Validation (Zod)

| Field | Rules |
|-------|-------|
| `name` | Required, min 1 char |
| `email` | Required, valid email format |
| `password` | Required, min 8 chars |
| `confirmPassword` | Must match `password` |

### Validation Mode

- **onSubmit**: Validate on form submission
- **onChange**: Optional — validate as user types for better UX

### Error Display

- Show errors below each field
- Use `@hookform/error-message` component for consistency
- Clear errors when user starts typing

## Error Handling

### API Errors

```ts
try {
  const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { name } } });
  if (error) {
    setError(mapAuthError(error.message));
    return;
  }
  if (!data.session) {
    setSuccess(true);
    setVerifiedEmail(email);
  }
} catch (err) {
  setError("Something went wrong. Please try again.");
}
```

### Network Errors

- Detect network failures with `fetch` timeout or try/catch
- Show retry option

### Duplicate Account

- Supabase returns `email_already_registered`
- Show: "An account with this email already exists. Sign in instead?"
- Link to login screen

## Edge Cases

1. **User submits form while offline** → Show network error
2. **User double-taps submit** → Disable button during loading
3. **User navigates away mid-submission** → Cancel or ignore stale response
4. **Password contains special characters** → Supabase handles this; no restriction
5. **Email has uppercase letters** → Normalize to lowercase before sending
6. **User closes app during sign up** → Session not created until verified
7. **Resend verification email** → Use `supabase.auth.resend()` with `type: 'signup'`

## Testing Checklist

- [ ] Form validates all fields on submit
- [ ] Empty name shows error
- [ ] Invalid email shows error
- [ ] Short password shows error
- [ ] Mismatched passwords show error
- [ ] Loading state disables button and shows spinner
- [ ] Successful sign up shows success state
- [ ] Duplicate email shows friendly error
- [ ] Network error shows retry option
- [ ] "Sign In" link navigates to login
- [ ] Back button navigates to previous screen
- [ ] Terms checkbox must be checked to proceed
- [ ] Social login buttons are present (disabled/placeholder)
- [ ] Form resets after successful submission

## Definition of Done (DoD)

- [ ] Form uses `react-hook-form` with Zod resolver
- [ ] All fields have validation rules
- [ ] `supabase.auth.signUp()` is called on valid submission
- [ ] Loading state is shown during API call
- [ ] Success state is shown after registration
- [ ] Error messages are user-friendly and displayed inline
- [ ] Navigation to login and back works correctly
- [ ] No TypeScript errors
- [ ] Works on iOS and Android
- [ ] Session is stored (if auto-confirm enabled)

## Dependencies

- **Required packages**: Already installed (`react-hook-form`, `@hookform/resolvers`, `zod`, `@supabase/supabase-js`)
- **Blocks**: Phase 2 (Email Verification), Phase 3 (Login)
- **Depends on**: Supabase client configuration (complete)
