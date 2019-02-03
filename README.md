# A Vue.js Instagram component to display the authenticated user's feed

This component is based on [Kevin Ongko's](https://github.com/kevinongko/vue-instagram) vue-instagram package but with an axios integration and personalised build tools to enable it to work in Node based environments (Vuepress with SSR in my case).

## Installation

```sh
npm i @silvanite/vue-instagram
```

```js
import Vue from 'vue'
import VueInstagram from '@silvanite/vue-instagram'

Vue.use(VueInstagram)
```

## Usage

```html
<template>
    <vue-instagram token="accessTokenHere" :count="5" :tags="['hashtag1', 'hashtag2']" mediaType="image">
        <template slot="feeds" slot-scope="{ feed }">
            <div> {{ feed.link }} </div>
        </template>
        <template slot="error" slot-scope="{ feed }">
            <div> {{ feed.error.error_message }} </div>
        </template>
    </vue-instagram>
</template>
```
