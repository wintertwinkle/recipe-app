import { createStore } from "vuex"

const store = createStore({
    state: {
        recipes: [],
    },
    mutations: {
        INIT(state) {
            console.log(`store init`)
            if (localStorage.getItem("recipes")) {
                const recipes = JSON.parse(localStorage.getItem("recipes"))
                const initState = Object.assign(state, { recipes })
                this.replaceState(initState)
            }
        },
        ADD_RECIPE(state, recipe) {
            state.recipes.push(recipe)
        },
        DELETE_RECIPE(state, slug) {
            const index = state.recipes.findIndex(
                (recipe) => recipe.slug === slug
            )
            state.recipes.splice(index, 1)
        },
    },
})

store.subscribe((mutations, state) => {
    switch (mutations.type) {
        case "ADD_RECIPE":
        case "DELETE_RECIPE":
            localStorage.setItem("recipes", JSON.stringify(state.recipes))
    }
})

export default store
