<template>
  <div class="fui-divider relative">
    <div class="fui-divider__line absolute inset-0 flex items-center">
      <span class="w-full border-t" />
    </div>
    <div v-if="$slots.default" class="fui-divider__content relative flex justify-center text-xs uppercase">
      <span class="bg-background px-2 text-muted-foreground">
        <slot />
      </span>
    </div>
  </div>
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
</script>
