import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CurrencyDollarIcon, TagIcon, DocumentTextIcon } from '@heroicons/react/24/outline'

const categories = [
  { value: 'food', label: 'Food', icon: '🍔' },
  { value: 'transport', label: 'Transport', icon: '🚗' },
  { value: 'entertainment', label: 'Entertainment', icon: '🎮' },
  { value: 'bills', label: 'Bills', icon: '📃' },
  { value: 'shopping', label: 'Shopping', icon: '🛍️' },
  { value: 'health', label: 'Health', icon: '🏥' },
  { value: 'other', label: 'Other', icon: '📌' }
]

const ExpenseForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'food'
  })

  const [touched, setTouched] = useState({})
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const validateField = (name, value) => {
    switch (name) {
      case 'description':
        return !value.trim() ? 'Description is required' : ''
      case 'amount':
        if (!value) return 'Amount is required'
        if (isNaN(value) || parseFloat(value) <= 0) return 'Amount must be a positive number'
        return ''
      default:
        return ''
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setSubmitError('')
    
    if (touched[name]) {
      const error = validateField(name, value)
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    const error = validateField(name, value)
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')
    
    // Validate all fields
    const newErrors = {}
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key])
      if (error) newErrors[key] = error
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setTouched({ description: true, amount: true })
      return
    }

    setIsSubmitting(true)
    try {
      // Ensure all required fields are present and properly formatted
      const expenseData = {
        description: formData.description.trim(),
        amount: parseFloat(formData.amount),
        category: formData.category,
      }

      // Validate data before submission
      if (!expenseData.description) {
        throw new Error('Description is required')
      }
      if (!expenseData.amount || isNaN(expenseData.amount) || expenseData.amount <= 0) {
        throw new Error('Amount must be a positive number')
      }
      if (!expenseData.category) {
        throw new Error('Category is required')
      }

      await onSubmit(expenseData)
      
      // Reset form on success
      setFormData({
        description: '',
        amount: '',
        category: 'food'
      })
      setTouched({})
      setErrors({})
      setSubmitError('')
    } catch (error) {
      console.error('Error submitting expense:', error)
      setSubmitError(error.message || 'Failed to add expense. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-6 bg-white p-6 rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {submitError && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="p-3 rounded-lg bg-red-50 text-red-700 text-sm"
        >
          {submitError}
        </motion.div>
      )}

      <div className="space-y-4">
        {/* Description Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <div className="relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DocumentTextIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              className={`block w-full pl-10 pr-3 py-2.5 sm:text-sm rounded-lg bg-gray-50 border-2 disabled:bg-gray-100 disabled:cursor-not-allowed
                ${errors.description && touched.description
                  ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500'
                }`}
              placeholder="Enter expense description"
            />
          </div>
          <AnimatePresence>
            {errors.description && touched.description && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-1 text-sm text-red-600"
              >
                {errors.description}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Amount Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <div className="relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CurrencyDollarIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              className={`block w-full pl-10 pr-3 py-2.5 sm:text-sm rounded-lg bg-gray-50 border-2 disabled:bg-gray-100 disabled:cursor-not-allowed
                ${errors.amount && touched.amount
                  ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500'
                }`}
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </div>
          <AnimatePresence>
            {errors.amount && touched.amount && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-1 text-sm text-red-600"
              >
                {errors.amount}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Category Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <div className="relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <TagIcon className="h-5 w-5 text-gray-500" />
            </div>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              disabled={isSubmitting}
              className="block w-full pl-10 pr-10 py-2.5 text-base border-2 border-gray-200 bg-gray-50 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.icon} {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        className={`w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white 
          ${isSubmitting 
            ? 'bg-indigo-400 cursor-not-allowed' 
            : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          }`}
        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Adding Expense...
          </>
        ) : (
          'Add Expense'
        )}
      </motion.button>
    </motion.form>
  )
}

export default ExpenseForm 