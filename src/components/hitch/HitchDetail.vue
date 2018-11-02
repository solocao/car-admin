<template>
  <div>
    <!-- data.state状态 -->
    <!-- -1拒审 -->
    <Timeline>
      <!-- 上报 -->
      <TimelineItem>
        <p class="time">
          <span>上报</span>
          <span class="time-small">{{timeS(data.hitch.create_at)}}</span></p>
        <div>
          <div style="marginTop:10px;"></div>
          <div style="height:260px">
            <tx-map ref="map"></tx-map>
          </div>
          <div class="z-m-item" style="marginTop:20px">
            <span class="z-title">标题:</span>
            <span>{{data.hitch.title}}</span>
          </div>
          <div class="z-m-item">
            <span class="z-title">问题描述:</span>
            <span>{{data.hitch.description}}</span>
          </div>
          <div class="z-m-item">
            <span class="z-title">地点描述:</span>
            <span>{{data.hitch.address}}</span>
          </div>
          <div class="z-m-item">
            <span class="z-title">现场佐证图片:</span>
            <vue-preview :slides="imgSlide(data.hitch.imgs)"></vue-preview>
          </div>
          <div class="two-50-percent">
            <div class="item">
              <span class="title" style="width:80px">联系人:</span>
              <span>{{data.hitch.username}}</span>
            </div>
            <div class="item">
              <span class="title">联系电话:</span>
              <span>{{data.hitch.mobile}}</span>
            </div>
          </div>
          <div class="two-50-percent">
            <div class="item">
              <span class="title">所属于项目部:</span>
              <span>{{data.hitch.departname}}</span>
            </div>
            <div class="item">
              <span class="title">检查类别:</span>
              <span>{{data.hitch.check_type}}</span>
            </div>
          </div>
          <div class="two-50-percent">
            <div class="item">
              <span class="title">问题发送至:</span>
              <span>{{data.hitch.toname}}</span>
            </div>
            <div class="item">
              <span class="title">安全类型:</span>
              <span>{{data.hitch.safe_type}}</span>
            </div>
          </div>
          </Row>
        </div>
        <div v-if="data.state===0">
          <hand-button :activeSwitch.sync="step1Refuse" title="上报拒审" des="不符合实情的上报、无需整改等"></hand-button>
          <div v-if="step1Refuse">
            <div class="z-mark" style="marginTop:20px">
              <span style="width:60px">拒审原因:</span>
              <Input v-model="step1Reason" placeholder="请输入拒审原因" style="marginLeft:10px;"></Input>
            </div>
            <div style="marginTop:10px">
              <span class="z-tag" @click="step1Reason='无效的问题'">无效的问题</span>
              <span class="z-tag" @click="step1Reason='此问题已经被处理'">此问题已经被处理</span>
              <span class="z-tag" @click="step1Reason='问题不属于本项目部'">问题不属于本项目部</span>
            </div>
            <div class="submit-btn">
              <Button type="primary" @click="hitchRefuse">确定提交</Button>
            </div>
          </div>
        </div>
      </TimelineItem>
      <!-- 整改 -->
      <TimelineItem v-if="data.state!==0">
        <p class="time">
          <span>整改</span>
          <span v-if="check!==false" class="time-small">{{timeS(check.create_at)}}</span>
          <span v-else class="time-small">{{timeS(data.hitch_refuse.create_at)}}</span>
        </p>
        <!-- 拒绝整改 -->
        <div v-if="data.state===-1">
          <div class="two-50-percent" style="marginTop:10px">
            <div class="item">
              <span class="title">整改状态:</span>
              <span>上报被拒审</span>
            </div>
            <div class="item">
              <span class="title">拒审人:</span>
              <span>{{data.hitch_refuse.username}}</span>
            </div>
          </div>
          <div class="z-m-item">
            <span class="z-title">拒审原因:</span>
            <span>{{data.hitch_refuse.reason}}</span>
          </div>
        </div>
        <!-- 等待安全管理员上传整改信息 -->
        <div v-if="data.state===0">
          <div class="two-50-percent" style="marginTop:10px">
            <div class="item">
              <span class="title">整改状态:</span>
              <span>等待安全生产员上传整改信息</span>
            </div>
            <div class="item">
            </div>
          </div>
        </div>
        <!-- 重新整改 -->
        <div v-if="data.state===-2" style="marginTop:10px;">
          <div class="two-50-percent">
            <div class="item">
              <span class="title">整改状态:</span>
              <span>上报问题要求重新整改</span>
            </div>
            <div class="item">
              <span class="title">审核管理员:</span>
              <span>{{check.refuse.username}}</span>
            </div>
          </div>
        </div>
        <!-- 整改记录提交 -->
        <div v-if="[-3,1,2,-2].includes(data.state)" style="marginTop:10px">
          <div class="two-50-percent">
            <div class="item">
              <span class="title">安全生产员:</span>
              <span>{{check.username}}</span>
            </div>
            <div class="item">
              <span class="title">联系电话:</span>
              <span>{{check.mobile}}</span>
            </div>
          </div>
          <div class="z-m-item">
            <span class="z-title">现场确认图片:</span>
            <vue-preview :slides="imgSlide(check.imgs)"></vue-preview>
          </div>
        </div>
      </TimelineItem>
      <!-- 整改审核 -->
      <TimelineItem v-if="[-3,2,1].includes(data.state)">
        <p class="time">
          <span>整改审核</span>
          <span class="time-small">{{timeS(data.verify.create_at)}}</span>
        </p>
        <!-- 审核不通过、直接显示 -->
        <div v-if="data.state===-3">
          <div class="two-50-percent" style="marginTop:10px">
            <div class="item">
              <span class="title">审核状态:</span>
              <span>管理员审核不通过</span>
            </div>
            <div class="item">
              <span class="title">审核人:</span>
              <span>{{data.verify.username}}</span>
            </div>
          </div>
          <div class="z-m-item">
            <span class="z-title">备注:</span>
            <span>{{data.verify.mark}}</span>
          </div>
        </div>
        <!-- 审核通过、直接显示 -->
        <div v-if="data.state===2" style="marginTop:10px">
          <div class="two-50-percent">
            <div class="item">
              <span class="title">审核状态:</span>
              <span>管理员审核审核通过</span>
            </div>
            <div class="item">
              <span class="title">审核人:</span>
              <span>{{data.verify.username}}</span>
            </div>
          </div>
          <div class="z-m-item">
            <span class="z-title">是否奖励:</span>
            <span>{{isReward?'同意奖励':'不奖励'}}</span>
          </div>
          <div class="z-m-item">
            <span class="z-title">备注:</span>
            <span>{{data.verify.mark}}</span>
          </div>
        </div>
        <div v-if="[1,2,3,4].includes(stepState)" style="marginTop:20px">等待安全生产员上传整改信息</div>
        <div v-if="[-11,-12,-13].includes(stepState)" style="marginTop:20px;color:#f44336">上报已被拒审</div>
        <div v-if="[-21,-22,-23].includes(stepState)" style="marginTop:20px;color:#3f51b5">上报问题重新整改中</div>
        <!-- 审核按钮 -->
        <div v-if="data.state===1">
          <div class="z-verify">
            <hand-button :activeSwitch.sync="step2Rectiy" title="重新整改" des="整改还有遗漏环节"></hand-button>
            <hand-button :activeSwitch.sync="step3Pass" title="通过审核" des="经过检查确认，整改达标" style="margin-left:20px"></hand-button>
            <hand-button :activeSwitch.sync="step3Refuse" title="审核不通过" des="整改不达标、不合格" style="margin-left:20px"></hand-button>
          </div>
          <!-- 重新整改 -->
          <div v-if="step2Rectiy">
            <div class="z-mark" style="marginTop:10px">
              <span style="width:60px">整改备注:</span>
              <Input v-model="step2Reason" placeholder="请输入需要重新整改的原因" style="marginLeft:10px;"></Input>
            </div>
            <div class="submit-btn">
              <Button type="primary" @click="checkRefuse">确定提交</Button>
            </div>
          </div>
          <!-- 通过审核 -->
          <div v-if="step3Pass">
            <div class="z-mark" style="marginTop:10px">
              <span style="width:100px">备注</span>
              <Input v-model="step3Mark" placeholder="请输入备注信息" style="marginLeft:20px;"></Input>
            </div>
            <div class="z-mark" style="marginTop:10px">
              <span style="width:100px">是否发放奖励</span>
              <RadioGroup v-model="isAgreeReward">
                <Radio label="同意发放,具体金额管理员确定"></Radio>
                <Radio label="不发放奖励"></Radio>
              </RadioGroup>
            </div>
            <div style="marginTop:20px">
              <Button type="primary" @click="hitchVerify">确定提交</Button>
            </div>
          </div>
          <!-- 审核不通过 -->
          <div v-if="step3Refuse" style="marginTop:10px">
            <div class="z-mark">
              <span style="width:30px">备注</span>
              <Input v-model="step3Mark" placeholder="请输入备注信息" style="marginLeft:20px;"></Input>
            </div>
            <div class="submit-btn">
              <Button type="primary" @click="hitchVerify">确定提交</Button>
            </div>
          </div>
        </div>
      </TimelineItem>
      <!-- 红包奖励 isReward 为true才给看 为false就不给看 -->
      <TimelineItem color="red" v-if="isReward">
        <p class="time" style="color:red">
          <span>红包奖励</span>
        </p>
        <div v-if="data.reward===undefined">
          <div class="z-mark" style="marginTop:10px">
            <span style="width:100px">奖励金额</span>
            <Input v-model="rewardMoney" placeholder="请输入或选择金额" style="marginLeft:0px;width:150px"></Input>
            <span class="z-choose-money" @click="rewardMoney=10">10元</span>
            <span class="z-choose-money" @click="rewardMoney=20">20元</span>
            <span class="z-choose-money" @click="rewardMoney=50">50元</span>
            <span class="z-choose-money" @click="rewardMoney=100">100元</span>
          </div>
          <div class="submit-btn">
            <Button type="primary" @click="hitchReward">确定奖励</Button>
          </div>
        </div>
        <div v-if="data.reward!==undefined" style="marginTop:10px">
          <div class="two-50-percent">
            <div class="item">
              <span class="title">发放状态:</span>
              <span>{{data.reward.checker===undefined?'未发放':'已发放'}}</span>
            </div>
            <div class="item">
              <span class="title">奖励金额:</span>
              <span>{{data.reward.money}}元</span>
            </div>
          </div>
          <div class="two-50-percent">
            <div class="item">
              <span class="title">奖励人:</span>
              <span>{{data.reward.username}}</span>
            </div>
            <div class="item">
              <span class="title">日期:</span>
              <span>{{timeS(data.reward.create_at)}}</span>
            </div>
          </div>
          <div v-if="data.reward.checker!==undefined" class="two-50-percent">
            <div class="item">
              <span class="title">发放人:</span>
              <span>{{data.reward.checkername}}</span>
            </div>
            <div class="item">
              <span class="title">日期:</span>
              <span>{{timeS(data.reward.check_at)}}</span>
            </div>
          </div>
        </div>
      </TimelineItem>
      <TimelineItem v-if="data.appeal.state!==0" color="#43A547">

        <p class="time" style="color:#43A547">
          <span>上报人申诉</span>
          <span class="time-small">{{timeS(data.appeal.create_at)}}</span>
        </p>
        <div>
          <div class="z-m-item">
            <span class="z-title">申诉状态:</span>
            <span>{{appealStateTxt(data.appeal.state)}}</span>
          </div>
          <div class="z-m-item">
            <span class="z-title">申诉原因:</span>
            <span>{{data.appeal.reason}}</span>
          </div>
        </div>
        <div class="z-m-item">
          <span class="z-title">申诉图片:</span>
          <vue-preview :slides="imgSlide(data.appeal.imgs)"></vue-preview>
        </div>
      </TimelineItem>
      <!-- 申诉回复 -->
      <TimelineItem v-if="data.appeal.state!==0 && this.role===4" color="#43A547">
        <p class="time" style="color:#43A547">
          <span>申诉回复</span>
          <span class="time-small">{{timeS(data.appeal.replay_at)}}</span>
        </p>
        <!-- 显示回复内容 -->
        <div v-if="data.appeal.state===2">
          <div class="z-m-item">
            <span class="z-title">管理员:</span>
            <span> {{data.appeal.replay_username}}</span>
          </div>
          <div class="z-m-item">
            <span class="z-title">回复内容:</span>
            <span> {{data.appeal.replay}}</span>
          </div>
        </div>
        <!-- 管理员进行回复 -->
        <div v-if="data.appeal.state===1">
          <div class="z-mark" style="marginTop:20px">
            <span style="width:60px">回复内容</span>
            <Input v-model="appealReplay" placeholder="处理关闭，请输入回复内容" style="marginLeft:20px;"></Input>
          </div>
          <div class="submit-btn">
            <Button type="primary" @click="submitAppealReplay" style="background:#43A547;borderColor:#43A547">提交回复</Button>
          </div>
        </div>

      </TimelineItem>
      <TimelineItem>
        <p class="time">结束</p>
      </TimelineItem>
    </Timeline>
  </div>
