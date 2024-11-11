<script lang="ts">
	import { Page } from '@/components/Page';
	import { USER_TOKEN } from '@/config/consts';
	import { goto } from '$app/navigation';
	import { api } from '@/config/api';
	import { type PaginationSettings, Paginator, ProgressRadial } from '@skeletonlabs/skeleton';
	import { Input } from '@/components/Input';

	const token = localStorage.getItem(USER_TOKEN);
	if (!token) goto('/');

	let isLoading: boolean = $state(false);

	interface IMDGItem {
		id: number;
		name: string;
		createdAt: Date;
		updatedAt: Date;
	}

	let IMDG: IMDGItem[] = $state([]);
	let searchString: string = $state('');

	let paginationSettings = $state({
		page: 0,
		limit: 5,
		size: 0,
		amounts: 2
	}) satisfies PaginationSettings;

	const handlePageChange = async (page: { detail: number }) => {
		isLoading = true;
		const res = await api.get(`/api/imdg?perPage=5&page=${page.detail}&search=${searchString}`);
		if (res.status === 200) {
			IMDG = res.data;
		}
		isLoading = false;
	};

	const filterResults = async () => {
		isLoading = true;
		const res = await api.get(`/api/imdg?perPage=5&search=${searchString}`);
		if (res.status === 200) {
			IMDG = res.data;
		}
		isLoading = false;
	};

	const getIMGDData = async () => {
		isLoading = true;

		const res = await api.get(`/api/imdg?perPage=5&page=1`);
		if (res.status === 200) {
			IMDG = res.data;
		}
		isLoading = false;
	};

	getIMGDData();
	const getTotalItems = async () => {
		isLoading = true;
		const res = await api.get(`/api/imdg/count?search=${searchString}`);
		if (res.status === 200) {
			paginationSettings.size = res.data;

		}
		isLoading = false;
	};

	getTotalItems();

	$effect(() => {
		filterResults();
		getTotalItems();
	});
</script>


<Page>
	<h1 class="font-bold text-3xl mb-10">Опасные вещества</h1>

	{#if isLoading}
		<div
			class="flex items-center bg-opacity-20 bg-black z-50 backdrop-blur-md justify-center fixed top-0 bottom-0 right-0 left-0">
			<div>
				<ProgressRadial
					stroke={40}
					meter="stroke-emerald-500"
					track="stroke-emerald-500/30"
					strokeLinecap="round"
					value={undefined} />
			</div>
		</div>
	{/if}

	{#if IMDG.length}
		<div class="flex gap-10">
			<div class="">
				<Input value={searchString} onChange={value => searchString = value} placeholder="Строка поиска" />
			</div>
			<div class="table-container w-[75%] h-[75%]">
				<table class="table table-hover">
					<thead>
					<tr>
						<th class="!w-4">ID</th>
						<th>Название</th>
						<th>Создано</th>
						<th>Изменено</th>
					</tr>
					</thead>
					<tbody>
					{#each IMDG as item}
						<tr>
							<td class="!w-4">{item.id}</td>
							<td>{item.name}</td>
							<td>{new Date(item.createdAt).toLocaleDateString()}</td>
							<td>{new Date(item.updatedAt).toLocaleDateString()}</td>
						</tr>
					{/each}
					</tbody>
					<tfoot>
					<tr class="flex items-center justify-center col-span-3">
						<td>
							<Paginator
								showNumerals
								disabled={isLoading}
								bind:settings={paginationSettings}
								on:page={handlePageChange}
								showFirstLastButtons={false}
								showPreviousNextButtons={true}
							/>
						</td>
					</tr>
					</tfoot>
				</table>
			</div>
		</div>
	{:else}
		<div class="w-full h-[75%] flex gap-10">
			<div class="">
				<Input value={searchString} onChange={value => searchString = value} placeholder="Строка поиска" />
			</div>
			<h1 class="w-[75%] h-[75%]">По заданным параметрам ничего не найдено</h1>
		</div>
	{/if}
</Page>
