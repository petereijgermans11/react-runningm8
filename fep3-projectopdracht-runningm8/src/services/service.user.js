export class UserService {
    constructor() {
        this.openUserDb()
    }

    openUserDb() {
        return new Promise((resolve, reject) => {
            const idbRequest = window.indexedDB.open("User", 1);
            idbRequest.onerror = (event) => {
                console.error('[UserDB ERROR]', event);
                reject('error');
            }
            idbRequest.onsuccess = (event) => {
                console.log('[UserDB onsuccess]');
                resolve(idbRequest.result);
            }
            idbRequest.onupgradeneeded = (event) => {
                console.log('[UserDB onupgradeneeded]');
                idbRequest.result.createObjectStore('userdata', {autoIncrement:true});
                resolve(idbRequest.result);
            }
        });
    }
    setUser({user}) {
        this.openUserDb()
            .then((db) => {
                const transaction = db.transaction(['userdata'], 'readwrite');
                transaction.oncomplete = (event) => { console.log('[setUser] Transaction completed'); }
                transaction.onerror = (event) => { console.error('[setUser] Transaction error', event); }

                const objectStore = transaction.objectStore('userdata');

                console.log(`[setUser] try to add ${user}`);
                const request = objectStore.add(user);
                request.onsuccess = () => {
                    console.log('[setUser] added succesvol');
                    db.close();
                }
            });
    }
    getUser() {
        let user;
        return new Promise((resolve, reject) => {
            console.log('[getUser] getting user');
            this.openUserDb()
                .then((db) => {
                    const transaction = db.transaction('userdata');
                    const objectStore = transaction.objectStore('userdata');
                    const request = objectStore.getAll();
                    request.onsuccess = (event) => {
                        user = event.target.result[0];
                        console.log(`[getUser]`, user);
                        db.close();
                        resolve(user);
                    }
                });
        });
    }
    saveUser({user}) {
        this.openUserDb()
            .then((db) => {

                const transaction = db.transaction(['userdata'], 'readwrite');
                transaction.oncomplete = (event) => { console.log('[saveUser] Transaction completed'); }
                transaction.onerror = (event) => { console.error('[saveUser] Transaction error', event); }

                const objectStore = transaction.objectStore('userdata');

                console.log(`[saveUser] try to add ${user}`);
                const request = objectStore.put(user, 1);
                request.onsuccess = () => {
                    console.log('[saveUser] saved succesvol');
                    db.close();
                }
            });
    }
}
