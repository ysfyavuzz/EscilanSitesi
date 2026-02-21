import React, { useRef, useEffect, useState } from 'react';
import { FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';
import { Loader2 } from 'lucide-react';

interface FaceMaskOverlayProps {
    imageUrl: string;
    onFaceDetected?: (detected: boolean) => void;
    maskStyle?: 'lace' | 'minimal' | 'luxury';
}

export function FaceMaskOverlay({ imageUrl, onFaceDetected, maskStyle = 'luxury' }: FaceMaskOverlayProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [faceLandmarker, setFaceLandmarker] = useState<FaceLandmarker | null>(null);

    useEffect(() => {
        async function setupFaceLandmarker() {
            const vision = await FilesetResolver.forVisionTasks(
                "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
            );
            const landmarker = await FaceLandmarker.createFromOptions(vision, {
                baseOptions: {
                    modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
                    delegate: "GPU"
                },
                outputFaceBlendshapes: true,
                runningMode: "IMAGE",
                numFaces: 1
            });
            setFaceLandmarker(landmarker);
            setIsLoading(false);
        }
        setupFaceLandmarker();
    }, []);

    useEffect(() => {
        if (!faceLandmarker || !imageRef.current) return;

        const detectFace = async () => {
            const results = await faceLandmarker.detect(imageRef.current!);
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext('2d');

            if (!ctx || !canvas || results.faceLandmarks.length === 0) {
                onFaceDetected?.(false);
                return;
            }

            onFaceDetected?.(true);
            const landmarks = results.faceLandmarks[0];

            // Canvas boyutlarını resme göre ayarla
            canvas.width = imageRef.current!.naturalWidth;
            canvas.height = imageRef.current!.naturalHeight;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Maske Çizimi (Basit bir siyah bant veya tasarım)
            // Gözlerin koordinatlarını bul (Landmark 33, 133 sol göz - 362, 263 sağ göz)
            const leftEye = landmarks[33];
            const rightEye = landmarks[263];

            const eyeCenterY = (leftEye.y + rightEye.y) / 2 * canvas.height;
            const eyeCenterX = (leftEye.x + rightEye.x) / 2 * canvas.width;
            const eyeDist = Math.abs(rightEye.x - leftEye.x) * canvas.width;

            // Lüks Maske Çizimi
            ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
            ctx.beginPath();
            // Göz çevresini kapsayan şık bir bant
            const maskWidth = eyeDist * 2.5;
            const maskHeight = eyeDist * 1.2;

            ctx.ellipse(
                eyeCenterX,
                eyeCenterY,
                maskWidth / 2,
                maskHeight / 2,
                0, 0, Math.PI * 2
            );
            ctx.fill();

            // Süslemeler (Luxury effect)
            ctx.strokeStyle = '#D4AF37'; // Altın rengi
            ctx.lineWidth = 4;
            ctx.stroke();
        };

        if (imageRef.current?.complete) {
            detectFace();
        } else {
            imageRef.current!.onload = detectFace;
        }
    }, [faceLandmarker, imageUrl]);

    return (
        <div ref={containerRef} className="relative w-full h-full group">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-md z-10">
                    <Loader2 className="h-8 w-8 animate-spin text-rose-500" />
                </div>
            )}
            <img
                ref={imageRef}
                src={imageUrl}
                alt="Original"
                crossOrigin="anonymous"
                className="w-full h-full object-cover"
            />
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
            />
            <div className="absolute bottom-4 right-4 bg-zinc-900/80 backdrop-blur-md text-white text-[10px] px-3 py-1.5 rounded-md border border-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity">
                AI Yüz Koruması Aktif (MediaPipe)
            </div>
        </div>
    );
}
