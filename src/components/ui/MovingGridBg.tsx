export default function MovingGridBg() {
    return (
        <div className="fixed inset-0 z-[-10] pointer-events-none overflow-hidden bg-background transition-colors duration-500">
            {/* Moving Grid Layer */}
            <div className="absolute inset-0 bg-grid-pattern animate-grid-move [mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)]" />

            {/* Optional: Subtle top gradient overlay to blend with navbar */}
            <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-background to-transparent" />
        </div>
    );
}