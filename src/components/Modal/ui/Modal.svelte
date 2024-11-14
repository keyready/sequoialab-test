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

    const { setIsOpened, isOpened }: ModalProps = $props();
</script>

<button
    onclick={() => setIsOpened(false)}
    type="button"
    class="-z-10 opacity-0 {isOpened &&
        '!z-30 !opacity-100 '} flex z-30 items-center bg-opacity-20 bg-black backdrop-blur-md justify-center fixed top-0 bottom-0 right-0 left-0"
>
    <!--        Отменяем всплытие, чтобы по клику на тело модалки, она не закрывалось-->
    <div
        class="{isOpened &&
            '!opacity-100 !scale-100'} duration-200 scale-75 opacity-0 z-40 cursor-auto bg-main/40 w-2/3 h-2/4 overflow-auto p-5 rounded-xl"
        onclick={(event) => event.stopPropagation()}
    >
        <slot />
    </div>
</button>
