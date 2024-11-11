import { writable } from 'svelte/store';
interface UserStoreType {
	token?: string;
	username?: string;
}

export const user = writable<UserStoreType | undefined>(undefined);
