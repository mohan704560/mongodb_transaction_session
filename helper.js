export async function updateUserCount(db) {
  const matric = await db.collection("matrics").findOne({ name: "userCount" });
  const result = await db
    .collection("matrics")
    .updateOne({ _id: matric._id }, { $set: { total: matric.total + 1 } });
}

export async function updateUserCountAtomically(db) {
  const result = await db
    .collection("matrics")
    .updateOne({ name: "userCount" }, { $inc: { total: 1 } });
}

export async function counselorAssignment(db, user) {
  try {
    const counselor = await db
      .collection("counselors")
      .findOne({ assignedUserId: null });

    if (!counselor) {
      throw new Error("No available counselors.");
    }

    const updateCounselor = await db
      .collection("counselors")
      .findOneAndUpdate(
        { _id: counselor._id },
        { $set: { assignedUserId: user._id } },
        { returnDocument: "after" },
      );

    const updateUser = await db
      .collection("users")
      .findOneAndUpdate(
        { _id: user._id },
        { $set: { assignedCounselorId: counselor._id } },
        { returnDocument: "after" },
      );
  } catch (err) {
    console.error("Error connecting to the database:", err);
    throw err;
  }
}

export async function counselorAssignmentThroughTransaction(db, client, user) {
  const session = client.startSession();
  try {
    session.startTransaction();

    const counselor = await db
      .collection("counselors")
      .findOne({ assignedUserId: null }, { session });

    if (!counselor) {
      throw new Error("No available counselors.");
    }

    const updateCounselor = await db
      .collection("counselors")
      .findOneAndUpdate(
        { _id: counselor._id },
        { $set: { assignedUserId: user._id } },
        { returnDocument: "after", session },
      );

    const updateUser = await db
      .collection("users")
      .findOneAndUpdate(
        { _id: user._id },
        { $set: { assignedCounselorId: counselor._id } },
        { returnDocument: "after", session },
      );
    await session.commitTransaction();
    console.log("Transaction committed successfully.");
  } catch (err) {
    console.error("Error connecting to the database:", err);
    await session.abortTransaction();
    // throw err;
  } finally {
    session.endSession();
  }
}
