"use client";

import { useState } from "react";

type ChatInputProps = {
  onSend: (question: string) => void;
  disabled?: boolean;

  isStreaming: boolean;

  stopGeneration: () => void;

  repositoryReady?: boolean;
};

export default function ChatInput({
  onSend,
  disabled,
  isStreaming,
  stopGeneration,
  repositoryReady = true,
}: ChatInputProps) {

  const [question, setQuestion] = useState("");

  function handleSend() {

    if (!question.trim()) return;

    onSend(question);

    setQuestion("");
  }

  return (

    <div className="border-t border-[#303030] p-3 md:p-4 bg-zinc-950">

    <div className="flex flex-col md:flex-row gap-3 text-white placeholder:text-zinc-500">


      <input
        disabled={!repositoryReady || disabled}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
        placeholder={
            repositoryReady
                ? "Message Project Helix..."
                : "Repository is still being prepared..."
        }
        className="
          flex-1
          rounded-xl
          bg-zinc-900
            border
            border-zinc-800
            focus:border-violet-500
            transition-all
          px-5
          py-3
          outline-none
        "
      />

      {isStreaming ? (

        <button
          onClick={stopGeneration}
          className="
            bg-red-600
            hover:bg-red-500
            w-full
            md:w-auto
            px-7
            py-3
            rounded-xl
          "
        >
          Stop
        </button>

      ) : (

        <button
          onClick={handleSend}
          disabled={disabled || !repositoryReady}
          className={`
            w-full
            md:w-auto
            px-7
            py-4
            rounded-xl
            font-medium
            transition-all
            ${
                repositoryReady
                    ? "bg-violet-600 hover:bg-violet-500"
                    : "bg-zinc-700 cursor-not-allowed"
            }
        `}
        >
          Send
        </button>

      )}

    </div>
    </div>

  );
}