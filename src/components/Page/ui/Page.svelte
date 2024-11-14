<!-- Компонент-обертка над всеми страницами. Люблю такую практику-->

<script lang="ts">
    interface PageProps {
        className?: string;
    }

    const { className }: PageProps = $props();
</script>

<section class="w-full py-10 px-20 h-screen overflow-auto {className}">
    <slot />
</section>
