<template>
  <component
    :is="computedTag"
    :class="buttonClasses"
    :type="type"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
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

import { computed } from "vue";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  variant?: "primary" | "secondary" | "outline";
  asChild?: boolean;
  type?: "button" | "submit" | "reset";
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: "primary",
  asChild: false,
  type: "button",
});

const computedTag = computed(() => (props.asChild ? "span" : "button"));

const buttonClasses = computed(() =>
  twMerge(
    clsx(
      "fui-button",
      `fui-button--${props.variant}`,
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
    )
  )
);
</script>
