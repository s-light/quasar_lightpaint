<template>
    <q-layout view="lHh Lpr lFf">
        <!-- <q-header elevated>
            <q-toolbar>
                <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

                <q-toolbar-title> Quasar App </q-toolbar-title>

                <div>Quasar v{{ $q.version }}</div>
            </q-toolbar>
        </q-header> -->

        <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="toggleLeftDrawer"
            class="fixed-top q-ma-sm"
            style="z-index: 10000"
        >
        </q-btn>

        <q-drawer v-model="leftDrawerOpen" bordered elevated persistent>
            <q-list class="q-pt-xl q-pb-xl">
                <EssentialNavigation />

                <q-item>
                    <q-item-section> </q-item-section>
                </q-item>

                <q-item-label header class="fixed-bottom">
                    {{ appinfo.productName }} v{{ appinfo.version }}
                    <br />
                    Quasar v{{ $q.version }}
                </q-item-label>
            </q-list>
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script setup>
import { ref } from "vue";

import EssentialNavigation from "components/EssentialNavigation.vue";

defineOptions({
    name: "MainLayout",
});

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
    leftDrawerOpen.value = !leftDrawerOpen.value;
}

const appinfo = process.env.appinfo;
</script>
