<script lang="ts">
  import type { AuthSession } from "@supabase/supabase-js";
  import { supabase } from "../supabaseClient";

  export let session: AuthSession;

  let loading = false;
  let name = "";
  let link = "";
  let description = "";
  let ingredients: string[] = [""];
  let approach: string[] = [""];

  const addIngredient = () => {
    const newList = [...ingredients, ""];
    ingredients = newList;
  };

  const addApproachStep = () => {
    const newList = [...approach, ""];
    approach = newList;
  };

  const removeIngredient = (index: number) => {
    ingredients.splice(index, 1);
    ingredients = ingredients;
  };

  const removeApproachStep = (index: number) => {
    approach.splice(index, 1);
    approach = approach;
  };

  const upload = async () => {
    try {
      loading = true;
      const updates = {
        name,
        link,
        description,
        ingredients,
        approach,
      };

      let { error } = await supabase.from("recipes").upsert(updates);
      window.location.reload();

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      loading = false;
    }
  };
</script>

<form on:submit|preventDefault={upload} class="form-widget">
  <!-- <Avatar bind:url={avatar} size={150} on:upload={updateProfile} /> -->

  <div>
    <label for="name">Name</label>
    <input id="name" type="text" bind:value={name} />
  </div>
  <div>
    <label for="link">Link</label>
    <input id="link" type="text" bind:value={link} />
  </div>
  <div>
    <label for="description">Description</label>
    <textarea id="description" rows="6" bind:value={description} />
  </div>
  <div class="arrays">
    <label for="">Ingredients</label>
    {#each ingredients as ingredient, index}
      <div class="form-row">
        <input type="text" bind:value={ingredient} />
        <button type="button" on:click={() => removeIngredient(index)}
          >Remove</button
        >
      </div>
    {/each}
    <button type="button" class="secondary" on:click={addIngredient}
      >Add more ingredients</button
    >
  </div>

  <div class="arrays">
    <label for="">Approach</label>
    {#each approach as a, index}
      <div class="form-row">
        <input type="text" bind:value={a} />
        <button type="button" on:click={() => removeApproachStep(index)}
          >Remove</button
        >
      </div>
    {/each}
    <button type="button" class="secondary" on:click={addApproachStep}
      >Add one more step</button
    >
  </div>

  <div>
    <button type="submit" class="button primary block" disabled={loading}>
      {loading ? "Saving ..." : "Upload recipes"}
    </button>
  </div>
</form>

<style>
  .arrays {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .form-row {
    display: grid;
    grid-template-columns: 11fr 1fr;
    gap: 1rem;
  }
</style>
