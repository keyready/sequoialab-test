/** @type {import('tailwindcss').Config} */

import { skeleton } from '@skeletonlabs/tw-plugin';
import { join } from 'path';

export default {
    darkMode: 'class',
    content: [
        './src/**/*.{html,js,svelte,ts}',
        // eslint-disable-next-line no-undef
        join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}'),
    ],
    theme: {
        extend: {
            colors: {
                main: '#45B50E',
            },
        },
    },
    plugins: [
        skeleton({
            themes: { preset: ['skeleton'] },
        }),
    ],
};
