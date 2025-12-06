# @firebase-oss/ui-vue

Vue 3 and Nuxt 4 components for Firebase UI.

## Installation

```bash
npm install @firebase-oss/ui-vue@beta
# or
pnpm add @firebase-oss/ui-vue@beta
# or
yarn add @firebase-oss/ui-vue@beta
```

## Quick Start

### Vue 3

```ts
// main.ts
import { createApp } from "vue";
import { initializeApp } from "firebase/app";
import { initializeUI } from "@firebase-oss/ui-core";
import { FirebaseUIPlugin } from "@firebase-oss/ui-vue";
import "@firebase-oss/ui-styles/dist.min.css";
import App from "./App.vue";

const firebaseApp = initializeApp({ /* your config */ });
const ui = initializeUI({ app: firebaseApp });

createApp(App)
  .use(FirebaseUIPlugin, { ui })
  .mount("#app");
```

```vue
<!-- App.vue -->
<template>
  <SignInAuthScreen @sign-in="handleSignIn" />
</template>

<script setup>
import { SignInAuthScreen } from "@firebase-oss/ui-vue";

function handleSignIn(user) {
  console.log("Signed in:", user);
}
</script>
```

### Nuxt 4

```ts
// plugins/firebase-ui.ts
import { defineNuxtPlugin } from "#app";
import { initializeApp } from "firebase/app";
import { initializeUI } from "@firebase-oss/ui-core";
import { FirebaseUIPlugin } from "@firebase-oss/ui-vue";

export default defineNuxtPlugin((nuxtApp) => {
  const firebaseApp = initializeApp({ /* your config */ });
  const ui = initializeUI({ app: firebaseApp });

  nuxtApp.vueApp.use(FirebaseUIPlugin, { ui });
});
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  css: ["@firebase-oss/ui-styles/dist.min.css"],
});
```

## Documentation

For full documentation, please see the [main repository README](https://github.com/firebase/firebaseui-web).

## License

See [LICENSE](../../LICENSE)
