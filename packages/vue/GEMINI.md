# Firebase UI Vue

This document provides context for the `@firebase-oss/ui-vue` package.

## Overview

The `@firebase-oss/ui-vue` package provides a set of Vue 3 components and composables to integrate Firebase UI for Web into Vue 3 and Nuxt 4 applications. It builds on top of `@firebase-oss/ui-core` and `@firebase-oss/ui-styles` to provide a seamless integration with the Vue ecosystem.

The package offers two main ways to build your UI:

1.  **Pre-built Components**: A set of ready-to-use components for common authentication screens (e.g., Sign In, Register).
2.  **Composables**: A collection of Vue composables that provide access to the underlying UI state and authentication logic, allowing you to build fully custom UIs.

## Setup

To use the Vue package, you must first initialize Firebase UI using `initializeUI` from the core package, and then install the FirebaseUI plugin in your Vue app.

```ts
// In your main.ts or similar entry point

import { createApp } from "vue";
import { initializeUI } from "@firebase-oss/ui-core";
import { enUs } from "@firebase-oss/ui-translations";
import { FirebaseUIPlugin } from "@firebase-oss/ui-vue";
import { firebaseApp } from "./firebase"; // Your firebase config
import App from "./App.vue";

// 1. Initialize the UI
const ui = initializeUI({
  app: firebaseApp,
  locale: enUs,
  // ... other configurations
});

// 2. Install the plugin
createApp(App)
  .use(FirebaseUIPlugin, { ui })
  .mount("#app");
```

## Pre-built Components

The package includes several pre-built "screen" components for a quick setup. These components render a full-page authentication form.

**Example: Sign-In Screen**

```vue
<template>
  <SignInAuthScreen @sign-in="handleSignIn" />
</template>

<script setup>
import { SignInAuthScreen } from "@firebase-oss/ui-vue";

function handleSignIn(user) {
  console.log("User signed in:", user);
}
</script>
```

Other available components include `SignUpAuthScreen`, `ForgotPasswordAuthScreen`, etc.

## Composables

Composables are the recommended way to build a custom user interface.

### `useFirebaseUI()`

The main composable is `useFirebaseUI()`. It returns the entire UI state object from the underlying `nanostores` store. This gives you access to the current `state` (`idle`, `pending`, `loading`), any `error` messages, and the Firebase Auth instance.

**Example: Custom Button**

```vue
<template>
  <button @click="handleClick" :disabled="ui.state === 'pending'">
    {{ ui.state === "pending" ? "Signing in..." : "Sign In" }}
  </button>
</template>

<script setup>
import { useFirebaseUI } from "@firebase-oss/ui-vue";
import { signInWithEmailAndPassword } from "@firebase-oss/ui-core";

const ui = useFirebaseUI();

const handleClick = async () => {
  await signInWithEmailAndPassword(ui, "user@example.com", "password");
};
</script>
```

### Other Composables

The package also provides other specialized composables:

-   `useSignInAuthFormSchema()`: Returns a computed Zod schema for sign-in form validation.
-   `useSignUpAuthFormSchema()`: Returns a computed Zod schema for sign-up form validation.
-   `useRecaptchaVerifier()`: A composable to easily integrate a reCAPTCHA verifier.
-   `useCountries()`: Returns the list of countries for phone number input.
-   `useDefaultCountry()`: Returns the default country based on behavior configuration.

## Nuxt 4 Support

For Nuxt 4 applications, you can use the same setup with slight modifications for SSR compatibility:

```ts
// plugins/firebase-ui.ts
import { defineNuxtPlugin } from "#app";
import { initializeUI } from "@firebase-oss/ui-core";
import { FirebaseUIPlugin } from "@firebase-oss/ui-vue";
import { firebaseApp } from "~/firebase";

export default defineNuxtPlugin((nuxtApp) => {
  const ui = initializeUI({
    app: firebaseApp,
  });

  nuxtApp.vueApp.use(FirebaseUIPlugin, { ui });
});
```

## Styling

Include the Firebase UI styles in your Vue app:

```ts
// In your main.ts or app.vue
import "@firebase-oss/ui-styles/dist.min.css";
// Or if using Tailwind
import "@firebase-oss/ui-styles/tailwind";
```

For Nuxt, add to your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  css: ["@firebase-oss/ui-styles/dist.min.css"],
});
```
