"use client";

import { CheckCircle2, Circle, Loader2 } from "lucide-react";

type Props = {
    status: string;
    progress: number;
    currentStage: string;
};

const STEPS = [
    {
        key: "CLONING",
        title: "Clone Repository",
    },
    {
        key: "PARSING",
        title: "Scan & Parse Files",
    },
    {
        key: "GRAPH",
        title: "Build Knowledge Graph",
    },
    {
        key: "CHUNKING",
        title: "Generate Semantic Chunks",
    },
    {
        key: "EMBEDDING",
        title: "Generate Embeddings",
    },
    {
        key: "INDEXING",
        title: "Build Hybrid Search",
    },
];

export default function RepositoryTimeline({
    status,
    progress,
    currentStage,
}: Props) {

    const currentIndex = STEPS.findIndex(
        (step) => step.key === status.toUpperCase()
    );

    return (
        <div
            className="
                rounded-2xl
                border
                border-yellow-500/30
                bg-yellow-500/10
                p-4
                md:p-6
            "
        >
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

                <div>

                    <h3 className="text-base md:text-lg font-semibold text-yellow-300">
                        🔒 Repository is learning...
                    </h3>

                    <p className="mt-1 text-sm text-yellow-200">
                        Chat will unlock automatically once indexing completes.
                    </p>

                </div>

                <span className="self-start md:self-auto text-base md:text-lg font-bold text-yellow-300">
                    {progress}%
                </span>

            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-zinc-800">

                <div
                    className="h-full rounded-full bg-violet-500 transition-all duration-500"
                    style={{
                        width: `${progress}%`,
                    }}
                />

            </div>

            <div className="mt-5 text-xs md:text-sm text-zinc-300">

                Current Stage

                <span className="ml-2 font-semibold text-white">

                    {currentStage}

                </span>

            </div>

            <div className="mt-6 space-y-3">

                {STEPS.map((step, index) => {

                    const completed =
                        index < currentIndex;

                    const current =
                        index === currentIndex;

                    return (

                        <div
                            key={step.key}
                            className="flex items-center gap-3"
                        >

                            {completed ? (

                                <CheckCircle2
                                    className="h-5 w-5 text-green-500"
                                />

                            ) : current ? (

                                <Loader2
                                    className="h-5 w-5 animate-spin text-violet-400"
                                />

                            ) : (

                                <Circle
                                    className="h-5 w-5 text-zinc-600"
                                />

                            )}

                            <span
                                className={`
                                    text-sm md:text-base
                                    ${
                                        completed
                                            ? "text-green-400"
                                            : current
                                            ? "text-white"
                                            : "text-zinc-500"
                                    }
                                `}
                            >

                                {step.title}

                            </span>

                        </div>

                    );

                })}

            </div>

        </div>
    );
}