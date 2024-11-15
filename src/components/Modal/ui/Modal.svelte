<script lang="ts">
    import { onMount } from 'svelte';

    /**
     * Простенький компонент модального окна
     */
    interface ModalProps {
        isOpened: boolean;
        setIsOpened: (state: boolean) => void;
    }

    onMount(() => {
        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                setIsOpened(false);
            }
        });
    });

    const { setIsOpened, isOpened = false }: ModalProps = $props();
</script>

<div
    tabindex={-1}
    role="button"
    onclick={() => setIsOpened(false)}
    class="{isOpened &&
        '!opacity-100 !z-30'} duration-200 flex -z-10 opacity-0 items-center bg-opacity-20 bg-black backdrop-blur-md justify-center fixed top-0 bottom-0 right-0 left-0"
>
    <!--        Отменяем всплытие, чтобы по клику на тело модалки, она не закрывалось-->
    <div
        role="button"
        tabindex={-1}
        class="{isOpened &&
            '!opacity-100 !scale-100'} relative duration-200 scale-75 opacity-0 z-40 cursor-auto bg-main/40 w-2/3 h-2/4 overflow-auto p-5 pt-10 rounded-xl"
        onclick={(event) => event.stopPropagation()}
    >
        <button
            onclick={() => setIsOpened(false)}
            class="absolute top-3 right-4 duration-200 hover:bg-red-200 rounded-full w-7 h-7"
        >
            <p class="text-red-800 -translate-y-1 text-2xl leading-none">x</p>
        </button>
        <slot />
    </div>
</div>
