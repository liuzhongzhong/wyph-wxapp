//index.js
import $ from '../../common/common.js';
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    is_admin: 0,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    companyInfo:{
      'title': '万赢鹏辉企业管理',
      'subtitle': 'WUXI WANYING PENGHUI INVESTMENT CO. LTD',
      'content': '万赢鹏辉企业管理是对企业生产经营活动进行计划、组织、指挥、协调和控制等一系列活动，尽可能利用企业的人力、物力、财力、信息等资源，实现多、快、好、省的目标，取得最大的投入产出效率。',
      'location': '无锡市梁溪区华光大厦6楼',
      'date': '周一 至 周六 9:00—18:00',
      'phone': '18261525818  15895351351',
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow: function() {
    var that = this;
    $.post(
      'index.php?m=wxapp&c=login&a=checkPermissions',
      {
        sessionKey: wx.getStorageSync('sessionKey'),
      },
      function (res) {
        console.log(res.data);
        that.setData({
          companyInfo: res.data.companyInfo,
        });
        if(res.data.status == 1) {
          that.setData({
            is_admin : 1,
            companyInfo: res.data.companyInfo,
          });
        }
      }
    );
  },

  getUserInfo: function(e) {
    if (e.detail.userInfo && this.data.hasUserInfo != true) {
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      var user = this.data.userInfo;
      this.uploadUserInfo();
    }
  },

  uploadUserInfo: function () {
    var userInfo = this.data.userInfo;
    $.post(
      'index.php?m=wxapp&c=login&a=saveUserInfo',
      {
        sessionKey: JSON.stringify(wx.getStorageSync('sessionKey')),
        userInfo: JSON.stringify(userInfo)
      },
      function (res) {
        console.log(res.data);
      }
    );
  },

  bindAdmin: function () {
    this.uploadUserInfo();
    wx.navigateTo({
      url: '../main/main'
    })
  },

  /**
 * 页面上拉触底事件的处理函数
 */
  onPullDownRefresh: function () {
    var that = this;
    $.post(
      'index.php?m=wxapp&c=login&a=checkPermissions',
      {
        sessionKey: wx.getStorageSync('sessionKey'),
      },
      function (res) {
        console.log(res.data);
        if (res.data.status != 0) {
          that.setData({
            is_admin: res.data.status,
          });
        }else {
          that.setData({
            is_admin: 0,
          });
        }
      }
    );
  },

})
