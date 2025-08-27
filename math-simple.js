// Math utility functions for interactive math lessons
// Common mathematical functions and constants used across the project

// Mathematical constants
const PI = Math.PI;
const E = Math.E;

// Basic mathematical functions
function deg2rad(degrees) {
    return degrees * (PI / 180);
}

function rad2deg(radians) {
    return radians * (180 / PI);
}

// Linear algebra utilities
function dotProduct(a, b) {
    if (a.length !== b.length) {
        throw new Error('Vectors must have the same length');
    }
    return a.reduce((sum, val, i) => sum + val * b[i], 0);
}

function vectorNorm(vector) {
    return Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
}

function normalize(vector) {
    const norm = vectorNorm(vector);
    return norm === 0 ? vector : vector.map(val => val / norm);
}

// Matrix operations
function matrixMultiply(A, B) {
    const rows = A.length;
    const cols = B[0].length;
    const inner = B.length;
    
    if (A[0].length !== inner) {
        throw new Error('Matrix dimensions do not match for multiplication');
    }
    
    const result = Array(rows).fill().map(() => Array(cols).fill(0));
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            for (let k = 0; k < inner; k++) {
                result[i][j] += A[i][k] * B[k][j];
            }
        }
    }
    
    return result;
}

function matrixTranspose(matrix) {
    return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
}

// Statistical functions
function mean(array) {
    return array.reduce((sum, val) => sum + val, 0) / array.length;
}

function variance(array) {
    const m = mean(array);
    return array.reduce((sum, val) => sum + Math.pow(val - m, 2), 0) / array.length;
}

function standardDeviation(array) {
    return Math.sqrt(variance(array));
}

// Signal processing utilities
function generateSineWave(frequency, amplitude, phase, sampleRate, duration) {
    const samples = Math.floor(sampleRate * duration);
    const signal = [];
    
    for (let i = 0; i < samples; i++) {
        const t = i / sampleRate;
        signal.push(amplitude * Math.sin(2 * PI * frequency * t + phase));
    }
    
    return signal;
}

function generateWhiteNoise(amplitude, samples) {
    const noise = [];
    for (let i = 0; i < samples; i++) {
        noise.push(amplitude * (2 * Math.random() - 1));
    }
    return noise;
}

// Numerical methods
function derivative(func, x, h = 1e-7) {
    return (func(x + h) - func(x - h)) / (2 * h);
}

function integral(func, a, b, n = 1000) {
    const dx = (b - a) / n;
    let sum = 0;
    
    for (let i = 0; i < n; i++) {
        const x = a + i * dx;
        sum += func(x) * dx;
    }
    
    return sum;
}

// Optimization utilities
function gradientDescent(func, grad, x0, learningRate = 0.01, maxIter = 1000, tolerance = 1e-6) {
    let x = [...x0];
    const history = [x.slice()];
    
    for (let i = 0; i < maxIter; i++) {
        const gradient = grad(x);
        let newX = x.map((xi, j) => xi - learningRate * gradient[j]);
        
        if (vectorNorm(gradient) < tolerance) {
            break;
        }
        
        x = newX;
        history.push(x.slice());
    }
    
    return { x, history };
}

// Interpolation
function linearInterpolation(x0, y0, x1, y1, x) {
    return y0 + (y1 - y0) * (x - x0) / (x1 - x0);
}

function bilinearInterpolation(x0, y0, x1, y1, f00, f01, f10, f11, x, y) {
    const fx0 = linearInterpolation(y0, f00, y1, f01, y);
    const fx1 = linearInterpolation(y0, f10, y1, f11, y);
    return linearInterpolation(x0, fx0, x1, fx1, x);
}

// Array utilities
function linspace(start, end, num) {
    const step = (end - start) / (num - 1);
    return Array.from({ length: num }, (_, i) => start + i * step);
}

function meshgrid(x, y) {
    const X = [];
    const Y = [];
    
    for (let i = 0; i < y.length; i++) {
        X.push([...x]);
        Y.push(Array(x.length).fill(y[i]));
    }
    
    return { X, Y };
}

// Complex number operations
class Complex {
    constructor(real, imag = 0) {
        this.real = real;
        this.imag = imag;
    }
    
    add(other) {
        return new Complex(this.real + other.real, this.imag + other.imag);
    }
    
    subtract(other) {
        return new Complex(this.real - other.real, this.imag - other.imag);
    }
    
    multiply(other) {
        return new Complex(
            this.real * other.real - this.imag * other.imag,
            this.real * other.imag + this.imag * other.real
        );
    }
    
    magnitude() {
        return Math.sqrt(this.real * this.real + this.imag * this.imag);
    }
    
    phase() {
        return Math.atan2(this.imag, this.real);
    }
}

// Color utilities for visualizations
function hslToRgb(h, s, l) {
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    
    let r, g, b;
    
    if (h < 60) {
        [r, g, b] = [c, x, 0];
    } else if (h < 120) {
        [r, g, b] = [x, c, 0];
    } else if (h < 180) {
        [r, g, b] = [0, c, x];
    } else if (h < 240) {
        [r, g, b] = [0, x, c];
    } else if (h < 300) {
        [r, g, b] = [x, 0, c];
    } else {
        [r, g, b] = [c, 0, x];
    }
    
    return [
        Math.round((r + m) * 255),
        Math.round((g + m) * 255),
        Math.round((b + m) * 255)
    ];
}

function colormap(value, min = 0, max = 1) {
    const normalized = Math.max(0, Math.min(1, (value - min) / (max - min)));
    const hue = (1 - normalized) * 240; // Blue to red
    const [r, g, b] = hslToRgb(hue, 1, 0.5);
    return `rgb(${r}, ${g}, ${b})`;
}

// Export for use in other scripts (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PI, E, deg2rad, rad2deg,
        dotProduct, vectorNorm, normalize,
        matrixMultiply, matrixTranspose,
        mean, variance, standardDeviation,
        generateSineWave, generateWhiteNoise,
        derivative, integral,
        gradientDescent,
        linearInterpolation, bilinearInterpolation,
        linspace, meshgrid,
        Complex,
        hslToRgb, colormap
    };
}
