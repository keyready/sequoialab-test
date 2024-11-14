<script lang="ts">
    /**
     * Простенький компонент модального окна
     */
    interface ModalProps {
        isOpened: boolean;
        setIsOpened: (state: boolean) => void;
    }

    const { setIsOpened, isOpened }: ModalProps = $props();
</script>

{#if isOpened}
    <button
        onclick={() => setIsOpened(false)}
        type="button"
        class="flex z-30 items-center bg-opacity-20 bg-black backdrop-blur-md justify-center fixed top-0 bottom-0 right-0 left-0"
    >
        <!--        Отменяем всплытие, чтобы по клику на тело модалки, она не закрывалось-->
        <div
            class="z-40 cursor-auto bg-main/40 w-2/3 h-2/4 overflow-auto p-5 rounded-xl"
            onclick={(event) => event.stopPropagation()}
        >
            <slot />
        </div>
    </button>
{/if}
