<template>
    <div id="app">
        <!-- 認証済みの時はメインの画面を表示 -->
        <div v-if="signedIn">
            <div id="nav">
                <div class="amplify-sign-out">
                    <!-- Amplify UIのSign Out用コンポーネントを追加 -->
                    <amplify-sign-out />
                    <!-- ログイン済みユーザのusernameを表示 -->
                    ようこそ、{{username}} さん
                </div>
                <router-link to="/ai">AIアプリ</router-link> |
                <router-link to="/chat">チャットアプリ</router-link>
            </div>
            <router-view />
        </div>
        <!-- 認証していない時はログイン画面を表示 -->
        <div v-else>
            <amplify-authenticator />
        </div>
    </div>
</template>


<script>
import { Auth } from 'aws-amplify'
import { AmplifyEventBus } from 'aws-amplify-vue'

window.LOG_LEVEL = 'VERBOSE';

export default {
  name: 'app',
  data(){
    return {
      signedIn: false,
      username: ''
    }
  },
  async beforeCreate() {
    // Auth.currentAuthenticatedUser()でユーザ情報を取得する。
    // 取得できなければ認証ステータスをfalseに設定する
    try {
      let cognitoUser = await Auth.currentAuthenticatedUser()
      this.signedIn = true
      this.username = cognitoUser.username
    } catch (err) {
      this.signedIn = false
    }
    // 認証ステータスが変わった時に呼び出されるイベントを登録

    AmplifyEventBus.$on('authState', async  info => {
      if (info === 'signedIn') {
        let cognitoUser = await Auth.currentAuthenticatedUser()
        this.signedIn = true
        this.username = cognitoUser.username
      } else {
        this.signedIn = false
      }
    });
  }
  };
</script>

<style src="./assets/style.css" />

<!--<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>-->
