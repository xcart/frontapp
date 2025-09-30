/*
 * X-Payments Cloud SDK - Payment Widget
 */

const XPaymentsWidget = function () {
  this.jsApiVersion = '2.0'
  this.serverDomain = 'xpayments.com'
  this.messageNamespace = 'xpayments.widget.'
  this.receiverNamespace = 'xpayments.checkout.'
  this.widgetId = this.generateId()
  this.previousHeight = -1
  this.applePayData = {
    session: null,
    supportedNetworks: [],
    merchantCapabilities: [],
    merchantId: '',
  }
  this.googlePayData = {
    client: null,
    libUrl: 'https://pay.google.com/gp/p/js/pay.js',
    libLoaded: false,
    paymentMethods: {},
    merchantInfo: {},
    tokenizationSpecification: {},
  }
  this.paymentMethod = null

  this.config = {
    debug: false,
    account: '',
    widgetKey: '',
    container: '',
    form: '',
    language: '',
    customerId: '',
    tokenName: 'xpaymentsToken',
    showSaveCard: true,
    enableWallets: true,
    applePay: {
      enabled: false,
      shippingMethods: [],
      requiredShippingFields: [],
      requiredBillingFields: [],
    },
    googlePay: {
      enabled: false,
      shippingMethods: [],
      requiredShippingFields: [],
      requiredBillingFields: [],
    },
    walletMode: '',
    company: {
      name: '',
      domain: document.location.hostname,
      countryCode: '',
    },
    order: {
      tokenizeCard: false,
      total: -1,
      currency: '',
    },
  }

  this.handlers = {}

  this.bindedListener = false
  this.bindedSubmit = false
}

XPaymentsWidget.prototype.on = function (event, handler, context) {
  if ('undefined' === typeof context) {
    context = this
  }

  if ('formSubmit' !== event) {
    this.handlers[event] = handler.bind(context)
  } else {
    var formElm = this.getFormElm()

    if (formElm) {
      if (this.bindedSubmit) {
        formElm.removeEventListener('submit', this.bindedSubmit)
      }
      this.bindedSubmit = handler.bind(context)
      formElm.addEventListener('submit', this.bindedSubmit)
    }
  }

  return this
}

XPaymentsWidget.prototype.trigger = function (event, params) {
  var result = null

  if ('function' === typeof this.handlers[event]) {
    result = this.handlers[event](params)
  }

  this._log('X-Payments widget triggered: ' + event, params)

  return result
}

XPaymentsWidget.prototype.init = function (settings) {
  for (var key in settings) {
    if ('undefined' !== typeof this.config[key]) {
      if ('object' === typeof this.config[key]) {
        for (var subkey in settings[key]) {
          if ('undefined' !== typeof this.config[key][subkey]) {
            this.config[key][subkey] = settings[key][subkey]
          }
        }
      } else {
        this.config[key] = settings[key]
      }
    }
  }

  if (this.config.order.tokenizeCard) {
    this.config.showSaveCard = false
  }

  // Set default handlers
  this.on('formSubmit', function (domEvent) {
    // "this" here is the widget
    if (this.isValid()) {
      this.submit()
      domEvent.preventDefault()
    }
  })
    .on('success', this._defaultSuccessHandler)
    .on('applepay.paymentauthorized', this._applePayAuthorized)
    .on('applepay.buttonclick', function () {
      this.isValid() && this.submit()
    })
    .on('googlepay.paymentauthorized', this._googlePayAuthorized)
    .on('googlepay.buttonclick', function () {
      this.isValid() && this.submit()
    })
    .on('alert', function (params) {
      window.alert(params.message)
    })

  this.bindedListener = this.messageListener.bind(this)
  window.addEventListener('message', this.bindedListener)

  if ('undefined' !== typeof settings.autoload && settings.autoload) {
    this.load()
  }

  return this
}

XPaymentsWidget.prototype.generateId = function () {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  )
}

XPaymentsWidget.prototype.getIframeId = function () {
  return 'xpayments-' + this.widgetId
}

XPaymentsWidget.prototype.getIframeElm = function () {
  return document.getElementById(this.getIframeId())
}

XPaymentsWidget.prototype.getContainerElm = function () {
  return this.safeQuerySelector(this.config.container)
}

XPaymentsWidget.prototype.getFormElm = function () {
  return this.safeQuerySelector(this.config.form)
}

