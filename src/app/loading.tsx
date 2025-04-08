const LoadingScreen = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex flex-col items-center">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
                </div>
                <h2 className="mt-4 text-xl font-semibold text-gray-700">Loading...</h2>
                <p className="mt-2 text-gray-500">Please wait while we prepare LogicLoom</p>
            </div>
        </div>
    )
}

export default LoadingScreen;