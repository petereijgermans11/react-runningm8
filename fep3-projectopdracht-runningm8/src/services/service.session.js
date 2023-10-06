export class SessionService {
    constructor() {
        this.openSessionDb()
    }

    openSessionDb() {
        return new Promise((resolve, reject) => {
            const idbRequest = window.indexedDB.open("Session", 1);
            idbRequest.onerror = (event) => {
                console.error('[SessionDB ERROR]', event);
                reject('error');
            }
            idbRequest.onsuccess = (event) => {
                console.log('[SessionDB onsuccess]');
                resolve(idbRequest.result);
            }
            idbRequest.onupgradeneeded = (event) => {
                console.log('[SessionDB onupgradeneeded]');
                idbRequest.result.createObjectStore('sessiondata', {autoIncrement:true});
                resolve(idbRequest.result);
            }
        });
    }
    setSessions() {
        this.openSessionDb()
            .then((db) => {
                const transaction = db.transaction(['sessiondata'], 'readwrite');
                transaction.oncomplete = (event) => { console.log('[setSession] Transaction completed'); }
                transaction.onerror = (event) => { console.error('[setSession] Transaction error', event); }

                const objectStore = transaction.objectStore('sessiondata');

                console.log(`[setSessions] creating new sessions array`);
                const request = objectStore.add([], 1 );
                request.onsuccess = () => {
                    console.log('[setSessions] creation succesvol');
                    db.close();
                }
            });
    }
    saveSessions({sessions}) {
        this.openSessionDb()
            .then((db) => {
                const transaction = db.transaction(['sessiondata'], 'readwrite');
                transaction.oncomplete = (event) => { console.log('[setSession] Transaction completed'); }
                transaction.onerror = (event) => { console.error('[setSession] Transaction error', event); }

                const objectStore = transaction.objectStore('sessiondata');

                console.log(`[setSessions] try to add ${sessions}`);
                const request = objectStore.put(sessions, 1);
                request.onsuccess = () => {
                    console.log('[setSessions] added succesvol');
                    db.close();
                }
            });
    }
    getSessions() {
        return new Promise((resolve, reject) => {
            console.log('[getUser] getting user');
            this.openSessionDb()
                .then((db) => {
                    const transaction = db.transaction('sessiondata');
                    const objectStore = transaction.objectStore('sessiondata');
                    const request = objectStore.getAll();
                    request.onsuccess = (event) => {
                        let sessions = event.target.result[0];
                        console.log(`[getSessions]`, sessions);
                        db.close();
                        resolve(sessions);
                    }
                });
        });
    }
}
