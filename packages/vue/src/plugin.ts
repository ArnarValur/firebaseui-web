/**
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type { App, InjectionKey } from "vue";
import { inject, provide } from "vue";
import type { FirebaseUIStore, FirebaseUI } from "@firebase-oss/ui-core";
import { useStore } from "@nanostores/vue";

/** Injection key for FirebaseUI store */
export const FirebaseUIKey: InjectionKey<FirebaseUIStore> = Symbol("FirebaseUI");

/** Injection key for policy configuration */
export const PolicyKey: InjectionKey<PolicyConfig | undefined> = Symbol("Policy");

/** Policy configuration for terms of service and privacy policy links */
export interface PolicyConfig {
  /** URL to the terms of service */
  termsOfServiceUrl: string | URL;
  /** URL to the privacy policy */
  privacyPolicyUrl: string | URL;
  /** Optional navigation handler */
  onNavigate?: (url: string | URL) => void;
}

/** Options for FirebaseUI Vue plugin */
export interface FirebaseUIPluginOptions {
  /** The FirebaseUI store instance */
  ui: FirebaseUIStore;
  /** Optional policy configuration */
  policies?: PolicyConfig;
}

/**
 * Vue plugin for FirebaseUI
 *
 * @example
 * ```ts
 * import { createApp } from 'vue';
 * import { FirebaseUIPlugin } from '@firebase-oss/ui-vue';
 * import { initializeUI } from '@firebase-oss/ui-core';
 * import App from './App.vue';
 *
 * const ui = initializeUI({ app: firebaseApp });
 *
 * createApp(App)
 *   .use(FirebaseUIPlugin, { ui })
 *   .mount('#app');
 * ```
 */
export const FirebaseUIPlugin = {
  install(app: App, options: FirebaseUIPluginOptions) {
    app.provide(FirebaseUIKey, options.ui);
    if (options.policies) {
      app.provide(PolicyKey, options.policies);
    }
  },
};

/**
 * Composable to access the FirebaseUI instance
 *
 * @returns The FirebaseUI instance
 * @throws {Error} If used outside of FirebaseUIPlugin context
 */
export function useFirebaseUI(): FirebaseUI {
  const store = inject(FirebaseUIKey);

  if (!store) {
    throw new Error(
      `No FirebaseUI context found. Your application must use the FirebaseUIPlugin:

const ui = initializeUI(...);

createApp(App)
  .use(FirebaseUIPlugin, { ui })
  .mount('#app');`
    );
  }

  return useStore(store).value as FirebaseUI;
}

/**
 * Composable to access the policy configuration
 *
 * @returns The policy configuration or undefined
 */
export function usePolicies(): PolicyConfig | undefined {
  return inject(PolicyKey);
}