</template>
<script>
import TxMap from '@/components/TxMap.vue'
import HandButton from '@/components/hitch/HandButton.vue'
import { mapGetters } from 'vuex'
import { timeS } from '@/libs/help.js'
export default {
  components: {
    TxMap,
    HandButton
  },
  props: {
    data: {
      type: Object
    },
    hitchDrawer: {
      type: Boolean
    }
  },
  data() {
    return {
      page: 1,
      // 第一步拒审核
      step1Refuse: false,
      step1Reason: null,
      // 第二步重新整改
      step2Rectiy: false,
      // 第二部重新整改原因
      step2Reason: null,
      // 用于控制按钮显示的状态
      step3Pass: false,
      step3Refuse: false,
      //
      step3Mark: null,
      step3Money: 0,
      marker: null,
      appealReplay: null,
      isAgreeReward: null,
      rewardMoney: null
    }
  },
  computed: {
    ...mapGetters([
      'role'
    ]),

    stepState() {
      if (this.data.state > -1) {
        return this.data.state * 10 + this.role
      }
      return this.data.state * 10 - this.role
    },

    check() {
      if (this.data.check !== undefined && this.data.check !== null && this.data.check.length > 0) {
        const index = this.data.check.length
        return this.data.check[index - 1]
      }
      return false
    },
    // 是否进行红包奖励 true 奖励 false 不奖励
    isReward() {
      if (this.data.verify.reward === true) {
        return true
      } else {
        return false
      }
    }

  },

  methods: {
    timeS(time) {
      return timeS(time)
    },
    appealStateTxt(state) {
      if (state === 1) {
        return '待处理'
      }
      if (state === 2) {
        return '已处理'
      }
    },
    activeSwitch(target, state) {
      alert('asfasafa')
    },
    imgSlide(imgList) {
      if (imgList === undefined) {
        return []
      }
      const slide = imgList.map(x => {
        return {
          src: x.url,
          msrc: x.url,
          alt: 'picture1',
          title: 'Image Caption 1',
          w: 1200,
          h: 900
        }
      })
      return slide
    },
    // 设置坐标点
    setMarker() {
      // 遇到这种点，需要泯灭
      if (this.data.hitch.latitude == undefined || this.data.hitch.longitude == undefined) {
        if (this.marker !== null) {
          this.marker.setMap(null)
          this.marker = null
        }
      } else {
        const location = new qq.maps.LatLng(parseFloat(this.data.hitch.latitude), parseFloat(this.data.hitch.longitude))
        this.map.setCenter(location)
        if (this.marker == null) {
          this.marker = new qq.maps.Marker({
            map: this.map,
            position: location
          })
        } else {
          this.marker.setPosition(location)
        }
      }
    },
    // 拒绝上报的问题
    async hitchRefuse() {
      const params = {
        url: 'hitch/refuse',
        payload: {
          hitch_id: this.data._id,
          reason: this.step1Reason
        },
        auth: true
      }
      const result = await this.post(params)
      if (result.code === 1) {
        this.$emit('update:hitchDrawer', false)
      }
    },
    // 上报问题需要重新整改
    async checkRefuse() {
      const params = {
        url: 'hitch/check/refuse',
        payload: {
          hitch_id: this.data._id,
          reason: this.step2Reason
        },
        auth: true
      }
      const result = await this.post(params)
      if (result.code === 1) {
        this.$emit('update:hitchDrawer', false)
      }
    },
    // 通过或者不通过
    // state 2 通过 -3不通过
    async hitchVerify() {
      const params = {
        url: 'hitch/verify',
        payload: {
          hitch_id: this.data._id,
          mark: this.step3Mark,
          state: this.step3Pass ? 2 : -3
        },
        auth: true
      }

      // 如果审核通过,判断是否可以给奖励
      if (this.step3Pass) {
        params.payload.reward = this.isAgreeReward.length > 8
      }
      const result = await this.post(params)
      if (result.code === 1) {
        this.$emit('update:hitchDrawer', false)
      }
    },
    async  submitAppealReplay() {
      const params = {
        url: 'hitch/appeal/replay',
        payload: {
          hitch_id: this.data._id,
          replay: this.appealReplay
        },
        auth: true
      }
      const result = await this.post(params)
      if (result.code === 1) {
        this.$emit('update:hitchDrawer', false)
      }
      console.log(result)
    },
    // 管理员设置奖励金额
    async hitchReward() {
      const params = {
        url: 'hitch/reward',
        payload: {
          hitch_id: this.data._id,
          money: this.rewardMoney
        },
        auth: true
      }
      const result = await this.post(params)
      if (result.code === 1) {
        this.$emit('update:hitchDrawer', false)
      }
    }

  },
  beforeDestroy() {
    // alert('需要销毁的')
  },
  mounted() {

  },
  watch: {
    'data._id': {
      handler(curVal, oldVal) {
        setTimeout(() => { this.setMarker() }, 500)
      },
      immediate: true
      // deep: true
    },
    // 第二步,重新整改
    step2Rectiy(curVal, oldVal) {
      if (curVal === true) {
        this.step3Pass = false
        this.step3Refuse = false
      }
    },
    // 第三步,通过
    step3Pass(curVal, oldVal) {
      if (curVal === true) {
        this.step2Rectiy = false
        this.step3Refuse = false
      }
    },
    // 第三步,没有通过
    step3Refuse(curVal, oldVal) {
      if (curVal === true) {
        this.step2Rectiy = false
        this.step3Pass = false
      }
    }

  }
}
</script>

