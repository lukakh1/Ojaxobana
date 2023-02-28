import * as SQLite from 'expo-sqlite';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';

let db;

async function openDatabase() {
  if (
    !(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite'))
      .exists
  ) {
    await FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + 'SQLite'
    );
  }
  if (
    !(
      await FileSystem.getInfoAsync(
        FileSystem.documentDirectory + 'SQLite/littlesQuestions.db'
      )
    ).exists
  ) {
    await FileSystem.downloadAsync(
      Asset.fromModule(require('../../assets/littlesQuestions.db')).uri,
      FileSystem.documentDirectory + 'SQLite/littlesQuestions.db'
    );
  }
  db = SQLite.openDatabase('littlesQuestions.db');
  return db;
}

// async function openDatabase() {
//   if (
//     !(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite'))
//       .exists
//   ) {
//     await FileSystem.makeDirectoryAsync(
//       FileSystem.documentDirectory + 'SQLite'
//     );
//   }
//   await FileSystem.downloadAsync(
//     Asset.fromModule(require('../../assets/littlesQuestions.db')).uri,
//     FileSystem.documentDirectory + 'SQLite/littlesQuestions.db'
//   );
//   return SQLite.openDatabase('littlesQuestions.db');
// }

export { openDatabase, db };
