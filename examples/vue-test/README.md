# FirebaseUI Vue Test Example

A minimal Vue 3 example for testing `@firebase-oss/ui-vue` locally.

## Quick Start

Since this is part of the monorepo, it will automatically use the local workspace packages:

```bash
# From monorepo root
pnpm install
pnpm --filter=vue-test run dev
```

This example will be available at http://localhost:5173

## What's Included

This is a barebones example that demonstrates:
- FirebaseUI plugin setup  
- Basic composables usage
- Authentication with Firebase

## For Testing in Your Own Project

If you want to test the Vue package in your own project (outside this monorepo), see the comprehensive guide:

**[📖 Full Testing Guide](../../packages/vue/TESTING.md)**

The guide covers:
- Using `pnpm link` to test locally
- Setting up Vue 3 and Nuxt 4 projects
- Complete example components
- Troubleshooting tips
- Testing checklist

## Configuration

Before running, update `src/firebase.ts` with your Firebase config from the Firebase Console.

For testing, you can use the Firebase Auth emulator:

```bash
# In a separate terminal
firebase emulators:start --only auth
```

Then use `http://127.0.0.1:9099` as your `authDomain`.
