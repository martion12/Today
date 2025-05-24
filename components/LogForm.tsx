"use client";

import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Loader2 } from "lucide-react";

interface LogFormProps {
  onSubmit: (content: string) => void;
  isSubmitting: boolean;
}

const LogForm: React.FC<LogFormProps> = ({ onSubmit, isSubmitting }) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content);
    }
  };

  return (
    <Card className="w-full bg-white dark:bg-gray-800 shadow-sm border-none">
      <form onSubmit={handleSubmit}>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">记录你的成就</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="今天我..."
            className="min-h-[150px] text-base resize-none focus:ring-[#07C160] focus:border-[#07C160]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isSubmitting}
          />
        </CardContent>
        <CardFooter className="flex justify-end pt-0">
          <Button
            type="submit"
            className="bg-[#07C160] hover:bg-[#1AAD19] text-white"
            disabled={isSubmitting || !content.trim()}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                处理中...
              </>
            ) : (
              <>
                提交 
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LogForm;