XPaymentsWidget.prototype.isValid = function () {
  return this.getIframeElm() && this.getFormElm()
}

XPaymentsWidget.prototype.safeQuerySelector = function (selector) {
  var elm = false
  if (selector) {
    elm = document.querySelector(selector)
  }
  return elm
}

XPaymentsWidget.prototype.loadAsyncJS = function (url, callback) {
  var script = document.createElement('script')
  script.type = 'text/javascript'
  script.async = true
  script.onload = callback
  script.src = url
  document.getElementsByTagName('head')[0].appendChild(script)
}

XPaymentsWidget.prototype.load = function () {
  var containerElm = this.getContainerElm()
  if (!containerElm) {
    return this
  }

  var elm = this.getIframeElm()
  if (!elm) {
    elm = document.createElement('iframe')
    elm.id = this.getIframeId()
    elm.style.width = '100%'
    elm.style.height = '0'
    elm.style.overflow = 'hidden'
    elm.style.border = 'none'
    if (this.config.walletMode) {
      elm.style.display = 'none'
    }
    elm.setAttribute('scrolling', 'no')
    containerElm.appendChild(elm)
  }

  var url =
    this.getServerUrl() +
    '/payment.php' +
    '?widget_key=' +
    encodeURIComponent(this.config.widgetKey) +
    '&widget_id=' +
    encodeURIComponent(this.widgetId) +
    '&shop=' +
    encodeURIComponent(this.config.company.domain) +
    '&api_version=' +
    encodeURIComponent(this.jsApiVersion)

  if (this.config.customerId) {
    url += '&customer_id=' + encodeURIComponent(this.config.customerId)
  }
  if (this.config.language) {
    url += '&language=' + encodeURIComponent(this.config.language)
  }
  if (this.config.walletMode) {
    url += '&target=wallet&mode=' + encodeURIComponent(this.config.walletMode)
  }
  elm.src = url

  if (this._isGooglePayEnabled()) {
    this.loadAsyncJS(
      this.googlePayData.libUrl,
      function () {
        this.googlePayData.libLoaded = true
      }.bind(this),
    )
  }

  return this
}

XPaymentsWidget.prototype.getServerHost = function () {
  return this.config.account + '.' + this.serverDomain
}

XPaymentsWidget.prototype.getServerUrl = function () {
  return 'https://' + this.getServerHost()
}

XPaymentsWidget.prototype.submit = function () {
  if (!this.config.walletMode) {
    this._sendEvent('submit')
  } else {
    switch (this.getPaymentMethod()) {
      case 'applePay':
        this.trigger('applepay.start')
        this._applePayStart()
        break
      case 'googlePay':
        this.trigger('googlepay.start')
        this._googlePayStart()
        break
    }
  }
}

XPaymentsWidget.prototype.beginCheckoutWithWallet = function () {
  this.submit()
}

XPaymentsWidget.prototype._afterLoad = function (params) {
  this.showSaveCard()
  if (this._isApplePayAvailable()) {
    this._sendEvent('applepay.enable')
  }
  if (this._isGooglePayEnabled()) {
    // Actual GPay availability can be checked only after loading
    this._sendGooglePayLoaded()
  }
  this.setOrder()
  this.resize(params.height)
}

XPaymentsWidget.prototype._defaultSuccessHandler = function (params) {
  var formElm = this.getFormElm()
  if (formElm) {
    var input = document.getElementById(this.config.tokenName)
    if (!input) {
      input = document.createElement('input')
      input.type = 'hidden'
      input.name = input.id = this.config.tokenName
      formElm.appendChild(input)
    }
    input.value = params.token
    formElm.submit()
  }
}

XPaymentsWidget.prototype.getPaymentMethod = function () {
  return this.config.walletMode || this.paymentMethod
}

XPaymentsWidget.prototype._paymentMethodChange = function (params) {
  this.paymentMethod = params.newId
}

XPaymentsWidget.prototype._applePayValidated = function (params) {
  try {
    this.applePayData.session.completeMerchantValidation(params.data)
  } catch (e) {}
}

XPaymentsWidget.prototype._applePayAuthorized = function (params) {
  this.succeedApplePayPayment(params)
}

XPaymentsWidget.prototype._applePayCompleted = function (params) {
  this.completeApplePayPayment({
    status: ApplePaySession.STATUS_SUCCESS,
    errors: [],
  })
}

