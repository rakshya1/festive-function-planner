
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PurchaseTicketDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eventTitle: string;
  eventId: string;
  price: string;
  onPurchaseComplete?: () => void;
}

const PurchaseTicketDialog = ({
  open,
  onOpenChange,
  eventTitle,
  eventId,
  price,
  onPurchaseComplete
}: PurchaseTicketDialogProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  
  const isFree = price === "Free";
  const totalPrice = isFree ? "0" : (parseFloat(price) * quantity).toFixed(2);

  const handlePurchase = async () => {
    try {
      setIsProcessing(true);
      // Simulate API call for payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      toast({
        title: "Registration successful!",
        description: `You've registered for ${quantity} ticket${quantity > 1 ? 's' : ''} to ${eventTitle}.`,
      });
      
      if (onPurchaseComplete) {
        onPurchaseComplete();
      }
      
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "There was an error processing your registration. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Register for Event</DialogTitle>
          <DialogDescription>
            {isFree 
              ? "Register for this free event."
              : "Complete your registration for this event."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <h3 className="font-medium">{eventTitle}</h3>
            <p className="text-sm text-muted-foreground">
              Price: {isFree ? "Free" : `NPR ${price} per ticket`}
            </p>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantity
            </Label>
            <Input
              id="quantity"
              type="number"
              min={1}
              max={10}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="col-span-3"
            />
          </div>

          {!isFree && (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cardNumber" className="text-right">
                  Card Number
                </Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nameOnCard" className="text-right">
                  Name
                </Label>
                <Input
                  id="nameOnCard"
                  placeholder="John Doe"
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="col-start-2 col-span-1">
                  <Label htmlFor="expiry" className="block mb-2">
                    Expiry
                  </Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="cvc" className="block mb-2">
                    CVC
                  </Label>
                  <Input id="cvc" placeholder="123" />
                </div>
              </div>
            </>
          )}

          <div className="pt-2 text-right">
            <p className="font-bold text-lg">
              Total: {isFree ? "Free" : `NPR ${totalPrice}`}
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handlePurchase} disabled={isProcessing} className="gradient-bg">
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-4 w-4" />
                {isFree ? "Register Now" : "Register & Pay"}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseTicketDialog;
