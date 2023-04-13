export const auths = {
  'scope.userInfo': '用户信息', // 请用button获取该信息
  'scope.userLocation': '地理位置',
  'scope.userFuzzyLocation': '地理位置',
  'scope.userLocationBackground': '后台定位',
  'scope.address': '通讯地址',
  'scope.invoiceTitle': '发票抬头',
  'scope.invoice': '获取发票',
  'scope.werun': '微信运动步数',
  'scope.record': '录音功能',
  'scope.writePhotosAlbum': '保存到相册',
  'scope.camera': '摄像头'
}

/**
 * 申请某个权限
 * scope 权限名称
 * success 成功
 * fail 失败
 * denyBack 拒绝
 */
interface AuthorizeOptions {
  scope: string
  success?: (r?: any) => void
  fail?: () => void
  refuse?: () => void
}
export default (options: AuthorizeOptions) => {
  const { scope, success, fail, refuse } = options
  if (!scope) return

  // 判断权限状态
  uni.getSetting({
    success: getSettingRsp => {
      // @ts-ignore
      const currentScope = getSettingRsp.authSetting[scope]
      if ([undefined, null].includes(currentScope)) {
        // @ts-ignore
        console.log(`之前没有申请过${auths[scope]}权限, 开始申请`)
        uni.authorize({ scope, success, fail })
      } else if (currentScope === false) {
        uni.showModal({
          title: '权限申请',
          // @ts-ignore
          content: '点击 “确定” 按钮，打开 “' + auths[scope] + '” 的权限设置界面',
          cancelText: '取消',
          confirmText: '确定',
          success: action => {
            if (action.confirm) {
              uni.openSetting({
                success: openSettingRsp => openSettingRsp.authSetting[scope] && success && success(openSettingRsp),
                fail
              })
            } else {
              // @ts-ignore
              console.log(`拒绝了${auths[scope]}权限申请`)
              refuse && refuse()
            }
          }
        })
      } else {
        // @ts-ignore
        console.log(`${auths[scope]}权限已申请过`)
        success && success(getSettingRsp)
      }
    },
    fail
  })
}
