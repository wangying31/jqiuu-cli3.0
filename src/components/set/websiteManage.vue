<template>
<div class="col-md-9 pad_l0">
    <div class="row">
      <div class="col-md-12">
        <div class="panel">
          <div class="panel_tit">
            <h4>{{title}}</h4>
          </div>
          <div class="panel_body">
            <div class="row">
              <div class="col-md-8">
                <div class="set_form clearfix">
                  <div class="tit">标题：</div>
                  <div class="inp"><input type="text" class="form-control" v-model.trim="website.title"></div>
                </div>
                <div class="set_form clearfix">
                  <div class="tit">链接：</div>
                  <div class="inp"><input type="text" class="form-control" v-model.trim="website.link"></div>
                </div>
                <div class="set_form clearfix">
                  <div class="tit">图标：</div>
                  <div class="inp"><input type="text" class="form-control" v-model.trim="website.icon"></div>
                </div>
                <div class="set_form clearfix">
                  <div class="tit">简介：</div>
                  <div class="inp"><input type="text" class="form-control" v-model.trim="website.info"></div>
                </div>
                <div class="set_form clearfix">
                  <div class="tit">类型：</div>
                  <div class="inp">
                    <select class="form-control panel_tit_input" v-model.trim="website.type">
                      <option v-for="option in getTypes" :value="option" :key="option._id">{{option}}</option>
                    </select>&nbsp;&nbsp;
                    <button class="btn btn-info" @click="addType">{{ty.text}}</button>
                    <input type="text" class="form-control panel_tit_input" v-model.trim="ty.newType" v-show="ty.show" placeholder="添加类型">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="panel_foot set_sub">
            <button class="btn btn-info btn-sm" @click="update">提交</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions} from 'vuex'
export default {
    data() {
      return {
        title: '新增网址',
        website:{
          title: '',
          icon: '',
          info: '',
          type: '',
          link: ''
        },
        ty:{
          text:'添加',
          show: false,
          newType:''
        }
      }
    },
    props: {
        tp: {
          type: String
        }
    },
    computed : {
        ...mapGetters({
            getTypes : 'getTypes'
        }),
        ...mapActions({
            typess: 'typess',
            newTypes: 'newTypes',
            addWebsit: 'addWebsit'
        })
    },
    watch: {
      'tp': function(newVal, oldVal) {
        this.title = newVal === 'add' ? '新增网址' : newVal === 'update' ? '修改网址' : '删除网址'
      }
    },
    created() {
      // this.type = this.$route.params.type
      console.log(this.tp)
    },
    mounted() {
      this.$store.dispatch('typess')
      this.website.type = this.getTypes[0]
    },
    methods: {
      addType () {
        let type = this.ty.newType
        if (this.ty.show && type && type.length < 10) {
          this.ty.show = false
          this.ty.text = '添加'
          this.$store.dispatch('newTypes', type)
          this.website.type = type
          this.ty.newType = ''
        } else {
          this.ty.show = true
          this.ty.text = '确定'
        }
      },
      update() {
        
        this.$store.dispatch('addWebsit', this.website)
      }
    },
}
</script>