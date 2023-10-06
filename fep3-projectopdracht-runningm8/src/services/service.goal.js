export class GoalService {
    constructor() {
        this.openGoalDb()
    }

    openGoalDb() {
        return new Promise((resolve, reject) => {
            const idbRequest = window.indexedDB.open("Goal", 1);
            idbRequest.onerror = (event) => {
                console.error('[GoalDB ERROR]', event);
                reject('error');
            }
            idbRequest.onsuccess = (event) => {
                console.log('[GoalDB onsuccess]');
                resolve(idbRequest.result);
            }
            idbRequest.onupgradeneeded = (event) => {
                console.log('[GoalDB onupgradeneeded]');
                idbRequest.result.createObjectStore('goaldata', {autoIncrement:true});
                resolve(idbRequest.result);
            }
        });
    }
    setGoal() {
        this.openGoalDb()
            .then((db) => {
                const transaction = db.transaction(['goaldata'], 'readwrite');
                transaction.oncomplete = (event) => { console.log('[setSession] Transaction completed'); }
                transaction.onerror = (event) => { console.error('[setSession] Transaction error', event); }

                const objectStore = transaction.objectStore('goaldata');

                console.log(`[setGoal] creating new goal object`);
                const request = objectStore.add({
                }, 1 );
                request.onsuccess = () => {
                    console.log('[setGoal] creation succesvol');
                    db.close();
                }
            });
    }
    saveGoal({goal}) {
        this.openGoalDb()
            .then((db) => {
                const transaction = db.transaction(['goaldata'], 'readwrite');
                transaction.oncomplete = (event) => { console.log('[setGoal] Transaction completed'); }
                transaction.onerror = (event) => { console.error('[setGoal] Transaction error', event); }

                const objectStore = transaction.objectStore('goaldata');

                console.log(`[setGoal] try to add ${goal}`);
                const request = objectStore.put(goal, 1);
                request.onsuccess = () => {
                    console.log('[saveGoal] saved succesvol');
                    db.close();
                }
            });
    }
    getGoal() {
        return new Promise((resolve, reject) => {
            console.log('[getUser] getting goal');
            this.openGoalDb()
                .then((db) => {
                    const transaction = db.transaction('goaldata');
                    const objectStore = transaction.objectStore('goaldata');
                    const request = objectStore.getAll();
                    request.onsuccess = (event) => {
                        let goal = event.target.result;
                        console.log(`[getGoal]`, goal[0]);
                        db.close();
                        resolve(goal[0]);
                    }
                });
        });
    }

}
