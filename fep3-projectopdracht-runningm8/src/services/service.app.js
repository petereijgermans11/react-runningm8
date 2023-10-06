export class AppService {
    constructor() {
        this.openAppDb()
    }

    openAppDb() {
        return new Promise((resolve, reject) => {
            const idbRequest = window.indexedDB.open("App", 1);
            idbRequest.onerror = (event) => {
                console.error('[AppDB ERROR]', event);
                reject('error');
            }
            idbRequest.onsuccess = (event) => {
                console.log('[AppDB onsuccess]');
                resolve(idbRequest.result);
            }
            idbRequest.onupgradeneeded = (event) => {
                console.log('[AppDB onupgradeneeded]');
                idbRequest.result.createObjectStore('appdata', {autoIncrement:true});
                resolve(idbRequest.result);
            }
        });
    }
    setApp({settings}) {
        this.openAppDb()
            .then((db) => {
                const transaction = db.transaction(['appdata'], 'readwrite');
                transaction.oncomplete = (event) => { console.log('[setApp] Transaction completed'); }
                transaction.onerror = (event) => { console.error('[setApp] Transaction error', event); }

                const objectStore = transaction.objectStore('appdata');

                console.log(`[setApp] try to add ${settings}`);
                const request = objectStore.add(settings);
                request.onsuccess = () => {
                    console.log('[setApp] added succesvol');
                    db.close();
                }
            });
    }
    getApp() {
        let app;
        return new Promise((resolve, reject) => {
            console.log('[getApp] getting user');
            this.openAppDb()
                .then((db) => {
                    const transaction = db.transaction('appdata');
                    const objectStore = transaction.objectStore('appdata');
                    const request = objectStore.getAll();
                    request.onsuccess = (event) => {
                        app = event.target.result[0];
                        console.log(`[getUser]`, app);
                        db.close();
                        resolve(app);
                    }
                });
        });
    }
    saveApp({settings}) {
        this.openAppDb()
            .then((db) => {

                const transaction = db.transaction(['appdata'], 'readwrite');
                transaction.oncomplete = (event) => { console.log('[saveApp] Transaction completed'); }
                transaction.onerror = (event) => { console.error('[saveApp] Transaction error', event); }

                const objectStore = transaction.objectStore('appdata');

                console.log(`[saveApp] try to add ${settings}`);
                const request = objectStore.put(settings, 1);
                request.onsuccess = () => {
                    console.log('[saveApp] saved succesvol');
                    db.close();
                }
            });
    }
}
