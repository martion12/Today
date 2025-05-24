"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LogEntry } from "@/types";
import { MessageCircle } from "lucide-react";

interface PraiseDisplayProps {
  log?: LogEntry;
}

const PraiseDisplay: React.FC<PraiseDisplayProps> = ({ log }) => {
  if (!log) {
    return null;
  }

  return (
    <Card className="w-full bg-white dark:bg-gray-800 shadow-sm border-none overflow-hidden">
      <CardContent className="pt-6">
        <div className="bg-[#F8F8F8] dark:bg-gray-700 p-4 rounded-lg relative mb-4">
          <p className="text-gray-700 dark:text-gray-200 text-sm mb-2">{log.content}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(log.timestamp).toLocaleString("zh-CN", {
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        
        <div className="bg-[#B2E281] dark:bg-[#95D369] p-4 rounded-lg relative mt-6 ml-auto mr-0 max-w-[85%]">
          <div className="absolute -top-2 right-4 transform w-4 h-4 bg-[#B2E281] dark:bg-[#95D369] rotate-45"></div>
          <p className="text-gray-800 text-sm">{log.praise}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PraiseDisplay;