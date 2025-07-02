import { useState } from "react";
import { motion } from "framer-motion";
import { Copy } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface CopyButtonProps {
  textToCopy: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      toast.success("Message copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("Failed to copy message.");
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="ml-2"
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={handleCopy}
        className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
      >
        <Copy className="h-4 w-4" />
      </Button>
    </motion.div>
  );
};
