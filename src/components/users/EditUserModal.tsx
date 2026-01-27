import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '../ui/dialog';

import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { toast } from 'sonner';
import { AdminService, User } from '../../libs/server-actions/admin';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';

const editUserSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  phoneNumber: z.string().optional(),
  country: z.string().optional(),
  isVerified: z.boolean().optional(),
});

type EditUserForm = z.infer<typeof editUserSchema>;

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  user: User | null;
}

export const EditUserModal: React.FC<EditUserModalProps> = ({ isOpen, onClose, onSuccess, user }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<EditUserForm>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      isVerified: false
    }
  });

  // Watch verified state for checkbox
  const isVerified = watch('isVerified');

  useEffect(() => {
    if (user && isOpen) {
      setValue('firstName', user.firstName || '');
      setValue('lastName', user.lastName || '');
      setValue('phoneNumber', user.phoneNumber || '');
      setValue('country', user.country || '');
      setValue('isVerified', user.isVerified || false);
    }
  }, [user, isOpen, setValue]);

  const onSubmit = async (data: EditUserForm) => {
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      await AdminService.updateUser(user.id, data);
      toast.success('User updated successfully');
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error(error.message || 'Failed to update user');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Update user information below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-firstName">First name</Label>
              <Input id="edit-firstName" {...register('firstName')} placeholder="John" />
              {errors.firstName && <p className="text-xs text-red-500">{errors.firstName.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-lastName">Last name</Label>
              <Input id="edit-lastName" {...register('lastName')} placeholder="Doe" />
              {errors.lastName && <p className="text-xs text-red-500">{errors.lastName.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-phoneNumber">Phone</Label>
              <Input id="edit-phoneNumber" {...register('phoneNumber')} placeholder="+1234567890" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-country">Country</Label>
              <Input id="edit-country" {...register('country')} placeholder="United States" />
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Checkbox 
              id="isVerified" 
              checked={isVerified}
              onCheckedChange={(checked) => setValue('isVerified', checked as boolean)}
            />
            <Label htmlFor="isVerified" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Verified User
            </Label>
          </div>

          <DialogFooter>
            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
