<template>
  <div>
    <div class="container pad_t75">
      <div class="row">
        <div class="col-md-3">
          <div class="panel_s">
            <h5>个人设置</h5>
            <div>
              <router-link to="/set" class="set_a" active-class="set_active" exact>我的信息</router-link>
              <router-link to="/set/password" class="set_a" active-class="set_active">修改密码</router-link>
              <router-link to="/set/friend" class="set_a" active-class="set_active">我的小伙伴</router-link>
            </div>
          </div>
          <div class="panel_s">
            <h5>直通车管理</h5>
            <div>
              <router-link :to="{ name: 'websiteManage', params: { tp: 'add' }}" class="set_a" active-class="set_active" exact>新增网址</router-link>
              <router-link :to="{ name: 'websiteManage', params: { tp: 'update' }}" class="set_a" active-class="set_active">修改网址</router-link>
              <router-link :to="{ name: 'websiteManage', params: { tp: 'del' }}" class="set_a" active-class="set_active">删除网址</router-link>
            </div>
          </div>
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>

export default {

}

</script>
