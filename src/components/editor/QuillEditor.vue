<template>
  <div>
    <quill-editor v-model="content" ref="myQuillEditor" :options="editorOption" @ready="onEditorReady($event)">
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
  components: {
    quillEditor
  },
  data () {
    return {
      content: '',
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
          toolbar: {
            container: container,
            handlers: {
              'image': function () {
                console.log(this.quill.id)
                QuillWatch.emit(this.quill.id)
              }
            }
          }
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
      console.log('editor change!', quill, html, text)
      this.content = html
    }
  }

}
</script>
