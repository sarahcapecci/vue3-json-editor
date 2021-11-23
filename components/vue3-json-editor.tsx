import { ComponentPublicInstance, defineComponent, getCurrentInstance, onMounted, reactive, watch } from 'vue'
import JsonEditor from './assets/jsoneditor'
import './assets/jsoneditor.css'
import './style.css'

export const Vue3JsonEditor = defineComponent({
  props: {
    modelValue: [String, Boolean, Object, Array],
    showBtns: [Boolean],
    expandedOnStart: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'tree'
    },
    modes: {
      type: Array,
      default: function () {
        return ['tree', 'code', 'form', 'text', 'view']
      }
    },
    lang: {
      type: String,
      default: 'en'
    }
  },
  setup (props: any, { emit }) {
    const root = getCurrentInstance()?.root.proxy as ComponentPublicInstance

    const state = reactive({
      editor: null as any,
      error: false,
      json: {},
      internalChange: false,
      expandedModes: ['tree', 'view', 'form'],
      locale: {
        it: {
          save: 'SALVA'
        },
        en: {
          save: 'SAVE'
        },
        zh: {
          save: '保存'
        }
      }
    })
    watch(
      () => props.modelValue as unknown as any,
      async (val) => {
        if (!state.internalChange) {
          state.json = val
          await setEditor(val)
          state.error = false
          expandAll()
        }
      }, { immediate: true })

    onMounted(() => {
      const options = {
        mode: props.mode,
        modes: props.modes,
        onChange () {
          try {
            const json = state.editor.get()
            state.json = json
            state.error = false
            emit('json-change', json)
            state.internalChange = true
            emit('input', json)
            root.$nextTick(function () {
              state.internalChange = false
            })
          } catch (e) {
            state.error = true
            emit('has-error', e)
          }
        },
        onModeChange () {
          expandAll()
        }
      }
      const uid = getCurrentInstance().uid;
      state.editor = new JsonEditor(
        document.querySelector('.jsoneditor-vue' + uid),
        options,
        state.json
      )
    })

    function expandAll () {
      console.log(state.editor.getMode())
      if (props.expandedOnStart && state.expandedModes.includes(state.editor.getMode())) {
        (state.editor as any).expandAll()
      }
    }

    function onSave () {
      emit('json-save', state.json)
    }

    function setEditor (value: any): void {
      if (state.editor) state.editor.set(value)
    }

    return () => {
      return (
        <div>
          <div class={'jsoneditor-vue'}></div>
          {props.showBtns !== false && (
            <div class={'jsoneditor-btns'}>
              <button
                class={'json-save-btn'}
                type={'button'}
                onClick={() => {
                  onSave()
                }}
                disabled={state.error}
              >{state.locale[props.lang].save}</button>
            </div>
          )}
        </div>
      )
    }
  }
})
