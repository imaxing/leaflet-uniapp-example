import i18n from '@/local'

// ios 环境判断
export const isIos = uni.getSystemInfoSync().platform === 'ios'

// 国际化转换
export const t = (key: string, options?: any) => i18n.t(key, options)

/**
 * 封装$loading
 * @param v
 * @returns
 */
export const customLoading = (v: string) => {
  uni.showLoading({ title: v || '加载中', mask: true })
  return uni.hideLoading
}

/**
 * $confirm
 * 封装确认框, 处理按钮位置
 * @param options
 */
export const customConfirm = (options: any) => {
  const { onOk, onCancel } = options || {}

  options.title = options.title || '提示'

  // #ifdef APP-PLUS
  if (!isIos) {
    const cancelText = options.cancelText || '取消'
    options.cancelText = options.confirmText || '确认'
    options.confirmText = cancelText
  }
  // #endif

  uni.showModal({
    ...options,
    success: ({ confirm }) => {
      if (!isIos) {
        !confirm ? onOk?.() : onCancel?.()
      } else {
        confirm ? onOk?.() : onCancel?.()
      }
    }
  })
}
