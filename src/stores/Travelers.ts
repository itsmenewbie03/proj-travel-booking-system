import { writable } from "svelte/store";
import type { WithId } from "mongodb";
export const travelers = writable<WithId<any>[]>([]);
