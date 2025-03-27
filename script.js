document.addEventListener('DOMContentLoaded', () => {
    const balloonsContainer = document.getElementById('balloons');
    const flyingChocolates = document.querySelector('.flying-chocolates');
    const surroundingChocolates = document.querySelector('.surrounding-chocolates');
    const moreBtn = document.getElementById('moreBtn');
    const cover = document.getElementById('cover');
    
    // Don't create initial elements until cover is opened
    let elementsCreated = false;
    
    // Cover click event
    cover.addEventListener('click', () => {
        cover.classList.add('hidden');
        
        // Only create elements the first time
        if (!elementsCreated) {
            // Create initial balloons
            createBalloons(10);
            
            // Create initial chocolates
            createChocolates(10);
            
            // Create surrounding chocolates
            createSurroundingChocolates(20);
            
            // Start continuous creation
            startContinuousCreation();
            
            elementsCreated = true;
        }
    });
    
    // More button - adds more chocolates
    moreBtn.addEventListener('click', () => {
        // Add more balloons and chocolates
        createBalloons(5);
        createChocolates(15);
        
        // Shake the button
        moreBtn.classList.add('shake');
        setTimeout(() => {
            moreBtn.classList.remove('shake');
        }, 500);
    });
    
    // Create surrounding chocolates
    function createSurroundingChocolates(count) {
        const chocolateTypes = [
            { bg: '#3D1E09', filling: '#c67c4e' },
            { bg: '#5D2906', filling: '#d4a56a' },
            { bg: '#8B4513', filling: '#ffa000' },
            { bg: '#654321', filling: '#e3b778' }
        ];
        
        for (let i = 0; i < count; i++) {
            const chocolate = document.createElement('div');
            
            // Random properties
            const size = Math.random() * 30 + 20; // 20-50px
            const angle = Math.random() * 360;
            const distance = 150 + Math.random() * 50; // 150-200px from center
            const isRound = Math.random() > 0.5;
            const type = chocolateTypes[Math.floor(Math.random() * chocolateTypes.length)];
            
            // Calculate position based on angle and distance
            const x = Math.cos(angle * Math.PI / 180) * distance;
            const y = Math.sin(angle * Math.PI / 180) * distance;
            
            // Apply styles
            chocolate.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: ${type.bg};
                border-radius: ${isRound ? '50%' : '6px'};
                top: 50%;
                left: 50%;
                transform: translate(${x}px, ${y}px) rotate(${Math.random() * 360}deg);
                box-shadow: 0 3px 10px rgba(0,0,0,0.2);
                z-index: ${Math.floor(Math.random() * 5)};
            `;
            
            // Add filling
            const filling = document.createElement('div');
            filling.style.cssText = `
                position: absolute;
                width: 60%;
                height: 60%;
                background: ${type.filling};
                border-radius: ${isRound ? '50%' : '4px'};
                top: 20%;
                left: 20%;
            `;
            
            chocolate.appendChild(filling);
            surroundingChocolates.appendChild(chocolate);
        }
    }
    
    // Create balloons function
    function createBalloons(count) {
        const colors = ['#FF6B6B', '#4ECDC4', '#F9D423', '#A177FF', '#3EC1D3', '#FF9A00', '#FF85EA', '#74F2CE'];
        
        for (let i = 0; i < count; i++) {
            const balloon = document.createElement('div');
            balloon.classList.add('balloon');
            
            // Random properties
            const size = Math.random() * 40 + 50; // 50-90px
            const color = colors[Math.floor(Math.random() * colors.length)];
            const left = Math.random() * 100; // random position
            const delay = Math.random() * 5; // 0-5s delay
            const duration = Math.random() * 10 + 15; // 15-25s duration
            const wander = (Math.random() * 200 - 100) + 'px'; // random horizontal drift
            const spin = (Math.random() * 360) + 'deg'; // random rotation
            
            // Apply styles
            balloon.style.cssText = `
                width: ${size}px;
                height: ${size * 1.3}px;
                background: ${color};
                left: ${left}%;
                animation-duration: ${duration}s;
                animation-delay: ${delay}s;
                bottom: -100px;
                --wander: ${wander};
                --spin: ${spin};
            `;
            
            // Add shadow/highlight effect to balloon
            const highlight = document.createElement('div');
            highlight.style.cssText = `
                position: absolute;
                width: 30%;
                height: 30%;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                top: 15%;
                left: 15%;
            `;
            
            balloon.appendChild(highlight);
            balloonsContainer.appendChild(balloon);
            
            // Remove balloon after animation completes
            setTimeout(() => {
                balloon.remove();
            }, (duration + delay) * 1000);
        }
    }
    
    // Create chocolates function
    function createChocolates(count) {
        const chocolateTypes = [
            { bg: '#3D1E09', filling: '#c67c4e' },
            { bg: '#5D2906', filling: '#d4a56a' },
            { bg: '#8B4513', filling: '#ffa000' },
            { bg: '#654321', filling: '#e3b778' }
        ];
        
        for (let i = 0; i < count; i++) {
            const chocolate = document.createElement('div');
            chocolate.classList.add('chocolate');
            
            // Random properties
            const size = Math.random() * 20 + 20; // 20-40px
            const left = Math.random() * 90 + 5; // 5-95% (avoid edges)
            const delay = Math.random() * 3; // 0-3s delay
            const duration = Math.random() * 5 + 8; // 8-13s duration
            const isRound = Math.random() > 0.7; // 30% chance for round chocolates
            const type = chocolateTypes[Math.floor(Math.random() * chocolateTypes.length)];
            
            // Apply styles
            chocolate.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${left}%;
                background: ${type.bg};
                animation-duration: ${duration}s;
                animation-delay: ${delay}s;
                border-radius: ${isRound ? '50%' : '5px'};
            `;
            
            // Add filling
            const filling = document.createElement('div');
            filling.style.cssText = `
                position: absolute;
                width: 60%;
                height: 60%;
                background: ${type.filling};
                border-radius: ${isRound ? '50%' : '3px'};
                top: 20%;
                left: 20%;
            `;
            
            chocolate.appendChild(filling);
            flyingChocolates.appendChild(chocolate);
            
            // Remove chocolate after animation completes
            setTimeout(() => {
                chocolate.remove();
            }, (duration + delay) * 1000);
        }
    }
    
    // Function to start continuous creation of elements
    function startContinuousCreation() {
        setInterval(() => {
            createBalloons(1); // Create 1 balloon
            createChocolates(3); // Create 3 chocolates
        }, 1500);
    }
    
    // Add shake animation for the button
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            50% { transform: translateX(5px); }
            75% { transform: translateX(-5px); }
        }
        
        .shake {
            animation: shake 0.5s ease-in-out;
        }
    `;
    document.head.appendChild(style);
}); 