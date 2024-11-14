<script lang="ts">
    interface ButtonProps {
        onClick?: () => void;
        type?: 'submit' | 'button';
        isDisabled?: boolean;
    }

    const { onClick, type = 'button', isDisabled }: ButtonProps = $props();
</script>

<button disabled={isDisabled} {type} class="button {isDisabled ? 'disabled' : ''}" onclick={onClick}
    ><slot></slot></button
>

<style>
    .button {
        width: 200px;
        border: none;
        padding: 5px 10px;
        background: #e6e6fa;
        border-radius: 4px;
        transition: 0.2s;
    }

    .button:hover {
        transform: scale(1.05);
        cursor: pointer;
        background: #acacf8;
    }

    .button.disabled {
        cursor: auto;
    }

    .button.disabled:hover {
        transform: scale(1);
        background: #e6e6fa;
    }
</style>
