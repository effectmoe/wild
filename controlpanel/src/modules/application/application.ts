// ここは自由に追加・編集OK

import { getFirestore, DocumentData, collection, getDocs, Firestore, writeBatch, DocumentReference, doc, Timestamp, serverTimestamp, connectFirestoreEmulator, getDoc } from 'firebase/firestore'
import { decryptAESFromUTF8Base64 } from './utilities'
import { FormOption } from '~/modules/application/interfaces'

export const formatFirestoreDoc = function(argdoc: DocumentData, argkey: string) {
  if (argdoc) {
    const data = argdoc.data()
    if (argdoc && data && data[argkey]) {
      console.log('data[argkey]=', data[argkey])
      if (argkey == 'uid') {
        argdoc.uid = data[argkey]
      }
      else if (argkey == 'email') {
        const email = decryptAESFromUTF8Base64(data[argkey], null, null)
        if (email) {
          return email
        }
      }
      else if (data[argkey] instanceof Array) {
        return data[argkey].join('\n')
      }
      else if ('function' == typeof data[argkey].toDate) {
        return data[argkey].toDate().toLocaleTimeString('ja-JP', {year: 'numeric', month: '2-digit', day: '2-digit',})
      }
      return data[argkey]
    }
    else if (0 === data[argkey]) {
      return data[argkey]
    }
  }
  return ''
}

export const getDocRef = function(target: string, uid: string | null) {
  const result = (null === uid) ? null : doc(collection(getFirestore(), target), uid)
  return result
}


export const convertToFormOption = function (argdata: any) {
  return {
    value: argdata.uid || argdata.id,
    label: argdata.name,
    rank: argdata.rank,
  }
}

export const fetchTagOptions = async function fetchTagOptions(argcategory: string): Promise<FormOption[]> {
  const tags = await fastfirestore().getinstance().gets('tags', [['available', '==', true], ['category', '==', argcategory]], [['rank', 'desc']])
  if (!tags.total) {
    return []
  }
  return tags.docs.map((doc: DocumentData) => {
    return convertToFormOption(doc.data())
  });
}
