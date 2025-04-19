import { useState, useEffect } from "react";
import {
    collection,
    query,
    where,
    orderBy,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "./useAuth";

// Collection name constant to ensure consistency
const EXPENSES_COLLECTION = "expenses";

export const useExpenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            setExpenses([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        const expensesRef = collection(db, EXPENSES_COLLECTION);
        const q = query(
            expensesRef,
            where("userId", "==", user.uid),
            orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const expensesData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setExpenses(expensesData);
                setLoading(false);
                setError(null);
            },
            (error) => {
                console.error("Error fetching expenses:", error);
                setError("Failed to fetch expenses. Please try again.");
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [user]);

    const addExpense = async (expenseData) => {
        try {
            if (!user) {
                throw new Error("You must be logged in to add an expense");
            }

            if (!expenseData.amount || expenseData.amount <= 0) {
                throw new Error("Amount must be a positive number");
            }

            if (!expenseData.category) {
                throw new Error("Category is required");
            }

            const expense = {
                ...expenseData,
                userId: user.uid,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            };

            const docRef = await addDoc(
                collection(db, EXPENSES_COLLECTION),
                expense
            );
            return { id: docRef.id, ...expense };
        } catch (error) {
            console.error("Error adding expense:", error);
            throw new Error(
                error.message || "Failed to add expense. Please try again."
            );
        }
    };

    const deleteExpense = async (expenseId) => {
        try {
            if (!user) {
                throw new Error("You must be logged in to delete an expense");
            }

            const expenseRef = doc(db, EXPENSES_COLLECTION, expenseId);
            await deleteDoc(expenseRef);
        } catch (error) {
            console.error("Error deleting expense:", error);
            throw new Error(
                error.message || "Failed to delete expense. Please try again."
            );
        }
    };

    return {
        expenses,
        loading,
        error,
        addExpense,
        deleteExpense,
    };
};
