import {
    getAuth,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    User,
    createUserWithEmailAndPassword
} from 'firebase/auth'
const configure = useRuntimeConfig().public;

export const fastfireauth = () => {
    const token = useState<string|null>('token', () => null)
    const role = useState<number>('role', () => 0)
    const authorizeduser = useState<User|null>('authorizeduser', () => null)
    const autherror = useState<any|null>('autherror', () => null)
    const onAuthStateChangedCallback = useState<Function|null>('onAuthStateChangedCallback', () => null)

    function setRole(argrole: number) {
        role.value = argrole
    }

    async function createWithEmailAndPass(argemail: string, argpassword: string) {
        console.log('argemail=', argemail);
        const auth = getAuth()
        let res = null;
        await createUserWithEmailAndPassword(auth, argemail, argpassword)
        .then((userCredential) => {
          console.log('user created');
          console.log(userCredential)
          res = userCredential.user.uid;
        })
        .catch((error) => {
          alert(error.message)
          console.error(error)
        }); 
        return res;
    }

    async function signin(argemail: string, argpassword: string) {
        return await new Promise<boolean>((resolve, reject) => {
            const auth = getAuth()
            return signInWithEmailAndPassword(auth, argemail, argpassword)
            .then((userCredential) => {
                userCredential.user
                .getIdToken()
                .then((idToken) => {
                    token.value = idToken
                    authorizeduser.value = userCredential.user
                    resolve(true)
                })
                .catch((error) => {
                    autherror.value = error
                    resolve(false)
                })
            })
            .catch((error) => {
                autherror.value = error
                resolve(false)
        })
        })
    }
  
    async function signout() {
        return await new Promise<boolean>((resolve, reject) => {
            const auth = getAuth()
            firebaseSignOut(auth)
            .then(() => {
                token.value = null
                resolve(true)
            })
            .catch((error) => {
                autherror.value = error
                resolve(false)
            })
        })
    }
  
    async function checkAuthState() {
        return await new Promise<void>((resolve, reject) => {
            // client only
            if (process.server) return resolve()
            const auth = getAuth()
            onAuthStateChanged(
                auth,
                (user) => {
                    if (user) {
                        user.getIdTokenResult()
                        .then((result) => {
                            console.log('is result=', result)
                            if (!(token && token.value)) {
                                token.value = result.token
                                console.log('user.uid=', user.uid)
                                if (-1 < configure.superuseruids.indexOf(user.uid)) {
                                    // スーパーユーザー
                                    role.value = 999
                                }
                                else if (typeof result.claims.role == 'number' && 0 < result.claims.role) {
                                    role.value = result.claims.role
                                }
                                console.log('role=', role.value)
                                authorizeduser.value = user
                            }
                            if ('function' == typeof onAuthStateChangedCallback.value) {
                                onAuthStateChangedCallback.value(true)
                            }
                            resolve()
                        })
                        .catch(reject)
                    }
                    else {
                        if ('function' == typeof onAuthStateChangedCallback.value) {
                            onAuthStateChangedCallback.value(false)
                        }
                        token.value = null
                        resolve()
                    }
                },
                (error) => {
                    console.log('error=', error)
                    autherror.value = error
                    if ('function' == typeof onAuthStateChangedCallback.value) {
                        onAuthStateChangedCallback.value(false)
                    }
                    reject(error)
                }
            )
        })
    }
  
    return {
        setRole,
        createWithEmailAndPass,
        signin,
        signout,
        token,
        role,
        autherror,
        authorizeduser,
        onAuthStateChangedCallback,
        checkAuthState,
    }
};
