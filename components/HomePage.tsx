"use client";

import React, { useState } from "react";
import LogForm from "./LogForm";
import PraiseDisplay from "./PraiseDisplay";
import { LogEntry } from "@/types";
import { useToast } from "@/hooks/use-toast";
import confetti from 'canvas-confetti';

const HomePage = () => {
  const [currentLog, setCurrentLog] = useState<LogEntry | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const triggerCelebration = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 1000,
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      scalar: 0.8,
    });

    fire(0.2, {
      spread: 60,
      scalar: 1.2,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
      scalar: 1.2,
    });
  };

  const handleNewLog = async (content: string) => {
    if (!content.trim()) {
      toast({
        title: "请输入内容",
        description: "请先记录你今天做了什么",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/praise", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error("获取夸奖失败");
      }

      const data = await response.json();
      
      const newLog: LogEntry = {
        id: Date.now().toString(),
        content,
        praise: data.praise,
        timestamp: new Date().toISOString(),
      };

      setCurrentLog(newLog);
      
      toast({
        title: "提交成功",
        description: "看看专属夸奖吧！",
      });

      // Trigger celebration effect
      triggerCelebration();
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "出错了",
        description: "获取夸奖失败，请稍后再试",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#EDEDED] dark:bg-gray-900">
      <header className="sticky top-0 z-10 flex items-center justify-center py-4 bg-[#07C160] dark:bg-[#1AAD19] shadow-md">
        <h1 className="text-xl font-bold text-white">今天你也太棒了</h1>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6 max-w-md space-y-6">
        <div className="space-y-6">
          <LogForm onSubmit={handleNewLog} isSubmitting={isSubmitting} />
          {currentLog && <PraiseDisplay log={currentLog} />}
        </div>
      </main>

      <footer className="py-4 text-center text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        © 2025 今天你也太棒了 - 每天为自己点赞
      </footer>
    </div>
  );
};

export default HomePage;