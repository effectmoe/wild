// 追加する際は相談を！

import CryptoJS from 'crypto-js'
import { default as ipRangeCheck } from 'ip-range-check';

const configure = useRuntimeConfig().public

export const sha256 = function (argplaintxt: string) {
  return CryptoJS.enc.Hex.stringify(CryptoJS.SHA256(argplaintxt))
}

export const hmac256 = function (argplaintxt: string, argsalt: string) {
  return CryptoJS.HmacSHA256(argplaintxt, argsalt).toString()
}

export const encryptAESToUTF8Base64 = function (argplaintxt: string, argkey: string|null, argiv: string|null) {
  let key = <string>argkey
  let iv = <string>argiv
  if (true != ('string' == typeof argkey && 16 <= argkey.length)) {
    key = configure.AES_KEY
  }
  if (true != ('string' == typeof argiv && 16 <= argiv.length)) {
    iv = configure.AES_IV
  }
  console.log('key=', key)
  console.log('iv=', iv)
  const _key = CryptoJS.enc.Base64.parse(key)
  const _iv = CryptoJS.enc.Base64.parse(iv)
  const encryptdata = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(argplaintxt), _key, {iv: _iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
  return encryptdata.ciphertext.toString(CryptoJS.enc.Base64)
}

export const decryptAESFromUTF8Base64 = function (argencryptBase64Str: string, argkey: string|null, argiv: string|null) {
  let key = <string>argkey
  let iv = <string>argiv
  if (true != ('string' == typeof argkey && 16 <= argkey.length)) {
    key = configure.AES_KEY
  }
  if (true != ('string' == typeof argiv && 16 <= argiv.length)) {
    iv = configure.AES_IV
  }
  console.log('key=', key)
  console.log('iv=', iv)
  const _key = CryptoJS.enc.Base64.parse(key)
  const _iv = CryptoJS.enc.Base64.parse(iv)
  const encryptdata = CryptoJS.lib.CipherParams.create({ciphertext:CryptoJS.enc.Base64.parse(argencryptBase64Str)})
  const decryptdata = CryptoJS.AES.decrypt(encryptdata, _key, {iv: _iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
  return decryptdata.toString(CryptoJS.enc.Utf8)
}

export const heredoc = function (cb: any) {
  return cb.toString().split(/\n/).slice(1, -1).join('\n')
}

export const makeNonce = function(arglength: number) {
  if (!arglength || 'number' !== typeof arglength) {
    console.log('"number" !== typeof arglength')
    return false
  }
  let nonce = ''
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i=0; i < arglength; i++) {
    nonce += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  console.log('nonce=', nonce)
  return nonce
}

export const checkIP = async function (this: any) {
  const { data: result } = await useFetch('https://ifconfig.me/all.json')
  if (result && result.value) {
    const ipstr = <string>(<any>result.value).ip_addr
    console.log('ipstr=', ipstr)
    // const ips = Object.fromEntries(ipstr.trim().split('\n').map(line => line.split('=')))
    // console.log('ips=', ips)
    // if (ips.ip && ipRangeCheck(ips.ip, configure.allowips)) {
    if (ipstr && ipRangeCheck(ipstr, configure.allowips)) {
      console.log('ipRangeCheck ok')
      return true
    }
  }
  return false  
}

let ntpdatediff: number | null = null
export const getNTPDate = async function(): Promise<Date> {
  if (ntpdatediff) {
    const nowdaate = new Date(new Date().getTime() + ntpdatediff)
    console.log('nowdaate=', nowdaate)
    return nowdaate
  }
  const sendtime = new Date().getTime() / 1000
  const serverurl = 'https://worldtimeapi.org/api/timezone/Asia/Tokyo?' + sendtime
  try {
    const accessstarttime = new Date().getTime()
    const { data: result } = await useFetch(serverurl)
    const accessendtime = new Date().getTime()
    if (result && result.value) {
      const accesstime = accessendtime - accessstarttime
      console.log('ntp accesstime=', accesstime)
      const timeobj: any = result.value
      console.log('ntp result.value=', result.value)
      const sdate = new Date(timeobj.unixtime * 1000)
      console.log('sdate=', sdate)
      const nowdaate = new Date().getTime()
      ntpdatediff = (timeobj.unixtime * 1000) - nowdaate + accesstime
      console.log('ntpdatediff=', ntpdatediff)
      return sdate
    }
  }
  catch (error) {
    console.log('error=', error)
  }
  return new Date()
}
