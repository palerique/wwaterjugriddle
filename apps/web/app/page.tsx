"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Bucket from "../components/Bucket";
import SmallBucket from "../components/SmallBucket";

interface StepDto {
    step: number;
    bucketX: number;
    bucketY: number;
    action: string;
    status?: string;
}

export default function Home() {
    const [x, setX] = useState("");
    const [y, setY] = useState("");
    const [z, setZ] = useState("");
    const [steps, setSteps] = useState<StepDto[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [currentStep, setCurrentStep] = useState<number>(-1);

    const [showScroll, setShowScroll] = useState(false);

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 400) {
            setShowScroll(true);
        } else if (showScroll && window.pageYOffset <= 400) {
            setShowScroll(false);
        }
    };

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        window.addEventListener("scroll", checkScrollTop);
        return () => window.removeEventListener("scroll", checkScrollTop);
    });

    const solveWaterJug = async () => {
        setLoading(true);
        setError("");
        setSteps([]);
        setCurrentStep(-1);

        try {
            const response = await axios.post("/api/solve", {
                x_capacity: x,
                y_capacity: y,
                z_amount_wanted: z,
            });

            if (
                response.data.solution === undefined ||
                response.data.solution.length <= 0
            ) {
                setError(response.data.message || "An error occurred");
            } else {
                setSteps(response.data.solution);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (steps.length > 0) {
            let stepIndex = 0;

            const interval = setInterval(() => {
                setCurrentStep(stepIndex);
                stepIndex++;

                if (stepIndex === steps.length) {
                    clearInterval(interval);
                }
            }, 2000); // 2-second delay for better visualization

            return () => clearInterval(interval);
        }
    }, [steps]);

    let stepDto = steps[currentStep];
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white">
            <h1 className="text-5xl font-bold mb-10">Water Jug Solver</h1>
            <div className="flex flex-row w-full justify-center">
                <div className="bg-white text-black p-8 rounded-lg shadow-md mr-10">
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                            X Capacity
                        </label>
                        <input
                            type="number"
                            value={x}
                            onChange={(e) => {
                                return setX(
                                    String(
                                        Math.max(1, parseInt(e.target.value)),
                                    ),
                                );
                            }}
                            min="1" // disallows negative numbers or zeroes
                            className="w-full px-4 py-2 rounded-lg border focus:ring focus:border-blue-300"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                            Y Capacity
                        </label>
                        <input
                            type="number"
                            value={y}
                            onChange={(e) =>
                                setY(
                                    String(
                                        Math.max(1, parseInt(e.target.value)),
                                    ),
                                )
                            }
                            min="1" // disallows negative numbers or zeroes
                            className="w-full px-4 py-2 rounded-lg border focus:ring focus:border-blue-300"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                            Z Amount Wanted
                        </label>
                        <input
                            type="number"
                            value={z}
                            onChange={(e) =>
                                setZ(
                                    String(
                                        Math.max(1, parseInt(e.target.value)),
                                    ),
                                )
                            }
                            min="1" // disallows negative numbers or zeroes
                            className="w-full px-4 py-2 rounded-lg border focus:ring focus:border-blue-300"
                        />
                    </div>
                    <button
                        onClick={solveWaterJug}
                        disabled={loading}
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                    >
                        {loading ? "Solving..." : "Solve"}
                    </button>
                    {error && (
                        <div className="mt-4 p-4 bg-red-500 text-white rounded-lg">
                            {error}
                        </div>
                    )}
                </div>
                <div className="flex items-center space-x-8">
                    <Bucket
                        capacity={parseInt(x)}
                        current={steps[currentStep ?? 0]?.bucketX ?? 0}
                    />
                    <Bucket
                        capacity={parseInt(y)}
                        current={steps[currentStep ?? 0]?.bucketY ?? 0}
                    />
                </div>
            </div>
            {steps.length > 0 && (
                <div className="mt-10 w-full flex flex-col items-center">
                    <h2 className="text-3xl font-bold mb-6">Solution Steps</h2>
                    <div className="mb-4">
                        {currentStep !== null && stepDto && (
                            <div className="bg-white text-black p-4 mb-4 rounded-lg shadow-md flex flex-col items-center">
                                <span className="font-bold">
                                    Step {stepDto.step}:
                                </span>
                                <span>{stepDto.action}</span>
                                <div className="flex space-x-2 mt-2">
                                    <SmallBucket
                                        name="Bucket X"
                                        capacity={parseInt(x)}
                                        current={stepDto.bucketX}
                                    />
                                    <SmallBucket
                                        name="Bucket Y"
                                        capacity={parseInt(y)}
                                        current={stepDto.bucketY}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-wrap justify-center space-x-2">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className={`bg-white text-black p-4 mb-4 rounded-lg shadow-md flex flex-col items-center transition-opacity duration-1000 ${currentStep === index ? "opacity-100" : "opacity-50"}`}
                            >
                                <span className="font-bold">
                                    Step {step.step}:
                                </span>
                                <span>{step.action}</span>
                                <div className="flex space-x-2 mt-2">
                                    <SmallBucket
                                        name="Bucket X"
                                        capacity={parseInt(x)}
                                        current={step.bucketX}
                                    />
                                    <SmallBucket
                                        name="Bucket Y"
                                        capacity={parseInt(y)}
                                        current={step.bucketY}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <footer className="fixed inset-x-0 bottom-0 w-full text-center border-t border-grey p-4 bg-amber-500 text-blue-950">
                <div className="flex justify-center space-x-4 mt-4">
                    <a
                        href="http://localhost:3002/api#/"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-amber-950"
                    >
                        API Documentation
                    </a>
                    <a
                        href="https://github.com/palerique/wwaterjugriddle"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-amber-950"
                    >
                        Git Repository
                    </a>
                    <a
                        href="http://localhost:8380/kiali/console/graph/namespaces/?traffic=grpc%2CgrpcRequest%2Chttp%2ChttpRequest%2Ctcp%2CtcpSent&graphType=versionedApp&namespaces=default%2Cistio-system&duration=1800&refresh=10000&layout=kiali-dagre&namespaceLayout=kiali-dagre&edges=trafficDistribution%2CtrafficRate%2Cthroughput%2CthroughputRequest%2CresponseTime%2Crt95&animation=true"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-amber-950"
                    >
                        Kiali
                    </a>
                    <a
                        href="https://www.linkedin.com/in/palerique/"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-amber-950"
                    >
                        Find me on LinkedIn
                    </a>
                </div>
            </footer>
            {showScroll && (
                <button
                    className="fixed right-2 bottom-20 bg-blue-500 text-white p-2 rounded-full"
                    onClick={scrollTop}
                >
                    ^ Top
                </button>
            )}
        </div>
    );
}