XPaymentsWidget.prototype._applePayError = function (params) {
  try {
    this.applePayData.session.abort()
  } catch (e) {
    // Skip errors if any
  }
}

XPaymentsWidget.prototype._applePayStart = function () {
  if (!this.applePayData.merchantCapabilities.length) {
    this._sendEvent('applepay.cancel', {alert: true})
    return
  }

  var request = {
    countryCode: this.config.company.countryCode,
    currencyCode: this.config.order.currency,
    supportedNetworks: this.applePayData.supportedNetworks,
    merchantCapabilities: this.applePayData.merchantCapabilities,
    total: {
      label: this.config.company.name,
      amount: this.config.order.total,
    },
  }

  this.applePayCustomerAddress = null
  if (this.config.walletMode) {
    if (this.config.applePay.shippingMethods.length) {
      request.shippingMethods = this.config.applePay.shippingMethods
    }
    if (this.config.applePay.requiredShippingFields.length) {
      request.requiredShippingContactFields =
        this.config.applePay.requiredShippingFields
    }
    if (this.config.applePay.requiredBillingFields.length) {
      request.requiredBillingContactFields =
        this.config.applePay.requiredBillingFields
    }
  }

  this.applePayData.session = new ApplePaySession(3, request)

  this.applePayData.session.onvalidatemerchant = function (event) {
    this._sendEvent('applepay.validatemerchant', {
      validationURL: event.validationURL,
      displayName: this.config.company.name,
      context: this.config.company.domain,
    })
  }.bind(this)

  this.applePayData.session.onpaymentauthorized = function (event) {
    this.trigger('applepay.paymentauthorized', event.payment)
  }.bind(this)

  this.applePayData.session.oncancel = function (event) {
    var params = {}
    if ('undefined' !== typeof event.sessionError) {
      params.error = event.sessionError
    }
    this._sendEvent('applepay.cancel', params)
    this.trigger('applepay.cancel', params)
  }.bind(this)

  if (this.config.walletMode) {
    this.applePayData.session.onshippingcontactselected = function (event) {
      this.trigger('applepay.shippingcontactselected', event.shippingContact)
    }.bind(this)
    this.applePayData.session.onshippingmethodselected = function (event) {
      this.trigger('applepay.shippingmethodselected', event.shippingMethod)
    }.bind(this)
  }

  this.applePayData.session.begin()
}

XPaymentsWidget.prototype._parseApplePayNewTotal = function (updateData) {
  this.setOrder(updateData.newTotal.amount)
  if (
    'undefined' != typeof updateData.newTotal &&
    'undefined' == typeof updateData.newTotal.label
  ) {
    updateData.newTotal.label = this.config.company.name
  }
  return updateData
}

XPaymentsWidget.prototype.completeApplePayShippingContactSelection = function (
  updateData,
) {
  this.applePayData.session.completeShippingContactSelection(
    this._parseApplePayNewTotal(updateData),
  )
}

XPaymentsWidget.prototype.completeApplePayShippingMethodSelection = function (
  updateData,
) {
  this.applePayData.session.completeShippingMethodSelection(
    this._parseApplePayNewTotal(updateData),
  )
}

XPaymentsWidget.prototype.completeApplePayPayment = function (updateData) {
  this.applePayData.session.completePayment(updateData)
}

XPaymentsWidget.prototype.succeedApplePayPayment = function (payment) {
  this._sendEvent('applepay.paymentauthorized', {payment: payment})
}

XPaymentsWidget.prototype.isApplePaySupportedByDevice = function () {
  return window.ApplePaySession && ApplePaySession.canMakePayments()
}

XPaymentsWidget.prototype._isApplePayAvailable = function () {
  return (
    this.isApplePaySupportedByDevice() &&
    ((this.config.enableWallets && this.config.applePay.enabled) ||
      'applePay' === this.config.walletMode)
  )
}

XPaymentsWidget.prototype._checkApplePayActiveCard = function () {
  var promise = ApplePaySession.canMakePaymentsWithActiveCard(
    this.applePayData.merchantId,
  )
  promise.then(
    function (canMakePayments) {
      if (canMakePayments) {
        this.trigger('applepay.forceselect')
        this._sendEvent('applepay.select')
      }
    }.bind(this),
  )
}

XPaymentsWidget.prototype._applePayInit = function (params) {
  this.applePayData.supportedNetworks = params.supportedNetworks
  this.applePayData.merchantCapabilities = params.merchantCapabilities
  this.applePayData.merchantId = params.merchantId
  if (!this.config.walletMode) {
    this._checkApplePayActiveCard()
  }
}

