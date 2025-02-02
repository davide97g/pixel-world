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
import { X } from "lucide-react";
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
    <Dialog open={open}>
      <DialogContent
        className="sm:max-w-[925px]"
        style={{ backgroundColor: "white" }}
      >
        <DialogHeader>
          <div className="flex flex-row items-center justify-between">
            <div>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{steps[currentStep]}</DialogDescription>
            </div>
            <div className="flex flex-row items-center gap-4">
              <StepIndicator steps={steps} currentStep={currentStep} />
              <X style={{ cursor: "pointer" }} onClick={() => onClose()} />
            </div>
          </div>
        </DialogHeader>
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
