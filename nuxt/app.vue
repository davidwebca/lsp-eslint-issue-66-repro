<script setup>
import '~/assets/css/main.css';
</script>
<template>
    <div class="bg-white font-sans antialiased">
        <NuxtPage />
    </div>
    <DevOnly>
        <div class="fixed bottom-0 left-0 z-50 flex w-12 items-center justify-center bg-neutral-800 text-xs text-white">
            <div class="block sm:hidden">
                xs
            </div>
            <div class="hidden sm:block md:hidden">
                sm
            </div>
            <div class="hidden md:block lg:hidden">
                md
            </div>
            <div class="hidden lg:block xl:hidden">
                lg
            </div>
            <div class="hidden xl:block 2xl:hidden">
                xl
            </div>
            <div class="hidden 2xl:block 3xl:hidden">
                2xl
            </div>
            <div class="hidden 3xl:block">
                3xl
            </div>
        </div>
    </DevOnly>
</template>