XPaymentsWidget.prototype._isGooglePayEnabled = function () {
  return (
    (this.config.enableWallets && this.config.googlePay.enabled) ||
    'googlePay' === this.config.walletMode
  )
}

XPaymentsWidget.prototype._sendGooglePayLoaded = function () {
  var promise = new Promise(
    function (resolve, reject) {
      var counter = 0
      var checkReady = function () {
        counter++
        if (this.googlePayData.libLoaded) {
          resolve()
        } else if (counter < 300) {
          setTimeout(checkReady, 100)
        } else {
          this._log('Error! Failed to load Google Pay library.')
        }
      }.bind(this)
      checkReady()
    }.bind(this),
  )

  promise.then(
    function () {
      this._sendEvent('googlepay.loaded', {origin: this.config.company.domain})
    }.bind(this),
  )
}

XPaymentsWidget.prototype._googlePayPrepareBaseRequest = function () {
  var baseRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: this.googlePayData.paymentMethods,
  }

  return baseRequest
}

XPaymentsWidget.prototype._googlePayPrepareReadyToPay = function (
  existingRequired,
) {
  var request = {}
  if ('undefined' !== typeof existingRequired && existingRequired) {
    request.existingPaymentMethodRequired = existingRequired
  }

  return Object.assign({}, this._googlePayPrepareBaseRequest(), request)
}

XPaymentsWidget.prototype._googlePayPrepareLoadPayment = function (request) {
  var baseRequest = this._googlePayPrepareBaseRequest()

  for (var key in baseRequest.allowedPaymentMethods) {
    baseRequest.allowedPaymentMethods[key].tokenizationSpecification =
      this.googlePayData.tokenizationSpecification
    if (
      this.config.walletMode &&
      this.config.googlePay.requiredBillingFields.length
    ) {
      baseRequest.allowedPaymentMethods[
        key
      ].parameters.billingAddressRequired = true
      baseRequest.allowedPaymentMethods[
        key
      ].parameters.billingAddressParameters = {
        format:
          -1 !== this.config.googlePay.requiredBillingFields.indexOf('full')
            ? 'FULL'
            : 'MIN',
        phoneNumberRequired:
          -1 !== this.config.googlePay.requiredBillingFields.indexOf('phone'),
      }
    }
  }

  return Object.assign({}, baseRequest, request)
}

XPaymentsWidget.prototype._googlePayInit = function (params) {
  this.googlePayData.merchantInfo = {
    merchantName: this.config.company.name,
    merchantOrigin: this.config.company.domain,
    merchantId: params.businessId,
  }
  if (params.authJwt) {
    this.googlePayData.merchantInfo.authJwt = params.authJwt
  }

  this.googlePayData.tokenizationSpecification = {
    type: 'PAYMENT_GATEWAY',
    parameters: {
      gateway: params.gatewayId,
      gatewayMerchantId: params.merchantId,
    },
  }

  var options = {
    environment: params.environment,
    merchantInfo: this.googlePayData.merchantInfo,
    paymentDataCallbacks: {
      onPaymentAuthorized: function (paymentData) {
        return this.trigger('googlepay.paymentauthorized', paymentData, true)
      }.bind(this),
    },
  }

  if (
    this.config.walletMode &&
    this.config.googlePay.requiredShippingFields.length
  ) {
    options.paymentDataCallbacks.onPaymentDataChanged = function (
      intermediatePaymentData,
    ) {
      return this.trigger(
        'googlepay.paymentdatachanged',
        intermediatePaymentData,
      )
    }.bind(this)
  }

  this.googlePayData.client = new google.payments.api.PaymentsClient(options)

  this.googlePayData.paymentMethods = []
  for (var key in params.paymentMethods) {
    this.googlePayData.paymentMethods.push({
      type: params.paymentMethods[key],
      parameters: {
        allowedAuthMethods: params.authMethods,
        allowedCardNetworks: params.supportedNetworks,
      },
    })
  }

  var request = this._googlePayPrepareReadyToPay()

  this.googlePayData.client
    .isReadyToPay(request)
    .then(
      function (response) {
        if (response.result) {
          this._sendEvent('googlepay.enable')
          this.trigger('googlepay.ready')
        } else {
          this.trigger('googlepay.nonready')
        }
      }.bind(this),
    )
    .catch(
      function (err) {
        this._log(err)
      }.bind(this),
    )
}

