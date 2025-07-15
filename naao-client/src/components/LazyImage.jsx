import React, { useState, useRef, useEffect } from "react";

const LazyImage = ({
	src,
	alt,
	className = "",
	placeholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+",
	...props
}) => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [isInView, setIsInView] = useState(false);
	const imgRef = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsInView(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.1 }
		);

		if (imgRef.current) {
			observer.observe(imgRef.current);
		}

		return () => observer.disconnect();
	}, []);

	const handleLoad = () => {
		setIsLoaded(true);
	};

	const handleError = () => {
		setIsLoaded(true); // Still show the placeholder/error state
	};

	return (
		<div ref={imgRef} className={`relative overflow-hidden ${className}`}>
			{/* Placeholder */}
			{!isLoaded && (
				<img
					src={placeholder}
					alt="Loading..."
					className="w-full h-full object-cover absolute inset-0 bg-gray-200 animate-pulse"
				/>
			)}

			{/* Actual Image */}
			{isInView && (
				<img
					src={src}
					alt={alt}
					className={`w-full h-full object-cover transition-opacity duration-300 ${
						isLoaded ? "opacity-100" : "opacity-0"
					}`}
					onLoad={handleLoad}
					onError={handleError}
					loading="lazy"
					{...props}
				/>
			)}
		</div>
	);
};

export default LazyImage;
