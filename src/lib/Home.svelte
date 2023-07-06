<script lang="ts">
  import type { AuthSession } from "@supabase/supabase-js";

  import { supabase } from "../supabaseClient";
  import { onMount } from "svelte";

  export let session: AuthSession;

  let recipes = [];
  let loading = false;

  onMount(() => {
    getRecipes();
  });

  const getRecipes = async () => {
    try {
      const { user } = session;
      const { data, error, status } = await supabase
        .from("recipes")
        .select("*");

      if (error && status !== 406) throw error;

      if (data) {
        recipes = data;
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

<div>
  <h1>Oppskifter</h1>

  <input type="text" placeholder="Søk etter oppskifter" />

  {#each recipes as recipe}
    <div class="recepie-contaier">
      <div class="photo">
        <img src={recipe.img} alt="" />
      </div>
      <h2>
        {recipe.name}
      </h2>
      <div class="container">
        <div class="ingredients">
          <b>Ingredisener</b>
          {#each recipe.ingredients as ingredient}
            <p class="ingredient">{ingredient}</p>
          {/each}
        </div>

        <div class="description">
          <p>{recipe.description}</p>

          <div>
            <h3>Fremgangsmåte</h3>
            <div class="approach">
              <ol>
                {#each recipe.approach as approach}
                  <li class="approach-item">{approach}</li>
                {/each}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/each}
</div>

<style>
  h3,
  ol,
  li,
  p {
    margin: 0;
  }

  .recepie-contaier {
    padding: 0 0 1rem 0;
    background-color: #333;
    padding: 8px;
    margin: 16px 0;
    border-radius: 8px;
  }

  .photo {
    display: flex;
    justify-content: center;
  }
  img {
    max-width: 100%;
    max-height: 100%;
    height: auto;
  }

  .container {
    display: flex;
    gap: 1rem;
    width: 100%;
  }

  .ingredients {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 250px;
  }

  .approach,
  .description {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .approach-item {
    padding: 0.5rem 0;
  }
</style>