XPaymentsWidget.prototype._googlePayStart = function (params) {
  if (!this.googlePayData.client) {
    this._sendEvent('googlepay.cancel', {alert: true})
    return
  }

  var request = {
    merchantInfo: this.googlePayData.merchantInfo,
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPrice: this.config.order.total.toString(),
      currencyCode: this.config.order.currency,
      countryCode: this.config.company.countryCode,
    },
    callbackIntents: ['PAYMENT_AUTHORIZATION'],
  }

  if (
    this.config.walletMode &&
    this.config.googlePay.requiredShippingFields.length
  ) {
    // We need to add displayItems because them won't show after finalization otherwise
    request.transactionInfo.displayItems = [
      {
        label: 'Subtotal',
        type: 'SUBTOTAL',
        price: this.config.order.total.toString(),
      },
    ]
    request.transactionInfo.totalPriceStatus = 'ESTIMATED'
    request.transactionInfo.totalPriceLabel = 'Total'

    request.callbackIntents.push('SHIPPING_ADDRESS')
    request.shippingAddressRequired = true
    request.shippingAddressParameters = {
      phoneNumberRequired:
        -1 !== this.config.googlePay.requiredShippingFields.indexOf('phone'),
    }
    request.emailRequired =
      -1 !== this.config.googlePay.requiredShippingFields.indexOf('email')

    if (this.config.googlePay.shippingMethods.length) {
      request.callbackIntents.push('SHIPPING_OPTION')
      request.shippingOptionRequired = true
    }
  }

  request = this._googlePayPrepareLoadPayment(request)

  this.googlePayData.client
    .loadPaymentData(request)
    .then(
      function (paymentData) {
        // Successful response parsed in googlepay.paymentauthorized
      }.bind(this),
    )
    .catch(
      function (err) {
        this._sendEvent('googlepay.cancel', {error: err})
        this.trigger('googlepay.cancel')
      }.bind(this),
    )
}

XPaymentsWidget.prototype._googlePayAuthorized = function (paymentData) {
  return new Promise(
    function (resolve, reject) {
      resolve(this.succeedGooglePayPayment(paymentData))
    }.bind(this),
  )
}

XPaymentsWidget.prototype._googlePayError = function (params) {
  // Do nothing
}

XPaymentsWidget.prototype.succeedGooglePayPayment = function (paymentData) {
  this._sendEvent('googlepay.paymentauthorized', {
    payment: paymentData.paymentMethodData,
  })
  return {transactionState: 'SUCCESS'}
}

XPaymentsWidget.prototype.isGooglePayInitialized = function (options) {
  return null !== this.googlePayData.client
}

XPaymentsWidget.prototype.createApplePayButton = function (options) {
  if (!this.isApplePaySupportedByDevice()) {
    console.error('Apple Pay is not supported by the device')
    return null
  }

  var buttonOptions = {
    onClick: function () {
      this.trigger('applepay.buttonclick')
    }.bind(this),
    wrapperClass: 'apple-pay-button-wrapper',
    buttonClass: 'apple-pay-button',
    buttonContent: '',
  }

  if ('undefined' !== typeof options) {
    buttonOptions = Object.assign({}, buttonOptions, options)
  }

  var wrapper = document.createElement('div')
  wrapper.className = buttonOptions.wrapperClass

  var button = document.createElement('button')
  button.className = buttonOptions.buttonClass
  button.type = 'button'
  button.innerHTML = buttonOptions.buttonContent
  button.addEventListener('click', buttonOptions.onClick)

  wrapper.appendChild(button)

  return wrapper
}

XPaymentsWidget.prototype.createGooglePayButton = function (options) {
  if (!this.isGooglePayInitialized()) {
    console.error('Google Pay not initalized')
    return null
  }

  var buttonOptions = {
    onClick: function () {
      this.trigger('googlepay.buttonclick')
    }.bind(this),
  }

  if ('undefined' !== typeof options) {
    buttonOptions = Object.assign({}, buttonOptions, options)
  }

  return this.googlePayData.client.createButton(buttonOptions)
}

XPaymentsWidget.prototype.setWalletMode = function (walletId) {
  this.config.walletMode = walletId
}

