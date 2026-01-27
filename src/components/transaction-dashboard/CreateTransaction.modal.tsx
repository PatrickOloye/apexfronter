import { useState, useEffect } from 'react';
import { Button } from './button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../../components/ui/Select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { TransactionForm, TransactionType } from '@/libs/server-actions/types';

// Define props interface for the component
interface CreateTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactionType: TransactionType;
  transactionForm: TransactionForm;
  transactionLabel: string;
  onSubmit: (formData: any) => Promise<void>;
}

/**
 * CreateTransactionModal component for handling transaction creation
 * with improved scrolling behavior and proper TypeScript typing
 */
const CreateTransactionModal = ({
  isOpen,
  onClose,
  transactionType,
  transactionForm,
  transactionLabel,
  onSubmit
}: CreateTransactionModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  
  const [formData, setFormData] = useState({
    amount: '',
    type: transactionType || 'DEBIT', // Use the passed prop with fallback
    form: transactionForm || 'WIRE_TRANSFER', // Use the passed prop with fallback
    category: 'WITHIN_APEX',
    description: '',
    accountNumber: '',
    accountName: '',
    bankName: '',
    narration: '',
    isBeneficiary: false,
    isInternational: false,
    currency: 'USD',
    exchangeRate: '1.0',
  });

  // Format amount with commas
  const formatAmount = (value: string) => {
    // Remove non-numeric characters except decimal point
    const numericValue = value.replace(/[^\d.]/g, '');
    
    // Handle decimal point
    const parts = numericValue.split('.');
    const wholePart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    // Return with decimal if it exists
    return parts.length > 1 ? `${wholePart}.${parts[1].slice(0, 2)}` : wholePart;
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, '');
    
    // Only update if it's a valid number or empty
    if (rawValue === '' || !isNaN(parseFloat(rawValue))) {
      setFormData({
        ...formData,
        amount: rawValue,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    // If this is the narration field, update word count
    if (name === 'narration') {
      const words = value.trim() ? value.trim().split(/\s+/) : [];
      setWordCount(words.length);
    }
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  // Type definition for the select change handler
  type FormDataKey = keyof typeof formData;

  const handleSelectChange = (name: FormDataKey, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate form on data change
  useEffect(() => {
    const errors: {[key: string]: string} = {};
    
    // Required fields validation
    if (!formData.amount) errors.amount = 'Amount is required';
    if (!formData.accountNumber) errors.accountNumber = 'Account number is required';
    if (!formData.accountName) errors.accountName = 'Account name is required';
    
    // Bank name is required for outside transactions
    if ((formData.category === 'OUTSIDE_APEX' || formData.category === 'INTERNATIONAL') && 
        !formData.bankName) {
      errors.bankName = 'Bank name is required';
    }
    
    // Narration validation
    if (!formData.narration) {
      errors.narration = 'Narration is required';
    } else if (wordCount > 500) {
      errors.narration = 'Narration exceeds 500 word limit';
    }
    
    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  }, [formData, wordCount]);

  const handleSubmit = async () => {
    if (!isFormValid) return;
    
    setIsLoading(true);
    try {
      // Extract numeric value without commas for submission
      const submissionData = {
        ...formData,
        amount: formData.amount.replace(/,/g, '')
      };
      
      await onSubmit(submissionData);
      alert('Transaction submitted successfully!');
    } catch (error) {
      console.error('Error submitting transaction:', error);
    } finally {
      onClose(); 
      setIsLoading(false);
    }
  };

  // Custom styles for inputs to only show bottom border
  const inputStyle = "border-t-0 border-l-0 border-r-0 border-b-2 border-gray-300 focus:border-blue-500 rounded-none focus:ring-0";
  
  // Style to hide number input spinners
  const hideNumberInputSpinners = `
    /* Hide number input spinners for Chrome, Safari, Edge, Opera */
    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    
    /* Hide number input spinners for Firefox */
    input[type=number] {
      -moz-appearance: textfield;
    }
    
    /* Hide scrollbar from dialog */
    .flex-grow.overflow-y-auto::-webkit-scrollbar {
      display: none;
    }
    .flex-grow.overflow-y-auto {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Custom styles to hide scrollbar and number input spinners */}
        <style jsx global>{hideNumberInputSpinners}</style>
        
        {/* Custom Header with fancy title */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
          <div className="flex flex-col items-center justify-center">
            {/* Logo */}
            <div className="text-4xl font-extrabold tracking-wider mb-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                APEX BANKING
              </span>
            </div>
            
            {/* Subtitle with animated underline */}
            <div className="text-lg font-medium text-blue-100 relative">
              <span>Transaction Portal - {transactionLabel}</span>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white opacity-70"></div>
            </div>
          </div>
        </div>
        
        {/* Main content with scrollable area */}
        <div className="flex-grow overflow-y-auto">
          <div className="px-6 pt-2 pb-4">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-gray-800">Create New {transactionLabel}</DialogTitle>
            </DialogHeader>
            
            {isLoading ? (
              <div className="text-center">
                <div className="flex flex-col items-center justify-center py-8">
                  {/* APEX Text with Glow Effect */}
                  <div className="relative mb-4">
                    <div className="text-5xl font-bold tracking-widest text-blue-500 animate-pulse">
                      <span className="inline-block animate-bounce" style={{animationDelay: '0ms'}}>A</span>
                      <span className="inline-block animate-bounce" style={{animationDelay: '100ms'}}>P</span>
                      <span className="inline-block animate-bounce" style={{animationDelay: '200ms'}}>E</span>
                      <span className="inline-block animate-bounce" style={{animationDelay: '300ms'}}>X</span>
                    </div>
                    {/* Blue glow effect under text */}
                    <div className="absolute inset-0 text-5xl font-bold tracking-widest text-blue-500 blur-lg opacity-70 animate-pulse">
                      APEX
                    </div>
                  </div>
                  
                  {/* Loading spinner with pulsing circles */}
                  <div className="relative h-12 w-12">
                    {/* Spinning outer ring */}
                    <div className="absolute inset-0 border-4 border-t-transparent border-blue-400 rounded-full animate-spin"></div>
                    
                    {/* Inner circle that pulses */}
                    <div className="absolute inset-2 bg-blue-600 rounded-full animate-pulse"></div>
                    
                    {/* Center dot */}
                    <div className="absolute inset-4 bg-blue-300 rounded-full"></div>
                  </div>
                  
                  {/* Loading text below */}
                  <div className="mt-4 text-blue-500 text-sm font-semibold">
                    <span className="inline-block animate-pulse">Processing</span>
                    <span className="inline-block animate-bounce" style={{animationDelay: '0ms'}}>.</span>
                    <span className="inline-block animate-bounce" style={{animationDelay: '200ms'}}>.</span>
                    <span className="inline-block animate-bounce" style={{animationDelay: '400ms'}}>.</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 py-2">
                {/* Amount */}
                <div className="flex items-center">
                  <Label htmlFor="amount" className="w-1/3 text-gray-600 font-medium">
                    * Transaction Amount
                  </Label>
                  <div className="w-2/3">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <Input
                        id="amount"
                        name="amount"
                        value={formatAmount(formData.amount)}
                        onChange={handleAmountChange}
                        required
                        className={inputStyle + " pl-8"}
                        placeholder="0.00"
                        inputMode="decimal"
                        type="text"
                      />
                    </div>
                    {formErrors.amount && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.amount}</p>
                    )}
                  </div>
                </div>
                
                {/* Transaction Type - Now disabled as it's determined by the parent modal */}
                <div className="flex items-center">
                  <Label className="w-1/3 text-gray-600 font-medium">
                    * Transaction Type
                  </Label>
                  <div className="w-2/3">
                    <Select
                      value={formData.type}
                      onValueChange={(value) => handleSelectChange('type', value)}
                      disabled={true} // Disabled because it's set by the parent modal
                    >
                      <SelectTrigger className={inputStyle}>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DEBIT">Debit</SelectItem>
                        <SelectItem value="CREDIT">Credit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Transaction Form - Now disabled as it's determined by the parent modal */}
                <div className="flex items-center">
                  <Label className="w-1/3 text-gray-600 font-medium">
                    * Transaction Form
                  </Label>
                  <div className="w-2/3">
                    <Select
                      value={formData.form}
                      onValueChange={(value) => handleSelectChange('form', value)}
                      disabled={true} // Disabled because it's set by the parent modal
                    >
                      <SelectTrigger className={inputStyle}>
                        <SelectValue placeholder="Select form" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="WIRE_DEPOSIT">Wire Deposit</SelectItem>
                        <SelectItem value="WIRE_TRANSFER">Wire Transfer</SelectItem>
                        <SelectItem value="ONLINE_TRANSACTION">Online Transaction</SelectItem>
                        <SelectItem value="INVESTMENT_TRANSACTION">Investment Transaction</SelectItem>
                        <SelectItem value="LOAN_REPAYMENT">Loan Repayment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Transaction Category */}
                <div className="flex items-center">
                  <Label className="w-1/3 text-gray-600 font-medium">
                    * Transaction Category
                  </Label>
                  <div className="w-2/3">
                    <Select
                      value={formData.category}
                      onValueChange={(value) => handleSelectChange('category', value)}
                    >
                      <SelectTrigger className={inputStyle}>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="WITHIN_APEX">Within Apex</SelectItem>
                        <SelectItem value="OUTSIDE_APEX">Outside Apex</SelectItem>
                        <SelectItem value="INTERNATIONAL">International</SelectItem>
                        <SelectItem value="FOREX">Forex</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Account Number */}
                <div className="flex items-center">
                  <Label htmlFor="accountNumber" className="w-1/3 text-gray-600 font-medium">
                    * Account Number
                  </Label>
                  <div className="w-2/3">
                    <Input
                      id="accountNumber"
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleChange}
                      required
                      className={inputStyle}
                      placeholder="Enter account number"
                    />
                    {formErrors.accountNumber && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.accountNumber}</p>
                    )}
                  </div>
                </div>
                
                {/* Account Name */}
                <div className="flex items-center">
                  <Label htmlFor="accountName" className="w-1/3 text-gray-600 font-medium">
                    * Account Name
                  </Label>
                  <div className="w-2/3">
                    <Input
                      id="accountName"
                      name="accountName"
                      value={formData.accountName}
                      onChange={handleChange}
                      required
                      className={inputStyle}
                      placeholder="Enter account name"
                    />
                    {formErrors.accountName && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.accountName}</p>
                    )}
                  </div>
                </div>
                
                {/* Bank Name - Conditional */}
                {(formData.category === 'OUTSIDE_APEX' || formData.category === 'INTERNATIONAL') && (
                  <div className="flex items-center">
                    <Label htmlFor="bankName" className="w-1/3 text-gray-600 font-medium">
                      * Bank Name
                    </Label>
                    <div className="w-2/3">
                      <Input
                        id="bankName"
                        name="bankName"
                        value={formData.bankName}
                        onChange={handleChange}
                        required
                        className={inputStyle}
                        placeholder="Enter bank name"
                      />
                      {formErrors.bankName && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.bankName}</p>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Currency */}
                <div className="flex items-center">
                  <Label htmlFor="currency" className="w-1/3 text-gray-600 font-medium">
                    * Currency
                  </Label>
                  <div className="w-2/3">
                    <Select
                      value={formData.currency}
                      onValueChange={(value) => handleSelectChange('currency', value)}
                    >
                      <SelectTrigger className={inputStyle}>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                        <SelectItem value="NGN">NGN</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Narration */}
                <div className="flex items-start">
                  <Label htmlFor="narration" className="w-1/3 text-gray-600 font-medium pt-2">
                    * Narration
                  </Label>
                  <div className="w-2/3">
                    <textarea
                      id="narration"
                      name="narration"
                      value={formData.narration}
                      onChange={handleChange}
                      className={`w-full ${inputStyle} p-2 min-h-[80px]`}
                      placeholder="Add additional narration"
                    />
                    <div className="flex justify-between mt-1 text-xs">
                      <span className={wordCount > 500 ? "text-red-500" : "text-gray-500"}>
                        {wordCount}/500 words
                      </span>
                      {formErrors.narration && (
                        <p className="text-red-500">{formErrors.narration}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Footer with buttons - Fixed at bottom */}
        <DialogFooter className="border-t p-4 mt-0 flex justify-end space-x-2 bg-white">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            className={`${isFormValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-300 cursor-not-allowed'} text-white`}
            disabled={isLoading || !isFormValid}
          >
            {isLoading ? 'Processing...' : 'Proceed'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { CreateTransactionModal };
export default CreateTransactionModal;