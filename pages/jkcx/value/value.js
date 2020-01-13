// pages/yqcx/value/value.js
import $ from '../../../common/common.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    customer_id : 0,
    loan_id : 0,
    customer: [],
    loan: [],
    latitude: 1000,
    longitude: 1000,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      customer_id : options.customer_id,
      loan_id : options.loan_id,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    $.post(
      'index.php?m=wxapp&c=loan&a=findLoanInfo',
      {
        customer_id: this.data.customer_id,
        loan_id: this.data.loan_id,
      },
      function (res) {
        wx.showLoading({
          title: '正在加载，请稍后',
          success: function() {
            if (res.data.status == 1) {
              that.setData({
                customer: res.data.customer,
                loan: res.data.loan,
                longitude: res.data.latitude,
                latitude: res.data.longitude,
              });
            }
            wx.hideLoading()
          }
        })
        // if (res.data.status == 1) {
        //   that.setData({
        //     customer: res.data.customer,
        //     loan: res.data.loan,
        //     longitude: res.data.latitude,
        //     latitude: res.data.longitude,
        //   });
        // }
      }
    );
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  bindImage: function(e) {
    var loan_id = e.currentTarget.dataset.loan_id;
    console.log(loan_id);
    wx.navigateTo({
      url: '../image/image?loan_id=' + loan_id + '&customer_id=' + this.data.customer_id,
    })
  },

  bindPhone: function(e) {
    wx.makePhoneCall({
      phoneNumber: this.data.customer.phone,
    })
  },

  bindAddress: function(e) {
    console.log(this.data);
    if (this.data.latitude != 1000 || this.data.longitude != 1000) {
      wx.openLocation({
        latitude: this.data.latitude,
        longitude: this.data.longitude,
        scale: 12
      })
    }
  },

  bindCustomer: function(e) {
    var idcard = e.currentTarget.dataset.idcard;
    var address = e.currentTarget.dataset.address;
    wx.navigateTo({
      url: '../khxx/khxx?idcard=' + idcard + '&address=' + address + '&latitude=' + this.data.latitude + '&longitude=' + this.data.longitude,
    })
  },

  bindArrival: function (e) {
    var poundage = e.currentTarget.dataset.poundage;
    var bond = e.currentTarget.dataset.bond;
    wx.navigateTo({
      url: '../sjdz/sjdz?poundage=' + poundage + '&bond=' + bond,
    })
  },

  bindExptime: function (e) {
    var exp_time = e.currentTarget.dataset.exp_time;
    wx.navigateTo({
      url: '../dqsj/dqsj?exp_time=' + exp_time,
    })
  },

  bindCycle: function (e) {
    var cyc_interest = e.currentTarget.dataset.cyc_interest;
    var every_principal = e.currentTarget.dataset.every_principal;
    wx.navigateTo({
      url: '../mqhk/mqhk?cyc_interest=' + cyc_interest + '&every_principal=' + every_principal,
    })
  },

  bindExpend: function (e) {
    var arrival = e.currentTarget.dataset.arrival;
    var rebate = e.currentTarget.dataset.rebate;
    wx.navigateTo({
      url: '../sjzc/sjzc?arrival=' + arrival + '&rebate=' + rebate,
    })
  },

  bindStaff: function (e) {
    var loan_id = e.currentTarget.dataset.loan_id;
    wx.navigateTo({
      url: '../khjl/khjl?loan_id=' + loan_id,
    })
  },

  bindForeign: function (e) {
    var loan_id = e.currentTarget.dataset.loan_id;
    wx.navigateTo({
      url: '../wfjl/wfjl?loan_id=' + loan_id,
    })
  },

  bindRepay: function (e) {
    var loan_id = e.currentTarget.dataset.loan_id;
    wx.navigateTo({
      url: '../yhje/yhje?loan_id=' + loan_id,
    })
  },

  bindShouyi: function (e) {
    var loan_id = e.currentTarget.dataset.loan_id;
    wx.navigateTo({
      url: '../syqk/syqk?loan_id=' + loan_id,
    })
  }
})