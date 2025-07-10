

const Loading = () => {
    return (
        <div className="relative flex items-center max-w-80 w-full bg-gray-500/20 h-5 rounded-full">
    <div className="bg-blue-600 h-5 rounded-full" ></div>
        <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
            66%
        </span>
    </div>

    );
};

export default Loading;