import { useState } from 'react';
import { stat } from 'react-native-fs';
import SQLite from 'react-native-sqlite-storage';

export const createTables = () => {
    const db = SQLite.openDatabase({name : "App.db"})
    db.transaction(tx => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS "
            + "USERS "
            + "(user_id INTEGER PRIMARY KEY, token TEXT NOT NULL UNIQUE, active INTEGER);"
            + "CREATE TABLE IF NOT EXISTS "
            + "CHATS "
            + "(chat_id INTEGER PRIMARY KEY, key TEXT);",
            [],
            () => {console.log("tables created successfully")},
            error => {
                console.log("error after creating tables");
                console.log(error.message);
            }
        )
    })
}

export const addUser = (user_id, token, active=true) => {
    const db = SQLite.openDatabase({name : "App.db"})
    return db.transaction(tx => {
        tx.executeSql(
            "INSERT INTO USERS VALUES(?, ?, ? )",
            [user_id, token, active],
            () => {
                console.log("row inserted successsfully");
                return true;
            },
            error => {
                console.log("error after inserting row");
                console.log(error.message);
                deleteUser();
        }
        )
    })
}

export const getUser = () => {
    const db = SQLite.openDatabase({name : "App.db"});
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "SELECT * FROM USERS",
                [],
                (sqlTxn, res) => {
                    if(res.rows.length > 0){
                        result = res.rows.item(0);
                        console.log(result);
                        resolve(result);
                    }else{
                        console.log("nothing selected")
                        reject(error);
                    }
                },
                error => {
                    console.log("error after selecting rows");
                    console.log(error.message);
                }
            )
        })
    })
}


export const deleteUser = () => {
    const db = SQLite.openDatabase({name : "App.db"})
    db.transaction(tx => {
        tx.executeSql(
            "DELETE FROM USERS",
            [],
            (sqlTxn, res) => {
                console.log("all users deleted")
            },
            error => {
                console.log("error after deleting row");
                console.log(error.message);
            }
        )
    })
}

