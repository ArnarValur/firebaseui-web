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

import { vi } from "vitest";

// Mock Firebase app
vi.mock("firebase/app", async () => {
  const actual = await vi.importActual<typeof import("firebase/app")>("firebase/app");
  return {
    ...actual,
    initializeApp: vi.fn(() => ({ name: "test-app", options: {} })),
    FirebaseError: class FirebaseError extends Error {
      constructor(
        public code: string,
        message: string
      ) {
        super(message);
        this.name = "FirebaseError";
      }
    },
  };
});

// Mock Firebase auth
vi.mock("firebase/auth", async () => {
  const actual = await vi.importActual<typeof import("firebase/auth")>("firebase/auth");
  return {
    ...actual,
    getAuth: vi.fn(() => ({ currentUser: null })),
    signInWithEmailAndPassword: vi.fn(),
    createUserWithEmailAndPassword: vi.fn(),
  };
});
