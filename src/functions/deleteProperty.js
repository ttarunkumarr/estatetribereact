import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../Config/Firebase";

export const handleDelete = async (callback,id) => {
    
  try {
    await deleteDoc(doc(db, "Properties", id));
    callback(true)
  } catch (e) {
    callback(false);
    console.log(e);
  } finally {
    callback("");
  }
};
