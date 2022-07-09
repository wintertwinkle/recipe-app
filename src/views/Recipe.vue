<template>
    <div class="recipe">
        <router-link to="/">&lt; Back</router-link>
        <h1>{{ recipe.title }}</h1>
        <p class="desc">{{ recipe.description }}</p>
        <hr>
        <div class="ingredients">
            <h3>Ingredients</h3>
            <ul>
                <li v-for="(ingredient, i) in recipe.ingredients" :key="i">
                    {{ ingredient }}
                </li>
            </ul>
        </div>
        <div class="methods">
            <h3>Method</h3>
            <ol>
                <li v-for="(method, i) in recipe.methods" :key="i">
                    {{ method }}
                </li>
            </ol>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        recipe() {
            return this.$store.state.recipes.find(recipe => {
                return recipe.slug === this.$route.params.slug
            })
        }
    }
}
</script>

<style>
.recipe {
    padding: 1rem;
    max-width: 768px;
    margin: 0 auto;
}

.desc {
    font-size: 1.125rem;
    line-height: 1.4;
    margin-bottom: 1rem;
}

hr {
    margin-bottom: 1rem;
}

h3 {
    margin-bottom: 1rem;
}

.ingredients ul li {
    list-style-position: inside;
    line-height: 1.4;
    margin-bottom: 1rem;
}

.methods ol li {
    list-style-position: inside;
    line-height: 1.4;
    border-bottom: 1px solid #eee;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
}
</style>