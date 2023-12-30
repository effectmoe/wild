import { DocumentData } from 'firebase-admin/firestore';
import {
    getFirestore,
    collection,
    query,
    where,
    orderBy,
    limit,
    startAfter,
    getDocs,
    getCountFromServer,
    doc,
    getDoc,
    QueryFieldFilterConstraint,
    setDoc,
} from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';

interface fastfirestore {
    [x: string]: any;
}

export const fastfirestore = () => {
    const db = getFirestore()
    const me = useState<fastfirestore|null>('fastfirestore', () => null)
    const errors = <{[key: string]: any}>{}

    const getinstance = () => {
        if (null === me.value) {
            me.value = fastfirestore()
        }
        return me.value
    }

    const geterrorcode = (argerrorkey: string) => {
        if (errors[argerrorkey] && 'string' == typeof errors[argerrorkey].code) {
            return errors[argerrorkey].code
        }
        return null
    }

    const newuid = (argcollection: string) => {
        const uid = doc(collection(db, argcollection)).id
        return uid;
    }

    const get = async (argcollection: string, arguid: string) => {
        try {
            const snapshot = await getDoc(doc(db, argcollection, arguid));
            console.log('snapshot=', snapshot);
            if (snapshot.exists()) {
                return snapshot
            }
        }
        catch (error: any) {
            console.error(error);
            errors['get:' + argcollection + '/' + arguid] = error
            return false
        }
        return null
    }

    const gets = async (argcollection: string, argwheres: Array<Array<string>|null>, argorders: Array<Array<string>|null>, arglimit: number|null, argstartafter: DocumentData|null) => {
        let q = query(collection(db, argcollection))
        if (argwheres) {
            for (let widx=0; widx < argwheres.length; widx++) {
                if (argwheres[widx]![0] == 'or') {
                    q = query(q, <QueryFieldFilterConstraint><unknown>argwheres[widx]![1])
                }
                else {
                    switch (argwheres[widx]![1]) {
                        case '==':
                            q = query(q, where(argwheres[widx]![0], '==', argwheres[widx]![2]))
                            break;
                        case '<':
                            q = query(q, where(argwheres[widx]![0], '<', argwheres[widx]![2]))
                            break;
                        case '<=':
                            q = query(q, where(argwheres[widx]![0], '<=', argwheres[widx]![2]))
                            break;
                        case '>':
                            q = query(q, where(argwheres[widx]![0], '>', argwheres[widx]![2]))
                            break;
                        case '>=':
                            q = query(q, where(argwheres[widx]![0], '>=', argwheres[widx]![2]))
                            break;
                        case '!=':
                            q = query(q, where(argwheres[widx]![0], '!=', argwheres[widx]![2]))
                            break;
                        case 'array-contains':
                            q = query(q, where(argwheres[widx]![0], 'array-contains', argwheres[widx]![2]))
                            break;
                        case 'array-contains-any':
                            q = query(q, where(argwheres[widx]![0], 'array-contains-any', argwheres[widx]![2]))
                            break;
                        case 'in':
                            q = query(q, where(argwheres[widx]![0], 'in', argwheres[widx]![2]))
                            break;
                        case 'not-in':
                            q = query(q, where(argwheres[widx]![0], 'not-in', argwheres[widx]![2]))
                            break;
                    }
                }
            }
        }
        let tq = Object.assign({}, q)
        // limit offsetがある場合のクエリーパターン
        if (argorders && arglimit && argstartafter) {
            for (let oidx=0; oidx < argorders.length; oidx++) {
                switch (argorders[oidx]![1]) {
                    case 'asc':
                        q = query(q, orderBy(argorders[oidx]![0], 'asc'), startAfter(argstartafter), limit(arglimit))
                        break;
                    case 'desc':
                        q = query(q, orderBy(argorders[oidx]![0], 'desc'), startAfter(argstartafter), limit(arglimit))
                        break;
                    default :
                        q = query(q, orderBy(argorders[oidx]![0]), startAfter(argstartafter), limit(arglimit))
                        break;
                }
            }
        }
        else if (argorders && argstartafter) {
            for (let oidx=0; oidx < argorders.length; oidx++) {
                switch (argorders[oidx]![1]) {
                    case 'asc':
                        q = query(q, orderBy(argorders[oidx]![0], 'asc'), startAfter(argstartafter))
                        break;
                    case 'desc':
                        q = query(q, orderBy(argorders[oidx]![0], 'desc'), startAfter(argstartafter))
                        break;
                    default :
                        q = query(q, orderBy(argorders[oidx]![0]), startAfter(argstartafter))
                        break;
                }
            }
        }
        else if (argorders && arglimit) {
            for (let oidx=0; oidx < argorders.length; oidx++) {
                switch (argorders[oidx]![1]) {
                    case 'asc':
                        q = query(q, orderBy(argorders[oidx]![0], 'asc'), limit(arglimit))
                        break;
                    case 'desc':
                        q = query(q, orderBy(argorders[oidx]![0], 'desc'), limit(arglimit))
                        break;
                    default :
                        q = query(q, orderBy(argorders[oidx]![0]), limit(arglimit))
                        break;
                }
            }
        }
        else if (argorders) {
            for (let oidx=0; oidx < argorders.length; oidx++) {
                switch (argorders[oidx]![1]) {
                    case 'asc':
                        q = query(q, orderBy(argorders[oidx]![0], 'asc'))
                        break;
                    case 'desc':
                        q = query(q, orderBy(argorders[oidx]![0], 'desc'))
                        break;
                    default :
                        q = query(q, orderBy(argorders[oidx]![0]))
                        break;
                }
            }
        }
        console.log('q=', q)
        const snapshots = await getDocs(q)
        console.log('snapshots=', snapshots)
        if (0 < snapshots.docs.length) {
            const totalCount = await getCountFromServer(tq)
            if (totalCount && totalCount.data()) {
                return { total: totalCount.data().count, docs: snapshots.docs }
            }
        }
        return [null, null]
    }

    const set = async (argcollection: string, argdata: any) => {
        try {
            console.log('argdata=', argdata)
            let uid = '';
            if (argdata.uid) {
                uid = argdata.uid;
            }
            else {
                uid = newuid(argcollection)
                console.log('newuid=', uid)
                argdata.uid = uid;
            }
            await setDoc(doc(db, argcollection, uid), argdata, { merge: true })
            return true
        }
        catch (error: any) {
            errors['set:' + argcollection] = error
            return false
        }
    }

    const sets = async (argcollection: string, argdatas: Array<any>) => {
    }

    const upload = async (argfile: File, argsavepath: string, argshowprogress: Function|null) => {
        const uploadTask = uploadBytesResumable(ref(getStorage(), argsavepath), argfile);
        return await new Promise(function (resolve, reject) {
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    if ('function' == typeof argshowprogress) {
                        argshowprogress(progress, snapshot);
                    }
                    // switch (snapshot.state) {
                    //     case 'paused':
                    //     console.log('Upload is paused');
                    //     break;
                    //     case 'running':
                    //     console.log('Upload is running');
                    //     break;
                    // }
                },
                (error) => {
                    console.log('upload error=', error);
                    resolve(false);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        resolve(downloadURL);
                    });
                }
            );
        });
    }

    return {
        getinstance,
        errors,
        geterrorcode,
        newuid,
        get,
        gets,
        set,
        sets,
        upload,
    }
}

