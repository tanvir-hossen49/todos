import { useToast } from "@/components/ui/use-toast";

export const useToastHelper = () => {
  const { toast } = useToast();

  const showToastMsg = (info) => {
    toast({...info});
  };

  return { showToastMsg };
};
