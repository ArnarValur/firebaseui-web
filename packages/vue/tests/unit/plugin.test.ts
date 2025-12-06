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

import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { defineComponent, h } from "vue";
import { FirebaseUIPlugin, useFirebaseUI } from "~/plugin";
import { initializeUI } from "@firebase-oss/ui-core";

// Mock Firebase
vi.mock("firebase/app", () => ({
  initializeApp: vi.fn(() => ({ name: "test-app" })),
}));

vi.mock("firebase/auth", () => ({
  getAuth: vi.fn(() => ({ currentUser: null })),
}));

describe("FirebaseUI Plugin", () => {
  let mockFirebaseApp: any;
  let mockUI: any;

  beforeEach(() => {
    mockFirebaseApp = { name: "test-app", options: {} };
    mockUI = initializeUI({ app: mockFirebaseApp });
  });

  it("should provide FirebaseUI instance to components", () => {
    const TestComponent = defineComponent({
      setup() {
        const ui = useFirebaseUI();
        return () => h("div", { id: "test" }, ui.state);
      },
    });

    const wrapper = mount(TestComponent, {
      global: {
        plugins: [[FirebaseUIPlugin, { ui: mockUI }]],
      },
    });

    expect(wrapper.find("#test").exists()).toBe(true);
  });

  it("should throw error when used outside plugin context", () => {
    const TestComponent = defineComponent({
      setup() {
        expect(() => useFirebaseUI()).toThrow();
        return () => h("div");
      },
    });

    expect(() => {
      mount(TestComponent);
    }).toThrow();
  });
});
