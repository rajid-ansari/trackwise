import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  deleteDoc, 
  doc,
  orderBy,
  serverTimestamp
} from 'firebase/firestore'
import { db } from './config'

// Collection reference
const expensesCollection = collection(db, 'expenses')

// Add a new expense
export const addExpense = async (expense, userId) => {
  try {
    const expenseData = {
      ...expense,
      userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }
    
    const docRef = await addDoc(expensesCollection, expenseData)
    return { id: docRef.id, ...expenseData }
  } catch (error) {
    console.error('Error adding expense:', error)
    throw error
  }
}

// Get all expenses for a user
export const getExpenses = async (userId) => {
  try {
    const q = query(
      expensesCollection,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    )
    
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('Error getting expenses:', error)
    throw error
  }
}

// Delete an expense
export const deleteExpense = async (expenseId) => {
  try {
    await deleteDoc(doc(db, 'expenses', expenseId))
  } catch (error) {
    console.error('Error deleting expense:', error)
    throw error
  }
} 