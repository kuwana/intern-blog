<template>
  <div class="login-page">
    <div class="login-container shadow">
      <div class="login-content">
        <form @submit.prevent="loginSubmit" class="login-form">
          <div>
            <label for="email" class="label">メールアドレス</label>
            <input type="text" v-model="email" id="email" placeholder="admin@example.com" class="input" />
          </div>
          <div class="row">
            <label for="password" class="label">パスワード</label>
            <input type="password" v-model="password" id="email" placeholder="******" class="input" />
          </div>
          <button type="submit" class="login-btn shadow">ログイン</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { Auth } from '@/plugins/firebase'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      errors: [],
      email: '',
      password: ''
    }
  },
  created () {
    Auth.onAuthStateChanged(user => {
      if (user) {
        // this.$store.commit('auth/setUser', user)
        console.log('set!', user.email)
      } else {
        // No user is signed in.
        console.log('no set...')
      }
    })
  },
  methods: {
    validate() {
      if (this.email === '') {
        this.errors.push('メールアドレスを入力してください。')
      }
      if (this.password === '') {
        this.errors.push('パスワードを入力してください。')
      }
      if (this.errors.length > 0) {
        return false
      }
      return true
    },
    loginSubmit () {
      if (!this.validate()) {
        return false
      }
      Auth.signInWithEmailAndPassword(this.email, this.password)
        .catch(error => {
          window.alert(error.message)
        })
    }
  }
}
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}
.login-container {
  border-radius: 3px;
  border: 1px solid #ffffff;
  width: 320px;
  background-color: #fff;
}
.login-content {
  display: flex;
  flex-direction: column;
  padding: 1.25 rem;
}
.label {
  display: block;
  font-size: 0.75rem;
  color: #607d8b;
}
.input {
  margin-top: 3px;
  padding: 12px;
  width: 100%;
  border: none;
  background-color: #ddd;
  border-radius: 3px;
}
.row {
  margin-top: 12px;
}
.login-btn {
  width: 100%;
  margin-top: 24px;
  background-color: #009688;
  border-radius: 50px;
  border: none;
  box-shadow: 1px 1px 11px -5px #000000;
  font-size: 1.25rem;
  font-weight: 700;
  color: #fff;
  padding: 12px;
}
</style>
