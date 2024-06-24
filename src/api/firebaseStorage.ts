import { User } from "firebase/auth";
import { storage } from "../firebase";
import { deleteObject, ref } from "firebase/storage";

export const deleteStoragePhoto = async (
  address: string,
  user: User,
  id: string
) => {
  try {
    const photoRef = ref(storage, `${address}/${user?.uid}/${id}`);
    await deleteObject(photoRef);
  } catch (e) {
    console.log("에러발생", e);
  }
};
