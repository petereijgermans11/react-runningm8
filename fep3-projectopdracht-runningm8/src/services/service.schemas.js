export class SchemaService {
    constructor() {
        this.openSchemasDb()
    }

    openSchemasDb() {
        return new Promise((resolve, reject) => {
            const idbRequest = window.indexedDB.open("Schemas", 1);
            idbRequest.onerror = (event) => {
                console.error('[SchemasDB ERROR]', event);
                reject('error');
            }
            idbRequest.onsuccess = (event) => {
                console.log('[SchemasDB onsuccess]');
                resolve(idbRequest.result);
            }
            idbRequest.onupgradeneeded = (event) => {
                console.log('[SchemasDB onupgradeneeded]');
                idbRequest.result.createObjectStore('schemasdata', {autoIncrement:true});
                idbRequest.result.createObjectStore('othersschemasdata', {autoIncrement:true});
                resolve(idbRequest.result);
            }
        });
    }
    setSchemas() {
        this.openSchemasDb()
            .then((db) => {
                const transaction = db.transaction(['schemasdata'], 'readwrite');
                const transaction2 = db.transaction(['othersschemasdata'], 'readwrite');
                transaction.oncomplete = (event) => { console.log('[setSchemas] Transaction completed'); }
                transaction.onerror = (event) => { console.error('[setSchemas] Transaction error', event); }
                transaction2.oncomplete = (event) => { console.log('[setSchemas] Transaction completed'); }
                transaction2.onerror = (event) => { console.error('[setSchemas] Transaction error', event); }

                const objectStore = transaction.objectStore('schemasdata');
                console.log(`[setSchemas] creating new schemas array`);
                const request = objectStore.add([], 1 );
                request.onsuccess = () => {
                    console.log('[setSchemas] creation succesfull');
                }
                const objectStore2 = transaction2.objectStore('othersschemasdata');
                console.log(`[setSchemas] creating new others schemas array`);
                const request2 = objectStore2.add([], 2 );
                request2.onsuccess = () => {
                    console.log('[setSchemas] creation succesfull');
                }
                db.close();
            });
    }
    saveSchemas({schemas}) {
        this.openSchemasDb()
            .then((db) => {
                const transaction = db.transaction(['schemasdata'], 'readwrite');
                transaction.oncomplete = (event) => { console.log('[setSchemas] Transaction completed'); }
                transaction.onerror = (event) => { console.error('[setSchemas] Transaction error', event); }

                const objectStore = transaction.objectStore('schemasdata');

                console.log(`[setSchemas] try to add ${schemas}`);
                const request = objectStore.put(schemas, 1);
                request.onsuccess = () => {
                    console.log('[setSchemas] added succesvol');
                    db.close();
                }
            });
    }
    saveOtherSchemas({schemas}) {
        this.openSchemasDb()
            .then((db) => {
                const transaction = db.transaction(['othersschemasdata'], 'readwrite');
                transaction.oncomplete = (event) => { console.log('[setOthersSchemas] Transaction completed'); }
                transaction.onerror = (event) => { console.error('[setOthersSchemas] Transaction error', event); }

                const objectStore = transaction.objectStore('othersschemasdata');

                console.log(`[setSchemas] try to add ${schemas}`);
                const request = objectStore.put(schemas, 2);
                request.onsuccess = () => {
                    console.log('[setOtherSchemas] added succesvol');
                    db.close();
                }
            });
    }
    getSchemas() {
        let schemas;
        return new Promise((resolve, reject) => {
            console.log('[getSchemas] getting schemas');
            this.openSchemasDb()
                .then((db) => {
                    const transaction = db.transaction('schemasdata');
                    const objectStore = transaction.objectStore('schemasdata');
                    const request = objectStore.getAll();
                    request.onsuccess = (event) => {
                        schemas = event.target.result[0];
                        console.log(`[getSchemas]`, schemas);
                        db.close();
                        resolve(schemas);
                    }
                });
        });
    }
    getOthersSchemas() {
        let schemas;
        return new Promise((resolve, reject) => {
            console.log('[getOtherSchemas] getting schemas');
            this.openSchemasDb()
                .then((db) => {
                    const transaction = db.transaction('othersschemasdata');
                    const objectStore = transaction.objectStore('othersschemasdata');
                    const request = objectStore.getAll();
                    request.onsuccess = (event) => {
                        schemas = event.target.result[0];
                        console.log(`[getOtherSchemas]`, schemas);
                        db.close();
                        resolve(schemas);
                    }
                });
        });
    }

}
