/**
 * Standardized MathJax Configuration for Interactive Math Lessons
 * This configuration includes all necessary packages and macros for mathematical notation
 */

window.MathJax = {
    tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']],
        packages: {'[+]': ['ams', 'newcommand', 'mathtools', 'physics']},
        macros: {
            // Custom vector and matrix notation
            vb: ['\\mathbf{#1}', 1],           // vector bold
            mb: ['\\mathbf{#1}', 1],           // matrix bold
            boldsymbol: ['\\mathbf{#1}', 1],   // boldsymbol using mathbf
            
            // Custom differential operators
            diff: ['\\mathrm{d}'],
            
            // Custom sets notation
            R: ['\\mathbb{R}'],
            N: ['\\mathbb{N}'],
            Z: ['\\mathbb{Z}'],
            C: ['\\mathbb{C}'],
            
            // Custom optimization notation
            minimize: ['\\text{minimize}'],
            maximize: ['\\text{maximize}'],
            st: ['\\text{subject to}'],
            
            // Custom signal processing
            FFT: ['\\text{FFT}'],
            IFFT: ['\\text{IFFT}'],
            DFT: ['\\text{DFT}'],
            IDFT: ['\\text{IDFT}']
        }
    },
    svg: {
        fontCache: 'global',
        scale: 1.1,
        minScale: 0.5,
        mtextInheritFont: false,
        merrorInheritFont: true,
        mathmlSpacing: false,
        skipAttributes: {},
        exFactor: 0.5,
        displayAlign: 'center',
        displayIndent: '0'
    },
    startup: {
        ready: () => {
            console.log('MathJax is loaded and ready.');
            MathJax.startup.defaultReady();
        }
    },
    options: {
        enableMenu: true,
        menuOptions: {
            settings: {
                zoom: 'DoubleClick'
            }
        }
    }
};