XPaymentsWidget.prototype.showSaveCard = function (value) {
  if ('undefined' === typeof value) {
    value = this.config.showSaveCard
  } else {
    this.config.showSaveCard = true === value
  }
  this._sendEvent('savecard', {show: value})
}

XPaymentsWidget.prototype.refresh = function () {
  this._sendEvent('refresh')
}

XPaymentsWidget.prototype.resize = function (height) {
  var elm = this.getIframeElm()
  if (elm) {
    this.previousHeight = elm.style.height
    elm.style.height = height + 'px'
  }
}

XPaymentsWidget.prototype.setOrder = function (total, currency) {
  if ('undefined' !== typeof total) {
    this.config.order.total = total
  }
  if ('undefined' !== typeof currency) {
    this.config.order.currency = currency
  }

  this._sendEvent('details', {
    tokenizeCard: this.config.order.tokenizeCard,
    total: this.config.order.total,
    currency: this.config.order.currency,
  })
}

XPaymentsWidget.prototype.destroy = function () {
  if (this.bindedListener) {
    window.removeEventListener('message', this.bindedListener)
  }

  var formElm = this.getFormElm()
  if (this.bindedSubmit && formElm) {
    formElm.removeEventListener('submit', this.bindedSubmit)
  }

  var containerElm = this.getContainerElm()
  if (containerElm) {
    var elm = this.getIframeElm()
    if (elm && containerElm.contains(elm)) {
      containerElm.removeChild(elm)
    }
  }
}

XPaymentsWidget.prototype.messageListener = function (event) {
  if (window.JSON) {
    var msg = false
    if (
      -1 !==
      this.getServerUrl().toLowerCase().indexOf(event.origin.toLowerCase())
    ) {
      try {
        msg = window.JSON.parse(event.data)
      } catch (e) {
        // Skip invalid messages
      }
    }

    if (
      msg &&
      msg.event &&
      0 === msg.event.indexOf(this.messageNamespace) &&
      (!msg.widgetId || msg.widgetId === this.widgetId)
    ) {
      this._log('Received from X-Payments: ' + msg.event, msg.params)

      var eventType = msg.event.substr(this.messageNamespace.length)

      if ('loaded' === eventType) {
        this._afterLoad(msg.params)
      } else if ('applepay.start' === eventType) {
        this._applePayStart(msg.params)
      } else if ('applepay.init' === eventType) {
        this._applePayInit(msg.params)
      } else if ('applepay.merchantvalidated' === eventType) {
        this._applePayValidated(msg.params)
      } else if ('applepay.completed' === eventType) {
        this._applePayCompleted(msg.params)
      } else if ('applepay.error' === eventType) {
        this._applePayError(msg.params)
      } else if ('googlepay.init' === eventType) {
        this._googlePayInit(msg.params)
      } else if ('googlepay.start' === eventType) {
        this._googlePayStart(msg.params)
      } else if ('googlepay.error' === eventType) {
        this._googlePayError(msg.params)
      } else if ('paymentmethod.change' === eventType) {
        this._paymentMethodChange(msg.params)
      } else if ('resize' === eventType) {
        this.resize(msg.params.height)
      } else if ('alert' === eventType) {
        msg.params.message =
          'string' === typeof msg.params.message
            ? msg.params.message.replace(/<\/?[^>]+>/gi, '')
            : ''
      }

      this.trigger(eventType, msg.params)
    }
  }
}

XPaymentsWidget.prototype._isDebugMode = function () {
  return this.config.debug
}

XPaymentsWidget.prototype._log = function (msg, params) {
  if (this._isDebugMode()) {
    console.groupCollapsed(msg)
    if ('undefined' !== typeof params) {
      console.log(JSON.stringify(params))
    }
    console.trace()
    console.groupEnd()
  }
}

XPaymentsWidget.prototype._sendEvent = function (eventName, eventParams) {
  if ('undefined' === typeof eventParams) {
    eventParams = {}
  }

  this._postMessage({
    event: this.receiverNamespace + eventName,
    params: eventParams,
  })
}

XPaymentsWidget.prototype._postMessage = function (message) {
  var elm = this.getIframeElm()
  if (window.postMessage && window.JSON && elm && elm.contentWindow) {
    this._log('Sent to X-Payments: ' + message.event, message.params)
    elm.contentWindow.postMessage(window.JSON.stringify(message), '*')
  } else {
    this._log("Error sending message - iframe wasn't initialized!")
  }
}

export default XPaymentsWidget
