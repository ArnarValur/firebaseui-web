# Testing @firebase-oss/ui-vue Locally

This guide explains how to test the `@firebase-oss/ui-vue` package in your local project before it's published to npm.

## Option 1: Using pnpm link (Recommended)

This is the easiest way to test the package in your project.

### Step 1: Build the Vue package

```bash
# From the monorepo root
cd /path/to/firebaseui-web
pnpm install
pnpm --filter=@firebase-oss/ui-vue run build
```

### Step 2: Link the package globally

```bash
# From the monorepo root
cd packages/vue
pnpm link --global
```

### Step 3: Link in your project

```bash
# In your Vue/Nuxt project directory
cd /path/to/your-project
pnpm link --global @firebase-oss/ui-vue
```

### Step 4: Install peer dependencies in your project

```bash
# In your project
pnpm add firebase vue@^3.5.0
pnpm add @firebase-oss/ui-core @firebase-oss/ui-styles
```

Note: Since `@firebase-oss/ui-core` and `@firebase-oss/ui-styles` are also workspace packages, you'll need to link them too:

```bash
# From the monorepo root
cd packages/core
pnpm link --global

cd ../styles
pnpm link --global

# Then in your project
cd /path/to/your-project
pnpm link --global @firebase-oss/ui-core
pnpm link --global @firebase-oss/ui-styles
```

### Step 5: Use in your project

Create a simple test component:

```vue
<!-- src/App.vue -->
<template>
  <div>
    <h1>FirebaseUI Vue Test</h1>
    <button @click="handleSignIn" :disabled="ui.state === 'pending'">
      {{ ui.state === 'pending' ? 'Signing in...' : 'Sign In' }}
    </button>
    <p v-if="error">Error: {{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useFirebaseUI } from '@firebase-oss/ui-vue';
import { signInWithEmailAndPassword } from '@firebase-oss/ui-core';

const ui = useFirebaseUI();
const error = ref(null);

async function handleSignIn() {
  try {
    error.value = null;
    await signInWithEmailAndPassword(ui, 'test@example.com', 'password123');
    console.log('Sign in successful!');
  } catch (e) {
    error.value = e.message;
    console.error('Sign in failed:', e);
  }
}
</script>
```

### Step 6: To unlink when done testing

```bash
# In your project
pnpm unlink @firebase-oss/ui-vue
pnpm unlink @firebase-oss/ui-core
pnpm unlink @firebase-oss/ui-styles

# Reinstall from registry if needed
pnpm install
```

## Option 2: Using pnpm pack (For npm/yarn users)

If you're using npm or yarn instead of pnpm:

### Step 1: Build and pack

```bash
# From the monorepo root
cd /path/to/firebaseui-web
pnpm install
pnpm --filter=@firebase-oss/ui-vue run build

# Create a tarball
cd packages/vue
pnpm pack
```

This creates a file like `firebase-oss-ui-vue-0.0.2.tgz`

### Step 2: Install in your project

```bash
# In your project
npm install /path/to/firebaseui-web/packages/vue/firebase-oss-ui-vue-0.0.2.tgz

# Or with yarn
yarn add /path/to/firebaseui-web/packages/vue/firebase-oss-ui-vue-0.0.2.tgz
```

You'll also need to pack and install the core and styles packages:

```bash
# Pack core
cd /path/to/firebaseui-web/packages/core
pnpm pack

# Pack styles
cd /path/to/firebaseui-web/packages/styles
pnpm pack

# Install in your project
npm install /path/to/firebaseui-web/packages/core/firebase-oss-ui-core-0.0.2.tgz
npm install /path/to/firebaseui-web/packages/styles/firebase-oss-ui-styles-0.0.2.tgz
```

## Option 3: Using File Protocol (Quick Test)

For a quick test without linking:

```bash
# In your project package.json
{
  "dependencies": {
    "@firebase-oss/ui-vue": "file:../firebaseui-web/packages/vue",
    "@firebase-oss/ui-core": "file:../firebaseui-web/packages/core",
    "@firebase-oss/ui-styles": "file:../firebaseui-web/packages/styles"
  }
}
```

Then run `pnpm install` or `npm install`.

## Option 4: Using pnpm Workspace (Best for extensive testing)

If you want to test extensively, add your project as a workspace:

### Step 1: Add your project to pnpm-workspace.yaml

```yaml
# In firebaseui-web/pnpm-workspace.yaml
packages:
  - packages/*
  - examples/*
  - my-test-project  # Add your project here
```

### Step 2: Move or symlink your project

```bash
# Symlink your project into the monorepo
ln -s /path/to/your-project /path/to/firebaseui-web/my-test-project
```

### Step 3: Install dependencies

```bash
cd /path/to/firebaseui-web
pnpm install
```

Now your project can use `workspace:*` protocol:

```json
{
  "dependencies": {
    "@firebase-oss/ui-vue": "workspace:*",
    "@firebase-oss/ui-core": "workspace:*",
    "@firebase-oss/ui-styles": "workspace:*"
  }
}
```

## Vue 3 Test Project Setup

Here's a minimal Vue 3 project setup for testing:

### 1. Create a new Vue project

