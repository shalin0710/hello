document.addEventListener('DOMContentLoaded', () => {
    const boxLid = document.getElementById('boxLid');
    const forgiveMeBtn = document.getElementById('forgiveMeBtn');
    const celebrationSection = document.getElementById('celebration');
    const fallingChocolates = document.getElementById('fallingChocolates');
    
    // Open box lid on click
    boxLid.addEventListener('click', function() {
        this.classList.toggle('open');
    });
    
    // Add hover effects to chocolates
    const chocolates = document.querySelectorAll('.chocolate');
    chocolates.forEach(chocolate => {
        // Add random filling colors and patterns
        const filling = chocolate.querySelector('.chocolate-filling');
        
        // Add random pattern to some chocolates
        if (Math.random() > 0.5) {
            const pattern = document.createElement('div');
            pattern.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 60%;
                height: 60%;
                background: rgba(255, 255, 255, 0.2);
                clip-path: ${getRandomPattern()};
            `;
            filling.appendChild(pattern);
        }
        
        // Add shimmer effect
        const shimmer = document.createElement('div');
        shimmer.style.cssText = `
            position: absolute;
            top: -100%;
            left: -100%;
            width: 300%;
            height: 300%;
            background: linear-gradient(
                135deg, 
                rgba(255,255,255,0) 0%,
                rgba(255,255,255,0.1) 50%,
                rgba(255,255,255,0) 100%
            );
            animation: shimmer 3s ease-in-out infinite;
        `;
        
        const shimmerKeyframes = document.createElement('style');
        shimmerKeyframes.type = 'text/css';
        shimmerKeyframes.textContent = `
            @keyframes shimmer {
                0% { transform: translateX(-50%) translateY(-50%) rotate(0); }
                100% { transform: translateX(-50%) translateY(-50%) rotate(360deg); }
            }
        `;
        document.head.appendChild(shimmerKeyframes);
        
        filling.appendChild(shimmer);
    });
    
    // Forgive button functionality
    forgiveMeBtn.addEventListener('click', function() {
        celebrationSection.classList.add('active');
        createFallingChocolates();
    });
    
    // Create falling chocolates animation
    function createFallingChocolates() {
        const numberOfChocolates = 80;
        
        for (let i = 0; i < numberOfChocolates; i++) {
            const chocolate = document.createElement('div');
            
            // Randomize chocolate appearance
            const size = Math.random() * 30 + 10;
            const positionX = Math.random() * 100;
            const delay = Math.random() * 3;
            const duration = Math.random() * 5 + 3;
            const rotation = Math.random() * 360;
            
            // Random chocolate type
            const isRound = Math.random() > 0.5;
            const chocolateColors = ['#5a2e12', '#3d1e09', '#8B4513', '#654321', '#7d4e22'];
            const fillingColors = ['#ffa000', '#d4a56a', '#c67c4e'];
            const chocolateColor = chocolateColors[Math.floor(Math.random() * chocolateColors.length)];
            const fillingColor = fillingColors[Math.floor(Math.random() * fillingColors.length)];
            
            // Create chocolate element
            chocolate.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${positionX}%;
                top: -50px;
                background: ${chocolateColor};
                border-radius: ${isRound ? '50%' : '4px'};
                box-shadow: 0 3px 10px rgba(0,0,0,0.3);
                transform: rotate(${rotation}deg);
                animation: fallChocolate ${duration}s linear forwards;
                animation-delay: ${delay}s;
                z-index: ${Math.floor(Math.random() * 10)};
                opacity: 0;
            `;
            
            // Add filling to chocolate
            if (Math.random() > 0.3) {
                const filling = document.createElement('div');
                filling.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 60%;
                    height: 60%;
                    background: ${fillingColor};
                    border-radius: ${isRound ? '50%' : '2px'};
                    box-shadow: inset 0 1px 3px rgba(0,0,0,0.2);
                `;
                chocolate.appendChild(filling);
            }
            
            fallingChocolates.appendChild(chocolate);
        }
        
        // Add falling chocolate animation keyframes
        const fallKeyframes = document.createElement('style');
        fallKeyframes.type = 'text/css';
        fallKeyframes.textContent = `
            @keyframes fallChocolate {
                0% {
                    transform: translateY(0) rotate(${Math.random() * 360}deg);
                    opacity: 1;
                }
                80% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(${window.innerHeight * 1.2}px) rotate(${Math.random() * 720}deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(fallKeyframes);
    }
    
    // Click anywhere to close celebration screen
    celebrationSection.addEventListener('click', function() {
        this.classList.remove('active');
    });
    
    // Helper function to get random pattern for chocolate fillings
    function getRandomPattern() {
        const patterns = [
            'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)', // star
            'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)', // octagon
            'circle(50% at 50% 50%)', // circle
            'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', // diamond
            'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' // hexagon
        ];
        return patterns[Math.floor(Math.random() * patterns.length)];
    }
}); 