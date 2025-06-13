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
   <Dialog>
      <DialogTrigger
        onClick={(e) => e.stopPropagation()}
        className={btnClassName}
        style={btnStyle}
      >
        {title}
      </DialogTrigger>
      <DialogContent
        className={`max-w-[90vw] sm:max-w-[30rem] ${contentClassName} ${dialogClassName}`}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default CustomDialog;
