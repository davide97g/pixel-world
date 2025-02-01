import { Check } from "lucide-react";

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
}

export function StepIndicator({
  steps,
  currentStep,
  onStepClick,
}: Readonly<StepIndicatorProps>) {
  return (
    <div className="flex items-center justify-end w-full py-4">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          <div
            className={`flex flex-col items-center ${index <= currentStep ? "cursor-pointer" : "cursor-not-allowed"}`}
            onClick={() =>
              index <= currentStep && onStepClick && onStepClick(index)
            }
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-200 ${
                index < currentStep
                  ? "border-primary bg-primary text-primary-foreground"
                  : index === currentStep
                    ? "border-primary text-primary"
                    : "border-muted-foreground text-muted-foreground"
              }`}
            >
              {index < currentStep ? (
                <Check className="w-6 h-6" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <span
              className={`text-xs mt-2 font-medium ${index <= currentStep ? "text-primary" : "text-muted-foreground"}`}
            >
              {step}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-0.5 mx-2 ${index < currentStep ? "bg-primary" : "bg-muted"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
