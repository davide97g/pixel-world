"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode } from "react";
import { StepIndicator } from "./StepIndicator";

export function ModalStepper({
  children,
  steps,
  open,
  onClose,
  currentStep,
  handleNext,
  handlePrevious,
  title,
  isNextDisabled,
  onConfirm,
}: Readonly<{
  children: ReactNode;
  steps: string[];
  open: boolean;
  onClose: () => void;
  currentStep: number;
  handleNext: () => void;
  handlePrevious: () => void;
  title: string;
  isNextDisabled?: boolean;
  onConfirm: () => void;
}>) {
  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent
        className="sm:max-w-[925px]"
        style={{ backgroundColor: "white" }}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{steps[currentStep]}</DialogDescription>
        </DialogHeader>
        <StepIndicator steps={steps} currentStep={currentStep} />
        {children}
        <DialogFooter className="flex justify-between w-full">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            <Button
              onClick={
                currentStep === steps.length - 1 ? onConfirm : handleNext
              }
              disabled={isNextDisabled}
            >
              {currentStep === steps.length - 1 ? "Submit" : "Next"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
