import { openDB } from 'idb';
import 'regenerator-runtime/runtime';

// async function initDB() {
//     const db = await openDB(contact_db, 1, {
//         upgrade(db) {
//             if (db.objectStoreNames.contains("contacts")) {
//                 console.log("contains contacts");
//             }

//         }
//     });
// }

// module.exports = initDB;

export const initdb = async () => {
    //we are creating a new database named 'contact_db' whcich will be using verison 1 of the db.
    openDB('contact_db', 1, {
        //add our database schema if it has not already been initialized.
        upgrade(db) {
            if (db.objectStoreNames.contains('contact')) {
                console.log('contats store already exists');
                return;
            }
            //create a new object store for the data and fibe it a key name of 'id ' which will increment automatically
            db.createObjectStore('contact', {keyPath: 'id', autoincrement: true });
            console.log('contacts store created');
        }
    })
}