<script lang="ts">
    import { ProgressRadial } from '@skeletonlabs/skeleton';
</script>

<div
    class="flex items-center bg-opacity-20 bg-black z-50 backdrop-blur-md justify-center fixed top-0 bottom-0 right-0 left-0"
>
    <div>
        <ProgressRadial
            stroke={40}
            meter="stroke-main"
            track="stroke-main/30"
            strokeLinecap="round"
            value={undefined}
        />
    </div>
</div>
