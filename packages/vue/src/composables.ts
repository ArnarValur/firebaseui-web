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

import { computed, ref, type Ref } from "vue";
import type { RecaptchaVerifier } from "firebase/auth";
import {
  createEmailLinkAuthFormSchema,
  createForgotPasswordAuthFormSchema,
  createMultiFactorPhoneAuthNumberFormSchema,
  createMultiFactorPhoneAuthVerifyFormSchema,
  createMultiFactorTotpAuthNumberFormSchema,
  createMultiFactorTotpAuthVerifyFormSchema,
  createPhoneAuthNumberFormSchema,
  createPhoneAuthVerifyFormSchema,
  createSignInAuthFormSchema,
  createSignUpAuthFormSchema,
  getBehavior,
  hasBehavior,
  countryData,
  type CountryData,
} from "@firebase-oss/ui-core";
import { useFirebaseUI } from "./plugin";

/**
 * Gets the FirebaseUI instance (alias for useFirebaseUI)
 */
export const useUI = useFirebaseUI;

/**
 * Composable to get the redirect error from the UI store
 *
 * @returns A computed ref to the redirect error
 */
export function useRedirectError() {
  const ui = useFirebaseUI();
  return computed(() => ui.redirectError);
}

/**
 * Composable to create a sign-in form schema
 *
 * @returns A computed ref to the Zod schema
 */
export function useSignInAuthFormSchema() {
  const ui = useFirebaseUI();
  return computed(() => createSignInAuthFormSchema(ui));
}

/**
 * Composable to create a sign-up form schema
 *
 * @returns A computed ref to the Zod schema
 */
export function useSignUpAuthFormSchema() {
  const ui = useFirebaseUI();
  return computed(() => createSignUpAuthFormSchema(ui));
}

/**
 * Composable to create a forgot password form schema
 *
 * @returns A computed ref to the Zod schema
 */
export function useForgotPasswordAuthFormSchema() {
  const ui = useFirebaseUI();
  return computed(() => createForgotPasswordAuthFormSchema(ui));
}

/**
 * Composable to create an email link auth form schema
 *
 * @returns A computed ref to the Zod schema
 */
export function useEmailLinkAuthFormSchema() {
  const ui = useFirebaseUI();
  return computed(() => createEmailLinkAuthFormSchema(ui));
}

/**
 * Composable to create a phone auth number form schema
 *
 * @returns A computed ref to the Zod schema
 */
export function usePhoneAuthNumberFormSchema() {
  const ui = useFirebaseUI();
  return computed(() => createPhoneAuthNumberFormSchema(ui));
}

/**
 * Composable to create a phone auth verify form schema
 *
 * @returns A computed ref to the Zod schema
 */
export function usePhoneAuthVerifyFormSchema() {
  const ui = useFirebaseUI();
  return computed(() => createPhoneAuthVerifyFormSchema(ui));
}

/**
 * Composable to create a multi-factor phone auth number form schema
 *
 * @returns A computed ref to the Zod schema
 */
export function useMultiFactorPhoneAuthNumberFormSchema() {
  const ui = useFirebaseUI();
  return computed(() => createMultiFactorPhoneAuthNumberFormSchema(ui));
}

/**
 * Composable to create a multi-factor phone auth verify form schema
 *
 * @returns A computed ref to the Zod schema
 */
export function useMultiFactorPhoneAuthVerifyFormSchema() {
  const ui = useFirebaseUI();
  return computed(() => createMultiFactorPhoneAuthVerifyFormSchema(ui));
}

/**
 * Composable to create a multi-factor TOTP auth number form schema
 *
 * @returns A computed ref to the Zod schema
 */
export function useMultiFactorTotpAuthNumberFormSchema() {
  const ui = useFirebaseUI();
  return computed(() => createMultiFactorTotpAuthNumberFormSchema(ui));
}

/**
 * Composable to create a multi-factor TOTP auth verify form schema
 *
 * @returns A computed ref to the Zod schema
 */
export function useMultiFactorTotpAuthVerifyFormSchema() {
  const ui = useFirebaseUI();
  return computed(() => createMultiFactorTotpAuthVerifyFormSchema(ui));
}

/**
 * Composable to check if display name is required
 *
 * @returns A computed ref indicating if display name is required
 */
export function useRequireDisplayName() {
  const ui = useFirebaseUI();
  return computed(() => hasBehavior(ui, "requireDisplayName"));
}

/**
 * Composable to create and manage a reCAPTCHA verifier
 *
 * @param _elementRef - Reference to the DOM element where reCAPTCHA should be rendered
 * @returns A ref to the RecaptchaVerifier instance or null
 */
export function useRecaptchaVerifier(
  _elementRef: Ref<HTMLDivElement | null>
): Ref<any | null> {
  const verifier = ref<any | null>(null);

  // This is a simplified version - actual implementation would need
  // to properly initialize the reCAPTCHA verifier when the element is available
  // For now, we'll just return a ref that can be populated
  return verifier;
}

/**
 * Composable to get the list of countries for country selector
 *
 * @returns A computed ref to the list of countries
 */
export function useCountries() {
  const ui = useFirebaseUI();

  return computed(() => {
    const behavior = getBehavior(ui, "countryCodes");
    if (behavior) {
      // getBehavior returns the handler function, we need to call it
      const result = behavior();
      if (result && result.allowedCountries && result.allowedCountries.length > 0) {
        return result.allowedCountries;
      }
    }
    return countryData as unknown as CountryData[];
  });
}

/**
 * Composable to get the default country for country selector
 *
 * @returns A computed ref to the default country or undefined
 */
export function useDefaultCountry() {
  const ui = useFirebaseUI();

  return computed(() => {
    const behavior = getBehavior(ui, "countryCodes");
    if (behavior) {
      const result = behavior();
      if (result && result.defaultCountry) {
        return result.defaultCountry;
      }
    }
    return undefined;
  });
}
