<template>
  <div class="upload-card">
    <div class="choose-img">
      <div class="choose-item" v-for="item in selected">
        <img :src="item.url" alt="">
        <div class="choose-title" :class="chooseColor(item.cover)">
          {{coverTitle(item.cover)}}
        </div>
        <div class="choose-button">
          <div class="btn-i" @click="setCover(item.name,2)">设为封面</div>
          <div class="btn-i" @click="setCover(item.name,1)">设为配图</div>
          <div class="btn-i">复制链接</div>
        </div>
      </div>
      <div class="add-item" @click="modalCard=true">
        <Icon type="plus-round" :size="40"></Icon>
      </div>
    </div>
    <Modal v-model="modalCard" width="850">
      <p slot="header" style="height:26px;display:flex;align-items:center">
        <span style="float:left">图片列表</span>
        <span style="marginLeft:20px;width:700px;float:right;fontSize:12px;fontWeight:normal">
          <Page :total="40" size="small" show-elevator show-total></Page>
        </span>
      </p>
      <Input v-if="false" size="small" v-model="search" icon="ios-search-strong" placeholder="Enter something..." style="width: 200px"></Input>

      <Row>
        <Col span="6">
        <Upload multiple :show-upload-list="false" :action="uploadUrl" :on-success="uploadSuccess">
          <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
        </Upload>
        </Col>
        <Col span="18">
        <Input v-model="imgUrl">
        <span slot="prepend">网络图片</span>
        <Button slot="append" @click="uploadImgByUrl" type="primary">点击上传</Button>
        </Input>
        </Col>
      </Row>
      <Row v-if="false">
        <!-- <Col span="6">
        <div class="file-tree">
          <Tree :data="data5" :render="renderContent"></Tree>
        </div>
        </Col> -->
        <!-- <Col span="18"></Col> -->
      </Row>
      <Row style="height:700px;margin-top:10px">
        <ul class="file-img-list">
          <li class="img-item" v-for="item in images" @click="selectItem(item)">
            <div class="img-show">
              <img :src="item.url" alt="">
            </div>
            <div class="img-meta">
              400*34
            </div>
            <div class="img-update">
              {{timeS(item.lastModified)}}
            </div>
            <div class="img-title">
              {{item.name}}
            </div>
            <div class="item-attach" v-if="attachShow(item.name)">
              <span>1</span>
            </div>
          </li>
        </ul>

      </Row>
    </Modal>

  </div>
</template>
<script>
import config from '../../config'
import dayjs from 'dayjs'
export default {
  data () {
    return {
      modalCard: false,
      imgUrl: '',
      images: [],
      uploadUrl: config.upload,
      value11: '',
      search: '1231',
      data5: [
        {
          title: 'parent 1',
          expand: true,
          render: (h, { root, node, data }) => {
            console.log('看看node')
            console.log(node)
            return h('span', {
              style: {
                display: 'inline-block',
                width: '100%'
              }
            }, [
              h('span', [
                h('Icon', {
                  props: {
                    type: 'ios-folder-outline'
                  },
                  style: {
                    marginRight: '8px'
                  }
                }),
                h('span', data.title)
              ]),
              h('span', {
                style: {
                  display: 'inline-block',
                  float: 'right',
                  marginRight: '32px'
                }
              }, [
                h('Button', {
                  props: Object.assign({}, this.buttonProps, {
                    icon: 'ios-plus-empty',
                    type: 'primary'
                  }),
                  style: {
                    width: '52px'
                  },
                  on: {
                    click: () => { this.append(data) }
                  }
                })
              ])
            ])
          }
          // children: [
          //     {
          //         title: 'child 1-1',
          //         expand: true,
          //         children: [
          //             {
          //                 title: 'leaf 1-1-1',
          //                 expand: true
          //             },
          //             {
          //                 title: 'leaf 1-1-2',
          //                 expand: true
          //             }
          //         ]
          //     },
          //     {
          //         title: 'child 1-2',
          //         expand: true,
          //         children: [
          //             {
          //                 title: 'leaf 1-2-1',
          //                 expand: true
          //             },
          //             {
          //                 title: 'leaf 1-2-1',
          //                 expand: true
          //             }
          //         ]
          //     }
          // ]
        }
      ],
      buttonProps: {
        type: 'ghost',
        size: 'small'
      },
      // cover 2 封面  1 配图 0普通
      selected: []
    }
  },
  mounted () {
    // this.imgList()
  },
  methods: {
    // 设置封面 配图
    setCover (name, num) {
      const index = this.selected.findIndex(x => x.name === name)
      const cover = this.selected[index].cover
      if (cover == undefined) {
        this.selected[index].cover = num
        this.$forceUpdate()
        return true
      }
      if (num === 2) {
        const i = this.selected.findIndex(x => x.cover === 2)
        if (i > -1) {
          this.selected[i].cover = 0
        }
        this.selected[index].cover = 2
        this.$forceUpdate()
        return true
      }
      if (cover === num) {
        this.selected[index].cover = 0
        this.$forceUpdate()
        return true
      }
    },
    coverTitle (cover) {
      if (cover == 2) { return '封面' }
      if (cover == 1) { return '配图' }
      return '素材'
    },
    chooseColor (cover) {
      if (cover == 2) { return 'choose-color-2' }
      if (cover == 1) { return 'choose-color-1' }
      return ''
    },
    selectItem (item) {
      const { name } = item
      const index = this.selected.findIndex(x => x.name === name)
      if (index > -1) {
        this.selected.splice(index, 1)
      } else {
        this.selected.push(item)
      }
    },
    attachShow (name) {
      if (this.selected.findIndex(x => x.name === name) > -1) {
        return true
      } else {
        return false
      }
    },
    // 还原选择的封面图
    setImageList (images) {
      this.selected = images
    },
    // 获取需要向后台发送的图片数据
    getImageList () {
      const selectImages = this.selected
      // 封面
      const cover2 = selectImages.filter(x => x.cover === 2).map(x => { return { name: x.name, url: x.url, cover: x.cover } })
      // 配图
      const cover1 = selectImages.filter(x => x.cover === 1).map(x => { return { name: x.name, url: x.url, cover: x.cover } })
      // 素材
      const cover0 = selectImages.filter(x => x.cover === undefined).map(x => { return { name: x.name, url: x.url, cover: 0 } })
      return JSON.stringify(cover2.concat(cover1).concat(cover0))
    },
    async uploadImgByUrl () {
      const params = {
        url: 'media/image/url',
        payload: {
          url: this.imgUrl
        },
        auth: true
      }
      const result = await this.post(params)
      if (result.code === 1) {
        this.imgUrl = ''
        this.imgList()
      }
      console.log('看看结果')
      console.log(result)
    },

    timeS (time) {
      return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
    },

    uploadSuccess (evnet, file) {
      this.$Message.info('图片上传成功')
      // this.form.imgUrl = file.response.url
      this.imgList()
    },
    async imgList () {
      const params = {
        url: 'media/image/list',
        payload: {},
        auth: true
      }
      const result = await this.post(params)
      this.images = result
      console.log('看看result')
      console.log(result)
    },
    renderContent (h, { root, node, data }) {
      return h('span', {
        style: {
          display: 'inline-block',
          width: '100%'
        }
      }, [
        h('span', [
          h('Icon', {
            props: {
              type: 'ios-folder-outline'
            },
            style: {
              marginRight: '8px'
            }
          }),
          h('span', data.title)
        ]),
        h('span', {
          style: {
            display: 'inline-block',
            float: 'right',
            marginRight: '32px'
          }
        }, [
          h('Button', {
            props: Object.assign({}, this.buttonProps, {
              icon: 'ios-plus-empty'
            }),
            style: {
              marginRight: '8px'
            },
            on: {
              click: () => { this.append(data) }
            }
          }),
          h('Button', {
            props: Object.assign({}, this.buttonProps, {
              icon: 'ios-minus-empty'
            }),
            on: {
              click: () => { this.remove(root, node, data) }
            }
          })
        ])
      ])
    },
    append (data) {
      console.log('看看')
      console.log(data)
      const children = data.children || []
      children.push({
        title: 'appended node',
        expand: true
      })
      this.$set(data, 'children', children)
    },
    remove (root, node, data) {
      const parentKey = root.find(el => el === node).parent
      const parent = root.find(el => el.nodeKey === parentKey).node
      const index = parent.children.indexOf(data)
      parent.children.splice(index, 1)
    }
  }
}
</script>

