"use client"; // Required if using Next.js app directory

import React, { useEffect, useRef } from "react";

const CanvasMolecules: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d")!;
        if (!ctx) return;

        const gravity = 0.6;
        const purpleImage = new Image();
        purpleImage.src = "/purple.png";
        const yellowImage = new Image();
        yellowImage.src = "/yellow.png";

        interface Molecule {
            x: number;
            y: number;
            velocityY: number;
            radius: number;
            image: HTMLImageElement;
            hasDropped: boolean;
            draw: (ctx: CanvasRenderingContext2D) => void;
            update: () => void;
        }

        const molecules: Molecule[] = [];

        function createMolecule(x: number, image: HTMLImageElement): Molecule {
            const bounceFactor = -0.7;
            const friction = 0.98;
            const minVelocity = 0.5;

            return {
                x,
                y: 0, // Start at the top of the canvas
                velocityY: Math.random() * 2,
                radius: 20,
                image,
                hasDropped: false,
                draw(context) {
                    context.drawImage(this.image, this.x, this.y, this.radius * 2, this.radius * 2);
                },
                update() {
                    this.y += this.velocityY;
                    this.velocityY += gravity;

                    if (this.y + this.radius * 2 >= canvas.height) {
                        this.y = canvas.height - this.radius * 2;
                        this.velocityY *= bounceFactor; 
                        this.velocityY *= friction;

                        if (Math.abs(this.velocityY) < minVelocity) {
                            this.velocityY = 0;
                            this.hasDropped = true;
                        }
                    }
                }
            };
        }

        function addRandomMolecule() {
            const maxMolecules = 200;
            if(molecules.length < maxMolecules){
                const x = Math.random() * (canvas.width - 40);
                const image = Math.random() < 0.5 ? purpleImage : yellowImage;
                molecules.push(createMolecule(x, image));
            }
           
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            molecules.forEach((molecule, index) => {
                molecule.update();
                molecule.draw(ctx);

                if (molecule.hasDropped && molecule.velocityY === 0) {
                    molecules.splice(index, 1);
                }
            });

            requestAnimationFrame(animate);
        }


        animate();


        const moleculeInterval = setInterval(addRandomMolecule, 500);

        return () => {
            clearInterval(moleculeInterval);
            molecules.length = 0; 
        };
    }, []);

    return (
        <div className="flex flex-col items-center">
            <canvas
                ref={canvasRef}
                width={350}
                height={350}
                className="border-2 border-black bg-white rounded-lg shadow-lg"
            ></canvas>
        </div>
    );
};

export default CanvasMolecules;
