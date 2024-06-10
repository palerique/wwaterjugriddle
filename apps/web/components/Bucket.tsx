interface BucketProps {
    capacity: number;
    current: number;
}

const Bucket = ({ capacity, current }: BucketProps) => {
    const percentage = (current / capacity) * 100;

    return (
        <div className="relative w-24 h-48 border-2 border-white bg-gray-300 rounded-lg overflow-hidden">
            <div
                className="absolute bottom-0 w-full bg-blue-500 transition-all duration-500"
                style={{ height: `${percentage}%` }}
            ></div>
            <div className="absolute bottom-2 w-full text-center text-white font-bold">
                {current}/{capacity}
            </div>
        </div>
    );
};

export default Bucket;
