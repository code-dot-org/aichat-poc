import { MongoClient } from "mongodb";
import {
  COLLECTION_CHATS,
  COLLECTION_USERS,
  COLLECTION_CLASSROOMS,
  COLLECTION_BOTS,
  COLLECTION_RESTRICTIONS,
} from "./constants";

const url = process.env.MONGO_URL;
const client = new MongoClient(url);
const clientPromise = client.connect();

export async function getCollection(collection) {
  const client = await clientPromise;

  const db = client.db("aichat");

  return db.collection(collection);
}

export async function getChatsCollection() {
  return getCollection(COLLECTION_CHATS);
}
export async function getUsersCollection() {
  return getCollection(COLLECTION_USERS);
}

export async function getClassroomsCollection() {
  return getCollection(COLLECTION_CLASSROOMS);
}

export async function getBotsCollection() {
  return getCollection(COLLECTION_BOTS);
}

export async function getRestrictionsCollection() {
  return getCollection(COLLECTION_RESTRICTIONS);
}
