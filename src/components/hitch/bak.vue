<template>
  <div>

    <TimelineItem color="red">
      <p class="time" style="color:red">
        <span>红包奖励</span>
        <span class="time-small">{{timeS(data.verify.create_at)}}</span>
      </p>
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
    <TimelineItem v-if="data.appeal.state===1 && this.role===4" color="#43A547">
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
      </div>
      <div class="submit-btn">
        <Button type="primary" @click="submitAppealReplay" style="background:#43A547;borderColor:#43A547">提交回复</Button>
      </div>
    </TimelineItem>
    <TimelineItem>
      <p class="time">结束</p>
    </TimelineItem>
  </div>
</template>
