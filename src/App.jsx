import { useState, useEffect, useRef } from 'react';
import { Heart, Music, VolumeX, Sparkles, Crown, Coffee, Cat, Ghost } from 'lucide-react';

const ValentinesProposal = () => {
    const [showSuccess, setShowSuccess] = useState(false);
    const [noCount, setNoCount] = useState(0);
    const [yesPressed, setYesPressed] = useState(false);
    const [yesButtonSize, setYesButtonSize] = useState(1);
    const [isMuted, setIsMuted] = useState(true);
    const [isNoButtonVisible, setIsNoButtonVisible] = useState(true);
    const [, setHeartPosition] = useState({ x: 0, y: 0 });
    const [chaos, setChaos] = useState(0);
    const [particles, setParticles] = useState([]);
    const [currentMode, setCurrentMode] = useState('normal');
    const noButtonRef = useRef(null);

    const funnyNoMessages = [
        "Nope! 😢", "Try again! 🥺", "Still no! 😭", "Getting dizzy yet? 😵‍💫",
        "Error 404: Button not clickable 🤖", "Nice try! 😤", "Too slow! 🏃‍♂️",
        "You're persistent! 🎯", "Button goes brrr! 🚀", "Missed again! 🎪",
        "You can't catch me! 🦋", "Oops, too late! ⏰", "Almost... but no! 🎭",
        "You're making me laugh! 🎪", "Still trying? 🎯", "Getting tired yet? 🛏️",
        "I can do this all day! 🦸‍♂️", "Smooth moves! 🕺", "Not even close! 🎯",
        "You're entertaining me! 🎭", "Keep dancing! 💃", "Plot twist: I'm a ghost! 👻",
        "Maybe in another universe! 🌌", "Task failed successfully! 💫",
        "I'm inevitable! 🧤", "Running.exe has crashed! 💻", "404: Click not found! 🔍",
        "You're quite determined! 🎯", "Still here? 👀", "I'm getting dizzy! 🌀","Almost caught a vibe there! 🌳",
        "Your mouse is walking like a game character! 🕹️",
        "Wait, let me check the logs... still no! 📋",
        "You're more persistent than a leg day! 🏋️‍♂️",
        "Is the Pink Phone lagging? 📱",
        "Access Denied: Please provide chocolate to proceed. 🍫",
        "I'm harder to catch than a 400kg squat! 🚀",
        "Getting warmer... but still no! 🌡️",
        "System Update: Button moved to a better location. 📍",
        "Stop crying and just click it! 😂",
    ];

    const modes = {
        normal: { bg: 'bg-pink-100', text: 'text-pink-600', musicId: 'kTJczUoc26U' },
        party: { bg: 'bg-gradient-to-r from-purple-400 via-pink-500 to-red-500', text: 'text-white', musicId: 'RgKAFK5djSk' },
        ghost: { bg: 'bg-gray-900', text: 'text-purple-500', musicId: 'aJOTlE1K90k' },
        coffee: { bg: 'bg-amber-100', text: 'text-amber-800', musicId: 'BcqxLCWn-CE' },
        cat: { bg: 'bg-orange-100', text: 'text-orange-600', musicId: 'SzQG_qK4LVo' }
    };

    useEffect(() => {
        if (noCount === 10) setCurrentMode('party');
        if (noCount === 20) setCurrentMode('ghost');
        if (noCount === 30) setCurrentMode('coffee');
        if (noCount === 40) setCurrentMode('cat');
    }, [noCount]);

    useEffect(() => {
        const interval = setInterval(() => {
            setHeartPosition({
                x: Math.random() * (window.innerWidth - 20),
                y: Math.random() * (window.innerHeight - 20)
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
            const handleMouseMove = (e) => {
                if (noButtonRef.current && !yesPressed) {
                    const rect = noButtonRef.current.getBoundingClientRect();
                    const distance = Math.sqrt(
                        Math.pow(e.clientX - (rect.left + rect.width / 2), 2) +
                        Math.pow(e.clientY - (rect.top + rect.height / 2), 2)
                    );

                    if (distance < 100) {
                        moveNoButton();
                        setNoCount(prev => prev + 1);
                        setChaos(prev => Math.min(prev + 1, 100));
                        createParticles(e.clientX, e.clientY);

                        if (Math.random() < 0.3) {
                            setIsNoButtonVisible(false);
                            setTimeout(() => setIsNoButtonVisible(true), 500);
                        }

                        setYesButtonSize(prev => Math.min(prev + 0.2, 4));
                    }
                }
            };

            document.addEventListener('mousemove', handleMouseMove);
            return () => document.removeEventListener('mousemove', handleMouseMove);
        },
        [noCount, yesPressed]);

    const createParticles = (x, y) => {
        const newParticles = [...Array(5)].map(() => ({
            id: Math.random(),
            x,
            y,
            angle: Math.random() * Math.PI * 2,
            speed: Math.random() * 5 + 2,
            life: 100
        }));
        setParticles(prev => [...prev, ...newParticles]);
        setTimeout(() => setParticles(prev => prev.filter(p => p.life > 0)), 1000);
    };

    const moveNoButton = () => {
        if (noButtonRef.current) {
            const button = noButtonRef.current;
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            let newX, newY;
            if (chaos > 50) {
                // Chaotic movement
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * 300;
                newX = Math.cos(angle) * distance + windowWidth/2;
                newY = Math.sin(angle) * distance + windowHeight/2;
            } else {
                // Regular random movement
                newX = Math.random() * (windowWidth - 100);
                newY = Math.random() * (windowHeight - 40);
            }

            button.style.position = 'fixed';
            button.style.left = `${Math.max(0, Math.min(newX, windowWidth - 100))}px`;
            button.style.top = `${Math.max(0, Math.min(newY, windowHeight - 40))}px`;
            button.style.transform = `
        rotate(${Math.random() * 360}deg) 
        scale(${Math.random() * 0.5 + 0.5}) 
        ${chaos > 75 ? `skew(${Math.random() * 20}deg)` : ''}
      `;
        }
    };

    const handleYesClick = () => {
        setYesPressed(true);
        createParticles(window.innerWidth / 2, window.innerHeight / 2);
        setTimeout(() => setShowSuccess(true), 1000);
    };

    if (showSuccess) {
        return (
            <div className={`min-h-screen ${modes[currentMode].bg} flex flex-col items-center justify-center p-4 text-center relative overflow-hidden`}>
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(30)].map((_, i) => (
                        <Heart
                            key={i}
                            className={`absolute animate-bounce ${modes[currentMode].text}`}
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 2}s`,
                                opacity: 0.5,
                                transform: `scale(${Math.random() * 0.5 + 0.5})`
                            }}
                            size={24}
                        />
                    ))}
                </div>
                <div className="z-10 bg-white/80 p-8 rounded-xl backdrop-blur-sm shadow-xl">
                    <Crown className="w-16 h-16 mx-auto mb-4 text-yellow-500 animate-bounce" />
                    <h1 className="text-4xl font-bold text-pink-600 mb-4 animate-pulse">
                        💖 IT&#39;S OFFICIAL! 💖
                    </h1>
                    <iframe
                        width="0"
                        height="0"
                        src="https://www.youtube.com/embed/et1M7Kky1OE?autoplay=1"
                        allow="autoplay"
                        className="hidden"
                    ></iframe>
                    <div className="space-y-4 max-w-md mx-auto">
                        <p className="text-xl text-pink-500">
                            After {noCount} attempts to escape destiny,
                            you&#39;ve finally embraced the
                            inevitable 😭! {Math.floor(noCount * 1.5)} mouse kilometers traveled...
                        </p>
                        <span className="text-xl text-pink-500 font-bold">You caught the button (and my heart)! No more running—you&#39;re officially my favorite Valentine.</span>
                        <p className="text-lg text-pink-600 italic">
                            I might walk like a game character, but I&#39;m glad I walked into you.
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center my-4">
                            {noCount > 10 && <span className="px-3 py-1 bg-purple-200 rounded-full text-sm">Favorite Person ❤️</span>}
                            {noCount > 20 && <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">Kinder Joy Queen 🍫</span>}
                            {noCount > 30 && <span className="px-3 py-1 bg-amber-200 rounded-full text-sm">Finally Mine ✨</span>}
                            {noCount > 40 && <span className="px-3 py-1 bg-orange-200 rounded-full text-sm">Cat Whisperer 🐱</span>}
                        </div>
                        <p className="text-lg text-pink-600 animate-pulse">
                            Achievements Unlocked:
                            {noCount > 50 ? " Legendary Heart-Hacker 👑" :
                                noCount > 30 ? " Most Persistent Favorite 💖" :
                                    noCount > 20 ? " Dedicated Vibe-Finder 🔍" :
                                        " Instant Match Found ⚡"}
                        </p>
                        <div className="text-sm text-pink-400 mt-6 font-mono border-t border-pink-100 pt-4">
                            <p>System Status: Connection Secured 🔐</p>
                            <p>Location: Far away from the dustbins, just us. 🌳</p>
                            <p>Timestamp: {new Date().toLocaleString()}</p>
                            <p className="text-xs mt-2 text-pink-500 font-bold">
                                * No more crying. Only Kinder Joys from now on. 😘
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${modes[currentMode].bg} flex flex-col items-center justify-center p-4 relative overflow-hidden transition-colors duration-500`}>
            {particles.map(particle => (
                <div
                    key={particle.id}
                    className="absolute w-2 h-2 bg-pink-500 rounded-full pointer-events-none"
                    style={{
                        left: particle.x,
                        top: particle.y,
                        transform: `translate(-50%, -50%)`,
                        opacity: particle.life / 100
                    }}
                />
            ))}

            <button
                onClick={() => setIsMuted(!isMuted)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/50 hover:bg-white/80 transition-colors"
            >
                {isMuted ? <VolumeX className={modes[currentMode].text} /> : <Music className={modes[currentMode].text} />}
                {/* Music changes automatically based on currentMode */}
                {!isMuted && (
                    <iframe
                        width="0"
                        height="0"
                        src={`https://www.youtube.com/embed/${showSuccess ? 'QJO3ROT-A4E' : modes[currentMode].musicId}?autoplay=1`}
                        allow="autoplay"
                        className="hidden"
                    ></iframe>
                )}
            </button>

            {currentMode === 'party' && <Sparkles className="absolute top-8 left-8 text-yellow-500 animate-spin" />}
            {currentMode === 'ghost' && <Ghost className="absolute bottom-8 right-8 text-purple-500 animate-bounce" />}
            {currentMode === 'coffee' && <Coffee className="absolute top-8 right-8 text-amber-800 animate-pulse" />}
            {currentMode === 'cat' && <Cat className="absolute bottom-8 left-8 text-orange-500 animate-bounce" />}

            <div className={`text-center ${noCount > 5 ? 'animate-bounce' : ''}`}>
                <img
                    src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2doZXl4eWYzM3I0cmN5YWR5eThvZzR4d2s1YjFzZHZ5OWs3d2ZpdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2dQ3FMaMFccpi/giphy.gif"
                    alt="Love emoji"
                    className={`w-64 h-64 mx-auto rounded-lg mb-8 
            ${noCount > 20 ? 'animate-spin' :
                        noCount > 10 ? 'animate-bounce' : ''}`}
                />
                <h1 className={`text-4xl font-bold ${modes[currentMode].text} mb-8`}>
                    {noCount === 0 ? "Will you be my Valentine? 🌹" :
                        noCount < 10 ? "Each 'no' makes my heart grow stronger! 💪" :
                            noCount < 20 ? "You're making this way too fun! 🎪" :
                                noCount < 30 ? "I can see you're enjoying this! 🎭" :
                                    noCount < 40 ? "We're creating memories here! 📸" :
                                        "This is going in our love story! 📖"}
                </h1>
            </div>

            <div className="flex gap-4 items-center">
                <button
                    onClick={handleYesClick}
                    style={{ transform: `scale(${yesButtonSize})` }}
                    className={`px-8 py-4 bg-pink-500 text-white rounded-lg text-xl font-bold 
            transition-all duration-300 hover:bg-pink-600 
            ${yesPressed ? 'animate-bounce' : 'hover:animate-pulse'}`}
                >
                    {noCount === 0 ? "Yes! 😊" :
                        noCount < 10 ? "YESS! 🥰" :
                            noCount < 20 ? "YES PLEASE! 😍" :
                                noCount < 30 ? "ABSOLUTELY YES! 💝" :
                                    noCount < 40 ? "YES YES YES! 💖" :
                                        "OMG YES ALREADY! 💗"}
                </button>

                {isNoButtonVisible && (
                    <button
                        ref={noButtonRef}
                        className={`px-8 py-4 bg-gray-500 text-white rounded-lg text-xl font-bold 
              transition-all duration-200 hover:bg-gray-600 
              ${chaos > 50 ? 'animate-pulse' : ''}`}
                    >
                        {funnyNoMessages[Math.min(noCount, funnyNoMessages.length - 1)]}
                    </button>
                )}
            </div>

            {noCount > 0 && (
                <div className={`mt-8 ${modes[currentMode].text} text-center animate-pulse`}>
                    <p>Escape attempts: {noCount} | Chaos level: {chaos}%</p>
                    {chaos > 75 && <p className="text-sm">Maximum chaos mode engaged! 🌪️</p>}
                </div>
            )}
        </div>
    );
};

export default ValentinesProposal;
