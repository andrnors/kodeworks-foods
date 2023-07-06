<script lang="ts">
  import { onMount } from "svelte";
  import { supabase } from "./supabaseClient";
  import type { AuthSession } from "@supabase/supabase-js";

  import Auth from "./lib/Auth.svelte";
  import Account from "./lib/Account.svelte";
  import Home from "./lib/Home.svelte";
  import type { NavigationItems, NavigationItem } from "./types/navigation";
  import Upload from "./lib/Upload.svelte";

  let session: AuthSession;

  const items: NavigationItem[] = [
    {
      name: "Home",
      value: "home",
    },
    {
      name: "Upload recipe",
      value: "upload",
    },
    {
      name: "Dinner of the day",
      value: "dinner-of-the-day",
    },
    {
      name: "Account",
      value: "account",
    },
  ];

  let currentNavigationItem: NavigationItems = "home";

  function onChangePage(value: NavigationItems) {
    currentNavigationItem = value;
  }

  onMount(() => {
    supabase.auth.getSession().then(({ data }) => {
      session = data.session;
    });

    supabase.auth.onAuthStateChange((_event, _session) => {
      session = _session;
    });
  });
</script>

<div class="container">
  <nav>
    {#each items as item}
      <button
        class={item.value === currentNavigationItem ? "primary" : "button "}
        on:click={() => onChangePage(item.value)}
        >{item.name}
      </button>
    {/each}
  </nav>
  {#if !session}
    <Auth />
  {:else}
    {#if currentNavigationItem === "account"}
      <section>
        <Account {session} />
      </section>
    {/if}

    {#if currentNavigationItem === "home"}
      <section>
        <Home {session} />
      </section>
    {/if}

    {#if currentNavigationItem === "upload"}
      <section>
        <Upload {session} />
      </section>
    {/if}
  {/if}
</div>

<style>
  nav {
    display: flex;
    gap: 1rem;
  }
  .container {
    padding: 50px 0 100px 0;
  }

  section {
    padding: 2rem 0;
  }
</style>
