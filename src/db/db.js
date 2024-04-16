// import { openDB } from "idb";

// const DB_NAME = "note_manage";
const STORE_NAME = "notes";

// // Function to open the IndexedDB database
// const openDatabase = () => {
//   return openDB(DB_NAME, 1, {
//     upgrade(db) {
//       if (!db.objectStoreNames.contains(STORE_NAME)) {
//         db.createObjectStore(STORE_NAME, {
//           keyPath: "id",
//           autoIncrement: true,
//         });
//       }
//     },
//   });
// };

// // Function to add an item to the database
// const addItem = async (item) => {
//   const db = await openDatabase();
//   const tx = db.transaction(STORE_NAME, "readwrite");
//   const store = tx.objectStore(STORE_NAME);
//   const serializedItem = JSON.stringify(item);
//   await store.add(serializedItem, item.id);
// };

// // Function to get all items from the database
// const getAllItems = async () => {
//   const db = await openDatabase();
//   const tx = db.transaction(STORE_NAME, "readonly");
//   const store = tx.objectStore(STORE_NAME);
//   const serializedItems = await store.getAll();
//   // Parse each item back to an object
//   return serializedItems.map((item) => JSON.parse(item));
// };

// // Function to update an item in the database
// const updateItem = async (id, updatedItem) => {
//   const db = await openDatabase();
//   const tx = db.transaction(STORE_NAME, "readwrite");
//   const store = tx.objectStore(STORE_NAME);
//   await store.put(updatedItem);
// };

// // Function to delete an item from the database
// const deleteItem = async (id) => {
//   const db = await openDatabase();
//   const tx = db.transaction(STORE_NAME, "readwrite");
//   const store = tx.objectStore(STORE_NAME);
//   await store.delete(id);
// };

// Function to add an item to the database
const addItem = (item) => {
  if (localStorage.getItem(STORE_NAME) !== null) {
    const oldData = JSON.parse(localStorage.getItem(STORE_NAME));
    oldData.push(item);
    const newData = JSON.stringify(oldData);
    localStorage.setItem(STORE_NAME, newData);
  } else {
    const addData = JSON.stringify([item]);
    localStorage.setItem(STORE_NAME, addData);
  }
};

// Function to get all items from the database
const getAllItems = (category) => {
  var notes;
  if (localStorage.getItem(STORE_NAME)) {
    if (category !== "all") {
      const data = JSON.parse(localStorage.getItem(STORE_NAME));
      const filter_data = data.filter((item) => item.category === category);
      notes = filter_data;
    } else {
      notes = JSON.parse(localStorage.getItem(STORE_NAME));
    }
    return notes;
  } else {
    return [];
  }
};

const updateItem = (id, updatedItem) => {
  const { title, category, description } = updatedItem;
  const Data = getAllItems("all");
  var index;
  const oldData = Data.filter((item, i) => {
    if (item.id === id) {
      index = i;
    }
    return item.id === id;
  })[0];
  Data.splice(index, 1, { ...oldData, title, category, description });
  localStorage.setItem(STORE_NAME, JSON.stringify(Data));
};

const deleteItem = (id) => {
  const Data = getAllItems("all");
  const NewData = Data.filter((item) => {
    return item.id !== id;
  });
  localStorage.setItem(STORE_NAME, JSON.stringify(NewData));
};

export { addItem, getAllItems, updateItem, deleteItem };
