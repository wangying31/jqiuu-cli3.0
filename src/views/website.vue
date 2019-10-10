<template>
  <div class="container pad_t75">
      <div class="d_cont" v-for="(item, index) in getWebList" :key="index">
        <p class="d_type">{{item.type}}</p>
        <div class="d_item" v-for="item1 in item.data" :key="item1._id">
          <div class="d_icon" @click="goLink(item1.link, item1._id)">
            <img :src="item1.icon" alt=""> 
          </div>
          <div class="d_right">
            <p class="d_title" @click="goLink(item1.link, item1._id)">{{item1.title}}</p>
            <p class="d_info">{{item1.info}}</p>
            <p class="d_num"><span class="hide_mobile" title="点赞" @click="addLikeNum(item1._id)"><i class="iconfont icon-like"></i><em>{{item1.likeNum}}</em></span><span class="hide_mobile" title="访问量"><i class="iconfont icon-browse"></i><em>{{item1.browseNum}}</em></span></p>
          </div>
        </div>
      </div>

  </div>
</template>
<script>
import { mapGetters ,mapActions } from 'vuex'

export default {
  data() {
    return {
      list: [
        
      ]
    }
  },
  computed: {
      ...mapGetters({
        getWebList: 'getWebList'
      }),
      ...mapActions({
        websiteList: 'websiteList',
        websitebrowseNum: 'websitebrowseNum',
        websiteLikeNum: 'websiteLikeNum'
      })
    },
  created() {
    
  },
  mounted() {
    this.$store.dispatch('websiteList');
    console.log(this.getWebList);
  },
  methods: {
    goLink(link, id) {
      this.$store.dispatch('websitebrowseNum', {id: id});
      window.open(link, '_blank');
    },
    addLikeNum(id) {
      this.$store.dispatch('websiteLikeNum', {id: id});
    }
  },
}
</script>
<style lang="less">
  .d_cont {
    width: 100%;
  }
  .d_type {
    margin-bottom: 2%;
    font-size: 20px;
    color: #666;
    width: 200px;
  }
  .d_type:before {
    content: '';
    border: solid 1px #59bfff;
    margin-right: 10px;
  }
  // .d_type:hover {
  //   margin-left: 20px;
  // }
  .d_item {
    width: 23.5%;
    float: left;
    box-sizing: border-box;
    margin-right: 1.5%;
    margin-bottom: 2%;
    border-radius: 4px;
    padding: 0px 0px 8px 0px;
    height: auto;
    background: #fff;
  }
  .d_item:hover {
    // border: 1px solid transparent;
    box-shadow: 0 0 15px rgba(0,0,0,.1)
  }
  .d_icon {
    width: 16%;
    float: left;
    margin: 22px 5% 0% 5%;
    cursor: pointer;
  }
  .d_icon img {
    border-radius: 50%;
    width: 100%;
  }
  .d_right {
    width: 73%;
    float: right;
  }
  .d_title {
    height: 25px;
    overflow: hidden;
    margin-bottom: 0px;
    line-height: 22px;
    margin-top: 16px;
    padding: 2% 5% 0% 0%;
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 5px;
    cursor: pointer;
  }
  .d_title:hover {
    color: #59bfff;
    text-decoration: underline;
  }
  .d_info {
    overflow: hidden;
    height: 20px;
  }
  .d_num {
    color: #ccc;
    font-size: 12px;
  }
  .d_num span {
    margin-right: 20px;
  }
  .d_num span:nth-child(1){
    cursor: pointer;
  }
  .d_num em {
    padding-left: 4px;
  }
  @media (max-width: 1000px) {
    .d_icon {
      width: 100%;
      margin: 0;
    }
    .d_icon img {
      width: 100%;
    }
    .d_right {
      width: 100%;
      text-align: center;
    }
    .d_info, .d_num {
      display: none;
    }
  }
</style>