```bash
npm create vue@latest my-firebaseui-test
cd my-firebaseui-test
```

### 2. Install Firebase

```bash
pnpm add firebase
```

### 3. Link the packages (using Option 1 above)

### 4. Configure Firebase

```typescript
// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { initializeUI } from '@firebase-oss/ui-core';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  // ... other config
};

const app = initializeApp(firebaseConfig);
export const ui = initializeUI({ app });
```

### 5. Add the plugin

```typescript
// src/main.ts
import { createApp } from 'vue';
import { FirebaseUIPlugin } from '@firebase-oss/ui-vue';
import '@firebase-oss/ui-styles/dist.min.css';
import App from './App.vue';
import { ui } from './firebase';

createApp(App)
  .use(FirebaseUIPlugin, { ui })
  .mount('#app');
```

### 6. Create a test component

```vue
<!-- src/components/AuthTest.vue -->
<template>
  <div class="auth-test">
    <h2>FirebaseUI Vue Test</h2>
    
    <div class="state-info">
      <p>State: {{ ui.state }}</p>
      <p>User: {{ ui.auth.currentUser?.email || 'Not signed in' }}</p>
    </div>

    <div class="form-section">
      <h3>Test Sign In</h3>
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button @click="testSignIn" :disabled="ui.state === 'pending'">
        Sign In
      </button>
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useFirebaseUI } from '@firebase-oss/ui-vue';
import { signInWithEmailAndPassword } from '@firebase-oss/ui-core';

const ui = useFirebaseUI();
const email = ref('');
const password = ref('');
const error = ref(null);

async function testSignIn() {
  try {
    error.value = null;
    await signInWithEmailAndPassword(ui, email.value, password.value);
  } catch (e) {
    error.value = e.message;
  }
}
</script>

<style scoped>
.auth-test {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.form-section {
  margin-top: 1rem;
}

input {
  display: block;
  width: 100%;
  margin: 0.5rem 0;
  padding: 0.5rem;
}

button {
  width: 100%;
  padding: 0.75rem;
  margin-top: 0.5rem;
  background: #4285f4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.error {
  margin-top: 1rem;
  padding: 0.5rem;
  background: #ffebee;
  color: #c62828;
  border-radius: 4px;
}

.state-info {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}
</style>
```

## Nuxt 4 Test Project Setup

### 1. Create a new Nuxt project

```bash
npx nuxi@latest init my-firebaseui-nuxt-test
cd my-firebaseui-nuxt-test
```

### 2. Install Firebase

```bash
pnpm add firebase
```

### 3. Link the packages (using Option 1 above)

### 4. Create Firebase plugin

```typescript
// plugins/firebase.ts
import { defineNuxtPlugin } from '#app';
import { initializeApp } from 'firebase/app';
import { initializeUI } from '@firebase-oss/ui-core';
import { FirebaseUIPlugin } from '@firebase-oss/ui-vue';

export default defineNuxtPlugin((nuxtApp) => {
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    // ... other config
  };

  const app = initializeApp(firebaseConfig);
  const ui = initializeUI({ app });

  nuxtApp.vueApp.use(FirebaseUIPlugin, { ui });
});
```

### 5. Configure Nuxt

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  css: ['@firebase-oss/ui-styles/dist.min.css'],
  runtimeConfig: {
    public: {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
    }
  }
});
```

### 6. Create a test page

```vue
<!-- pages/index.vue -->
<template>
  <div class="container">
    <h1>FirebaseUI Nuxt 4 Test</h1>
    <AuthTest />
  </div>
</template>

<script setup>
import AuthTest from '~/components/AuthTest.vue';
</script>
```

## Troubleshooting

### "Cannot find module" errors

Make sure you've built all packages:
```bash
cd /path/to/firebaseui-web
pnpm build:packages
```

### TypeScript errors

Ensure your project's `tsconfig.json` includes:
```json
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "esModuleInterop": true
  }
}
```

### Styles not loading

Make sure you import the styles:
```typescript
import '@firebase-oss/ui-styles/dist.min.css';
```

Or for Tailwind users:
```typescript
import '@firebase-oss/ui-styles/tailwind';
```

### Hot reload not working with linked packages

When using `pnpm link`, you may need to rebuild the Vue package after making changes:
```bash
cd /path/to/firebaseui-web/packages/vue
pnpm build
```

For development, you can use watch mode:
```bash
pnpm dev
```

## Testing Checklist

- [ ] FirebaseUI plugin installs correctly
- [ ] `useFirebaseUI()` composable returns UI instance
- [ ] Form schema composables work
- [ ] Authentication functions work (sign in, sign up, etc.)
- [ ] State updates reactively (pending, idle)
- [ ] Error handling works
- [ ] TypeScript types are available
- [ ] Styles load correctly
- [ ] Works in both Vue 3 and Nuxt 4
- [ ] SSR works in Nuxt (no client-only errors)

## Getting Help

If you encounter issues:
1. Check the console for error messages
2. Verify all dependencies are installed
3. Ensure Firebase is configured correctly
4. Check that the packages are built
5. Try unlinking and relinking the packages

For more information, see the [main README](../../README.md) or [GEMINI.md](./GEMINI.md).
