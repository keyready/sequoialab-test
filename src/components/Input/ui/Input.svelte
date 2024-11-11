<script lang="ts">
	interface InputProps {
		value?: string;
		onChange?: (value: string) => void;
		placeholder?: string;
		type?: 'text' | 'password'
	}

	const { onChange, placeholder = 'Введите текст', value, type = 'text' }: InputProps = $props();

	let isFocus = $state(false);

	const handleChange = (event: Event) => {
		const target = event.target as HTMLInputElement;
		onChange?.(target.value);
	};
</script>

<div class="wrapper">
	<p class="label {isFocus ? 'active' : ''}">{placeholder}</p>
	<input type={type} onblur={() => isFocus && !value ? isFocus = false : {}} onfocus={() => isFocus = true} value={value}
				 onchange={handleChange} />
</div>

<style>
    .wrapper {
        position: relative;
        background: lavender;
        padding: 5px 10px;
        border-radius: 6px;
        height: 55px;
				display: flex;
				flex-direction: column;
				align-items: stretch;
				justify-content: flex-end;
				transition: 200ms;
    }

    .label {
        width: 100%;
        opacity: 0.6;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-45%, -50%);
        z-index: 1;
        transition: 200ms;
    }

    .label.active {
        top: 10%;
        left: 5%;
        transform: translate(0, 0);
				font-size: 12px;
    }

    input {
        z-index: 10;
        border: none;
        background: transparent;
        transition: 200ms;
        height: 100%;
        width: 200px;
    }

    input:focus {
        border: none;
				outline: none;
    }
</style>