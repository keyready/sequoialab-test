interface UserStoreType {
	user: {
		token: string;
		username: string;
	};
}

export const UserStore: UserStoreType = $state({
	user: {
		token: '',
		username: ''
	}
});
