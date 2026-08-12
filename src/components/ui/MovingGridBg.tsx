export default function MovingGridBg() {
    return (
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-background transition-colors duration-500">
            {/* Moving Grid Layer — full coverage, no radial clip */}
            <div className="absolute inset-0 bg-grid-pattern animate-grid-move" />
        </div>
    );
}