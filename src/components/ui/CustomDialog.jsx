import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

function CustomDialog({ children, title = 'zzz',btnClassName,contentClassName,dialogClassName,btnStyle }) {
  return (
    <Dialog className={dialogClassName}>
      <DialogTrigger  onClick= {(e) => e.stopPropagation()} className={btnClassName} style={{btnStyle}}>{title}</DialogTrigger>
      <DialogContent className={contentClassName}>{children}</DialogContent>
    </Dialog>
  );
}

export default CustomDialog;
