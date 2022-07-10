<template>
<div class="home">
    <h1>我的菜谱</h1>
    <button @click="togglePopup">添加新的菜谱</button>
    <div class="recipes">
        <!-- Recipes to go here -->
        <div class="card" v-for="recipe in $store.state.recipes" :key="recipe.slug">
            <h2>{{ recipe.title }}</h2>
            <p>{{ recipe.description }}</p>
            <router-link :to="`/recipe/${recipe.slug}`">
                <button>查看菜谱</button>   
            </router-link>
            <button class="delete_btn" @click="deleteRecipe(recipe.slug)">删除菜谱</button>
        </div>
    </div>

    <div class="add-recipe-popup" v-if="popupOpen">
        <div class="popup-content">
            <h2>新菜谱</h2>
            <form @submit.prevent="addNewRecipe">
                <div class="group">
                    <label>菜名</label>
                    <input type="text" v-model="newRecipe.title">
                </div>
                <div class="group">
                    <label>描述</label>
                    <textarea v-model="newRecipe.description"></textarea>
                </div>
                <div class="group">
                    <label>原料</label>
                    <div class="ingredient" v-for="index in newRecipe.ingredientCounts" :key="index">
                        <input type="text" v-model="newRecipe.ingredients[index-1]"/>
                        <span class="iconfont icon-delete delete" @click="deleteIngredient(index - 1)"></span>
                    </div>
                    <button type="button" @click="addNewIngredient">添加原料</button>
                </div>

                <div class="group">
                    <label>步骤</label>
                    <div class="method" v-for="index in newRecipe.methodCounts" :key="index">
                        <textarea v-model="newRecipe.methods[index-1]"></textarea>
                        <span class="iconfont icon-delete delete" @click="deleteMethod(index - 1)"></span>
                    </div>
                    <button type="button" @click="addNewMethod">添加步骤</button>
                </div>
                <button type="submit">添加新菜谱</button>
                <button type="close" @click="togglePopup">关闭</button>
            </form>
        </div>
    </div>
</div> 
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

const newRecipe = ref({
    title: '',
    description: '',
    ingredients: [],
    methods: [],
    ingredientCounts: 1,
    methodCounts: 1
})

const popupOpen = ref(false)
const store = useStore()

function togglePopup() {
    popupOpen.value = !popupOpen.value
}


function addNewIngredient() {
    newRecipe.value.ingredientCounts++
}

function deleteIngredient(index) {
    newRecipe.value.ingredients.splice(index, 1)
    newRecipe.value.ingredientCounts--
    
}

function addNewMethod() {
    newRecipe.value.methodCounts++
}

function deleteMethod(index) {
    newRecipe.value.methods.splice(index, 1)
    newRecipe.value.methodCounts--
}

function addNewRecipe() {
    newRecipe.value.slug = newRecipe.value.title.toLowerCase().replace(/\s/g, '-')

    if (!newRecipe.value.slug) {
        alert("Please enter a title")
        return
    }

    store.commit("ADD_RECIPE", { ...newRecipe.value })

    newRecipe.value = {
        title: '',
        description: '',
        ingredients: [],
        methods: [],
        ingredientCounts: 1,
        methodCounts: 1
    }

    togglePopup()
}

function deleteRecipe(slug) {
    store.commit("DELETE_RECIPE", slug)
}
</script>

<style>
.home {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}

h1 {
    font-size: 3rem;
    margin-bottom: 32px;
}

.recipes {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.recipes .card {
    padding: 1rem;
    border-radius: 5px;
    margin: 1rem;
    background-color: #081c33;
}

.recipes .card h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
}

.recipes .card p {
    font-size: 1.125rem;
    line-height: 1.4;
    margin-bottom: 1rem;
}

.add-recipe-popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.add-recipe-popup .popup-content {
    width: 100%;
    max-width: 768px;
    height: 80%;
    padding: 2rem;
    border-radius: 1rem;
    background-color: #081c33;
    overflow: scroll;
}

.popup-content h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
}

.popup-content .group {
    margin-bottom: 1rem;
}

.popup-content .group label {
    display: block;
    margin-bottom: 0.5rem;
}

.popup-content .group input,
.popup-content .group textarea {
    display: block;
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 1rem;
}

.popup-content .group textarea {
    height: 100px;
    resize: none;
}

.popup-content button[type="submit"] {
    margin-right: 1rem;
}


.ingredient {
    position: relative;
}

.method {
    position: relative;
}

.delete {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    color: red;
    font-size: 2rem;
    cursor: pointer;
}

.delete_btn {
    background-color: lightsalmon;
    float: right;
}
</style>