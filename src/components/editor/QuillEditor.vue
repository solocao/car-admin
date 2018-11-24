<template>
  <div style="height:350px">
    <quill-editor ref="myQuillEditor" style="height:300px" :options="editorOption" @ready="onEditorReady($event)" @change="onEditorChange">
      <div id="toolbar" slot="toolbar">
        <!-- Add a bold button -->
        <button class="ql-bold">Bold</button>
        <button class="ql-italic">Italic</button>
        <!-- Add font size dropdown -->
        <select class="ql-size">
          <option value="small"></option>
          <!-- Note a missing, thus falsy value, is used to reset to default -->
          <option selected></option>
          <option value="large"></option>
          <option value="huge"></option>
        </select>
        <select class="ql-font">
          <option selected="selected"></option>
          <option value="serif"></option>
          <option value="monospace"></option>
        </select>
      </div>

    </quill-editor>
  </div>
</template>
<script>
import { quillEditor, Quill } from 'vue-quill-editor'
import { container, ImageExtend, QuillWatch } from 'quill-image-extend-module'
import ImageResize from 'quill-image-resize-module'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Quill.register('modules/ImageExtend', ImageExtend)
Quill.register('modules/imageResize', ImageResize)

export default {
  props: {
    content: {
      type: String
    }
  },
  components: {
    quillEditor
  },
  data () {
    return {
      editorOption: {
        modules: {
          imageResize: true,
          ImageExtend: {
            loading: true,
            // 单位为M, 1M = 1024KB
            size: 2,
            name: 'img',
            action: 'http://0.0.0.0:8081/ali-oss/img',
            response: (res) => {
              return res.info
            }
          },
          toolbar: '#toolbar'
        }
      }

    }
  },
  methods: {
    onEditorBlur (quill) {
      console.log('editor blur!', quill)
    },
    onEditorFocus (quill) {
      console.log('editor focus!', quill)
    },
    onEditorReady (quill) {
      console.log('editor ready!', quill)
    },
    onEditorChange ({ quill, html, text }) {
      this.$emit('update:content', html)
    }
  }

}
</script>

<style lang="less" scoped>
.ql-container {
  min-height: 300px !important;
}
</style>
