<script lang="ts">
  import { onMount } from "svelte";
  import { supabase } from "./supabaseClient";
  import type { AuthSession } from "@supabase/supabase-js";

  import Auth from "./lib/Auth.svelte";
  import Account from "./lib/Account.svelte";

  let session: AuthSession;

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
  {#if !session}
    <Auth />
  {:else}
    <section>
      <Account {session} />
    </section>
  {/if}
</div>

<style>
  .container {
    padding: 50px 0 100px 0;
  }

  section {
    padding: 2rem 0;
  }
</style>
