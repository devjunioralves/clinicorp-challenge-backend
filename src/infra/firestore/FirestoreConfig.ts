import { Firestore } from '@google-cloud/firestore'

export class FirestoreConfig {
  private static instance: Firestore

  private constructor() {}

  static getInstance(): Firestore {
    if (!this.instance) {
      this.instance = new Firestore({
        keyFilename: process.env.FIRESTORE_PROJECT_KEY,
        projectId: process.env.FIRESTORE_PROJECT_ID,
      })
    }
    return this.instance
  }
}
