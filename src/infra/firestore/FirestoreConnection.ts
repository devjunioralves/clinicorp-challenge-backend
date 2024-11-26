import { Firestore } from '@google-cloud/firestore'
import { FirestoreConfig } from './FirestoreConfig'

export class FirestoreConnection {
  private db: Firestore

  constructor() {
    this.db = FirestoreConfig.getInstance()
  }

  getCollection(collectionName: string) {
    return this.db.collection(collectionName)
  }

  async addDocuments(collectionName: string, documents: any[]) {
    const batch = this.db.batch()
    const collectionRef = this.getCollection(collectionName)

    documents.forEach((doc) => {
      const docRef = collectionRef.doc()
      batch.set(docRef, doc)
    })

    await batch.commit()
  }

  async getDocuments(collectionName: string, hostname: string) {
    const collectionRef = this.getCollection(collectionName)
    const snapshot = await collectionRef.where('hostname', '==', hostname).get()
    const tasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    return tasks
  }
}
