<template>
  <header class="header">
    <nav class="container header-container">
      <div class="brand">
        <nuxt-link to="/" class="none-deco logo">
          ○○○のブログ
        </nuxt-link>
      </div>
      <div class="nav-link">
        <div class="outline mr-4">
          <nuxt-link to="/post/new" class="none-deco">
            投稿
          </nuxt-link>
        </div>
        <div class="outline">
          <nuxt-link v-if="!user" to="/login" class="none-deco">
            ログイン
          </nuxt-link>
          <div v-else>ログイン済</div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
// import { mapState } from 'vuex'
import { Auth } from '@/plugins/firebase'
export default {
  computed: {
  },
  data () {
    return {
      user: Auth.currentUser
    }
  },
  created () {
  }

}
</script>

<style scoped>
.header {
  background-color: #009688;
  padding: 1rem 0;
}
.none-deco {
  color: #fff;
  text-decoration: none;
}
.header-container {
  padding: 0 1rem;
  align-items: center;
}
.brand {
  justify-content: flex-start;
  width: 50%;
}
.logo {
  font-weight: 700;
  justify-content: flex-start;
}
.nav-link {
  display: flex;
  justify-content: flex-end;
  width: 50%;
}
.outline {
  padding: 6px;
  border: 1px solid #fff;
  border-radius: 3px;
}
.mr-4 {
  margin-right: 8px;
}
</style>