<style lang="stylus" scoped>
.upload-card {
  .choose-img {
    width: 100%;

    .choose-item {
      float: left;
      height: 88px;
      width: 88px;
      position: relative;
      margin-right: 6px;
      margin-bottom: 6px;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        max-width: 100%;
        max-height: 100%;
      }

      .choose-title {
        position: absolute;
        bottom: 0px;
        background: rgba(0, 0, 0, 0.431);
        width: 100%;
        height: 22px;
        font-size: 12px;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .choose-color-2 {
        background: #f30000ed;
      }

      .choose-color-1 {
        background: #ff9800f0;
      }

      .choose-button {
        display: none;
      }

      &:hover {
        .choose-button {
          display: block;
          position: absolute;
          top: 0px;
          left: 0px;
          background: #000000b0;
          width: 100%;
          height: 66px;
          font-size: 12px;
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          .btn-i {
            cursor: pointer;
            height: 20px;
            display: flex;
            align-items: center;
          }
        }
      }
    }

    .add-item {
      height: 88px;
      width: 88px;
      float: left;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid grey;
    }
  }
}

.file-tree {
  height: 600px;
  background: #EEEEEE;
}

.file-img-list {
  height: 500px;
  width: 100%;

  li {
    list-style: none;
  }

  .img-item {
    position: relative;
    float: left;
    width: 105px;
    height: 105px + 20px;
    margin-right: 10px;
    margin-bottom: 6px;
    cursor: pointer;
    box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.3);

    .img-show {
      width: 105px;
      height: 105px;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        max-width: 100%;
        max-height: 100%;
      }
    }

    .img-box {
    }

    .img-meta {
      position: absolute;
      bottom: 20px;
      width: 100%;
      background: #0000006e;
      color: white;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .img-update {
      position: absolute;
      top: 0px;
      left: 0px;
      background: #0000006e;
      color: white;
      font-size: 12px;
      transform: scale(0.8);
      transform-origin: 0 0 0;
      width: 125%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .img-title {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      overflow: hidden;
      height: 20px;
    }

    .item-attach {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 2px solid #2781EE;

      span {
        z-index: 2;
        position: absolute;
        right: 0;
        top: 0;
        padding-right: 1px;
        color: white;

        &:before {
          position: absolute;
          display: block;
          content: ' ';
          right: 0;
          top: 0;
          border: 14px solid #07d;
          border-left-color: transparent;
          border-bottom-color: transparent;
          z-index: -1;
        }
      }
    }
  }
}

.fc {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
