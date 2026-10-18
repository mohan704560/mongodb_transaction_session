// A: An atomic operation is a write operation that either completes entirely or doesn't complete at all.
// C: The database moves from one valid state to another, strictly following all predefined rules, constraints, and foreign keys.
// I: Concurrent transactions run independently without interfering with each other, preventing issues like dirty reads or overlapping updates.
// D:  Once a transaction is committed, the changes are permanent and will survive system crashes or power failures.

// An atomic operation is an indivisible and uninterrupted unit of work in computing that executes completely from start to finish without other threads, processes, or interrupts being able to observe or interfere with its intermediate states.

// Atomic Operator
// const { MongoClient } = require("mongodb");
// const {
//   updateUserCountAtomically,
//   updateUserCount,
//   updateCounselorAssignment,
//   counselorAssignmentThroughTransaction,
// } = require("./helper");

// const client = new MongoClient(process.env.DB_URL);

// const connectToDB = async () => {
//   await client.connect();
//   console.log("Connected successfully to server");
//   const dbName = "session";
//   const db = client.db(dbName);
//   return db;
// };

// async function atomicity() {
//   const db = await connectToDB();

//   const concurrentArray = [];

//   for (let i = 0; i < 10; i++) {
//     // concurrentArray.push(updateUserCount(db));
//     concurrentArray.push(updateUserCountAtomically(db));
//   }

//   await Promise.all(concurrentArray);

//   return "done.";
// }

// atomicity()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());

// Common mongodb atomic operations include:
// 1. $inc: Increments a field by a specified value.
// 2. $mul: Multiplies the value of a field by a specified value.
// 3. $set: Sets the value of a field.
// 4. $unset: Removes a field from a document.
// 5. $push: Adds an element to an array field.
// 6. $pull: Removes an element from an array field.
// 7. $addToSet: Adds an element to an array only if it doesn't already exist.
// 8. $rename: Renames a field in a document.
// 9. $currentDate: Sets the value of a field to the current date and time.
// 10. $min and $max: Updates the value of a field only if the specified value is less than or greater than the current value, respectively.

// Transaction
// const transaction = async () => {
//   const db = await connectToDB();

//   const concurrentArray = [];

//   const users = await db
//     .collection("users")
//     .find({ assignedCounselorId: null })
//     .toArray();

//   console.log("users", users);

//   for (let user of users) {
//     // concurrentArray.push(counselorAssignment(db, user));
//     concurrentArray.push(
//       counselorAssignmentThroughTransaction(db, client, user),
//     );
//   }

//   await Promise.allSettled(concurrentArray);

//   return "Transaction committed successfully.";
// };

// transaction()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());