<style lang="less" scoped>
.z-verify {
  width: 100%;
  display: flex;
  margin-top: 10px;
}
.z-mark {
  display: flex;
  align-items: center;
  span {
    font-weight: bold;
  }
}

.z-choose {
  width: 160px;
  height: 50px;
  border: 1px solid #2781ee;
  border-radius: 4px;
  &:hover {
    background: #2781ee;
    color: white;
    cursor: pointer;
    .z-title {
      color: white;
    }
  }

  .z-title {
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 28px;
    color: #2781ee;
  }
  .z-desc {
    display: flex;
    justify-content: center;
  }
}

.z-tag {
  display: inline-block;
  height: 22px;
  line-height: 22px;
  margin: 2px 4px 2px 0;
  padding: 0 8px;
  border: 1px solid #e8eaec;
  border-radius: 3px;
  background: #f7f7f7;
  font-size: 12px;
  vertical-align: middle;
  opacity: 1;
  overflow: hidden;
  cursor: pointer;
}

.time {
  color: #2781ee;
  display: flex;
  justify-content: space-between;
  margin-top: -2px;
  .time-small {
    font-size: 12px;
  }
}

.z-state-tag0 {
  color: gray;
  background: #f6f6f6;
  padding: 2px 4px;
  border-radius: 3px;
  font-size: 12px;
  border: 1px solid #ebebeb;
}
.z-state-tag1 {
  color: white;
  background: #81c784;
  padding: 2px 4px;
  border-radius: 3px;
  font-size: 12px;
}
.two-50-percent {
  margin-bottom: 10px;
  display: flex;
  width: 100%;
  .item {
    display: flex;
    .title {
      display: block;
      width: 80px;
      font-weight: bold;
      margin-right: 4px;
    }
  }
}
.two-50-percent :first-child {
  width: 50%;
}
.two-50-percent :last-child {
  width: 50%;
}

.submit-btn {
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
}

.z-choose-money {
  display: flex;
  width: 60px;
  height: 28px;
  margin: 0px 5px;
  border: 1px solid #ff00009e;
  border-radius: 3px;
  justify-content: center;
  align-items: center;
  color: #ff00009e;
  cursor: pointer;
}
</style>
