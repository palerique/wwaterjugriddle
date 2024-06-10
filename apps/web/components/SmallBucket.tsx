interface SmallBucketProps {
    capacity: number;
    current: number;
    name: string;
}

const SmallBucket = ({ capacity, current, name }: SmallBucketProps) => {
    const percentage = (current / capacity) * 100;

    return (
        <div className="relative flex flex-col items-center">
            <div className="relative w-12 h-24 border-2 border-white bg-gray-300 rounded-lg overflow-hidden">
                <div
                    className="absolute bottom-0 w-full bg-blue-500 transition-all duration-500"
                    style={{ height: `${percentage}%` }}
                ></div>
            </div>
            <div className="text-xs mt-1 text-center">
                <div>{name}</div>
                <div>
                    {current} / {capacity}
                </div>
            </div>
        </div>
    );
};

export default SmallBucket;
