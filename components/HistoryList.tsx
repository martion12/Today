"use client";

import React from "react";
import { LogEntry } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface HistoryListProps {
  logs: LogEntry[];
}

const HistoryList: React.FC<HistoryListProps> = ({ logs }) => {
  if (!logs.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-4">
        <p className="text-gray-500 dark:text-gray-400 mb-2">暂无历史记录</p>
        <p className="text-sm text-gray-400 dark:text-gray-500">
          记录你的成就，建立积极的回顾
        </p>
      </div>
    );
  }

  // Group logs by date
  const groupedLogs: { [key: string]: LogEntry[] } = {};
  logs.forEach((log) => {
    const date = new Date(log.timestamp).toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    
    if (!groupedLogs[date]) {
      groupedLogs[date] = [];
    }
    
    groupedLogs[date].push(log);
  });

  return (
    <div className="space-y-6">
      {Object.entries(groupedLogs).map(([date, dateLogs]) => (
        <div key={date} className="space-y-3">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {date}
          </h3>
          <Separator className="my-2" />
          
          {dateLogs.map((log) => (
            <Card 
              key={log.id} 
              className="bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow border-none mb-3"
            >
              <CardContent className="p-4">
                <p className="text-gray-700 dark:text-gray-200 text-sm mb-3">{log.content}</p>
                <div className="bg-[#B2E281] dark:bg-[#95D369] p-3 rounded-lg">
                  <p className="text-gray-800 text-xs">{log.praise}</p>
                </div>
                <p className="text-right text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {new Date(log.timestamp).toLocaleTimeString("zh-CN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ))}
    </div>
  );
};

export default HistoryList;